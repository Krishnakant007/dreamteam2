// app/api/match/route.ts

import { doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import axios from "axios";
import { db } from "@/lib/firebase";

export async function POST(request: Request) {
  try {
    // Parse request body
    const { matchId } = await request.json();
    
    if (!matchId) {
      return NextResponse.json(
        { error: "Match ID is required" },
        { status: 400 }
      );
    }

    // Get API key from environment variables
    const apiKey = process.env.NEXT_RAPID_API_KEY1;
    if (!apiKey) {
      throw new Error("RapidAPI key not configured");
    }

    // 1. Fetch from RapidAPI
    const options = {
      method: 'GET',
      url: `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${matchId}`,
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    const apiData = response.data;

    // 2. Prepare data for Firestore
    const matchData = {
      id: matchId,
      date: apiData.matchInfo.startDate,
      team1: apiData.matchInfo.team1.teamName,
      team2: apiData.matchInfo.team2.teamName,
      matchType: apiData.matchInfo.series.category,
      players: {
        team1: apiData.matchInfo.team1.players,
        team2: apiData.matchInfo.team2.players
      },
      lastUpdated: new Date().toISOString()
    };

    // 3. Save to Firestore
    await setDoc(doc(db, "cricket", "matchPlayers"), {
      [matchId]: matchData
    }, { merge: true });

    return NextResponse.json({ 
      success: true, 
      data: matchData 
    });

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch and store match data",
        message: error.message 
      },
      { status: 500 }
    );
  }
}
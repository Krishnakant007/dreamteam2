import { NextResponse } from "next/server";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET() {
  try {
    // 1. Get all match IDs from upcomingMatches
    const upcomingRef = doc(db, "cricket", "upcomingMatches");
    const upcomingSnap = await getDoc(upcomingRef);
    
    if (!upcomingSnap.exists()) {
      return NextResponse.json({ error: "No matches found" }, { status: 404 });
    }

    const matches = upcomingSnap.data();
    const matchIds = Object.keys(matches).filter(key => key !== "lastUpdated");

    // 2. Process each match
    const results = [];
    for (const matchId of matchIds) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/saveMatchPlayers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matchId })
      });
      results.push(await res.json());
    }

    return NextResponse.json({ success: true, updated: matchIds.length, results });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update matches" },
      { status: 500 }
    );
  }
}
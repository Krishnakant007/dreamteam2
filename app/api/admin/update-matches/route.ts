





import { NextResponse } from 'next/server';
import { db } from "@/lib/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

const apiKeys = [
  process.env.NEXT_RAPID_API_KEY1!,
  process.env.NEXT_RAPID_API_KEY2!,
  process.env.NEXT_RAPID_API_KEY3!,
  process.env.NEXT_RAPID_API_KEY4!,
];

async function fetchWithRotation(keyIndex = 0): Promise<any> {
  if (keyIndex >= apiKeys.length) {
    throw new Error("All RapidAPI keys have been exhausted or failed");
  }

  try {
    const response = await fetch('https://cricbuzz-cricket.p.rapidapi.com/matches/v1/upcoming', {
      headers: {
        'x-rapidapi-key': apiKeys[keyIndex],
        'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
      }
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.warn(`Key ${keyIndex + 1} quota exceeded. Trying next key...`);
        return fetchWithRotation(keyIndex + 1);
      }
      throw new Error(`API failed with status ${response.status}`);
    }

    return response.json();
  } catch (err) {
    console.error(`Key ${keyIndex + 1} failed:`, err);
    return fetchWithRotation(keyIndex + 1);
  }
}

export async function GET() {
  try {
    console.log("Fetching from RapidAPI with key rotation...");
    const data = await fetchWithRotation();

    const matches = data?.typeMatches?.flatMap((type: any) =>
      type.seriesMatches.flatMap((series: any) =>
        series.seriesAdWrapper?.matches?.map((match: any) => {
          if (!match?.matchInfo) return null;

          return {
            id: match.matchInfo.matchId,
            team1: match.matchInfo.team1.teamName,
            team2: match.matchInfo.team2.teamName,
            team1Image: match.matchInfo.team1.imageId || null,
            team2Image: match.matchInfo.team2.imageId || null,
            date: match.matchInfo.startDate,
            matchType: type.matchType,
          };
        })
      )
    ) ?? [];

    const filteredMatches = matches.filter(Boolean);
    const docRef = doc(collection(db, "cricket"), "upcomingMatches");

    await setDoc(docRef, {
      matches: filteredMatches,
      updatedAt: new Date().toISOString()
    });

    console.log(`✅ Stored ${filteredMatches.length} matches`);

    return NextResponse.json({
      success: true,
      message: `${filteredMatches.length} matches updated`,
      count: filteredMatches.length,
      lastUpdated: new Date().toISOString()
    });

  } catch (error: any) {
    console.error("🔥 Error in API route:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to update matches"
      },
      { status: 500 }
    );
  }
}






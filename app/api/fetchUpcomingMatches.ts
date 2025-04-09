import { db } from "@/lib/firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

export async function fetchUpcomingMatches() {
  try {
    const docRef = doc(collection(db, "cricket"), "upcomingMatches");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Fetching data from Firestore...");
      return docSnap.data().matches;
    }

    console.log("Fetching from RapidAPI...");
    const response = await fetch('https://cricbuzz-cricket.p.rapidapi.com/matches/v1/upcoming', {
      headers: {
        'x-rapidapi-key': 'd57866ff7dmsh6f15fp1c95b5jsnafaf7a959f0b',
        'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
      }
    });

    if (!response.ok) throw new Error(`API request failed with status ${response.status}`);

    const data = await response.json();
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
    await setDoc(docRef, { matches: filteredMatches, updatedAt: Date.now() });

    return filteredMatches;
  } catch (error) {
    console.error("Error fetching matches:", error);
    return [];
  }
}

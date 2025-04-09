import { db } from "@/lib/firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

export async function fetchMatchDetails(matchId: string) {
  try {
    if (!matchId) throw new Error("Invalid match ID received");

    const docRef = doc(collection(db, "cricket"), `match-${matchId}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(`Fetching match ${matchId} from Firestore...`);
      return docSnap.data();
    }

    console.log(`Fetching match ${matchId} from RapidAPI...`);
    const url = `https://cricbuzz-cricket.p.rapidapi.com/matches/get-info?matchId=${matchId}`;
    const response = await fetch(url, {
      headers: {
        'x-rapidapi-key': 'YOUR_RAPIDAPI_KEY',
        'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
      }
    });

    if (!response.ok) throw new Error(`API request failed with status ${response.status}`);

    const data = await response.json();
    if (!data?.matchInfo) throw new Error("Invalid match data received");

    const matchDetails = {
      id: data.matchInfo.matchId,
      team1: data.matchInfo.team1.teamName,
      team2: data.matchInfo.team2.teamName,
      venue: data.matchInfo.venueInfo.ground,
      date: data.matchInfo.startDate,
      pitchReport: data.pitchReport || "No pitch report available",
      players: {
        [data.matchInfo.team1.teamName]: data.team1Players || [],
        [data.matchInfo.team2.teamName]: data.team2Players || [],
      },
    };

    await setDoc(docRef, matchDetails);
    return matchDetails;
  } catch (error) {
    console.error("Error fetching match details:", error);
    return null;
  }
}

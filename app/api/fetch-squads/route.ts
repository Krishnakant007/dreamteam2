// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { db } from '@/lib/firebase';
// import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

// const RAPID_API_DELAY_MS = 250; // 4 requests/second

// export async function GET() {
//   try {
//     // 1. Fetch matches from Firestore
//     const matchesRef = doc(db, "cricket", "upcomingMatches");
//     const matchesSnap = await getDoc(matchesRef);

//     if (!matchesSnap.exists()) {
//       return NextResponse.json(
//         { error: "No matches found" },
//         { status: 404 }
//       );
//     }

//     // 2. Process matches data
//     const matchesData = matchesSnap.data();
//     const matchesArray = matchesData.matches || [];

//     const results = [];
    
//     for (const match of matchesArray) {
//       if (!match?.id) continue; // Skip invalid matches

//       const matchId = String(match.id); // Convert to string for API
//       const docId = `match_${match.id}`; // Firestore document ID

//       try {
//         // 3. Fetch squad data from RapidAPI
//         const { data } = await axios.get(
//           `https://crickbuzz-official-apis.p.rapidapi.com/match/${matchId}/squads`,
//           {
//             headers: {
//               'x-rapidapi-key': 'b0bce92f19msh23117b48e9a6ae3p1b9e87jsn4276307b050e',
//               'x-rapidapi-host': 'crickbuzz-official-apis.p.rapidapi.com'
//             },
//             timeout: 5000
//           }
//         );

//         // 4. Transform data for Firestore
//         const squadData = {
//           matchInfo: {
//             id: match.id, // Keep original number
//             date: match.date,
//             teams: {
//               home: {
//                 name: match.team1,
//                 imageId: match.team1Image
//               },
//               away: {
//                 name: match.team2,
//                 imageId: match.team2Image
//               }
//             },
//             matchType: match.matchType
//           },
//           players: {
//             // Group players by team
//             [match.team1]: data.squad?.team1?.players || [],
//             [match.team2]: data.squad?.team2?.players || []
//           },
//           lastUpdated: new Date().toISOString()
//         };

//         // 5. Save to Firestore
//         const squadRef = doc(db, "squads", docId);
//         await setDoc(squadRef, squadData);

//         results.push({
//           matchId: match.id,
//           status: "success",
//           documentId: docId,
//           teams: `${match.team1} vs ${match.team2}`
//         });

//         console.log(`✅ Saved ${docId}`);

//       } catch (error) {
//         results.push({
//           matchId: match.id,
//           status: "failed",
//           error: error.message,
//           apiError: error.response?.data
//         });
//         console.error(`❌ Failed match ${match.id}:`, error.message);
//       }

//       await new Promise(resolve => setTimeout(resolve, RAPID_API_DELAY_MS));
//     }

//     return NextResponse.json({
//       status: "complete",
//       processed: matchesArray.length,
//       results
//     });

//   } catch (error) {
//     console.error("🚨 System error:", error);
//     return NextResponse.json(
//       {
//         error: "Processing failed",
//         details: error.message
//       },
//       { status: 500 }
//     );
//   }
// }






// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { db } from '@/lib/firebase';
// import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

// const RAPID_API_DELAY_MS = 250; // 4 requests/second

// export async function GET() {
//   try {
//     // 1. Fetch matches from Firestore
//     const matchesRef = doc(db, "cricket", "upcomingMatches");
//     const matchesSnap = await getDoc(matchesRef);

//     if (!matchesSnap.exists()) {
//       return NextResponse.json(
//         { error: "No matches found" },
//         { status: 404 }
//       );
//     }

//     // 2. Process matches data
//     const matchesData = matchesSnap.data();
//     const matchesArray = matchesData.matches || [];

//     const results = [];
    
//     for (const match of matchesArray) {
//       if (!match?.id) continue;

//       const matchId = String(match.id);
//       const docId = `match_${match.id}`;

//       try {
//         // 3. Fetch squad data from RapidAPI
//         const { data } = await axios.get(
//           `https://crickbuzz-official-apis.p.rapidapi.com/match/${matchId}/squads`,
//           {
//             headers: {
//               'x-rapidapi-key': 'b0bce92f19msh23117b48e9a6ae3p1b9e87jsn4276307b050e',
//               'x-rapidapi-host': 'crickbuzz-official-apis.p.rapidapi.com'
//             },
//             timeout: 5000
//           }
//         );

//         // 4. Transform player data
//         const transformPlayers = (players) => {
//           return players?.map(player => ({
//             id: player.id,
//             name: player.name,
//             fullName: player.fullName,
//             role: player.role,
//             isCaptain: player.captain,
//             isKeeper: player.keeper,
//             battingStyle: player.battingStyle,
//             bowlingStyle: player.bowlingStyle,
//             imageId: player.faceImageId
//           })) || [];
//         };

//         // 5. Create Firestore document structure
//         const squadData = {
//           matchInfo: {
//             id: match.id,
//             date: match.date,
//             teams: {
//               [match.team1]: {
//                 id: data.team1?.teamId,
//                 shortName: data.team1?.teamSName,
//                 imageId: data.team1?.imageId
//               },
//               [match.team2]: {
//                 id: data.team2?.teamId,
//                 shortName: data.team2?.teamSName,
//                 imageId: data.team2?.imageId
//               }
//             },
//             matchType: match.matchType
//           },
//           players: {
//             [match.team1]: transformPlayers(data.team1?.players?.Squad),
//             [match.team2]: transformPlayers(data.team2?.players?.Squad)
//           },
//           supportStaff: {
//             [match.team1]: transformPlayers(data.team1?.["support staff"]),
//             [match.team2]: transformPlayers(data.team2?.["support staff"])
//           },
//           lastUpdated: new Date().toISOString()
//         };

//         // 6. Save to Firestore
//         const squadRef = doc(db, "squads", docId);
//         await setDoc(squadRef, squadData);

//         results.push({
//           matchId: match.id,
//           status: "success",
//           documentId: docId,
//           playersSaved: {
//             [match.team1]: squadData.players[match.team1].length,
//             [match.team2]: squadData.players[match.team2].length
//           }
//         });

//       } catch (error) {
//         results.push({
//           matchId: match.id,
//           status: "failed",
//           error: error.message,
//           apiError: error.response?.data
//         });
//       }

//       await new Promise(resolve => setTimeout(resolve, RAPID_API_DELAY_MS));
//     }

//     return NextResponse.json({
//       status: "complete",
//       processed: matchesArray.length,
//       results
//     });

//   } catch (error) {
//     return NextResponse.json(
//       { error: "Processing failed", details: error.message },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';
import { db } from '@/lib/firebase';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

const RAPID_API_DELAY_MS = 250;

// Type definitions
interface Player {
  id?: number;
  name?: string;
  fullName?: string;
  role?: string;
  captain?: boolean;
  keeper?: boolean;
  battingStyle?: string;
  bowlingStyle?: string;
  faceImageId?: number;
}

interface TeamData {
  teamId?: number;
  teamSName?: string;
  imageId?: number;
  players?: {
    Squad?: Player[];
  };
}

interface Match {
  id: number;
  date?: string | number;
  team1: string;
  team2: string;
  matchType?: string;
}

interface SquadData {
  team1?: TeamData;
  team2?: TeamData;
}

interface FirestoreSquad {
  matchInfo: {
    id: number;
    date: number;
    teams: {
      [key: string]: {
        id: number;
        shortName: string;
        imageId: number;
      };
    };
    matchType: string;
  };
  players: {
    [key: string]: {
      id: number;
      name: string;
      fullName: string;
      role: string;
      isCaptain: boolean;
      isKeeper: boolean;
      battingStyle: string;
      bowlingStyle: string;
      imageId: number;
    }[];
  };
  lastUpdated: string;
}

export async function GET() {
  try {
    // 1. Fetch matches
    const matchesRef = doc(db, "cricket", "upcomingMatches");
    const matchesSnap = await getDoc(matchesRef);

    if (!matchesSnap.exists()) {
      return NextResponse.json({ error: "No matches found" }, { status: 404 });
    }

    // 2. Process matches
    const matchesData = matchesSnap.data();
    const matchesArray = (matchesData.matches || []) as Match[];
    const results: Array<{
      matchId: number;
      status: string;
      documentId?: string;
      team1Players?: number;
      team2Players?: number;
      error?: string;
      apiError?: unknown;
    }> = [];

    for (const match of matchesArray) {
      if (!match?.id) continue;

      const matchId = String(match.id);
      const docId = `match_${match.id}`;

      try {
        // 3. Fetch squad data
        const { data } = await axios.get<SquadData>(
          `https://crickbuzz-official-apis.p.rapidapi.com/match/${matchId}/squads`,
          {
            headers: {
              'x-rapidapi-key': 'b0bce92f19msh23117b48e9a6ae3p1b9e87jsn4276307b050e',
              'x-rapidapi-host': 'crickbuzz-official-apis.p.rapidapi.com'
            },
            timeout: 5000
          }
        );

        // 4. Data validation and transformation
        const getTeamData = (teamData: TeamData | undefined, fallbackName: string) => ({
          id: teamData?.teamId || 0,
          shortName: teamData?.teamSName || fallbackName?.substring(0, 3).toUpperCase() || 'TBD',
          imageId: teamData?.imageId || 0
        });

        const transformPlayers = (players: TeamData | undefined) => {
          if (!players?.players?.Squad) return [];
          return players.players.Squad.map((p: Player) => ({
            id: p.id || 0,
            name: p.name || 'Unknown',
            fullName: p.fullName || p.name || 'Unknown Player',
            role: p.role || 'Player',
            isCaptain: !!p.captain,
            isKeeper: !!p.keeper,
            battingStyle: p.battingStyle || 'Unknown',
            bowlingStyle: p.bowlingStyle || 'Unknown',
            imageId: p.faceImageId || 0
          }));
        };

        // 5. Build Firestore document
        const squadData: FirestoreSquad = {
          matchInfo: {
            id: match.id,
            date: typeof match.date === 'string' ? parseInt(match.date) : match.date || 0,
            teams: {
              [match.team1]: getTeamData(data.team1, match.team1),
              [match.team2]: getTeamData(data.team2, match.team2)
            },
            matchType: match.matchType || 'Unknown'
          },
          players: {
            [match.team1]: transformPlayers(data.team1),
            [match.team2]: transformPlayers(data.team2)
          },
          lastUpdated: new Date().toISOString()
        };

        // 6. Save to Firestore
        const squadRef = doc(db, "squads", docId);
        await setDoc(squadRef, squadData);

        results.push({
          matchId: match.id,
          status: "success",
          documentId: docId,
          team1Players: squadData.players[match.team1].length,
          team2Players: squadData.players[match.team2].length
        });

      } catch (error: unknown) {
        const err = error as AxiosError;
        results.push({
          matchId: match.id,
          status: "failed",
          error: err.message,
          apiError: err.response?.data
        });
      }

      await new Promise(resolve => setTimeout(resolve, RAPID_API_DELAY_MS));
    }

    return NextResponse.json({
      status: "complete",
      processed: matchesArray.length,
      results
    });

  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: "Processing failed", details: err.message },
      { status: 500 }
    );
  }
}
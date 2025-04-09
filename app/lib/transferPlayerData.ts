// //app/lib/transferPlayerData.ts

// import { db } from "@/lib/firebase"; // Ensure Firestore is initialized
// import { doc, getDoc, collection, updateDoc } from "firebase/firestore"; // ✅ Import correct methods

// export async function transferPlayerData(playerDocId: string, matchInfoDocId: string) {
//   try {
//     // Fetch players data
//     const playerDocRef = doc(collection(db, "players"), playerDocId);
//     const playersSnapshot = await getDoc(playerDocRef);
//     if (!playersSnapshot.exists()) throw new Error("Player data not found");
    
//     const playersData = playersSnapshot.data()?.playersData?.data?.players || [];

//     // Fetch matchInfo data
//     const matchInfoDocRef = doc(collection(db, "matchInfo"), matchInfoDocId);
//     const matchInfoDoc = await getDoc(matchInfoDocRef);
//     if (!matchInfoDoc.exists()) throw new Error("Match info not found");

//     const matchInfoData = matchInfoDoc.data()?.matchInfo || {};

//     // Create a map of players by last name
//     const playersMap: Record<string, any> = {};
//     playersData.forEach((player: any) => {
//       const lastName = player.name.split(" ").pop(); // Extract last name
//       playersMap[lastName] = {
//         imgURL: player.imgURL,
//         points: player.points,
//         selVcPerc: player.selVcPerc,
//         selCapPerc: player.selCapPerc,
//         selectedBy: player.selectedBy
//       };
//     });

//     // Update matchInfo players
//     ["team1", "team2"].forEach((teamKey) => {
//       if (matchInfoData[teamKey]?.playerDetails) {
//         matchInfoData[teamKey].playerDetails.forEach((player: any) => {
//           const lastName = player.name.split(" ").pop();
//           if (playersMap[lastName]) {
//             Object.assign(player, playersMap[lastName]); // Merge data
//           }
//         });
//       }
//     });

//     // Save the updated matchInfo
//     await updateDoc(matchInfoDocRef, { matchInfo: matchInfoData });

//     return { success: true, message: "Player data transferred successfully" };
//   } catch (error: any) {
//     return { success: false, error: error.message };
//   }
// }








// // app/lib/transferPlayerData.ts

// import { db } from "@/lib/firebase";
// import { doc, getDoc, collection, updateDoc } from "firebase/firestore";

// export async function transferPlayerData(playerDocId: string, matchInfoDocId: string) {
//   try {
//     // 1. Fetch players data
//     const playerDocRef = doc(db, "players", playerDocId);
//     const playersSnapshot = await getDoc(playerDocRef);
    
//     if (!playersSnapshot.exists()) {
//       throw new Error(`Player document ${playerDocId} not found`);
//     }
    
//     const playersData = playersSnapshot.data()?.playersData?.data?.players || [];
    
//     if (playersData.length === 0) {
//       throw new Error("No player data available in the document");
//     }

//     // 2. Fetch matchInfo data - using correct collection name 'matchinfo'
//     const matchInfoDocRef = doc(db, "matchinfo", matchInfoDocId);
//     const matchInfoDoc = await getDoc(matchInfoDocRef);
    
//     if (!matchInfoDoc.exists()) {
//       throw new Error(`Match info document ${matchInfoDocId} not found`);
//     }

//     const matchInfoData = matchInfoDoc.data()?.matchInfo || {};
    
//     if (!matchInfoData.team1 || !matchInfoData.team2) {
//       throw new Error("Match info is missing team data");
//     }

//     // 3. Create a map of players by last name
//     const playersMap: Record<string, any> = {};
    
//     playersData.forEach((player: any) => {
//       if (!player.name) {
//         console.warn("Player missing name field", player);
//         return;
//       }
      
//       const nameParts = player.name.split(" ");
//       const lastName = nameParts.length > 0 ? nameParts[nameParts.length - 1] : player.name;
      
//       playersMap[lastName] = {
//         imgURL: player.imgURL || null,
//         points: player.points || 0,
//         selVcPerc: player.selVcPerc || 0,
//         selCapPerc: player.selCapPerc || 0,
//         selectedBy: player.selectedBy || null
//       };
//     });

//     // 4. Update matchInfo players
//     ["team1", "team2"].forEach((teamKey) => {
//       if (matchInfoData[teamKey]?.playerDetails) {
//         matchInfoData[teamKey].playerDetails.forEach((player: any) => {
//           if (!player.name) {
//             console.warn("Match player missing name field", player);
//             return;
//           }
          
//           const nameParts = player.name.split(" ");
//           const lastName = nameParts.length > 0 ? nameParts[nameParts.length - 1] : player.name;
          
//           if (playersMap[lastName]) {
//             Object.assign(player, playersMap[lastName]);
//           }
//         });
//       }
//     });

//     // 5. Save the updated matchInfo
//     await updateDoc(matchInfoDocRef, {
//       matchInfo: matchInfoData
//     });

//     return {
//       success: true,
//       message: "Player data transferred successfully",
//       stats: {
//         playersProcessed: playersData.length,
//         teamsUpdated: ["team1", "team2"].filter(team => matchInfoData[team]?.playerDetails).length
//       }
//     };
    
//   } catch (error: any) {
//     console.error("Error in transferPlayerData:", {
//       playerDocId,
//       matchInfoDocId,
//       error: error.message,
//       stack: error.stack
//     });
    
//     return {
//       success: false,
//       error: error.message,
//       details: {
//         playerDocId,
//         matchInfoDocId,
//         timestamp: new Date().toISOString()
//       }
//     };
//   }
// }




// app/lib/transferPlayerData.ts
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

// Helper functions for name matching
function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD") // normalize diacritics
    .replace(/[\u0300-\u036f]/g, "") // remove diacritics
    .replace(/[^a-z\s]/g, "") // remove special chars
    .replace(/\b\w\b/g, "") // remove single letters (initials)
    .replace(/\s+/g, " ") // collapse multiple spaces
    .trim();
}

function getLastName(name: string): string {
  const normalized = normalizeName(name);
  const parts = normalized.split(/\s+/);
  return parts.length > 0 ? parts[parts.length - 1] : normalized;
}

export async function transferPlayerData(playerDocId: string, matchInfoDocId: string) {
  try {
    // 1. Fetch players data
    const playerDocRef = doc(db, "players", playerDocId);
    const playersSnapshot = await getDoc(playerDocRef);
    
    if (!playersSnapshot.exists()) {
      throw new Error(`Player document ${playerDocId} not found`);
    }
    
    const playerData = playersSnapshot.data();
    console.log("DEBUG - Full player document:", JSON.stringify(playerData, null, 2));

    // Extract players data from different possible structures
    let players: any[] = [];
    
    if (Array.isArray(playerData?.players)) {
      players = playerData.players;
    } 
    else if (playerData?.playersData?.data?.players && Array.isArray(playerData.playersData.data.players)) {
      players = playerData.playersData.data.players;
    }
    else if (playerData?.players && typeof playerData.players === 'object') {
      players = Object.values(playerData.players);
    }
    else {
      const arrayFields = Object.values(playerData).filter(Array.isArray);
      if (arrayFields.length > 0) {
        players = arrayFields[0];
        console.warn("Using first found array field as players data");
      }
    }

    if (!Array.isArray(players)) {
      console.error("Players data could not be converted to array. Document structure:", playerData);
      throw new Error("Players data is not in expected format");
    }

    if (players.length === 0) {
      throw new Error("No player data available in the document");
    }

    // 2. Create enhanced players map with multiple name keys
    const playersMap: Record<string, any> = {};
    
    players.forEach((player: any) => {
      try {
        if (!player?.name) {
          console.warn("Skipping player with missing name:", player);
          return;
        }
        
        const normalizedName = normalizeName(player.name);
        const lastName = getLastName(player.name);
        
        // Store player data under multiple possible keys
        const playerEntry = {
          imgURL: player.imgURL || null,
          points: player.points || 0,
          selVcPerc: player.selVcPerc || 0,
          selCapPerc: player.selCapPerc || 0,
          selectedBy: player.selectedBy || null
        };
        
        // Map by different name variations
        playersMap[lastName] = playerEntry;
        playersMap[normalizedName] = playerEntry;
        playersMap[player.name.toLowerCase()] = playerEntry;
      } catch (e) {
        console.error("Error processing player:", player, e);
      }
    });

    console.log("DEBUG - Players Map Keys:", Object.keys(playersMap));
    console.log("DEBUG - First 3 Players:", JSON.stringify(players.slice(0, 3), null, 2));

    // 3. Fetch matchInfo data
    const matchInfoDocRef = doc(db, "matchinfo", matchInfoDocId);
    const matchInfoDoc = await getDoc(matchInfoDocRef);
    
    if (!matchInfoDoc.exists()) {
      throw new Error(`Match info document ${matchInfoDocId} not found`);
    }

    const matchInfoData = matchInfoDoc.data()?.matchInfo || {};
    
    if (!matchInfoData.team1 || !matchInfoData.team2) {
      throw new Error("Match info is missing team data");
    }

    // 4. Update matchInfo players with enhanced matching
    let matchCount = 0;
    ["team1", "team2"].forEach((teamKey) => {
      try {
        const teamPlayers = matchInfoData[teamKey]?.playerDetails;
        if (!Array.isArray(teamPlayers)) {
          console.warn(`No playerDetails array found for ${teamKey}`);
          return;
        }
        
        teamPlayers.forEach((player: any) => {
          if (!player?.name) {
            console.warn(`Skipping ${teamKey} player with missing name`);
            return;
          }
          
          const normalizedTeamName = normalizeName(player.name);
          const teamLastName = getLastName(player.name);
          
          // Try multiple matching strategies
          const matchedData = playersMap[teamLastName] || 
                            playersMap[normalizedTeamName] || 
                            playersMap[player.name.toLowerCase()] ||
                            Object.entries(playersMap).find(([key]) => 
                              normalizedTeamName.includes(key) || 
                              key.includes(teamLastName)
                            )?.[1];

          if (matchedData) {
            Object.assign(player, matchedData);
            matchCount++;
            console.log(`DEBUG - Matched ${player.name} with stats`);
          } else {
            console.warn(`DEBUG - No match found for ${player.name}`);
            console.warn(`Attempted keys: ${teamLastName}, ${normalizedTeamName}, ${player.name.toLowerCase()}`);
          }
        });
      } catch (e) {
        console.error(`Error processing ${teamKey} players:`, e);
      }
    });

    // 5. Save the updated matchInfo
    await updateDoc(matchInfoDocRef, { 
      matchInfo: matchInfoData 
    });

    return { 
      success: true, 
      message: "Player data transferred successfully",
      playersProcessed: players.length,
      playersMatched: matchCount,
      debug: {
        playersSample: players.slice(0, 3),
        matchSample: matchInfoData.team1?.playerDetails?.slice(0, 3)
      }
    };
    
  } catch (error: any) {
    console.error("Transfer failed:", {
      playerDocId,
      matchInfoDocId,
      error: error.message,
      stack: error.stack
    });
    
    return { 
      success: false, 
      error: error.message,
      details: {
        playerDocId,
        matchInfoDocId,
        timestamp: new Date().toISOString()
      }
    };
  }
}
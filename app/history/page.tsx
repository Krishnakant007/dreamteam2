// export default function HistoryPage() {
//     return (
//       <div className="p-4 text-white">
//         <h2 className="text-2xl font-bold">Match History</h2>
//         <p className="text-gray-400">No match history available.</p>
//       </div>
//     );
//   }
  





// // app/history/page.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { db } from '@/lib/firebase';
// import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
// import { useAuth } from '@clerk/nextjs';
// import Link from 'next/link';
// import Image from 'next/image';

// interface Player {
//   id: number;
//   name: string;
//   fullName: string;
//   nickName?: string;
//   role: string;
//   teamName: string;
//   imgURL: string;
//   captain?: boolean;
//   battingStyle?: string;
//   bowlingStyle?: string;
//   selCapPerc?: number;
//   selVcPerc?: number;
//   selectedBy?: number;
//   isOverseas?: boolean;
//   substitute?: boolean;
//   wasSubstituted?: boolean;
//   replacedPlayer?: string;
//   roleOrder?: number;
//   keeper?: boolean;
// }

// interface Team {
//   id: string;
//   matchId: string;
//   matchName: string;
//   date: string;
//   teamName: string;
//   players: Player[];
//   substitutes?: Player[];
//   captain: Player;
//   viceCaptain: Player;
//   points?: number;
//   riskLevel?: number;
//   teamComposition: {
//     Batsman: number;
//     'Batting Allrounder': number;
//     Bowler: number;
//     'Bowling Allrounder': number;
//     'WK-Batsman'?: number;
//     [key: string]: number | undefined;
//   };
//   team1ShortName?: string;
//   team2ShortName?: string;
//   changes?: number;
// }

// export default function HistoryPage() {
//   const { userId } = useAuth();
//   const [teams, setTeams] = useState<Team[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!userId) return;

//     const fetchTeams = async () => {
//       try {
//         setLoading(true);
//         const matchesRef = collection(db, 'users', userId, 'matches');
//         const q = query(matchesRef, orderBy('createdAt', 'desc'));
        
//         const querySnapshot = await getDocs(q);
//         const teamsData: Team[] = [];

//         querySnapshot.forEach((matchDoc) => {
//           const matchData = matchDoc.data();
//           if (matchData.teams) {
//             Object.entries(matchData.teams).forEach(([teamId, team]: [string, any]) => {
//               // Process players
//               const players = team.players?.map((player: any) => ({
//                 id: player.id,
//                 name: player.name,
//                 fullName: player.fullName,
//                 nickName: player.nickName,
//                 role: player.role,
//                 teamName: player.teamName,
//                 imgURL: player.imgURL || '/fallback.png',
//                 captain: player.captain,
//                 battingStyle: player.battingStyle,
//                 bowlingStyle: player.bowlingStyle,
//                 selCapPerc: player.selCapPerc,
//                 selVcPerc: player.selVcPerc,
//                 selectedBy: player.selectedBy,
//                 isOverseas: player.isOverseas,
//                 substitute: player.substitute,
//                 wasSubstituted: player.wasSubstituted,
//                 replacedPlayer: player.replacedPlayer,
//                 roleOrder: player.roleOrder,
//                 keeper: player.keeper
//               })) || [];

//               // Process substitutes
//               const substitutes = team.substitutes?.map((sub: any) => ({
//                 id: sub.id,
//                 name: sub.name,
//                 fullName: sub.fullName,
//                 role: sub.role,
//                 teamName: sub.teamName,
//                 imgURL: sub.imgURL || '/fallback.png',
//                 selectedBy: sub.selectedBy,
//                 isOverseas: sub.isOverseas,
//                 roleOrder: sub.roleOrder,
//                 keeper: sub.keeper
//               })) || [];

//               // Find captain and vice-captain
//               const captain = team.captain ? 
//                 players.find((p: Player) => p.id === team.captain.id) || 
//                 substitutes.find((s: Player) => s.id === team.captain.id) || 
//                 team.captain : null;
              
//               const viceCaptain = team.viceCaptain ? 
//                 players.find((p: Player) => p.id === team.viceCaptain.id) || 
//                 substitutes.find((s: Player) => s.id === team.viceCaptain.id) || 
//                 team.viceCaptain : null;

//               teamsData.push({
//                 id: teamId,
//                 matchId: matchDoc.id,
//                 matchName: matchData.matchName || 'Unknown Match',
//                 date: matchData.createdAt || 'Unknown Date',
//                 teamName: team.teamName || 'My Team',
//                 players,
//                 substitutes,
//                 captain,
//                 viceCaptain,
//                 points: team.points || 0,
//                 riskLevel: team.riskLevel,
//                 teamComposition: team.teamComposition || {},
//                 team1ShortName: team.team1ShortName,
//                 team2ShortName: team.team2ShortName,
//                 changes: team.changes || 0
//               });
//             });
//           }
//         });

//         setTeams(teamsData);
//       } catch (err) {
//         console.error('Error fetching teams:', err);
//         setError('Failed to load team history');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTeams();
//   }, [userId]);

//   // Group players by role for display
//   const groupPlayersByRole = (players: Player[]) => {
//     return {
//       'WK-Batsman': players.filter(p => p.roleOrder === 1),
//       'Batsman': players.filter(p => p.roleOrder === 2),
//       'Batting Allrounder': players.filter(p => p.roleOrder === 3),
//       'Bowling Allrounder': players.filter(p => p.roleOrder === 4),
//       'Bowler': players.filter(p => p.roleOrder === 5)
//     };
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-6">
//         <div className="max-w-6xl mx-auto">
//           <h1 className="text-2xl font-bold text-gray-800 mb-6">Loading your team history...</h1>
//           <div className="animate-pulse space-y-4">
//             {[...Array(3)].map((_, i) => (
//               <div key={i} className="bg-white p-4 rounded-lg shadow h-24"></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-6">
//         <div className="max-w-6xl mx-auto text-center">
//           <h1 className="text-2xl font-bold text-gray-800 mb-4">Error Loading History</h1>
//           <p className="text-red-500 mb-6">{error}</p>
//           <button 
//             onClick={() => window.location.reload()}
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (teams.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-6">
//         <div className="max-w-6xl mx-auto text-center">
//           <h1 className="text-2xl font-bold text-gray-800 mb-4">No Match History Available</h1>
//           <p className="text-gray-600 mb-6">You haven't created any teams yet.</p>
//           <Link 
//             href="/"
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           >
//             Create Your First Team
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Team History</h1>
        
//         <div className="grid gap-6">
//           {teams.map((team) => {
//             const playersByRole = groupPlayersByRole(team.players);
//             const overseasCount = team.players.filter(p => p.isOverseas).length;
//             const team1Count = team.players.filter(p => p.teamName === team.captain?.teamName).length;
//             const team2Count = 11 - team1Count;

//             return (
//               <div key={`${team.matchId}-${team.id}`} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <h2 className="text-xl font-semibold text-gray-800">{team.teamName}</h2>
//                     <p className="text-gray-600">{team.matchName}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-sm text-gray-500">
//                       {new Date(team.date).toLocaleDateString('en-IN', {
//                         day: 'numeric',
//                         month: 'short',
//                         year: 'numeric',
//                         hour: '2-digit',
//                         minute: '2-digit'
//                       })}
//                     </p>
//                     {team.points !== undefined && (
//                       <p className="text-green-600 font-bold mt-1">{team.points} points</p>
//                     )}
//                     {team.riskLevel !== undefined && (
//                       <p className="text-xs mt-1">
//                         Risk: <span className="font-medium">{team.riskLevel}%</span>
//                       </p>
//                     )}
//                     {team.changes !== undefined && team.changes > 0 && (
//                       <p className="text-xs mt-1">
//                         Changes: <span className="font-medium">{team.changes}</span>
//                       </p>
//                     )}
//                   </div>
//                 </div>
                
//                 <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <h3 className="font-medium mb-2">Captain:</h3>
//                     {team.captain ? (
//                       <div className="flex items-center gap-3 bg-blue-50 p-2 rounded">
//                         <div className="relative w-10 h-10">
//                           <Image
//                             src={team.captain.imgURL || '/fallback.png'}
//                             alt={team.captain.fullName}
//                             fill
//                             className="rounded-full object-cover"
//                             unoptimized
//                           />
//                         </div>
//                         <div>
//                           <p className="font-medium">
//                             {team.captain.fullName} 
//                             {team.captain.isOverseas && ' (OS)'}
//                             {team.captain.substitute && ' (OUT)'}
//                             {team.captain.wasSubstituted && ' (IN)'}
//                           </p>
//                           <p className="text-xs text-gray-500">
//                             {team.captain.role} • {team.captain.teamName}
//                           </p>
//                           <p className="text-xs">
//                             Sel: {team.captain.selectedBy?.toFixed(1)}% C: {team.captain.selCapPerc?.toFixed(1)}%
//                           </p>
//                         </div>
//                       </div>
//                     ) : (
//                       <p className="text-gray-400">No captain selected</p>
//                     )}
//                   </div>
                  
//                   <div>
//                     <h3 className="font-medium mb-2">Vice Captain:</h3>
//                     {team.viceCaptain ? (
//                       <div className="flex items-center gap-3 bg-green-50 p-2 rounded">
//                         <div className="relative w-10 h-10">
//                           <Image
//                             src={team.viceCaptain.imgURL || '/fallback.png'}
//                             alt={team.viceCaptain.fullName}
//                             fill
//                             className="rounded-full object-cover"
//                             unoptimized
//                           />
//                         </div>
//                         <div>
//                           <p className="font-medium">
//                             {team.viceCaptain.fullName} 
//                             {team.viceCaptain.isOverseas && ' (OS)'}
//                             {team.viceCaptain.substitute && ' (OUT)'}
//                             {team.viceCaptain.wasSubstituted && ' (IN)'}
//                           </p>
//                           <p className="text-xs text-gray-500">
//                             {team.viceCaptain.role} • {team.viceCaptain.teamName}
//                           </p>
//                           <p className="text-xs">
//                             Sel: {team.viceCaptain.selectedBy?.toFixed(1)}% VC: {team.viceCaptain.selVcPerc?.toFixed(1)}%
//                           </p>
//                         </div>
//                       </div>
//                     ) : (
//                       <p className="text-gray-400">No vice captain selected</p>
//                     )}
//                   </div>
//                 </div>
                
//                 <div className="mb-4">
//                   <h3 className="font-medium mb-2">Team Composition:</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {Object.entries(team.teamComposition).map(([key, value]) => (
//                       <span key={key} className="bg-gray-100 px-3 py-1 rounded text-sm">
//                         {key}: {value}
//                       </span>
//                     ))}
//                     {team.team1ShortName && team.team2ShortName && (
//                       <>
//                         <span className="bg-gray-100 px-3 py-1 rounded text-sm">
//                           {team.team1ShortName}: {team1Count}
//                         </span>
//                         <span className="bg-gray-100 px-3 py-1 rounded text-sm">
//                           {team.team2ShortName}: {team2Count}
//                         </span>
//                         <span className="bg-gray-100 px-3 py-1 rounded text-sm">
//                           Overseas: {overseasCount}/5
//                         </span>
//                       </>
//                     )}
//                   </div>
//                 </div>
                
//                 <h3 className="font-medium mb-2">Players:</h3>
//                 <div className="space-y-2 max-h-60 overflow-y-auto">
//                   {/* Wicket Keepers */}
//                   {playersByRole['WK-Batsman'].length > 0 && (
//                     <div className="text-xs text-gray-400 mt-2">Wicket Keepers</div>
//                   )}
//                   {playersByRole['WK-Batsman'].map((player) => (
//                     <PlayerRow key={`wk-${player.id}`} player={player} />
//                   ))}
                  
//                   {/* Batsmen */}
//                   {playersByRole['Batsman'].length > 0 && (
//                     <div className="text-xs text-gray-400 mt-2">Batsmen</div>
//                   )}
//                   {playersByRole['Batsman'].map((player) => (
//                     <PlayerRow key={`bat-${player.id}`} player={player} />
//                   ))}
                  
//                   {/* All Rounders */}
//                   {playersByRole['Batting Allrounder'].length > 0 && (
//                     <div className="text-xs text-gray-400 mt-2">Batting Allrounders</div>
//                   )}
//                   {playersByRole['Batting Allrounder'].map((player) => (
//                     <PlayerRow key={`bar-${player.id}`} player={player} />
//                   ))}
                  
//                   {playersByRole['Bowling Allrounder'].length > 0 && (
//                     <div className="text-xs text-gray-400 mt-2">Bowling Allrounders</div>
//                   )}
//                   {playersByRole['Bowling Allrounder'].map((player) => (
//                     <PlayerRow key={`bowlar-${player.id}`} player={player} />
//                   ))}
                  
//                   {/* Bowlers */}
//                   {playersByRole['Bowler'].length > 0 && (
//                     <div className="text-xs text-gray-400 mt-2">Bowlers</div>
//                   )}
//                   {playersByRole['Bowler'].map((player) => (
//                     <PlayerRow key={`bowl-${player.id}`} player={player} />
//                   ))}
                  
//                   {/* Substitutes section */}
//                   {team.substitutes && team.substitutes.length > 0 && (
//                     <>
//                       <div className="text-xs text-gray-400 mt-4">Substitutes (→)</div>
//                       {team.substitutes.map((sub) => (
//                         <PlayerRow key={`sub-${sub.id}`} player={sub} isSubstituteList />
//                       ))}
//                     </>
//                   )}
//                 </div>
                
//                 <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
//                   <Link 
//                     href={`/match/${team.matchId}/team/${team.id}`}
//                     className="text-green-600 hover:text-green-800 font-medium"
//                   >
//                     View Team Details →
//                   </Link>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// const PlayerRow = ({ 
//   player, 
//   isSubstituteList = false 
// }: { 
//   player: Player, 
//   isSubstituteList?: boolean 
// }) => (
//   <div className={`flex items-center justify-between text-sm p-2 rounded ${
//     player.wasSubstituted ? 'bg-yellow-50' :
//     player.substitute ? 'bg-red-50' : 
//     isSubstituteList ? 'bg-gray-100' : 'bg-gray-50'
//   }`}>
//     <div className="flex items-center">
//       {isSubstituteList && (
//         <span className="mr-1 text-yellow-600">→</span>
//       )}
//       {player.wasSubstituted && (
//         <span className="mr-1 text-green-600">↑</span>
//       )}
//       <div className="relative w-8 h-8 mr-2">
//         <Image
//           src={player.imgURL || "/fallback.png"}
//           alt={player.name}
//           fill
//           className="rounded-full object-cover"
//           unoptimized
//         />
//       </div>
//       <span className={player.substitute ? 'line-through' : ''}>
//         {player.nickName || player.name}
//         {player.keeper && ' (WK)'}
//         {player.isOverseas && ' (OS)'}
//         {player.wasSubstituted && player.replacedPlayer && ` (replaced ${player.replacedPlayer})`}
//       </span>
//     </div>
//     <div className="text-right">
//       <div className="text-xs text-gray-500">{player.teamName}</div>
//       <div className="text-xs">Sel: {player.selectedBy?.toFixed(1)}%</div>
//     </div>
//   </div>
// );

// app/history/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';

interface Player {
  id: number;
  name: string;
  fullName: string;
  nickName?: string;
  role: string;
  teamName: string;
  imgURL: string;
  captain?: boolean;
  battingStyle?: string;
  bowlingStyle?: string;
  selCapPerc?: number;
  selVcPerc?: number;
  selectedBy?: number;
  isOverseas?: boolean;
  substitute?: boolean;
  wasSubstituted?: boolean;
  replacedPlayer?: string;
  roleOrder?: number;
  keeper?: boolean;
}

interface Team {
  id: string;
  matchId: string;
  matchName: string;
  date: string;
  teamName: string;
  players: Player[];
  substitutes?: Player[];
  captain: Player;
  viceCaptain: Player;
  points?: number;
  riskLevel?: number;
  teamComposition: {
    Batsman: number;
    'Batting Allrounder': number;
    Bowler: number;
    'Bowling Allrounder': number;
    'WK-Batsman'?: number;
    [key: string]: number | undefined;
  };
  team1ShortName?: string;
  team2ShortName?: string;
  changes?: number;
}

export default function HistoryPage() {
  const { userId } = useAuth();
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchTeams = async () => {
      try {
        setLoading(true);
        const matchesRef = collection(db, 'users', userId, 'matches');
        const q = query(matchesRef, orderBy('createdAt', 'desc'));
        
        const querySnapshot = await getDocs(q);
        const teamsData: Team[] = [];

        querySnapshot.forEach((matchDoc) => {
          const matchData = matchDoc.data();
          if (matchData.teams) {
            Object.entries(matchData.teams).forEach(([teamId, team]: [string, any]) => {
              // Process players
              const players = team.players?.map((player: any) => ({
                id: player.id,
                name: player.name,
                fullName: player.fullName,
                nickName: player.nickName,
                role: player.role,
                teamName: player.teamName,
                imgURL: player.imgURL || '/fallback.png',
                captain: player.captain,
                battingStyle: player.battingStyle,
                bowlingStyle: player.bowlingStyle,
                selCapPerc: player.selCapPerc,
                selVcPerc: player.selVcPerc,
                selectedBy: player.selectedBy,
                isOverseas: player.isOverseas,
                substitute: player.substitute,
                wasSubstituted: player.wasSubstituted,
                replacedPlayer: player.replacedPlayer,
                roleOrder: player.roleOrder,
                keeper: player.keeper
              })) || [];

              // Process substitutes
              const substitutes = team.substitutes?.map((sub: any) => ({
                id: sub.id,
                name: sub.name,
                fullName: sub.fullName,
                role: sub.role,
                teamName: sub.teamName,
                imgURL: sub.imgURL || '/fallback.png',
                selectedBy: sub.selectedBy,
                isOverseas: sub.isOverseas,
                roleOrder: sub.roleOrder,
                keeper: sub.keeper
              })) || [];

              // Find captain and vice-captain
              const captain = team.captain ? 
                players.find((p: Player) => p.id === team.captain.id) || 
                substitutes.find((s: Player) => s.id === team.captain.id) || 
                team.captain : null;
              
              const viceCaptain = team.viceCaptain ? 
                players.find((p: Player) => p.id === team.viceCaptain.id) || 
                substitutes.find((s: Player) => s.id === team.viceCaptain.id) || 
                team.viceCaptain : null;

              teamsData.push({
                id: teamId,
                matchId: matchDoc.id,
                matchName: matchData.matchName || 'Unknown Match',
                date: matchData.createdAt || 'Unknown Date',
                teamName: team.teamName || 'My Team',
                players,
                substitutes,
                captain,
                viceCaptain,
                points: team.points || 0,
                riskLevel: team.riskLevel,
                teamComposition: team.teamComposition || {},
                team1ShortName: team.team1ShortName,
                team2ShortName: team.team2ShortName,
                changes: team.changes || 0
              });
            });
          }
        });

        setTeams(teamsData);
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError('Failed to load team history');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [userId]);

  // Group players by role for display
  const groupPlayersByRole = (players: Player[]) => {
    return {
      'WK-Batsman': players.filter(p => p.roleOrder === 1),
      'Batsman': players.filter(p => p.roleOrder === 2),
      'Batting Allrounder': players.filter(p => p.roleOrder === 3),
      'Bowling Allrounder': players.filter(p => p.roleOrder === 4),
      'Bowler': players.filter(p => p.roleOrder === 5)
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Loading your team history...</h1>
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow h-24"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Error Loading History</h1>
          <p className="text-red-500 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (teams.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">No Match History Available</h1>
          <p className="text-gray-600 mb-6">You haven't created any teams yet.</p>
          <Link 
            href="/"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Create Your First Team
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Team History</h1>
        
        <div className="grid gap-6">
          {teams.map((team) => {
            const playersByRole = groupPlayersByRole(team.players);
            const overseasCount = team.players.filter(p => p.isOverseas).length;
            const team1Count = team.players.filter(p => p.teamName === team.captain?.teamName).length;
            const team2Count = 11 - team1Count;

            return (
              <div key={`${team.matchId}-${team.id}`} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{team.teamName}</h2>
                    <p className="text-gray-600">{team.matchName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {new Date(team.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                    {team.points !== undefined && (
                      <p className="text-green-600 font-bold mt-1">{team.points} points</p>
                    )}
                    {team.riskLevel !== undefined && (
                      <p className="text-xs mt-1">
                        Risk: <span className="font-medium">{team.riskLevel}%</span>
                      </p>
                    )}
                    {team.changes !== undefined && team.changes > 0 && (
                      <p className="text-xs mt-1">
                        Changes: <span className="font-medium">{team.changes}</span>
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2">Captain:</h3>
                    {team.captain ? (
                      <div className="flex items-center gap-3 bg-blue-50 p-2 rounded">
                        <div className="relative w-10 h-10">
                          <Image
                            src={team.captain.imgURL || '/fallback.png'}
                            alt={team.captain.fullName}
                            fill
                            className="rounded-full object-cover"
                            unoptimized
                          />
                        </div>
                        <div>
                          <p className="font-medium">
                            {team.captain.fullName} 
                            {team.captain.isOverseas && ' (OS)'}
                            {team.captain.substitute && ' (OUT)'}
                            {team.captain.wasSubstituted && ' (IN)'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {team.captain.role} • {team.captain.teamName}
                          </p>
                          <p className="text-xs">
                            Sel: {team.captain.selectedBy?.toFixed(1)}% C: {team.captain.selCapPerc?.toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-400">No captain selected</p>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Vice Captain:</h3>
                    {team.viceCaptain ? (
                      <div className="flex items-center gap-3 bg-green-50 p-2 rounded">
                        <div className="relative w-10 h-10">
                          <Image
                            src={team.viceCaptain.imgURL || '/fallback.png'}
                            alt={team.viceCaptain.fullName}
                            fill
                            className="rounded-full object-cover"
                            unoptimized
                          />
                        </div>
                        <div>
                          <p className="font-medium">
                            {team.viceCaptain.fullName} 
                            {team.viceCaptain.isOverseas && ' (OS)'}
                            {team.viceCaptain.substitute && ' (OUT)'}
                            {team.viceCaptain.wasSubstituted && ' (IN)'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {team.viceCaptain.role} • {team.viceCaptain.teamName}
                          </p>
                          <p className="text-xs">
                            Sel: {team.viceCaptain.selectedBy?.toFixed(1)}% VC: {team.viceCaptain.selVcPerc?.toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-400">No vice captain selected</p>
                    )}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Team Composition:</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(team.teamComposition).map(([key, value]) => (
                      <span key={key} className="bg-gray-100 px-3 py-1 rounded text-sm">
                        {key}: {value}
                      </span>
                    ))}
                    {team.team1ShortName && team.team2ShortName && (
                      <>
                        <span className="bg-gray-100 px-3 py-1 rounded text-sm">
                          {team.team1ShortName}: {team1Count}
                        </span>
                        <span className="bg-gray-100 px-3 py-1 rounded text-sm">
                          {team.team2ShortName}: {team2Count}
                        </span>
                        <span className="bg-gray-100 px-3 py-1 rounded text-sm">
                          Overseas: {overseasCount}/5
                        </span>
                      </>
                    )}
                  </div>
                </div>
                
                <h3 className="font-medium mb-2">Players:</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {/* Wicket Keepers */}
                  {playersByRole['WK-Batsman'].length > 0 && (
                    <div className="text-xs text-gray-400 mt-2">Wicket Keepers</div>
                  )}
                  {playersByRole['WK-Batsman'].map((player) => (
                    <PlayerRow key={`wk-${player.id}`} player={player} />
                  ))}
                  
                  {/* Batsmen */}
                  {playersByRole['Batsman'].length > 0 && (
                    <div className="text-xs text-gray-400 mt-2">Batsmen</div>
                  )}
                  {playersByRole['Batsman'].map((player) => (
                    <PlayerRow key={`bat-${player.id}`} player={player} />
                  ))}
                  
                  {/* All Rounders */}
                  {playersByRole['Batting Allrounder'].length > 0 && (
                    <div className="text-xs text-gray-400 mt-2">Batting Allrounders</div>
                  )}
                  {playersByRole['Batting Allrounder'].map((player) => (
                    <PlayerRow key={`bar-${player.id}`} player={player} />
                  ))}
                  
                  {playersByRole['Bowling Allrounder'].length > 0 && (
                    <div className="text-xs text-gray-400 mt-2">Bowling Allrounders</div>
                  )}
                  {playersByRole['Bowling Allrounder'].map((player) => (
                    <PlayerRow key={`bowlar-${player.id}`} player={player} />
                  ))}
                  
                  {/* Bowlers */}
                  {playersByRole['Bowler'].length > 0 && (
                    <div className="text-xs text-gray-400 mt-2">Bowlers</div>
                  )}
                  {playersByRole['Bowler'].map((player) => (
                    <PlayerRow key={`bowl-${player.id}`} player={player} />
                  ))}
                  
                  {/* Substitutes section */}
                  {team.substitutes && team.substitutes.length > 0 && (
                    <>
                      <div className="text-xs text-gray-400 mt-4">Substitutes (→)</div>
                      {team.substitutes.map((sub) => (
                        <PlayerRow key={`sub-${sub.id}`} player={sub} isSubstituteList />
                      ))}
                    </>
                  )}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
                  <Link 
                    href={`/match/${team.matchId}/team/${team.id}`}
                    className="text-green-600 hover:text-green-800 font-medium"
                  >
                    View Team Details →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const PlayerRow = ({ 
  player, 
  isSubstituteList = false 
}: { 
  player: Player, 
  isSubstituteList?: boolean 
}) => (
  <div className={`flex items-center justify-between text-sm p-2 rounded ${
    player.wasSubstituted ? 'bg-yellow-50' :
    player.substitute ? 'bg-red-50' : 
    isSubstituteList ? 'bg-gray-100' : 'bg-gray-50'
  }`}>
    <div className="flex items-center">
      {isSubstituteList && (
        <span className="mr-1 text-yellow-600">→</span>
      )}
      {player.wasSubstituted && (
        <span className="mr-1 text-green-600">↑</span>
      )}
      <div className="relative w-8 h-8 mr-2">
        <Image
          src={player.imgURL || "/fallback.png"}
          alt={player.name}
          fill
          className="rounded-full object-cover"
          unoptimized
        />
      </div>
      <span className={player.substitute ? 'line-through' : ''}>
        {player.nickName || player.name}
        {player.keeper && ' (WK)'}
        {player.isOverseas && ' (OS)'}
        {player.wasSubstituted && player.replacedPlayer && ` (replaced ${player.replacedPlayer})`}
      </span>
    </div>
    <div className="text-right">
      <div className="text-xs text-gray-500">{player.teamName}</div>
      <div className="text-xs">Sel: {player.selectedBy?.toFixed(1)}%</div>
    </div>
  </div>
);


// import { GeneratedTeam } from "../../types/match";
// import { useEffect, useState } from "react";
// import { FiShare2, FiX, FiMaximize } from 'react-icons/fi';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faWhatsapp, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';

// interface TeamCardProps {
//   team: GeneratedTeam;
//   index: number;
//   isSelected: boolean;
//   onToggleSelect: () => void;
//   onUpdateTeam: (updatedTeam: GeneratedTeam) => void;
// }

// interface PlayerRowProps {
//   player: any;
//   isSubstitute: boolean;
//   wasSubstituted?: boolean;
//   isSubstituteList?: boolean;
// }

// const PlayerRow = ({ 
//   player, 
//   isSubstitute,
//   wasSubstituted,
//   isSubstituteList = false 
// }: PlayerRowProps) => (
//   <div className={`flex items-center justify-between text-sm p-2 rounded ${
//     wasSubstituted ? 'bg-yellow-900' :
//     isSubstitute ? 'bg-red-900' : 
//     isSubstituteList ? 'bg-gray-600' : 'bg-gray-800'
//   }`}>
//     <div className="flex items-center gap-2 w-full">
//       {isSubstituteList && (
//         <span className="text-yellow-400">→</span>
//       )}
//       {wasSubstituted && (
//         <span className="text-green-400">↑</span>
//       )}
//       <img 
//         src={player.imgURL || "/fallback.png"} 
//         alt={player.name} 
//         className="w-8 h-8 rounded-full"
//       />
//       <div className="flex-1">
//         <div className="flex justify-between items-center">
//           <span className={isSubstitute ? 'line-through' : ''}>
//             {player.name}
//             {player.keeper && ' (WK)'}
//             {wasSubstituted && ` (replaced ${player.replacedPlayer})`}
//           </span>
//         </div>
//         <p className="text-xs text-gray-400">{player.teamShortName || player.teamName}</p>
//       </div>
//     </div>
//   </div>
// );

// const normalizeRole = (role: string): string => {
//   if (!role) return 'Bowler'; 
  
//   const lowerRole = role.toLowerCase().trim();
//   if (lowerRole.includes('keep') || lowerRole.includes('wk')) return 'WK-Batsman';
//   if (lowerRole.includes('bat') && lowerRole.includes('all')) return 'Batting Allrounder';
//   if (lowerRole.includes('bowl') && lowerRole.includes('all')) return 'Bowling Allrounder';
//   if (lowerRole.includes('bat')) return 'Batsman';
//   if (lowerRole.includes('bowl')) return 'Bowler';
//   if (lowerRole.includes('all')) return 'Bowling Allrounder';
  
//   return 'Bowler';
// };

// export default function TeamCard({ 
//   team, 
//   index, 
//   isSelected, 
//   onToggleSelect,
//   onUpdateTeam
// }: TeamCardProps) {
//   const [originalTeam] = useState<GeneratedTeam>({...team});
//   const [changes, setChanges] = useState<number>((team as any).changes || 0);

//   const [playerChanges, setPlayerChanges] = useState<Array<{
//     out: string;
//     in: string;
//     role: string;
//   }>>([]);
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [showShareOptions, setShowShareOptions] = useState(false);

//   useEffect(() => {
//     const checkLineupChanges = () => {
//       const newPlayerChanges: Array<{
//         out: string;
//         in: string;
//         role: string;
//       }> = [];
      
//       let changeCount = 0;
      
//       const updatedPlayers = team.players.map(player => {
//         if (player.substitute) {
//           changeCount++;
      
//           const replacement = team.substitutes?.length
//             ? team.substitutes
//                 .filter(sub => normalizeRole(sub.role) === normalizeRole(player.role))
//                 .sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0))[0]
//             : null;
      
//           if (replacement) {
//             newPlayerChanges.push({
//               out: player.name,
//               in: replacement.name,
//               role: player.role
//             });
      
//             return {
//               ...replacement,
//               wasSubstituted: true,
//               replacedPlayer: player.name
//             };
//           }
//         }
//         return player;
//       });
      
//       if (changeCount > 0) {
//         setChanges(changeCount);
//         setPlayerChanges(newPlayerChanges);
        
//         const updatedTeam = {
//           ...team,
//           players: updatedPlayers,
//           changes: changeCount
//         };
        
//         onUpdateTeam(updatedTeam);
//       }
//     };
    
//     checkLineupChanges();
//   }, [team, onUpdateTeam]);

//   const playersByRole = {
//     'WK-Batsman': team.players.filter(p => p.roleOrder === 1),
//     'Batsman': team.players.filter(p => p.roleOrder === 2),
//     'Batting Allrounder': team.players.filter(p => p.roleOrder === 3),
//     'Bowling Allrounder': team.players.filter(p => p.roleOrder === 4),
//     'Bowler': team.players.filter(p => p.roleOrder === 5)
//   };

//   const team1Count = team.players.filter(p => p.teamName === team.captain.teamName).length;
//   const team2Count = 11 - team1Count;

//   const generateShareText = () => {
//     let text = `🏏 Fantasy Team ${index + 1} - ${team.team1ShortName} vs ${team.team2ShortName}\n\n`;
//     text += `👑 Captain: ${team.captain.name} (${team.captain.teamShortName})\n`;
//     text += `🌟 Vice-Captain: ${team.viceCaptain.name} (${team.viceCaptain.teamShortName})\n\n`;
    
//     text += "Playing XI:\n";
//     Object.entries(playersByRole).forEach(([role, players]) => {
//       if (players.length > 0) {
//         text += `\n${role}:\n`;
//         players.forEach(player => {
//           text += `• ${player.name} (${player.teamShortName}) ${player.wasSubstituted ? '(replaced)' : ''}\n`;
//         });
//       }
//     });
    
//     if (team.substitutes && team.substitutes.length > 0) {
//       text += "\nSubstitutes:\n";
//       team.substitutes.forEach(sub => {
//         text += `• ${sub.name} (${sub.teamShortName})\n`;
//       });
//     }
    
//     text += `\nTeam Balance: ${team1Count} ${team.team1ShortName} | ${team2Count} ${team.team2ShortName}\n`;
//     text += `Risk Level: ${team.riskLevel || 50}/100`;
    
//     return text;
//   };

//   const shareToWhatsApp = () => {
//     const text = generateShareText();
//     const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
//     window.open(url, '_blank');
//     setShowShareOptions(false);
//   };

//   const shareToTelegram = () => {
//     const text = generateShareText();
//     const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`;
//     window.open(url, '_blank');
//     setShowShareOptions(false);
//   };

//   const shareToTwitter = () => {
//     const text = generateShareText();
//     const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text.substring(0, 250) + (text.length > 250 ? '...' : ''))}`;
//     window.open(url, '_blank');
//     setShowShareOptions(false);
//   };

//   const copyToClipboard = () => {
//     const text = generateShareText();
//     navigator.clipboard.writeText(text).then(() => {
//       alert('Team copied to clipboard!');
//       setShowShareOptions(false);
//     });
//   };

//   const TeamContent = () => (
//     <>
//       {changes > 0 && (
//         <div className="absolute -top-2 -right-2 bg-yellow-500 text-black font-bold rounded-full h-6 w-6 flex items-center justify-center">
//           {changes}
//         </div>
//       )}
      
//       <div className="bg-gray-800 p-3 flex justify-between items-center">
//         <h3 className="font-bold">Team {index + 1}</h3>
//         <div className="flex items-center gap-2">
//           {changes > 0 && (
//             <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full">
//               {changes} change{changes > 1 ? 's' : ''}
//             </span>
//           )}
//           <div className="flex gap-2 items-center">
//             <button 
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setShowShareOptions(!showShareOptions);
//               }}
//               className="text-gray-300 hover:text-white p-1"
//             >
//               <FiShare2 size={18} />
//             </button>
//             <button 
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setIsFullScreen(!isFullScreen);
//               }}
//               className="text-gray-300 hover:text-white p-1"
//             >
//               {isFullScreen ? <FiX size={18} /> : <FiMaximize size={18} />}
//             </button>
//             <input
//               type="checkbox"
//               checked={isSelected}
//               onChange={(e) => {
//                 e.stopPropagation();
//                 onToggleSelect();
//               }}
//               onClick={(e) => e.stopPropagation()}
//               className="h-5 w-5 rounded text-blue-600 cursor-pointer"
//             />
//           </div>
//         </div>
//       </div>
      
//       {showShareOptions && (
//         <div className="absolute right-12 top-12 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10 p-2">
//           <button 
//             onClick={shareToWhatsApp}
//             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
//           >
//             <FontAwesomeIcon icon={faWhatsapp} className="text-green-400" /> WhatsApp
//           </button>
//           <button 
//             onClick={shareToTelegram}
//             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
//           >
//             <FontAwesomeIcon icon={faTelegram} className="text-blue-400" /> Telegram
//           </button>
//           <button 
//             onClick={shareToTwitter}
//             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
//           >
//             <FontAwesomeIcon icon={faTwitter} className="text-blue-400" /> Twitter
//           </button>
//           <button 
//             onClick={copyToClipboard}
//             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
//           >
//             <FiShare2 /> Copy Text
//           </button>
//         </div>
//       )}
      
//       <div className="bg-gray-700 p-4">
//         {playerChanges.length > 0 && (
//           <div className="mb-3 bg-yellow-900 p-2 rounded text-sm">
//             <div className="font-medium mb-1">Team Changes:</div>
//             {playerChanges.map((change, i) => (
//               <div key={i} className="flex justify-between">
//                 <span className="text-red-300 line-through">{change.out}</span>
//                 <span>→</span>
//                 <span className="text-green-300">{change.in}</span>
//                 <span className="text-gray-400 text-xs">{change.role}</span>
//               </div>
//             ))}
//           </div>
//         )}
        
//         <div className="flex gap-4 mb-3">
//           <div className="flex-1">
//             <div className="flex items-center gap-2 w-full">
//               <img 
//                 src={team.captain.imgURL || "/fallback.png"} 
//                 alt={team.captain.name} 
//                 className="w-10 h-10 rounded-full"
//               />
//               <div className="flex-1">
//                 <div className="flex justify-between items-center">
//                   <p className={`font-medium ${
//                     team.captain.wasSubstituted ? 'text-yellow-400' : 
//                     team.captain.substitute ? 'text-red-400' : 'text-white'
//                     }`}>
//                     <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-2">C</span>
//                     {team.captain.name}
//                   </p>
//                 </div>
//                 <p className="text-xs text-gray-400">{team.captain.teamShortName || team.captain.teamName}</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="flex-1">
//             <div className="flex items-center gap-2 w-full">
//               <img 
//                 src={team.viceCaptain.imgURL || "/fallback.png"} 
//                 alt={team.viceCaptain.name} 
//                 className="w-10 h-10 rounded-full"
//               />
//               <div className="flex-1">
//                 <div className="flex justify-between items-center">
//                   <p className={`font-medium ${
//                     team.viceCaptain.wasSubstituted ? 'text-yellow-400' : 
//                     team.viceCaptain.substitute ? 'text-red-400' : 'text-white'
//                   }`}>
//                     <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-2">VC</span>
//                     {team.viceCaptain.name}
//                   </p>
//                 </div>
//                 <p className="text-xs text-gray-400">{team.viceCaptain.teamShortName || team.viceCaptain.teamName}</p>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div className="mb-3 bg-gray-800 p-2 rounded">
//           <div className="flex justify-between text-sm mb-1">
//             <span>{team.team1ShortName}: {team1Count}</span>
//             <span>{team.team2ShortName}: {team2Count}</span>
//           </div>
//           <div className="flex flex-wrap gap-1 text-xs">
//             <span className="bg-gray-600 px-2 py-1 rounded">WK: {playersByRole['WK-Batsman'].length}</span>
//             <span className="bg-gray-600 px-2 py-1 rounded">Bats: {playersByRole['Batsman'].length}</span>
//             <span className="bg-gray-600 px-2 py-1 rounded">AR: {
//               playersByRole['Batting Allrounder'].length + playersByRole['Bowling Allrounder'].length
//             }</span>
//             <span className="bg-gray-600 px-2 py-1 rounded">Bowlers: {playersByRole['Bowler'].length}</span>
//           </div>
//         </div>
        
//         <div className={`space-y-2 ${isFullScreen ? '' : 'max-h-60'} overflow-y-auto`}>
//           {playersByRole['WK-Batsman'].length > 0 && (
//             <div className="text-xs text-gray-400 mt-2">Wicket Keepers</div>
//           )}
//           {playersByRole['WK-Batsman'].map((player, i) => (
//             <PlayerRow 
//               key={`wk-${i}`} 
//               player={player} 
//                                                       //isSubstitute={player.substitute}
//              isSubstitute={!!player.substitute}
//               wasSubstituted={player.wasSubstituted}
//             />
//           ))}
          
//           {playersByRole['Batsman'].length > 0 && (
//             <div className="text-xs text-gray-400 mt-2">Batsmen</div>
//           )}
//           {playersByRole['Batsman'].map((player, i) => (
//             <PlayerRow 
//               key={`bat-${i}`} 
//               player={player} 
//               isSubstitute={!!player.substitute}
//               wasSubstituted={player.wasSubstituted}
//             />
//           ))}
          
//           {playersByRole['Batting Allrounder'].length > 0 && (
//             <div className="text-xs text-gray-400 mt-2">Batting Allrounders</div>
//           )}
//           {playersByRole['Batting Allrounder'].map((player, i) => (
//             <PlayerRow 
//               key={`bar-${i}`} 
//               player={player} 
//               isSubstitute={!!player.substitute}
//               wasSubstituted={player.wasSubstituted}
//             />
//           ))}
          
//           {playersByRole['Bowling Allrounder'].length > 0 && (
//             <div className="text-xs text-gray-400 mt-2">Bowling Allrounders</div>
//           )}
//           {playersByRole['Bowling Allrounder'].map((player, i) => (
//             <PlayerRow 
//               key={`bowlar-${i}`} 
//               player={player} 
//              isSubstitute={!!player.substitute}
//               wasSubstituted={player.wasSubstituted}
//             />
//           ))}
          
//           {playersByRole['Bowler'].length > 0 && (
//             <div className="text-xs text-gray-400 mt-2">Bowlers</div>
//           )}
//           {playersByRole['Bowler'].map((player, i) => (
//             <PlayerRow 
//               key={`bowl-${i}`} 
//               player={player} 
//               isSubstitute={!!player.substitute}
//               wasSubstituted={player.wasSubstituted}
//             />
//           ))}
          
//           {team.substitutes && team.substitutes.length > 0 && (
//             <>
//               <div className="text-xs text-gray-400 mt-4">Substitutes (→)</div>
//               {team.substitutes.map((sub, i) => (
//                 <PlayerRow 
//                   key={`sub-${i}`} 
//                   player={sub} 
//                   isSubstitute={false} 
//                   isSubstituteList 
//                 />
//               ))}
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );

//   return (
//     <>
//       {!isFullScreen && (
//         <div 
//           className={`border-2 ${isSelected ? 'border-blue-500' : 'border-gray-700'} rounded-lg overflow-hidden relative cursor-pointer`}
//           onClick={() => onToggleSelect()}
//         >
//           <TeamContent />
//         </div>
//       )}
      
//       {isFullScreen && (
//         <div className="fixed inset-0 bg-gray-900 z-50 p-4 overflow-auto">
//           <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg overflow-hidden relative">
//             <TeamContent />
//             <button 
//               onClick={() => setIsFullScreen(false)}
//               className="absolute top-4 right-4 bg-gray-700 p-2 rounded-full hover:bg-gray-600"
//             >
//               <FiX size={20} />
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
























import { GeneratedTeam } from "../../types/match";
import { useEffect, useState } from "react";
import { FiShare2, FiX, FiMaximize } from 'react-icons/fi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';

interface TeamCardProps {
  team: GeneratedTeam;
  index: number;
  isSelected: boolean;
  onToggleSelect: () => void;
  onUpdateTeam: (updatedTeam: GeneratedTeam) => void;
  isNewTeam?: boolean;
}

interface PlayerRowProps {
  player: any;
  isSubstitute: boolean;
  wasSubstituted?: boolean;
  isSubstituteList?: boolean;
}

const getRiskColor = (riskLevel: number) => {
  if (riskLevel < 30) return '#10B981'; // green
  if (riskLevel < 70) return '#F59E0B'; // yellow
  return '#EF4444'; // red
};

const PlayerRow = ({ 
  player, 
  isSubstitute,
  wasSubstituted,
  isSubstituteList = false 
}: PlayerRowProps) => (
  <div className={`flex items-center justify-between text-sm p-2 rounded ${
    wasSubstituted ? 'bg-yellow-900' :
    isSubstitute ? 'bg-red-900' : 
    isSubstituteList ? 'bg-gray-600' : 'bg-gray-800'
  }`}>
    <div className="flex items-center gap-2 w-full">
      {isSubstituteList && (
        <span className="text-yellow-400">→</span>
      )}
      {wasSubstituted && (
        <span className="text-green-400">↑</span>
      )}
      <img 
        src={player.imgURL || "/fallback.png"} 
        alt={player.name} 
        className="w-8 h-8 rounded-full"
      />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <span className={isSubstitute ? 'line-through' : ''}>
            {player.name}
            {player.keeper && ' (WK)'}
            {wasSubstituted && ` (replaced ${player.replacedPlayer})`}
          </span>
        </div>
        <p className="text-xs text-gray-400">{player.teamShortName || player.teamName}</p>
      </div>
    </div>
  </div>
);

const normalizeRole = (role: string): string => {
  if (!role) return 'Bowler'; 
  
  const lowerRole = role.toLowerCase().trim();
  if (lowerRole.includes('keep') || lowerRole.includes('wk')) return 'WK-Batsman';
  if (lowerRole.includes('bat') && lowerRole.includes('all')) return 'Batting Allrounder';
  if (lowerRole.includes('bowl') && lowerRole.includes('all')) return 'Bowling Allrounder';
  if (lowerRole.includes('bat')) return 'Batsman';
  if (lowerRole.includes('bowl')) return 'Bowler';
  if (lowerRole.includes('all')) return 'Bowling Allrounder';
  
  return 'Bowler';
};

export default function TeamCard({ 
  team, 
  index, 
  isSelected, 
  onToggleSelect,
  onUpdateTeam,
  isNewTeam = false
}: TeamCardProps) {
  const [originalTeam] = useState<GeneratedTeam>({...team});
  const [changes, setChanges] = useState<number>((team as any).changes || 0);
  const [playerChanges, setPlayerChanges] = useState<Array<{
    out: string;
    in: string;
    role: string;
  }>>([]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Get opponent team name (the team that's not the captain's team)
  const opponentTeamName = team.players.find(
    p => p.teamName !== team.captain.teamName
  )?.teamName || 'Opponent';

  useEffect(() => {
    const checkLineupChanges = () => {
      const newPlayerChanges: Array<{
        out: string;
        in: string;
        role: string;
      }> = [];
      
      let changeCount = 0;
      
      const updatedPlayers = team.players.map(player => {
        if (player.substitute) {
          changeCount++;
      
          const replacement = team.substitutes?.length
            ? team.substitutes
                .filter(sub => normalizeRole(sub.role) === normalizeRole(player.role))
                .sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0))[0]
            : null;
      
          if (replacement) {
            newPlayerChanges.push({
              out: player.name,
              in: replacement.name,
              role: player.role
            });
      
            return {
              ...replacement,
              wasSubstituted: true,
              replacedPlayer: player.name
            };
          }
        }
        return player;
      });
      
      if (changeCount > 0) {
        setChanges(changeCount);
        setPlayerChanges(newPlayerChanges);
        
        const updatedTeam = {
          ...team,
          players: updatedPlayers,
          changes: changeCount
        };
        
        onUpdateTeam(updatedTeam);
      }
    };
    
    checkLineupChanges();
  }, [team, onUpdateTeam]);

  const playersByRole = {
    'WK-Batsman': team.players.filter(p => p.roleOrder === 1),
    'Batsman': team.players.filter(p => p.roleOrder === 2),
    'Batting Allrounder': team.players.filter(p => p.roleOrder === 3),
    'Bowling Allrounder': team.players.filter(p => p.roleOrder === 4),
    'Bowler': team.players.filter(p => p.roleOrder === 5)
  };

  const team1Count = team.players.filter(p => p.teamName === team.captain.teamName).length;
  const team2Count = 11 - team1Count;

  const generateShareText = () => {
    const captainTeamName = team.team1ShortName || team.captain.teamName;
    const opponentName = team.team2ShortName || opponentTeamName;
  
    let text = `Fantasy Team ${index + 1} - ${captainTeamName} vs ${opponentName}\n\n`;
    text += `Captain: ${team.captain.name} (${team.captain.teamShortName || team.captain.teamName})\n`;
    text += `Vice-Captain: ${team.viceCaptain.name} (${team.viceCaptain.teamShortName || team.viceCaptain.teamName})\n\n`;
  
    text += "Playing XI:\n";
    Object.entries(playersByRole).forEach(([role, players]) => {
      if (players.length > 0) {
        text += `${role}:\n`;
        players.forEach(player => {
          text += `• ${player.name} (${player.teamShortName || player.teamName}) ${player.wasSubstituted ? '(replaced)' : ''}\n`;
        });
      }
    });
  
    if (team.substitutes && team.substitutes.length > 0) {
      text += "\nSubstitutes:\n";
      team.substitutes.forEach(sub => {
        text += `• ${sub.name} (${sub.teamShortName || sub.teamName})\n`;
      });
    }
  
    text += `\nTeam Balance: ${team1Count} ${captainTeamName} | ${team2Count} ${opponentName}\n`;
    text += `Risk Level: ${team.riskLevel || 50}/100\n`;
  
    if (isNewTeam) {
      text += `\nNew team created for ${captainTeamName} vs ${opponentName} match`;
    }
  
    return text;
  };

  const shareToWhatsApp = () => {
    const text = generateShareText();
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setShowShareOptions(false);
  };

  const shareToTelegram = () => {
    const text = generateShareText();
    const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setShowShareOptions(false);
  };

  const shareToTwitter = () => {
    const text = generateShareText();
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text.substring(0, 250) + (text.length > 250 ? '...' : ''))}`;
    window.open(url, '_blank');
    setShowShareOptions(false);
  };

  const copyToClipboard = () => {
    const text = generateShareText();
    navigator.clipboard.writeText(text).then(() => {
      alert('Team copied to clipboard!');
      setShowShareOptions(false);
    });
  };

  const TeamContent = () => (
    <>
      {changes > 0 && (
        <div className="absolute -top-2 -right-2 bg-yellow-500 text-black font-bold rounded-full h-6 w-6 flex items-center justify-center">
          {changes}
        </div>
      )}
      
      {isNewTeam && (
        <div className="absolute -top-2 -left-2 bg-green-500 text-black font-bold rounded-full px-2 py-1 text-xs flex items-center justify-center">
          NEW
        </div>
      )}
      
      <div className="bg-gray-800 p-3 flex justify-between items-center">
        <h3 className="font-bold">Team {index + 1}</h3>
        <div className="flex items-center gap-2">
          {changes > 0 && (
            <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full">
              {changes} change{changes > 1 ? 's' : ''}
            </span>
          )}
          <div className="flex gap-2 items-center">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowShareOptions(!showShareOptions);
              }}
              className="text-gray-300 hover:text-white p-1"
            >
              <FiShare2 size={18} />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsFullScreen(!isFullScreen);
              }}
              className="text-gray-300 hover:text-white p-1"
            >
              {isFullScreen ? <FiX size={18} /> : <FiMaximize size={18} />}
            </button>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => {
                e.stopPropagation();
                onToggleSelect();
              }}
              onClick={(e) => e.stopPropagation()}
              className="h-5 w-5 rounded text-blue-600 cursor-pointer"
            />
          </div>
        </div>
      </div>
      
      {showShareOptions && (
        <div className="absolute right-12 top-12 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10 p-2">
          <button 
            onClick={shareToWhatsApp}
            className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
          >
            <FontAwesomeIcon icon={faWhatsapp} className="text-green-400" /> WhatsApp
          </button>
          <button 
            onClick={shareToTelegram}
            className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
          >
            <FontAwesomeIcon icon={faTelegram} className="text-blue-400" /> Telegram
          </button>
          <button 
            onClick={shareToTwitter}
            className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
          >
            <FontAwesomeIcon icon={faTwitter} className="text-blue-400" /> Twitter
          </button>
          <button 
            onClick={copyToClipboard}
            className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
          >
            <FiShare2 /> Copy Text
          </button>
        </div>
      )}
      
      <div className="bg-gray-700 p-4">
        {playerChanges.length > 0 && (
          <div className="mb-3 bg-yellow-900 p-2 rounded text-sm">
            <div className="font-medium mb-1">Team Changes:</div>
            {playerChanges.map((change, i) => (
              <div key={i} className="flex justify-between">
                <span className="text-red-300 line-through">{change.out}</span>
                <span>→</span>
                <span className="text-green-300">{change.in}</span>
                <span className="text-gray-400 text-xs">{change.role}</span>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex gap-4 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 w-full">
              <img 
                src={team.captain.imgURL || "/fallback.png"} 
                alt={team.captain.name} 
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className={`font-medium ${
                    team.captain.wasSubstituted ? 'text-yellow-400' : 
                    team.captain.substitute ? 'text-red-400' : 'text-white'
                    }`}>
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-2">C</span>
                    {team.captain.name}
                  </p>
                </div>
                <p className="text-xs text-gray-400">{team.captain.teamShortName || team.captain.teamName}</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 w-full">
              <img 
                src={team.viceCaptain.imgURL || "/fallback.png"} 
                alt={team.viceCaptain.name} 
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className={`font-medium ${
                    team.viceCaptain.wasSubstituted ? 'text-yellow-400' : 
                    team.viceCaptain.substitute ? 'text-red-400' : 'text-white'
                  }`}>
                    <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-2">VC</span>
                    {team.viceCaptain.name}
                  </p>
                </div>
                <p className="text-xs text-gray-400">{team.viceCaptain.teamShortName || team.viceCaptain.teamName}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-3 bg-gray-800 p-2 rounded">
          <div className="flex justify-between text-sm mb-1">
            <span>{team.team1ShortName || team.captain.teamName}: {team1Count}</span>
            <span>{team.team2ShortName || opponentTeamName}: {team2Count}</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <div className="flex flex-wrap gap-1 text-xs">
              <span className="bg-gray-600 px-2 py-1 rounded">WK: {playersByRole['WK-Batsman'].length}</span>
              <span className="bg-gray-600 px-2 py-1 rounded">Bats: {playersByRole['Batsman'].length}</span>
              <span className="bg-gray-600 px-2 py-1 rounded">AR: {
                playersByRole['Batting Allrounder'].length + playersByRole['Bowling Allrounder'].length
              }</span>
              <span className="bg-gray-600 px-2 py-1 rounded">Bowlers: {playersByRole['Bowler'].length}</span>
            </div>
            <div className="text-xs font-medium px-2 py-1 rounded" style={{
              backgroundColor: getRiskColor(team.riskLevel || 50),
              color: 'white'
            }}>
              Risk: {team.riskLevel || 50}%
            </div>
          </div>
        </div>
        
        <div className={`space-y-2 ${isFullScreen ? '' : 'max-h-60'} overflow-y-auto`}>
          {playersByRole['WK-Batsman'].length > 0 && (
            <div className="text-xs text-gray-400 mt-2">Wicket Keepers</div>
          )}
          {playersByRole['WK-Batsman'].map((player, i) => (
            <PlayerRow 
              key={`wk-${i}`} 
              player={player} 
              isSubstitute={!!player.substitute}
              wasSubstituted={player.wasSubstituted}
            />
          ))}
          
          {playersByRole['Batsman'].length > 0 && (
            <div className="text-xs text-gray-400 mt-2">Batsmen</div>
          )}
          {playersByRole['Batsman'].map((player, i) => (
            <PlayerRow 
              key={`bat-${i}`} 
              player={player} 
              isSubstitute={!!player.substitute}
              wasSubstituted={player.wasSubstituted}
            />
          ))}
          
          {playersByRole['Batting Allrounder'].length > 0 && (
            <div className="text-xs text-gray-400 mt-2">Batting Allrounders</div>
          )}
          {playersByRole['Batting Allrounder'].map((player, i) => (
            <PlayerRow 
              key={`bar-${i}`} 
              player={player} 
              isSubstitute={!!player.substitute}
              wasSubstituted={player.wasSubstituted}
            />
          ))}
          
          {playersByRole['Bowling Allrounder'].length > 0 && (
            <div className="text-xs text-gray-400 mt-2">Bowling Allrounders</div>
          )}
          {playersByRole['Bowling Allrounder'].map((player, i) => (
            <PlayerRow 
              key={`bowlar-${i}`} 
              player={player} 
              isSubstitute={!!player.substitute}
              wasSubstituted={player.wasSubstituted}
            />
          ))}
          
          {playersByRole['Bowler'].length > 0 && (
            <div className="text-xs text-gray-400 mt-2">Bowlers</div>
          )}
          {playersByRole['Bowler'].map((player, i) => (
            <PlayerRow 
              key={`bowl-${i}`} 
              player={player} 
              isSubstitute={!!player.substitute}
              wasSubstituted={player.wasSubstituted}
            />
          ))}
          
          {team.substitutes && team.substitutes.length > 0 && (
            <>
              <div className="text-xs text-gray-400 mt-4">Substitutes (→)</div>
              {team.substitutes.map((sub, i) => (
                <PlayerRow 
                  key={`sub-${i}`} 
                  player={sub} 
                  isSubstitute={false} 
                  isSubstituteList 
                />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );

  return (
    <>
      {!isFullScreen && (
        <div 
          className={`border-2 ${isSelected ? 'border-blue-500' : 'border-gray-700'} rounded-lg overflow-hidden relative cursor-pointer`}
          onClick={() => onToggleSelect()}
        >
          <TeamContent />
        </div>
      )}
      
      {isFullScreen && (
        <div className="fixed inset-0 bg-gray-900 z-50 p-4 overflow-auto">
          <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg overflow-hidden relative">
            <TeamContent />
            <button 
              onClick={() => setIsFullScreen(false)}
              className="absolute top-4 right-4 bg-gray-700 p-2 rounded-full hover:bg-gray-600"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

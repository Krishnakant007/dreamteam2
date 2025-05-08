

// // // import { GeneratedTeam } from "../../types/match";
// // // import { useEffect, useState } from "react";
// // // import { FiShare2, FiX, FiMaximize } from 'react-icons/fi';

// // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // import { faWhatsapp, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';

// // // interface TeamCardProps {
// // //   team: GeneratedTeam;
// // //   index: number;
// // //   isSelected: boolean;
// // //   onToggleSelect: () => void;
// // //   onUpdateTeam: (updatedTeam: GeneratedTeam) => void;
// // // }

// // // interface PlayerRowProps {
// // //   player: any;
// // //   isSubstitute: boolean;
// // //   wasSubstituted?: boolean;
// // //   isSubstituteList?: boolean;
// // // }

// // // const PlayerRow = ({
// // //   player,
// // //   isSubstitute,
// // //   wasSubstituted,
// // //   isSubstituteList = false
// // // }: PlayerRowProps) => (
// // //   <div className={`flex items-center justify-between text-sm p-2 rounded ${
// // //     wasSubstituted ? 'bg-yellow-900' :
// // //     isSubstitute ? 'bg-red-900' :
// // //     isSubstituteList ? 'bg-gray-600' : 'bg-gray-800'
// // //   }`}>
// // //     <div className="flex items-center gap-2 w-full">
// // //       {isSubstituteList && (
// // //         <span className="text-yellow-400">→</span>
// // //       )}
// // //       {wasSubstituted && (
// // //         <span className="text-green-400">↑</span>
// // //       )}
// // //       <img
// // //         src={player.imgURL || "/fallback.png"}
// // //         alt={player.name}
// // //         className="w-8 h-8 rounded-full"
// // //       />
// // //       <div className="flex-1">
// // //         <div className="flex justify-between items-center">
// // //           <span className={isSubstitute ? 'line-through' : ''}>
// // //             {player.name}
// // //             {player.keeper && ' (WK)'}
// // //             {wasSubstituted && ` (replaced ${player.replacedPlayer})`}
// // //           </span>
// // //         </div>
// // //         <p className="text-xs text-gray-400">{player.teamShortName || player.teamName}</p>
// // //       </div>
// // //     </div>
// // //   </div>
// // // );

// // // const normalizeRole = (role: string): string => {
// // //   if (!role) return 'Bowler';
  
// // //   const lowerRole = role.toLowerCase().trim();
// // //   if (lowerRole.includes('keep') || lowerRole.includes('wk')) return 'WK-Batsman';
// // //   if (lowerRole.includes('bat') && lowerRole.includes('all')) return 'Batting Allrounder';
// // //   if (lowerRole.includes('bowl') && lowerRole.includes('all')) return 'Bowling Allrounder';
// // //   if (lowerRole.includes('bat')) return 'Batsman';
// // //   if (lowerRole.includes('bowl')) return 'Bowler';
// // //   if (lowerRole.includes('all')) return 'Bowling Allrounder';
  
// // //   return 'Bowler';
// // // };

// // // export default function TeamCard({
// // //   team,
// // //   index,
// // //   isSelected,
// // //   onToggleSelect,
// // //   onUpdateTeam
// // // }: TeamCardProps) {
// // //   const [originalTeam] = useState<GeneratedTeam>({...team});
// // //   const [changes, setChanges] = useState<number>((team as any).changes || 0);

// // //   const [playerChanges, setPlayerChanges] = useState<Array<{
// // //     out: string;
// // //     in: string;
// // //     role: string;
// // //   }>>([]);
// // //   const [isFullScreen, setIsFullScreen] = useState(false);
// // //   const [showShareOptions, setShowShareOptions] = useState(false);

// // //   useEffect(() => {
// // //     const checkLineupChanges = () => {
// // //       const newPlayerChanges: Array<{
// // //         out: string;
// // //         in: string;
// // //         role: string;
// // //       }> = [];
      
// // //       let changeCount = 0;
      
// // //       const updatedPlayers = team.players.map(player => {
// // //         if (player.substitute) {
// // //           changeCount++;
      
// // //           const replacement = team.substitutes?.length
// // //             ? team.substitutes
// // //                 .filter(sub => normalizeRole(sub.role) === normalizeRole(player.role))
// // //                 .sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0))[0]
// // //             : null;
      
// // //           if (replacement) {
// // //             newPlayerChanges.push({
// // //               out: player.name,
// // //               in: replacement.name,
// // //               role: player.role
// // //             });
      
// // //             return {
// // //               ...replacement,
// // //               wasSubstituted: true,
// // //               replacedPlayer: player.name
// // //             };
// // //           }
// // //         }
// // //         return player;
// // //       });
      
// // //       if (changeCount > 0) {
// // //         setChanges(changeCount);
// // //         setPlayerChanges(newPlayerChanges);
        
// // //         const updatedTeam = {
// // //           ...team,
// // //           players: updatedPlayers,
// // //           changes: changeCount
// // //         };
        
// // //         onUpdateTeam(updatedTeam);
// // //       }
// // //     };
    
// // //     checkLineupChanges();
// // //   }, [team, onUpdateTeam]);

// // //   const playersByRole = {
// // //     'WK-Batsman': team.players.filter(p => p.roleOrder === 1),
// // //     'Batsman': team.players.filter(p => p.roleOrder === 2),
// // //     'Batting Allrounder': team.players.filter(p => p.roleOrder === 3),
// // //     'Bowling Allrounder': team.players.filter(p => p.roleOrder === 4),
// // //     'Bowler': team.players.filter(p => p.roleOrder === 5)
// // //   };

// // //   const team1Count = team.players.filter(p => p.teamName === team.captain.teamName).length;
// // //   const team2Count = 11 - team1Count;

// // //   const generateShareText = () => {
// // //     let text = `🏏 Fantasy Team ${index + 1} - ${team.team1ShortName} vs ${team.team2ShortName}\n\n`;
// // //     text += `👑 Captain: ${team.captain.name} (${team.captain.teamShortName})\n`;
// // //     text += `🌟 Vice-Captain: ${team.viceCaptain.name} (${team.viceCaptain.teamShortName})\n\n`;
    
// // //     text += "Playing XI:\n";
// // //     Object.entries(playersByRole).forEach(([role, players]) => {
// // //       if (players.length > 0) {
// // //         text += `\n${role}:\n`;
// // //         players.forEach(player => {
// // //           text += `• ${player.name} (${player.teamShortName}) ${player.wasSubstituted ? '(replaced)' : ''}\n`;
// // //         });
// // //       }
// // //     });
    
// // //     if (team.substitutes && team.substitutes.length > 0) {
// // //       text += "\nSubstitutes:\n";
// // //       team.substitutes.forEach(sub => {
// // //         text += `• ${sub.name} (${sub.teamShortName})\n`;
// // //       });
// // //     }
    
// // //     text += `\nTeam Balance: ${team1Count} ${team.team1ShortName} | ${team2Count} ${team.team2ShortName}\n`;
// // //     text += `Risk Level: ${team.riskLevel || 50}/100`;
    
// // //     return text;
// // //   };

// // //   const shareToWhatsApp = () => {
// // //     const text = generateShareText();
// // //     const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
// // //     window.open(url, '_blank');
// // //     setShowShareOptions(false);
// // //   };

// // //   const shareToTelegram = () => {
// // //     const text = generateShareText();
// // //     const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`;
// // //     window.open(url, '_blank');
// // //     setShowShareOptions(false);
// // //   };

// // //   const shareToTwitter = () => {
// // //     const text = generateShareText();
// // //     const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text.substring(0, 250) + (text.length > 250 ? '...' : ''))}`;
// // //     window.open(url, '_blank');
// // //     setShowShareOptions(false);
// // //   };

// // //   const copyToClipboard = () => {
// // //     const text = generateShareText();
// // //     navigator.clipboard.writeText(text).then(() => {
// // //       alert('Team copied to clipboard!');
// // //       setShowShareOptions(false);
// // //     });
// // //   };

// // //   const TeamContent = () => (
// // //     <>
// // //       {changes > 0 && (
// // //         <div className="absolute -top-2 -right-2 bg-yellow-500 text-black font-bold rounded-full h-6 w-6 flex items-center justify-center">
// // //           {changes}
// // //         </div>
// // //       )}
      
// // //       <div className="bg-gray-800 p-3 flex justify-between items-center">
// // //         <h3 className="font-bold">Team {index + 1}</h3>
// // //         <div className="flex items-center gap-2">
// // //           {changes > 0 && (
// // //             <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full">
// // //               {changes} change{changes > 1 ? 's' : ''}
// // //             </span>
// // //           )}
// // //           <div className="flex gap-2 items-center">
// // //             <button
// // //               onClick={(e) => {
// // //                 e.stopPropagation();
// // //                 setShowShareOptions(!showShareOptions);
// // //               }}
// // //               className="text-gray-300 hover:text-white p-1"
// // //             >
// // //               <FiShare2 size={18} />
// // //             </button>
// // //             <button
// // //               onClick={(e) => {
// // //                 e.stopPropagation();
// // //                 setIsFullScreen(!isFullScreen);
// // //               }}
// // //               className="text-gray-300 hover:text-white p-1"
// // //             >
// // //               {isFullScreen ? <FiX size={18} /> : <FiMaximize size={18} />}
// // //             </button>
// // //             <input
// // //               type="checkbox"
// // //               checked={isSelected}
// // //               onChange={(e) => {
// // //                 e.stopPropagation();
// // //                 onToggleSelect();
// // //               }}
// // //               onClick={(e) => e.stopPropagation()}
// // //               className="h-5 w-5 rounded text-blue-600 cursor-pointer"
// // //             />
// // //           </div>
// // //         </div>
// // //       </div>
      
// // //       {showShareOptions && (
// // //         <div className="absolute right-12 top-12 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10 p-2">
// // //           <button
// // //             onClick={shareToWhatsApp}
// // //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// // //           >
// // //             <FontAwesomeIcon icon={faWhatsapp} className="text-green-400" /> WhatsApp
// // //           </button>
// // //           <button
// // //             onClick={shareToTelegram}
// // //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// // //           >
// // //             <FontAwesomeIcon icon={faTelegram} className="text-blue-400" /> Telegram
// // //           </button>
// // //           <button
// // //             onClick={shareToTwitter}
// // //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// // //           >
// // //             <FontAwesomeIcon icon={faTwitter} className="text-blue-400" /> Twitter
// // //           </button>
// // //           <button
// // //             onClick={copyToClipboard}
// // //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// // //           >
// // //             <FiShare2 /> Copy Text
// // //           </button>
// // //         </div>
// // //       )}
      
// // //       <div className="bg-gray-700 p-4">
// // //         {playerChanges.length > 0 && (
// // //           <div className="mb-3 bg-yellow-900 p-2 rounded text-sm">
// // //             <div className="font-medium mb-1">Team Changes:</div>
// // //             {playerChanges.map((change, i) => (
// // //               <div key={i} className="flex justify-between">
// // //                 <span className="text-red-300 line-through">{change.out}</span>
// // //                 <span>→</span>
// // //                 <span className="text-green-300">{change.in}</span>
// // //                 <span className="text-gray-400 text-xs">{change.role}</span>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         )}
        
// // //         <div className="flex gap-4 mb-3">
// // //           <div className="flex-1">
// // //             <div className="flex items-center gap-2 w-full">
// // //               <img
// // //                 src={team.captain.imgURL || "/fallback.png"}
// // //                 alt={team.captain.name}
// // //                 className="w-10 h-10 rounded-full"
// // //               />
// // //               <div className="flex-1">
// // //                 <div className="flex justify-between items-center">
// // //                   <p className={`font-medium ${
// // //                     team.captain.wasSubstituted ? 'text-yellow-400' :
// // //                     team.captain.substitute ? 'text-red-400' : 'text-white'
// // //                     }`}>
// // //                     <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-2">C</span>
// // //                     {team.captain.name}
// // //                   </p>
// // //                 </div>
// // //                 <p className="text-xs text-gray-400">{team.captain.teamShortName || team.captain.teamName}</p>
// // //               </div>
// // //             </div>
// // //           </div>
          
// // //           <div className="flex-1">
// // //             <div className="flex items-center gap-2 w-full">
// // //               <img
// // //                 src={team.viceCaptain.imgURL || "/fallback.png"}
// // //                 alt={team.viceCaptain.name}
// // //                 className="w-10 h-10 rounded-full"
// // //               />
// // //               <div className="flex-1">
// // //                 <div className="flex justify-between items-center">
// // //                   <p className={`font-medium ${
// // //                     team.viceCaptain.wasSubstituted ? 'text-yellow-400' :
// // //                     team.viceCaptain.substitute ? 'text-red-400' : 'text-white'
// // //                   }`}>
// // //                     <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-2">VC</span>
// // //                     {team.viceCaptain.name}
// // //                   </p>
// // //                 </div>
// // //                 <p className="text-xs text-gray-400">{team.viceCaptain.teamShortName || team.viceCaptain.teamName}</p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
        
// // //         <div className="mb-3 bg-gray-800 p-2 rounded">
// // //           <div className="flex justify-between text-sm mb-1">
// // //             <span>{team.team1ShortName}: {team1Count}</span>
// // //             <span>{team.team2ShortName}: {team2Count}</span>
// // //           </div>
// // //           <div className="flex flex-wrap gap-1 text-xs">
// // //             <span className="bg-gray-600 px-2 py-1 rounded">WK: {playersByRole['WK-Batsman'].length}</span>
// // //             <span className="bg-gray-600 px-2 py-1 rounded">Bats: {playersByRole['Batsman'].length}</span>
// // //             <span className="bg-gray-600 px-2 py-1 rounded">AR: {
// // //               playersByRole['Batting Allrounder'].length + playersByRole['Bowling Allrounder'].length
// // //             }</span>
// // //             <span className="bg-gray-600 px-2 py-1 rounded">Bowlers: {playersByRole['Bowler'].length}</span>
// // //           </div>
// // //         </div>
        
// // //         <div className={`space-y-2 ${isFullScreen ? '' : 'max-h-60'} overflow-y-auto`}>
// // //           {playersByRole['WK-Batsman'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Wicket Keepers</div>
// // //           )}
// // //           {playersByRole['WK-Batsman'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`wk-${i}`}
// // //               player={player}
// // //                                                       //isSubstitute={player.substitute}
// // //              isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {playersByRole['Batsman'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Batsmen</div>
// // //           )}
// // //           {playersByRole['Batsman'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`bat-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {playersByRole['Batting Allrounder'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Batting Allrounders</div>
// // //           )}
// // //           {playersByRole['Batting Allrounder'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`bar-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {playersByRole['Bowling Allrounder'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Bowling Allrounders</div>
// // //           )}
// // //           {playersByRole['Bowling Allrounder'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`bowlar-${i}`}
// // //               player={player}
// // //              isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {playersByRole['Bowler'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Bowlers</div>
// // //           )}
// // //           {playersByRole['Bowler'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`bowl-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {team.substitutes && team.substitutes.length > 0 && (
// // //             <>
// // //               <div className="text-xs text-gray-400 mt-4">Substitutes (→)</div>
// // //               {team.substitutes.map((sub, i) => (
// // //                 <PlayerRow
// // //                   key={`sub-${i}`}
// // //                   player={sub}
// // //                   isSubstitute={false}
// // //                   isSubstituteList
// // //                 />
// // //               ))}
// // //             </>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </>
// // //   );

// // //   return (
// // //     <>
// // //       {!isFullScreen && (
// // //         <div
// // //           className={`border-2 ${isSelected ? 'border-blue-500' : 'border-gray-700'} rounded-lg overflow-hidden relative cursor-pointer`}
// // //           onClick={() => onToggleSelect()}
// // //         >
// // //           <TeamContent />
// // //         </div>
// // //       )}
      
// // //       {isFullScreen && (
// // //         <div className="fixed inset-0 bg-gray-900 z-50 p-4 overflow-auto">
// // //           <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg overflow-hidden relative">
// // //             <TeamContent />
// // //             <button
// // //               onClick={() => setIsFullScreen(false)}
// // //               className="absolute top-4 right-4 bg-gray-700 p-2 rounded-full hover:bg-gray-600"
// // //             >
// // //               <FiX size={20} />
// // //             </button>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </>
// // //   );
// // // }
























// // // import { GeneratedTeam } from "../../types/match";
// // // import { useEffect, useState } from "react";
// // // import { FiShare2, FiX, FiMaximize } from 'react-icons/fi';
// // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // import { faWhatsapp, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';

// // // interface TeamCardProps {
// // //   team: GeneratedTeam;
// // //   index: number;
// // //   isSelected: boolean;
// // //   onToggleSelect: () => void;
// // //   onUpdateTeam: (updatedTeam: GeneratedTeam) => void;
// // //   isNewTeam?: boolean;
// // // }

// // // interface PlayerRowProps {
// // //   player: any;
// // //   isSubstitute: boolean;
// // //   wasSubstituted?: boolean;
// // //   isSubstituteList?: boolean;
// // // }

// // // const getRiskColor = (riskLevel: number) => {
// // //   if (riskLevel < 30) return '#10B981'; // green
// // //   if (riskLevel < 70) return '#F59E0B'; // yellow
// // //   return '#EF4444'; // red
// // // };

// // // const PlayerRow = ({
// // //   player,
// // //   isSubstitute,
// // //   wasSubstituted,
// // //   isSubstituteList = false
// // // }: PlayerRowProps) => (
// // //   <div className={`flex items-center justify-between text-sm p-2 rounded ${
// // //     wasSubstituted ? 'bg-yellow-900' :
// // //     isSubstitute ? 'bg-red-900' :
// // //     isSubstituteList ? 'bg-gray-600' : 'bg-gray-800'
// // //   }`}>
// // //     <div className="flex items-center gap-2 w-full">
// // //       {isSubstituteList && (
// // //         <span className="text-yellow-400">→</span>
// // //       )}
// // //       {wasSubstituted && (
// // //         <span className="text-green-400">↑</span>
// // //       )}
// // //       <img
// // //         src={player.imgURL || "/fallback.png"}
// // //         alt={player.name}
// // //         className="w-8 h-8 rounded-full"
// // //       />
// // //       <div className="flex-1">
// // //         <div className="flex justify-between items-center">
// // //           <span className={isSubstitute ? 'line-through' : ''}>
// // //             {player.name}
// // //             {player.keeper && ' (WK)'}
// // //             {wasSubstituted && ` (replaced ${player.replacedPlayer})`}
// // //           </span>
// // //         </div>
// // //         <p className="text-xs text-gray-400">{player.teamShortName || player.teamName}</p>
// // //       </div>
// // //     </div>
// // //   </div>
// // // );

// // // const normalizeRole = (role: string): string => {
// // //   if (!role) return 'Bowler';
  
// // //   const lowerRole = role.toLowerCase().trim();
// // //   if (lowerRole.includes('keep') || lowerRole.includes('wk')) return 'WK-Batsman';
// // //   if (lowerRole.includes('bat') && lowerRole.includes('all')) return 'Batting Allrounder';
// // //   if (lowerRole.includes('bowl') && lowerRole.includes('all')) return 'Bowling Allrounder';
// // //   if (lowerRole.includes('bat')) return 'Batsman';
// // //   if (lowerRole.includes('bowl')) return 'Bowler';
// // //   if (lowerRole.includes('all')) return 'Bowling Allrounder';
  
// // //   return 'Bowler';
// // // };

// // // export default function TeamCard({
// // //   team,
// // //   index,
// // //   isSelected,
// // //   onToggleSelect,
// // //   onUpdateTeam,
// // //   isNewTeam = false
// // // }: TeamCardProps) {
// // //   const [originalTeam] = useState<GeneratedTeam>({...team});
// // //   const [changes, setChanges] = useState<number>((team as any).changes || 0);
// // //   const [playerChanges, setPlayerChanges] = useState<Array<{
// // //     out: string;
// // //     in: string;
// // //     role: string;
// // //   }>>([]);
// // //   const [isFullScreen, setIsFullScreen] = useState(false);
// // //   const [showShareOptions, setShowShareOptions] = useState(false);

// // //   // Get opponent team name (the team that's not the captain's team)
// // //   const opponentTeamName = team.players.find(
// // //     p => p.teamName !== team.captain.teamName
// // //   )?.teamName || 'Opponent';

// // //   useEffect(() => {
// // //     const checkLineupChanges = () => {
// // //       const newPlayerChanges: Array<{
// // //         out: string;
// // //         in: string;
// // //         role: string;
// // //       }> = [];
      
// // //       let changeCount = 0;
      
// // //       const updatedPlayers = team.players.map(player => {
// // //         if (player.substitute) {
// // //           changeCount++;
      
// // //           const replacement = team.substitutes?.length
// // //             ? team.substitutes
// // //                 .filter(sub => normalizeRole(sub.role) === normalizeRole(player.role))
// // //                 .sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0))[0]
// // //             : null;
      
// // //           if (replacement) {
// // //             newPlayerChanges.push({
// // //               out: player.name,
// // //               in: replacement.name,
// // //               role: player.role
// // //             });
      
// // //             return {
// // //               ...replacement,
// // //               wasSubstituted: true,
// // //               replacedPlayer: player.name
// // //             };
// // //           }
// // //         }
// // //         return player;
// // //       });
      
// // //       if (changeCount > 0) {
// // //         setChanges(changeCount);
// // //         setPlayerChanges(newPlayerChanges);
        
// // //         const updatedTeam = {
// // //           ...team,
// // //           players: updatedPlayers,
// // //           changes: changeCount
// // //         };
        
// // //         onUpdateTeam(updatedTeam);
// // //       }
// // //     };
    
// // //     checkLineupChanges();
// // //   }, [team, onUpdateTeam]);

// // //   const playersByRole = {
// // //     'WK-Batsman': team.players.filter(p => p.roleOrder === 1),
// // //     'Batsman': team.players.filter(p => p.roleOrder === 2),
// // //     'Batting Allrounder': team.players.filter(p => p.roleOrder === 3),
// // //     'Bowling Allrounder': team.players.filter(p => p.roleOrder === 4),
// // //     'Bowler': team.players.filter(p => p.roleOrder === 5)
// // //   };

// // //   const team1Count = team.players.filter(p => p.teamName === team.captain.teamName).length;
// // //   const team2Count = 11 - team1Count;

// // //   const generateShareText = () => {
// // //     const captainTeamName = team.team1ShortName || team.captain.teamName;
// // //     const opponentName = team.team2ShortName || opponentTeamName;
  
// // //     let text = `Fantasy Team ${index + 1} - ${captainTeamName} vs ${opponentName}\n\n`;
// // //     text += `Captain: ${team.captain.name} (${team.captain.teamShortName || team.captain.teamName})\n`;
// // //     text += `Vice-Captain: ${team.viceCaptain.name} (${team.viceCaptain.teamShortName || team.viceCaptain.teamName})\n\n`;
  
// // //     text += "Playing XI:\n";
// // //     Object.entries(playersByRole).forEach(([role, players]) => {
// // //       if (players.length > 0) {
// // //         text += `${role}:\n`;
// // //         players.forEach(player => {
// // //           text += `• ${player.name} (${player.teamShortName || player.teamName}) ${player.wasSubstituted ? '(replaced)' : ''}\n`;
// // //         });
// // //       }
// // //     });
  
// // //     if (team.substitutes && team.substitutes.length > 0) {
// // //       text += "\nSubstitutes:\n";
// // //       team.substitutes.forEach(sub => {
// // //         text += `• ${sub.name} (${sub.teamShortName || sub.teamName})\n`;
// // //       });
// // //     }
  
// // //     text += `\nTeam Balance: ${team1Count} ${captainTeamName} | ${team2Count} ${opponentName}\n`;
// // //     text += `Risk Level: ${team.riskLevel || 50}/100\n`;
  
// // //     if (isNewTeam) {
// // //       text += `\nNew team created for ${captainTeamName} vs ${opponentName} match`;
// // //     }
  
// // //     return text;
// // //   };

// // //   const shareToWhatsApp = () => {
// // //     const text = generateShareText();
// // //     const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
// // //     window.open(url, '_blank');
// // //     setShowShareOptions(false);
// // //   };

// // //   const shareToTelegram = () => {
// // //     const text = generateShareText();
// // //     const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`;
// // //     window.open(url, '_blank');
// // //     setShowShareOptions(false);
// // //   };

// // //   const shareToTwitter = () => {
// // //     const text = generateShareText();
// // //     const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text.substring(0, 250) + (text.length > 250 ? '...' : ''))}`;
// // //     window.open(url, '_blank');
// // //     setShowShareOptions(false);
// // //   };

// // //   const copyToClipboard = () => {
// // //     const text = generateShareText();
// // //     navigator.clipboard.writeText(text).then(() => {
// // //       alert('Team copied to clipboard!');
// // //       setShowShareOptions(false);
// // //     });
// // //   };

// // //   const TeamContent = () => (
// // //     <>
// // //       {changes > 0 && (
// // //         <div className="absolute -top-2 -right-2 bg-yellow-500 text-black font-bold rounded-full h-6 w-6 flex items-center justify-center">
// // //           {changes}
// // //         </div>
// // //       )}
      
// // //       {isNewTeam && (
// // //         <div className="absolute -top-2 -left-2 bg-green-500 text-black font-bold rounded-full px-2 py-1 text-xs flex items-center justify-center">
// // //           NEW
// // //         </div>
// // //       )}
      
// // //       <div className="bg-gray-800 p-3 flex justify-between items-center">
// // //         <h3 className="font-bold">Team {index + 1}</h3>
// // //         <div className="flex items-center gap-2">
// // //           {changes > 0 && (
// // //             <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full">
// // //               {changes} change{changes > 1 ? 's' : ''}
// // //             </span>
// // //           )}
// // //           <div className="flex gap-2 items-center">
// // //             <button
// // //               onClick={(e) => {
// // //                 e.stopPropagation();
// // //                 setShowShareOptions(!showShareOptions);
// // //               }}
// // //               className="text-gray-300 hover:text-white p-1"
// // //             >
// // //               <FiShare2 size={18} />
// // //             </button>
// // //             <button
// // //               onClick={(e) => {
// // //                 e.stopPropagation();
// // //                 setIsFullScreen(!isFullScreen);
// // //               }}
// // //               className="text-gray-300 hover:text-white p-1"
// // //             >
// // //               {isFullScreen ? <FiX size={18} /> : <FiMaximize size={18} />}
// // //             </button>
// // //             <input
// // //               type="checkbox"
// // //               checked={isSelected}
// // //               onChange={(e) => {
// // //                 e.stopPropagation();
// // //                 onToggleSelect();
// // //               }}
// // //               onClick={(e) => e.stopPropagation()}
// // //               className="h-5 w-5 rounded text-blue-600 cursor-pointer"
// // //             />
// // //           </div>
// // //         </div>
// // //       </div>
      
// // //       {showShareOptions && (
// // //         <div className="absolute right-12 top-12 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10 p-2">
// // //           <button
// // //             onClick={shareToWhatsApp}
// // //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// // //           >
// // //             <FontAwesomeIcon icon={faWhatsapp} className="text-green-400" /> WhatsApp
// // //           </button>
// // //           <button
// // //             onClick={shareToTelegram}
// // //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// // //           >
// // //             <FontAwesomeIcon icon={faTelegram} className="text-blue-400" /> Telegram
// // //           </button>
// // //           <button
// // //             onClick={shareToTwitter}
// // //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// // //           >
// // //             <FontAwesomeIcon icon={faTwitter} className="text-blue-400" /> Twitter
// // //           </button>
// // //           <button
// // //             onClick={copyToClipboard}
// // //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// // //           >
// // //             <FiShare2 /> Copy Text
// // //           </button>
// // //         </div>
// // //       )}
      
// // //       <div className="bg-gray-700 p-4">
// // //         {playerChanges.length > 0 && (
// // //           <div className="mb-3 bg-yellow-900 p-2 rounded text-sm">
// // //             <div className="font-medium mb-1">Team Changes:</div>
// // //             {playerChanges.map((change, i) => (
// // //               <div key={i} className="flex justify-between">
// // //                 <span className="text-red-300 line-through">{change.out}</span>
// // //                 <span>→</span>
// // //                 <span className="text-green-300">{change.in}</span>
// // //                 <span className="text-gray-400 text-xs">{change.role}</span>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         )}
        
// // //         <div className="flex gap-4 mb-3">
// // //           <div className="flex-1">
// // //             <div className="flex items-center gap-2 w-full">
// // //               <img
// // //                 src={team.captain.imgURL || "/fallback.png"}
// // //                 alt={team.captain.name}
// // //                 className="w-10 h-10 rounded-full"
// // //               />
// // //               <div className="flex-1">
// // //                 <div className="flex justify-between items-center">
// // //                   <p className={`font-medium ${
// // //                     team.captain.wasSubstituted ? 'text-yellow-400' :
// // //                     team.captain.substitute ? 'text-red-400' : 'text-white'
// // //                     }`}>
// // //                     <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-2">C</span>
// // //                     {team.captain.name}
// // //                   </p>
// // //                 </div>
// // //                 <p className="text-xs text-gray-400">{team.captain.teamShortName || team.captain.teamName}</p>
// // //               </div>
// // //             </div>
// // //           </div>
          
// // //           <div className="flex-1">
// // //             <div className="flex items-center gap-2 w-full">
// // //               <img
// // //                 src={team.viceCaptain.imgURL || "/fallback.png"}
// // //                 alt={team.viceCaptain.name}
// // //                 className="w-10 h-10 rounded-full"
// // //               />
// // //               <div className="flex-1">
// // //                 <div className="flex justify-between items-center">
// // //                   <p className={`font-medium ${
// // //                     team.viceCaptain.wasSubstituted ? 'text-yellow-400' :
// // //                     team.viceCaptain.substitute ? 'text-red-400' : 'text-white'
// // //                   }`}>
// // //                     <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-2">VC</span>
// // //                     {team.viceCaptain.name}
// // //                   </p>
// // //                 </div>
// // //                 <p className="text-xs text-gray-400">{team.viceCaptain.teamShortName || team.viceCaptain.teamName}</p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
        
// // //         <div className="mb-3 bg-gray-800 p-2 rounded">
// // //           <div className="flex justify-between text-sm mb-1">
// // //             <span>{team.team1ShortName || team.captain.teamName}: {team1Count}</span>
// // //             <span>{team.team2ShortName || opponentTeamName}: {team2Count}</span>
// // //           </div>
// // //           <div className="flex justify-between items-center mt-1">
// // //             <div className="flex flex-wrap gap-1 text-xs">
// // //               <span className="bg-gray-600 px-2 py-1 rounded">WK: {playersByRole['WK-Batsman'].length}</span>
// // //               <span className="bg-gray-600 px-2 py-1 rounded">Bats: {playersByRole['Batsman'].length}</span>
// // //               <span className="bg-gray-600 px-2 py-1 rounded">AR: {
// // //                 playersByRole['Batting Allrounder'].length + playersByRole['Bowling Allrounder'].length
// // //               }</span>
// // //               <span className="bg-gray-600 px-2 py-1 rounded">Bowlers: {playersByRole['Bowler'].length}</span>
// // //             </div>
// // //             <div className="text-xs font-medium px-2 py-1 rounded" style={{
// // //               backgroundColor: getRiskColor(team.riskLevel || 50),
// // //               color: 'white'
// // //             }}>
// // //               Risk: {team.riskLevel || 50}%
// // //             </div>
// // //           </div>
// // //         </div>
        
// // //         <div className={`space-y-2 ${isFullScreen ? '' : 'max-h-60'} overflow-y-auto`}>
// // //           {playersByRole['WK-Batsman'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Wicket Keepers</div>
// // //           )}
// // //           {playersByRole['WK-Batsman'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`wk-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {playersByRole['Batsman'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Batsmen</div>
// // //           )}
// // //           {playersByRole['Batsman'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`bat-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {playersByRole['Batting Allrounder'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Batting Allrounders</div>
// // //           )}
// // //           {playersByRole['Batting Allrounder'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`bar-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {playersByRole['Bowling Allrounder'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Bowling Allrounders</div>
// // //           )}
// // //           {playersByRole['Bowling Allrounder'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`bowlar-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {playersByRole['Bowler'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Bowlers</div>
// // //           )}
// // //           {playersByRole['Bowler'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`bowl-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {team.substitutes && team.substitutes.length > 0 && (
// // //             <>
// // //               <div className="text-xs text-gray-400 mt-4">Substitutes (→)</div>
// // //               {team.substitutes.map((sub, i) => (
// // //                 <PlayerRow
// // //                   key={`sub-${i}`}
// // //                   player={sub}
// // //                   isSubstitute={false}
// // //                   isSubstituteList
// // //                 />
// // //               ))}
// // //             </>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </>
// // //   );

// // //   return (
// // //     <>
// // //       {!isFullScreen && (
// // //         <div
// // //           className={`border-2 ${isSelected ? 'border-blue-500' : 'border-gray-700'} rounded-lg overflow-hidden relative cursor-pointer`}
// // //           onClick={() => onToggleSelect()}
// // //         >
// // //           <TeamContent />
// // //         </div>
// // //       )}
      
// // //       {isFullScreen && (
// // //         <div className="fixed inset-0 bg-gray-900 z-50 p-4 overflow-auto">
// // //           <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg overflow-hidden relative">
// // //             <TeamContent />
// // //             <button
// // //               onClick={() => setIsFullScreen(false)}
// // //               className="absolute top-4 right-4 bg-gray-700 p-2 rounded-full hover:bg-gray-600"
// // //             >
// // //               <FiX size={20} />
// // //             </button>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </>
// // //   );
// // // }







// // // import { GeneratedTeam } from "../../types/match";
// // // import { useEffect, useState } from "react";
// // // import { FiShare2, FiX, FiMaximize } from 'react-icons/fi';
// // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // import { faWhatsapp, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';

// // // interface TeamCardProps {
// // //   team: GeneratedTeam;
// // //   index: number;
// // //   isSelected: boolean;
// // //   onToggleSelect: () => void;
// // //   onUpdateTeam: (updatedTeam: GeneratedTeam) => void;
// // //   isNewTeam?: boolean;
// // // }

// // // interface PlayerRowProps {
// // //   player: any;
// // //   isSubstitute: boolean;
// // //   wasSubstituted?: boolean;
// // //   isSubstituteList?: boolean;
// // // }

// // // const getRiskColor = (riskLevel: number) => {
// // //   if (riskLevel < 30) return '#10B981'; // green
// // //   if (riskLevel < 70) return '#F59E0B'; // yellow
// // //   return '#EF4444'; // red
// // // };

// // // const PlayerRow = ({
// // //   player,
// // //   isSubstitute,
// // //   wasSubstituted,
// // //   isSubstituteList = false
// // // }: PlayerRowProps) => (
// // //   <div className={`flex items-center justify-between text-sm p-2 rounded ${
// // //     wasSubstituted ? 'bg-yellow-900' :
// // //     isSubstitute ? 'bg-red-900' :
// // //     isSubstituteList ? 'bg-gray-600' : 'bg-gray-800'
// // //   }`}>
// // //     <div className="flex items-center gap-2 w-full">
// // //       {isSubstituteList && (
// // //         <span className="text-yellow-400">→</span>
// // //       )}
// // //       {wasSubstituted && (
// // //         <span className="text-green-400">↑</span>
// // //       )}
// // //       <img
// // //         src={player.imgURL || "/fallback.png"}
// // //         alt={player.name}
// // //         className="w-8 h-8 rounded-full"
// // //       />
// // //       <div className="flex-1">
// // //         <div className="flex justify-between items-center">
// // //           <span className={isSubstitute ? 'line-through' : ''}>
// // //             {player.name}
// // //             {player.keeper && ' (WK)'}
// // //             {wasSubstituted && ` (replaced ${player.replacedPlayer})`}
// // //           </span>
// // //         </div>
// // //         <p className="text-xs text-gray-400">{player.teamShortName || player.teamName}</p>
// // //       </div>
// // //     </div>
// // //   </div>
// // // );

// // // const normalizeRole = (role: string): string => {
// // //   if (!role) return 'Bowler';
  
// // //   const lowerRole = role.toLowerCase().trim();
// // //   if (lowerRole.includes('keep') || lowerRole.includes('wk')) return 'WK-Batsman';
// // //   if (lowerRole.includes('bat') && lowerRole.includes('all')) return 'Batting Allrounder';
// // //   if (lowerRole.includes('bowl') && lowerRole.includes('all')) return 'Bowling Allrounder';
// // //   if (lowerRole.includes('bat')) return 'Batsman';
// // //   if (lowerRole.includes('bowl')) return 'Bowler';
// // //   if (lowerRole.includes('all')) return 'Bowling Allrounder';
  
// // //   return 'Bowler';
// // // };

// // // export default function TeamCard({
// // //   team,
// // //   index,
// // //   isSelected,
// // //   onToggleSelect,
// // //   onUpdateTeam,
// // //   isNewTeam = false
// // // }: TeamCardProps) {
// // //   const [originalTeam] = useState<GeneratedTeam>({...team});
// // //   const [changes, setChanges] = useState<number>((team as any).changes || 0);
// // //   const [playerChanges, setPlayerChanges] = useState<Array<{
// // //     out: string;
// // //     in: string;
// // //     role: string;
// // //   }>>([]);
// // //   const [isFullScreen, setIsFullScreen] = useState(false);
// // //   const [showShareOptions, setShowShareOptions] = useState(false);

// // //   const opponentTeamName = team.players.find(
// // //     p => p.teamName !== team.captain.teamName
// // //   )?.teamName || 'Opponent';

// // //   useEffect(() => {
// // //     const checkLineupChanges = () => {
// // //       const newPlayerChanges: Array<{
// // //         out: string;
// // //         in: string;
// // //         role: string;
// // //       }> = [];
      
// // //       let changeCount = 0;
      
// // //       const updatedPlayers = team.players.map(player => {
// // //         if (player.substitute) {
// // //           changeCount++;
      
// // //           const replacement = team.substitutes?.length
// // //             ? team.substitutes
// // //                 .filter(sub => normalizeRole(sub.role) === normalizeRole(player.role))
// // //                 .sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0))[0]
// // //             : null;
      
// // //           if (replacement) {
// // //             newPlayerChanges.push({
// // //               out: player.name,
// // //               in: replacement.name,
// // //               role: player.role
// // //             });
      
// // //             return {
// // //               ...replacement,
// // //               wasSubstituted: true,
// // //               replacedPlayer: player.name
// // //             };
// // //           }
// // //         }
// // //         return player;
// // //       });
      
// // //       if (changeCount > 0) {
// // //         setChanges(changeCount);
// // //         setPlayerChanges(newPlayerChanges);
        
// // //         const updatedTeam = {
// // //           ...team,
// // //           players: updatedPlayers,
// // //           changes: changeCount
// // //         };
        
// // //         onUpdateTeam(updatedTeam);
// // //       }
// // //     };
    
// // //     checkLineupChanges();
// // //   }, [team, onUpdateTeam]);

// // //   const playersByRole = {
// // //     'WK-Batsman': team.players.filter(p => p.roleOrder === 1),
// // //     'Batsman': team.players.filter(p => p.roleOrder === 2),
// // //     'Batting Allrounder': team.players.filter(p => p.roleOrder === 3),
// // //     'Bowling Allrounder': team.players.filter(p => p.roleOrder === 4),
// // //     'Bowler': team.players.filter(p => p.roleOrder === 5)
// // //   };

// // //   const team1Count = team.players.filter(p => p.teamName === team.captain.teamName).length;
// // //   const team2Count = 11 - team1Count;

// // //   const generateShareText = () => {
// // //     const captainTeamName = team.team1ShortName || team.captain.teamName;
// // //     const opponentName = team.team2ShortName || opponentTeamName;
  
// // //     let text = `Fantasy Team ${index + 1} - ${captainTeamName} vs ${opponentName}\n\n`;
// // //     text += `Captain: ${team.captain.name} (${team.captain.teamShortName || team.captain.teamName})\n`;
// // //     text += `Vice-Captain: ${team.viceCaptain.name} (${team.viceCaptain.teamShortName || team.viceCaptain.teamName})\n\n`;
  
// // //     text += "Playing XI:\n";
// // //     Object.entries(playersByRole).forEach(([role, players]) => {
// // //       if (players.length > 0) {
// // //         text += `${role}:\n`;
// // //         players.forEach(player => {
// // //           text += `• ${player.name} (${player.teamShortName || player.teamName}) ${player.wasSubstituted ? '(replaced)' : ''}\n`;
// // //         });
// // //       }
// // //     });
  
// // //     if (team.substitutes && team.substitutes.length > 0) {
// // //       text += "\nSubstitutes:\n";
// // //       team.substitutes.forEach(sub => {
// // //         text += `• ${sub.name} (${sub.teamShortName || sub.teamName})\n`;
// // //       });
// // //     }
  
// // //     text += `\nTeam Balance: ${team1Count} ${captainTeamName} | ${team2Count} ${opponentName}\n`;
// // //     text += `Risk Level: ${team.riskLevel || 50}/100\n`;
  
// // //     if (isNewTeam) {
// // //       text += `\nNew team created for ${captainTeamName} vs ${opponentName} match`;
// // //     }
  
// // //     return text;
// // //   };

// // //   const shareToWhatsApp = () => {
// // //     const text = generateShareText();
// // //     const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
// // //     window.open(url, '_blank');
// // //     setShowShareOptions(false);
// // //   };

// // //   const shareToTelegram = () => {
// // //     const text = generateShareText();
// // //     const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`;
// // //     window.open(url, '_blank');
// // //     setShowShareOptions(false);
// // //   };

// // //   const shareToTwitter = () => {
// // //     const text = generateShareText();
// // //     const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text.substring(0, 250) + (text.length > 250 ? '...' : ''))}`;
// // //     window.open(url, '_blank');
// // //     setShowShareOptions(false);
// // //   };

// // //   const copyToClipboard = () => {
// // //     const text = generateShareText();
// // //     navigator.clipboard.writeText(text).then(() => {
// // //       alert('Team copied to clipboard!');
// // //       setShowShareOptions(false);
// // //     });
// // //   };

// // //   const TeamContent = () => (
// // //     <>
// // //       {changes > 0 && (
// // //         <div className="absolute -top-2 -right-2 bg-yellow-500 text-black font-bold rounded-full h-6 w-6 flex items-center justify-center">
// // //           {changes}
// // //         </div>
// // //       )}
      
// // //       {isNewTeam && (
// // //         <div className="absolute -top-2 -left-2 bg-green-500 text-black font-bold rounded-full px-2 py-1 text-xs flex items-center justify-center">
// // //           NEW
// // //         </div>
// // //       )}
      
// // //       <div className="bg-gray-800 p-3 flex justify-between items-center">
// // //         <h3 className="font-bold">Team {index + 1}</h3>
// // //         <div className="flex items-center gap-2">
// // //           {changes > 0 && (
// // //             <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full">
// // //               {changes} change{changes > 1 ? 's' : ''}
// // //             </span>
// // //           )}
// // //           <div className="flex gap-2 items-center">
// // //             <button
// // //               onClick={(e) => {
// // //                 e.stopPropagation();
// // //                 setShowShareOptions(!showShareOptions);
// // //               }}
// // //               className="text-gray-300 hover:text-white p-1"
// // //             >
// // //               <FiShare2 size={18} />
// // //             </button>
// // //             <button
// // //               onClick={(e) => {
// // //                 e.stopPropagation();
// // //                 setIsFullScreen(!isFullScreen);
// // //               }}
// // //               className="text-gray-300 hover:text-white p-1"
// // //             >
// // //               {isFullScreen ? <FiX size={18} /> : <FiMaximize size={18} />}
// // //             </button>
// // //             <input
// // //               type="checkbox"
// // //               checked={isSelected}
// // //               onChange={(e) => {
// // //                 e.stopPropagation();
// // //                 onToggleSelect();
// // //               }}
// // //               onClick={(e) => e.stopPropagation()}
// // //               className="h-5 w-5 rounded text-blue-600 cursor-pointer"
// // //             />
// // //           </div>
// // //         </div>
// // //       </div>
      
// // //       {showShareOptions && (
// // //         <div className="absolute right-12 top-12 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10 p-2">
// // //           <button
// // //             onClick={shareToWhatsApp}
// // //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// // //           >
// // //             <FontAwesomeIcon icon={faWhatsapp} className="text-green-400" /> WhatsApp
// // //           </button>
// // //           <button
// // //             onClick={shareToTelegram}
// // //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// // //           >
// // //             <FontAwesomeIcon icon={faTelegram} className="text-blue-400" /> Telegram
// // //           </button>
// // //           <button
// // //             onClick={shareToTwitter}
// // //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// // //           >
// // //             <FontAwesomeIcon icon={faTwitter} className="text-blue-400" /> Twitter
// // //           </button>
// // //           <button
// // //             onClick={copyToClipboard}
// // //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// // //           >
// // //             <FiShare2 /> Copy Text
// // //           </button>
// // //         </div>
// // //       )}
      
// // //       <div className="bg-gray-700 p-4">
// // //         {playerChanges.length > 0 && (
// // //           <div className="mb-3 bg-yellow-900 p-2 rounded text-sm">
// // //             <div className="font-medium mb-1">Team Changes:</div>
// // //             {playerChanges.map((change, i) => (
// // //               <div key={i} className="flex justify-between">
// // //                 <span className="text-red-300 line-through">{change.out}</span>
// // //                 <span>→</span>
// // //                 <span className="text-green-300">{change.in}</span>
// // //                 <span className="text-gray-400 text-xs">{change.role}</span>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         )}
        
// // //         <div className="flex gap-4 mb-3">
// // //           <div className="flex-1">
// // //             <div className="flex items-center gap-2 w-full">
// // //               <img
// // //                 src={team.captain.imgURL || "/fallback.png"}
// // //                 alt={team.captain.name}
// // //                 className="w-10 h-10 rounded-full"
// // //               />
// // //               <div className="flex-1">
// // //                 <div className="flex justify-between items-center">
// // //                   <p className={`font-medium ${
// // //                     team.captain.wasSubstituted ? 'text-yellow-400' :
// // //                     team.captain.substitute ? 'text-red-400' : 'text-white'
// // //                     }`}>
// // //                     <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-2">C</span>
// // //                     {team.captain.name}
// // //                   </p>
// // //                 </div>
// // //                 <p className="text-xs text-gray-400">{team.captain.teamShortName || team.captain.teamName}</p>
// // //               </div>
// // //             </div>
// // //           </div>
          
// // //           <div className="flex-1">
// // //             <div className="flex items-center gap-2 w-full">
// // //               <img
// // //                 src={team.viceCaptain.imgURL || "/fallback.png"}
// // //                 alt={team.viceCaptain.name}
// // //                 className="w-10 h-10 rounded-full"
// // //               />
// // //               <div className="flex-1">
// // //                 <div className="flex justify-between items-center">
// // //                   <p className={`font-medium ${
// // //                     team.viceCaptain.wasSubstituted ? 'text-yellow-400' :
// // //                     team.viceCaptain.substitute ? 'text-red-400' : 'text-white'
// // //                   }`}>
// // //                     <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-2">VC</span>
// // //                     {team.viceCaptain.name}
// // //                   </p>
// // //                 </div>
// // //                 <p className="text-xs text-gray-400">{team.viceCaptain.teamShortName || team.viceCaptain.teamName}</p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
        
// // //         <div className="mb-3 bg-gray-800 p-2 rounded">
// // //           <div className="flex justify-between text-sm mb-1">
// // //             <span>{team.team1ShortName || team.captain.teamName}: {team1Count}</span>
// // //             <span>{team.team2ShortName || opponentTeamName}: {team2Count}</span>
// // //           </div>
// // //           <div className="flex justify-between items-center mt-1">
// // //             <div className="flex flex-wrap gap-1 text-xs">
// // //               <span className="bg-gray-600 px-2 py-1 rounded">WK: {playersByRole['WK-Batsman'].length}</span>
// // //               <span className="bg-gray-600 px-2 py-1 rounded">Bats: {playersByRole['Batsman'].length}</span>
// // //               <span className="bg-gray-600 px-2 py-1 rounded">AR: {
// // //                 playersByRole['Batting Allrounder'].length + playersByRole['Bowling Allrounder'].length
// // //               }</span>
// // //               <span className="bg-gray-600 px-2 py-1 rounded">Bowlers: {playersByRole['Bowler'].length}</span>
// // //             </div>
// // //             <div className="text-xs font-medium px-2 py-1 rounded" style={{
// // //               backgroundColor: getRiskColor(team.riskLevel || 50),
// // //               color: 'white'
// // //             }}>
// // //               Risk: {team.riskLevel || 50}%
// // //             </div>
// // //           </div>
// // //         </div>
        
// // //         <div className={`space-y-2 ${isFullScreen ? '' : 'max-h-60'} overflow-y-auto`}>
// // //           {playersByRole['WK-Batsman'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Wicket Keepers</div>
// // //           )}
// // //           {playersByRole['WK-Batsman'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`wk-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {playersByRole['Batsman'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Batsmen</div>
// // //           )}
// // //           {playersByRole['Batsman'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`bat-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {playersByRole['Batting Allrounder'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Batting Allrounders</div>
// // //           )}
// // //           {playersByRole['Batting Allrounder'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`bar-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {playersByRole['Bowling Allrounder'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Bowling Allrounders</div>
// // //           )}
// // //           {playersByRole['Bowling Allrounder'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`bowlar-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {playersByRole['Bowler'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Bowlers</div>
// // //           )}
// // //           {playersByRole['Bowler'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`bowl-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {team.substitutes && team.substitutes.length > 0 && (
// // //             <>
// // //               <div className="text-xs text-gray-400 mt-4">Substitutes (→)</div>
// // //               {team.substitutes.map((sub, i) => (
// // //                 <PlayerRow
// // //                   key={`sub-${i}`}
// // //                   player={sub}
// // //                   isSubstitute={false}
// // //                   isSubstituteList
// // //                 />
// // //               ))}
// // //             </>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </>
// // //   );

// // //   return (
// // //     <>
// // //       {!isFullScreen && (
// // //         <div
// // //           className={`border-2 ${isSelected ? 'border-blue-500' : 'border-gray-700'} rounded-none overflow-hidden relative w-screen -mx-4`}
// // //           style={{ width: 'calc(100% + 2rem)' }}
// // //           onClick={() => onToggleSelect()}
// // //         >
// // //           <TeamContent />
// // //         </div>
// // //       )}
      
// // //       {isFullScreen && (
// // //         <div className="fixed inset-0 bg-gray-900 z-50 p-0 m-0 w-screen">
// // //           <div className="w-full h-full bg-gray-800 overflow-hidden relative">
// // //             <TeamContent />
// // //             <button
// // //               onClick={() => setIsFullScreen(false)}
// // //               className="absolute top-2 right-2 bg-gray-700 p-1 rounded-full hover:bg-gray-600"
// // //             >
// // //               <FiX size={16} />
// // //             </button>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </>
// // //   );
// // // }


// // // import { useEffect, useState } from "react";
// // // import { FiShare2, FiX, FiMaximize } from 'react-icons/fi';
// // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // import { faWhatsapp, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';

// // // interface Player {
// // //   id: string;
// // //   name: string;
// // //   imgURL?: string;
// // //   teamName: string;
// // //   teamShortName?: string;
// // //   role: string;
// // //   roleOrder: number;
// // //   keeper?: boolean;
// // //   selectedBy?: number;
// // //   substitute?: boolean;
// // //   wasSubstituted?: boolean;
// // //   replacedPlayer?: string;
// // // }

// // // interface GeneratedTeam {
// // //   id: string;
// // //   name?: string;
// // //   players: Player[];
// // //   substitutes: Player[];
// // //   captain: Player;
// // //   viceCaptain: Player;
// // //   riskLevel?: number;
// // //   team1ShortName?: string;
// // //   team2ShortName?: string;
// // //   changes?: number;
// // // }

// // // interface TeamCardProps {
// // //   team: GeneratedTeam;
// // //   index: number;
// // //   isSelected: boolean;
// // //   onToggleSelect: () => void;
// // //   onUpdateTeam: (updatedTeam: GeneratedTeam) => void;
// // //   isNewTeam?: boolean;
// // // }

// // // interface PlayerRowProps {
// // //   player: Player;
// // //   isSubstitute: boolean;
// // //   wasSubstituted?: boolean;
// // //   isSubstituteList?: boolean;
// // // }

// // // const getRiskColor = (riskLevel: number) => {
// // //   if (riskLevel < 30) return '#10B981';
// // //   if (riskLevel < 70) return '#F59E0B';
// // //   return '#EF4444';
// // // };

// // // const PlayerRow = ({
// // //   player,
// // //   isSubstitute,
// // //   wasSubstituted,
// // //   isSubstituteList = false
// // // }: PlayerRowProps) => (
// // //   <div className={`flex items-center justify-between text-sm p-2 rounded ${
// // //     wasSubstituted ? 'bg-yellow-900' :
// // //     isSubstitute ? 'bg-red-900' :
// // //     isSubstituteList ? 'bg-gray-600' : 'bg-gray-800'
// // //   }`}>
// // //     <div className="flex items-center gap-2 w-full">
// // //       {isSubstituteList && <span className="text-yellow-400">→</span>}
// // //       {wasSubstituted && <span className="text-green-400">↑</span>}
// // //       <img
// // //         src={player.imgURL || "/fallback.png"}
// // //         alt={player.name}
// // //         className="w-8 h-8 rounded-full"
// // //         onError={(e) => {
// // //           const target = e.target as HTMLImageElement;
// // //           target.src = "/fallback.png";
// // //         }}
// // //       />
// // //       <div className="flex-1">
// // //         <div className="flex justify-between items-center">
// // //           <span className={isSubstitute ? 'line-through' : ''}>
// // //             {player.name}
// // //             {player.keeper && ' (WK)'}
// // //             {wasSubstituted && player.replacedPlayer && ` (replaced ${player.replacedPlayer})`}
// // //           </span>
// // //         </div>
// // //         <p className="text-xs text-gray-400">{player.teamShortName || player.teamName}</p>
// // //       </div>
// // //     </div>
// // //   </div>
// // // );

// // // const normalizeRole = (role: string): string => {
// // //   if (!role) return 'Bowler';
// // //   const lowerRole = role.toLowerCase().trim();
// // //   if (lowerRole.includes('keep') || lowerRole.includes('wk')) return 'WK-Batsman';
// // //   if (lowerRole.includes('bat') && lowerRole.includes('all')) return 'Batting Allrounder';
// // //   if (lowerRole.includes('bowl') && lowerRole.includes('all')) return 'Bowling Allrounder';
// // //   if (lowerRole.includes('bat')) return 'Batsman';
// // //   if (lowerRole.includes('bowl')) return 'Bowler';
// // //   if (lowerRole.includes('all')) return 'Bowling Allrounder';
// // //   return 'Bowler';
// // // };

// // // export default function TeamCard({
// // //   team,
// // //   index,
// // //   isSelected,
// // //   onToggleSelect,
// // //   onUpdateTeam,
// // //   isNewTeam = false
// // // }: TeamCardProps) {
// // //   const [changes, setChanges] = useState<number>(team.changes || 0);
// // //   const [playerChanges, setPlayerChanges] = useState<Array<{
// // //     out: string;
// // //     in: string;
// // //     role: string;
// // //   }>>([]);
// // //   const [isFullScreen, setIsFullScreen] = useState(false);
// // //   const [showShareOptions, setShowShareOptions] = useState(false);

// // //   const opponentTeamName = team.players.find(
// // //     p => p.teamName !== team.captain.teamName
// // //   )?.teamName || 'Opponent';

// // //   useEffect(() => {
// // //     const checkLineupChanges = () => {
// // //       const newPlayerChanges: Array<{
// // //         out: string;
// // //         in: string;
// // //         role: string;
// // //       }> = [];
      
// // //       let changeCount = 0;
      
// // //       const updatedPlayers = team.players.map(player => {
// // //         if (player.substitute) {
// // //           changeCount++;
      
// // //           const replacement = team.substitutes?.length
// // //             ? team.substitutes
// // //                 .filter(sub => normalizeRole(sub.role) === normalizeRole(player.role))
// // //                 .sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0))[0]
// // //             : null;
      
// // //           if (replacement) {
// // //             newPlayerChanges.push({
// // //               out: player.name,
// // //               in: replacement.name,
// // //               role: player.role
// // //             });
      
// // //             return {
// // //               ...replacement,
// // //               wasSubstituted: true,
// // //               replacedPlayer: player.name
// // //             };
// // //           }
// // //         }
// // //         return player;
// // //       });
      
// // //       if (changeCount > 0) {
// // //         setChanges(changeCount);
// // //         setPlayerChanges(newPlayerChanges);
        
// // //         const updatedTeam = {
// // //           ...team,
// // //           players: updatedPlayers,
// // //           changes: changeCount
// // //         };
        
// // //         onUpdateTeam(updatedTeam);
// // //       }
// // //     };
    
// // //     checkLineupChanges();
// // //   }, [team, onUpdateTeam]);

// // //   const playersByRole = {
// // //     'WK-Batsman': team.players.filter(p => normalizeRole(p.role) === 'WK-Batsman'),
// // //     'Batsman': team.players.filter(p => normalizeRole(p.role) === 'Batsman'),
// // //     'Batting Allrounder': team.players.filter(p => normalizeRole(p.role) === 'Batting Allrounder'),
// // //     'Bowling Allrounder': team.players.filter(p => normalizeRole(p.role) === 'Bowling Allrounder'),
// // //     'Bowler': team.players.filter(p => normalizeRole(p.role) === 'Bowler')
// // //   };

// // //   const team1Count = team.players.filter(p => p.teamName === team.captain.teamName).length;
// // //   const team2Count = 11 - team1Count;

// // //   const generateShareText = () => {
// // //     const captainTeamName = team.team1ShortName || team.captain.teamName;
// // //     const opponentName = team.team2ShortName || opponentTeamName;
  
// // //     let text = `Fantasy Team ${index + 1} - ${captainTeamName} vs ${opponentName}\n\n`;
// // //     text += `Captain: ${team.captain.name} (${team.captain.teamShortName || team.captain.teamName})\n`;
// // //     text += `Vice-Captain: ${team.viceCaptain.name} (${team.viceCaptain.teamShortName || team.viceCaptain.teamName})\n\n`;
  
// // //     text += "Playing XI:\n";
// // //     Object.entries(playersByRole).forEach(([role, players]) => {
// // //       if (players.length > 0) {
// // //         text += `${role}:\n`;
// // //         players.forEach(player => {
// // //           text += `• ${player.name} (${player.teamShortName || player.teamName}) ${player.wasSubstituted ? '(replaced)' : ''}\n`;
// // //         });
// // //       }
// // //     });
  
// // //     if (team.substitutes && team.substitutes.length > 0) {
// // //       text += "\nSubstitutes:\n";
// // //       team.substitutes.forEach(sub => {
// // //         text += `• ${sub.name} (${sub.teamShortName || sub.teamName})\n`;
// // //       });
// // //     }
  
// // //     text += `\nTeam Balance: ${team1Count} ${captainTeamName} | ${team2Count} ${opponentName}\n`;
// // //     text += `Risk Level: ${team.riskLevel || 50}/100\n`;
  
// // //     if (isNewTeam) {
// // //       text += `\nNew team created for ${captainTeamName} vs ${opponentName} match`;
// // //     }
  
// // //     return text;
// // //   };

// // //   const shareToWhatsApp = () => {
// // //     const text = generateShareText();
// // //     const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
// // //     window.open(url, '_blank');
// // //     setShowShareOptions(false);
// // //   };

// // //   const shareToTelegram = () => {
// // //     const text = generateShareText();
// // //     const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`;
// // //     window.open(url, '_blank');
// // //     setShowShareOptions(false);
// // //   };

// // //   const shareToTwitter = () => {
// // //     const text = generateShareText();
// // //     const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text.substring(0, 250) + (text.length > 250 ? '...' : ''))}`;
// // //     window.open(url, '_blank');
// // //     setShowShareOptions(false);
// // //   };

// // //   const copyToClipboard = () => {
// // //     const text = generateShareText();
// // //     navigator.clipboard.writeText(text).then(() => {
// // //       alert('Team copied to clipboard!');
// // //       setShowShareOptions(false);
// // //     });
// // //   };

// // //   const TeamContent = () => (
// // //     <>
// // //       {changes > 0 && (
// // //         <div className="absolute -top-2 -right-2 bg-yellow-500 text-black font-bold rounded-full h-6 w-6 flex items-center justify-center">
// // //           {changes}
// // //         </div>
// // //       )}
      
// // //       {isNewTeam && (
// // //         <div className="absolute -top-2 -left-2 bg-green-500 text-black font-bold rounded-full px-2 py-1 text-xs flex items-center justify-center">
// // //           NEW
// // //         </div>
// // //       )}
      
// // //       <div className="bg-gray-800 p-3 flex justify-between items-center">
// // //         <h3 className="font-bold">{team?.name || `Team ${index + 1}`}</h3>
// // //         <div className="flex items-center gap-2">
// // //           {changes > 0 && (
// // //             <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full">
// // //               {changes} change{changes > 1 ? 's' : ''}
// // //             </span>
// // //           )}
// // //           <div className="flex gap-2 items-center">
// // //             <button
// // //               onClick={(e) => {
// // //                 e.stopPropagation();
// // //                 setShowShareOptions(!showShareOptions);
// // //               }}
// // //               className="text-gray-300 hover:text-white p-1"
// // //               aria-label="Share team"
// // //             >
// // //               <FiShare2 size={18} />
// // //             </button>
// // //             <button
// // //               onClick={(e) => {
// // //                 e.stopPropagation();
// // //                 setIsFullScreen(!isFullScreen);
// // //               }}
// // //               className="text-gray-300 hover:text-white p-1"
// // //               aria-label={isFullScreen ? "Close full screen" : "View full screen"}
// // //             >
// // //               {isFullScreen ? <FiX size={18} /> : <FiMaximize size={18} />}
// // //             </button>
// // //             <input
// // //               type="checkbox"
// // //               checked={isSelected}
// // //               onChange={(e) => {
// // //                 e.stopPropagation();
// // //                 onToggleSelect();
// // //               }}
// // //               onClick={(e) => e.stopPropagation()}
// // //               className="h-5 w-5 rounded text-blue-600 cursor-pointer"
// // //               aria-label="Select team"
// // //             />
// // //           </div>
// // //         </div>
// // //       </div>
      
// // //       {showShareOptions && (
// // //         <div className="absolute right-12 top-12 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10 p-2">
// // //           <button
// // //             onClick={shareToWhatsApp}
// // //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// // //           >
// // //             <FontAwesomeIcon icon={faWhatsapp} className="text-green-400" /> WhatsApp
// // //           </button>
// // //           <button
// // //             onClick={shareToTelegram}
// // //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// // //           >
// // //             <FontAwesomeIcon icon={faTelegram} className="text-blue-400" /> Telegram
// // //           </button>
// // //           <button
// // //             onClick={shareToTwitter}
// // //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// // //           >
// // //             <FontAwesomeIcon icon={faTwitter} className="text-blue-400" /> Twitter
// // //           </button>
// // //           <button
// // //             onClick={copyToClipboard}
// // //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// // //           >
// // //             <FiShare2 /> Copy Text
// // //           </button>
// // //         </div>
// // //       )}
      
// // //       <div className="bg-gray-700 p-4">
// // //         {playerChanges.length > 0 && (
// // //           <div className="mb-3 bg-yellow-900 p-2 rounded text-sm">
// // //             <div className="font-medium mb-1">Team Changes:</div>
// // //             {playerChanges.map((change, i) => (
// // //               <div key={i} className="flex justify-between">
// // //                 <span className="text-red-300 line-through">{change.out}</span>
// // //                 <span>→</span>
// // //                 <span className="text-green-300">{change.in}</span>
// // //                 <span className="text-gray-400 text-xs">{change.role}</span>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         )}
        
// // //         <div className="flex gap-4 mb-3">
// // //           <div className="flex-1">
// // //             <div className="flex items-center gap-2 w-full">
// // //               <img
// // //                 src={team.captain.imgURL || "/fallback.png"}
// // //                 alt={team.captain.name}
// // //                 className="w-10 h-10 rounded-full"
// // //                 onError={(e) => {
// // //                   const target = e.target as HTMLImageElement;
// // //                   target.src = "/fallback.png";
// // //                 }}
// // //               />
// // //               <div className="flex-1">
// // //                 <div className="flex justify-between items-center">
// // //                   <p className={`font-medium ${
// // //                     team.captain.wasSubstituted ? 'text-yellow-400' :
// // //                     team.captain.substitute ? 'text-red-400' : 'text-white'
// // //                     }`}>
// // //                     <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-2">C</span>
// // //                     {team.captain.name}
// // //                   </p>
// // //                 </div>
// // //                 <p className="text-xs text-gray-400">{team.captain.teamShortName || team.captain.teamName}</p>
// // //               </div>
// // //             </div>
// // //           </div>
          
// // //           <div className="flex-1">
// // //             <div className="flex items-center gap-2 w-full">
// // //               <img
// // //                 src={team.viceCaptain.imgURL || "/fallback.png"}
// // //                 alt={team.viceCaptain.name}
// // //                 className="w-10 h-10 rounded-full"
// // //                 onError={(e) => {
// // //                   const target = e.target as HTMLImageElement;
// // //                   target.src = "/fallback.png";
// // //                 }}
// // //               />
// // //               <div className="flex-1">
// // //                 <div className="flex justify-between items-center">
// // //                   <p className={`font-medium ${
// // //                     team.viceCaptain.wasSubstituted ? 'text-yellow-400' :
// // //                     team.viceCaptain.substitute ? 'text-red-400' : 'text-white'
// // //                   }`}>
// // //                     <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-2">VC</span>
// // //                     {team.viceCaptain.name}
// // //                   </p>
// // //                 </div>
// // //                 <p className="text-xs text-gray-400">{team.viceCaptain.teamShortName || team.viceCaptain.teamName}</p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
        
// // //         <div className="mb-3 bg-gray-800 p-2 rounded">
// // //           <div className="flex justify-between text-sm mb-1">
// // //             <span>{team.team1ShortName || team.captain.teamName}: {team1Count}</span>
// // //             <span>{team.team2ShortName || opponentTeamName}: {team2Count}</span>
// // //           </div>
// // //           <div className="flex justify-between items-center mt-1">
// // //             <div className="flex flex-wrap gap-1 text-xs">
// // //               <span className="bg-gray-600 px-2 py-1 rounded">WK: {playersByRole['WK-Batsman'].length}</span>
// // //               <span className="bg-gray-600 px-2 py-1 rounded">Bats: {playersByRole['Batsman'].length}</span>
// // //               <span className="bg-gray-600 px-2 py-1 rounded">AR: {
// // //                 playersByRole['Batting Allrounder'].length + playersByRole['Bowling Allrounder'].length
// // //               }</span>
// // //               <span className="bg-gray-600 px-2 py-1 rounded">Bowlers: {playersByRole['Bowler'].length}</span>
// // //             </div>
// // //             <div className="text-xs font-medium px-2 py-1 rounded" style={{
// // //               backgroundColor: getRiskColor(team.riskLevel || 50),
// // //               color: 'white'
// // //             }}>
// // //               Risk: {team.riskLevel || 50}%
// // //             </div>
// // //           </div>
// // //         </div>
        
// // //         <div className={`space-y-2 ${isFullScreen ? '' : 'max-h-60'} overflow-y-auto`}>
// // //           {playersByRole['WK-Batsman'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Wicket Keepers</div>
// // //           )}
// // //           {playersByRole['WK-Batsman'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`wk-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {playersByRole['Batsman'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Batsmen</div>
// // //           )}
// // //           {playersByRole['Batsman'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`bat-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {playersByRole['Batting Allrounder'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Batting Allrounders</div>
// // //           )}
// // //           {playersByRole['Batting Allrounder'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`bar-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {playersByRole['Bowling Allrounder'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Bowling Allrounders</div>
// // //           )}
// // //           {playersByRole['Bowling Allrounder'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`bowlar-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {playersByRole['Bowler'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Bowlers</div>
// // //           )}
// // //           {playersByRole['Bowler'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`bowl-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {team.substitutes && team.substitutes.length > 0 && (
// // //             <>
// // //               <div className="text-xs text-gray-400 mt-4">Substitutes (→)</div>
// // //               {team.substitutes.map((sub, i) => (
// // //                 <PlayerRow
// // //                   key={`sub-${i}`}
// // //                   player={sub}
// // //                   isSubstitute={false}
// // //                   isSubstituteList
// // //                 />
// // //               ))}
// // //             </>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </>
// // //   );

// // //   const FullScreenView = () => {
// // //     const roleGroups = [
// // //       { title: "WICKET-KEEPERS", players: playersByRole['WK-Batsman'] },
// // //       { title: "BATTERS", players: playersByRole['Batsman'] },
// // //       {
// // //         title: "ALL-ROUNDERS",
// // //         players: [...playersByRole['Batting Allrounder'], ...playersByRole['Bowling Allrounder']]
// // //       },
// // //       { title: "BOWLERS", players: playersByRole['Bowler'] }
// // //     ];
  
// // //     return (
// // //       <div className="fixed inset-0 bg-gray-900 z-50 p-1 overflow-y-auto">
// // //         <div className="flex justify-between items-center mb-1 sticky top-0 bg-gray-900 py-1">
// // //           <h2 className="text-base font-bold text-white">{team?.name || `Team ${index + 1}`}</h2>
// // //           <button
// // //             onClick={() => setIsFullScreen(false)}
// // //             className="text-white p-0"
// // //             aria-label="Close full screen view"
// // //           >
// // //             <FiX size={18} />
// // //           </button>
// // //         </div>
  
// // //         <div className="space-y-3 px-1">
// // //           {roleGroups.map((group, i) => (
// // //             group.players.length > 0 && (
// // //               <div key={`role-${i}`} className="mb-1">
// // //                 <div className="text-xs font-medium mb-1 text-gray-300 text-center">
// // //                   {group.title}
// // //                 </div>
// // //                 <div className={`flex ${group.players.length === 1 ? 'justify-center' : 'justify-between'} flex-wrap gap-y-2`}>
// // //                   {group.players.map((player) => (
// // //                     <div key={`player-${player.id}`} className="flex flex-col items-center w-[32%]">
// // //                       <div className="relative">
// // //                         <img
// // //                           src={player.imgURL || "/fallback.png"}
// // //                           alt={player.name}
// // //                           className="w-11 h-11 rounded-full object-cover border border-gray-600"
// // //                           onError={(e) => {
// // //                             const target = e.target as HTMLImageElement;
// // //                             target.src = "/fallback.png";
// // //                           }}
// // //                         />
// // //                         {player.id === team.captain.id && (
// // //                           <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center border border-white">
// // //                             C
// // //                           </span>
// // //                         )}
// // //                         {player.id === team.viceCaptain.id && (
// // //                           <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center border border-white">
// // //                             VC
// // //                           </span>
// // //                         )}
// // //                       </div>
// // //                       <div className="text-[11px] font-medium text-white text-center mt-0.5 truncate w-full">
// // //                         {player.name?.split(" ")[0].charAt(0).toUpperCase() +
// // //                           player.name?.split(" ")[0].slice(1).toLowerCase()}
// // //                       </div>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             )
// // //           ))}
// // //         </div>
  
// // //         <div className="mt-3 text-center text-[11px] text-gray-400 sticky bottom-0 bg-gray-900 py-1">
// // //           {team.team1ShortName || team.captain.teamName} vs {team.team2ShortName || opponentTeamName}
// // //         </div>
// // //       </div>
// // //     );
// // //   };

// // //   return (
// // //     <>
// // //       {!isFullScreen && (
// // //         <div
// // //           className={`border-2 ${isSelected ? 'border-blue-500' : 'border-gray-700'} rounded-none overflow-hidden relative w-screen -mx-4`}
// // //           style={{ width: 'calc(100% + 2rem)' }}
// // //           onClick={() => onToggleSelect()}
// // //         >
// // //           <TeamContent />
// // //         </div>
// // //       )}
      
// // //       {isFullScreen && <FullScreenView />}
// // //     </>
// // //   );
// // // }










// // // import { useEffect, useState } from "react";
// // // import { FiShare2, FiX, FiMaximize } from 'react-icons/fi';
// // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // import { faWhatsapp, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';

// // // interface Player {
// // //   id: string;
// // //   name: string;
// // //   imgURL?: string;
// // //   teamName: string;
// // //   teamShortName?: string;
// // //   role: string;
// // //   roleOrder: number;
// // //   keeper?: boolean;
// // //   selectedBy?: number;
// // //   substitute?: boolean;
// // //   wasSubstituted?: boolean;
// // //   replacedPlayer?: string;
// // // }

// // // interface GeneratedTeam {
// // //   id: string;
// // //   name?: string;
// // //   players: Player[];
// // //   substitutes: Player[];
// // //   captain: Player;
// // //   viceCaptain: Player;
// // //   riskLevel?: number;
// // //   team1ShortName?: string;
// // //   team2ShortName?: string;
// // //   changes?: number;
// // // }

// // // interface TeamCardProps {
// // //   team: GeneratedTeam;
// // //   index: number;
// // //   isSelected: boolean;
// // //   onToggleSelect: () => void;
// // //   onUpdateTeam: (updatedTeam: GeneratedTeam) => void;
// // //   isNewTeam?: boolean;
// // // }

// // // interface PlayerRowProps {
// // //   player: Player;
// // //   isSubstitute: boolean;
// // //   wasSubstituted?: boolean;
// // //   isSubstituteList?: boolean;
// // // }

// // // const getRiskColor = (riskLevel: number) => {
// // //   if (riskLevel < 30) return '#10B981';
// // //   if (riskLevel < 70) return '#F59E0B';
// // //   return '#EF4444';
// // // };

// // // const PlayerRow = ({
// // //   player,
// // //   isSubstitute,
// // //   wasSubstituted,
// // //   isSubstituteList = false
// // // }: PlayerRowProps) => (
// // //   <div className={`flex items-center justify-between text-sm p-2 rounded ${
// // //     wasSubstituted ? 'bg-yellow-900' :
// // //     isSubstitute ? 'bg-red-900' :
// // //     isSubstituteList ? 'bg-gray-600' : 'bg-gray-800'
// // //   }`}>
// // //     <div className="flex items-center gap-2 w-full">
// // //       {isSubstituteList && <span className="text-yellow-400">→</span>}
// // //       {wasSubstituted && <span className="text-green-400">↑</span>}
// // //       <img
// // //         src={player.imgURL || "/fallback.png"}
// // //         alt={player.name}
// // //         className="w-8 h-8 rounded-full"
// // //         onError={(e) => {
// // //           const target = e.target as HTMLImageElement;
// // //           target.src = "/fallback.png";
// // //         }}
// // //       />
// // //       <div className="flex-1">
// // //         <div className="flex justify-between items-center">
// // //           <span className={isSubstitute ? 'line-through' : ''}>
// // //             {player.name}
// // //             {player.keeper && ' (WK)'}
// // //             {wasSubstituted && player.replacedPlayer && ` (replaced ${player.replacedPlayer})`}
// // //           </span>
// // //         </div>
// // //         <p className="text-xs text-gray-400">{player.teamShortName || player.teamName}</p>
// // //       </div>
// // //     </div>
// // //   </div>
// // // );

// // // const normalizeRole = (role: string): string => {
// // //   if (!role) return 'Bowler';
// // //   const lowerRole = role.toLowerCase().trim();
// // //   if (lowerRole.includes('keep') || lowerRole.includes('wk')) return 'WK-Batsman';
// // //   if (lowerRole.includes('bat') && lowerRole.includes('all')) return 'Batting Allrounder';
// // //   if (lowerRole.includes('bowl') && lowerRole.includes('all')) return 'Bowling Allrounder';
// // //   if (lowerRole.includes('bat')) return 'Batsman';
// // //   if (lowerRole.includes('bowl')) return 'Bowler';
// // //   if (lowerRole.includes('all')) return 'Bowling Allrounder';
// // //   return 'Bowler';
// // // };

// // // export default function TeamCard({
// // //   team,
// // //   index,
// // //   isSelected,
// // //   onToggleSelect,
// // //   onUpdateTeam,
// // //   isNewTeam = false
// // // }: TeamCardProps) {
// // //   const [changes, setChanges] = useState<number>(team.changes || 0);
// // //   const [playerChanges, setPlayerChanges] = useState<Array<{
// // //     out: string;
// // //     in: string;
// // //     role: string;
// // //   }>>([]);
// // //   const [isFullScreen, setIsFullScreen] = useState(false);
// // //   const [showShareOptions, setShowShareOptions] = useState(false);

// // //   const opponentTeamName = team.players.find(
// // //     p => p.teamName !== team.captain.teamName
// // //   )?.teamName || 'Opponent';

// // //   useEffect(() => {
// // //     const checkLineupChanges = () => {
// // //       const newPlayerChanges: Array<{
// // //         out: string;
// // //         in: string;
// // //         role: string;
// // //       }> = [];
      
// // //       let changeCount = 0;
      
// // //       const updatedPlayers = team.players.map(player => {
// // //         if (player.substitute) {
// // //           changeCount++;
      
// // //           const replacement = team.substitutes?.length
// // //             ? team.substitutes
// // //                 .filter(sub => normalizeRole(sub.role) === normalizeRole(player.role))
// // //                 .sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0))[0]
// // //             : null;
      
// // //           if (replacement) {
// // //             newPlayerChanges.push({
// // //               out: player.name,
// // //               in: replacement.name,
// // //               role: player.role
// // //             });
      
// // //             return {
// // //               ...replacement,
// // //               wasSubstituted: true,
// // //               replacedPlayer: player.name
// // //             };
// // //           }
// // //         }
// // //         return player;
// // //       });
      
// // //       if (changeCount > 0) {
// // //         setChanges(changeCount);
// // //         setPlayerChanges(newPlayerChanges);
        
// // //         const updatedTeam = {
// // //           ...team,
// // //           players: updatedPlayers,
// // //           changes: changeCount
// // //         };
        
// // //         onUpdateTeam(updatedTeam);
// // //       }
// // //     };
    
// // //     checkLineupChanges();
// // //   }, [team, onUpdateTeam]);

// // //   const playersByRole = {
// // //     'WK-Batsman': team.players.filter(p => normalizeRole(p.role) === 'WK-Batsman'),
// // //     'Batsman': team.players.filter(p => normalizeRole(p.role) === 'Batsman'),
// // //     'Batting Allrounder': team.players.filter(p => normalizeRole(p.role) === 'Batting Allrounder'),
// // //     'Bowling Allrounder': team.players.filter(p => normalizeRole(p.role) === 'Bowling Allrounder'),
// // //     'Bowler': team.players.filter(p => normalizeRole(p.role) === 'Bowler')
// // //   };

// // //   const team1Count = team.players.filter(p => p.teamName === team.captain.teamName).length;
// // //   const team2Count = 11 - team1Count;

// // //   const generateShareText = () => {
// // //     const captainTeamName = team.team1ShortName || team.captain.teamName;
// // //     const opponentName = team.team2ShortName || opponentTeamName;
  
// // //     let text = `Fantasy Team ${index + 1} - ${captainTeamName} vs ${opponentName}\n\n`;
// // //     text += `Captain: ${team.captain.name} (${team.captain.teamShortName || team.captain.teamName})\n`;
// // //     text += `Vice-Captain: ${team.viceCaptain.name} (${team.viceCaptain.teamShortName || team.viceCaptain.teamName})\n\n`;
  
// // //     text += "Playing XI:\n";
// // //     Object.entries(playersByRole).forEach(([role, players]) => {
// // //       if (players.length > 0) {
// // //         text += `${role}:\n`;
// // //         players.forEach(player => {
// // //           text += `• ${player.name} (${player.teamShortName || player.teamName}) ${player.wasSubstituted ? '(replaced)' : ''}\n`;
// // //         });
// // //       }
// // //     });
  
// // //     if (team.substitutes && team.substitutes.length > 0) {
// // //       text += "\nSubstitutes:\n";
// // //       team.substitutes.forEach(sub => {
// // //         text += `• ${sub.name} (${sub.teamShortName || sub.teamName})\n`;
// // //       });
// // //     }
  
// // //     text += `\nTeam Balance: ${team1Count} ${captainTeamName} | ${team2Count} ${opponentName}\n`;
// // //     text += `Risk Level: ${team.riskLevel || 50}/100\n`;
  
// // //     if (isNewTeam) {
// // //       text += `\nNew team created for ${captainTeamName} vs ${opponentName} match`;
// // //     }
  
// // //     return text;
// // //   };

// // //   const shareToWhatsApp = () => {
// // //     const text = generateShareText();
// // //     const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
// // //     window.open(url, '_blank');
// // //     setShowShareOptions(false);
// // //   };

// // //   const shareToTelegram = () => {
// // //     const text = generateShareText();
// // //     const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`;
// // //     window.open(url, '_blank');
// // //     setShowShareOptions(false);
// // //   };

// // //   const shareToTwitter = () => {
// // //     const text = generateShareText();
// // //     const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text.substring(0, 250) + (text.length > 250 ? '...' : ''))}`;
// // //     window.open(url, '_blank');
// // //     setShowShareOptions(false);
// // //   };

// // //   const copyToClipboard = () => {
// // //     const text = generateShareText();
// // //     navigator.clipboard.writeText(text).then(() => {
// // //       alert('Team copied to clipboard!');
// // //       setShowShareOptions(false);
// // //     });
// // //   };

// // //   const TeamContent = () => (
// // //     <>
// // //       {changes > 0 && (
// // //         <div className="absolute -top-2 -right-2 bg-yellow-500 text-black font-bold rounded-full h-6 w-6 flex items-center justify-center">
// // //           {changes}
// // //         </div>
// // //       )}
      
// // //       {isNewTeam && (
// // //         <div className="absolute -top-2 -left-2 bg-green-500 text-black font-bold rounded-full px-2 py-1 text-xs flex items-center justify-center">
// // //           NEW
// // //         </div>
// // //       )}
      
// // //       <div className="bg-gray-800 p-3 flex justify-between items-center">
// // //         <h3 className="font-bold">{team?.name || `Team ${index + 1}`}</h3>
// // //         <div className="flex items-center gap-2">
// // //           {changes > 0 && (
// // //             <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full">
// // //               {changes} change{changes > 1 ? 's' : ''}
// // //             </span>
// // //           )}
// // //           <div className="flex gap-2 items-center">
// // //             <button
// // //               onClick={(e) => {
// // //                 e.stopPropagation();
// // //                 setShowShareOptions(!showShareOptions);
// // //               }}
// // //               className="text-gray-300 hover:text-white p-1"
// // //               aria-label="Share team"
// // //             >
// // //               <FiShare2 size={18} />
// // //             </button>
// // //             <button
// // //               onClick={(e) => {
// // //                 e.stopPropagation();
// // //                 setIsFullScreen(!isFullScreen);
// // //               }}
// // //               className="text-gray-300 hover:text-white p-1"
// // //               aria-label={isFullScreen ? "Close full screen" : "View full screen"}
// // //             >
// // //               {isFullScreen ? <FiX size={18} /> : <FiMaximize size={18} />}
// // //             </button>
// // //             <input
// // //               type="checkbox"
// // //               checked={isSelected}
// // //               onChange={(e) => {
// // //                 e.stopPropagation();
// // //                 onToggleSelect();
// // //               }}
// // //               onClick={(e) => e.stopPropagation()}
// // //               className="h-5 w-5 rounded text-blue-600 cursor-pointer"
// // //               aria-label="Select team"
// // //             />
// // //           </div>
// // //         </div>
// // //       </div>
      
// // //       {showShareOptions && (
// // //         <div className="absolute right-12 top-12 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10 p-2">
// // //           <button
// // //             onClick={shareToWhatsApp}
// // //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// // //           >
// // //             <FontAwesomeIcon icon={faWhatsapp} className="text-green-400" /> WhatsApp
// // //           </button>
// // //           <button
// // //             onClick={shareToTelegram}
// // //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// // //           >
// // //             <FontAwesomeIcon icon={faTelegram} className="text-blue-400" /> Telegram
// // //           </button>
// // //           <button
// // //             onClick={shareToTwitter}
// // //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// // //           >
// // //             <FontAwesomeIcon icon={faTwitter} className="text-blue-400" /> Twitter
// // //           </button>
// // //           <button
// // //             onClick={copyToClipboard}
// // //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// // //           >
// // //             <FiShare2 /> Copy Text
// // //           </button>
// // //         </div>
// // //       )}
      
// // //       <div className="bg-gray-700 p-4">
// // //         {playerChanges.length > 0 && (
// // //           <div className="mb-3 bg-yellow-900 p-2 rounded text-sm">
// // //             <div className="font-medium mb-1">Team Changes:</div>
// // //             {playerChanges.map((change, i) => (
// // //               <div key={i} className="flex justify-between">
// // //                 <span className="text-red-300 line-through">{change.out}</span>
// // //                 <span>→</span>
// // //                 <span className="text-green-300">{change.in}</span>
// // //                 <span className="text-gray-400 text-xs">{change.role}</span>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         )}
        
// // //         <div className="flex gap-4 mb-3">
// // //           <div className="flex-1">
// // //             <div className="flex items-center gap-2 w-full">
// // //               <img
// // //                 src={team.captain.imgURL || "/fallback.png"}
// // //                 alt={team.captain.name}
// // //                 className="w-10 h-10 rounded-full"
// // //                 onError={(e) => {
// // //                   const target = e.target as HTMLImageElement;
// // //                   target.src = "/fallback.png";
// // //                 }}
// // //               />
// // //               <div className="flex-1">
// // //                 <div className="flex justify-between items-center">
// // //                   <p className={`font-medium ${
// // //                     team.captain.wasSubstituted ? 'text-yellow-400' :
// // //                     team.captain.substitute ? 'text-red-400' : 'text-white'
// // //                     }`}>
// // //                     <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-2">C</span>
// // //                     {team.captain.name}
// // //                   </p>
// // //                 </div>
// // //                 <p className="text-xs text-gray-400">{team.captain.teamShortName || team.captain.teamName}</p>
// // //               </div>
// // //             </div>
// // //           </div>
          
// // //           <div className="flex-1">
// // //             <div className="flex items-center gap-2 w-full">
// // //               <img
// // //                 src={team.viceCaptain.imgURL || "/fallback.png"}
// // //                 alt={team.viceCaptain.name}
// // //                 className="w-10 h-10 rounded-full"
// // //                 onError={(e) => {
// // //                   const target = e.target as HTMLImageElement;
// // //                   target.src = "/fallback.png";
// // //                 }}
// // //               />
// // //               <div className="flex-1">
// // //                 <div className="flex justify-between items-center">
// // //                   <p className={`font-medium ${
// // //                     team.viceCaptain.wasSubstituted ? 'text-yellow-400' :
// // //                     team.viceCaptain.substitute ? 'text-red-400' : 'text-white'
// // //                   }`}>
// // //                     <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-2">VC</span>
// // //                     {team.viceCaptain.name}
// // //                   </p>
// // //                 </div>
// // //                 <p className="text-xs text-gray-400">{team.viceCaptain.teamShortName || team.viceCaptain.teamName}</p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
        
// // //         <div className="mb-3 bg-gray-800 p-2 rounded">
// // //           <div className="flex justify-between text-sm mb-1">
// // //             <span>{team.team1ShortName || team.captain.teamName}: {team1Count}</span>
// // //             <span>{team.team2ShortName || opponentTeamName}: {team2Count}</span>
// // //           </div>
// // //           <div className="flex justify-between items-center mt-1">
// // //             <div className="flex flex-wrap gap-1 text-xs">
// // //               <span className="bg-gray-600 px-2 py-1 rounded">WK: {playersByRole['WK-Batsman'].length}</span>
// // //               <span className="bg-gray-600 px-2 py-1 rounded">Bats: {playersByRole['Batsman'].length}</span>
// // //               <span className="bg-gray-600 px-2 py-1 rounded">AR: {
// // //                 playersByRole['Batting Allrounder'].length + playersByRole['Bowling Allrounder'].length
// // //               }</span>
// // //               <span className="bg-gray-600 px-2 py-1 rounded">Bowlers: {playersByRole['Bowler'].length}</span>
// // //             </div>
// // //             <div className="text-xs font-medium px-2 py-1 rounded" style={{
// // //               backgroundColor: getRiskColor(team.riskLevel || 50),
// // //               color: 'white'
// // //             }}>
// // //               Risk: {team.riskLevel || 50}%
// // //             </div>
// // //           </div>
// // //         </div>
        
// // //         <div className={`space-y-2 ${isFullScreen ? '' : 'max-h-60'} overflow-y-auto`}>
// // //           {playersByRole['WK-Batsman'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Wicket Keepers</div>
// // //           )}
// // //           {playersByRole['WK-Batsman'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`wk-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {playersByRole['Batsman'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Batsmen</div>
// // //           )}
// // //           {playersByRole['Batsman'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`bat-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {playersByRole['Batting Allrounder'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Batting Allrounders</div>
// // //           )}
// // //           {playersByRole['Batting Allrounder'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`bar-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {playersByRole['Bowling Allrounder'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Bowling Allrounders</div>
// // //           )}
// // //           {playersByRole['Bowling Allrounder'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`bowlar-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {playersByRole['Bowler'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Bowlers</div>
// // //           )}
// // //           {playersByRole['Bowler'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`bowl-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {team.substitutes && team.substitutes.length > 0 && (
// // //             <>
// // //               <div className="text-xs text-gray-400 mt-4">Substitutes (→)</div>
// // //               {team.substitutes.map((sub, i) => (
// // //                 <PlayerRow
// // //                   key={`sub-${i}`}
// // //                   player={sub}
// // //                   isSubstitute={false}
// // //                   isSubstituteList
// // //                 />
// // //               ))}
// // //             </>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </>
// // //   );

// // //   const FullScreenView = () => {
// // //     const roleGroups = [
// // //       { title: "WICKET-KEEPERS", players: playersByRole['WK-Batsman'] },
// // //       { title: "BATTERS", players: playersByRole['Batsman'] },
// // //       {
// // //         title: "ALL-ROUNDERS",
// // //         players: [...playersByRole['Batting Allrounder'], ...playersByRole['Bowling Allrounder']]
// // //       },
// // //       { title: "BOWLERS", players: playersByRole['Bowler'] }
// // //     ];
  
// // //     return (
// // //       <div className="fixed inset-0 bg-gray-900 z-50 p-1 overflow-y-auto">
// // //         <div className="flex justify-between items-center mb-1 sticky top-0 bg-gray-900 py-1">
// // //           <h2 className="text-base font-bold text-white">{team?.name || `Team ${index + 1}`}</h2>
// // //           <button
// // //             onClick={() => setIsFullScreen(false)}
// // //             className="text-white p-0"
// // //             aria-label="Close full screen view"
// // //           >
// // //             <FiX size={18} />
// // //           </button>
// // //         </div>
  
// // //         <div className="space-y-3 px-1">
// // //           {roleGroups.map((group, i) => (
// // //             group.players.length > 0 && (
// // //               <div key={`role-${i}`} className="mb-1">
// // //                 <div className="text-xs font-medium mb-1 text-gray-300 text-center">
// // //                   {group.title}
// // //                 </div>
// // //                 <div className={`flex ${group.players.length === 1 ? 'justify-center' : 'justify-between'} flex-wrap gap-y-2`}>
// // //                   {group.players.map((player) => (
// // //                     <div key={`player-${player.id}`} className="flex flex-col items-center w-[32%]">
// // //                       <div className="relative">
// // //                         <img
// // //                           src={player.imgURL || "/fallback.png"}
// // //                           alt={player.name}
// // //                           className="w-11 h-11 rounded-full object-cover border border-gray-600"
// // //                           onError={(e) => {
// // //                             const target = e.target as HTMLImageElement;
// // //                             target.src = "/fallback.png";
// // //                           }}
// // //                         />
// // //                         {player.id === team.captain.id && (
// // //                           <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center border border-white">
// // //                             C
// // //                           </span>
// // //                         )}
// // //                         {player.id === team.viceCaptain.id && (
// // //                           <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center border border-white">
// // //                             VC
// // //                           </span>
// // //                         )}
// // //                       </div>
// // //                       <div className="text-[11px] font-medium text-white text-center mt-0.5 truncate w-full">
// // //                         {player.name?.split(" ")[0].charAt(0).toUpperCase() +
// // //                           player.name?.split(" ")[0].slice(1).toLowerCase()}
// // //                       </div>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             )
// // //           ))}
// // //         </div>
  
// // //         <div className="mt-3 text-center text-[11px] text-gray-400 sticky bottom-0 bg-gray-900 py-1">
// // //           {team.team1ShortName || team.captain.teamName} vs {team.team2ShortName || opponentTeamName}
// // //         </div>
// // //       </div>
// // //     );
// // //   };

// // //   return (
// // //     <>
// // //       {!isFullScreen && (
// // //         <div
// // //           className={`border-2 ${isSelected ? 'border-blue-500' : 'border-gray-700'} rounded-none overflow-hidden relative w-screen -mx-4`}
// // //           style={{ width: 'calc(100% + 2rem)' }}
// // //           onClick={() => onToggleSelect()}
// // //         >
// // //           <TeamContent />
// // //         </div>
// // //       )}
      
// // //       {isFullScreen && <FullScreenView />}
// // //     </>
// // //   );
// // // }







// // // // 14-4-2025

// // //  // TeamCard.tsx
// // // import { useEffect, useState } from "react";
// // // import { FiShare2, FiX, FiMaximize } from 'react-icons/fi';
// // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // import { faWhatsapp, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';

// // // interface Player {
// // //   id: string;
// // //   name: string;
// // //   imgURL?: string;
// // //   teamName: string;
// // //   teamShortName?: string;
// // //   role: string;
// // //   roleOrder: number;
// // //   keeper?: boolean;
// // //   selectedBy?: number;
// // //   substitute?: boolean;
// // //   wasSubstituted?: boolean;
// // //   replacedPlayer?: string;
// // // }

// // // interface GeneratedTeam {
// // //   id: number;
// // //   name?: string;
// // //   players: Player[];
// // //   substitutes: Player[];
// // //   captain: Player;
// // //   viceCaptain: Player;
// // //   riskLevel?: number;
// // //   team1ShortName?: string;
// // //   team2ShortName?: string;
// // //   changes?: number;
// // // }

// // // interface TeamCardProps {
// // //   team: GeneratedTeam;
// // //   index: number;
// // //   isSelected: boolean;
// // //   onToggleSelect: () => void;
// // //   onUpdateTeam: (updatedTeam: GeneratedTeam) => void;
// // //   isNewTeam?: boolean;
// // // }

// // // interface PlayerRowProps {
// // //   player: Player;
// // //   isSubstitute: boolean;
// // //   wasSubstituted?: boolean;
// // //   isSubstituteList?: boolean;
// // // }

// // // const getRiskColor = (riskLevel: number) => {
// // //   if (riskLevel < 30) return '#10B981';
// // //   if (riskLevel < 70) return '#F59E0B';
// // //   return '#EF4444';
// // // };

// // // const PlayerRow = ({
// // //   player,
// // //   isSubstitute,
// // //   wasSubstituted,
// // //   isSubstituteList = false
// // // }: PlayerRowProps) => (
// // //   <div className={`flex items-center justify-between text-sm p-2 rounded ${
// // //     wasSubstituted ? 'bg-yellow-900' :
// // //     isSubstitute ? 'bg-red-900' :
// // //     isSubstituteList ? 'bg-gray-600' : 'bg-gray-800'
// // //   }`}>
// // //     <div className="flex items-center gap-2 w-full">
// // //       {isSubstituteList && <span className="text-yellow-400">→</span>}
// // //       {wasSubstituted && <span className="text-green-400">↑</span>}
// // //       <img
// // //         src={player.imgURL || "/fallback.png"}
// // //         alt={player.name}
// // //         className="w-8 h-8 rounded-full"
// // //         onError={(e) => {
// // //           const target = e.target as HTMLImageElement;
// // //           target.src = "/fallback.png";
// // //         }}
// // //       />
// // //       <div className="flex-1">
// // //         <div className="flex justify-between items-center">
// // //           <span className={isSubstitute ? 'line-through' : ''}>
// // //             {player.name}
// // //             {player.keeper && ' (WK)'}
// // //             {wasSubstituted && player.replacedPlayer && ` (replaced ${player.replacedPlayer})`}
// // //           </span>
// // //         </div>
// // //         <p className="text-xs text-gray-400">{player.teamShortName || player.teamName}</p>
// // //       </div>
// // //     </div>
// // //   </div>
// // // );

// // // const normalizeRole = (role: string): string => {
// // //   if (!role) return 'Bowler';
// // //   const lowerRole = role.toLowerCase().trim();
// // //   if (lowerRole.includes('keep') || lowerRole.includes('wk')) return 'WK-Batsman';
// // //   if (lowerRole.includes('bat') && lowerRole.includes('all')) return 'Batting Allrounder';
// // //   if (lowerRole.includes('bowl') && lowerRole.includes('all')) return 'Bowling Allrounder';
// // //   if (lowerRole.includes('bat')) return 'Batsman';
// // //   if (lowerRole.includes('bowl')) return 'Bowler';
// // //   if (lowerRole.includes('all')) return 'Bowling Allrounder';
// // //   return 'Bowler';
// // // };

// // // export default function TeamCard({
// // //   team,
// // //   index,
// // //   isSelected,
// // //   onToggleSelect,
// // //   onUpdateTeam,
// // //   isNewTeam = false
// // // }: TeamCardProps) {
// // //   const [changes, setChanges] = useState<number>(team.changes || 0);
// // //   const [playerChanges, setPlayerChanges] = useState<Array<{
// // //     out: string;
// // //     in: string;
// // //     role: string;
// // //   }>>([]);
// // //   const [isFullScreen, setIsFullScreen] = useState(false);
// // //   const [showShareOptions, setShowShareOptions] = useState(false);

// // //   const opponentTeamName = team.players.find(
// // //     p => p.teamName !== team.captain.teamName
// // //   )?.teamName || 'Opponent';

// // //   useEffect(() => {
// // //     const checkLineupChanges = () => {
// // //       const newPlayerChanges: Array<{
// // //         out: string;
// // //         in: string;
// // //         role: string;
// // //       }> = [];
      
// // //       let changeCount = 0;
      
// // //       const updatedPlayers = team.players.map(player => {
// // //         if (player.substitute) {
// // //           changeCount++;
      
// // //           const replacement = team.substitutes?.length
// // //             ? team.substitutes
// // //                 .filter(sub => normalizeRole(sub.role) === normalizeRole(player.role))
// // //                 .sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0))[0]
// // //             : null;
      
// // //           if (replacement) {
// // //             newPlayerChanges.push({
// // //               out: player.name,
// // //               in: replacement.name,
// // //               role: player.role
// // //             });
      
// // //             return {
// // //               ...replacement,
// // //               wasSubstituted: true,
// // //               replacedPlayer: player.name
// // //             };
// // //           }
// // //         }
// // //         return player;
// // //       });
      
// // //       if (changeCount > 0) {
// // //         setChanges(changeCount);
// // //         setPlayerChanges(newPlayerChanges);
        
// // //         const updatedTeam = {
// // //           ...team,
// // //           players: updatedPlayers,
// // //           changes: changeCount
// // //         };
        
// // //         onUpdateTeam(updatedTeam);
// // //       }
// // //     };
    
// // //     checkLineupChanges();
// // //   }, [team, onUpdateTeam]);

// // //   const playersByRole = {
// // //     'WK-Batsman': team.players.filter(p => normalizeRole(p.role) === 'WK-Batsman'),
// // //     'Batsman': team.players.filter(p => normalizeRole(p.role) === 'Batsman'),
// // //     'Batting Allrounder': team.players.filter(p => normalizeRole(p.role) === 'Batting Allrounder'),
// // //     'Bowling Allrounder': team.players.filter(p => normalizeRole(p.role) === 'Bowling Allrounder'),
// // //     'Bowler': team.players.filter(p => normalizeRole(p.role) === 'Bowler')
// // //   };

// // //   const team1Count = team.players.filter(p => p.teamName === team.captain.teamName).length;
// // //   const team2Count = 11 - team1Count;

// // //   const generateShareText = () => {
// // //     const captainTeamName = team.team1ShortName || team.captain.teamName;
// // //     const opponentName = team.team2ShortName || opponentTeamName;
  
// // //     let text = `Fantasy Team ${index + 1} - ${captainTeamName} vs ${opponentName}\n\n`;
// // //     text += `Captain: ${team.captain.name} (${team.captain.teamShortName || team.captain.teamName})\n`;
// // //     text += `Vice-Captain: ${team.viceCaptain.name} (${team.viceCaptain.teamShortName || team.viceCaptain.teamName})\n\n`;
  
// // //     text += "Playing XI:\n";
// // //     Object.entries(playersByRole).forEach(([role, players]) => {
// // //       if (players.length > 0) {
// // //         text += `${role}:\n`;
// // //         players.forEach(player => {
// // //           text += `• ${player.name} (${player.teamShortName || player.teamName}) ${player.wasSubstituted ? '(replaced)' : ''}\n`;
// // //         });
// // //       }
// // //     });
  
// // //     if (team.substitutes && team.substitutes.length > 0) {
// // //       text += "\nSubstitutes:\n";
// // //       team.substitutes.forEach(sub => {
// // //         text += `• ${sub.name} (${sub.teamShortName || sub.teamName})\n`;
// // //       });
// // //     }
  
// // //     text += `\nTeam Balance: ${team1Count} ${captainTeamName} | ${team2Count} ${opponentName}\n`;
// // //     text += `Risk Level: ${team.riskLevel || 50}/100\n`;
  
// // //     if (isNewTeam) {
// // //       text += `\nNew team created for ${captainTeamName} vs ${opponentName} match`;
// // //     }
  
// // //     return text;
// // //   };

// // //   const shareToWhatsApp = () => {
// // //     const text = generateShareText();
// // //     const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
// // //     window.open(url, '_blank');
// // //     setShowShareOptions(false);
// // //   };

// // //   const shareToTelegram = () => {
// // //     const text = generateShareText();
// // //     const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`;
// // //     window.open(url, '_blank');
// // //     setShowShareOptions(false);
// // //   };

// // //   const shareToTwitter = () => {
// // //     const text = generateShareText();
// // //     const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text.substring(0, 250) + (text.length > 250 ? '...' : ''))}`;
// // //     window.open(url, '_blank');
// // //     setShowShareOptions(false);
// // //   };

// // //   const copyToClipboard = () => {
// // //     const text = generateShareText();
// // //     navigator.clipboard.writeText(text).then(() => {
// // //       alert('Team copied to clipboard!');
// // //       setShowShareOptions(false);
// // //     });
// // //   };

// // //   const TeamContent = () => (
// // //     <>
// // //       {changes > 0 && (
// // //         <div className="absolute -top-2 -right-2 bg-yellow-500 text-black font-bold rounded-full h-6 w-6 flex items-center justify-center">
// // //           {changes}
// // //         </div>
// // //       )}
      
// // //       {isNewTeam && (
// // //         <div className="absolute -top-2 -left-2 bg-green-500 text-black font-bold rounded-full px-2 py-1 text-xs flex items-center justify-center">
// // //           NEW
// // //         </div>
// // //       )}
      
// // //       <div className="bg-gray-800 p-3 flex justify-between items-center">
// // //         <h3 className="font-bold">{team?.name || `Team ${index + 1}`}</h3>
// // //         <div className="flex items-center gap-2">
// // //           {changes > 0 && (
// // //             <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full">
// // //               {changes} change{changes > 1 ? 's' : ''}
// // //             </span>
// // //           )}
// // //           <div className="flex gap-2 items-center">
// // //             <button
// // //               onClick={(e) => {
// // //                 e.stopPropagation();
// // //                 setShowShareOptions(!showShareOptions);
// // //               }}
// // //               className="text-gray-300 hover:text-white p-1"
// // //               aria-label="Share team"
// // //             >
// // //               <FiShare2 size={18} />
// // //             </button>
// // //             <button
// // //               onClick={(e) => {
// // //                 e.stopPropagation();
// // //                 setIsFullScreen(!isFullScreen);
// // //               }}
// // //               className="text-gray-300 hover:text-white p-1"
// // //               aria-label={isFullScreen ? "Close full screen" : "View full screen"}
// // //             >
// // //               {isFullScreen ? <FiX size={18} /> : <FiMaximize size={18} />}
// // //             </button>
// // //             <input
// // //               type="checkbox"
// // //               checked={isSelected}
// // //               onChange={(e) => {
// // //                 e.stopPropagation();
// // //                 onToggleSelect();
// // //               }}
// // //               onClick={(e) => e.stopPropagation()}
// // //               className="h-5 w-5 rounded text-blue-600 cursor-pointer"
// // //               aria-label="Select team"
// // //             />
// // //           </div>
// // //         </div>
// // //       </div>
      
// // //       {showShareOptions && (
// // //         <div className="absolute right-12 top-12 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10 p-2">
// // //           <button
// // //             onClick={shareToWhatsApp}
// // //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// // //           >
// // //             <FontAwesomeIcon icon={faWhatsapp} className="text-green-400" /> WhatsApp
// // //           </button>
// // //           <button
// // //             onClick={shareToTelegram}
// // //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// // //           >
// // //             <FontAwesomeIcon icon={faTelegram} className="text-blue-400" /> Telegram
// // //           </button>
// // //           <button
// // //             onClick={shareToTwitter}
// // //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// // //           >
// // //             <FontAwesomeIcon icon={faTwitter} className="text-blue-400" /> Twitter
// // //           </button>
// // //           <button
// // //             onClick={copyToClipboard}
// // //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// // //           >
// // //             <FiShare2 /> Copy Text
// // //           </button>
// // //         </div>
// // //       )}
      
// // //       <div className="bg-gray-700 p-4">
// // //         {playerChanges.length > 0 && (
// // //           <div className="mb-3 bg-yellow-900 p-2 rounded text-sm">
// // //             <div className="font-medium mb-1">Team Changes:</div>
// // //             {playerChanges.map((change, i) => (
// // //               <div key={i} className="flex justify-between">
// // //                 <span className="text-red-300 line-through">{change.out}</span>
// // //                 <span>→</span>
// // //                 <span className="text-green-300">{change.in}</span>
// // //                 <span className="text-gray-400 text-xs">{change.role}</span>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         )}
        
// // //         <div className="flex gap-4 mb-3">
// // //           <div className="flex-1">
// // //             <div className="flex items-center gap-2 w-full">
// // //               <img
// // //                 src={team.captain.imgURL || "/fallback.png"}
// // //                 alt={team.captain.name}
// // //                 className="w-10 h-10 rounded-full"
// // //                 onError={(e) => {
// // //                   const target = e.target as HTMLImageElement;
// // //                   target.src = "/fallback.png";
// // //                 }}
// // //               />
// // //               <div className="flex-1">
// // //                 <div className="flex justify-between items-center">
// // //                   <p className={`font-medium ${
// // //                     team.captain.wasSubstituted ? 'text-yellow-400' :
// // //                     team.captain.substitute ? 'text-red-400' : 'text-white'
// // //                     }`}>
// // //                     <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-2">C</span>
// // //                     {team.captain.name}
// // //                   </p>
// // //                 </div>
// // //                 <p className="text-xs text-gray-400">{team.captain.teamShortName || team.captain.teamName}</p>
// // //               </div>
// // //             </div>
// // //           </div>
          
// // //           <div className="flex-1">
// // //             <div className="flex items-center gap-2 w-full">
// // //               <img
// // //                 src={team.viceCaptain.imgURL || "/fallback.png"}
// // //                 alt={team.viceCaptain.name}
// // //                 className="w-10 h-10 rounded-full"
// // //                 onError={(e) => {
// // //                   const target = e.target as HTMLImageElement;
// // //                   target.src = "/fallback.png";
// // //                 }}
// // //               />
// // //               <div className="flex-1">
// // //                 <div className="flex justify-between items-center">
// // //                   <p className={`font-medium ${
// // //                     team.viceCaptain.wasSubstituted ? 'text-yellow-400' :
// // //                     team.viceCaptain.substitute ? 'text-red-400' : 'text-white'
// // //                   }`}>
// // //                     <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-2">VC</span>
// // //                     {team.viceCaptain.name}
// // //                   </p>
// // //                 </div>
// // //                 <p className="text-xs text-gray-400">{team.viceCaptain.teamShortName || team.viceCaptain.teamName}</p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
        
// // //         <div className="mb-3 bg-gray-800 p-2 rounded">
// // //           <div className="flex justify-between text-sm mb-1">
// // //             <span>{team.team1ShortName || team.captain.teamName}: {team1Count}</span>
// // //             <span>{team.team2ShortName || opponentTeamName}: {team2Count}</span>
// // //           </div>
// // //           <div className="flex justify-between items-center mt-1">
// // //             <div className="flex flex-wrap gap-1 text-xs">
// // //               <span className="bg-gray-600 px-2 py-1 rounded">WK: {playersByRole['WK-Batsman'].length}</span>
// // //               <span className="bg-gray-600 px-2 py-1 rounded">Bats: {playersByRole['Batsman'].length}</span>
// // //               <span className="bg-gray-600 px-2 py-1 rounded">AR: {
// // //                 playersByRole['Batting Allrounder'].length + playersByRole['Bowling Allrounder'].length
// // //               }</span>
// // //               <span className="bg-gray-600 px-2 py-1 rounded">Bowlers: {playersByRole['Bowler'].length}</span>
// // //             </div>
// // //             <div className="text-xs font-medium px-2 py-1 rounded" style={{
// // //               backgroundColor: getRiskColor(team.riskLevel || 50),
// // //               color: 'white'
// // //             }}>
// // //               Risk: {team.riskLevel || 50}%
// // //             </div>
// // //           </div>
// // //         </div>
        
// // //         <div className={`space-y-2 ${isFullScreen ? '' : 'max-h-60'} overflow-y-auto`}>
// // //           {playersByRole['WK-Batsman'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Wicket Keepers</div>
// // //           )}
// // //           {playersByRole['WK-Batsman'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`wk-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {playersByRole['Batsman'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Batsmen</div>
// // //           )}
// // //           {playersByRole['Batsman'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`bat-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {playersByRole['Batting Allrounder'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Batting Allrounders</div>
// // //           )}
// // //           {playersByRole['Batting Allrounder'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`bar-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {playersByRole['Bowling Allrounder'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Bowling Allrounders</div>
// // //           )}
// // //           {playersByRole['Bowling Allrounder'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`bowlar-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {playersByRole['Bowler'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Bowlers</div>
// // //           )}
// // //           {playersByRole['Bowler'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`bowl-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {team.substitutes && team.substitutes.length > 0 && (
// // //             <>
// // //               <div className="text-xs text-gray-400 mt-4">Substitutes (→)</div>
// // //               {team.substitutes.map((sub, i) => (
// // //                 <PlayerRow
// // //                   key={`sub-${i}`}
// // //                   player={sub}
// // //                   isSubstitute={false}
// // //                   isSubstituteList
// // //                 />
// // //               ))}
// // //             </>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </>
// // //   );

// // //   const FullScreenView = () => {
// // //     const roleGroups = [
// // //       { title: "WICKET-KEEPERS", players: playersByRole['WK-Batsman'] },
// // //       { title: "BATTERS", players: playersByRole['Batsman'] },
// // //       {
// // //         title: "ALL-ROUNDERS",
// // //         players: [...playersByRole['Batting Allrounder'], ...playersByRole['Bowling Allrounder']]
// // //       },
// // //       { title: "BOWLERS", players: playersByRole['Bowler'] }
// // //     ];
  
// // //     return (
// // //       <div className="fixed inset-0 bg-gray-900 z-50 p-1 overflow-y-auto">
// // //         <div className="flex justify-between items-center mb-1 sticky top-0 bg-gray-900 py-1">
// // //           <h2 className="text-base font-bold text-white">{team?.name || `Team ${index + 1}`}</h2>
// // //           <button
// // //             onClick={() => setIsFullScreen(false)}
// // //             className="text-white p-0"
// // //             aria-label="Close full screen view"
// // //           >
// // //             <FiX size={18} />
// // //           </button>
// // //         </div>
  
// // //         <div className="space-y-3 px-1">
// // //           {roleGroups.map((group, i) => (
// // //             group.players.length > 0 && (
// // //               <div key={`role-${i}`} className="mb-1">
// // //                 <div className="text-xs font-medium mb-1 text-gray-300 text-center">
// // //                   {group.title}
// // //                 </div>
// // //                 <div className={`flex ${group.players.length === 1 ? 'justify-center' : 'justify-between'} flex-wrap gap-y-2`}>
// // //                   {group.players.map((player) => (
// // //                     <div key={`player-${player.id}`} className="flex flex-col items-center w-[32%]">
// // //                       <div className="relative">
// // //                         <img
// // //                           src={player.imgURL || "/fallback.png"}
// // //                           alt={player.name}
// // //                           className="w-11 h-11 rounded-full object-cover border border-gray-600"
// // //                           onError={(e) => {
// // //                             const target = e.target as HTMLImageElement;
// // //                             target.src = "/fallback.png";
// // //                           }}
// // //                         />
// // //                         {player.id === team.captain.id && (
// // //                           <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center border border-white">
// // //                             C
// // //                           </span>
// // //                         )}
// // //                         {player.id === team.viceCaptain.id && (
// // //                           <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center border border-white">
// // //                             VC
// // //                           </span>
// // //                         )}
// // //                       </div>
// // //                       <div className="text-[11px] font-medium text-white text-center mt-0.5 truncate w-full">
// // //                         {player.name?.split(" ")[0].charAt(0).toUpperCase() +
// // //                           player.name?.split(" ")[0].slice(1).toLowerCase()}
// // //                       </div>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             )
// // //           ))}
// // //         </div>
  
// // //         <div className="mt-3 text-center text-[11px] text-gray-400 sticky bottom-0 bg-gray-900 py-1">
// // //           {team.team1ShortName || team.captain.teamName} vs {team.team2ShortName || opponentTeamName}
// // //         </div>
// // //       </div>
// // //     );
// // //   };

// // //   return (
// // //     <>
// // //       {!isFullScreen && (
// // //         <div
// // //           className={`border-2 ${isSelected ? 'border-blue-500' : 'border-gray-700'} rounded-none overflow-hidden relative w-screen -mx-4`}
// // //           style={{ width: 'calc(100% + 2rem)' }}
// // //           onClick={() => onToggleSelect()}
// // //         >
// // //           <TeamContent />
// // //         </div>
// // //       )}
      
// // //       {isFullScreen && <FullScreenView />}
// // //     </>
// // //   );
// // // }







// // // import { useEffect, useState } from "react";
// // // import { FiShare2, FiX, FiMaximize } from 'react-icons/fi';
// // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // import { faWhatsapp, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';
// // // import { GeneratedTeam as ImportedGeneratedTeam } from "@/types/match";

// // // // Use the imported type directly
// // // type GeneratedTeam = ImportedGeneratedTeam;

// // // interface Player {
// // //   id: string;
// // //   name: string;
// // //   imgURL?: string;
// // //   teamName: string;
// // //   teamShortName?: string;
// // //   role: string;
// // //   roleOrder: number;
// // //   keeper?: boolean;
// // //   selectedBy?: number;
// // //   substitute?: boolean;
// // //   wasSubstituted?: boolean;
// // //   replacedPlayer?: string;
// // // }

// // // interface TeamCardProps {
// // //   team: GeneratedTeam;
// // //   index: number;
// // //   isSelected: boolean;
// // //   onToggleSelect: () => void;
// // //   onUpdateTeam: (updatedTeam: GeneratedTeam) => void;
// // //   isNewTeam?: boolean;
// // // }

// // // interface PlayerRowProps {
// // //   player: Player;
// // //   isSubstitute: boolean;
// // //   wasSubstituted?: boolean;
// // //   isSubstituteList?: boolean;
// // // }

// // // const getRiskColor = (riskLevel: number) => {
// // //   if (riskLevel < 30) return '#10B981';
// // //   if (riskLevel < 70) return '#F59E0B';
// // //   return '#EF4444';
// // // };

// // // const PlayerRow = ({
// // //   player,
// // //   isSubstitute,
// // //   wasSubstituted,
// // //   isSubstituteList = false
// // // }: PlayerRowProps) => (
// // //   <div className={`flex items-center justify-between text-sm p-2 rounded ${
// // //     wasSubstituted ? 'bg-yellow-900' :
// // //     isSubstitute ? 'bg-red-900' :
// // //     isSubstituteList ? 'bg-gray-600' : 'bg-gray-800'
// // //   }`}>
// // //     <div className="flex items-center gap-2 w-full">
// // //       {isSubstituteList && <span className="text-yellow-400">→</span>}
// // //       {wasSubstituted && <span className="text-green-400">↑</span>}
// // //       <img
// // //         src={player.imgURL || "/fallback.png"}
// // //         alt={player.name}
// // //         className="w-8 h-8 rounded-full"
// // //         onError={(e) => {
// // //           const target = e.target as HTMLImageElement;
// // //           target.src = "/fallback.png";
// // //         }}
// // //       />
// // //       <div className="flex-1">
// // //         <div className="flex justify-between items-center">
// // //           <span className={isSubstitute ? 'line-through' : ''}>
// // //             {player.name}
// // //             {player.keeper && ' (WK)'}
// // //             {wasSubstituted && player.replacedPlayer && ` (replaced ${player.replacedPlayer})`}
// // //           </span>
// // //         </div>
// // //         <p className="text-xs text-gray-400">{player.teamShortName || player.teamName}</p>
// // //       </div>
// // //     </div>
// // //   </div>
// // // );

// // // const normalizeRole = (role: string): string => {
// // //   if (!role) return 'Bowler';
// // //   const lowerRole = role.toLowerCase().trim();
// // //   if (lowerRole.includes('keep') || lowerRole.includes('wk')) return 'WK-Batsman';
// // //   if (lowerRole.includes('bat') && lowerRole.includes('all')) return 'Batting Allrounder';
// // //   if (lowerRole.includes('bowl') && lowerRole.includes('all')) return 'Bowling Allrounder';
// // //   if (lowerRole.includes('bat')) return 'Batsman';
// // //   if (lowerRole.includes('bowl')) return 'Bowler';
// // //   if (lowerRole.includes('all')) return 'Bowling Allrounder';
// // //   return 'Bowler';
// // // };

// // // export default function TeamCard({
// // //   team,
// // //   index,
// // //   isSelected,
// // //   onToggleSelect,
// // //   onUpdateTeam,
// // //   isNewTeam = false
// // // }: TeamCardProps) {
// // //   const [changes, setChanges] = useState<number>(team.changes || 0);
// // //   const [playerChanges, setPlayerChanges] = useState<Array<{
// // //     out: string;
// // //     in: string;
// // //     role: string;
// // //   }>>([]);
// // //   const [isFullScreen, setIsFullScreen] = useState(false);
// // //   const [showShareOptions, setShowShareOptions] = useState(false);

// // //   const opponentTeamName = team.players.find(
// // //     p => p.teamName !== team.captain.teamName
// // //   )?.teamName || 'Opponent';

// // //   useEffect(() => {
// // //     const checkLineupChanges = () => {
// // //       const newPlayerChanges: Array<{
// // //         out: string;
// // //         in: string;
// // //         role: string;
// // //       }> = [];
      
// // //       let changeCount = 0;
      
// // //       const updatedPlayers = team.players.map(player => {
// // //         if (player.substitute) {
// // //           changeCount++;
      
// // //           const replacement = team.substitutes?.length
// // //             ? team.substitutes
// // //                 .filter(sub => normalizeRole(sub.role) === normalizeRole(player.role))
// // //                 .sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0))[0]
// // //             : null;
      
// // //           if (replacement) {
// // //             newPlayerChanges.push({
// // //               out: player.name,
// // //               in: replacement.name,
// // //               role: player.role
// // //             });
      
// // //             return {
// // //               ...replacement,
// // //               wasSubstituted: true,
// // //               replacedPlayer: player.name
// // //             };
// // //           }
// // //         }
// // //         return player;
// // //       });
      
// // //       if (changeCount > 0) {
// // //         setChanges(changeCount);
// // //         setPlayerChanges(newPlayerChanges);
        
// // //         const updatedTeam = {
// // //           ...team,
// // //           players: updatedPlayers,
// // //           changes: changeCount
// // //         };
        
// // //         onUpdateTeam(updatedTeam);
// // //       }
// // //     };
    
// // //     checkLineupChanges();
// // //   }, [team, onUpdateTeam]);

// // //   const playersByRole = {
// // //     'WK-Batsman': team.players.filter(p => normalizeRole(p.role) === 'WK-Batsman'),
// // //     'Batsman': team.players.filter(p => normalizeRole(p.role) === 'Batsman',
// // //     'Batting Allrounder': team.players.filter(p => normalizeRole(p.role) === 'Batting Allrounder',
// // //     'Bowling Allrounder': team.players.filter(p => normalizeRole(p.role) === 'Bowling Allrounder',
// // //     'Bowler': team.players.filter(p => normalizeRole(p.role) === 'Bowler'
// // //   };

// // //   const team1Count = team.players.filter(p => p.teamName === team.captain.teamName).length;
// // //   const team2Count = 11 - team1Count;

// // //   const generateShareText = () => {
// // //     const captainTeamName = team.team1ShortName || team.captain.teamName;
// // //     const opponentName = team.team2ShortName || opponentTeamName;
  
// // //     let text = `Fantasy Team ${index + 1} - ${captainTeamName} vs ${opponentName}\n\n`;
// // //     text += `Captain: ${team.captain.name} (${team.captain.teamShortName || team.captain.teamName})\n`;
// // //     text += `Vice-Captain: ${team.viceCaptain.name} (${team.viceCaptain.teamShortName || team.viceCaptain.teamName})\n\n`;
  
// // //     text += "Playing XI:\n";
// // //     Object.entries(playersByRole).forEach(([role, players]) => {
// // //       if (players.length > 0) {
// // //         text += `${role}:\n`;
// // //         players.forEach(player => {
// // //           text += `• ${player.name} (${player.teamShortName || player.teamName}) ${player.wasSubstituted ? '(replaced)' : ''}\n`;
// // //         });
// // //       }
// // //     });
  
// // //     if (team.substitutes && team.substitutes.length > 0) {
// // //       text += "\nSubstitutes:\n";
// // //       team.substitutes.forEach(sub => {
// // //         text += `• ${sub.name} (${sub.teamShortName || sub.teamName})\n`;
// // //       });
// // //     }
  
// // //     text += `\nTeam Balance: ${team1Count} ${captainTeamName} | ${team2Count} ${opponentName}\n`;
// // //     text += `Risk Level: ${team.riskLevel || 50}/100\n`;
  
// // //     if (isNewTeam) {
// // //       text += `\nNew team created for ${captainTeamName} vs ${opponentName} match`;
// // //     }
  
// // //     return text;
// // //   };

// // //   const shareToWhatsApp = () => {
// // //     const text = generateShareText();
// // //     const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
// // //     window.open(url, '_blank');
// // //     setShowShareOptions(false);
// // //   };

// // //   const shareToTelegram = () => {
// // //     const text = generateShareText();
// // //     const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`;
// // //     window.open(url, '_blank');
// // //     setShowShareOptions(false);
// // //   };

// // //   const shareToTwitter = () => {
// // //     const text = generateShareText();
// // //     const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text.substring(0, 250) + (text.length > 250 ? '...' : ''))}`;
// // //     window.open(url, '_blank');
// // //     setShowShareOptions(false);
// // //   };

// // //   const copyToClipboard = () => {
// // //     const text = generateShareText();
// // //     navigator.clipboard.writeText(text).then(() => {
// // //       alert('Team copied to clipboard!');
// // //       setShowShareOptions(false);
// // //     });
// // //   };

// // //   const TeamContent = () => (
// // //     <>
// // //       {changes > 0 && (
// // //         <div className="absolute -top-2 -right-2 bg-yellow-500 text-black font-bold rounded-full h-6 w-6 flex items-center justify-center">
// // //           {changes}
// // //         </div>
// // //       )}
      
// // //       {isNewTeam && (
// // //         <div className="absolute -top-2 -left-2 bg-green-500 text-black font-bold rounded-full px-2 py-1 text-xs flex items-center justify-center">
// // //           NEW
// // //         </div>
// // //       )}
      
// // //       <div className="bg-gray-800 p-3 flex justify-between items-center">
// // //         <h3 className="font-bold">{team?.name || `Team ${index + 1}`}</h3>
// // //         <div className="flex items-center gap-2">
// // //           {changes > 0 && (
// // //             <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full">
// // //               {changes} change{changes > 1 ? 's' : ''}
// // //             </span>
// // //           )}
// // //           <div className="flex gap-2 items-center">
// // //             <button
// // //               onClick={(e) => {
// // //                 e.stopPropagation();
// // //                 setShowShareOptions(!showShareOptions);
// // //               }}
// // //               className="text-gray-300 hover:text-white p-1"
// // //               aria-label="Share team"
// // //             >
// // //               <FiShare2 size={18} />
// // //             </button>
// // //             <button
// // //               onClick={(e) => {
// // //                 e.stopPropagation();
// // //                 setIsFullScreen(!isFullScreen);
// // //               }}
// // //               className="text-gray-300 hover:text-white p-1"
// // //               aria-label={isFullScreen ? "Close full screen" : "View full screen"}
// // //             >
// // //               {isFullScreen ? <FiX size={18} /> : <FiMaximize size={18} />}
// // //             </button>
// // //             <input
// // //               type="checkbox"
// // //               checked={isSelected}
// // //               onChange={(e) => {
// // //                 e.stopPropagation();
// // //                 onToggleSelect();
// // //               }}
// // //               onClick={(e) => e.stopPropagation()}
// // //               className="h-5 w-5 rounded text-blue-600 cursor-pointer"
// // //               aria-label="Select team"
// // //             />
// // //           </div>
// // //         </div>
// // //       </div>
      
// // //       {showShareOptions && (
// // //         <div className="absolute right-12 top-12 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10 p-2">
// // //           <button
// // //             onClick={shareToWhatsApp}
// // //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// // //           >
// // //             <FontAwesomeIcon icon={faWhatsapp} className="text-green-400" /> WhatsApp
// // //           </button>
// // //           <button
// // //             onClick={shareToTelegram}
// // //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// // //           >
// // //             <FontAwesomeIcon icon={faTelegram} className="text-blue-400" /> Telegram
// // //           </button>
// // //           <button
// // //             onClick={shareToTwitter}
// // //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// // //           >
// // //             <FontAwesomeIcon icon={faTwitter} className="text-blue-400" /> Twitter
// // //           </button>
// // //           <button
// // //             onClick={copyToClipboard}
// // //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// // //           >
// // //             <FiShare2 /> Copy Text
// // //           </button>
// // //         </div>
// // //       )}
      
// // //       <div className="bg-gray-700 p-4">
// // //         {playerChanges.length > 0 && (
// // //           <div className="mb-3 bg-yellow-900 p-2 rounded text-sm">
// // //             <div className="font-medium mb-1">Team Changes:</div>
// // //             {playerChanges.map((change, i) => (
// // //               <div key={i} className="flex justify-between">
// // //                 <span className="text-red-300 line-through">{change.out}</span>
// // //                 <span>→</span>
// // //                 <span className="text-green-300">{change.in}</span>
// // //                 <span className="text-gray-400 text-xs">{change.role}</span>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         )}
        
// // //         <div className="flex gap-4 mb-3">
// // //           <div className="flex-1">
// // //             <div className="flex items-center gap-2 w-full">
// // //               <img
// // //                 src={team.captain.imgURL || "/fallback.png"}
// // //                 alt={team.captain.name}
// // //                 className="w-10 h-10 rounded-full"
// // //                 onError={(e) => {
// // //                   const target = e.target as HTMLImageElement;
// // //                   target.src = "/fallback.png";
// // //                 }}
// // //               />
// // //               <div className="flex-1">
// // //                 <div className="flex justify-between items-center">
// // //                   <p className={`font-medium ${
// // //                     team.captain.wasSubstituted ? 'text-yellow-400' :
// // //                     team.captain.substitute ? 'text-red-400' : 'text-white'
// // //                     }`}>
// // //                     <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-2">C</span>
// // //                     {team.captain.name}
// // //                   </p>
// // //                 </div>
// // //                 <p className="text-xs text-gray-400">{team.captain.teamShortName || team.captain.teamName}</p>
// // //               </div>
// // //             </div>
// // //           </div>
          
// // //           <div className="flex-1">
// // //             <div className="flex items-center gap-2 w-full">
// // //               <img
// // //                 src={team.viceCaptain.imgURL || "/fallback.png"}
// // //                 alt={team.viceCaptain.name}
// // //                 className="w-10 h-10 rounded-full"
// // //                 onError={(e) => {
// // //                   const target = e.target as HTMLImageElement;
// // //                   target.src = "/fallback.png";
// // //                 }}
// // //               />
// // //               <div className="flex-1">
// // //                 <div className="flex justify-between items-center">
// // //                   <p className={`font-medium ${
// // //                     team.viceCaptain.wasSubstituted ? 'text-yellow-400' :
// // //                     team.viceCaptain.substitute ? 'text-red-400' : 'text-white'
// // //                   }`}>
// // //                     <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-2">VC</span>
// // //                     {team.viceCaptain.name}
// // //                   </p>
// // //                 </div>
// // //                 <p className="text-xs text-gray-400">{team.viceCaptain.teamShortName || team.viceCaptain.teamName}</p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
        
// // //         <div className="mb-3 bg-gray-800 p-2 rounded">
// // //           <div className="flex justify-between text-sm mb-1">
// // //             <span>{team.team1ShortName || team.captain.teamName}: {team1Count}</span>
// // //             <span>{team.team2ShortName || opponentTeamName}: {team2Count}</span>
// // //           </div>
// // //           <div className="flex justify-between items-center mt-1">
// // //             <div className="flex flex-wrap gap-1 text-xs">
// // //               <span className="bg-gray-600 px-2 py-1 rounded">WK: {playersByRole['WK-Batsman'].length}</span>
// // //               <span className="bg-gray-600 px-2 py-1 rounded">Bats: {playersByRole['Batsman'].length}</span>
// // //               <span className="bg-gray-600 px-2 py-1 rounded">AR: {
// // //                 playersByRole['Batting Allrounder'].length + playersByRole['Bowling Allrounder'].length
// // //               }</span>
// // //               <span className="bg-gray-600 px-2 py-1 rounded">Bowlers: {playersByRole['Bowler'].length}</span>
// // //             </div>
// // //             <div className="text-xs font-medium px-2 py-1 rounded" style={{
// // //               backgroundColor: getRiskColor(team.riskLevel || 50),
// // //               color: 'white'
// // //             }}>
// // //               Risk: {team.riskLevel || 50}%
// // //             </div>
// // //           </div>
// // //         </div>
        
// // //         <div className={`space-y-2 ${isFullScreen ? '' : 'max-h-60'} overflow-y-auto`}>
// // //           {playersByRole['WK-Batsman'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Wicket Keepers</div>
// // //           )}
// // //           {playersByRole['WK-Batsman'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`wk-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {playersByRole['Batsman'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Batsmen</div>
// // //           )}
// // //           {playersByRole['Batsman'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`bat-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {playersByRole['Batting Allrounder'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Batting Allrounders</div>
// // //           )}
// // //           {playersByRole['Batting Allrounder'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`bar-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {playersByRole['Bowling Allrounder'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Bowling Allrounders</div>
// // //           )}
// // //           {playersByRole['Bowling Allrounder'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`bowlar-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {playersByRole['Bowler'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Bowlers</div>
// // //           )}
// // //           {playersByRole['Bowler'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`bowl-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {team.substitutes && team.substitutes.length > 0 && (
// // //             <>
// // //               <div className="text-xs text-gray-400 mt-4">Substitutes (→)</div>
// // //               {team.substitutes.map((sub, i) => (
// // //                 <PlayerRow
// // //                   key={`sub-${i}`}
// // //                   player={sub}
// // //                   isSubstitute={false}
// // //                   isSubstituteList
// // //                 />
// // //               ))}
// // //             </>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </>
// // //   );

// // //   const FullScreenView = () => {
// // //     const roleGroups = [
// // //       { title: "WICKET-KEEPERS", players: playersByRole['WK-Batsman'] },
// // //       { title: "BATTERS", players: playersByRole['Batsman'] },
// // //       {
// // //         title: "ALL-ROUNDERS",
// // //         players: [...playersByRole['Batting Allrounder'], ...playersByRole['Bowling Allrounder']]
// // //       },
// // //       { title: "BOWLERS", players: playersByRole['Bowler'] }
// // //     ];
  
// // //     return (
// // //       <div className="fixed inset-0 bg-gray-900 z-50 p-1 overflow-y-auto">
// // //         <div className="flex justify-between items-center mb-1 sticky top-0 bg-gray-900 py-1">
// // //           <h2 className="text-base font-bold text-white">{team?.name || `Team ${index + 1}`}</h2>
// // //           <button
// // //             onClick={() => setIsFullScreen(false)}
// // //             className="text-white p-0"
// // //             aria-label="Close full screen view"
// // //           >
// // //             <FiX size={18} />
// // //           </button>
// // //         </div>
  
// // //         <div className="space-y-3 px-1">
// // //           {roleGroups.map((group, i) => (
// // //             group.players.length > 0 && (
// // //               <div key={`role-${i}`} className="mb-1">
// // //                 <div className="text-xs font-medium mb-1 text-gray-300 text-center">
// // //                   {group.title}
// // //                 </div>
// // //                 <div className={`flex ${group.players.length === 1 ? 'justify-center' : 'justify-between'} flex-wrap gap-y-2`}>
// // //                   {group.players.map((player) => (
// // //                     <div key={`player-${player.id}`} className="flex flex-col items-center w-[32%]">
// // //                       <div className="relative">
// // //                         <img
// // //                           src={player.imgURL || "/fallback.png"}
// // //                           alt={player.name}
// // //                           className="w-11 h-11 rounded-full object-cover border border-gray-600"
// // //                           onError={(e) => {
// // //                             const target = e.target as HTMLImageElement;
// // //                             target.src = "/fallback.png";
// // //                           }}
// // //                         />
// // //                         {player.id === team.captain.id && (
// // //                           <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center border border-white">
// // //                             C
// // //                           </span>
// // //                         )}
// // //                         {player.id === team.viceCaptain.id && (
// // //                           <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center border border-white">
// // //                             VC
// // //                           </span>
// // //                         )}
// // //                       </div>
// // //                       <div className="text-[11px] font-medium text-white text-center mt-0.5 truncate w-full">
// // //                         {player.name?.split(" ")[0].charAt(0).toUpperCase() +
// // //                           player.name?.split(" ")[0].slice(1).toLowerCase()}
// // //                       </div>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             )
// // //           ))}
// // //         </div>
  
// // //         <div className="mt-3 text-center text-[11px] text-gray-400 sticky bottom-0 bg-gray-900 py-1">
// // //           {team.team1ShortName || team.captain.teamName} vs {team.team2ShortName || opponentTeamName}
// // //         </div>
// // //       </div>
// // //     );
// // //   };

// // //   return (
// // //     <>
// // //       {!isFullScreen && (
// // //         <div
// // //           className={`border-2 ${isSelected ? 'border-blue-500' : 'border-gray-700'} rounded-none overflow-hidden relative w-screen -mx-4`}
// // //           style={{ width: 'calc(100% + 2rem)' }}
// // //           onClick={() => onToggleSelect()}
// // //         >
// // //           <TeamContent />
// // //         </div>
// // //       )}
      
// // //       {isFullScreen && <FullScreenView />}
// // //     </>
// // //   );
// // // }




// // // import { useEffect, useState } from "react";
// // // import { FiShare2, FiX, FiMaximize } from 'react-icons/fi';
// // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // import { faWhatsapp, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';
// // // import { GeneratedTeam as ImportedGeneratedTeam } from "@/types/match";

// // // // Use the imported type directly
// // // type GeneratedTeam = ImportedGeneratedTeam;

// // // interface Player {
// // //   id: string;
// // //   name: string;
// // //   imgURL?: string;
// // //   teamName: string;
// // //   teamShortName?: string;
// // //   role: string;
// // //   roleOrder: number;
// // //   keeper?: boolean;
// // //   selectedBy?: number;
// // //   substitute?: boolean;
// // //   wasSubstituted?: boolean;
// // //   replacedPlayer?: string;
// // // }

// // // interface TeamCardProps {
// // //   team: GeneratedTeam;
// // //   index: number;
// // //   isSelected: boolean;
// // //   onToggleSelect: () => void;
// // //   onUpdateTeam: (updatedTeam: GeneratedTeam) => void;
// // //   isNewTeam?: boolean;
// // // }

// // // interface PlayerRowProps {
// // //   player: Player;
// // //   isSubstitute: boolean;
// // //   wasSubstituted?: boolean;
// // //   isSubstituteList?: boolean;
// // // }

// // // const getRiskColor = (riskLevel: number) => {
// // //   if (riskLevel < 30) return '#10B981';
// // //   if (riskLevel < 70) return '#F59E0B';
// // //   return '#EF4444';
// // // };

// // // const PlayerRow = ({
// // //   player,
// // //   isSubstitute,
// // //   wasSubstituted,
// // //   isSubstituteList = false
// // // }: PlayerRowProps) => (
// // //   <div className={`flex items-center justify-between text-sm p-2 rounded ${
// // //     wasSubstituted ? 'bg-yellow-900' :
// // //     isSubstitute ? 'bg-red-900' :
// // //     isSubstituteList ? 'bg-gray-600' : 'bg-gray-800'
// // //   }`}>
// // //     <div className="flex items-center gap-2 w-full">
// // //       {isSubstituteList && <span className="text-yellow-400">→</span>}
// // //       {wasSubstituted && <span className="text-green-400">↑</span>}
// // //       <img
// // //         src={player.imgURL || "/fallback.png"}
// // //         alt={player.name}
// // //         className="w-8 h-8 rounded-full"
// // //         onError={(e) => {
// // //           const target = e.target as HTMLImageElement;
// // //           target.src = "/fallback.png";
// // //         }}
// // //       />
// // //       <div className="flex-1">
// // //         <div className="flex justify-between items-center">
// // //           <span className={isSubstitute ? 'line-through' : ''}>
// // //             {player.name}
// // //             {player.keeper && ' (WK)'}
// // //             {wasSubstituted && player.replacedPlayer && ` (replaced ${player.replacedPlayer})`}
// // //           </span>
// // //         </div>
// // //         <p className="text-xs text-gray-400">{player.teamShortName || player.teamName}</p>
// // //       </div>
// // //     </div>
// // //   </div>
// // // );

// // // const normalizeRole = (role: string): string => {
// // //   if (!role) return 'Bowler';
// // //   const lowerRole = role.toLowerCase().trim();
// // //   if (lowerRole.includes('keep') || lowerRole.includes('wk')) return 'WK-Batsman';
// // //   if (lowerRole.includes('bat') && lowerRole.includes('all')) return 'Batting Allrounder';
// // //   if (lowerRole.includes('bowl') && lowerRole.includes('all')) return 'Bowling Allrounder';
// // //   if (lowerRole.includes('bat')) return 'Batsman';
// // //   if (lowerRole.includes('bowl')) return 'Bowler';
// // //   if (lowerRole.includes('all')) return 'Bowling Allrounder';
// // //   return 'Bowler';
// // // };

// // // export default function TeamCard({
// // //   team,
// // //   index,
// // //   isSelected,
// // //   onToggleSelect,
// // //   onUpdateTeam,
// // //   isNewTeam = false
// // // }: TeamCardProps) {
// // //   const [changes, setChanges] = useState<number>(team.changes || 0);
// // //   const [playerChanges, setPlayerChanges] = useState<Array<{
// // //     out: string;
// // //     in: string;
// // //     role: string;
// // //   }>>([]);
// // //   const [isFullScreen, setIsFullScreen] = useState(false);
// // //   const [showShareOptions, setShowShareOptions] = useState(false);

// // //   const opponentTeamName = team.players.find(
// // //     p => p.teamName !== team.captain.teamName
// // //   )?.teamName || 'Opponent';

// // //   useEffect(() => {
// // //     const checkLineupChanges = () => {
// // //       const newPlayerChanges: Array<{
// // //         out: string;
// // //         in: string;
// // //         role: string;
// // //       }> = [];
      
// // //       let changeCount = 0;
      
// // //       const updatedPlayers = team.players.map(player => {
// // //         if (player.substitute) {
// // //           changeCount++;
      
// // //           const replacement = team.substitutes?.length
// // //             ? team.substitutes
// // //                 .filter(sub => normalizeRole(sub.role) === normalizeRole(player.role))
// // //                 .sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0))[0]
// // //             : null;
      
// // //           if (replacement) {
// // //             newPlayerChanges.push({
// // //               out: player.name,
// // //               in: replacement.name,
// // //               role: player.role
// // //             });
      
// // //             return {
// // //               ...replacement,
// // //               wasSubstituted: true,
// // //               replacedPlayer: player.name
// // //             };
// // //           }
// // //         }
// // //         return player;
// // //       });
      
// // //       if (changeCount > 0) {
// // //         setChanges(changeCount);
// // //         setPlayerChanges(newPlayerChanges);
        
// // //         const updatedTeam = {
// // //           ...team,
// // //           players: updatedPlayers,
// // //           changes: changeCount
// // //         };
        
// // //         onUpdateTeam(updatedTeam);
// // //       }
// // //     };
    
// // //     checkLineupChanges();
// // //   }, [team, onUpdateTeam]);

// // //   const playersByRole = {
// // //     'WK-Batsman': team.players.filter(p => normalizeRole(p.role) === 'WK-Batsman'),
// // //     'Batsman': team.players.filter(p => normalizeRole(p.role) === 'Batsman',
// // //     'Batting Allrounder': team.players.filter(p => normalizeRole(p.role) === 'Batting Allrounder',
// // //     'Bowling Allrounder': team.players.filter(p => normalizeRole(p.role) === 'Bowling Allrounder',
// // //     'Bowler': team.players.filter(p => normalizeRole(p.role) === 'Bowler'
// // //   };

// // //   const team1Count = team.players.filter(p => p.teamName === team.captain.teamName).length;
// // //   const team2Count = 11 - team1Count;

// // //   const generateShareText = () => {
// // //     const captainTeamName = team.team1ShortName || team.captain.teamName;
// // //     const opponentName = team.team2ShortName || opponentTeamName;
  
// // //     let text = `Fantasy Team ${index + 1} - ${captainTeamName} vs ${opponentName}\n\n`;
// // //     text += `Captain: ${team.captain.name} (${team.captain.teamShortName || team.captain.teamName})\n`;
// // //     text += `Vice-Captain: ${team.viceCaptain.name} (${team.viceCaptain.teamShortName || team.viceCaptain.teamName})\n\n`;
  
// // //     text += "Playing XI:\n";
// // //     Object.entries(playersByRole).forEach(([role, players]) => {
// // //       if (players.length > 0) {
// // //         text += `${role}:\n`;
// // //         players.forEach(player => {
// // //           text += `• ${player.name} (${player.teamShortName || player.teamName}) ${player.wasSubstituted ? '(replaced)' : ''}\n`;
// // //         });
// // //       }
// // //     });
  
// // //     if (team.substitutes && team.substitutes.length > 0) {
// // //       text += "\nSubstitutes:\n";
// // //       team.substitutes.forEach(sub => {
// // //         text += `• ${sub.name} (${sub.teamShortName || sub.teamName})\n`;
// // //       });
// // //     }
  
// // //     text += `\nTeam Balance: ${team1Count} ${captainTeamName} | ${team2Count} ${opponentName}\n`;
// // //     text += `Risk Level: ${team.riskLevel || 50}/100\n`;
  
// // //     if (isNewTeam) {
// // //       text += `\nNew team created for ${captainTeamName} vs ${opponentName} match`;
// // //     }
  
// // //     return text;
// // //   };

// // //   const shareToWhatsApp = () => {
// // //     const text = generateShareText();
// // //     const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
// // //     window.open(url, '_blank');
// // //     setShowShareOptions(false);
// // //   };

// // //   const shareToTelegram = () => {
// // //     const text = generateShareText();
// // //     const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`;
// // //     window.open(url, '_blank');
// // //     setShowShareOptions(false);
// // //   };

// // //   const shareToTwitter = () => {
// // //     const text = generateShareText();
// // //     const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text.substring(0, 250) + (text.length > 250 ? '...' : ''))}`;
// // //     window.open(url, '_blank');
// // //     setShowShareOptions(false);
// // //   };

// // //   const copyToClipboard = () => {
// // //     const text = generateShareText();
// // //     navigator.clipboard.writeText(text).then(() => {
// // //       alert('Team copied to clipboard!');
// // //       setShowShareOptions(false);
// // //     });
// // //   };

// // //   const TeamContent = () => (
// // //     <>
// // //       {changes > 0 && (
// // //         <div className="absolute -top-2 -right-2 bg-yellow-500 text-black font-bold rounded-full h-6 w-6 flex items-center justify-center">
// // //           {changes}
// // //         </div>
// // //       )}
      
// // //       {isNewTeam && (
// // //         <div className="absolute -top-2 -left-2 bg-green-500 text-black font-bold rounded-full px-2 py-1 text-xs flex items-center justify-center">
// // //           NEW
// // //         </div>
// // //       )}
      
// // //       <div className="bg-gray-800 p-3 flex justify-between items-center">
// // //         <h3 className="font-bold">{team?.name || `Team ${index + 1}`}</h3>
// // //         <div className="flex items-center gap-2">
// // //           {changes > 0 && (
// // //             <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full">
// // //               {changes} change{changes > 1 ? 's' : ''}
// // //             </span>
// // //           )}
// // //           <div className="flex gap-2 items-center">
// // //             <button
// // //               onClick={(e) => {
// // //                 e.stopPropagation();
// // //                 setShowShareOptions(!showShareOptions);
// // //               }}
// // //               className="text-gray-300 hover:text-white p-1"
// // //               aria-label="Share team"
// // //             >
// // //               <FiShare2 size={18} />
// // //             </button>
// // //             <button
// // //               onClick={(e) => {
// // //                 e.stopPropagation();
// // //                 setIsFullScreen(!isFullScreen);
// // //               }}
// // //               className="text-gray-300 hover:text-white p-1"
// // //               aria-label={isFullScreen ? "Close full screen" : "View full screen"}
// // //             >
// // //               {isFullScreen ? <FiX size={18} /> : <FiMaximize size={18} />}
// // //             </button>
// // //             <input
// // //               type="checkbox"
// // //               checked={isSelected}
// // //               onChange={(e) => {
// // //                 e.stopPropagation();
// // //                 onToggleSelect();
// // //               }}
// // //               onClick={(e) => e.stopPropagation()}
// // //               className="h-5 w-5 rounded text-blue-600 cursor-pointer"
// // //               aria-label="Select team"
// // //             />
// // //           </div>
// // //         </div>
// // //       </div>
      
// // //       {showShareOptions && (
// // //         <div className="absolute right-12 top-12 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10 p-2">
// // //           <button
// // //             onClick={shareToWhatsApp}
// // //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// // //           >
// // //             <FontAwesomeIcon icon={faWhatsapp} className="text-green-400" /> WhatsApp
// // //           </button>
// // //           <button
// // //             onClick={shareToTelegram}
// // //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// // //           >
// // //             <FontAwesomeIcon icon={faTelegram} className="text-blue-400" /> Telegram
// // //           </button>
// // //           <button
// // //             onClick={shareToTwitter}
// // //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// // //           >
// // //             <FontAwesomeIcon icon={faTwitter} className="text-blue-400" /> Twitter
// // //           </button>
// // //           <button
// // //             onClick={copyToClipboard}
// // //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// // //           >
// // //             <FiShare2 /> Copy Text
// // //           </button>
// // //         </div>
// // //       )}
      
// // //       <div className="bg-gray-700 p-4">
// // //         {playerChanges.length > 0 && (
// // //           <div className="mb-3 bg-yellow-900 p-2 rounded text-sm">
// // //             <div className="font-medium mb-1">Team Changes:</div>
// // //             {playerChanges.map((change, i) => (
// // //               <div key={i} className="flex justify-between">
// // //                 <span className="text-red-300 line-through">{change.out}</span>
// // //                 <span>→</span>
// // //                 <span className="text-green-300">{change.in}</span>
// // //                 <span className="text-gray-400 text-xs">{change.role}</span>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         )}
        
// // //         <div className="flex gap-4 mb-3">
// // //           <div className="flex-1">
// // //             <div className="flex items-center gap-2 w-full">
// // //               <img
// // //                 src={team.captain.imgURL || "/fallback.png"}
// // //                 alt={team.captain.name}
// // //                 className="w-10 h-10 rounded-full"
// // //                 onError={(e) => {
// // //                   const target = e.target as HTMLImageElement;
// // //                   target.src = "/fallback.png";
// // //                 }}
// // //               />
// // //               <div className="flex-1">
// // //                 <div className="flex justify-between items-center">
// // //                   <p className={`font-medium ${
// // //                     team.captain.wasSubstituted ? 'text-yellow-400' :
// // //                     team.captain.substitute ? 'text-red-400' : 'text-white'
// // //                     }`}>
// // //                     <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-2">C</span>
// // //                     {team.captain.name}
// // //                   </p>
// // //                 </div>
// // //                 <p className="text-xs text-gray-400">{team.captain.teamShortName || team.captain.teamName}</p>
// // //               </div>
// // //             </div>
// // //           </div>
          
// // //           <div className="flex-1">
// // //             <div className="flex items-center gap-2 w-full">
// // //               <img
// // //                 src={team.viceCaptain.imgURL || "/fallback.png"}
// // //                 alt={team.viceCaptain.name}
// // //                 className="w-10 h-10 rounded-full"
// // //                 onError={(e) => {
// // //                   const target = e.target as HTMLImageElement;
// // //                   target.src = "/fallback.png";
// // //                 }}
// // //               />
// // //               <div className="flex-1">
// // //                 <div className="flex justify-between items-center">
// // //                   <p className={`font-medium ${
// // //                     team.viceCaptain.wasSubstituted ? 'text-yellow-400' :
// // //                     team.viceCaptain.substitute ? 'text-red-400' : 'text-white'
// // //                   }`}>
// // //                     <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-2">VC</span>
// // //                     {team.viceCaptain.name}
// // //                   </p>
// // //                 </div>
// // //                 <p className="text-xs text-gray-400">{team.viceCaptain.teamShortName || team.viceCaptain.teamName}</p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
        
// // //         <div className="mb-3 bg-gray-800 p-2 rounded">
// // //           <div className="flex justify-between text-sm mb-1">
// // //             <span>{team.team1ShortName || team.captain.teamName}: {team1Count}</span>
// // //             <span>{team.team2ShortName || opponentTeamName}: {team2Count}</span>
// // //           </div>
// // //           <div className="flex justify-between items-center mt-1">
// // //             <div className="flex flex-wrap gap-1 text-xs">
// // //               <span className="bg-gray-600 px-2 py-1 rounded">WK: {playersByRole['WK-Batsman'].length}</span>
// // //               <span className="bg-gray-600 px-2 py-1 rounded">Bats: {playersByRole['Batsman'].length}</span>
// // //               <span className="bg-gray-600 px-2 py-1 rounded">AR: {
// // //                 playersByRole['Batting Allrounder'].length + playersByRole['Bowling Allrounder'].length
// // //               }</span>
// // //               <span className="bg-gray-600 px-2 py-1 rounded">Bowlers: {playersByRole['Bowler'].length}</span>
// // //             </div>
// // //             <div className="text-xs font-medium px-2 py-1 rounded" style={{
// // //               backgroundColor: getRiskColor(team.riskLevel || 50),
// // //               color: 'white'
// // //             }}>
// // //               Risk: {team.riskLevel || 50}%
// // //             </div>
// // //           </div>
// // //         </div>
        
// // //         <div className={`space-y-2 ${isFullScreen ? '' : 'max-h-60'} overflow-y-auto`}>
// // //           {playersByRole['WK-Batsman'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Wicket Keepers</div>
// // //           )}
// // //           {playersByRole['WK-Batsman'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`wk-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {playersByRole['Batsman'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Batsmen</div>
// // //           )}
// // //           {playersByRole['Batsman'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`bat-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {playersByRole['Batting Allrounder'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Batting Allrounders</div>
// // //           )}
// // //           {playersByRole['Batting Allrounder'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`bar-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {playersByRole['Bowling Allrounder'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Bowling Allrounders</div>
// // //           )}
// // //           {playersByRole['Bowling Allrounder'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`bowlar-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {playersByRole['Bowler'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Bowlers</div>
// // //           )}
// // //           {playersByRole['Bowler'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`bowl-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {team.substitutes && team.substitutes.length > 0 && (
// // //             <>
// // //               <div className="text-xs text-gray-400 mt-4">Substitutes (→)</div>
// // //               {team.substitutes.map((sub, i) => (
// // //                 <PlayerRow
// // //                   key={`sub-${i}`}
// // //                   player={sub}
// // //                   isSubstitute={false}
// // //                   isSubstituteList
// // //                 />
// // //               ))}
// // //             </>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </>
// // //   );

// // //   const FullScreenView = () => {
// // //     const roleGroups = [
// // //       { title: "WICKET-KEEPERS", players: playersByRole['WK-Batsman'] },
// // //       { title: "BATTERS", players: playersByRole['Batsman'] },
// // //       {
// // //         title: "ALL-ROUNDERS",
// // //         players: [...playersByRole['Batting Allrounder'], ...playersByRole['Bowling Allrounder']]
// // //       },
// // //       { title: "BOWLERS", players: playersByRole['Bowler'] }
// // //     ];
  
// // //     return (
// // //       <div className="fixed inset-0 bg-gray-900 z-50 p-1 overflow-y-auto">
// // //         <div className="flex justify-between items-center mb-1 sticky top-0 bg-gray-900 py-1">
// // //           <h2 className="text-base font-bold text-white">{team?.name || `Team ${index + 1}`}</h2>
// // //           <button
// // //             onClick={() => setIsFullScreen(false)}
// // //             className="text-white p-0"
// // //             aria-label="Close full screen view"
// // //           >
// // //             <FiX size={18} />
// // //           </button>
// // //         </div>
  
// // //         <div className="space-y-3 px-1">
// // //           {roleGroups.map((group, i) => (
// // //             group.players.length > 0 && (
// // //               <div key={`role-${i}`} className="mb-1">
// // //                 <div className="text-xs font-medium mb-1 text-gray-300 text-center">
// // //                   {group.title}
// // //                 </div>
// // //                 <div className={`flex ${group.players.length === 1 ? 'justify-center' : 'justify-between'} flex-wrap gap-y-2`}>
// // //                   {group.players.map((player) => (
// // //                     <div key={`player-${player.id}`} className="flex flex-col items-center w-[32%]">
// // //                       <div className="relative">
// // //                         <img
// // //                           src={player.imgURL || "/fallback.png"}
// // //                           alt={player.name}
// // //                           className="w-11 h-11 rounded-full object-cover border border-gray-600"
// // //                           onError={(e) => {
// // //                             const target = e.target as HTMLImageElement;
// // //                             target.src = "/fallback.png";
// // //                           }}
// // //                         />
// // //                         {player.id === team.captain.id && (
// // //                           <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center border border-white">
// // //                             C
// // //                           </span>
// // //                         )}
// // //                         {player.id === team.viceCaptain.id && (
// // //                           <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center border border-white">
// // //                             VC
// // //                           </span>
// // //                         )}
// // //                       </div>
// // //                       <div className="text-[11px] font-medium text-white text-center mt-0.5 truncate w-full">
// // //                         {player.name?.split(" ")[0].charAt(0).toUpperCase() +
// // //                           player.name?.split(" ")[0].slice(1).toLowerCase()}
// // //                       </div>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             )
// // //           ))}
// // //         </div>
  
// // //         <div className="mt-3 text-center text-[11px] text-gray-400 sticky bottom-0 bg-gray-900 py-1">
// // //           {team.team1ShortName || team.captain.teamName} vs {team.team2ShortName || opponentTeamName}
// // //         </div>
// // //       </div>
// // //     );
// // //   };

// // //   return (
// // //     <>
// // //       {!isFullScreen && (
// // //         <div
// // //           className={`border-2 ${isSelected ? 'border-blue-500' : 'border-gray-700'} rounded-none overflow-hidden relative w-screen -mx-4`}
// // //           style={{ width: 'calc(100% + 2rem)' }}
// // //           onClick={() => onToggleSelect()}
// // //         >
// // //           <TeamContent />
// // //         </div>
// // //       )}
      
// // //       {isFullScreen && <FullScreenView />}
// // //     </>
// // //   );
// // // }




// // // import { useEffect, useState } from "react";
// // // import { FiShare2, FiX, FiMaximize } from 'react-icons/fi';
// // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // import { faWhatsapp, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';

// // // interface Player {
// // //   id: number;
// // //   name: string;
// // //   imgURL?: string;
// // //   teamName: string;
// // //   teamShortName?: string;
// // //   role: string;
// // //   roleOrder: number;
// // //   keeper?: boolean;
// // //   selectedBy?: number;
// // //   substitute?: boolean;
// // //   wasSubstituted?: boolean;
// // //   replacedPlayer?: string;
// // // }

// // // interface GeneratedTeam {
// // //   id: number;
// // //   name?: string;
// // //   players: Player[];
// // //   substitutes: Player[];
// // //   captain: Player;
// // //   viceCaptain: Player;
// // //   riskLevel?: number;
// // //   team1ShortName?: string;
// // //   team2ShortName?: string;
// // //   changes?: number;
// // // }

// // // interface TeamCardProps {
// // //   team: GeneratedTeam;
// // //   index: number;
// // //   isSelected: boolean;
// // //   onToggleSelect: () => void;
// // //   onUpdateTeam: (updatedTeam: GeneratedTeam) => void;
// // //   isNewTeam?: boolean;
// // // }

// // // const getRiskColor = (riskLevel: number) => {
// // //   if (riskLevel < 30) return '#10B981';
// // //   if (riskLevel < 70) return '#F59E0B';
// // //   return '#EF4444';
// // // };

// // // const PlayerRow = ({
// // //   player,
// // //   isSubstitute,
// // //   wasSubstituted,
// // //   isSubstituteList = false
// // // }: {
// // //   player: Player;
// // //   isSubstitute: boolean;
// // //   wasSubstituted?: boolean;
// // //   isSubstituteList?: boolean;
// // // }) => (
// // //   <div className={`flex items-center justify-between text-sm p-2 rounded ${
// // //     wasSubstituted ? 'bg-yellow-900' :
// // //     isSubstitute ? 'bg-red-900' :
// // //     isSubstituteList ? 'bg-gray-600' : 'bg-gray-800'
// // //   }`}>
// // //     <div className="flex items-center gap-2 w-full">
// // //       {isSubstituteList && <span className="text-yellow-400">→</span>}
// // //       {wasSubstituted && <span className="text-green-400">↑</span>}
// // //       <img
// // //         src={player.imgURL || "/fallback.png"}
// // //         alt={player.name}
// // //         className="w-8 h-8 rounded-full"
// // //         onError={(e) => (e.currentTarget as HTMLImageElement).src = "/fallback.png"}
// // //       />
// // //       <div className="flex-1">
// // //         <div className="flex justify-between items-center">
// // //           <span className={isSubstitute ? 'line-through' : ''}>
// // //             {player.name}
// // //             {player.keeper && ' (WK)'}
// // //             {wasSubstituted && player.replacedPlayer && ` (replaced ${player.replacedPlayer})`}
// // //           </span>
// // //         </div>
// // //         <p className="text-xs text-gray-400">{player.teamShortName || player.teamName}</p>
// // //       </div>
// // //     </div>
// // //   </div>
// // // );

// // // const normalizeRole = (role: string): string => {
// // //   if (!role) return 'Bowler';
// // //   const lowerRole = role.toLowerCase().trim();
// // //   if (lowerRole.includes('keep') || lowerRole.includes('wk')) return 'WK-Batsman';
// // //   if (lowerRole.includes('bat') && lowerRole.includes('all')) return 'Batting Allrounder';
// // //   if (lowerRole.includes('bowl') && lowerRole.includes('all')) return 'Bowling Allrounder';
// // //   if (lowerRole.includes('bat')) return 'Batsman';
// // //   if (lowerRole.includes('bowl')) return 'Bowler';
// // //   if (lowerRole.includes('all')) return 'Bowling Allrounder';
// // //   return 'Bowler';
// // // };

// // // export default function TeamCard({
// // //   team,
// // //   index,
// // //   isSelected,
// // //   onToggleSelect,
// // //   onUpdateTeam,
// // //   isNewTeam = false
// // // }: TeamCardProps) {
// // //   const [changes, setChanges] = useState<number>(team.changes || 0);
// // //   const [playerChanges, setPlayerChanges] = useState<Array<{
// // //     out: string;
// // //     in: string;
// // //     role: string;
// // //   }>>([]);
// // //   const [isFullScreen, setIsFullScreen] = useState(false);
// // //   const [showShareOptions, setShowShareOptions] = useState(false);

// // //   const opponentTeamName = team.players.find(
// // //     p => p.teamName !== team.captain.teamName
// // //   )?.teamName || 'Opponent';

// // //   useEffect(() => {
// // //     const checkLineupChanges = () => {
// // //       const newPlayerChanges: Array<{
// // //         out: string;
// // //         in: string;
// // //         role: string;
// // //       }> = [];
      
// // //       let changeCount = 0;
      
// // //       const updatedPlayers = team.players.map(player => {
// // //         if (player.substitute) {
// // //           changeCount++;
      
// // //           const replacement = team.substitutes?.length
// // //             ? team.substitutes
// // //                 .filter(sub => normalizeRole(sub.role) === normalizeRole(player.role))
// // //                 .sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0))[0]
// // //             : null;
      
// // //           if (replacement) {
// // //             newPlayerChanges.push({
// // //               out: player.name,
// // //               in: replacement.name,
// // //               role: player.role
// // //             });
      
// // //             return {
// // //               ...replacement,
// // //               wasSubstituted: true,
// // //               replacedPlayer: player.name
// // //             };
// // //           }
// // //         }
// // //         return player;
// // //       });
      
// // //       if (changeCount > 0) {
// // //         setChanges(changeCount);
// // //         setPlayerChanges(newPlayerChanges);
        
// // //         const updatedTeam = {
// // //           ...team,
// // //           players: updatedPlayers,
// // //           changes: changeCount
// // //         };
        
// // //         onUpdateTeam(updatedTeam);
// // //       }
// // //     };
    
// // //     checkLineupChanges();
// // //   }, [team, onUpdateTeam]);

// // //   const playersByRole = {
// // //     'WK-Batsman': team.players.filter(p => normalizeRole(p.role) === 'WK-Batsman'),
// // //     'Batsman': team.players.filter(p => normalizeRole(p.role) === 'Batsman'),
// // //     'Batting Allrounder': team.players.filter(p => normalizeRole(p.role) === 'Batting Allrounder'),
// // //     'Bowling Allrounder': team.players.filter(p => normalizeRole(p.role) === 'Bowling Allrounder'),
// // //     'Bowler': team.players.filter(p => normalizeRole(p.role) === 'Bowler')
// // //   };

// // //   const team1Count = team.players.filter(p => p.teamName === team.captain.teamName).length;
// // //   const team2Count = 11 - team1Count;

// // //   const generateShareText = () => {
// // //     const captainTeamName = team.team1ShortName || team.captain.teamName;
// // //     const opponentName = team.team2ShortName || opponentTeamName;
  
// // //     let text = `Fantasy Team ${index + 1} - ${captainTeamName} vs ${opponentName}\n\n`;
// // //     text += `Captain: ${team.captain.name} (${team.captain.teamShortName || team.captain.teamName})\n`;
// // //     text += `Vice-Captain: ${team.viceCaptain.name} (${team.viceCaptain.teamShortName || team.viceCaptain.teamName})\n\n`;
  
// // //     text += "Playing XI:\n";
// // //     Object.entries(playersByRole).forEach(([role, players]) => {
// // //       if (players.length > 0) {
// // //         text += `${role}:\n`;
// // //         players.forEach(player => {
// // //           text += `• ${player.name} (${player.teamShortName || player.teamName}) ${player.wasSubstituted ? '(replaced)' : ''}\n`;
// // //         });
// // //       }
// // //     });
  
// // //     if (team.substitutes && team.substitutes.length > 0) {
// // //       text += "\nSubstitutes:\n";
// // //       team.substitutes.forEach(sub => {
// // //         text += `• ${sub.name} (${sub.teamShortName || sub.teamName})\n`;
// // //       });
// // //     }
  
// // //     text += `\nTeam Balance: ${team1Count} ${captainTeamName} | ${team2Count} ${opponentName}\n`;
// // //     text += `Risk Level: ${team.riskLevel || 50}/100\n`;
  
// // //     if (isNewTeam) {
// // //       text += `\nNew team created for ${captainTeamName} vs ${opponentName} match`;
// // //     }
  
// // //     return text;
// // //   };

// // //   const shareToWhatsApp = () => {
// // //     const text = generateShareText();
// // //     const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
// // //     window.open(url, '_blank');
// // //     setShowShareOptions(false);
// // //   };

// // //   const shareToTelegram = () => {
// // //     const text = generateShareText();
// // //     const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`;
// // //     window.open(url, '_blank');
// // //     setShowShareOptions(false);
// // //   };

// // //   const shareToTwitter = () => {
// // //     const text = generateShareText();
// // //     const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text.substring(0, 250) + (text.length > 250 ? '...' : ''))}`;
// // //     window.open(url, '_blank');
// // //     setShowShareOptions(false);
// // //   };

// // //   const copyToClipboard = () => {
// // //     const text = generateShareText();
// // //     navigator.clipboard.writeText(text).then(() => {
// // //       alert('Team copied to clipboard!');
// // //       setShowShareOptions(false);
// // //     });
// // //   };

// // //   const TeamContent = () => (
// // //     <>
// // //       {changes > 0 && (
// // //         <div className="absolute -top-2 -right-2 bg-yellow-500 text-black font-bold rounded-full h-6 w-6 flex items-center justify-center">
// // //           {changes}
// // //         </div>
// // //       )}
      
// // //       {isNewTeam && (
// // //         <div className="absolute -top-2 -left-2 bg-green-500 text-black font-bold rounded-full px-2 py-1 text-xs flex items-center justify-center">
// // //           NEW
// // //         </div>
// // //       )}
      
// // //       <div className="bg-gray-800 p-3 flex justify-between items-center">
// // //         <h3 className="font-bold">{team?.name || `Team ${index + 1}`}</h3>
// // //         <div className="flex items-center gap-2">
// // //           {changes > 0 && (
// // //             <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full">
// // //               {changes} change{changes > 1 ? 's' : ''}
// // //             </span>
// // //           )}
// // //           <div className="flex gap-2 items-center">
// // //             <button
// // //               onClick={(e) => {
// // //                 e.stopPropagation();
// // //                 setShowShareOptions(!showShareOptions);
// // //               }}
// // //               className="text-gray-300 hover:text-white p-1"
// // //               aria-label="Share team"
// // //             >
// // //               <FiShare2 size={18} />
// // //             </button>
// // //             <button
// // //               onClick={(e) => {
// // //                 e.stopPropagation();
// // //                 setIsFullScreen(!isFullScreen);
// // //               }}
// // //               className="text-gray-300 hover:text-white p-1"
// // //               aria-label={isFullScreen ? "Close full screen" : "View full screen"}
// // //             >
// // //               {isFullScreen ? <FiX size={18} /> : <FiMaximize size={18} />}
// // //             </button>
// // //             <input
// // //               type="checkbox"
// // //               checked={isSelected}
// // //               onChange={(e) => {
// // //                 e.stopPropagation();
// // //                 onToggleSelect();
// // //               }}
// // //               onClick={(e) => e.stopPropagation()}
// // //               className="h-5 w-5 rounded text-blue-600 cursor-pointer"
// // //               aria-label="Select team"
// // //             />
// // //           </div>
// // //         </div>
// // //       </div>
      
// // //       {showShareOptions && (
// // //         <div className="absolute right-12 top-12 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10 p-2">
// // //           <button
// // //             onClick={shareToWhatsApp}
// // //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// // //           >
// // //             <FontAwesomeIcon icon={faWhatsapp} className="text-green-400" /> WhatsApp
// // //           </button>
// // //           <button
// // //             onClick={shareToTelegram}
// // //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// // //           >
// // //             <FontAwesomeIcon icon={faTelegram} className="text-blue-400" /> Telegram
// // //           </button>
// // //           <button
// // //             onClick={shareToTwitter}
// // //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// // //           >
// // //             <FontAwesomeIcon icon={faTwitter} className="text-blue-400" /> Twitter
// // //           </button>
// // //           <button
// // //             onClick={copyToClipboard}
// // //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// // //           >
// // //             <FiShare2 /> Copy Text
// // //           </button>
// // //         </div>
// // //       )}
      
// // //       <div className="bg-gray-700 p-4">
// // //         {playerChanges.length > 0 && (
// // //           <div className="mb-3 bg-yellow-900 p-2 rounded text-sm">
// // //             <div className="font-medium mb-1">Team Changes:</div>
// // //             {playerChanges.map((change, i) => (
// // //               <div key={i} className="flex justify-between">
// // //                 <span className="text-red-300 line-through">{change.out}</span>
// // //                 <span>→</span>
// // //                 <span className="text-green-300">{change.in}</span>
// // //                 <span className="text-gray-400 text-xs">{change.role}</span>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         )}
        
// // //         <div className="flex gap-4 mb-3">
// // //           <div className="flex-1">
// // //             <div className="flex items-center gap-2 w-full">
// // //               <img
// // //                 src={team.captain.imgURL || "/fallback.png"}
// // //                 alt={team.captain.name}
// // //                 className="w-10 h-10 rounded-full"
// // //                 onError={(e) => {
// // //                   const target = e.target as HTMLImageElement;
// // //                   target.src = "/fallback.png";
// // //                 }}
// // //               />
// // //               <div className="flex-1">
// // //                 <div className="flex justify-between items-center">
// // //                   <p className={`font-medium ${
// // //                     team.captain.wasSubstituted ? 'text-yellow-400' :
// // //                     team.captain.substitute ? 'text-red-400' : 'text-white'
// // //                     }`}>
// // //                     <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-2">C</span>
// // //                     {team.captain.name}
// // //                   </p>
// // //                 </div>
// // //                 <p className="text-xs text-gray-400">{team.captain.teamShortName || team.captain.teamName}</p>
// // //               </div>
// // //             </div>
// // //           </div>
          
// // //           <div className="flex-1">
// // //             <div className="flex items-center gap-2 w-full">
// // //               <img
// // //                 src={team.viceCaptain.imgURL || "/fallback.png"}
// // //                 alt={team.viceCaptain.name}
// // //                 className="w-10 h-10 rounded-full"
// // //                 onError={(e) => {
// // //                   const target = e.target as HTMLImageElement;
// // //                   target.src = "/fallback.png";
// // //                 }}
// // //               />
// // //               <div className="flex-1">
// // //                 <div className="flex justify-between items-center">
// // //                   <p className={`font-medium ${
// // //                     team.viceCaptain.wasSubstituted ? 'text-yellow-400' :
// // //                     team.viceCaptain.substitute ? 'text-red-400' : 'text-white'
// // //                   }`}>
// // //                     <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-2">VC</span>
// // //                     {team.viceCaptain.name}
// // //                   </p>
// // //                 </div>
// // //                 <p className="text-xs text-gray-400">{team.viceCaptain.teamShortName || team.viceCaptain.teamName}</p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
        
// // //         <div className="mb-3 bg-gray-800 p-2 rounded">
// // //           <div className="flex justify-between text-sm mb-1">
// // //             <span>{team.team1ShortName || team.captain.teamName}: {team1Count}</span>
// // //             <span>{team.team2ShortName || opponentTeamName}: {team2Count}</span>
// // //           </div>
// // //           <div className="flex justify-between items-center mt-1">
// // //             <div className="flex flex-wrap gap-1 text-xs">
// // //               <span className="bg-gray-600 px-2 py-1 rounded">WK: {playersByRole['WK-Batsman'].length}</span>
// // //               <span className="bg-gray-600 px-2 py-1 rounded">Bats: {playersByRole['Batsman'].length}</span>
// // //               <span className="bg-gray-600 px-2 py-1 rounded">AR: {
// // //                 playersByRole['Batting Allrounder'].length + playersByRole['Bowling Allrounder'].length
// // //               }</span>
// // //               <span className="bg-gray-600 px-2 py-1 rounded">Bowlers: {playersByRole['Bowler'].length}</span>
// // //             </div>
// // //             <div className="text-xs font-medium px-2 py-1 rounded" style={{
// // //               backgroundColor: getRiskColor(team.riskLevel || 50),
// // //               color: 'white'
// // //             }}>
// // //               Risk: {team.riskLevel || 50}%
// // //             </div>
// // //           </div>
// // //         </div>
        
// // //         <div className={`space-y-2 ${isFullScreen ? '' : 'max-h-60'} overflow-y-auto`}>
// // //           {playersByRole['WK-Batsman'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Wicket Keepers</div>
// // //           )}
// // //           {playersByRole['WK-Batsman'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`wk-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {playersByRole['Batsman'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Batsmen</div>
// // //           )}
// // //           {playersByRole['Batsman'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`bat-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {playersByRole['Batting Allrounder'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Batting Allrounders</div>
// // //           )}
// // //           {playersByRole['Batting Allrounder'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`bar-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {playersByRole['Bowling Allrounder'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Bowling Allrounders</div>
// // //           )}
// // //           {playersByRole['Bowling Allrounder'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`bowlar-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {playersByRole['Bowler'].length > 0 && (
// // //             <div className="text-xs text-gray-400 mt-2">Bowlers</div>
// // //           )}
// // //           {playersByRole['Bowler'].map((player, i) => (
// // //             <PlayerRow
// // //               key={`bowl-${i}`}
// // //               player={player}
// // //               isSubstitute={!!player.substitute}
// // //               wasSubstituted={player.wasSubstituted}
// // //             />
// // //           ))}
          
// // //           {team.substitutes && team.substitutes.length > 0 && (
// // //             <>
// // //               <div className="text-xs text-gray-400 mt-4">Substitutes (→)</div>
// // //               {team.substitutes.map((sub, i) => (
// // //                 <PlayerRow
// // //                   key={`sub-${i}`}
// // //                   player={sub}
// // //                   isSubstitute={false}
// // //                   isSubstituteList
// // //                 />
// // //               ))}
// // //             </>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </>
// // //   );

// // //   const FullScreenView = () => {
// // //     const roleGroups = [
// // //       { title: "WICKET-KEEPERS", players: playersByRole['WK-Batsman'] },
// // //       { title: "BATTERS", players: playersByRole['Batsman'] },
// // //       {
// // //         title: "ALL-ROUNDERS",
// // //         players: [...playersByRole['Batting Allrounder'], ...playersByRole['Bowling Allrounder']]
// // //       },
// // //       { title: "BOWLERS", players: playersByRole['Bowler'] }
// // //     ];
  
// // //     return (
// // //       <div className="fixed inset-0 bg-gray-900 z-50 p-1 overflow-y-auto">
// // //         <div className="flex justify-between items-center mb-1 sticky top-0 bg-gray-900 py-1">
// // //           <h2 className="text-base font-bold text-white">{team?.name || `Team ${index + 1}`}</h2>
// // //           <button
// // //             onClick={() => setIsFullScreen(false)}
// // //             className="text-white p-0"
// // //             aria-label="Close full screen view"
// // //           >
// // //             <FiX size={18} />
// // //           </button>
// // //         </div>
  
// // //         <div className="space-y-3 px-1">
// // //           {roleGroups.map((group, i) => (
// // //             group.players.length > 0 && (
// // //               <div key={`role-${i}`} className="mb-1">
// // //                 <div className="text-xs font-medium mb-1 text-gray-300 text-center">
// // //                   {group.title}
// // //                 </div>
// // //                 <div className={`flex ${group.players.length === 1 ? 'justify-center' : 'justify-between'} flex-wrap gap-y-2`}>
// // //                   {group.players.map((player) => (
// // //                     <div key={`player-${player.id}`} className="flex flex-col items-center w-[32%]">
// // //                       <div className="relative">
// // //                         <img
// // //                           src={player.imgURL || "/fallback.png"}
// // //                           alt={player.name}
// // //                           className="w-11 h-11 rounded-full object-cover border border-gray-600"
// // //                           onError={(e) => {
// // //                             const target = e.target as HTMLImageElement;
// // //                             target.src = "/fallback.png";
// // //                           }}
// // //                         />
// // //                         {player.id === team.captain.id && (
// // //                           <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center border border-white">
// // //                             C
// // //                           </span>
// // //                         )}
// // //                         {player.id === team.viceCaptain.id && (
// // //                           <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center border border-white">
// // //                             VC
// // //                           </span>
// // //                         )}
// // //                       </div>
// // //                       <div className="text-[11px] font-medium text-white text-center mt-0.5 truncate w-full">
// // //                         {player.name?.split(" ")[0].charAt(0).toUpperCase() +
// // //                           player.name?.split(" ")[0].slice(1).toLowerCase()}
// // //                       </div>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             )
// // //           ))}
// // //         </div>
  
// // //         <div className="mt-3 text-center text-[11px] text-gray-400 sticky bottom-0 bg-gray-900 py-1">
// // //           {team.team1ShortName || team.captain.teamName} vs {team.team2ShortName || opponentTeamName}
// // //         </div>
// // //       </div>
// // //     );
// // //   };

// // //   return (
// // //     <>
// // //       {!isFullScreen && (
// // //         <div
// // //           className={`border-2 ${isSelected ? 'border-blue-500' : 'border-gray-700'} rounded-none overflow-hidden relative w-screen -mx-4`}
// // //           style={{ width: 'calc(100% + 2rem)' }}
// // //           onClick={() => onToggleSelect()}
// // //         >
// // //           <TeamContent />
// // //         </div>
// // //       )}
      
// // //       {isFullScreen && <FullScreenView />}
// // //     </>
// // //   );
// // // }







// // // TeamCard.tsx
// // import { useEffect, useState } from "react";
// // import { FiShare2, FiX, FiMaximize } from 'react-icons/fi';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faWhatsapp, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';

// // interface Player {
// //   id: number;
// //   name: string;
// //   imgURL?: string;
// //   teamName: string;
// //   teamShortName?: string;
// //   role: string;
// //   roleOrder: number;
// //   keeper?: boolean;
// //   selectedBy?: number;
// //   substitute?: boolean;
// //   wasSubstituted?: boolean;
// //   replacedPlayer?: string;
// // }

// // interface GeneratedTeam {
// //   id: number;
// //   name?: string;
// //   players: Player[];
// //   substitutes: Player[];
// //   captain: Player;
// //   viceCaptain: Player;
// //   riskLevel?: number;
// //   team1ShortName?: string;
// //   team2ShortName?: string;
// //   changes?: number;
// // }

// // interface TeamCardProps {
// //   team: GeneratedTeam;
// //   index: number;
// //   isSelected: boolean;
// //   onToggleSelect: () => void;
// //   onUpdateTeam: (updatedTeam: GeneratedTeam) => void;
// //   isNewTeam?: boolean;
// // }

// // const getRiskColor = (riskLevel: number) => {
// //   if (riskLevel < 30) return '#10B981';
// //   if (riskLevel < 70) return '#F59E0B';
// //   return '#EF4444';
// // };

// // const PlayerRow = ({
// //   player,
// //   isSubstitute,
// //   wasSubstituted,
// //   isSubstituteList = false
// // }: {
// //   player: Player;
// //   isSubstitute: boolean;
// //   wasSubstituted?: boolean;
// //   isSubstituteList?: boolean;
// // }) => (
// //   <div className={`flex items-center justify-between text-sm p-2 rounded ${
// //     wasSubstituted ? 'bg-yellow-900' :
// //     isSubstitute ? 'bg-red-900' :
// //     isSubstituteList ? 'bg-gray-600' : 'bg-gray-800'
// //   }`}>
// //     <div className="flex items-center gap-2 w-full">
// //       {isSubstituteList && <span className="text-yellow-400">→</span>}
// //       {wasSubstituted && <span className="text-green-400">↑</span>}
// //       <img
// //         src={player.imgURL || "/fallback.png"}
// //         alt={player.name}
// //         className="w-8 h-8 rounded-full"
// //         onError={(e) => (e.currentTarget as HTMLImageElement).src = "/fallback.png"}
// //       />
// //       <div className="flex-1">
// //         <div className="flex justify-between items-center">
// //           <span className={isSubstitute ? 'line-through' : ''}>
// //             {player.name}
// //             {player.keeper && ' (WK)'}
// //             {wasSubstituted && player.replacedPlayer && ` (replaced ${player.replacedPlayer})`}
// //           </span>
// //         </div>
// //         <p className="text-xs text-gray-400">{player.teamShortName || player.teamName}</p>
// //       </div>
// //     </div>
// //   </div>
// // );

// // const normalizeRole = (role: string): string => {
// //   if (!role) return 'Bowler';
// //   const lowerRole = role.toLowerCase().trim();
// //   if (lowerRole.includes('keep') || lowerRole.includes('wk')) return 'WK-Batsman';
// //   if (lowerRole.includes('bat') && lowerRole.includes('all')) return 'Batting Allrounder';
// //   if (lowerRole.includes('bowl') && lowerRole.includes('all')) return 'Bowling Allrounder';
// //   if (lowerRole.includes('bat')) return 'Batsman';
// //   if (lowerRole.includes('bowl')) return 'Bowler';
// //   if (lowerRole.includes('all')) return 'Bowling Allrounder';
// //   return 'Bowler';
// // };

// // export default function TeamCard({
// //   team,
// //   index,
// //   isSelected,
// //   onToggleSelect,
// //   onUpdateTeam,
// //   isNewTeam = false
// // }: TeamCardProps) {
// //   const [changes, setChanges] = useState<number>(team?.changes || 0);
// //   const [playerChanges, setPlayerChanges] = useState<Array<{
// //     out: string;
// //     in: string;
// //     role: string;
// //   }>>([]);
// //   const [isFullScreen, setIsFullScreen] = useState(false);
// //   const [showShareOptions, setShowShareOptions] = useState(false);

// //   const captain = team?.captain || {
// //     id: 0,
// //     name: 'Unknown Captain',
// //     teamName: 'Unknown Team',
// //     role: 'Batsman'
// //   };
// //   const viceCaptain = team?.viceCaptain || {
// //     id: 0,
// //     name: 'Unknown Vice-Captain',
// //     teamName: 'Unknown Team',
// //     role: 'Batsman'
// //   };

// //   const opponentTeamName = team?.players?.find(
// //     p => p.teamName !== captain.teamName
// //   )?.teamName || 'Opponent';

// //   useEffect(() => {
// //     const checkLineupChanges = () => {
// //       if (!team?.players || !team?.substitutes) return;
      
// //       const newPlayerChanges: Array<{
// //         out: string;
// //         in: string;
// //         role: string;
// //       }> = [];
      
// //       let changeCount = 0;
      
// //       const updatedPlayers = team.players.map(player => {
// //         if (player.substitute) {
// //           changeCount++;
      
// //           const replacement = team.substitutes?.length
// //             ? team.substitutes
// //                 .filter(sub => normalizeRole(sub.role) === normalizeRole(player.role))
// //                 .sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0))[0]
// //             : null;
      
// //           if (replacement) {
// //             newPlayerChanges.push({
// //               out: player.name,
// //               in: replacement.name,
// //               role: player.role
// //             });
      
// //             return {
// //               ...replacement,
// //               wasSubstituted: true,
// //               replacedPlayer: player.name
// //             };
// //           }
// //         }
// //         return player;
// //       });
      
// //       if (changeCount > 0) {
// //         setChanges(changeCount);
// //         setPlayerChanges(newPlayerChanges);
        
// //         const updatedTeam = {
// //           ...team,
// //           players: updatedPlayers,
// //           changes: changeCount
// //         };
        
// //         onUpdateTeam(updatedTeam);
// //       }
// //     };
    
// //     checkLineupChanges();
// //   }, [team, onUpdateTeam]);

// //   const playersByRole = {
// //     'WK-Batsman': team?.players?.filter(p => normalizeRole(p.role) === 'WK-Batsman') || [],
// //     'Batsman': team?.players?.filter(p => normalizeRole(p.role) === 'Batsman') || [],
// //     'Batting Allrounder': team?.players?.filter(p => normalizeRole(p.role) === 'Batting Allrounder') || [],
// //     'Bowling Allrounder': team?.players?.filter(p => normalizeRole(p.role) === 'Bowling Allrounder') || [],
// //     'Bowler': team?.players?.filter(p => normalizeRole(p.role) === 'Bowler') || []
// //   };

// //   const team1Count = team?.players?.filter(p => p.teamName === captain.teamName).length || 0;
// //   const team2Count = 11 - team1Count;

// //   const generateShareText = () => {
// //     const captainTeamName = team?.team1ShortName || captain.teamName;
// //     const opponentName = team?.team2ShortName || opponentTeamName;
  
// //     let text = `Fantasy Team ${index + 1} - ${captainTeamName} vs ${opponentName}\n\n`;
// //     text += `Captain: ${captain.name} (${captain.teamShortName || captain.teamName})\n`;
// //     text += `Vice-Captain: ${viceCaptain.name} (${viceCaptain.teamShortName || viceCaptain.teamName})\n\n`;
  
// //     text += "Playing XI:\n";
// //     Object.entries(playersByRole).forEach(([role, players]) => {
// //       if (players.length > 0) {
// //         text += `${role}:\n`;
// //         players.forEach(player => {
// //           text += `• ${player.name} (${player.teamShortName || player.teamName}) ${player.wasSubstituted ? '(replaced)' : ''}\n`;
// //         });
// //       }
// //     });
  
// //     if (team?.substitutes && team.substitutes.length > 0) {
// //       text += "\nSubstitutes:\n";
// //       team.substitutes.forEach(sub => {
// //         text += `• ${sub.name} (${sub.teamShortName || sub.teamName})\n`;
// //       });
// //     }
  
// //     text += `\nTeam Balance: ${team1Count} ${captainTeamName} | ${team2Count} ${opponentName}\n`;
// //     text += `Risk Level: ${team?.riskLevel || 50}/100\n`;
  
// //     if (isNewTeam) {
// //       text += `\nNew team created for ${captainTeamName} vs ${opponentName} match`;
// //     }
  
// //     return text;
// //   };

// //   const shareToWhatsApp = () => {
// //     const text = generateShareText();
// //     const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
// //     window.open(url, '_blank');
// //     setShowShareOptions(false);
// //   };

// //   const shareToTelegram = () => {
// //     const text = generateShareText();
// //     const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`;
// //     window.open(url, '_blank');
// //     setShowShareOptions(false);
// //   };

// //   const shareToTwitter = () => {
// //     const text = generateShareText();
// //     const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text.substring(0, 250) + (text.length > 250 ? '...' : ''))}`;
// //     window.open(url, '_blank');
// //     setShowShareOptions(false);
// //   };

// //   const copyToClipboard = () => {
// //     const text = generateShareText();
// //     navigator.clipboard.writeText(text).then(() => {
// //       alert('Team copied to clipboard!');
// //       setShowShareOptions(false);
// //     });
// //   };

// //   const TeamContent = () => (
// //     <>
// //       {changes > 0 && (
// //         <div className="absolute -top-2 -right-2 bg-yellow-500 text-black font-bold rounded-full h-6 w-6 flex items-center justify-center">
// //           {changes}
// //         </div>
// //       )}
      
// //       {isNewTeam && (
// //         <div className="absolute -top-2 -left-2 bg-green-500 text-black font-bold rounded-full px-2 py-1 text-xs flex items-center justify-center">
// //           NEW
// //         </div>
// //       )}
      
// //       <div className="bg-gray-800 p-3 flex justify-between items-center">
// //         <h3 className="font-bold">{team?.name || `Team ${index + 1}`}</h3>
// //         <div className="flex items-center gap-2">
// //           {changes > 0 && (
// //             <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full">
// //               {changes} change{changes > 1 ? 's' : ''}
// //             </span>
// //           )}
// //           <div className="flex gap-2 items-center">
// //             <button
// //               onClick={(e) => {
// //                 e.stopPropagation();
// //                 setShowShareOptions(!showShareOptions);
// //               }}
// //               className="text-gray-300 hover:text-white p-1"
// //               aria-label="Share team"
// //             >
// //               <FiShare2 size={18} />
// //             </button>
// //             <button
// //               onClick={(e) => {
// //                 e.stopPropagation();
// //                 setIsFullScreen(!isFullScreen);
// //               }}
// //               className="text-gray-300 hover:text-white p-1"
// //               aria-label={isFullScreen ? "Close full screen" : "View full screen"}
// //             >
// //               {isFullScreen ? <FiX size={18} /> : <FiMaximize size={18} />}
// //             </button>
// //             <input
// //               type="checkbox"
// //               checked={isSelected}
// //               onChange={(e) => {
// //                 e.stopPropagation();
// //                 onToggleSelect();
// //               }}
// //               onClick={(e) => e.stopPropagation()}
// //               className="h-5 w-5 rounded text-blue-600 cursor-pointer"
// //               aria-label="Select team"
// //             />
// //           </div>
// //         </div>
// //       </div>
      
// //       {showShareOptions && (
// //         <div className="absolute right-12 top-12 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10 p-2">
// //           <button
// //             onClick={shareToWhatsApp}
// //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// //           >
// //             <FontAwesomeIcon icon={faWhatsapp} className="text-green-400" /> WhatsApp
// //           </button>
// //           <button
// //             onClick={shareToTelegram}
// //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// //           >
// //             <FontAwesomeIcon icon={faTelegram} className="text-blue-400" /> Telegram
// //           </button>
// //           <button
// //             onClick={shareToTwitter}
// //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// //           >
// //             <FontAwesomeIcon icon={faTwitter} className="text-blue-400" /> Twitter
// //           </button>
// //           <button
// //             onClick={copyToClipboard}
// //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// //           >
// //             <FiShare2 /> Copy Text
// //           </button>
// //         </div>
// //       )}
      
// //       <div className="bg-gray-700 p-4">
// //         {playerChanges.length > 0 && (
// //           <div className="mb-3 bg-yellow-900 p-2 rounded text-sm">
// //             <div className="font-medium mb-1">Team Changes:</div>
// //             {playerChanges.map((change, i) => (
// //               <div key={i} className="flex justify-between">
// //                 <span className="text-red-300 line-through">{change.out}</span>
// //                 <span>→</span>
// //                 <span className="text-green-300">{change.in}</span>
// //                 <span className="text-gray-400 text-xs">{change.role}</span>
// //               </div>
// //             ))}
// //           </div>
// //         )}
        
// //         <div className="flex gap-4 mb-3">
// //           <div className="flex-1">
// //             <div className="flex items-center gap-2 w-full">
// //               <img
// //                 src={captain.imgURL || "/fallback.png"}
// //                 alt={captain.name}
// //                 className="w-10 h-10 rounded-full"
// //                 onError={(e) => {
// //                   const target = e.target as HTMLImageElement;
// //                   target.src = "/fallback.png";
// //                 }}
// //               />
// //               <div className="flex-1">
// //                 <div className="flex justify-between items-center">
// //                   <p className={`font-medium ${
// //                     captain.wasSubstituted ? 'text-yellow-400' :
// //                     captain.substitute ? 'text-red-400' : 'text-white'
// //                     }`}>
// //                     <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-2">C</span>
// //                     {captain.name}
// //                   </p>
// //                 </div>
// //                 <p className="text-xs text-gray-400">{captain.teamShortName || captain.teamName}</p>
// //               </div>
// //             </div>
// //           </div>
          
// //           <div className="flex-1">
// //             <div className="flex items-center gap-2 w-full">
// //               <img
// //                 src={viceCaptain.imgURL || "/fallback.png"}
// //                 alt={viceCaptain.name}
// //                 className="w-10 h-10 rounded-full"
// //                 onError={(e) => {
// //                   const target = e.target as HTMLImageElement;
// //                   target.src = "/fallback.png";
// //                 }}
// //               />
// //               <div className="flex-1">
// //                 <div className="flex justify-between items-center">
// //                   <p className={`font-medium ${
// //                     viceCaptain.wasSubstituted ? 'text-yellow-400' :
// //                     viceCaptain.substitute ? 'text-red-400' : 'text-white'
// //                   }`}>
// //                     <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-2">VC</span>
// //                     {viceCaptain.name}
// //                   </p>
// //                 </div>
// //                 <p className="text-xs text-gray-400">{viceCaptain.teamShortName || viceCaptain.teamName}</p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
        
// //         <div className="mb-3 bg-gray-800 p-2 rounded">
// //           <div className="flex justify-between text-sm mb-1">
// //             <span>{team?.team1ShortName || captain.teamName}: {team1Count}</span>
// //             <span>{team?.team2ShortName || opponentTeamName}: {team2Count}</span>
// //           </div>
// //           <div className="flex justify-between items-center mt-1">
// //             <div className="flex flex-wrap gap-1 text-xs">
// //               <span className="bg-gray-600 px-2 py-1 rounded">WK: {playersByRole['WK-Batsman'].length}</span>
// //               <span className="bg-gray-600 px-2 py-1 rounded">Bats: {playersByRole['Batsman'].length}</span>
// //               <span className="bg-gray-600 px-2 py-1 rounded">AR: {
// //                 playersByRole['Batting Allrounder'].length + playersByRole['Bowling Allrounder'].length
// //               }</span>
// //               <span className="bg-gray-600 px-2 py-1 rounded">Bowlers: {playersByRole['Bowler'].length}</span>
// //             </div>
// //             <div className="text-xs font-medium px-2 py-1 rounded" style={{
// //               backgroundColor: getRiskColor(team?.riskLevel || 50),
// //               color: 'white'
// //             }}>
// //               Risk: {team?.riskLevel || 50}%
// //             </div>
// //           </div>
// //         </div>
        
// //         <div className={`space-y-2 ${isFullScreen ? '' : 'max-h-60'} overflow-y-auto`}>
// //           {playersByRole['WK-Batsman'].length > 0 && (
// //             <div className="text-xs text-gray-400 mt-2">Wicket Keepers</div>
// //           )}
// //           {playersByRole['WK-Batsman'].map((player, i) => (
// //             <PlayerRow
// //               key={`wk-${i}`}
// //               player={player}
// //               isSubstitute={!!player.substitute}
// //               wasSubstituted={player.wasSubstituted}
// //             />
// //           ))}
          
// //           {playersByRole['Batsman'].length > 0 && (
// //             <div className="text-xs text-gray-400 mt-2">Batsmen</div>
// //           )}
// //           {playersByRole['Batsman'].map((player, i) => (
// //             <PlayerRow
// //               key={`bat-${i}`}
// //               player={player}
// //               isSubstitute={!!player.substitute}
// //               wasSubstituted={player.wasSubstituted}
// //             />
// //           ))}
          
// //           {playersByRole['Batting Allrounder'].length > 0 && (
// //             <div className="text-xs text-gray-400 mt-2">Batting Allrounders</div>
// //           )}
// //           {playersByRole['Batting Allrounder'].map((player, i) => (
// //             <PlayerRow
// //               key={`bar-${i}`}
// //               player={player}
// //               isSubstitute={!!player.substitute}
// //               wasSubstituted={player.wasSubstituted}
// //             />
// //           ))}
          
// //           {playersByRole['Bowling Allrounder'].length > 0 && (
// //             <div className="text-xs text-gray-400 mt-2">Bowling Allrounders</div>
// //           )}
// //           {playersByRole['Bowling Allrounder'].map((player, i) => (
// //             <PlayerRow
// //               key={`bowlar-${i}`}
// //               player={player}
// //               isSubstitute={!!player.substitute}
// //               wasSubstituted={player.wasSubstituted}
// //             />
// //           ))}
          
// //           {playersByRole['Bowler'].length > 0 && (
// //             <div className="text-xs text-gray-400 mt-2">Bowlers</div>
// //           )}
// //           {playersByRole['Bowler'].map((player, i) => (
// //             <PlayerRow
// //               key={`bowl-${i}`}
// //               player={player}
// //               isSubstitute={!!player.substitute}
// //               wasSubstituted={player.wasSubstituted}
// //             />
// //           ))}
          
// //           {team?.substitutes && team.substitutes.length > 0 && (
// //             <>
// //               <div className="text-xs text-gray-400 mt-4">Substitutes (→)</div>
// //               {team.substitutes.map((sub, i) => (
// //                 <PlayerRow
// //                   key={`sub-${i}`}
// //                   player={sub}
// //                   isSubstitute={false}
// //                   isSubstituteList
// //                 />
// //               ))}
// //             </>
// //           )}
// //         </div>
// //       </div>
// //     </>
// //   );

// //   const FullScreenView = () => {
// //     const roleGroups = [
// //       { title: "WICKET-KEEPERS", players: playersByRole['WK-Batsman'] },
// //       { title: "BATTERS", players: playersByRole['Batsman'] },
// //       {
// //         title: "ALL-ROUNDERS",
// //         players: [...playersByRole['Batting Allrounder'], ...playersByRole['Bowling Allrounder']]
// //       },
// //       { title: "BOWLERS", players: playersByRole['Bowler'] }
// //     ];
  
// //     return (
// //       <div className="fixed inset-0 bg-gray-900 z-50 p-1 overflow-y-auto">
// //         <div className="flex justify-between items-center mb-1 sticky top-0 bg-gray-900 py-1">
// //           <h2 className="text-base font-bold text-white">{team?.name || `Team ${index + 1}`}</h2>
// //           <button
// //             onClick={() => setIsFullScreen(false)}
// //             className="text-white p-0"
// //             aria-label="Close full screen view"
// //           >
// //             <FiX size={18} />
// //           </button>
// //         </div>
  
// //         <div className="space-y-3 px-1">
// //           {roleGroups.map((group, i) => (
// //             group.players.length > 0 && (
// //               <div key={`role-${i}`} className="mb-1">
// //                 <div className="text-xs font-medium mb-1 text-gray-300 text-center">
// //                   {group.title}
// //                 </div>
// //                 <div className={`flex ${group.players.length === 1 ? 'justify-center' : 'justify-between'} flex-wrap gap-y-2`}>
// //                   {group.players.map((player) => (
// //                     <div key={`player-${player.id}`} className="flex flex-col items-center w-[32%]">
// //                       <div className="relative">
// //                         <img
// //                           src={player.imgURL || "/fallback.png"}
// //                           alt={player.name}
// //                           className="w-11 h-11 rounded-full object-cover border border-gray-600"
// //                           onError={(e) => {
// //                             const target = e.target as HTMLImageElement;
// //                             target.src = "/fallback.png";
// //                           }}
// //                         />
// //                         {player.id === captain.id && (
// //                           <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center border border-white">
// //                             C
// //                           </span>
// //                         )}
// //                         {player.id === viceCaptain.id && (
// //                           <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center border border-white">
// //                             VC
// //                           </span>
// //                         )}
// //                       </div>
// //                       <div className="text-[11px] font-medium text-white text-center mt-0.5 truncate w-full">
// //                         {player.name?.split(" ")[0].charAt(0).toUpperCase() +
// //                           player.name?.split(" ")[0].slice(1).toLowerCase()}
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )
// //           ))}
// //         </div>
  
// //         <div className="mt-3 text-center text-[11px] text-gray-400 sticky bottom-0 bg-gray-900 py-1">
// //           {team?.team1ShortName || captain.teamName} vs {team?.team2ShortName || opponentTeamName}
// //         </div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <>
// //       {!isFullScreen && (
// //         // Removed all mobile padding (p-0) and added desktop padding (md:px-4 md:py-2)
// //         // Added w-full to ensure full width on mobile
// //         // Removed negative margins and width overrides to match original mobile behavior
// //         <div
// //           className={`border-2 ${isSelected ? 'border-blue-500' : 'border-gray-700'} rounded-none overflow-hidden relative w-full p-0 md:px-4 md:py-2`}
// //           onClick={() => onToggleSelect()}
// //         >
// //           <TeamContent />
// //         </div>
// //       )}
      
// //       {isFullScreen && <FullScreenView />}
// //     </>
// //   );
// // }


// // // components/TeamCard.tsx
// // "use client";

// // import { useEffect, useState } from "react";
// // import { FiShare2, FiX, FiMaximize } from 'react-icons/fi';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faWhatsapp, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';
// // import { PlayerDetail, GeneratedTeam } from "@/types/match";

// // interface TeamCardProps {
// //   team: GeneratedTeam;
// //   index: number;
// //   isSelected: boolean;
// //   onToggleSelect: () => void;
// //   onUpdateTeam: (updatedTeam: GeneratedTeam) => void;
// //   isNewTeam?: boolean;
// // }

// // const getRiskColor = (riskLevel?: number) => {
// //   if (!riskLevel) return '#6B7280';
// //   if (riskLevel < 30) return '#10B981';
// //   if (riskLevel < 70) return '#F59E0B';
// //   return '#EF4444';
// // };

// // const PlayerRow = ({
// //   player,
// //   isSubstitute,
// //   wasSubstituted,
// //   isSubstituteList = false
// // }: {
// //   player: PlayerDetail;
// //   isSubstitute: boolean;
// //   wasSubstituted?: boolean;
// //   isSubstituteList?: boolean;
// // }) => (
// //   <div className={`flex items-center justify-between text-sm p-2 rounded ${
// //     wasSubstituted ? 'bg-yellow-900' :
// //     isSubstitute ? 'bg-red-900' :
// //     isSubstituteList ? 'bg-gray-600' : 'bg-gray-800'
// //   }`}>
// //     <div className="flex items-center gap-2 w-full">
// //       {isSubstituteList && <span className="text-yellow-400">→</span>}
// //       {wasSubstituted && <span className="text-green-400">↑</span>}
// //       <img
// //         src={player.imgURL || "/fallback.png"}
// //         alt={player.name}
// //         className="w-8 h-8 rounded-full"
// //         onError={(e) => (e.currentTarget as HTMLImageElement).src = "/fallback.png"}
// //       />
// //       <div className="flex-1">
// //         <div className="flex justify-between items-center">
// //           <span className={isSubstitute ? 'line-through' : ''}>
// //             {player.name}
// //             {player.keeper && ' (WK)'}
// //             {wasSubstituted && player.replacedPlayer && ` (replaced ${player.replacedPlayer})`}
// //           </span>
// //         </div>
// //         <p className="text-xs text-gray-400">{player.teamShortName || player.teamName}</p>
// //       </div>
// //     </div>
// //   </div>
// // );

// // const normalizeRole = (role: string): string => {
// //   if (!role) return 'Bowler';
// //   const lowerRole = role.toLowerCase().trim();
// //   if (lowerRole.includes('keep') || lowerRole.includes('wk')) return 'WK-Batsman';
// //   if (lowerRole.includes('bat') && lowerRole.includes('all')) return 'Batting Allrounder';
// //   if (lowerRole.includes('bowl') && lowerRole.includes('all')) return 'Bowling Allrounder';
// //   if (lowerRole.includes('bat')) return 'Batsman';
// //   if (lowerRole.includes('bowl')) return 'Bowler';
// //   if (lowerRole.includes('all')) return 'Bowling Allrounder';
// //   return 'Bowler';
// // };

// // export default function TeamCard({
// //   team,
// //   index,
// //   isSelected,
// //   onToggleSelect,
// //   onUpdateTeam,
// //   isNewTeam = false
// // }: TeamCardProps) {
// //   const [changes, setChanges] = useState<number>(team?.changes || 0);
// //   const [playerChanges, setPlayerChanges] = useState<Array<{
// //     out: string;
// //     in: string;
// //     role: string;
// //   }>>([]);
// //   const [isFullScreen, setIsFullScreen] = useState(false);
// //   const [showShareOptions, setShowShareOptions] = useState(false);

// //   const captain = team?.captain || {
// //     id: 0,
// //     name: 'Unknown Captain',
// //     teamName: 'Unknown Team',
// //     role: 'Batsman',
// //     fullName: '',
// //     nickName: '',
// //     captain: false,
// //     keeper: false,
// //     isOverseas: false
// //   } as PlayerDetail;

// //   const viceCaptain = team?.viceCaptain || {
// //     id: 0,
// //     name: 'Unknown Vice-Captain',
// //     teamName: 'Unknown Team',
// //     role: 'Batsman',
// //     fullName: '',
// //     nickName: '',
// //     captain: false,
// //     keeper: false,
// //     isOverseas: false
// //   } as PlayerDetail;

// //   const opponentTeamName = team?.players?.find(
// //     p => p.teamName !== captain.teamName
// //   )?.teamName || 'Opponent';

// //   useEffect(() => {
// //     const checkLineupChanges = () => {
// //       if (!team?.players || !team?.substitutes) return;
      
// //       const newPlayerChanges: Array<{
// //         out: string;
// //         in: string;
// //         role: string;
// //       }> = [];
      
// //       let changeCount = 0;
      
// //       const updatedPlayers = team.players.map(player => {
// //         if (player.substitute) {
// //           changeCount++;
      
// //           const replacement = team.substitutes?.length
// //             ? team.substitutes
// //                 .filter(sub => normalizeRole(sub.role) === normalizeRole(player.role))
// //                 .sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0))[0]
// //             : null;
      
// //           if (replacement) {
// //             newPlayerChanges.push({
// //               out: player.name,
// //               in: replacement.name,
// //               role: player.role
// //             });
      
// //             return {
// //               ...replacement,
// //               wasSubstituted: true,
// //               replacedPlayer: player.name
// //             } as PlayerDetail;
// //           }
// //         }
// //         return player;
// //       });
      
// //       if (changeCount > 0) {
// //         setChanges(changeCount);
// //         setPlayerChanges(newPlayerChanges);
        
// //         const updatedTeam = {
// //           ...team,
// //           players: updatedPlayers,
// //           changes: changeCount
// //         };
        
// //         onUpdateTeam(updatedTeam);
// //       }
// //     };
    
// //     checkLineupChanges();
// //   }, [team, onUpdateTeam]);

// //   const playersByRole = {
// //     'WK-Batsman': team?.players?.filter(p => normalizeRole(p.role) === 'WK-Batsman') || [],
// //     'Batsman': team?.players?.filter(p => normalizeRole(p.role) === 'Batsman') || [],
// //     'Batting Allrounder': team?.players?.filter(p => normalizeRole(p.role) === 'Batting Allrounder') || [],
// //     'Bowling Allrounder': team?.players?.filter(p => normalizeRole(p.role) === 'Bowling Allrounder') || [],
// //     'Bowler': team?.players?.filter(p => normalizeRole(p.role) === 'Bowler') || []
// //   };

// //   const team1Count = team?.players?.filter(p => p.teamName === captain.teamName).length || 0;
// //   const team2Count = 11 - team1Count;

// //   const generateShareText = () => {
// //     const captainTeamName = team?.team1ShortName || captain.teamName;
// //     const opponentName = team?.team2ShortName || opponentTeamName;
  
// //     let text = `Fantasy Team ${index + 1} - ${captainTeamName} vs ${opponentName}\n\n`;
// //     text += `Captain: ${captain.name} (${captain.teamShortName || captain.teamName})\n`;
// //     text += `Vice-Captain: ${viceCaptain.name} (${viceCaptain.teamShortName || viceCaptain.teamName})\n\n`;
  
// //     text += "Playing XI:\n";
// //     Object.entries(playersByRole).forEach(([role, players]) => {
// //       if (players.length > 0) {
// //         text += `${role}:\n`;
// //         players.forEach(player => {
// //           text += `• ${player.name} (${player.teamShortName || player.teamName}) ${player.wasSubstituted ? '(replaced)' : ''}\n`;
// //         });
// //       }
// //     });
  
// //     if (team?.substitutes && team.substitutes.length > 0) {
// //       text += "\nSubstitutes:\n";
// //       team.substitutes.forEach(sub => {
// //         text += `• ${sub.name} (${sub.teamShortName || sub.teamName})\n`;
// //       });
// //     }
  
// //     text += `\nTeam Balance: ${team1Count} ${captainTeamName} | ${team2Count} ${opponentName}\n`;
// //     text += `Risk Level: ${team?.riskLevel || 50}/100\n`;
  
// //     if (isNewTeam) {
// //       text += `\nNew team created for ${captainTeamName} vs ${opponentName} match`;
// //     }
  
// //     return text;
// //   };

// //   const shareToWhatsApp = () => {
// //     const text = generateShareText();
// //     const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
// //     window.open(url, '_blank');
// //     setShowShareOptions(false);
// //   };

// //   const shareToTelegram = () => {
// //     const text = generateShareText();
// //     const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`;
// //     window.open(url, '_blank');
// //     setShowShareOptions(false);
// //   };

// //   const shareToTwitter = () => {
// //     const text = generateShareText();
// //     const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text.substring(0, 250) + (text.length > 250 ? '...' : ''))}`;
// //     window.open(url, '_blank');
// //     setShowShareOptions(false);
// //   };

// //   const copyToClipboard = () => {
// //     const text = generateShareText();
// //     navigator.clipboard.writeText(text).then(() => {
// //       alert('Team copied to clipboard!');
// //       setShowShareOptions(false);
// //     });
// //   };

// //   const TeamContent = () => (
// //     <>
// //       {changes > 0 && (
// //         <div className="absolute -top-2 -right-2 bg-yellow-500 text-black font-bold rounded-full h-6 w-6 flex items-center justify-center">
// //           {changes}
// //         </div>
// //       )}
      
// //       {isNewTeam && (
// //         <div className="absolute -top-2 -left-2 bg-green-500 text-black font-bold rounded-full px-2 py-1 text-xs flex items-center justify-center">
// //           NEW
// //         </div>
// //       )}
      
// //       <div className="bg-gray-800 p-3 flex justify-between items-center">
// //         <h3 className="font-bold">{team?.name || `Team ${index + 1}`}</h3>
// //         <div className="flex items-center gap-2">
// //           {changes > 0 && (
// //             <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full">
// //               {changes} change{changes > 1 ? 's' : ''}
// //             </span>
// //           )}
// //           <div className="flex gap-2 items-center">
// //             <button
// //               onClick={(e) => {
// //                 e.stopPropagation();
// //                 setShowShareOptions(!showShareOptions);
// //               }}
// //               className="text-gray-300 hover:text-white p-1"
// //               aria-label="Share team"
// //             >
// //               <FiShare2 size={18} />
// //             </button>
// //             <button
// //               onClick={(e) => {
// //                 e.stopPropagation();
// //                 setIsFullScreen(!isFullScreen);
// //               }}
// //               className="text-gray-300 hover:text-white p-1"
// //               aria-label={isFullScreen ? "Close full screen" : "View full screen"}
// //             >
// //               {isFullScreen ? <FiX size={18} /> : <FiMaximize size={18} />}
// //             </button>
// //             <input
// //               type="checkbox"
// //               checked={isSelected}
// //               onChange={(e) => {
// //                 e.stopPropagation();
// //                 onToggleSelect();
// //               }}
// //               onClick={(e) => e.stopPropagation()}
// //               className="h-5 w-5 rounded text-blue-600 cursor-pointer"
// //               aria-label="Select team"
// //             />
// //           </div>
// //         </div>
// //       </div>
      
// //       {showShareOptions && (
// //         <div className="absolute right-12 top-12 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10 p-2">
// //           <button
// //             onClick={shareToWhatsApp}
// //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// //           >
// //             <FontAwesomeIcon icon={faWhatsapp} className="text-green-400" /> WhatsApp
// //           </button>
// //           <button
// //             onClick={shareToTelegram}
// //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// //           >
// //             <FontAwesomeIcon icon={faTelegram} className="text-blue-400" /> Telegram
// //           </button>
// //           <button
// //             onClick={shareToTwitter}
// //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// //           >
// //             <FontAwesomeIcon icon={faTwitter} className="text-blue-400" /> Twitter
// //           </button>
// //           <button
// //             onClick={copyToClipboard}
// //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left"
// //           >
// //             <FiShare2 /> Copy Text
// //           </button>
// //         </div>
// //       )}
      
// //       <div className="bg-gray-700 p-4">
// //         {playerChanges.length > 0 && (
// //           <div className="mb-3 bg-yellow-900 p-2 rounded text-sm">
// //             <div className="font-medium mb-1">Team Changes:</div>
// //             {playerChanges.map((change, i) => (
// //               <div key={i} className="flex justify-between">
// //                 <span className="text-red-300 line-through">{change.out}</span>
// //                 <span>→</span>
// //                 <span className="text-green-300">{change.in}</span>
// //                 <span className="text-gray-400 text-xs">{change.role}</span>
// //               </div>
// //             ))}
// //           </div>
// //         )}
        
// //         <div className="flex gap-4 mb-3">
// //           <div className="flex-1">
// //             <div className="flex items-center gap-2 w-full">
// //               <img
// //                 src={captain.imgURL || "/fallback.png"}
// //                 alt={captain.name}
// //                 className="w-10 h-10 rounded-full"
// //                 onError={(e) => {
// //                   const target = e.target as HTMLImageElement;
// //                   target.src = "/fallback.png";
// //                 }}
// //               />
// //               <div className="flex-1">
// //                 <div className="flex justify-between items-center">
// //                   <p className={`font-medium ${
// //                     captain.wasSubstituted ? 'text-yellow-400' :
// //                     captain.substitute ? 'text-red-400' : 'text-white'
// //                     }`}>
// //                     <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-2">C</span>
// //                     {captain.name}
// //                   </p>
// //                 </div>
// //                 <p className="text-xs text-gray-400">{captain.teamShortName || captain.teamName}</p>
// //               </div>
// //             </div>
// //           </div>
          
// //           <div className="flex-1">
// //             <div className="flex items-center gap-2 w-full">
// //               <img
// //                 src={viceCaptain.imgURL || "/fallback.png"}
// //                 alt={viceCaptain.name}
// //                 className="w-10 h-10 rounded-full"
// //                 onError={(e) => {
// //                   const target = e.target as HTMLImageElement;
// //                   target.src = "/fallback.png";
// //                 }}
// //               />
// //               <div className="flex-1">
// //                 <div className="flex justify-between items-center">
// //                   <p className={`font-medium ${
// //                     viceCaptain.wasSubstituted ? 'text-yellow-400' :
// //                     viceCaptain.substitute ? 'text-red-400' : 'text-white'
// //                   }`}>
// //                     <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-2">VC</span>
// //                     {viceCaptain.name}
// //                   </p>
// //                 </div>
// //                 <p className="text-xs text-gray-400">{viceCaptain.teamShortName || viceCaptain.teamName}</p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
        
// //         <div className="mb-3 bg-gray-800 p-2 rounded">
// //           <div className="flex justify-between text-sm mb-1">
// //             <span>{team?.team1ShortName || captain.teamName}: {team1Count}</span>
// //             <span>{team?.team2ShortName || opponentTeamName}: {team2Count}</span>
// //           </div>
// //           <div className="flex justify-between items-center mt-1">
// //             <div className="flex flex-wrap gap-1 text-xs">
// //               <span className="bg-gray-600 px-2 py-1 rounded">WK: {playersByRole['WK-Batsman'].length}</span>
// //               <span className="bg-gray-600 px-2 py-1 rounded">Bats: {playersByRole['Batsman'].length}</span>
// //               <span className="bg-gray-600 px-2 py-1 rounded">AR: {
// //                 playersByRole['Batting Allrounder'].length + playersByRole['Bowling Allrounder'].length
// //               }</span>
// //               <span className="bg-gray-600 px-2 py-1 rounded">Bowlers: {playersByRole['Bowler'].length}</span>
// //             </div>
// //             <div className="text-xs font-medium px-2 py-1 rounded" style={{
// //               backgroundColor: getRiskColor(team?.riskLevel),
// //               color: 'white'
// //             }}>
// //               Risk: {team?.riskLevel || 50}%
// //             </div>
// //           </div>
// //         </div>
        
// //         <div className={`space-y-2 ${isFullScreen ? '' : 'max-h-60'} overflow-y-auto`}>
// //           {playersByRole['WK-Batsman'].length > 0 && (
// //             <div className="text-xs text-gray-400 mt-2">Wicket Keepers</div>
// //           )}
// //           {playersByRole['WK-Batsman'].map((player, i) => (
// //             <PlayerRow
// //               key={`wk-${i}`}
// //               player={player}
// //               isSubstitute={!!player.substitute}
// //               wasSubstituted={player.wasSubstituted}
// //             />
// //           ))}
          
// //           {playersByRole['Batsman'].length > 0 && (
// //             <div className="text-xs text-gray-400 mt-2">Batsmen</div>
// //           )}
// //           {playersByRole['Batsman'].map((player, i) => (
// //             <PlayerRow
// //               key={`bat-${i}`}
// //               player={player}
// //               isSubstitute={!!player.substitute}
// //               wasSubstituted={player.wasSubstituted}
// //             />
// //           ))}
          
// //           {playersByRole['Batting Allrounder'].length > 0 && (
// //             <div className="text-xs text-gray-400 mt-2">Batting Allrounders</div>
// //           )}
// //           {playersByRole['Batting Allrounder'].map((player, i) => (
// //             <PlayerRow
// //               key={`bar-${i}`}
// //               player={player}
// //               isSubstitute={!!player.substitute}
// //               wasSubstituted={player.wasSubstituted}
// //             />
// //           ))}
          
// //           {playersByRole['Bowling Allrounder'].length > 0 && (
// //             <div className="text-xs text-gray-400 mt-2">Bowling Allrounders</div>
// //           )}
// //           {playersByRole['Bowling Allrounder'].map((player, i) => (
// //             <PlayerRow
// //               key={`bowlar-${i}`}
// //               player={player}
// //               isSubstitute={!!player.substitute}
// //               wasSubstituted={player.wasSubstituted}
// //             />
// //           ))}
          
// //           {playersByRole['Bowler'].length > 0 && (
// //             <div className="text-xs text-gray-400 mt-2">Bowlers</div>
// //           )}
// //           {playersByRole['Bowler'].map((player, i) => (
// //             <PlayerRow
// //               key={`bowl-${i}`}
// //               player={player}
// //               isSubstitute={!!player.substitute}
// //               wasSubstituted={player.wasSubstituted}
// //             />
// //           ))}
          
// //           {team?.substitutes && team.substitutes.length > 0 && (
// //             <>
// //               <div className="text-xs text-gray-400 mt-4">Substitutes (→)</div>
// //               {team.substitutes.map((sub, i) => (
// //                 <PlayerRow
// //                   key={`sub-${i}`}
// //                   player={sub}
// //                   isSubstitute={false}
// //                   isSubstituteList
// //                 />
// //               ))}
// //             </>
// //           )}
// //         </div>
// //       </div>
// //     </>
// //   );

// //   const FullScreenView = () => {
// //     const roleGroups = [
// //       { title: "WICKET-KEEPERS", players: playersByRole['WK-Batsman'] },
// //       { title: "BATTERS", players: playersByRole['Batsman'] },
// //       {
// //         title: "ALL-ROUNDERS",
// //         players: [...playersByRole['Batting Allrounder'], ...playersByRole['Bowling Allrounder']]
// //       },
// //       { title: "BOWLERS", players: playersByRole['Bowler'] }
// //     ];
  
// //     return (
// //       <div className="fixed inset-0 bg-gray-900 z-50 p-1 overflow-y-auto">
// //         <div className="flex justify-between items-center mb-1 sticky top-0 bg-gray-900 py-1">
// //           <h2 className="text-base font-bold text-white">{team?.name || `Team ${index + 1}`}</h2>
// //           <button
// //             onClick={() => setIsFullScreen(false)}
// //             className="text-white p-0"
// //             aria-label="Close full screen view"
// //           >
// //             <FiX size={18} />
// //           </button>
// //         </div>
  
// //         <div className="space-y-3 px-1">
// //           {roleGroups.map((group, i) => (
// //             group.players.length > 0 && (
// //               <div key={`role-${i}`} className="mb-1">
// //                 <div className="text-xs font-medium mb-1 text-gray-300 text-center">
// //                   {group.title}
// //                 </div>
// //                 <div className={`flex ${group.players.length === 1 ? 'justify-center' : 'justify-between'} flex-wrap gap-y-2`}>
// //                   {group.players.map((player) => (
// //                     <div key={`player-${player.id}`} className="flex flex-col items-center w-[32%]">
// //                       <div className="relative">
// //                         <img
// //                           src={player.imgURL || "/fallback.png"}
// //                           alt={player.name}
// //                           className="w-11 h-11 rounded-full object-cover border border-gray-600"
// //                           onError={(e) => {
// //                             const target = e.target as HTMLImageElement;
// //                             target.src = "/fallback.png";
// //                           }}
// //                         />
// //                         {player.id === captain.id && (
// //                           <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center border border-white">
// //                             C
// //                           </span>
// //                         )}
// //                         {player.id === viceCaptain.id && (
// //                           <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center border border-white">
// //                             VC
// //                           </span>
// //                         )}
// //                       </div>
// //                       <div className="text-[11px] font-medium text-white text-center mt-0.5 truncate w-full">
// //                         {player.name?.split(" ")[0].charAt(0).toUpperCase() +
// //                           player.name?.split(" ")[0].slice(1).toLowerCase()}
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )
// //           ))}
// //         </div>
  
// //         <div className="mt-3 text-center text-[11px] text-gray-400 sticky bottom-0 bg-gray-900 py-1">
// //           {team?.team1ShortName || captain.teamName} vs {team?.team2ShortName || opponentTeamName}
// //         </div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <>
// //       {!isFullScreen && (
// //         <div
// //           className={`border-2 ${isSelected ? 'border-blue-500' : 'border-gray-700'} rounded-none overflow-hidden relative w-full p-0 md:px-4 md:py-2`}
// //           onClick={() => onToggleSelect()}
// //         >
// //           <TeamContent />
// //         </div>
// //       )}
      
// //       {isFullScreen && <FullScreenView />}
// //     </>
// //   );
// // }























// //TeamCard.tsx

// "use client";
// import { useEffect, useState } from "react";
// import { FiShare2, FiX, FiMaximize } from 'react-icons/fi';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faWhatsapp, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';
// import { PlayerDetail, GeneratedTeam } from "@/types/match";

// interface TeamCardProps {
//   team: GeneratedTeam;
//   index: number;
//   isSelected: boolean;
//   onToggleSelect: () => void;
//   onUpdateTeam: (updatedTeam: GeneratedTeam) => void;
//   isNewTeam?: boolean;
// }

// const getLeagueType = (riskLevel?: number) => {
//   if (!riskLevel) return { type: 'H2H', color: '#10B981' };
//   return riskLevel < 30
//     ? { type: 'H2H', color: '#10B981' }
//     : { type: 'MEGA', color: '#8B5CF6' };
// };

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

// const PlayerRow = ({
//   player,
//   isSubstitute,
//   wasSubstituted,
//   isSubstituteList = false,
//   team1ShortName
// }: {
//   player: PlayerDetail;
//   isSubstitute: boolean;
//   wasSubstituted?: boolean;
//   isSubstituteList?: boolean;
//   team1ShortName?: string;
// }) => {
//   const isTeam1 = player.teamShortName === team1ShortName;
//   const bgColor = isTeam1 ? 'bg-black text-white' : 'bg-white text-black';
  
//   return (
//     <div className={`flex items-center justify-between text-sm p-2 rounded border ${
//       wasSubstituted ? 'bg-yellow-100 border-yellow-300' :
//       isSubstitute ? 'bg-red-100 border-red-300' :
//       isSubstituteList ? 'bg-gray-100 border-gray-300' : `${bgColor} border-gray-300`
//     }`}>
//       <div className="flex items-center gap-2 w-full">
//         {isSubstituteList && <span className="text-yellow-500">→</span>}
//         {wasSubstituted && <span className="text-green-500">↑</span>}
//         <img
//           src={player.imgURL || "/fallback.png"}
//           alt={player.name}
//           className="w-8 h-8 rounded-full"
//           onError={(e) => (e.currentTarget as HTMLImageElement).src = "/fallback.png"}
//         />
//         <div className="flex-1">
//           <div className="flex justify-between items-center">
//             <span className={isSubstitute ? 'line-through' : ''}>
//               {player.name}
//               {player.keeper && ' (WK)'}
//               {wasSubstituted && player.replacedPlayer && ` (replaced ${player.replacedPlayer})`}
//             </span>
//           </div>
//           <p className={`text-xs ${isTeam1 ? 'text-gray-300' : 'text-gray-600'}`}>
//             {player.teamShortName || player.teamName}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function TeamCard({
//   team,
//   index,
//   isSelected,
//   onToggleSelect,
//   onUpdateTeam,
//   isNewTeam = false
// }: TeamCardProps) {
//   const [changes, setChanges] = useState<number>(team?.changes || 0);
//   const [playerChanges, setPlayerChanges] = useState<Array<{
//     out: string;
//     in: string;
//     role: string;
//   }>>([]);
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [showShareOptions, setShowShareOptions] = useState(false);
//   const leagueType = getLeagueType(team?.riskLevel);

//   const captain = team?.captain || {
//     id: 0,
//     name: 'Unknown Captain',
//     teamName: 'Unknown Team',
//     role: 'Batsman',
//     fullName: '',
//     nickName: '',
//     captain: false,
//     keeper: false,
//     isOverseas: false
//   } as PlayerDetail;

//   const viceCaptain = team?.viceCaptain || {
//     id: 0,
//     name: 'Unknown Vice-Captain',
//     teamName: 'Unknown Team',
//     role: 'Batsman',
//     fullName: '',
//     nickName: '',
//     captain: false,
//     keeper: false,
//     isOverseas: false
//   } as PlayerDetail;

//   const opponentTeamName = team?.players?.find(
//     p => p.teamName !== captain.teamName
//   )?.teamName || 'Opponent';

//   useEffect(() => {
//     const checkLineupChanges = () => {
//       if (!team?.players || !team?.substitutes) return;
      
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
//             } as PlayerDetail;
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
//     'WK-Batsman': team?.players?.filter(p => normalizeRole(p.role) === 'WK-Batsman') || [],
//     'Batsman': team?.players?.filter(p => normalizeRole(p.role) === 'Batsman') || [],
//     'Batting Allrounder': team?.players?.filter(p => normalizeRole(p.role) === 'Batting Allrounder') || [],
//     'Bowling Allrounder': team?.players?.filter(p => normalizeRole(p.role) === 'Bowling Allrounder') || [],
//     'Bowler': team?.players?.filter(p => normalizeRole(p.role) === 'Bowler') || []
//   };

//   const team1Count = team?.players?.filter(p => p.teamName === captain.teamName).length || 0;
//   const team2Count = 11 - team1Count;

//   const generateShareText = () => {
//     const captainTeamName = team?.team1ShortName || captain.teamName;
//     const opponentName = team?.team2ShortName || opponentTeamName;
  
//     let text = `Fantasy Team ${index + 1} - ${captainTeamName} vs ${opponentName}\n\n`;
//     text += `Captain: ${captain.name} (${captain.teamShortName || captain.teamName})\n`;
//     text += `Vice-Captain: ${viceCaptain.name} (${viceCaptain.teamShortName || viceCaptain.teamName})\n\n`;
  
//     text += "Playing XI:\n";
//     Object.entries(playersByRole).forEach(([role, players]) => {
//       if (players.length > 0) {
//         text += `${role}:\n`;
//         players.forEach(player => {
//           text += `• ${player.name} (${player.teamShortName || player.teamName}) ${player.wasSubstituted ? '(replaced)' : ''}\n`;
//         });
//       }
//     });
  
//     if (team?.substitutes && team.substitutes.length > 0) {
//       text += "\nSubstitutes:\n";
//       team.substitutes.forEach(sub => {
//         text += `• ${sub.name} (${sub.teamShortName || sub.teamName})\n`;
//       });
//     }
  
//     text += `\nTeam Balance: ${team1Count} ${captainTeamName} | ${team2Count} ${opponentName}\n`;
//     text += `League Type: ${leagueType.type}\n`;
  
//     if (isNewTeam) {
//       text += `\nNew team created for ${captainTeamName} vs ${opponentName} match`;
//     }
  
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
      
//       {isNewTeam && (
//         <div className="absolute -top-2 -left-2 bg-green-500 text-black font-bold rounded-full px-2 py-1 text-xs flex items-center justify-center">
//           NEW
//         </div>
//       )}
      
//       <div className={`p-3 flex justify-between items-center ${leagueType.color === '#10B981' ? 'bg-green-500' : 'bg-purple-500'}`}>
//         <h3 className="font-bold text-white">{team?.name || `Team ${index + 1}`}</h3>
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
//               className="text-white hover:text-gray-200 p-1"
//               aria-label="Share team"
//             >
//               <FiShare2 size={18} />
//             </button>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setIsFullScreen(!isFullScreen);
//               }}
//               className="text-white hover:text-gray-200 p-1"
//               aria-label={isFullScreen ? "Close full screen" : "View full screen"}
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
//               aria-label="Select team"
//             />
//           </div>
//         </div>
//       </div>
      
//       {showShareOptions && (
//         <div className="absolute right-12 top-12 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10 p-2">
//           <button
//             onClick={shareToWhatsApp}
//             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left text-white"
//           >
//             <FontAwesomeIcon icon={faWhatsapp} className="text-green-400" /> WhatsApp
//           </button>
//           <button
//             onClick={shareToTelegram}
//             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left text-white"
//           >
//             <FontAwesomeIcon icon={faTelegram} className="text-blue-400" /> Telegram
//           </button>
//           <button
//             onClick={shareToTwitter}
//             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left text-white"
//           >
//             <FontAwesomeIcon icon={faTwitter} className="text-blue-400" /> Twitter
//           </button>
//           <button
//             onClick={copyToClipboard}
//             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left text-white"
//           >
//             <FiShare2 /> Copy Text
//           </button>
//         </div>
//       )}
      
//       <div className="bg-gray-100 p-4">
//         {playerChanges.length > 0 && (
//           <div className="mb-3 bg-yellow-100 p-2 rounded text-sm border border-yellow-300">
//             <div className="font-medium mb-1 text-gray-800">Team Changes:</div>
//             {playerChanges.map((change, i) => (
//               <div key={i} className="flex justify-between text-gray-700">
//                 <span className="text-red-500 line-through">{change.out}</span>
//                 <span>→</span>
//                 <span className="text-green-600">{change.in}</span>
//                 <span className="text-gray-500 text-xs">{change.role}</span>
//               </div>
//             ))}
//           </div>
//         )}
        
//         <div className="flex gap-4 mb-3">
//           <div className="flex-1">
//             <div className="flex items-center gap-2 w-full">
//               <img
//                 src={captain.imgURL || "/fallback.png"}
//                 alt={captain.name}
//                 className="w-10 h-10 rounded-full"
//                 onError={(e) => {
//                   const target = e.target as HTMLImageElement;
//                   target.src = "/fallback.png";
//                 }}
//               />
//               <div className="flex-1">
//                 <div className="flex justify-between items-center">
//                   <p className={`font-medium ${
//                     captain.wasSubstituted ? 'text-yellow-600' :
//                     captain.substitute ? 'text-red-500' : 'text-gray-800'
//                     }`}>
//                     <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-2">C</span>
//                     {captain.name}
//                   </p>
//                 </div>
//                 <p className="text-xs text-gray-600">{captain.teamShortName || captain.teamName}</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="flex-1">
//             <div className="flex items-center gap-2 w-full">
//               <img
//                 src={viceCaptain.imgURL || "/fallback.png"}
//                 alt={viceCaptain.name}
//                 className="w-10 h-10 rounded-full"
//                 onError={(e) => {
//                   const target = e.target as HTMLImageElement;
//                   target.src = "/fallback.png";
//                 }}
//               />
//               <div className="flex-1">
//                 <div className="flex justify-between items-center">
//                   <p className={`font-medium ${
//                     viceCaptain.wasSubstituted ? 'text-yellow-600' :
//                     viceCaptain.substitute ? 'text-red-500' : 'text-gray-800'
//                   }`}>
//                     <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-2">VC</span>
//                     {viceCaptain.name}
//                   </p>
//                 </div>
//                 <p className="text-xs text-gray-600">{viceCaptain.teamShortName || viceCaptain.teamName}</p>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div className="mb-3 bg-white p-2 rounded border border-gray-200">
//           <div className="flex justify-between text-sm mb-1 text-gray-800">
//             <span>{team?.team1ShortName || captain.teamName}: {team1Count}</span> // this lines deepseak bro
//             <span>{team?.team2ShortName || opponentTeamName}: {team2Count}</span> // this lines  deepseak bro
//           </div>
//           <div className="flex justify-between items-center mt-1">
//             <div className="flex flex-wrap gap-1 text-xs">
//               <span className="bg-gray-200 px-2 py-1 rounded text-gray-800">WK: {playersByRole['WK-Batsman'].length}</span>
//               <span className="bg-gray-200 px-2 py-1 rounded text-gray-800">Bats: {playersByRole['Batsman'].length}</span>
//               <span className="bg-gray-200 px-2 py-1 rounded text-gray-800">AR: {
//                 playersByRole['Batting Allrounder'].length + playersByRole['Bowling Allrounder'].length
//               }</span>
//               <span className="bg-gray-200 px-2 py-1 rounded text-gray-800">Bowlers: {playersByRole['Bowler'].length}</span>
//             </div>
//             <div className="text-xs font-medium px-2 py-1 rounded text-white" style={{
//               backgroundColor: leagueType.color
//             }}>
//               {leagueType.type}
//             </div>
//           </div>
//         </div>
        
//         <div className={`space-y-2 ${isFullScreen ? '' : 'max-h-60'} overflow-y-auto`}>
//           {playersByRole['WK-Batsman'].length > 0 && (
//             <div className="text-xs text-gray-600 mt-2">Wicket Keepers</div>
//           )}
//           {playersByRole['WK-Batsman'].map((player, i) => (
//             <PlayerRow
//               key={`wk-${i}`}
//               player={player}
//               isSubstitute={!!player.substitute}
//               wasSubstituted={player.wasSubstituted}
//               team1ShortName={team?.team1ShortName}
//             />
//           ))}
          
//           {playersByRole['Batsman'].length > 0 && (
//             <div className="text-xs text-gray-600 mt-2">Batsmen</div>
//           )}
//           {playersByRole['Batsman'].map((player, i) => (
//             <PlayerRow
//               key={`bat-${i}`}
//               player={player}
//               isSubstitute={!!player.substitute}
//               wasSubstituted={player.wasSubstituted}
//               team1ShortName={team?.team1ShortName}
//             />
//           ))}
          
//           {playersByRole['Batting Allrounder'].length > 0 && (
//             <div className="text-xs text-gray-600 mt-2">Batting Allrounders</div>
//           )}
//           {playersByRole['Batting Allrounder'].map((player, i) => (
//             <PlayerRow
//               key={`bar-${i}`}
//               player={player}
//               isSubstitute={!!player.substitute}
//               wasSubstituted={player.wasSubstituted}
//               team1ShortName={team?.team1ShortName}
//             />
//           ))}
          
//           {playersByRole['Bowling Allrounder'].length > 0 && (
//             <div className="text-xs text-gray-600 mt-2">Bowling Allrounders</div>
//           )}
//           {playersByRole['Bowling Allrounder'].map((player, i) => (
//             <PlayerRow
//               key={`bowlar-${i}`}
//               player={player}
//               isSubstitute={!!player.substitute}
//               wasSubstituted={player.wasSubstituted}
//               team1ShortName={team?.team1ShortName}
//             />
//           ))}
          
//           {playersByRole['Bowler'].length > 0 && (
//             <div className="text-xs text-gray-600 mt-2">Bowlers</div>
//           )}
//           {playersByRole['Bowler'].map((player, i) => (
//             <PlayerRow
//               key={`bowl-${i}`}
//               player={player}
//               isSubstitute={!!player.substitute}
//               wasSubstituted={player.wasSubstituted}
//               team1ShortName={team?.team1ShortName}
//             />
//           ))}
          
//           {team?.substitutes && team.substitutes.length > 0 && (
//             <>
//               <div className="text-xs text-gray-600 mt-4">Substitutes (→)</div>
//               {team.substitutes.map((sub, i) => (
//                 <PlayerRow
//                   key={`sub-${i}`}
//                   player={sub}
//                   isSubstitute={false}
//                   isSubstituteList
//                   team1ShortName={team?.team1ShortName}
//                 />
//               ))}
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );

//   const FullScreenView = () => {
//     const roleGroups = [
//       { title: "WICKET-KEEPERS", players: playersByRole['WK-Batsman'] },
//       { title: "BATTERS", players: playersByRole['Batsman'] },
//       {
//         title: "ALL-ROUNDERS",
//         players: [...playersByRole['Batting Allrounder'], ...playersByRole['Bowling Allrounder']]
//       },
//       { title: "BOWLERS", players: playersByRole['Bowler'] }
//     ];
  
//     const formatPlayerName = (fullName: string) => {
//       const nameParts = fullName.split(" ");
//       if (nameParts.length >= 2) {
//         return `${nameParts[0].charAt(0).toUpperCase()}. ${nameParts.slice(1).join(" ")}`;
//       }
//       return nameParts[0];
//     };
  
//     return (
//       <div className="fixed inset-0 z-50 p-1 overflow-y-auto bg-[#0c9c2e]">
//         <div className="flex justify-between items-center mb-1 sticky top-0 bg-[#0c9c2e] py-1 px-2 border-b border-green-100">
//           <h2 className="text-base font-bold text-gray-800">{team?.name || `Team ${index + 1}`}</h2>
//           <button
//             onClick={() => setIsFullScreen(false)}
//             className="text-gray-800 p-0"
//             aria-label="Close full screen view"
//           >
//             <FiX size={18} />
//           </button>
//         </div>
  
//         <div className="space-y-3 px-2">
//           <div className="flex justify-between my-2">
//             <div className="text-sm font-medium px-3 py-1 rounded-full bg-black text-white">
//               {team?.team1ShortName || captain.teamName}
//             </div>
//             <div className="text-sm font-medium px-3 py-1 rounded-full bg-white text-black border border-gray-300">
//               {team?.team2ShortName || opponentTeamName}
//             </div>
//           </div>
  
//           {roleGroups.map((group, i) => (
//             group.players.length > 0 && (
//               <div key={`role-${i}`} className="mb-1">
//                 <div className="text-xs font-medium mb-1 text-gray-100 text-center">
//                   {group.title}
//                 </div>
//                 <div className={`flex ${group.players.length === 1 ? 'justify-center' : 'justify-between'} flex-wrap gap-y-2`}>
//                   {group.players.map((player) => {
//                     const isTeam1 = player.teamShortName?.toUpperCase().trim() === team?.team1ShortName?.toUpperCase().trim();
//                     const nameDisplay = formatPlayerName(player.name);
  
//                     const bgStyle = isTeam1 ? 'bg-black text-white' : 'bg-white text-black border border-gray-300';
  
//                     return (
//                       <div key={`player-${player.id}`} className="flex flex-col items-center w-[32%]">
//                         <div className="relative">
//                           <div className={`w-11 h-11 rounded-full flex items-center justify-center ${bgStyle}`}>
//                             <img
//                               src={player.imgURL || "/fallback.png"}
//                               alt={player.name}
//                               className="w-10 h-10 rounded-full object-cover"
//                               onError={(e) => {
//                                 const target = e.target as HTMLImageElement;
//                                 target.src = "/fallback.png";
//                               }}
//                             />
//                           </div>
//                           {player.id === captain.id && (
//                             <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center border border-white">
//                               C
//                             </span>
//                           )}
//                           {player.id === viceCaptain.id && (
//                             <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center border border-white">
//                               VC
//                             </span>
//                           )}
//                         </div>
//                         {/* Removed background color behind player name */}
//                         <div className="text-[11px] font-medium mt-0.5 truncate px-2 py-0.5 rounded-full text-center text-white">
//                           {nameDisplay}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )
//           ))}
//         </div>
  
//         <div className="mt-3 text-center text-[11px] text-white sticky bottom-0 py-2 border-t border-green-200 bg-transparent">
//           {team?.team1ShortName || captain.teamName} vs {team?.team2ShortName || opponentTeamName}
//         </div>
//       </div>
//     );
//   };
  
  
  
//   return (
//     <>
//       {!isFullScreen && (
//         <div
//           className={`border-2 ${isSelected ? 'border-blue-500' : 'border-gray-300'} rounded-lg overflow-hidden relative w-full p-0 md:px-4 md:py-2 bg-white`}
//           onClick={() => onToggleSelect()}
//         >
//           <TeamContent />
//         </div>
//       )}
      
//       {isFullScreen && <FullScreenView />}
//     </>
//   );
// }













// // "use client";
// // import { useEffect, useState } from "react";
// // import { FiShare2, FiX, FiMaximize } from 'react-icons/fi';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faWhatsapp, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';
// // import { PlayerDetail, GeneratedTeam } from "@/types/match";
// // import { toast } from 'react-hot-toast';

// // interface TeamCardProps {
// //   team: GeneratedTeam;
// //   index: number;
// //   isSelected: boolean;
// //   onToggleSelect: () => void;
// //   onUpdateTeam: (updatedTeam: GeneratedTeam) => void;
// //   isNewTeam?: boolean;
// // }

// // const getLeagueType = (riskLevel?: number) => {
// //   if (!riskLevel) return { type: 'H2H', color: '#10B981' };
// //   return riskLevel < 30 
// //     ? { type: 'H2H', color: '#10B981' } 
// //     : { type: 'MEGA', color: '#8B5CF6' };
// // };

// // const normalizeRole = (role: string): string => {
// //   if (!role) return 'Bowler';
// //   const lowerRole = role.toLowerCase().trim();
// //   if (lowerRole.includes('keep') || lowerRole.includes('wk')) return 'WK-Batsman';
// //   if (lowerRole.includes('bat') && lowerRole.includes('all')) return 'Batting Allrounder';
// //   if (lowerRole.includes('bowl') && lowerRole.includes('all')) return 'Bowling Allrounder';
// //   if (lowerRole.includes('bat')) return 'Batsman';
// //   if (lowerRole.includes('bowl')) return 'Bowler';
// //   if (lowerRole.includes('all')) return 'Bowling Allrounder';
// //   return 'Bowler';
// // };

// // const PlayerRow = ({ 
// //   player, 
// //   isSubstitute,
// //   wasSubstituted,
// //   isSubstituteList = false,
// //   team1ShortName
// // }: {
// //   player: PlayerDetail;
// //   isSubstitute: boolean;
// //   wasSubstituted?: boolean;
// //   isSubstituteList?: boolean;
// //   team1ShortName?: string;
// // }) => {
// //   const isTeam1 = player.teamShortName?.toUpperCase() === team1ShortName?.toUpperCase();
// //   const bgColor = isSubstituteList ? 'bg-gray-100' : (isTeam1 ? 'bg-black text-white' : 'bg-white text-black');
  
// //   return (
// //     <div className={`flex items-center justify-between text-sm p-2 rounded border ${
// //       wasSubstituted ? 'bg-yellow-100 border-yellow-300' :
// //       isSubstitute ? 'bg-red-100 border-red-300' : 
// //       isSubstituteList ? 'bg-gray-100 border-gray-300' : `${bgColor} border-gray-300`
// //     } ${isSubstituteList ? 'text-black' : ''}`}>
// //       <div className="flex items-center gap-2 w-full">
// //         {isSubstituteList && <span className="text-yellow-500">→</span>}
// //         {wasSubstituted && <span className="text-green-500">↑</span>}
// //         <img 
// //           src={player.imgURL || "/fallback.png"} 
// //           alt={player.name} 
// //           className="w-8 h-8 rounded-full"
// //           onError={(e) => (e.currentTarget as HTMLImageElement).src = "/fallback.png"}
// //         />
// //         <div className="flex-1">
// //           <div className="flex justify-between items-center">
// //             <span className={isSubstitute ? 'line-through' : ''}>
// //               {player.name}
// //               {player.keeper && ' (WK)'}
// //               {wasSubstituted && player.replacedPlayer && ` (replaced ${player.replacedPlayer})`}
// //             </span>
// //           </div>
// //           <p className={`text-xs ${isTeam1 ? 'text-gray-300' : 'text-gray-600'}`}>
// //             {player.teamShortName || player.teamName}
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default function TeamCard({ 
// //   team, 
// //   index, 
// //   isSelected, 
// //   onToggleSelect,
// //   onUpdateTeam,
// //   isNewTeam = false
// // }: TeamCardProps) {
// //   const [changes, setChanges] = useState<number>(team?.changes || 0);
// //   const [playerChanges, setPlayerChanges] = useState<Array<{
// //     out: string;
// //     in: string;
// //     role: string;
// //   }>>([]);
// //   const [isFullScreen, setIsFullScreen] = useState(false);
// //   const [showShareOptions, setShowShareOptions] = useState(false);
// //   const leagueType = getLeagueType(team?.riskLevel);

// //   const captain = team?.captain || { 
// //     id: 0, 
// //     name: 'Unknown Captain', 
// //     teamName: 'Unknown Team', 
// //     role: 'Batsman',
// //     fullName: '',
// //     nickName: '',
// //     captain: false,
// //     keeper: false,
// //     isOverseas: false,
// //     teamShortName: '',
// //     imgURL: '/fallback.png'
// //   } as PlayerDetail;

// //   const viceCaptain = team?.viceCaptain || { 
// //     id: 0, 
// //     name: 'Unknown Vice-Captain', 
// //     teamName: 'Unknown Team', 
// //     role: 'Batsman',
// //     fullName: '',
// //     nickName: '',
// //     captain: false,
// //     keeper: false,
// //     isOverseas: false,
// //     teamShortName: '',
// //     imgURL: '/fallback.png'
// //   } as PlayerDetail;

// //   const opponentTeamName = team?.players?.find(
// //     p => p.teamShortName?.toUpperCase() !== captain.teamShortName?.toUpperCase()
// //   )?.teamName || 'Opponent';

// //   const team1Count = team?.players?.filter(p => 
// //     p.teamShortName?.toUpperCase() === team?.team1ShortName?.toUpperCase()
// //   ).length || 0;
// //   const team2Count = 11 - team1Count;

// //   useEffect(() => {
// //     const checkLineupChanges = () => {
// //       if (!team?.players || !team?.substitutes) return;
      
// //       const newPlayerChanges: Array<{
// //         out: string;
// //         in: string;
// //         role: string;
// //       }> = [];
      
// //       let changeCount = 0;
      
// //       const updatedPlayers = team.players.map(player => {
// //         if (player.substitute) {
// //           changeCount++;
      
// //           const replacement = team.substitutes?.length
// //             ? team.substitutes
// //                 .filter(sub => normalizeRole(sub.role) === normalizeRole(player.role))
// //                 .sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0))[0]
// //             : null;
      
// //           if (replacement) {
// //             newPlayerChanges.push({
// //               out: player.name,
// //               in: replacement.name,
// //               role: player.role
// //             });
      
// //             return {
// //               ...replacement,
// //               wasSubstituted: true,
// //               replacedPlayer: player.name
// //             } as PlayerDetail;
// //           }
// //         }
// //         return player;
// //       });
      
// //       if (changeCount > 0) {
// //         setChanges(changeCount);
// //         setPlayerChanges(newPlayerChanges);
        
// //         const updatedTeam = {
// //           ...team,
// //           players: updatedPlayers,
// //           changes: changeCount
// //         };
        
// //         onUpdateTeam(updatedTeam);
// //       }
// //     };
    
// //     checkLineupChanges();
// //   }, [team, onUpdateTeam]);

// //   const playersByRole = {
// //     'WK-Batsman': team?.players?.filter(p => normalizeRole(p.role) === 'WK-Batsman') || [],
// //     'Batsman': team?.players?.filter(p => normalizeRole(p.role) === 'Batsman') || [],
// //     'Batting Allrounder': team?.players?.filter(p => normalizeRole(p.role) === 'Batting Allrounder') || [],
// //     'Bowling Allrounder': team?.players?.filter(p => normalizeRole(p.role) === 'Bowling Allrounder') || [],
// //     'Bowler': team?.players?.filter(p => normalizeRole(p.role) === 'Bowler') || []
// //   };

// //   const generateShareText = () => {
// //     const captainTeamName = team?.team1ShortName || captain.teamName;
// //     const opponentName = team?.team2ShortName || opponentTeamName;
  
// //     let text = `Fantasy Team ${index + 1} - ${captainTeamName} vs ${opponentName}\n\n`;
// //     text += `Captain: ${captain.name} (${captain.teamShortName || captain.teamName})\n`;
// //     text += `Vice-Captain: ${viceCaptain.name} (${viceCaptain.teamShortName || viceCaptain.teamName})\n\n`;
  
// //     text += "Playing XI:\n";
// //     Object.entries(playersByRole).forEach(([role, players]) => {
// //       if (players.length > 0) {
// //         text += `${role}:\n`;
// //         players.forEach(player => {
// //           text += `• ${player.name} (${player.teamShortName || player.teamName}) ${player.wasSubstituted ? '(replaced)' : ''}\n`;
// //         });
// //       }
// //     });
  
// //     if (team?.substitutes && team.substitutes.length > 0) {
// //       text += "\nSubstitutes:\n";
// //       team.substitutes.forEach(sub => {
// //         text += `• ${sub.name} (${sub.teamShortName || sub.teamName})\n`;
// //       });
// //     }
  
// //     text += `\nTeam Balance: ${team1Count} ${captainTeamName} | ${team2Count} ${opponentName}\n`;
// //     text += `League Type: ${leagueType.type}\n`;
  
// //     if (isNewTeam) {
// //       text += `\nNew team created for ${captainTeamName} vs ${opponentName} match`;
// //     }
  
// //     return text;
// //   };

// //   const shareToWhatsApp = () => {
// //     const text = generateShareText();
// //     const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
// //     window.open(url, '_blank');
// //     setShowShareOptions(false);
// //   };

// //   const shareToTelegram = () => {
// //     const text = generateShareText();
// //     const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`;
// //     window.open(url, '_blank');
// //     setShowShareOptions(false);
// //   };

// //   const shareToTwitter = () => {
// //     const text = generateShareText();
// //     const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text.substring(0, 250) + (text.length > 250 ? '...' : ''))}`;
// //     window.open(url, '_blank');
// //     setShowShareOptions(false);
// //   };

// //   const copyToClipboard = () => {
// //     const text = generateShareText();
// //     navigator.clipboard.writeText(text).then(() => {
// //       toast.success('Team copied to clipboard!');
// //       setShowShareOptions(false);
// //     });
// //   };

// //   const TeamContent = () => (
// //     <>
// //       {changes > 0 && (
// //         <div className="absolute -top-2 -right-2 bg-yellow-500 text-black font-bold rounded-full h-6 w-6 flex items-center justify-center">
// //           {changes}
// //         </div>
// //       )}
      
// //       {isNewTeam && (
// //         <div className="absolute -top-2 -left-2 bg-green-500 text-black font-bold rounded-full px-2 py-1 text-xs flex items-center justify-center">
// //           NEW
// //         </div>
// //       )}
      
// //       <div className={`p-3 flex justify-between items-center ${leagueType.color === '#10B981' ? 'bg-green-500' : 'bg-purple-500'}`}>
// //         <h3 className="font-bold text-white">{team?.name || `Team ${index + 1}`}</h3>
// //         <div className="flex items-center gap-2">
// //           {changes > 0 && (
// //             <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full">
// //               {changes} change{changes > 1 ? 's' : ''}
// //             </span>
// //           )}
// //           <div className="flex gap-2 items-center">
// //             <button 
// //               onClick={(e) => {
// //                 e.stopPropagation();
// //                 setShowShareOptions(!showShareOptions);
// //               }}
// //               className="text-white hover:text-gray-200 p-1"
// //               aria-label="Share team"
// //             >
// //               <FiShare2 size={18} />
// //             </button>
// //             <button 
// //               onClick={(e) => {
// //                 e.stopPropagation();
// //                 setIsFullScreen(!isFullScreen);
// //               }}
// //               className="text-white hover:text-gray-200 p-1"
// //               aria-label={isFullScreen ? "Close full screen" : "View full screen"}
// //             >
// //               {isFullScreen ? <FiX size={18} /> : <FiMaximize size={18} />}
// //             </button>
// //             <input
// //               type="checkbox"
// //               checked={isSelected}
// //               onChange={(e) => {
// //                 e.stopPropagation();
// //                 onToggleSelect();
// //               }}
// //               onClick={(e) => e.stopPropagation()}
// //               className="h-5 w-5 rounded text-blue-600 cursor-pointer"
// //               aria-label="Select team"
// //             />
// //           </div>
// //         </div>
// //       </div>
      
// //       {showShareOptions && (
// //         <div className="absolute right-12 top-12 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10 p-2">
// //           <button 
// //             onClick={shareToWhatsApp}
// //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left text-white"
// //           >
// //             <FontAwesomeIcon icon={faWhatsapp} className="text-green-400" /> WhatsApp
// //           </button>
// //           <button 
// //             onClick={shareToTelegram}
// //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left text-white"
// //           >
// //             <FontAwesomeIcon icon={faTelegram} className="text-blue-400" /> Telegram
// //           </button>
// //           <button 
// //             onClick={shareToTwitter}
// //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left text-white"
// //           >
// //             <FontAwesomeIcon icon={faTwitter} className="text-blue-400" /> Twitter
// //           </button>
// //           <button 
// //             onClick={copyToClipboard}
// //             className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left text-white"
// //           >
// //             <FiShare2 /> Copy Text
// //           </button>
// //         </div>
// //       )}
      
// //       <div className="bg-gray-100 p-4">
// //         {playerChanges.length > 0 && (
// //           <div className="mb-3 bg-yellow-100 p-2 rounded text-sm border border-yellow-300">
// //             <div className="font-medium mb-1 text-gray-800">Team Changes:</div>
// //             {playerChanges.map((change, i) => (
// //               <div key={i} className="flex justify-between text-gray-700">
// //                 <span className="text-red-500 line-through">{change.out}</span>
// //                 <span>→</span>
// //                 <span className="text-green-600">{change.in}</span>
// //                 <span className="text-gray-500 text-xs">{change.role}</span>
// //               </div>
// //             ))}
// //           </div>
// //         )}
        
// //         <div className="flex gap-4 mb-3">
// //           <div className="flex-1">
// //             <div className="flex items-center gap-2 w-full">
// //               <img 
// //                 src={captain.imgURL || "/fallback.png"} 
// //                 alt={captain.name} 
// //                 className="w-10 h-10 rounded-full"
// //                 onError={(e) => {
// //                   const target = e.target as HTMLImageElement;
// //                   target.src = "/fallback.png";
// //                 }}
// //               />
// //               <div className="flex-1">
// //                 <div className="flex justify-between items-center">
// //                   <p className={`font-medium ${
// //                     captain.wasSubstituted ? 'text-yellow-600' : 
// //                     captain.substitute ? 'text-red-500' : 'text-gray-800'
// //                     }`}>
// //                     <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-2">C</span>
// //                     {captain.name}
// //                   </p>
// //                 </div>
// //                 <p className="text-xs text-gray-600">{captain.teamShortName || captain.teamName}</p>
// //               </div>
// //             </div>
// //           </div>
          
// //           <div className="flex-1">
// //             <div className="flex items-center gap-2 w-full">
// //               <img 
// //                 src={viceCaptain.imgURL || "/fallback.png"} 
// //                 alt={viceCaptain.name} 
// //                 className="w-10 h-10 rounded-full"
// //                 onError={(e) => {
// //                   const target = e.target as HTMLImageElement;
// //                   target.src = "/fallback.png";
// //                 }}
// //               />
// //               <div className="flex-1">
// //                 <div className="flex justify-between items-center">
// //                   <p className={`font-medium ${
// //                     viceCaptain.wasSubstituted ? 'text-yellow-600' : 
// //                     viceCaptain.substitute ? 'text-red-500' : 'text-gray-800'
// //                   }`}>
// //                     <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-2">VC</span>
// //                     {viceCaptain.name}
// //                   </p>
// //                 </div>
// //                 <p className="text-xs text-gray-600">{viceCaptain.teamShortName || viceCaptain.teamName}</p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
        
// //         <div className="mb-3 bg-white p-2 rounded border border-gray-200">
// //           <div className="flex justify-between text-sm mb-1 text-gray-800">
// //             <span>{team?.team1ShortName || captain.teamName}: {team1Count}</span>
// //             <span>{team?.team2ShortName || opponentTeamName}: {team2Count}</span>
// //           </div>
// //           <div className="flex justify-between items-center mt-1">
// //             <div className="flex flex-wrap gap-1 text-xs">
// //               <span className="bg-gray-200 px-2 py-1 rounded text-gray-800">WK: {playersByRole['WK-Batsman'].length}</span>
// //               <span className="bg-gray-200 px-2 py-1 rounded text-gray-800">Bats: {playersByRole['Batsman'].length}</span>
// //               <span className="bg-gray-200 px-2 py-1 rounded text-gray-800">AR: {
// //                 playersByRole['Batting Allrounder'].length + playersByRole['Bowling Allrounder'].length
// //               }</span>
// //               <span className="bg-gray-200 px-2 py-1 rounded text-gray-800">Bowlers: {playersByRole['Bowler'].length}</span>
// //             </div>
// //             <div className="text-xs font-medium px-2 py-1 rounded text-white" style={{
// //               backgroundColor: leagueType.color
// //             }}>
// //               {leagueType.type}
// //             </div>
// //           </div>
// //         </div>
        
// //         <div className={`space-y-2 ${isFullScreen ? '' : 'max-h-60'} overflow-y-auto`}>
// //           {playersByRole['WK-Batsman'].length > 0 && (
// //             <div className="text-xs text-gray-600 mt-2">Wicket Keepers</div>
// //           )}
// //           {playersByRole['WK-Batsman'].map((player, i) => (
// //             <PlayerRow 
// //               key={`wk-${i}`} 
// //               player={player} 
// //               isSubstitute={!!player.substitute}
// //               wasSubstituted={player.wasSubstituted}
// //               team1ShortName={team?.team1ShortName}
// //             />
// //           ))}
          
// //           {playersByRole['Batsman'].length > 0 && (
// //             <div className="text-xs text-gray-600 mt-2">Batsmen</div>
// //           )}
// //           {playersByRole['Batsman'].map((player, i) => (
// //             <PlayerRow 
// //               key={`bat-${i}`} 
// //               player={player} 
// //               isSubstitute={!!player.substitute}
// //               wasSubstituted={player.wasSubstituted}
// //               team1ShortName={team?.team1ShortName}
// //             />
// //           ))}
          
// //           {playersByRole['Batting Allrounder'].length > 0 && (
// //             <div className="text-xs text-gray-600 mt-2">Batting Allrounders</div>
// //           )}
// //           {playersByRole['Batting Allrounder'].map((player, i) => (
// //             <PlayerRow 
// //               key={`bar-${i}`} 
// //               player={player} 
// //               isSubstitute={!!player.substitute}
// //               wasSubstituted={player.wasSubstituted}
// //               team1ShortName={team?.team1ShortName}
// //             />
// //           ))}
          
// //           {playersByRole['Bowling Allrounder'].length > 0 && (
// //             <div className="text-xs text-gray-600 mt-2">Bowling Allrounders</div>
// //           )}
// //           {playersByRole['Bowling Allrounder'].map((player, i) => (
// //             <PlayerRow 
// //               key={`bowlar-${i}`} 
// //               player={player} 
// //               isSubstitute={!!player.substitute}
// //               wasSubstituted={player.wasSubstituted}
// //               team1ShortName={team?.team1ShortName}
// //             />
// //           ))}
          
// //           {playersByRole['Bowler'].length > 0 && (
// //             <div className="text-xs text-gray-600 mt-2">Bowlers</div>
// //           )}
// //           {playersByRole['Bowler'].map((player, i) => (
// //             <PlayerRow 
// //               key={`bowl-${i}`} 
// //               player={player} 
// //               isSubstitute={!!player.substitute}
// //               wasSubstituted={player.wasSubstituted}
// //               team1ShortName={team?.team1ShortName}
// //             />
// //           ))}
          
// //           {team?.substitutes && team.substitutes.length > 0 && (
// //             <>
// //               <div className="text-xs text-gray-600 mt-4">Substitutes (→)</div>
// //               {team.substitutes.map((sub, i) => (
// //                 <PlayerRow 
// //                   key={`sub-${i}`} 
// //                   player={sub} 
// //                   isSubstitute={false} 
// //                   isSubstituteList 
// //                   team1ShortName={team?.team1ShortName}
// //                 />
// //               ))}
// //             </>
// //           )}
// //         </div>
// //       </div>
// //     </>
// //   );

// //   const FullScreenView = () => {
// //     const roleGroups = [
// //       { title: "WICKET-KEEPERS", players: playersByRole['WK-Batsman'] },
// //       { title: "BATTERS", players: playersByRole['Batsman'] },
// //       {
// //         title: "ALL-ROUNDERS",
// //         players: [...playersByRole['Batting Allrounder'], ...playersByRole['Bowling Allrounder']]
// //       },
// //       { title: "BOWLERS", players: playersByRole['Bowler'] }
// //     ];
  
// //     const formatPlayerName = (fullName: string) => {
// //       const nameParts = fullName.split(" ");
// //       if (nameParts.length >= 2) {
// //         return `${nameParts[0].charAt(0).toUpperCase()}. ${nameParts.slice(1).join(" ")}`;
// //       }
// //       return nameParts[0];
// //     };
  
// //     return (
// //       <div className="fixed inset-0 z-50 p-1 overflow-y-auto bg-[#0c9c2e]">
// //         <div className="flex justify-between items-center mb-1 sticky top-0 bg-[#0c9c2e] py-1 px-2 border-b border-green-100">
// //           <h2 className="text-base font-bold text-gray-800">{team?.name || `Team ${index + 1}`}</h2>
// //           <button
// //             onClick={() => setIsFullScreen(false)}
// //             className="text-gray-800 p-0"
// //             aria-label="Close full screen view"
// //           >
// //             <FiX size={18} />
// //           </button>
// //         </div>
  
// //         <div className="space-y-3 px-2">
// //           <div className="flex justify-between my-2">
// //             <div className="text-sm font-medium px-3 py-1 rounded-full bg-black text-white">
// //               {team?.team1ShortName || captain.teamName}
// //             </div>
// //             <div className="text-sm font-medium px-3 py-1 rounded-full bg-white text-black border border-gray-300">
// //               {team?.team2ShortName || opponentTeamName}
// //             </div>
// //           </div>
  
// //           {roleGroups.map((group, i) => (
// //             group.players.length > 0 && (
// //               <div key={`role-${i}`} className="mb-1">
// //                 <div className="text-xs font-medium mb-1 text-gray-100 text-center">
// //                   {group.title}
// //                 </div>
// //                 <div className={`flex ${group.players.length === 1 ? 'justify-center' : 'justify-between'} flex-wrap gap-y-2`}>
// //                   {group.players.map((player) => {
// //                     const isTeam1 = player.teamShortName?.toUpperCase().trim() === team?.team1ShortName?.toUpperCase().trim();
// //                     const nameDisplay = formatPlayerName(player.name);
  
// //                     const bgStyle = isTeam1 ? 'bg-black text-white' : 'bg-white text-black border border-gray-300';
  
// //                     return (
// //                       <div key={`player-${player.id}`} className="flex flex-col items-center w-[32%]">
// //                         <div className="relative">
// //                           <div className={`w-11 h-11 rounded-full flex items-center justify-center ${bgStyle}`}>
// //                             <img
// //                               src={player.imgURL || "/fallback.png"}
// //                               alt={player.name}
// //                               className="w-10 h-10 rounded-full object-cover"
// //                               onError={(e) => {
// //                                 const target = e.target as HTMLImageElement;
// //                                 target.src = "/fallback.png";
// //                               }}
// //                             />
// //                           </div>
// //                           {player.id === captain.id && (
// //                             <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center border border-white">
// //                               C
// //                             </span>
// //                           )}
// //                           {player.id === viceCaptain.id && (
// //                             <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center border border-white">
// //                               VC
// //                             </span>
// //                           )}
// //                         </div>
// //                         <div className="text-[11px] font-medium mt-0.5 truncate px-2 py-0.5 rounded-full text-center text-white">
// //                           {nameDisplay}
// //                         </div>
// //                       </div>
// //                     );
// //                   })}
// //                 </div>
// //               </div>
// //             )
// //           ))}
// //         </div>
  
// //         <div className="mt-3 text-center text-[11px] text-white sticky bottom-0 py-2 border-t border-green-200 bg-transparent">
// //           {team?.team1ShortName || captain.teamName} vs {team?.team2ShortName || opponentTeamName}
// //         </div>
// //       </div>
// //     );
// //   };
  
// //   return (
// //     <>
// //       {!isFullScreen && (
// //         <div 
// //           className={`border-2 ${isSelected ? 'border-blue-500' : 'border-gray-300'} rounded-lg overflow-hidden relative w-full p-0 md:px-4 md:py-2 bg-white`}
// //           onClick={() => onToggleSelect()}
// //         >
// //           <TeamContent />
// //         </div>
// //       )}
      
// //       {isFullScreen && <FullScreenView />}
// //     </>
// //   );
// // }





"use client";
import { useEffect, useState } from "react";
import { FiShare2, FiX, FiMaximize } from 'react-icons/fi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { PlayerDetail, GeneratedTeam } from "@/types/match";

interface TeamCardProps {
  team: GeneratedTeam;
  index: number;
  isSelected: boolean;
  onToggleSelect: () => void;
  onUpdateTeam: (updatedTeam: GeneratedTeam) => void;
  isNewTeam?: boolean;
}

const getLeagueType = (riskLevel?: number) => {
  if (!riskLevel) return { type: 'H2H', color: '#10B981' };
  return riskLevel < 30
    ? { type: 'H2H', color: '#10B981' }
    : { type: 'MEGA/GL', color: '#8B5CF6' };
};

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

const PlayerRow = ({
  player,
  isSubstitute,
  wasSubstituted,
  isSubstituteList = false,
  team1ShortName
}: {
  player: PlayerDetail;
  isSubstitute: boolean;
  wasSubstituted?: boolean;
  isSubstituteList?: boolean;
  team1ShortName?: string;
}) => {
  const isTeam1 = player.teamShortName === team1ShortName;
  const bgColor = isTeam1 ? 'bg-black text-white' : 'bg-white text-black';
  
  return (
    <div className={`flex items-center justify-between text-sm p-2 rounded border ${
      wasSubstituted ? 'bg-yellow-100 border-yellow-300' :
      isSubstitute ? 'bg-red-100 border-red-300' :
      isSubstituteList ? 'bg-gray-100 border-gray-300' : `${bgColor} border-gray-300`
    }`}>
      <div className="flex items-center gap-2 w-full">
        {isSubstituteList && <span className="text-yellow-500">→</span>}
        {wasSubstituted && <span className="text-green-500">↑</span>}
        <img
          src={player.imgURL || "/fallback.png"}
          alt={player.name}
          className="w-8 h-8 rounded-full"
          onError={(e) => (e.currentTarget as HTMLImageElement).src = "/fallback.png"}
        />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <span className={isSubstitute ? 'line-through' : ''}>
              {player.name}
              {player.keeper && ' (WK)'}
              {wasSubstituted && player.replacedPlayer && ` (replaced ${player.replacedPlayer})`}
            </span>
          </div>
          <p className={`text-xs ${isTeam1 ? 'text-gray-300' : 'text-gray-600'}`}>
            {player.teamShortName || player.teamName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function TeamCard({
  team,
  index,
  isSelected,
  onToggleSelect,
  onUpdateTeam,
  isNewTeam = false
}: TeamCardProps) {
  const [changes, setChanges] = useState<number>(team?.changes || 0);
  const [playerChanges, setPlayerChanges] = useState<Array<{
    out: string;
    in: string;
    role: string;
  }>>([]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const leagueType = getLeagueType(team?.riskLevel);

  const captain = team?.captain || {
    id: 0,
    name: 'Unknown Captain',
    teamName: 'Unknown Team',
    role: 'Batsman',
    fullName: '',
    nickName: '',
    captain: false,
    keeper: false,
    isOverseas: false
  } as PlayerDetail;

  const viceCaptain = team?.viceCaptain || {
    id: 0,
    name: 'Unknown Vice-Captain',
    teamName: 'Unknown Team',
    role: 'Batsman',
    fullName: '',
    nickName: '',
    captain: false,
    keeper: false,
    isOverseas: false
  } as PlayerDetail;

  const opponentTeamName = team?.players?.find(
    p => p.teamName !== captain.teamName
  )?.teamName || 'Opponent';

  // Fixed team count calculation
  const team1Count = team?.team1Count || team?.players?.filter(p => 
    p.teamShortName === team?.team1ShortName || p.teamName === captain.teamName
  ).length || 0;

  const team2Count = 11 - team1Count;

  useEffect(() => {
    const checkLineupChanges = () => {
      if (!team?.players || !team?.substitutes) return;
      
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
            } as PlayerDetail;
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
    'WK-Batsman': team?.players?.filter(p => normalizeRole(p.role) === 'WK-Batsman') || [],
    'Batsman': team?.players?.filter(p => normalizeRole(p.role) === 'Batsman') || [],
    'Batting Allrounder': team?.players?.filter(p => normalizeRole(p.role) === 'Batting Allrounder') || [],
    'Bowling Allrounder': team?.players?.filter(p => normalizeRole(p.role) === 'Bowling Allrounder') || [],
    'Bowler': team?.players?.filter(p => normalizeRole(p.role) === 'Bowler') || []
  };

  const generateShareText = () => {
    const captainTeamName = team?.team1ShortName || captain.teamName;
    const opponentName = team?.team2ShortName || opponentTeamName;
  
    let text = `Fantasy Team ${index + 1} - ${captainTeamName} vs ${opponentName}\n\n`;
    text += `Captain: ${captain.name} (${captain.teamShortName || captain.teamName})\n`;
    text += `Vice-Captain: ${viceCaptain.name} (${viceCaptain.teamShortName || viceCaptain.teamName})\n\n`;
  
    text += "Playing XI:\n";
    Object.entries(playersByRole).forEach(([role, players]) => {
      if (players.length > 0) {
        text += `${role}:\n`;
        players.forEach(player => {
          text += `• ${player.name} (${player.teamShortName || player.teamName}) ${player.wasSubstituted ? '(replaced)' : ''}\n`;
        });
      }
    });
  
    if (team?.substitutes && team.substitutes.length > 0) {
      text += "\nSubstitutes:\n";
      team.substitutes.forEach(sub => {
        text += `• ${sub.name} (${sub.teamShortName || sub.teamName})\n`;
      });
    }
  
    text += `\nTeam Balance: ${team1Count} ${captainTeamName} | ${team2Count} ${opponentName}\n`;
    text += `League Type: ${leagueType.type}\n`;
  
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
      
      <div className={`p-3 flex justify-between items-center ${leagueType.color === '#10B981' ? 'bg-green-500' : 'bg-purple-500'}`}>
        <h3 className="font-bold text-white">{team?.name || `Team ${index + 1}`}</h3>
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
              className="text-white hover:text-gray-200 p-1"
              aria-label="Share team"
            >
              <FiShare2 size={18} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFullScreen(!isFullScreen);
              }}
              className="text-white hover:text-gray-200 p-1"
              aria-label={isFullScreen ? "Close full screen" : "View full screen"}
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
              aria-label="Select team"
            />
          </div>
        </div>
      </div>
      
      {showShareOptions && (
        <div className="absolute right-12 top-12 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10 p-2">
          <button
            onClick={shareToWhatsApp}
            className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left text-white"
          >
            <FontAwesomeIcon icon={faWhatsapp} className="text-green-400" /> WhatsApp
          </button>
          <button
            onClick={shareToTelegram}
            className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left text-white"
          >
            <FontAwesomeIcon icon={faTelegram} className="text-blue-400" /> Telegram
          </button>
          <button
            onClick={shareToTwitter}
            className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left text-white"
          >
            <FontAwesomeIcon icon={faTwitter} className="text-blue-400" /> Twitter
          </button>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 w-full p-2 hover:bg-gray-700 rounded text-left text-white"
          >
            <FiShare2 /> Copy Text
          </button>
        </div>
      )}
      
      <div className="bg-gray-100 p-4">
        {playerChanges.length > 0 && (
          <div className="mb-3 bg-yellow-100 p-2 rounded text-sm border border-yellow-300">
            <div className="font-medium mb-1 text-gray-800">Team Changes:</div>
            {playerChanges.map((change, i) => (
              <div key={i} className="flex justify-between text-gray-700">
                <span className="text-red-500 line-through">{change.out}</span>
                <span>→</span>
                <span className="text-green-600">{change.in}</span>
                <span className="text-gray-500 text-xs">{change.role}</span>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex gap-4 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 w-full">
              <img
                src={captain.imgURL || "/fallback.png"}
                alt={captain.name}
                className="w-10 h-10 rounded-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/fallback.png";
                }}
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className={`font-medium ${
                    captain.wasSubstituted ? 'text-yellow-600' :
                    captain.substitute ? 'text-red-500' : 'text-gray-800'
                    }`}>
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-2">C</span>
                    {captain.name}
                  </p>
                </div>
                <p className="text-xs text-gray-600">{captain.teamShortName || captain.teamName}</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 w-full">
              <img
                src={viceCaptain.imgURL || "/fallback.png"}
                alt={viceCaptain.name}
                className="w-10 h-10 rounded-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/fallback.png";
                }}
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className={`font-medium ${
                    viceCaptain.wasSubstituted ? 'text-yellow-600' :
                    viceCaptain.substitute ? 'text-red-500' : 'text-gray-800'
                  }`}>
                    <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-2">VC</span>
                    {viceCaptain.name}
                  </p>
                </div>
                <p className="text-xs text-gray-600">{viceCaptain.teamShortName || viceCaptain.teamName}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-3 bg-white p-2 rounded border border-gray-200">
          <div className="flex justify-between text-sm mb-1 text-gray-800">
            <span>{team?.team1ShortName || captain.teamName}: {team1Count}</span>
            <span>{team?.team2ShortName || opponentTeamName}: {team2Count}</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <div className="flex flex-wrap gap-1 text-xs">
              <span className="bg-gray-200 px-2 py-1 rounded text-gray-800">WK: {playersByRole['WK-Batsman'].length}</span>
              <span className="bg-gray-200 px-2 py-1 rounded text-gray-800">Bats: {playersByRole['Batsman'].length}</span>
              <span className="bg-gray-200 px-2 py-1 rounded text-gray-800">AR: {
                playersByRole['Batting Allrounder'].length + playersByRole['Bowling Allrounder'].length
              }</span>
              <span className="bg-gray-200 px-2 py-1 rounded text-gray-800">Bowlers: {playersByRole['Bowler'].length}</span>
            </div>
            <div className="text-xs font-medium px-2 py-1 rounded text-white" style={{
              backgroundColor: leagueType.color
            }}>
              {leagueType.type}
            </div>
          </div>
        </div>
        
        <div className={`space-y-2 ${isFullScreen ? '' : 'max-h-60'} overflow-y-auto`}>
          {playersByRole['WK-Batsman'].length > 0 && (
            <div className="text-xs text-gray-600 mt-2">Wicket Keepers</div>
          )}
          {playersByRole['WK-Batsman'].map((player, i) => (
            <PlayerRow
              key={`wk-${i}`}
              player={player}
              isSubstitute={!!player.substitute}
              wasSubstituted={player.wasSubstituted}
              team1ShortName={team?.team1ShortName}
            />
          ))}
          
          {playersByRole['Batsman'].length > 0 && (
            <div className="text-xs text-gray-600 mt-2">Batsmen</div>
          )}
          {playersByRole['Batsman'].map((player, i) => (
            <PlayerRow
              key={`bat-${i}`}
              player={player}
              isSubstitute={!!player.substitute}
              wasSubstituted={player.wasSubstituted}
              team1ShortName={team?.team1ShortName}
            />
          ))}
          
          {playersByRole['Batting Allrounder'].length > 0 && (
            <div className="text-xs text-gray-600 mt-2">Batting Allrounders</div>
          )}
          {playersByRole['Batting Allrounder'].map((player, i) => (
            <PlayerRow
              key={`bar-${i}`}
              player={player}
              isSubstitute={!!player.substitute}
              wasSubstituted={player.wasSubstituted}
              team1ShortName={team?.team1ShortName}
            />
          ))}
          
          {playersByRole['Bowling Allrounder'].length > 0 && (
            <div className="text-xs text-gray-600 mt-2">Bowling Allrounders</div>
          )}
          {playersByRole['Bowling Allrounder'].map((player, i) => (
            <PlayerRow
              key={`bowlar-${i}`}
              player={player}
              isSubstitute={!!player.substitute}
              wasSubstituted={player.wasSubstituted}
              team1ShortName={team?.team1ShortName}
            />
          ))}
          
          {playersByRole['Bowler'].length > 0 && (
            <div className="text-xs text-gray-600 mt-2">Bowlers</div>
          )}
          {playersByRole['Bowler'].map((player, i) => (
            <PlayerRow
              key={`bowl-${i}`}
              player={player}
              isSubstitute={!!player.substitute}
              wasSubstituted={player.wasSubstituted}
              team1ShortName={team?.team1ShortName}
            />
          ))}
          
          {team?.substitutes && team.substitutes.length > 0 && (
            <>
              <div className="text-xs text-gray-600 mt-4">Substitutes (→)</div>
              {team.substitutes.map((sub, i) => (
                <PlayerRow
                  key={`sub-${i}`}
                  player={sub}
                  isSubstitute={false}
                  isSubstituteList
                  team1ShortName={team?.team1ShortName}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );

  const FullScreenView = () => {
    const roleGroups = [
      { title: "WICKET-KEEPERS", players: playersByRole['WK-Batsman'] },
      { title: "BATTERS", players: playersByRole['Batsman'] },
      {
        title: "ALL-ROUNDERS",
        players: [...playersByRole['Batting Allrounder'], ...playersByRole['Bowling Allrounder']]
      },
      { title: "BOWLERS", players: playersByRole['Bowler'] }
    ];
  
    const formatPlayerName = (fullName: string) => {
      const nameParts = fullName.split(" ");
      if (nameParts.length >= 2) {
        return `${nameParts[0].charAt(0).toUpperCase()}. ${nameParts.slice(1).join(" ")}`;
      }
      return nameParts[0];
    };
  
    return (
      <div className="fixed inset-0 z-50 p-1 overflow-y-auto bg-[#0c9c2e]">
        <div className="flex justify-between items-center mb-1 sticky top-0 bg-[#0c9c2e] py-1 px-2 border-b border-green-100">
          <h2 className="text-base font-bold text-gray-800">{team?.name || `Team ${index + 1}`}</h2>
          <button
            onClick={() => setIsFullScreen(false)}
            className="text-gray-800 p-0"
            aria-label="Close full screen view"
          >
            <FiX size={18} />
          </button>
        </div>
  
        <div className="space-y-3 px-2">
          <div className="flex justify-between my-2">
            <div className="text-sm font-medium px-3 py-1 rounded-full bg-black text-white">
              {team?.team1ShortName || captain.teamName}
            </div>
            <div className="text-sm font-medium px-3 py-1 rounded-full bg-white text-black border border-gray-300">
              {team?.team2ShortName || opponentTeamName}
            </div>
          </div>
  
          {roleGroups.map((group, i) => (
            group.players.length > 0 && (
              <div key={`role-${i}`} className="mb-1">
                <div className="text-xs font-medium mb-1 text-gray-100 text-center">
                  {group.title}
                </div>
                <div className={`flex ${group.players.length === 1 ? 'justify-center' : 'justify-between'} flex-wrap gap-y-2`}>
                  {group.players.map((player) => {
                    const isTeam1 = player.teamShortName?.toUpperCase().trim() === team?.team1ShortName?.toUpperCase().trim();
                    const nameDisplay = formatPlayerName(player.name);
  
                    const bgStyle = isTeam1 ? 'bg-black text-white' : 'bg-white text-black border border-gray-300';
  
                    return (
                      <div key={`player-${player.id}`} className="flex flex-col items-center w-[32%]">
                        <div className="relative">
                          <div className={`w-11 h-11 rounded-full flex items-center justify-center ${bgStyle}`}>
                            <img
                              src={player.imgURL || "/fallback.png"}
                              alt={player.name}
                              className="w-10 h-10 rounded-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/fallback.png";
                              }}
                            />
                          </div>
                          {player.id === captain.id && (
                            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center border border-white">
                              C
                            </span>
                          )}
                          {player.id === viceCaptain.id && (
                            <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center border border-white">
                              VC
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] font-medium mt-0.5 truncate px-2 py-0.5 rounded-full text-center text-white">
                          {nameDisplay}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )
          ))}
        </div>
  
        <div className="mt-3 text-center text-[11px] text-white sticky bottom-0 py-2 border-t border-green-200 bg-transparent">
          {team?.team1ShortName || captain.teamName} vs {team?.team2ShortName || opponentTeamName}
        </div>
      </div>
    );
  };
  
  return (
    <>
      {!isFullScreen && (
        <div
          className={`border-2 ${isSelected ? 'border-blue-500' : 'border-gray-300'} rounded-lg overflow-hidden relative w-full p-0 md:px-4 md:py-2 bg-white`}
          onClick={() => onToggleSelect()}
        >
          <TeamContent />
        </div>
      )}
      
      {isFullScreen && <FullScreenView />}
    </>
  );
}
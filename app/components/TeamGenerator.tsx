


// "use client";
// import { useState, useCallback, useMemo, useEffect } from "react";
// import { PaymentDialog } from "./PaymentDialog";
// import { Team, PlayerDetail, GeneratedTeam } from "../../types/match";
// import { db } from "@/lib/firebase";
// import { 
//   doc, 
//   runTransaction, 
//   increment, 
//   setDoc, 
//   collection, 
//   query, 
//   orderBy, 
//   getDocs,
//   limit
// } from "firebase/firestore";
// import { useUser } from "@clerk/nextjs";

// interface TeamGeneratorProps {
//   team1?: Team;
//   team2?: Team;
//   teamCount: number;
//   riskLevel: number;
//   userBalance: number;
//   onBalanceUpdate: (newBalance: number) => void;
//   matchId: string;
// }

// interface EnhancedPlayerDetail extends PlayerDetail {
//   roleOrder: number;
//   selectedBy: number;
//   selCapPerc?: number;
//   selVcPerc?: number;
//   normalizedRole: string;
// }

// export const useTeamGenerator = ({ 
//   team1, 
//   team2, 
//   teamCount, 
//   riskLevel,
//   userBalance,
//   onBalanceUpdate,
//   matchId
// }: TeamGeneratorProps) => {
//   const { user } = useUser();
//   const [generatedTeams, setGeneratedTeams] = useState<GeneratedTeam[]>([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [showPaymentDialog, setShowPaymentDialog] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [roleCounts, setRoleCounts] = useState({
//     wk: 0,
//     batsmen: 0,
//     allrounders: 0,
//     bowlers: 0
//   });

//   const MAX_TEAMS_PER_MATCH = 20;
//   const requiredCredits = useMemo(() => teamCount * 10, [teamCount]);
//   const needsPayment = useMemo(() => userBalance < requiredCredits, [userBalance, requiredCredits]);
//   const paymentAmount = useMemo(() => Math.max(requiredCredits - userBalance, 50), [requiredCredits, userBalance]);
//   const localStorageKey = useMemo(() => `matchTeams_${matchId}_${user?.id}`, [matchId, user?.id]);

//   const getRoleOrder = (role: string): number => {
//     const normalized = normalizeRole(role);
//     switch(normalized) {
//       case 'WK-Batsman': return 1;
//       case 'Batsman': return 2;
//       case 'Batting Allrounder': return 3;
//       case 'Bowling Allrounder': return 4;
//       case 'Bowler': return 5;
//       default: return 6;
//     }
//   };

//   const normalizeRole = (role: string): string => {
//     if (!role) return 'Bowler';
    
//     const lowerRole = role.toLowerCase().trim();
//     if (lowerRole.includes('keep') || lowerRole.includes('wk')) return 'WK-Batsman';
//     if (lowerRole.includes('bat') && lowerRole.includes('all')) return 'Batting Allrounder';
//     if (lowerRole.includes('bowl') && lowerRole.includes('all')) return 'Bowling Allrounder';
//     if (lowerRole.includes('bat')) return 'Batsman';
//     if (lowerRole.includes('bowl')) return 'Bowler';
//     if (lowerRole.includes('all')) return 'Bowling Allrounder';
    
//     return 'Bowler';
//   };

//   const getNeededRoles = (composition: any, riskLevel: number): string[] => {
//     const neededRoles: string[] = [];
    
//     if (composition['WK-Batsman'] < 1) {
//       neededRoles.push('WK-Batsman');
//     }
    
//     if (riskLevel < 50) {
//       if (composition['Batsman'] + composition['Batting Allrounder'] < 4) {
//         neededRoles.push('Batsman', 'Batting Allrounder');
//       }
//       if (composition['Bowler'] + composition['Bowling Allrounder'] < 4) {
//         neededRoles.push('Bowler', 'Bowling Allrounder');
//       }
//     } else {
//       if (composition['Batsman'] + composition['Batting Allrounder'] < 5) {
//         neededRoles.push('Batsman', 'Batting Allrounder');
//       }
//       if (composition['Bowler'] + composition['Bowling Allrounder'] < 3) {
//         neededRoles.push('Bowler', 'Bowling Allrounder');
//       }
//     }
    
//     return neededRoles.length > 0 ? neededRoles : 
//       ['Batsman', 'Batting Allrounder', 'Bowling Allrounder', 'Bowler'];
//   };

//   const validateTeamWithRatio = (
//     players: EnhancedPlayerDetail[],
//     composition: any,
//     team1Short: string,
//     team2Short: string,
//     teamRatio: { main: number; secondary: number }
//   ) => {
//     if (players.length !== 11) return false;
    
//     const mainTeam = composition[team1Short] >= composition[team2Short] ? team1Short : team2Short;
//     const secondaryTeam = mainTeam === team1Short ? team2Short : team1Short;
    
//     if (composition[mainTeam] !== teamRatio.main || composition[secondaryTeam] !== teamRatio.secondary) {
//       return false;
//     }
    
//     if (composition['WK-Batsman'] < 1) return false;
    
//     const batCount = composition['Batsman'] + composition['Batting Allrounder'];
//     if (batCount < 3) return false;
    
//     const bowlCount = composition['Bowler'] + composition['Bowling Allrounder'];
//     if (bowlCount < 3) return false;
    
//     if (composition.overseas > 5) return false;
    
//     return true;
//   };

//   const getPlayerPool = useCallback((): EnhancedPlayerDetail[] => {
//     if (!team1 || !team2) return [];
    
//     const team1Players = team1.playerDetails?.filter(p => p.substitute === false) || [];
//     const team2Players = team2.playerDetails?.filter(p => p.substitute === false) || [];
    
//     const allPlayers = [...team1Players, ...team2Players].map(p => ({
//       ...p,
//       roleOrder: getRoleOrder(p.role),
//       normalizedRole: normalizeRole(p.role),
//       selectedBy: p.selectedBy || 0.1,
//       selCapPerc: p.selCapPerc || 0.1,
//       selVcPerc: p.selVcPerc || 0.1,
//       isPlaying: true
//     }));

//     const wkPlayers = allPlayers.filter(p => p.normalizedRole === 'WK-Batsman');
//     const batPlayers = allPlayers.filter(p => 
//       ['Batsman', 'Batting Allrounder'].includes(p.normalizedRole)
//     );
//     const bowlPlayers = allPlayers.filter(p => 
//       ['Bowler', 'Bowling Allrounder'].includes(p.normalizedRole)
//     );
//     const allPlayersCount = allPlayers.filter(p => 
//       ['Bowling Allrounder', 'Batting Allrounder'].includes(p.normalizedRole)
//     );

//     setRoleCounts({
//       wk: wkPlayers.length,
//       batsmen: batPlayers.length,
//       allrounders: allPlayersCount.length,
//       bowlers: bowlPlayers.length
//     });

//     if (wkPlayers.length < 1) {
//       setError(`Need at least 1 WK-Batsman (available: ${wkPlayers.length})`);
//       return [];
//     }
//     if (batPlayers.length < 3) {
//       setError(`Need at least 3 Batsmen (available: ${batPlayers.length})`);
//       return [];
//     }
//     if (bowlPlayers.length < 3) {
//       setError(`Need at least 3 Bowlers (available: ${bowlPlayers.length})`);
//       return [];
//     }

//     return allPlayers;
//   }, [team1, team2]);

//   const calculatePlayerScore = (player: EnhancedPlayerDetail, forCaptaincy = false) => {
//     const baseScore = forCaptaincy ? 
//       (player.selCapPerc || player.selectedBy) : 
//       (player.selectedBy);
    
//     let riskFactor = 1;
//     if (riskLevel < 20) {
//       riskFactor = 1 + (Math.random() * 0.1);
//     } else if (riskLevel < 40) {
//       riskFactor = 0.9 + (Math.random() * 0.2);
//     } else if (riskLevel < 60) {
//       riskFactor = 0.8 + (Math.random() * 0.4);
//     } else if (riskLevel < 80) {
//       riskFactor = 0.6 + (Math.random() * 0.6);
//     } else {
//       riskFactor = 0.4 + (Math.random() * 0.8);
//     }
    
//     return baseScore * riskFactor;
//   };

//   const getTeamCompositionByRisk = () => {
//     if (riskLevel < 20) return { wk: 1, bat: 4, ar: 2, bowl: 4 };
//     if (riskLevel < 40) return { wk: 1, bat: 3, ar: 3, bowl: 4 };
//     if (riskLevel < 60) return { wk: 1, bat: 3, ar: 4, bowl: 3 };
//     if (riskLevel < 80) return { wk: 1, bat: 5, ar: 3, bowl: 2 };
    
//     return Math.random() > 0.5 
//       ? { wk: 1, bat: 6, ar: 2, bowl: 2 } 
//       : { wk: 1, bat: 2, ar: 4, bowl: 4 };
//   };

//   const weightedRandomPick = (players: EnhancedPlayerDetail[], field: 'selectedBy' | 'selCapPerc' | 'selVcPerc') => {
//     const totalWeight = players.reduce((sum, p) => sum + (p[field] || 0.1), 0);
//     let random = Math.random() * totalWeight;
    
//     for (const player of players) {
//       random -= player[field] || 0.1;
//       if (random <= 0) return player;
//     }
    
//     return players[0];
//   };

//   const selectPlayerByRisk = (players: EnhancedPlayerDetail[], risk: number) => {
//     if (players.length === 0) return null;
    
//     const sorted = [...players].sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0));

//     if (risk < 20) {
//       const topCount = Math.max(1, Math.ceil(sorted.length * 0.2));
//       return sorted[Math.floor(Math.random() * topCount)];
//     } else if (risk < 40) {
//       const topCount = Math.max(1, Math.ceil(sorted.length * 0.4));
//       return weightedRandomPick(sorted.slice(0, topCount), 'selectedBy');
//     } else if (risk < 60) {
//       const topCount = Math.max(1, Math.ceil(sorted.length * 0.6));
//       return Math.random() > 0.7 
//         ? sorted[Math.floor(Math.random() * sorted.length)]
//         : weightedRandomPick(sorted.slice(0, topCount), 'selectedBy');
//     } else if (risk < 80) {
//       return Math.random() > 0.5 
//         ? weightedRandomPick(sorted, 'selectedBy')
//         : sorted[Math.floor(Math.random() * sorted.length)];
//     } else {
//       return sorted[Math.floor(Math.random() * sorted.length)];
//     }
//   };

//   const selectCaptainAndViceCaptain = (
//     players: EnhancedPlayerDetail[],
//     risk: number
//   ): { captain: EnhancedPlayerDetail; viceCaptain: EnhancedPlayerDetail } => {
//     const topPlayers = players.slice(0, Math.ceil(players.length * 0.3));
  
//     let captain: EnhancedPlayerDetail;
//     let viceCaptain: EnhancedPlayerDetail;
  
//     if (risk < 20) {
//       captain = topPlayers[0];
//       viceCaptain = topPlayers[1] || topPlayers[0];
//     } else if (risk < 40) {
//       captain = topPlayers[0];
//       viceCaptain =
//         topPlayers.find(p => p.normalizedRole !== captain.normalizedRole) ||
//         topPlayers[1] ||
//         topPlayers[0];
//     } else if (risk < 60) {
//       captain = topPlayers[Math.floor(Math.random() * Math.min(3, topPlayers.length))];
//       viceCaptain =
//         topPlayers
//           .slice(0, 5)
//           .find(p => p.normalizedRole !== captain.normalizedRole) ||
//         topPlayers[1] ||
//         topPlayers[0];
//     } else if (risk < 80) {
//       captain = topPlayers[Math.floor(Math.random() * Math.min(5, topPlayers.length))];
//       viceCaptain = topPlayers[Math.floor(Math.random() * Math.min(10, topPlayers.length))];
//     } else {
//       captain = topPlayers[Math.floor(Math.random() * topPlayers.length)];
//       viceCaptain = topPlayers.find(p => p.id !== captain.id) || topPlayers[0];
//     }
  
//     return { captain, viceCaptain };
//   };

//   const validateTeam = (players: EnhancedPlayerDetail[], composition: any, team1Short: string, team2Short: string) => {
//     if (players.length !== 11) return false;
    
//     if (composition['WK-Batsman'] < 1) return false;
    
//     const batCount = composition['Batsman'] + composition['Batting Allrounder'];
//     if (batCount < 3) return false;
    
//     const bowlCount = composition['Bowler'] + composition['Bowling Allrounder'];
//     if (bowlCount < 3) return false;
    
//     if (composition[team1Short] < 3 || composition[team2Short] < 3) return false;
//     if (composition[team1Short] > 8 || composition[team2Short] > 8) return false;
    
//     if (composition.overseas > 5) return false;
    
//     return true;
//   };

//   const createBalancedTeam = useCallback((players: EnhancedPlayerDetail[], existingTeamCount: number) => {
//     if (!team1 || !team2) return null;
    
//     const MAX_ATTEMPTS = 500;
//     const team1Short = team1.shortName || 'T1';
//     const team2Short = team2.shortName || 'T2';
    
//     const teamRatio = riskLevel >= 50 ? { main: 7, secondary: 4 } : { main: 6, secondary: 5 };
    
//     const availablePlayers = players.filter(p => 
//       p.selectedBy !== undefined && p.selectedBy > 0 && p.substitute === false
//     );
    
//     if (availablePlayers.length < 11) {
//       setError(`Not enough available players (${availablePlayers.length}/11)`);
//       return null;
//     }
  
//     const sortedPlayers = [...availablePlayers].sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0));
  
//     let attempts = 0;
//     while (attempts < MAX_ATTEMPTS) {
//       attempts++;
      
//       const mainTeam = Math.random() > 0.5 ? team1Short : team2Short;
//       const secondaryTeam = mainTeam === team1Short ? team2Short : team1Short;
      
//       const teamComposition = {
//         'WK-Batsman': 0,
//         'Batsman': 0,
//         'Batting Allrounder': 0,
//         'Bowling Allrounder': 0,
//         'Bowler': 0,
//         [team1Short]: 0,
//         [team2Short]: 0,
//         overseas: 0,
//         totalScore: 0
//       };
  
//       const { captain, viceCaptain } = selectCaptainAndViceCaptain(sortedPlayers, riskLevel);
//       if (!captain || !viceCaptain) continue;
  
//       const teamPlayers: EnhancedPlayerDetail[] = [captain, viceCaptain];
      
//       [captain, viceCaptain].forEach(player => {
//         const role = player.normalizedRole;
//         teamComposition[role]++;
//         teamComposition[player.teamName === team1.name ? team1Short : team2Short]++;
//         if (player.isOverseas) teamComposition.overseas++;
//         teamComposition.totalScore += calculatePlayerScore(player);
//       });
  
//       const remainingPlayers = sortedPlayers.filter(p => 
//         p.id !== captain.id && p.id !== viceCaptain.id
//       );
  
//       let wkAttempts = 0;
//       while (teamComposition['WK-Batsman'] < 1 && wkAttempts < 10) {
//         wkAttempts++;
//         const wkPlayers = remainingPlayers.filter(p => p.normalizedRole === 'WK-Batsman');
//         if (wkPlayers.length === 0) break;
        
//         const wkPlayer = selectPlayerByRisk(wkPlayers, riskLevel);
//         if (!wkPlayer) continue;
        
//         teamPlayers.push(wkPlayer);
//         teamComposition['WK-Batsman']++;
//         teamComposition[wkPlayer.teamName === team1.name ? team1Short : team2Short]++;
//         if (wkPlayer.isOverseas) teamComposition.overseas++;
//         teamComposition.totalScore += calculatePlayerScore(wkPlayer);
        
//         remainingPlayers.splice(remainingPlayers.findIndex(p => p.id === wkPlayer.id), 1);
//       }
  
//       while (teamPlayers.length < 11 && remainingPlayers.length > 0) {
//         const mainTeamCount = teamComposition[mainTeam];
//         const secondaryTeamCount = teamComposition[secondaryTeam];
        
//         let allowedTeams = [];
//         if (mainTeamCount < teamRatio.main) {
//           allowedTeams.push(mainTeam);
//         }
//         if (secondaryTeamCount < teamRatio.secondary) {
//           allowedTeams.push(secondaryTeam);
//         }
        
//         if (allowedTeams.length === 0) {
//           allowedTeams = [mainTeam, secondaryTeam];
//         }
  
//         const neededRoles = getNeededRoles(teamComposition, riskLevel);
        
//         let candidates = remainingPlayers.filter(p => {
//           const team = p.teamName === team1.name ? team1Short : team2Short;
//           const teamAllowed = allowedTeams.includes(team);
//           const overseasOK = !p.isOverseas || teamComposition.overseas < 5;
//           const roleNeeded = neededRoles.includes(p.normalizedRole);
          
//           return teamAllowed && overseasOK && roleNeeded;
//         });
  
//         if (candidates.length === 0) {
//           candidates = remainingPlayers.filter(p => {
//             const team = p.teamName === team1.name ? team1Short : team2Short;
//             return allowedTeams.includes(team) && 
//                    (!p.isOverseas || teamComposition.overseas < 5);
//           });
//         }
  
//         if (candidates.length === 0) {
//           candidates = remainingPlayers.filter(p => {
//             const team = p.teamName === team1.name ? team1Short : team2Short;
//             return allowedTeams.includes(team);
//           });
//         }
  
//         if (candidates.length === 0) break;
  
//         const selectedPlayer = selectPlayerByRisk(candidates, riskLevel);
//         if (!selectedPlayer) break;
  
//         teamPlayers.push(selectedPlayer);
//         const role = selectedPlayer.normalizedRole;
//         teamComposition[role]++;
//         teamComposition[selectedPlayer.teamName === team1.name ? team1Short : team2Short]++;
//         if (selectedPlayer.isOverseas) teamComposition.overseas++;
//         teamComposition.totalScore += calculatePlayerScore(selectedPlayer);
  
//         remainingPlayers.splice(remainingPlayers.findIndex(p => p.id === selectedPlayer.id), 1);
//       }
  
//       if (teamPlayers.length === 11 && validateTeamWithRatio(teamPlayers, teamComposition, team1Short, team2Short, teamRatio)) {
//         // Get all available players not in the playing 11
//         const allAvailablePlayers = players.filter(p => 
//           !teamPlayers.some(tp => tp.id === p.id) && p.substitute === false
//         );
        
//         // Select top 4 substitutes by selectedBy percentage
//         const substitutes = [...allAvailablePlayers]
//           .sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0))
//           .slice(0, 4);
  
//         return {
//           players: [...teamPlayers].sort((a, b) => (a.roleOrder || 6) - (b.roleOrder || 6)),
//           captain,
//           viceCaptain,
//           substitutes,
//           teamName: `Team ${existingTeamCount + 1}`,
//           teamComposition,
//           riskLevel,
//           matchId,
//           createdAt: new Date().toISOString(),
//           changes: 0
//         };
//       }
//     }
  
//     console.error(`Team generation failed after ${MAX_ATTEMPTS} attempts`);
//     setError(`Failed to generate valid team after ${MAX_ATTEMPTS} attempts. Try adjusting risk level.`);
//     return null;
//   }, [team1, team2, riskLevel, matchId]);

//   const getTeamCountForMatch = async (): Promise<number> => {
//     if (!user || !matchId) return 0;
    
//     try {
//       const q = query(
//         collection(db, "users", user.id, "matches", matchId, "teams"),
//         limit(MAX_TEAMS_PER_MATCH)
//       );
//       const querySnapshot = await getDocs(q);
//       return querySnapshot.size;
//     } catch (err) {
//       console.error("Failed to count teams:", err);
//       return 0;
//     }
//   };

//   const saveTeamToFirestore = async (team: GeneratedTeam) => {
//     if (!user || !matchId) return;
    
//     try {
//       const teamData = {
//         ...team,
//         userId: user.id,
//         userEmail: user.primaryEmailAddress?.emailAddress || '',
//         matchName: `${team1?.name} vs ${team2?.name}`,
//         team1ShortName: team1?.shortName || team1?.name.split(' ').map(n => n[0]).join(''),
//         team2ShortName: team2?.shortName || team2?.name.split(' ').map(n => n[0]).join(''),
//         team1Logo: team1?.logo || '/fallback-team.png',
//         team2Logo: team2?.logo || '/fallback-team.png'
//       };

//       const matchTeamsRef = collection(db, "users", user.id, "matches", matchId, "teams");
//       const teamRef = doc(matchTeamsRef);
      
//       await setDoc(teamRef, teamData);
//       return teamRef.id;
//     } catch (err) {
//       console.error("Failed to save team:", err);
//       throw err;
//     }
//   };

//   const fetchSavedTeams = useCallback(async (): Promise<GeneratedTeam[]> => {
//     if (!user || !matchId) return [];
    
//     try {
//       const q = query(
//         collection(db, "users", user.id, "matches", matchId, "teams"),
//         orderBy("createdAt", "desc"),
//         limit(MAX_TEAMS_PER_MATCH)
//       );
//       const querySnapshot = await getDocs(q);
//       return querySnapshot.docs.map(doc => ({
//         ...doc.data() as GeneratedTeam,
//         id: doc.id
//       }));
//     } catch (err) {
//       console.error("Failed to fetch saved teams:", err);
//       return [];
//     }
//   }, [user, matchId]);

//   useEffect(() => {
//     const loadTeams = async () => {
//       if (!matchId || !user?.id) return;
      
//       try {
//         const savedTeams = localStorage.getItem(localStorageKey);
//         if (savedTeams) {
//           setGeneratedTeams(JSON.parse(savedTeams));
//           return;
//         }

//         const teams = await fetchSavedTeams();
//         if (teams.length > 0) {
//           setGeneratedTeams(teams);
//           localStorage.setItem(localStorageKey, JSON.stringify(teams));
//         }
//       } catch (err) {
//         console.error("Failed to load teams:", err);
//       }
//     };

//     loadTeams();
//   }, [localStorageKey, matchId, user?.id, fetchSavedTeams]);

//   const handleGenerateTeams = useCallback(async () => {
//     if (!team1 || !team2) {
//       setError("Select both teams first");
//       return;
//     }

//     if (!user) {
//       setError("Please sign in to generate teams");
//       return;
//     }

//     const currentTeamCount = await getTeamCountForMatch();
//     if (currentTeamCount >= MAX_TEAMS_PER_MATCH) {
//       setError(`You've reached the maximum of ${MAX_TEAMS_PER_MATCH} teams for this match`);
//       return;
//     }

//     const remainingTeamSlots = MAX_TEAMS_PER_MATCH - currentTeamCount;
//     const teamsToGenerate = Math.min(teamCount, remainingTeamSlots);

//     if (teamsToGenerate <= 0) {
//       setError(`You've reached the maximum of ${MAX_TEAMS_PER_MATCH} teams for this match`);
//       return;
//     }

//     if (needsPayment) {
//       setShowPaymentDialog(true);
//       return;
//     }

//     const allPlayers = getPlayerPool();
//     if (allPlayers.length < 11) {
//       setError(`Not enough players (${allPlayers.length}/11). Please check your filters.`);
//       return;
//     }

//     setIsGenerating(true);
//     setError(null);

//     try {
//       await runTransaction(db, async (transaction) => {
//         const userRef = doc(db, "users", user.id);
//         const userDoc = await transaction.get(userRef);
        
//         if (!userDoc.exists()) throw new Error("User not found");
//         if ((userDoc.data().credits || 0) < requiredCredits) {
//           throw new Error("Insufficient balance");
//         }
        
//         transaction.update(userRef, {
//           credits: increment(-requiredCredits)
//         });
//       });

//       const newTeams: GeneratedTeam[] = [];
//       const TOTAL_ATTEMPTS = teamsToGenerate * 100;
//       let attempts = 0;

//       while (newTeams.length < teamsToGenerate && attempts < TOTAL_ATTEMPTS) {
//         attempts++;
//         const team = createBalancedTeam(allPlayers, currentTeamCount + newTeams.length);
//         if (team) {
//           const teamId = await saveTeamToFirestore(team);
//           newTeams.push({ ...team, id: teamId });
//         }
//       }

//       if (newTeams.length === 0) {
//         throw new Error(
//           `Failed to generate valid teams after ${TOTAL_ATTEMPTS} attempts.\n` +
//           `Player counts: WK: ${roleCounts.wk}, Batsmen: ${roleCounts.batsmen}, ` +
//           `Allrounders: ${roleCounts.allrounders}, Bowlers: ${roleCounts.bowlers}\n` +
//           `Try adjusting your risk level or player filters.`
//         );
//       }

//       const updatedTeams = [...newTeams, ...generatedTeams];
//       setGeneratedTeams(updatedTeams);
//       localStorage.setItem(localStorageKey, JSON.stringify(updatedTeams));
//       onBalanceUpdate(userBalance - requiredCredits);
//     } catch (err: any) {
//       setError(err.message || "Failed to generate teams");
//     } finally {
//       setIsGenerating(false);
//     }
//   }, [
//     team1, team2, teamCount, riskLevel, user, 
//     userBalance, requiredCredits, needsPayment, 
//     onBalanceUpdate, createBalancedTeam, matchId,
//     fetchSavedTeams, getPlayerPool, generatedTeams,
//     localStorageKey, roleCounts, getTeamCountForMatch,
//     saveTeamToFirestore
//   ]);

//   const checkLineupChanges = useCallback(async () => {
//     if (!user?.id || !matchId) return;
    
//     try {
//       const savedTeams = localStorage.getItem(localStorageKey);
//       if (!savedTeams) return;
      
//       const teams: GeneratedTeam[] = JSON.parse(savedTeams);
//       const updatedTeams = [];
      
//       for (const team of teams) {
//         const playersWithStatus = team.players.map(player => ({
//           ...player,
//         }));
        
//         const nonPlayingPlayers = playersWithStatus.filter(p => p.isNowSubstitute);
//         if (nonPlayingPlayers.length === 0) {
//           updatedTeams.push(team);
//           continue;
//         }
        
//         const playingPlayers = playersWithStatus.filter(p => !p.isNowSubstitute);
//         const availableSubstitutes = team.substitutes?.filter(sub => 
//           !playingPlayers.some(p => p.id === sub.id)
//         ) || [];
        
//         let newPlayers = [...playingPlayers];
        
//         for (const nonPlayer of nonPlayingPlayers) {
//           const replacement = availableSubstitutes.find(sub => 
//             normalizeRole(sub.role) === normalizeRole(nonPlayer.role)
//           );
          
//           if (replacement) {
//             newPlayers.push(replacement);
//             availableSubstitutes.splice(availableSubstitutes.indexOf(replacement), 1);
//           } else {
//             newPlayers.push(nonPlayer);
//           }
//         }
        
//         updatedTeams.push({
//           ...team,
//           players: newPlayers,
//           captain: newPlayers.find(p => p.id === team.captain.id) || team.captain,
//           viceCaptain: newPlayers.find(p => p.id === team.viceCaptain.id) || team.viceCaptain,
//           updatedAt: new Date().toISOString(),
//           hadChanges: nonPlayingPlayers.length > 0
//         });
//       }
      
//       localStorage.setItem(localStorageKey, JSON.stringify(updatedTeams));
//       setGeneratedTeams(updatedTeams);
      
//       if (updatedTeams.some(t => t.hadChanges)) {
//         alert('🔥 Minimum 10 Teams Needed to Win the Dream Team Mega Winnings 🏆');
//       }
      
//     } catch (err) {
//       console.error("Failed to check lineup changes:", err);
//     }
//   }, [user?.id, matchId, localStorageKey]);

//   const checkIfPlayerIsSubstitute = (playerId: string): boolean => {
//     return Math.random() < 0.1;
//   };

//   const generateButton = (
//     <div className="space-y-2">
//       <button
//         onClick={handleGenerateTeams}
//         disabled={isGenerating || !team1 || !team2}
//         className={`
//           w-full px-4 py-3 rounded-md font-bold
//           ${isGenerating ? 'bg-gray-500' : 
//            needsPayment ? 'bg-yellow-500 hover:bg-yellow-600' : 
//            'bg-blue-500 hover:bg-blue-600'}
//           text-white transition-colors
//         `}
//       >
//         {isGenerating ? (
//           <span className="flex items-center justify-center gap-2">
//             <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//             </svg>
//             Generating...
//           </span>
//         ) : !team1 || !team2 ? (
//           "Select both teams"
//         ) : needsPayment ? (
//           `Add ₹${paymentAmount} to Generate`
//         ) : (
//           `Generate ${teamCount} Teams (₹${requiredCredits})`
//         )}
//       </button>

//       <div className="flex justify-between text-sm">
//         <span>Your Credits: ₹{userBalance}</span>
//         {needsPayment ? (
//           <span className="text-yellow-500">Need ₹{paymentAmount} more</span>
//         ) : (
//           <span className="text-green-500">Sufficient balance</span>
//         )}
//       </div>

//       {error && (
//         <div className="text-red-500 text-sm p-2 bg-red-50 rounded-lg">
//           <p className="font-medium">{error}</p>
//           {error.includes("Player counts") && (
//             <div className="mt-2 text-xs">
//               <p>Current player counts:</p>
//               <ul className="list-disc pl-5">
//                 <li>WK-Batsman: {roleCounts.wk} (min 1)</li>
//                 <li>Batsmen: {roleCounts.batsmen} (min 3 including allrounders)</li>
//                 <li>Bowlers: {roleCounts.bowlers} (min 3 including allrounders)</li>
//               </ul>
//               <p className="mt-1">Try adjusting filters or risk level.</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );

//   const paymentDialog = showPaymentDialog && (
//     <PaymentDialog
//       currentBalance={userBalance}
//       requiredAmount={paymentAmount}
//       onPaymentSuccess={(amount) => {
//         onBalanceUpdate(userBalance + amount);
//         setShowPaymentDialog(false);
//         handleGenerateTeams();
//       }}
//       onOpenChange={setShowPaymentDialog}
//       open={showPaymentDialog}
//     />
//   );

//   return {
//     generatedTeams,
//     isGenerating,
//     generateButton,
//     paymentDialog,
//     error,
//     setError,
//     fetchSavedTeams,
//     setGeneratedTeams,
//     checkLineupChanges
//   };
// };






















// "use client";
// import { useState, useCallback, useMemo, useEffect } from "react";
// import { PaymentDialog } from "./PaymentDialog";
// import { Team, PlayerDetail, GeneratedTeam } from "../../types/match";
// import { db } from "@/lib/firebase";
// import { 
//   doc, 
//   runTransaction, 
//   increment, 
//   setDoc, 
//   collection, 
//   query, 
//   orderBy, 
//   getDocs,
//   limit
// } from "firebase/firestore";
// import { useUser } from "@clerk/nextjs";

// interface TeamGeneratorProps {
//   team1?: Team;
//   team2?: Team;
//   teamCount: number;
//   riskLevel: number;
//   userBalance: number;
//   onBalanceUpdate: (newBalance: number) => void;
//   matchId: string;
// }

// interface EnhancedPlayerDetail extends PlayerDetail {
//   roleOrder: number;
//   selectedBy: number;
//   selCapPerc?: number;
//   selVcPerc?: number;
//   normalizedRole: string;
// }

// export const useTeamGenerator = ({ 
//   team1, 
//   team2, 
//   teamCount, 
//   riskLevel,
//   userBalance,
//   onBalanceUpdate,
//   matchId
// }: TeamGeneratorProps) => {
//   const { user } = useUser();
//   const [generatedTeams, setGeneratedTeams] = useState<GeneratedTeam[]>([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [showPaymentDialog, setShowPaymentDialog] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [roleCounts, setRoleCounts] = useState({
//     wk: 0,
//     batsmen: 0,
//     allrounders: 0,
//     bowlers: 0
//   });

//   const MAX_TEAMS_PER_MATCH = 20;
//   const requiredCredits = useMemo(() => teamCount * 100, [teamCount]);
//   const needsPayment = useMemo(() => userBalance < requiredCredits, [userBalance, requiredCredits]);
//   const paymentAmount = useMemo(() => Math.max(requiredCredits - userBalance, 100), [requiredCredits, userBalance]);
//   const localStorageKey = useMemo(() => `matchTeams_${matchId}_${user?.id}`, [matchId, user?.id]);

//   const getRoleOrder = (role: string): number => {
//     const normalized = normalizeRole(role);
//     switch(normalized) {
//       case 'WK-Batsman': return 1;
//       case 'Batsman': return 2;
//       case 'Batting Allrounder': return 3;
//       case 'Bowling Allrounder': return 4;
//       case 'Bowler': return 5;
//       default: return 6;
//     }
//   };

//   const normalizeRole = (role: string): string => {
//     if (!role) return 'Bowler';
//     const lowerRole = role.toLowerCase().trim();
//     if (lowerRole.includes('keep') || lowerRole.includes('wk')) return 'WK-Batsman';
//     if (lowerRole.includes('bat') && lowerRole.includes('all')) return 'Batting Allrounder';
//     if (lowerRole.includes('bowl') && lowerRole.includes('all')) return 'Bowling Allrounder';
//     if (lowerRole.includes('bat')) return 'Batsman';
//     if (lowerRole.includes('bowl')) return 'Bowler';
//     if (lowerRole.includes('all')) return 'Bowling Allrounder';
//     return 'Bowler';
//   };

//   const getNeededRoles = (composition: any, riskLevel: number): string[] => {
//     const neededRoles: string[] = [];
    
//     if (composition['WK-Batsman'] < 1) neededRoles.push('WK-Batsman');
    
//     if (riskLevel < 50) {
//       if (composition['Batsman'] + composition['Batting Allrounder'] < 4) {
//         neededRoles.push('Batsman', 'Batting Allrounder');
//       }
//       if (composition['Bowler'] + composition['Bowling Allrounder'] < 4) {
//         neededRoles.push('Bowler', 'Bowling Allrounder');
//       }
//     } else {
//       if (composition['Batsman'] + composition['Batting Allrounder'] < 5) {
//         neededRoles.push('Batsman', 'Batting Allrounder');
//       }
//       if (composition['Bowler'] + composition['Bowling Allrounder'] < 3) {
//         neededRoles.push('Bowler', 'Bowling Allrounder');
//       }
//     }
    
//     return neededRoles.length > 0 ? neededRoles : 
//       ['Batsman', 'Batting Allrounder', 'Bowling Allrounder', 'Bowler'];
//   };

//   const validateTeamWithRatio = (
//     players: EnhancedPlayerDetail[],
//     composition: any,
//     team1Short: string,
//     team2Short: string,
//     teamRatio: { main: number; secondary: number }
//   ) => {
//     if (players.length !== 11) return false;
//     const mainTeam = composition[team1Short] >= composition[team2Short] ? team1Short : team2Short;
//     const secondaryTeam = mainTeam === team1Short ? team2Short : team1Short;
    
//     if (composition[mainTeam] !== teamRatio.main || composition[secondaryTeam] !== teamRatio.secondary) {
//       return false;
//     }
//     if (composition['WK-Batsman'] < 1) return false;
//     const batCount = composition['Batsman'] + composition['Batting Allrounder'];
//     if (batCount < 3) return false;
//     const bowlCount = composition['Bowler'] + composition['Bowling Allrounder'];
//     if (bowlCount < 3) return false;
//     if (composition.overseas > 5) return false;
//     return true;
//   };

//   const getPlayerPool = useCallback((): EnhancedPlayerDetail[] => {
//     if (!team1 || !team2) return [];
    
//     const team1Players = team1.playerDetails?.filter(p => p.substitute === false) || [];
//     const team2Players = team2.playerDetails?.filter(p => p.substitute === false) || [];
    
//     const allPlayers = [...team1Players, ...team2Players].map(p => ({
//       ...p,
//       roleOrder: getRoleOrder(p.role),
//       normalizedRole: normalizeRole(p.role),
//       selectedBy: p.selectedBy || 0.1,
//       selCapPerc: p.selCapPerc || 0.1,
//       selVcPerc: p.selVcPerc || 0.1,
//       isPlaying: true
//     }));

//     const wkPlayers = allPlayers.filter(p => p.normalizedRole === 'WK-Batsman');
//     const batPlayers = allPlayers.filter(p => 
//       ['Batsman', 'Batting Allrounder'].includes(p.normalizedRole)
//     );
//     const bowlPlayers = allPlayers.filter(p => 
//       ['Bowler', 'Bowling Allrounder'].includes(p.normalizedRole)
//     );
//     const allPlayersCount = allPlayers.filter(p => 
//       ['Bowling Allrounder', 'Batting Allrounder'].includes(p.normalizedRole)
//     );

//     setRoleCounts({
//       wk: wkPlayers.length,
//       batsmen: batPlayers.length,
//       allrounders: allPlayersCount.length,
//       bowlers: bowlPlayers.length
//     });

//     if (wkPlayers.length < 1) {
//       setError(`Need at least 1 WK-Batsman (available: ${wkPlayers.length})`);
//       return [];
//     }
//     if (batPlayers.length < 3) {
//       setError(`Need at least 3 Batsmen (available: ${batPlayers.length})`);
//       return [];
//     }
//     if (bowlPlayers.length < 3) {
//       setError(`Need at least 3 Bowlers (available: ${bowlPlayers.length})`);
//       return [];
//     }

//     return allPlayers;
//   }, [team1, team2]);

//   const calculatePlayerScore = (player: EnhancedPlayerDetail, forCaptaincy = false) => {
//     const baseScore = forCaptaincy ? 
//       (player.selCapPerc || player.selectedBy) : 
//       (player.selectedBy);
    
//     let riskFactor = 1;
//     if (riskLevel < 20) {
//       riskFactor = 1 + (Math.random() * 0.1);
//     } else if (riskLevel < 40) {
//       riskFactor = 0.9 + (Math.random() * 0.2);
//     } else if (riskLevel < 60) {
//       riskFactor = 0.8 + (Math.random() * 0.4);
//     } else if (riskLevel < 80) {
//       riskFactor = 0.6 + (Math.random() * 0.6);
//     } else {
//       riskFactor = 0.4 + (Math.random() * 0.8);
//     }
    
//     return baseScore * riskFactor;
//   };

//   const getTeamCompositionByRisk = () => {
//     if (riskLevel < 20) return { wk: 1, bat: 4, ar: 2, bowl: 4 };
//     if (riskLevel < 40) return { wk: 1, bat: 3, ar: 3, bowl: 4 };
//     if (riskLevel < 60) return { wk: 1, bat: 3, ar: 4, bowl: 3 };
//     if (riskLevel < 80) return { wk: 1, bat: 5, ar: 3, bowl: 2 };
//     return Math.random() > 0.5 
//       ? { wk: 1, bat: 6, ar: 2, bowl: 2 } 
//       : { wk: 1, bat: 2, ar: 4, bowl: 4 };
//   };

//   const weightedRandomPick = (players: EnhancedPlayerDetail[], field: 'selectedBy' | 'selCapPerc' | 'selVcPerc') => {
//     const totalWeight = players.reduce((sum, p) => sum + (p[field] || 0.1), 0);
//     let random = Math.random() * totalWeight;
    
//     for (const player of players) {
//       random -= player[field] || 0.1;
//       if (random <= 0) return player;
//     }
//     return players[0];
//   };

//   const selectPlayerByRisk = (players: EnhancedPlayerDetail[], risk: number) => {
//     if (players.length === 0) return null;
//     const sorted = [...players].sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0));

//     if (risk < 20) {
//       const topCount = Math.max(1, Math.ceil(sorted.length * 0.2));
//       return sorted[Math.floor(Math.random() * topCount)];
//     } else if (risk < 40) {
//       const topCount = Math.max(1, Math.ceil(sorted.length * 0.4));
//       return weightedRandomPick(sorted.slice(0, topCount), 'selectedBy');
//     } else if (risk < 60) {
//       const topCount = Math.max(1, Math.ceil(sorted.length * 0.6));
//       return Math.random() > 0.7 
//         ? sorted[Math.floor(Math.random() * sorted.length)]
//         : weightedRandomPick(sorted.slice(0, topCount), 'selectedBy');
//     } else if (risk < 80) {
//       return Math.random() > 0.5 
//         ? weightedRandomPick(sorted, 'selectedBy')
//         : sorted[Math.floor(Math.random() * sorted.length)];
//     } else {
//       return sorted[Math.floor(Math.random() * sorted.length)];
//     }
//   };

//   const selectCaptainAndViceCaptain = (
//     players: EnhancedPlayerDetail[],
//     risk: number
//   ): { captain: EnhancedPlayerDetail; viceCaptain: EnhancedPlayerDetail } => {
//     const topPlayers = players.slice(0, Math.ceil(players.length * 0.3));
//     let captain: EnhancedPlayerDetail;
//     let viceCaptain: EnhancedPlayerDetail;
  
//     if (risk < 20) {
//       captain = topPlayers[0];
//       viceCaptain = topPlayers[1] || topPlayers[0];
//     } else if (risk < 40) {
//       captain = topPlayers[0];
//       viceCaptain =
//         topPlayers.find(p => p.normalizedRole !== captain.normalizedRole) ||
//         topPlayers[1] ||
//         topPlayers[0];
//     } else if (risk < 60) {
//       captain = topPlayers[Math.floor(Math.random() * Math.min(3, topPlayers.length))];
//       viceCaptain =
//         topPlayers
//           .slice(0, 5)
//           .find(p => p.normalizedRole !== captain.normalizedRole) ||
//         topPlayers[1] ||
//         topPlayers[0];
//     } else if (risk < 80) {
//       captain = topPlayers[Math.floor(Math.random() * Math.min(5, topPlayers.length))];
//       viceCaptain = topPlayers[Math.floor(Math.random() * Math.min(10, topPlayers.length))];
//     } else {
//       captain = topPlayers[Math.floor(Math.random() * topPlayers.length)];
//       viceCaptain = topPlayers.find(p => p.id !== captain.id) || topPlayers[0];
//     }
  
//     return { captain, viceCaptain };
//   };

//   const validateTeam = (players: EnhancedPlayerDetail[], composition: any, team1Short: string, team2Short: string) => {
//     if (players.length !== 11) return false;
//     if (composition['WK-Batsman'] < 1) return false;
//     const batCount = composition['Batsman'] + composition['Batting Allrounder'];
//     if (batCount < 3) return false;
//     const bowlCount = composition['Bowler'] + composition['Bowling Allrounder'];
//     if (bowlCount < 3) return false;
//     if (composition[team1Short] < 3 || composition[team2Short] < 3) return false;
//     if (composition[team1Short] > 8 || composition[team2Short] > 8) return false;
//     if (composition.overseas > 5) return false;
//     return true;
//   };

//   const createBalancedTeam = useCallback((players: EnhancedPlayerDetail[], existingTeamCount: number) => {
//     if (!team1 || !team2) return null;
    
//     const MAX_ATTEMPTS = 500;
//     const team1Short = team1.shortName || 'T1';
//     const team2Short = team2.shortName || 'T2';
//     const teamRatio = riskLevel >= 50 ? { main: 7, secondary: 4 } : { main: 6, secondary: 5 };
//     const availablePlayers = players.filter(p => 
//       p.selectedBy !== undefined && p.selectedBy > 0 && p.substitute === false
//     );
    
//     if (availablePlayers.length < 11) {
//       setError(`Not enough available players (${availablePlayers.length}/11)`);
//       return null;
//     }
  
//     const sortedPlayers = [...availablePlayers].sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0));
  
//     let attempts = 0;
//     while (attempts < MAX_ATTEMPTS) {
//       attempts++;
      
//       const mainTeam = Math.random() > 0.5 ? team1Short : team2Short;
//       const secondaryTeam = mainTeam === team1Short ? team2Short : team1Short;
      
//       const teamComposition = {
//         'WK-Batsman': 0,
//         'Batsman': 0,
//         'Batting Allrounder': 0,
//         'Bowling Allrounder': 0,
//         'Bowler': 0,
//         [team1Short]: 0,
//         [team2Short]: 0,
//         overseas: 0,
//         totalScore: 0
//       };
  
//       const { captain, viceCaptain } = selectCaptainAndViceCaptain(sortedPlayers, riskLevel);
//       if (!captain || !viceCaptain) continue;
  
//       const teamPlayers: EnhancedPlayerDetail[] = [captain, viceCaptain];
      
//       [captain, viceCaptain].forEach(player => {
//         const role = player.normalizedRole;
//         teamComposition[role]++;
//         teamComposition[player.teamName === team1.name ? team1Short : team2Short]++;
//         if (player.isOverseas) teamComposition.overseas++;
//         teamComposition.totalScore += calculatePlayerScore(player);
//       });
  
//       const remainingPlayers = sortedPlayers.filter(p => 
//         p.id !== captain.id && p.id !== viceCaptain.id
//       );
  
//       let wkAttempts = 0;
//       while (teamComposition['WK-Batsman'] < 1 && wkAttempts < 10) {
//         wkAttempts++;
//         const wkPlayers = remainingPlayers.filter(p => p.normalizedRole === 'WK-Batsman');
//         if (wkPlayers.length === 0) break;
        
//         const wkPlayer = selectPlayerByRisk(wkPlayers, riskLevel);
//         if (!wkPlayer) continue;
        
//         teamPlayers.push(wkPlayer);
//         teamComposition['WK-Batsman']++;
//         teamComposition[wkPlayer.teamName === team1.name ? team1Short : team2Short]++;
//         if (wkPlayer.isOverseas) teamComposition.overseas++;
//         teamComposition.totalScore += calculatePlayerScore(wkPlayer);
        
//         remainingPlayers.splice(remainingPlayers.findIndex(p => p.id === wkPlayer.id), 1);
//       }
  
//       while (teamPlayers.length < 11 && remainingPlayers.length > 0) {
//         const mainTeamCount = teamComposition[mainTeam];
//         const secondaryTeamCount = teamComposition[secondaryTeam];
        
//         let allowedTeams = [];
//         if (mainTeamCount < teamRatio.main) {
//           allowedTeams.push(mainTeam);
//         }
//         if (secondaryTeamCount < teamRatio.secondary) {
//           allowedTeams.push(secondaryTeam);
//         }
        
//         if (allowedTeams.length === 0) {
//           allowedTeams = [mainTeam, secondaryTeam];
//         }
  
//         const neededRoles = getNeededRoles(teamComposition, riskLevel);
        
//         let candidates = remainingPlayers.filter(p => {
//           const team = p.teamName === team1.name ? team1Short : team2Short;
//           const teamAllowed = allowedTeams.includes(team);
//           const overseasOK = !p.isOverseas || teamComposition.overseas < 5;
//           const roleNeeded = neededRoles.includes(p.normalizedRole);
//           return teamAllowed && overseasOK && roleNeeded;
//         });
  
//         if (candidates.length === 0) {
//           candidates = remainingPlayers.filter(p => {
//             const team = p.teamName === team1.name ? team1Short : team2Short;
//             return allowedTeams.includes(team) && 
//                    (!p.isOverseas || teamComposition.overseas < 5);
//           });
//         }
  
//         if (candidates.length === 0) {
//           candidates = remainingPlayers.filter(p => {
//             const team = p.teamName === team1.name ? team1Short : team2Short;
//             return allowedTeams.includes(team);
//           });
//         }
  
//         if (candidates.length === 0) break;
  
//         const selectedPlayer = selectPlayerByRisk(candidates, riskLevel);
//         if (!selectedPlayer) break;
  
//         teamPlayers.push(selectedPlayer);
//         const role = selectedPlayer.normalizedRole;
//         teamComposition[role]++;
//         teamComposition[selectedPlayer.teamName === team1.name ? team1Short : team2Short]++;
//         if (selectedPlayer.isOverseas) teamComposition.overseas++;
//         teamComposition.totalScore += calculatePlayerScore(selectedPlayer);
  
//         remainingPlayers.splice(remainingPlayers.findIndex(p => p.id === selectedPlayer.id), 1);
//       }
  
//       if (teamPlayers.length === 11 && validateTeamWithRatio(teamPlayers, teamComposition, team1Short, team2Short, teamRatio)) {
//         const allAvailablePlayers = players.filter(p => 
//           !teamPlayers.some(tp => tp.id === p.id) && p.substitute === false
//         );
        
//         const substitutes = [...allAvailablePlayers]
//           .sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0))
//           .slice(0, 4);
  
//         return {
//           players: [...teamPlayers].sort((a, b) => (a.roleOrder || 6) - (b.roleOrder || 6)),
//           captain,
//           viceCaptain,
//           substitutes,
//           teamName: `Team ${existingTeamCount + 1}`,
//           teamComposition,
//           riskLevel,
//           matchId,
//           createdAt: new Date().toISOString(),
//           changes: 0
//         };
//       }
//     }
  
//     console.error(`Team generation failed after ${MAX_ATTEMPTS} attempts`);
//     setError(`Failed to generate valid team after ${MAX_ATTEMPTS} attempts. Try adjusting risk level.`);
//     return null;
//   }, [team1, team2, riskLevel, matchId]);

//   const getTeamCountForMatch = async (): Promise<number> => {
//     if (!user || !matchId) return 0;
    
//     try {
//       const q = query(
//         collection(db, "users", user.id, "matches", matchId, "teams"),
//         limit(MAX_TEAMS_PER_MATCH)
//       );
//       const querySnapshot = await getDocs(q);
//       return querySnapshot.size;
//     } catch (err) {
//       console.error("Failed to count teams:", err);
//       return 0;
//     }
//   };

//   const saveTeamToFirestore = async (team: GeneratedTeam) => {
//     if (!user || !matchId) return;
    
//     try {
//       const teamData = {
//         ...team,
//         userId: user.id,
//         userEmail: user.primaryEmailAddress?.emailAddress || '',
//         matchName: `${team1?.name} vs ${team2?.name}`,
//         team1ShortName: team1?.shortName || team1?.name.split(' ').map(n => n[0]).join(''),
//         team2ShortName: team2?.shortName || team2?.name.split(' ').map(n => n[0]).join(''),
//         team1Logo: team1?.logo || '/fallback-team.png',
//         team2Logo: team2?.logo || '/fallback-team.png'
//       };

//       const matchTeamsRef = collection(db, "users", user.id, "matches", matchId, "teams");
//       const teamRef = doc(matchTeamsRef);
      
//       await setDoc(teamRef, teamData);
//       return teamRef.id;
//     } catch (err) {
//       console.error("Failed to save team:", err);
//       throw err;
//     }
//   };

//   const fetchSavedTeams = useCallback(async (): Promise<GeneratedTeam[]> => {
//     if (!user || !matchId) return [];
    
//     try {
//       const q = query(
//         collection(db, "users", user.id, "matches", matchId, "teams"),
//         orderBy("createdAt", "desc"),
//         limit(MAX_TEAMS_PER_MATCH)
//       );
//       const querySnapshot = await getDocs(q);
//       return querySnapshot.docs.map(doc => ({
//         ...doc.data() as GeneratedTeam,
//         id: doc.id
//       }));
//     } catch (err) {
//       console.error("Failed to fetch saved teams:", err);
//       return [];
//     }
//   }, [user, matchId]);

//   useEffect(() => {
//     const loadTeams = async () => {
//       if (!matchId || !user?.id) return;
      
//       try {
//         const savedTeams = localStorage.getItem(localStorageKey);
//         if (savedTeams) {
//           setGeneratedTeams(JSON.parse(savedTeams));
//           return;
//         }

//         const teams = await fetchSavedTeams();
//         if (teams.length > 0) {
//           setGeneratedTeams(teams);
//           localStorage.setItem(localStorageKey, JSON.stringify(teams));
//         }
//       } catch (err) {
//         console.error("Failed to load teams:", err);
//       }
//     };

//     loadTeams();
//   }, [localStorageKey, matchId, user?.id, fetchSavedTeams]);

//   const handleGenerateTeams = useCallback(async () => {
//     if (!team1 || !team2) {
//       setError("Select both teams first");
//       return;
//     }

//     if (!user) {
//       setError("Please sign in to generate teams");
//       return;
//     }

//     const currentTeamCount = await getTeamCountForMatch();
//     if (currentTeamCount >= MAX_TEAMS_PER_MATCH) {
//       setError(`You've reached the maximum of ${MAX_TEAMS_PER_MATCH} teams for this match`);
//       return;
//     }

//     const remainingTeamSlots = MAX_TEAMS_PER_MATCH - currentTeamCount;
//     const teamsToGenerate = Math.min(teamCount, remainingTeamSlots);

//     if (teamsToGenerate <= 0) {
//       setError(`You've reached the maximum of ${MAX_TEAMS_PER_MATCH} teams for this match`);
//       return;
//     }

//     if (needsPayment) {
//       setShowPaymentDialog(true);
//       return;
//     }

//     const allPlayers = getPlayerPool();
//     if (allPlayers.length < 11) {
//       setError(`Not enough players (${allPlayers.length}/11). Please check your filters.`);
//       return;
//     }

//     setIsGenerating(true);
//     setError(null);

//     try {
//       await runTransaction(db, async (transaction) => {
//         const userRef = doc(db, "users", user.id);
//         const userDoc = await transaction.get(userRef);
        
//         if (!userDoc.exists()) throw new Error("User not found");
//         if ((userDoc.data().credits || 0) < requiredCredits) {
//           throw new Error("Insufficient balance");
//         }
        
//         transaction.update(userRef, {
//           credits: increment(-requiredCredits)
//         });
//       });

//       const newTeams: GeneratedTeam[] = [];
//       const TOTAL_ATTEMPTS = teamsToGenerate * 100;
//       let attempts = 0;

//       while (newTeams.length < teamsToGenerate && attempts < TOTAL_ATTEMPTS) {
//         attempts++;
//         const team = createBalancedTeam(allPlayers, currentTeamCount + newTeams.length);
//         if (team) {
//           const teamId = await saveTeamToFirestore(team);
//           newTeams.push({ ...team, id: teamId });
//         }
//       }

//       if (newTeams.length === 0) {
//         throw new Error(
//           `Failed to generate valid teams after ${TOTAL_ATTEMPTS} attempts.\n` +
//           `Player counts: WK: ${roleCounts.wk}, Batsmen: ${roleCounts.batsmen}, ` +
//           `Allrounders: ${roleCounts.allrounders}, Bowlers: ${roleCounts.bowlers}\n` +
//           `Try adjusting your risk level or player filters.`
//         );
//       }

//       const updatedTeams = [...newTeams, ...generatedTeams];
//       setGeneratedTeams(updatedTeams);
//       localStorage.setItem(localStorageKey, JSON.stringify(updatedTeams));
//       onBalanceUpdate(userBalance - requiredCredits);
//     } catch (err: any) {
//       setError(err.message || "Failed to generate teams");
//     } finally {
//       setIsGenerating(false);
//     }
//   }, [
//     team1, team2, teamCount, riskLevel, user, 
//     userBalance, requiredCredits, needsPayment, 
//     onBalanceUpdate, createBalancedTeam, matchId,
//     fetchSavedTeams, getPlayerPool, generatedTeams,
//     localStorageKey, roleCounts, getTeamCountForMatch,
//     saveTeamToFirestore
//   ]);

//   const checkLineupChanges = useCallback(async () => {
//     if (!user?.id || !matchId) return;
    
//     try {
//       const savedTeams = localStorage.getItem(localStorageKey);
//       if (!savedTeams) return;
      
//       const teams: GeneratedTeam[] = JSON.parse(savedTeams);
//       const updatedTeams = [];
      
//       for (const team of teams) {
//         const playersWithStatus = team.players.map(player => ({
//           ...player,
//         }));
        
//         const nonPlayingPlayers = playersWithStatus.filter(p => p.isNowSubstitute);
//         if (nonPlayingPlayers.length === 0) {
//           updatedTeams.push(team);
//           continue;
//         }
        
//         const playingPlayers = playersWithStatus.filter(p => !p.isNowSubstitute);
//         const availableSubstitutes = team.substitutes?.filter(sub => 
//           !playingPlayers.some(p => p.id === sub.id)
//         ) || [];
        
//         let newPlayers = [...playingPlayers];
        
//         for (const nonPlayer of nonPlayingPlayers) {
//           const replacement = availableSubstitutes.find(sub => 
//             normalizeRole(sub.role) === normalizeRole(nonPlayer.role)
//           );
          
//           if (replacement) {
//             newPlayers.push(replacement);
//             availableSubstitutes.splice(availableSubstitutes.indexOf(replacement), 1);
//           } else {
//             newPlayers.push(nonPlayer);
//           }
//         }
        
//         updatedTeams.push({
//           ...team,
//           players: newPlayers,
//           captain: newPlayers.find(p => p.id === team.captain.id) || team.captain,
//           viceCaptain: newPlayers.find(p => p.id === team.viceCaptain.id) || team.viceCaptain,
//           updatedAt: new Date().toISOString(),
//           hadChanges: nonPlayingPlayers.length > 0
//         });
//       }
      
//       localStorage.setItem(localStorageKey, JSON.stringify(updatedTeams));
//       setGeneratedTeams(updatedTeams);
      
//       if (updatedTeams.some(t => t.hadChanges)) {
//         alert('🔥 Minimum 10 Teams Needed to Win the Dream Team Mega Winnings 🏆');
//       }
      
//     } catch (err) {
//       console.error("Failed to check lineup changes:", err);
//     }
//   }, [user?.id, matchId, localStorageKey]);

//   const checkIfPlayerIsSubstitute = (playerId: string): boolean => {
//     return Math.random() < 0.1;
//   };

//   const generateButton = (
//     <div className="space-y-2">
//       <button
//         onClick={handleGenerateTeams}
//         disabled={isGenerating || !team1 || !team2}
//         className={`
//           w-full px-4 py-3 rounded-md font-bold
//           ${isGenerating ? 'bg-gray-500' : 
//            needsPayment ? 'bg-yellow-500 hover:bg-yellow-600' : 
//            'bg-blue-500 hover:bg-blue-600'}
//           text-white transition-colors
//         `}
//       >
//         {isGenerating ? (
//           <span className="flex items-center justify-center gap-2">
//             <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//             </svg>
//             Generating...
//           </span>
//         ) : !team1 || !team2 ? (
//           "Select both teams"
//         ) : needsPayment ? (
//           `Add ₹${paymentAmount} to Generate team`
//         ) : (
//           `Generate ${teamCount} Teams (₹${requiredCredits})`
//         )}
//       </button>

//       <div className="flex justify-between text-sm">
//         <span>Your Credits: <span className='text-green-500'>₹{userBalance} </span> </span>
//         {needsPayment ? (
//           <span className="text-red-500">Need ₹{paymentAmount} more</span>
//         ) : (
//           <span className="text-green-500">Sufficient balance</span>
//         )}
//       </div>

//       {error && (
//         <div className="text-red-500 text-sm p-2 bg-red-50 rounded-lg">
//           <p className="font-medium">{error}</p>
//           {error.includes("Player counts") && (
//             <div className="mt-2 text-xs">
//               <p>Current player counts:</p>
//               <ul className="list-disc pl-5">
//                 <li>WK-Batsman: {roleCounts.wk} (min 1)</li>
//                 <li>Batsmen: {roleCounts.batsmen} (min 3 including allrounders)</li>
//                 <li>Bowlers: {roleCounts.bowlers} (min 3 including allrounders)</li>
//               </ul>
//               <p className="mt-1">Try adjusting filters or risk level.</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );

//   const paymentDialog = showPaymentDialog && (
//     <PaymentDialog
//       currentBalance={userBalance}
//       requiredAmount={paymentAmount}
//       onPaymentSuccess={(amount) => {
//         onBalanceUpdate(userBalance + amount);
//         setShowPaymentDialog(false);
//         handleGenerateTeams();
//       }}
//       onOpenChange={setShowPaymentDialog}
//       open={showPaymentDialog}
//       onProcessingStateChange={setIsGenerating}
//     />
//   );

//   return {
//     generatedTeams,
//     isGenerating,
//     generateButton,
//     paymentDialog,
//     error,
//     setError,
//     fetchSavedTeams,
//     setGeneratedTeams,
//     checkLineupChanges
//   };
// };














// // THIS IS ORIGINAL



// "use client";
// import { useState, useCallback, useMemo, useEffect } from "react";
// import { PaymentDialog } from "./PaymentDialog";
// import { Team, PlayerDetail, GeneratedTeam } from "../../types/match";
// import { db } from "@/lib/firebase";
// import { 
//   doc, 
//   runTransaction, 
//   increment, 
//   setDoc, 
//   collection, 
//   query, 
//   orderBy, 
//   getDocs,
//   limit
// } from "firebase/firestore";
// import { useUser } from "@clerk/nextjs";

// interface TeamGeneratorProps {
//   team1?: Team;
//   team2?: Team;
//   teamCount: number;
//   riskLevel: number;
//   userBalance: number;
//   onBalanceUpdate: (newBalance: number) => void;
//   matchId: string;
// }

// interface EnhancedPlayerDetail extends PlayerDetail {
//   roleOrder: number;
//   selectedBy: number;
//   selCapPerc?: number;
//   selVcPerc?: number;
//   normalizedRole: string;
// }

// export const useTeamGenerator = ({ 
//   team1, 
//   team2, 
//   teamCount, 
//   riskLevel,
//   userBalance,
//   onBalanceUpdate,
//   matchId
// }: TeamGeneratorProps) => {
//   const { user } = useUser();
//   const [generatedTeams, setGeneratedTeams] = useState<GeneratedTeam[]>([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [showPaymentDialog, setShowPaymentDialog] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [roleCounts, setRoleCounts] = useState({
//     wk: 0,
//     batsmen: 0,
//     allrounders: 0,
//     bowlers: 0
//   });

//   const MAX_TEAMS_PER_MATCH = 20;
//   const MIN_TEAMS_FOR_GRAND_LEAGUE = 10;
//   const requiredCredits = useMemo(() => teamCount * 100, [teamCount]);
//   const needsPayment = useMemo(() => userBalance < requiredCredits, [userBalance, requiredCredits]);
//   const paymentAmount = useMemo(() => Math.max(requiredCredits - userBalance, 100), [requiredCredits, userBalance]);
//   const localStorageKey = useMemo(() => `matchTeams_${matchId}_${user?.id}`, [matchId, user?.id]);

//   // Function to show team count messages
//   const showTeamCountMessage = (currentTeamCount: number) => {
//     const teamsNeeded = MIN_TEAMS_FOR_GRAND_LEAGUE - currentTeamCount;

//     if (teamsNeeded > 0) {
//       alert(`🔥 You need ${teamsNeeded} more teams to qualify for Grand League prizes! 
//             Create at least ${MIN_TEAMS_FOR_GRAND_LEAGUE} teams to compete for the mega winnings 🏆`);
//     } else if (currentTeamCount >= MIN_TEAMS_FOR_GRAND_LEAGUE) {
//       alert('🎉 Congratulations! You have qualified for Grand League prizes with your teams!');
//     }
//   };

//   const getRoleOrder = (role: string): number => {
//     const normalized = normalizeRole(role);
//     switch(normalized) {
//       case 'WK-Batsman': return 1;
//       case 'Batsman': return 2;
//       case 'Batting Allrounder': return 3;
//       case 'Bowling Allrounder': return 4;
//       case 'Bowler': return 5;
//       default: return 6;
//     }
//   };

//   const normalizeRole = (role: string): string => {
//     if (!role) return 'Bowler';
//     const lowerRole = role.toLowerCase().trim();
//     if (lowerRole.includes('keep') || lowerRole.includes('wk')) return 'WK-Batsman';
//     if (lowerRole.includes('bat') && lowerRole.includes('all')) return 'Batting Allrounder';
//     if (lowerRole.includes('bowl') && lowerRole.includes('all')) return 'Bowling Allrounder';
//     if (lowerRole.includes('bat')) return 'Batsman';
//     if (lowerRole.includes('bowl')) return 'Bowler';
//     if (lowerRole.includes('all')) return 'Bowling Allrounder';
//     return 'Bowler';
//   };

//   const getNeededRoles = (composition: any, riskLevel: number): string[] => {
//     const neededRoles: string[] = [];
    
//     if (composition['WK-Batsman'] < 1) neededRoles.push('WK-Batsman');
    
//     if (riskLevel < 50) {
//       if (composition['Batsman'] + composition['Batting Allrounder'] < 4) {
//         neededRoles.push('Batsman', 'Batting Allrounder');
//       }
//       if (composition['Bowler'] + composition['Bowling Allrounder'] < 4) {
//         neededRoles.push('Bowler', 'Bowling Allrounder');
//       }
//     } else {
//       if (composition['Batsman'] + composition['Batting Allrounder'] < 5) {
//         neededRoles.push('Batsman', 'Batting Allrounder');
//       }
//       if (composition['Bowler'] + composition['Bowling Allrounder'] < 3) {
//         neededRoles.push('Bowler', 'Bowling Allrounder');
//       }
//     }
    
//     return neededRoles.length > 0 ? neededRoles : 
//       ['Batsman', 'Batting Allrounder', 'Bowling Allrounder', 'Bowler'];
//   };

//   const validateTeamWithRatio = (
//     players: EnhancedPlayerDetail[],
//     composition: any,
//     team1Short: string,
//     team2Short: string,
//     teamRatio: { main: number; secondary: number }
//   ) => {
//     if (players.length !== 11) return false;
//     const mainTeam = composition[team1Short] >= composition[team2Short] ? team1Short : team2Short;
//     const secondaryTeam = mainTeam === team1Short ? team2Short : team1Short;
    
//     if (composition[mainTeam] !== teamRatio.main || composition[secondaryTeam] !== teamRatio.secondary) {
//       return false;
//     }
//     if (composition['WK-Batsman'] < 1) return false;
//     const batCount = composition['Batsman'] + composition['Batting Allrounder'];
//     if (batCount < 3) return false;
//     const bowlCount = composition['Bowler'] + composition['Bowling Allrounder'];
//     if (bowlCount < 3) return false;
//     if (composition.overseas > 5) return false;
//     return true;
//   };

//   const getPlayerPool = useCallback((): EnhancedPlayerDetail[] => {
//     if (!team1 || !team2) return [];
    
//     const team1Players = team1.playerDetails?.filter(p => p.substitute === false) || [];
//     const team2Players = team2.playerDetails?.filter(p => p.substitute === false) || [];
    
//     const allPlayers = [...team1Players, ...team2Players].map(p => ({
//       ...p,
//       roleOrder: getRoleOrder(p.role),
//       normalizedRole: normalizeRole(p.role),
//       selectedBy: p.selectedBy || 0.1,
//       selCapPerc: p.selCapPerc || 0.1,
//       selVcPerc: p.selVcPerc || 0.1,
//       isPlaying: true
//     }));

//     const wkPlayers = allPlayers.filter(p => p.normalizedRole === 'WK-Batsman');
//     const batPlayers = allPlayers.filter(p => 
//       ['Batsman', 'Batting Allrounder'].includes(p.normalizedRole)
//     );
//     const bowlPlayers = allPlayers.filter(p => 
//       ['Bowler', 'Bowling Allrounder'].includes(p.normalizedRole)
//     );
//     const allPlayersCount = allPlayers.filter(p => 
//       ['Bowling Allrounder', 'Batting Allrounder'].includes(p.normalizedRole)
//     );

//     setRoleCounts({
//       wk: wkPlayers.length,
//       batsmen: batPlayers.length,
//       allrounders: allPlayersCount.length,
//       bowlers: bowlPlayers.length
//     });

//     if (wkPlayers.length < 1) {
//       setError(`Need at least 1 WK-Batsman (available: ${wkPlayers.length})`);
//       return [];
//     }
//     if (batPlayers.length < 3) {
//       setError(`Need at least 3 Batsmen (available: ${batPlayers.length})`);
//       return [];
//     }
//     if (bowlPlayers.length < 3) {
//       setError(`Need at least 3 Bowlers (available: ${bowlPlayers.length})`);
//       return [];
//     }

//     return allPlayers;
//   }, [team1, team2]);

//   const calculatePlayerScore = (player: EnhancedPlayerDetail, forCaptaincy = false) => {
//     const baseScore = forCaptaincy ? 
//       (player.selCapPerc || player.selectedBy) : 
//       (player.selectedBy);
    
//     let riskFactor = 1;
//     if (riskLevel < 20) {
//       riskFactor = 1 + (Math.random() * 0.1);
//     } else if (riskLevel < 40) {
//       riskFactor = 0.9 + (Math.random() * 0.2);
//     } else if (riskLevel < 60) {
//       riskFactor = 0.8 + (Math.random() * 0.4);
//     } else if (riskLevel < 80) {
//       riskFactor = 0.6 + (Math.random() * 0.6);
//     } else {
//       riskFactor = 0.4 + (Math.random() * 0.8);
//     }
    
//     return baseScore * riskFactor;
//   };

//   const getTeamCompositionByRisk = () => {
//     if (riskLevel < 20) return { wk: 1, bat: 4, ar: 2, bowl: 4 };
//     if (riskLevel < 40) return { wk: 1, bat: 3, ar: 3, bowl: 4 };
//     if (riskLevel < 60) return { wk: 1, bat: 3, ar: 4, bowl: 3 };
//     if (riskLevel < 80) return { wk: 1, bat: 5, ar: 3, bowl: 2 };
//     return Math.random() > 0.5 
//       ? { wk: 1, bat: 6, ar: 2, bowl: 2 } 
//       : { wk: 1, bat: 2, ar: 4, bowl: 4 };
//   };

//   const weightedRandomPick = (players: EnhancedPlayerDetail[], field: 'selectedBy' | 'selCapPerc' | 'selVcPerc') => {
//     const totalWeight = players.reduce((sum, p) => sum + (p[field] || 0.1), 0);
//     let random = Math.random() * totalWeight;
    
//     for (const player of players) {
//       random -= player[field] || 0.1;
//       if (random <= 0) return player;
//     }
//     return players[0];
//   };

//   const selectPlayerByRisk = (players: EnhancedPlayerDetail[], risk: number) => {
//     if (players.length === 0) return null;
//     const sorted = [...players].sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0));

//     if (risk < 20) {
//       const topCount = Math.max(1, Math.ceil(sorted.length * 0.2));
//       return sorted[Math.floor(Math.random() * topCount)];
//     } else if (risk < 40) {
//       const topCount = Math.max(1, Math.ceil(sorted.length * 0.4));
//       return weightedRandomPick(sorted.slice(0, topCount), 'selectedBy');
//     } else if (risk < 60) {
//       const topCount = Math.max(1, Math.ceil(sorted.length * 0.6));
//       return Math.random() > 0.7 
//         ? sorted[Math.floor(Math.random() * sorted.length)]
//         : weightedRandomPick(sorted.slice(0, topCount), 'selectedBy');
//     } else if (risk < 80) {
//       return Math.random() > 0.5 
//         ? weightedRandomPick(sorted, 'selectedBy')
//         : sorted[Math.floor(Math.random() * sorted.length)];
//     } else {
//       return sorted[Math.floor(Math.random() * sorted.length)];
//     }
//   };

//   const selectCaptainAndViceCaptain = (
//     players: EnhancedPlayerDetail[],
//     risk: number,
//     existingTeams: GeneratedTeam[] = []
//   ): { captain: EnhancedPlayerDetail; viceCaptain: EnhancedPlayerDetail } => {
//     const topPlayers = players.slice(0, Math.ceil(players.length * 0.3));
//     let attempts = 0;
//     const MAX_ATTEMPTS = 20;
    
//     const recentCombinations = existingTeams.slice(0, 5).map(t => 
//       `${t.captain.id}-${t.viceCaptain.id}`
//     );

//     while (attempts < MAX_ATTEMPTS) {
//       attempts++;
      
//       let captain: EnhancedPlayerDetail;
//       let viceCaptain: EnhancedPlayerDetail;

//       if (risk < 20) {
//         captain = topPlayers[0];
//         viceCaptain = topPlayers[1] || topPlayers[0];
//       } else if (risk < 40) {
//         captain = topPlayers[0];
//         viceCaptain =
//           topPlayers.find(p => p.normalizedRole !== captain.normalizedRole) ||
//           topPlayers[1] ||
//           topPlayers[0];
//       } else if (risk < 60) {
//         captain = topPlayers[Math.floor(Math.random() * Math.min(3, topPlayers.length))];
//         viceCaptain =
//           topPlayers
//             .slice(0, 5)
//             .find(p => p.normalizedRole !== captain.normalizedRole) ||
//           topPlayers[1] ||
//           topPlayers[0];
//       } else if (risk < 80) {
//         captain = topPlayers[Math.floor(Math.random() * Math.min(5, topPlayers.length))];
//         viceCaptain = topPlayers[Math.floor(Math.random() * Math.min(10, topPlayers.length))];
//       } else {
//         captain = topPlayers[Math.floor(Math.random() * topPlayers.length)];
//         viceCaptain = topPlayers.find(p => p.id !== captain.id) || topPlayers[0];
//       }

//       const comboKey = `${captain.id}-${viceCaptain.id}`;
      
//       if (!recentCombinations.includes(comboKey) || attempts >= MAX_ATTEMPTS - 5) {
//         return { captain, viceCaptain };
//       }
//     }

//     return { 
//       captain: topPlayers[0], 
//       viceCaptain: topPlayers[1] || topPlayers[0] 
//     };
//   };

//   const validateTeam = (players: EnhancedPlayerDetail[], composition: any, team1Short: string, team2Short: string) => {
//     if (players.length !== 11) return false;
//     if (composition['WK-Batsman'] < 1) return false;
//     const batCount = composition['Batsman'] + composition['Batting Allrounder'];
//     if (batCount < 3) return false;
//     const bowlCount = composition['Bowler'] + composition['Bowling Allrounder'];
//     if (bowlCount < 3) return false;
//     if (composition[team1Short] < 3 || composition[team2Short] < 3) return false;
//     if (composition[team1Short] > 8 || composition[team2Short] > 8) return false;
//     if (composition.overseas > 5) return false;
//     return true;
//   };

//   const createBalancedTeam = useCallback((
//     players: EnhancedPlayerDetail[], 
//     existingTeamCount: number,
//     existingTeams: GeneratedTeam[] = []
//   ) => {
//     if (!team1 || !team2) return null;
    
//     const MAX_ATTEMPTS = 500;
//     const team1Short = team1.shortName || 'T1';
//     const team2Short = team2.shortName || 'T2';
//     const teamRatio = riskLevel >= 50 ? { main: 7, secondary: 4 } : { main: 6, secondary: 5 };
//     const availablePlayers = players.filter(p => 
//       p.selectedBy !== undefined && p.selectedBy > 0 && p.substitute === false
//     );
    
//     if (availablePlayers.length < 11) {
//       setError(`Not enough available players (${availablePlayers.length}/11)`);
//       return null;
//     }
  
//     const sortedPlayers = [...availablePlayers].sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0));
  
//     let attempts = 0;
//     while (attempts < MAX_ATTEMPTS) {
//       attempts++;
      
//       const mainTeam = Math.random() > 0.5 ? team1Short : team2Short;
//       const secondaryTeam = mainTeam === team1Short ? team2Short : team1Short;
      
//       const teamComposition = {
//         'WK-Batsman': 0,
//         'Batsman': 0,
//         'Batting Allrounder': 0,
//         'Bowling Allrounder': 0,
//         'Bowler': 0,
//         [team1Short]: 0,
//         [team2Short]: 0,
//         overseas: 0,
//         totalScore: 0
//       };
  
//       const { captain, viceCaptain } = selectCaptainAndViceCaptain(
//         sortedPlayers, 
//         riskLevel,
//         existingTeams
//       );
//       if (!captain || !viceCaptain) continue;
  
//       const teamPlayers: EnhancedPlayerDetail[] = [captain, viceCaptain];
      
//       [captain, viceCaptain].forEach(player => {
//         const role = player.normalizedRole;
//         teamComposition[role]++;
//         teamComposition[player.teamName === team1.name ? team1Short : team2Short]++;
//         if (player.isOverseas) teamComposition.overseas++;
//         teamComposition.totalScore += calculatePlayerScore(player);
//       });
  
//       const remainingPlayers = sortedPlayers.filter(p => 
//         !teamPlayers.some(tp => tp.id === p.id) &&
//         p.id !== captain.id && 
//         p.id !== viceCaptain.id
//       );
  
//       let wkAttempts = 0;
//       while (teamComposition['WK-Batsman'] < 1 && wkAttempts < 10) {
//         wkAttempts++;
//         const wkPlayers = remainingPlayers.filter(p => p.normalizedRole === 'WK-Batsman');
//         if (wkPlayers.length === 0) break;
        
//         const wkPlayer = selectPlayerByRisk(wkPlayers, riskLevel);
//         if (!wkPlayer || teamPlayers.some(p => p.id === wkPlayer.id)) continue;
        
//         teamPlayers.push(wkPlayer);
//         teamComposition['WK-Batsman']++;
//         teamComposition[wkPlayer.teamName === team1.name ? team1Short : team2Short]++;
//         if (wkPlayer.isOverseas) teamComposition.overseas++;
//         teamComposition.totalScore += calculatePlayerScore(wkPlayer);
        
//         remainingPlayers.splice(remainingPlayers.findIndex(p => p.id === wkPlayer.id), 1);
//       }
  
//       while (teamPlayers.length < 11 && remainingPlayers.length > 0) {
//         const mainTeamCount = teamComposition[mainTeam];
//         const secondaryTeamCount = teamComposition[secondaryTeam];
        
//         let allowedTeams = [];
//         if (mainTeamCount < teamRatio.main) {
//           allowedTeams.push(mainTeam);
//         }
//         if (secondaryTeamCount < teamRatio.secondary) {
//           allowedTeams.push(secondaryTeam);
//         }
        
//         if (allowedTeams.length === 0) {
//           allowedTeams = [mainTeam, secondaryTeam];
//         }
  
//         const neededRoles = getNeededRoles(teamComposition, riskLevel);
        
//         let candidates = remainingPlayers.filter(p => {
//           const team = p.teamName === team1.name ? team1Short : team2Short;
//           const teamAllowed = allowedTeams.includes(team);
//           const overseasOK = !p.isOverseas || teamComposition.overseas < 5;
//           const roleNeeded = neededRoles.includes(p.normalizedRole);
//           return teamAllowed && overseasOK && roleNeeded;
//         });
  
//         if (candidates.length === 0) {
//           candidates = remainingPlayers.filter(p => {
//             const team = p.teamName === team1.name ? team1Short : team2Short;
//             return allowedTeams.includes(team) && 
//                    (!p.isOverseas || teamComposition.overseas < 5);
//           });
//         }
  
//         if (candidates.length === 0) {
//           candidates = remainingPlayers.filter(p => {
//             const team = p.teamName === team1.name ? team1Short : team2Short;
//             return allowedTeams.includes(team);
//           });
//         }
  
//         if (candidates.length === 0) break;
  
//         const selectedPlayer = selectPlayerByRisk(candidates, riskLevel);
//         if (!selectedPlayer || teamPlayers.some(p => p.id === selectedPlayer.id)) {
//           break;
//         }
  
//         teamPlayers.push(selectedPlayer);
//         const role = selectedPlayer.normalizedRole;
//         teamComposition[role]++;
//         teamComposition[selectedPlayer.teamName === team1.name ? team1Short : team2Short]++;
//         if (selectedPlayer.isOverseas) teamComposition.overseas++;
//         teamComposition.totalScore += calculatePlayerScore(selectedPlayer);
  
//         remainingPlayers.splice(remainingPlayers.findIndex(p => p.id === selectedPlayer.id), 1);
//       }
  
//       if (teamPlayers.length === 11 && validateTeamWithRatio(teamPlayers, teamComposition, team1Short, team2Short, teamRatio)) {
//         const allAvailablePlayers = players.filter(p => 
//           !teamPlayers.some(tp => tp.id === p.id) && p.substitute === false
//         );
        
//         const substitutes = [...allAvailablePlayers]
//           .sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0))
//           .slice(0, 4);
  
//         return {
//           players: [...teamPlayers].sort((a, b) => (a.roleOrder || 6) - (b.roleOrder || 6)),
//           captain,
//           viceCaptain,
//           substitutes,
//           teamName: `Team ${existingTeamCount + 1}`,
//           teamComposition,
//           riskLevel,
//           matchId,
//           createdAt: new Date().toISOString(),
//           changes: 0
//         };
//       }
//     }
  
//     console.error(`Team generation failed after ${MAX_ATTEMPTS} attempts`);
//     setError(`Failed to generate valid team after ${MAX_ATTEMPTS} attempts. Try adjusting risk level.`);
//     return null;
//   }, [team1, team2, riskLevel, matchId]);

//   const getTeamCountForMatch = async (): Promise<number> => {
//     if (!user || !matchId) return 0;
    
//     try {
//       const q = query(
//         collection(db, "users", user.id, "matches", matchId, "teams"),
//         limit(MAX_TEAMS_PER_MATCH)
//       );
//       const querySnapshot = await getDocs(q);
//       return querySnapshot.size;
//     } catch (err) {
//       console.error("Failed to count teams:", err);
//       return 0;
//     }
//   };

//   const saveTeamToFirestore = async (team: GeneratedTeam) => {
//     if (!user || !matchId) return;
    
//     try {
//       const teamData = {
//         ...team,
//         userId: user.id,
//         userEmail: user.primaryEmailAddress?.emailAddress || '',
//         matchName: `${team1?.name} vs ${team2?.name}`,
//         team1ShortName: team1?.shortName || team1?.name.split(' ').map(n => n[0]).join(''),
//         team2ShortName: team2?.shortName || team2?.name.split(' ').map(n => n[0]).join(''),
//         team1Logo: team1?.logo || '/fallback-team.png',
//         team2Logo: team2?.logo || '/fallback-team.png'
//       };

//       const matchTeamsRef = collection(db, "users", user.id, "matches", matchId, "teams");
//       const teamRef = doc(matchTeamsRef);
      
//       await setDoc(teamRef, teamData);
//       return teamRef.id;
//     } catch (err) {
//       console.error("Failed to save team:", err);
//       throw err;
//     }
//   };

//   const fetchSavedTeams = useCallback(async (): Promise<GeneratedTeam[]> => {
//     if (!user || !matchId) return [];
    
//     try {
//       const q = query(
//         collection(db, "users", user.id, "matches", matchId, "teams"),
//         orderBy("createdAt", "desc"),
//         limit(MAX_TEAMS_PER_MATCH)
//       );
//       const querySnapshot = await getDocs(q);
//       return querySnapshot.docs.map(doc => ({
//         ...doc.data() as GeneratedTeam,
//         id: doc.id
//       }));
//     } catch (err) {
//       console.error("Failed to fetch saved teams:", err);
//       return [];
//     }
//   }, [user, matchId]);

//   useEffect(() => {
//     const loadTeams = async () => {
//       if (!matchId || !user?.id) return;
      
//       try {
//         const savedTeams = localStorage.getItem(localStorageKey);
//         if (savedTeams) {
//           setGeneratedTeams(JSON.parse(savedTeams));
//           return;
//         }

//         const teams = await fetchSavedTeams();
//         if (teams.length > 0) {
//           setGeneratedTeams(teams);
//           localStorage.setItem(localStorageKey, JSON.stringify(teams));
//           // Show team count message when loading existing teams
//           showTeamCountMessage(teams.length);
//         }
//       } catch (err) {
//         console.error("Failed to load teams:", err);
//       }
//     };

//     loadTeams();
//   }, [localStorageKey, matchId, user?.id, fetchSavedTeams]);

//   const handleGenerateTeams = useCallback(async () => {
//     if (!team1 || !team2) {
//       setError("Select both teams first");
//       return;
//     }

//     if (!user) {
//       setError("Please sign in to generate teams");
//       return;
//     }

//     const currentTeamCount = await getTeamCountForMatch();
//     if (currentTeamCount >= MAX_TEAMS_PER_MATCH) {
//       setError(`You've reached the maximum of ${MAX_TEAMS_PER_MATCH} teams for this match`);
//       return;
//     }

//     const remainingTeamSlots = MAX_TEAMS_PER_MATCH - currentTeamCount;
//     const teamsToGenerate = Math.min(teamCount, remainingTeamSlots);

//     if (teamsToGenerate <= 0) {
//       setError(`You've reached the maximum of ${MAX_TEAMS_PER_MATCH} teams for this match`);
//       return;
//     }

//     if (needsPayment) {
//       setShowPaymentDialog(true);
//       return;
//     }

//     const allPlayers = getPlayerPool();
//     if (allPlayers.length < 11) {
//       setError(`Not enough players (${allPlayers.length}/11). Please check your filters.`);
//       return;
//     }

//     setIsGenerating(true);
//     setError(null);

//     try {
//       await runTransaction(db, async (transaction) => {
//         const userRef = doc(db, "users", user.id);
//         const userDoc = await transaction.get(userRef);
        
//         if (!userDoc.exists()) throw new Error("User not found");
//         if ((userDoc.data().credits || 0) < requiredCredits) {
//           throw new Error("Insufficient balance");
//         }
        
//         transaction.update(userRef, {
//           credits: increment(-requiredCredits)
//         });
//       });

//       const newTeams: GeneratedTeam[] = [];
//       const TOTAL_ATTEMPTS = teamsToGenerate * 100;
//       let attempts = 0;

//       while (newTeams.length < teamsToGenerate && attempts < TOTAL_ATTEMPTS) {
//         attempts++;
//         const team = createBalancedTeam(allPlayers, currentTeamCount + newTeams.length, newTeams);
        
//         if (team) {
//           const isUnique = newTeams.every(existingTeam => {
//             const existingPlayers = existingTeam.players.map(p => p.id).sort();
//             const newPlayers = team.players.map(p => p.id).sort();
//             const diffCount = existingPlayers.filter(id => !newPlayers.includes(id)).length;
//             return diffCount >= 3;
//           });

//           if (isUnique || newTeams.length === 0) {
//             const teamId = await saveTeamToFirestore(team);
//             newTeams.push({ ...team, id: teamId });
//           }
//         }
//       }

//       if (newTeams.length === 0) {
//         throw new Error(
//           `Failed to generate valid teams after ${TOTAL_ATTEMPTS} attempts.\n` +
//           `Player counts: WK: ${roleCounts.wk}, Batsmen: ${roleCounts.batsmen}, ` +
//           `Allrounders: ${roleCounts.allrounders}, Bowlers: ${roleCounts.bowlers}\n` +
//           `Try adjusting your risk level or player filters.`
//         );
//       }

//       const updatedTeams = [...newTeams, ...generatedTeams];
//       setGeneratedTeams(updatedTeams);
//       localStorage.setItem(localStorageKey, JSON.stringify(updatedTeams));
//       onBalanceUpdate(userBalance - requiredCredits);

//       // Show team count message after successful generation
//       const updatedTeamCount = currentTeamCount + newTeams.length;
//       showTeamCountMessage(updatedTeamCount);

//     } catch (err: any) {
//       setError(err.message || "Failed to generate teams");
//     } finally {
//       setIsGenerating(false);
//     }
//   }, [
//     team1, team2, teamCount, riskLevel, user, 
//     userBalance, requiredCredits, needsPayment, 
//     onBalanceUpdate, createBalancedTeam, matchId,
//     fetchSavedTeams, getPlayerPool, generatedTeams,
//     localStorageKey, roleCounts, getTeamCountForMatch,
//     saveTeamToFirestore
//   ]);

//   const checkLineupChanges = useCallback(async () => {
//     if (!user?.id || !matchId) return;
    
//     try {
//       const savedTeams = localStorage.getItem(localStorageKey);
//       if (!savedTeams) return;
      
//       const teams: GeneratedTeam[] = JSON.parse(savedTeams);
//       const updatedTeams = [];
      
//       for (const team of teams) {
//         const playersWithStatus = team.players.map(player => ({
//           ...player,
//         }));
        
//         const nonPlayingPlayers = playersWithStatus.filter(p => p.isNowSubstitute);
//         if (nonPlayingPlayers.length === 0) {
//           updatedTeams.push(team);
//           continue;
//         }
        
//         const playingPlayers = playersWithStatus.filter(p => !p.isNowSubstitute);
//         const availableSubstitutes = team.substitutes?.filter(sub => 
//           !playingPlayers.some(p => p.id === sub.id)
//         ) || [];
        
//         let newPlayers = [...playingPlayers];
        
//         for (const nonPlayer of nonPlayingPlayers) {
//           const replacement = availableSubstitutes.find(sub => 
//             normalizeRole(sub.role) === normalizeRole(nonPlayer.role)
//           );
          
//           if (replacement) {
//             newPlayers.push(replacement);
//             availableSubstitutes.splice(availableSubstitutes.indexOf(replacement), 1);
//           } else {
//             newPlayers.push(nonPlayer);
//           }
//         }
        
//         updatedTeams.push({
//           ...team,
//           players: newPlayers,
//           captain: newPlayers.find(p => p.id === team.captain.id) || team.captain,
//           viceCaptain: newPlayers.find(p => p.id === team.viceCaptain.id) || team.viceCaptain,
//           updatedAt: new Date().toISOString(),
//           hadChanges: nonPlayingPlayers.length > 0
//         });
//       }
      
//       localStorage.setItem(localStorageKey, JSON.stringify(updatedTeams));
//       setGeneratedTeams(updatedTeams);
      
//       if (updatedTeams.some(t => t.hadChanges)) {
//         // Show team count message when lineup changes are detected
//         const currentTeamCount = updatedTeams.length;
//         showTeamCountMessage(currentTeamCount);
//       }
      
//     } catch (err) {
//       console.error("Failed to check lineup changes:", err);
//     }
//   }, [user?.id, matchId, localStorageKey]);

//   const checkIfPlayerIsSubstitute = (playerId: string): boolean => {
//     return Math.random() < 0.1;
//   };

//   const generateButton = (
//     <div className="space-y-2">
//       <button
//         onClick={handleGenerateTeams}
//         disabled={isGenerating || !team1 || !team2}
//         className={`
//           w-full px-4 py-3 rounded-md font-bold
//           ${isGenerating ? 'bg-gray-500' : 
//            needsPayment ? 'bg-yellow-500 hover:bg-yellow-600' : 
//            'bg-blue-500 hover:bg-blue-600'}
//           text-white transition-colors
//         `}
//       >
//         {isGenerating ? (
//           <span className="flex items-center justify-center gap-2">
//             <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//             </svg>
//             Generating...
//           </span>
//         ) : !team1 || !team2 ? (
//           "Select both teams"
//         ) : needsPayment ? (
//           `Add ₹${paymentAmount} to Generate team`
//         ) : (
//           `Generate ${teamCount} Teams (₹${requiredCredits})`
//         )}
//       </button>

//       <div className="flex justify-between text-sm">
//         <span>Your Credits: <span className='text-green-500'>₹{userBalance} </span> </span>
//         {needsPayment ? (
//           <span className="text-red-500">Need ₹{paymentAmount} more</span>
//         ) : (
//           <span className="text-green-500">Sufficient balance</span>
//         )}
//       </div>

//       {error && (
//         <div className="text-red-500 text-sm p-2 bg-red-50 rounded-lg">
//           <p className="font-medium">{error}</p>
//           {error.includes("Player counts") && (
//             <div className="mt-2 text-xs">
//               <p>Current player counts:</p>
//               <ul className="list-disc pl-5">
//                 <li>WK-Batsman: {roleCounts.wk} (min 1)</li>
//                 <li>Batsmen: {roleCounts.batsmen} (min 3 including allrounders)</li>
//                 <li>Bowlers: {roleCounts.bowlers} (min 3 including allrounders)</li>
//               </ul>
//               <p className="mt-1">Try adjusting filters or risk level.</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );

//   const paymentDialog = showPaymentDialog && (
//     <PaymentDialog
//       currentBalance={userBalance}
//       requiredAmount={paymentAmount}
//       onPaymentSuccess={(amount) => {
//         onBalanceUpdate(userBalance + amount);
//         setShowPaymentDialog(false);
//         handleGenerateTeams();
//       }}
//       onOpenChange={setShowPaymentDialog}
//       open={showPaymentDialog}
//       onProcessingStateChange={setIsGenerating}
//     />
//   );

//   return {
//     generatedTeams,
//     isGenerating,
//     generateButton,
//     paymentDialog,
//     error,
//     setError,
//     fetchSavedTeams,
//     setGeneratedTeams,
//     checkLineupChanges
//   };
// };








// // THIS IS ORIGINAL



// "use client";
// import { useState, useCallback, useMemo, useEffect } from "react";
// import { PaymentDialog } from "./PaymentDialog";
// import { Team, PlayerDetail, GeneratedTeam } from "../../types/match";
// import { db } from "@/lib/firebase";
// import { 
//   doc, 
//   runTransaction, 
//   increment, 
//   setDoc, 
//   collection, 
//   query, 
//   orderBy, 
//   getDocs,
//   limit
// } from "firebase/firestore";
// import { useUser } from "@clerk/nextjs";

// interface TeamGeneratorProps {
//   team1?: Team;
//   team2?: Team;
//   teamCount: number;
//   riskLevel: number;
//   userBalance: number;
//   onBalanceUpdate: (newBalance: number) => void;
//   matchId: string;
// }

// interface EnhancedPlayerDetail extends PlayerDetail {
//   roleOrder: number;
//   selectedBy: number;
//   selCapPerc?: number;
//   selVcPerc?: number;
//   normalizedRole: string;
// }

// export const useTeamGenerator = ({ 
//   team1, 
//   team2, 
//   teamCount, 
//   riskLevel,
//   userBalance,
//   onBalanceUpdate,
//   matchId
// }: TeamGeneratorProps) => {
//   const { user } = useUser();
//   const [generatedTeams, setGeneratedTeams] = useState<GeneratedTeam[]>([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [showPaymentDialog, setShowPaymentDialog] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [roleCounts, setRoleCounts] = useState({
//     wk: 0,
//     batsmen: 0,
//     allrounders: 0,
//     bowlers: 0
//   });

//   const MAX_TEAMS_PER_MATCH = 20;
//   const MIN_TEAMS_FOR_GRAND_LEAGUE = 10;
//   const requiredCredits = useMemo(() => teamCount * 100, [teamCount]);
//   const needsPayment = useMemo(() => userBalance < requiredCredits, [userBalance, requiredCredits]);
//   const paymentAmount = useMemo(() => Math.max(requiredCredits - userBalance, 100), [requiredCredits, userBalance]);
//   const localStorageKey = useMemo(() => `matchTeams_${matchId}_${user?.id}`, [matchId, user?.id]);

//   // Function to show team count messages
//   const showTeamCountMessage = (currentTeamCount: number) => {
//     const teamsNeeded = MIN_TEAMS_FOR_GRAND_LEAGUE - currentTeamCount;

//     if (teamsNeeded > 0) {
//       alert(`🔥 You need ${teamsNeeded} more teams to qualify for Grand League prizes! 
//             Create at least ${MIN_TEAMS_FOR_GRAND_LEAGUE} teams to compete for the mega winnings 🏆`);
//     } else if (currentTeamCount >= MIN_TEAMS_FOR_GRAND_LEAGUE) {
//       alert('🎉 Congratulations! You have qualified for Grand League prizes with your teams!');
//     }
//   };

//   const getRoleOrder = (role: string): number => {
//     const normalized = normalizeRole(role);
//     switch(normalized) {
//       case 'WK-Batsman': return 1;
//       case 'Batsman': return 2;
//       case 'Batting Allrounder': return 3;
//       case 'Bowling Allrounder': return 4;
//       case 'Bowler': return 5;
//       default: return 6;
//     }
//   };

//   const normalizeRole = (role: string): string => {
//     if (!role) return 'Bowler';
//     const lowerRole = role.toLowerCase().trim();
//     if (lowerRole.includes('keep') || lowerRole.includes('wk')) return 'WK-Batsman';
//     if (lowerRole.includes('bat') && lowerRole.includes('all')) return 'Batting Allrounder';
//     if (lowerRole.includes('bowl') && lowerRole.includes('all')) return 'Bowling Allrounder';
//     if (lowerRole.includes('bat')) return 'Batsman';
//     if (lowerRole.includes('bowl')) return 'Bowler';
//     if (lowerRole.includes('all')) return 'Bowling Allrounder';
//     return 'Bowler';
//   };

//   const getNeededRoles = (composition: any, riskLevel: number): string[] => {
//     const neededRoles: string[] = [];
    
//     if (composition['WK-Batsman'] < 1) neededRoles.push('WK-Batsman');
    
//     if (riskLevel < 50) {
//       if (composition['Batsman'] + composition['Batting Allrounder'] < 4) {
//         neededRoles.push('Batsman', 'Batting Allrounder');
//       }
//       if (composition['Bowler'] + composition['Bowling Allrounder'] < 4) {
//         neededRoles.push('Bowler', 'Bowling Allrounder');
//       }
//     } else {
//       if (composition['Batsman'] + composition['Batting Allrounder'] < 5) {
//         neededRoles.push('Batsman', 'Batting Allrounder');
//       }
//       if (composition['Bowler'] + composition['Bowling Allrounder'] < 3) {
//         neededRoles.push('Bowler', 'Bowling Allrounder');
//       }
//     }
    
//     return neededRoles.length > 0 ? neededRoles : 
//       ['Batsman', 'Batting Allrounder', 'Bowling Allrounder', 'Bowler'];
//   };

//   const validateTeamWithRatio = (
//     players: EnhancedPlayerDetail[],
//     composition: any,
//     team1Short: string,
//     team2Short: string,
//     teamRatio: { main: number; secondary: number }
//   ) => {
//     if (players.length !== 11) return false;
//     const mainTeam = composition[team1Short] >= composition[team2Short] ? team1Short : team2Short;
//     const secondaryTeam = mainTeam === team1Short ? team2Short : team1Short;
    
//     if (composition[mainTeam] !== teamRatio.main || composition[secondaryTeam] !== teamRatio.secondary) {
//       return false;
//     }
//     if (composition['WK-Batsman'] < 1) return false;
//     const batCount = composition['Batsman'] + composition['Batting Allrounder'];
//     if (batCount < 3) return false;
//     const bowlCount = composition['Bowler'] + composition['Bowling Allrounder'];
//     if (bowlCount < 3) return false;
//     if (composition.overseas > 5) return false;
//     return true;
//   };

//   const getPlayerPool = useCallback((): EnhancedPlayerDetail[] => {
//     if (!team1 || !team2) return [];
    
//     const team1Players = team1.playerDetails?.filter(p => p.substitute === false) || [];
//     const team2Players = team2.playerDetails?.filter(p => p.substitute === false) || [];
    
//     const allPlayers = [...team1Players, ...team2Players].map(p => ({
//       ...p,
//       roleOrder: getRoleOrder(p.role),
//       normalizedRole: normalizeRole(p.role),
//       selectedBy: p.selectedBy || 0.1,
//       selCapPerc: p.selCapPerc || 0.1,
//       selVcPerc: p.selVcPerc || 0.1,
//       isPlaying: true
//     }));

//     const wkPlayers = allPlayers.filter(p => p.normalizedRole === 'WK-Batsman');
//     const batPlayers = allPlayers.filter(p => 
//       ['Batsman', 'Batting Allrounder'].includes(p.normalizedRole)
//     );
//     const bowlPlayers = allPlayers.filter(p => 
//       ['Bowler', 'Bowling Allrounder'].includes(p.normalizedRole)
//     );
//     const allPlayersCount = allPlayers.filter(p => 
//       ['Bowling Allrounder', 'Batting Allrounder'].includes(p.normalizedRole)
//     );

//     setRoleCounts({
//       wk: wkPlayers.length,
//       batsmen: batPlayers.length,
//       allrounders: allPlayersCount.length,
//       bowlers: bowlPlayers.length
//     });

//     if (wkPlayers.length < 1) {
//       setError(`Need at least 1 WK-Batsman (available: ${wkPlayers.length})`);
//       return [];
//     }
//     if (batPlayers.length < 3) {
//       setError(`Need at least 3 Batsmen (available: ${batPlayers.length})`);
//       return [];
//     }
//     if (bowlPlayers.length < 3) {
//       setError(`Need at least 3 Bowlers (available: ${bowlPlayers.length})`);
//       return [];
//     }

//     return allPlayers;
//   }, [team1, team2]);

//   const calculatePlayerScore = (player: EnhancedPlayerDetail, forCaptaincy = false) => {
//     const baseScore = forCaptaincy ? 
//       (player.selCapPerc || player.selectedBy) : 
//       (player.selectedBy);
    
//     let riskFactor = 1;
//     if (riskLevel < 20) {
//       riskFactor = 1 + (Math.random() * 0.1);
//     } else if (riskLevel < 40) {
//       riskFactor = 0.9 + (Math.random() * 0.2);
//     } else if (riskLevel < 60) {
//       riskFactor = 0.8 + (Math.random() * 0.4);
//     } else if (riskLevel < 80) {
//       riskFactor = 0.6 + (Math.random() * 0.6);
//     } else {
//       riskFactor = 0.4 + (Math.random() * 0.8);
//     }
    
//     return baseScore * riskFactor;
//   };

//   const getTeamCompositionByRisk = () => {
//     if (riskLevel < 20) return { wk: 1, bat: 4, ar: 2, bowl: 4 };
//     if (riskLevel < 40) return { wk: 1, bat: 3, ar: 3, bowl: 4 };
//     if (riskLevel < 60) return { wk: 1, bat: 3, ar: 4, bowl: 3 };
//     if (riskLevel < 80) return { wk: 1, bat: 5, ar: 3, bowl: 2 };
//     return Math.random() > 0.5 
//       ? { wk: 1, bat: 6, ar: 2, bowl: 2 } 
//       : { wk: 1, bat: 2, ar: 4, bowl: 4 };
//   };

//   const weightedRandomPick = (players: EnhancedPlayerDetail[], field: 'selectedBy' | 'selCapPerc' | 'selVcPerc') => {
//     const totalWeight = players.reduce((sum, p) => sum + (p[field] || 0.1), 0);
//     let random = Math.random() * totalWeight;
    
//     for (const player of players) {
//       random -= player[field] || 0.1;
//       if (random <= 0) return player;
//     }
//     return players[0];
//   };

//   const selectPlayerByRisk = (players: EnhancedPlayerDetail[], risk: number) => {
//     if (players.length === 0) return null;
//     const sorted = [...players].sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0));

//     if (risk < 20) {
//       const topCount = Math.max(1, Math.ceil(sorted.length * 0.2));
//       return sorted[Math.floor(Math.random() * topCount)];
//     } else if (risk < 40) {
//       const topCount = Math.max(1, Math.ceil(sorted.length * 0.4));
//       return weightedRandomPick(sorted.slice(0, topCount), 'selectedBy');
//     } else if (risk < 60) {
//       const topCount = Math.max(1, Math.ceil(sorted.length * 0.6));
//       return Math.random() > 0.7 
//         ? sorted[Math.floor(Math.random() * sorted.length)]
//         : weightedRandomPick(sorted.slice(0, topCount), 'selectedBy');
//     } else if (risk < 80) {
//       return Math.random() > 0.5 
//         ? weightedRandomPick(sorted, 'selectedBy')
//         : sorted[Math.floor(Math.random() * sorted.length)];
//     } else {
//       return sorted[Math.floor(Math.random() * sorted.length)];
//     }
//   };

//   const selectCaptainAndViceCaptain = (
//     players: EnhancedPlayerDetail[],
//     risk: number,
//     existingTeams: GeneratedTeam[] = []
//   ): { captain: EnhancedPlayerDetail; viceCaptain: EnhancedPlayerDetail } => {
//     const topPlayers = players.slice(0, Math.ceil(players.length * 0.3));
//     let attempts = 0;
//     const MAX_ATTEMPTS = 20;
    
//     const recentCombinations = existingTeams.slice(0, 5).map(t => 
//       `${t.captain.id}-${t.viceCaptain.id}`
//     );

//     while (attempts < MAX_ATTEMPTS) {
//       attempts++;
      
//       let captain: EnhancedPlayerDetail;
//       let viceCaptain: EnhancedPlayerDetail;

//       if (risk < 20) {
//         captain = topPlayers[0];
//         viceCaptain = topPlayers[1] || topPlayers[0];
//       } else if (risk < 40) {
//         captain = topPlayers[0];
//         viceCaptain =
//           topPlayers.find(p => p.normalizedRole !== captain.normalizedRole) ||
//           topPlayers[1] ||
//           topPlayers[0];
//       } else if (risk < 60) {
//         captain = topPlayers[Math.floor(Math.random() * Math.min(3, topPlayers.length))];
//         viceCaptain =
//           topPlayers
//             .slice(0, 5)
//             .find(p => p.normalizedRole !== captain.normalizedRole) ||
//           topPlayers[1] ||
//           topPlayers[0];
//       } else if (risk < 80) {
//         captain = topPlayers[Math.floor(Math.random() * Math.min(5, topPlayers.length))];
//         viceCaptain = topPlayers[Math.floor(Math.random() * Math.min(10, topPlayers.length))];
//       } else {
//         captain = topPlayers[Math.floor(Math.random() * topPlayers.length)];
//         viceCaptain = topPlayers.find(p => p.id !== captain.id) || topPlayers[0];
//       }

//       const comboKey = `${captain.id}-${viceCaptain.id}`;
      
//       if (!recentCombinations.includes(comboKey) || attempts >= MAX_ATTEMPTS - 5) {
//         return { captain, viceCaptain };
//       }
//     }

//     return { 
//       captain: topPlayers[0], 
//       viceCaptain: topPlayers[1] || topPlayers[0] 
//     };
//   };

//   const validateTeam = (players: EnhancedPlayerDetail[], composition: any, team1Short: string, team2Short: string) => {
//     if (players.length !== 11) return false;
//     if (composition['WK-Batsman'] < 1) return false;
//     const batCount = composition['Batsman'] + composition['Batting Allrounder'];
//     if (batCount < 3) return false;
//     const bowlCount = composition['Bowler'] + composition['Bowling Allrounder'];
//     if (bowlCount < 3) return false;
//     if (composition[team1Short] < 3 || composition[team2Short] < 3) return false;
//     if (composition[team1Short] > 8 || composition[team2Short] > 8) return false;
//     if (composition.overseas > 5) return false;
//     return true;
//   };

//   const createBalancedTeam = useCallback((
//     players: EnhancedPlayerDetail[], 
//     existingTeamCount: number,
//     existingTeams: GeneratedTeam[] = []
//   ) => {
//     if (!team1 || !team2) return null;
    
//     const MAX_ATTEMPTS = 500;
//     const team1Short = team1.shortName || 'T1';
//     const team2Short = team2.shortName || 'T2';
//     const teamRatio = riskLevel >= 50 ? { main: 7, secondary: 4 } : { main: 6, secondary: 5 };
//     const availablePlayers = players.filter(p => 
//       p.selectedBy !== undefined && p.selectedBy > 0 && p.substitute === false
//     );
    
//     if (availablePlayers.length < 11) {
//       setError(`Not enough available players (${availablePlayers.length}/11)`);
//       return null;
//     }
  
//     const sortedPlayers = [...availablePlayers].sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0));
  
//     let attempts = 0;
//     while (attempts < MAX_ATTEMPTS) {
//       attempts++;
      
//       const mainTeam = Math.random() > 0.5 ? team1Short : team2Short;
//       const secondaryTeam = mainTeam === team1Short ? team2Short : team1Short;
      
//       const teamComposition = {
//         'WK-Batsman': 0,
//         'Batsman': 0,
//         'Batting Allrounder': 0,
//         'Bowling Allrounder': 0,
//         'Bowler': 0,
//         [team1Short]: 0,
//         [team2Short]: 0,
//         overseas: 0,
//         totalScore: 0
//       };
  
//       const { captain, viceCaptain } = selectCaptainAndViceCaptain(
//         sortedPlayers, 
//         riskLevel,
//         existingTeams
//       );
//       if (!captain || !viceCaptain) continue;
  
//       const teamPlayers: EnhancedPlayerDetail[] = [captain, viceCaptain];
      
//       [captain, viceCaptain].forEach(player => {
//         const role = player.normalizedRole;
//         teamComposition[role]++;
//         teamComposition[player.teamName === team1.name ? team1Short : team2Short]++;
//         if (player.isOverseas) teamComposition.overseas++;
//         teamComposition.totalScore += calculatePlayerScore(player);
//       });
  
//       const remainingPlayers = sortedPlayers.filter(p => 
//         !teamPlayers.some(tp => tp.id === p.id) &&
//         p.id !== captain.id && 
//         p.id !== viceCaptain.id
//       );
  
//       let wkAttempts = 0;
//       while (teamComposition['WK-Batsman'] < 1 && wkAttempts < 10) {
//         wkAttempts++;
//         const wkPlayers = remainingPlayers.filter(p => p.normalizedRole === 'WK-Batsman');
//         if (wkPlayers.length === 0) break;
        
//         const wkPlayer = selectPlayerByRisk(wkPlayers, riskLevel);
//         if (!wkPlayer || teamPlayers.some(p => p.id === wkPlayer.id)) continue;
        
//         teamPlayers.push(wkPlayer);
//         teamComposition['WK-Batsman']++;
//         teamComposition[wkPlayer.teamName === team1.name ? team1Short : team2Short]++;
//         if (wkPlayer.isOverseas) teamComposition.overseas++;
//         teamComposition.totalScore += calculatePlayerScore(wkPlayer);
        
//         remainingPlayers.splice(remainingPlayers.findIndex(p => p.id === wkPlayer.id), 1);
//       }
  
//       while (teamPlayers.length < 11 && remainingPlayers.length > 0) {
//         const mainTeamCount = teamComposition[mainTeam];
//         const secondaryTeamCount = teamComposition[secondaryTeam];
        
//         let allowedTeams = [];
//         if (mainTeamCount < teamRatio.main) {
//           allowedTeams.push(mainTeam);
//         }
//         if (secondaryTeamCount < teamRatio.secondary) {
//           allowedTeams.push(secondaryTeam);
//         }
        
//         if (allowedTeams.length === 0) {
//           allowedTeams = [mainTeam, secondaryTeam];
//         }
  
//         const neededRoles = getNeededRoles(teamComposition, riskLevel);
        
//         let candidates = remainingPlayers.filter(p => {
//           const team = p.teamName === team1.name ? team1Short : team2Short;
//           const teamAllowed = allowedTeams.includes(team);
//           const overseasOK = !p.isOverseas || teamComposition.overseas < 5;
//           const roleNeeded = neededRoles.includes(p.normalizedRole);
//           return teamAllowed && overseasOK && roleNeeded;
//         });
  
//         if (candidates.length === 0) {
//           candidates = remainingPlayers.filter(p => {
//             const team = p.teamName === team1.name ? team1Short : team2Short;
//             return allowedTeams.includes(team) && 
//                    (!p.isOverseas || teamComposition.overseas < 5);
//           });
//         }
  
//         if (candidates.length === 0) {
//           candidates = remainingPlayers.filter(p => {
//             const team = p.teamName === team1.name ? team1Short : team2Short;
//             return allowedTeams.includes(team);
//           });
//         }
  
//         if (candidates.length === 0) break;
  
//         const selectedPlayer = selectPlayerByRisk(candidates, riskLevel);
//         if (!selectedPlayer || teamPlayers.some(p => p.id === selectedPlayer.id)) {
//           break;
//         }
  
//         teamPlayers.push(selectedPlayer);
//         const role = selectedPlayer.normalizedRole;
//         teamComposition[role]++;
//         teamComposition[selectedPlayer.teamName === team1.name ? team1Short : team2Short]++;
//         if (selectedPlayer.isOverseas) teamComposition.overseas++;
//         teamComposition.totalScore += calculatePlayerScore(selectedPlayer);
  
//         remainingPlayers.splice(remainingPlayers.findIndex(p => p.id === selectedPlayer.id), 1);
//       }
  
//       if (teamPlayers.length === 11 && validateTeamWithRatio(teamPlayers, teamComposition, team1Short, team2Short, teamRatio)) {
//         const allAvailablePlayers = players.filter(p => 
//           !teamPlayers.some(tp => tp.id === p.id) && p.substitute === false
//         );
        
//         const substitutes = [...allAvailablePlayers]
//           .sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0))
//           .slice(0, 4);
  
//         return {
//           players: [...teamPlayers].sort((a, b) => (a.roleOrder || 6) - (b.roleOrder || 6)),
//           captain,
//           viceCaptain,
//           substitutes,
//           teamName: `Team ${existingTeamCount + 1}`,
//           teamComposition,
//           riskLevel,
//           matchId,
//           createdAt: new Date().toISOString(),
//           changes: 0
//         };
//       }
//     }
  
//     console.error(`Team generation failed after ${MAX_ATTEMPTS} attempts`);
//     setError(`Failed to generate valid team after ${MAX_ATTEMPTS} attempts. Try adjusting risk level.`);
//     return null;
//   }, [team1, team2, riskLevel, matchId]);

//   const getTeamCountForMatch = async (): Promise<number> => {
//     if (!user || !matchId) return 0;
    
//     try {
//       const q = query(
//         collection(db, "users", user.id, "matches", matchId, "teams"),
//         limit(MAX_TEAMS_PER_MATCH)
//       );
//       const querySnapshot = await getDocs(q);
//       return querySnapshot.size;
//     } catch (err) {
//       console.error("Failed to count teams:", err);
//       return 0;
//     }
//   };

//   const saveTeamToFirestore = async (team: GeneratedTeam) => {
//     if (!user || !matchId) return;
    
//     try {
//       const teamData = {
//         ...team,
//         userId: user.id,
//         userEmail: user.primaryEmailAddress?.emailAddress || '',
//         matchName: `${team1?.name} vs ${team2?.name}`,
//         team1ShortName: team1?.shortName || team1?.name.split(' ').map(n => n[0]).join(''),
//         team2ShortName: team2?.shortName || team2?.name.split(' ').map(n => n[0]).join(''),
//         team1Logo: team1?.logo || '/fallback-team.png',
//         team2Logo: team2?.logo || '/fallback-team.png'
//       };

//       const matchTeamsRef = collection(db, "users", user.id, "matches", matchId, "teams");
//       const teamRef = doc(matchTeamsRef);
      
//       await setDoc(teamRef, teamData);
//       return teamRef.id;
//     } catch (err) {
//       console.error("Failed to save team:", err);
//       throw err;
//     }
//   };

//   const fetchSavedTeams = useCallback(async (): Promise<GeneratedTeam[]> => {
//     if (!user || !matchId) return [];
    
//     try {
//       const q = query(
//         collection(db, "users", user.id, "matches", matchId, "teams"),
//         orderBy("createdAt", "desc"),
//         limit(MAX_TEAMS_PER_MATCH)
//       );
//       const querySnapshot = await getDocs(q);
//       return querySnapshot.docs.map(doc => ({
//         ...doc.data() as GeneratedTeam,
//         id: doc.id
//       }));
//     } catch (err) {
//       console.error("Failed to fetch saved teams:", err);
//       return [];
//     }
//   }, [user, matchId]);

//   useEffect(() => {
//     const loadTeams = async () => {
//       if (!matchId || !user?.id) return;
      
//       try {
//         const savedTeams = localStorage.getItem(localStorageKey);
//         if (savedTeams) {
//           setGeneratedTeams(JSON.parse(savedTeams));
//           return;
//         }

//         const teams = await fetchSavedTeams();
//         if (teams.length > 0) {
//           setGeneratedTeams(teams);
//           localStorage.setItem(localStorageKey, JSON.stringify(teams));
//           // Show team count message when loading existing teams
//           showTeamCountMessage(teams.length);
//         }
//       } catch (err) {
//         console.error("Failed to load teams:", err);
//       }
//     };

//     loadTeams();
//   }, [localStorageKey, matchId, user?.id, fetchSavedTeams]);

//   const handleGenerateTeams = useCallback(async () => {
//     if (!team1 || !team2) {
//       setError("Select both teams first");
//       return;
//     }

//     if (!user) {
//       setError("Please sign in to generate teams");
//       return;
//     }

//     const currentTeamCount = await getTeamCountForMatch();
//     if (currentTeamCount >= MAX_TEAMS_PER_MATCH) {
//       setError(`You've reached the maximum of ${MAX_TEAMS_PER_MATCH} teams for this match`);
//       return;
//     }

//     const remainingTeamSlots = MAX_TEAMS_PER_MATCH - currentTeamCount;
//     const teamsToGenerate = Math.min(teamCount, remainingTeamSlots);

//     if (teamsToGenerate <= 0) {
//       setError(`You've reached the maximum of ${MAX_TEAMS_PER_MATCH} teams for this match`);
//       return;
//     }

//     if (needsPayment) {
//       setShowPaymentDialog(true);
//       return;
//     }

//     const allPlayers = getPlayerPool();
//     if (allPlayers.length < 11) {
//       setError(`Not enough players (${allPlayers.length}/11). Please check your filters.`);
//       return;
//     }

//     setIsGenerating(true);
//     setError(null);

//     try {
//       await runTransaction(db, async (transaction) => {
//         const userRef = doc(db, "users", user.id);
//         const userDoc = await transaction.get(userRef);
        
//         if (!userDoc.exists()) throw new Error("User not found");
//         if ((userDoc.data().credits || 0) < requiredCredits) {
//           throw new Error("Insufficient balance");
//         }
        
//         transaction.update(userRef, {
//           credits: increment(-requiredCredits)
//         });
//       });

//       const newTeams: GeneratedTeam[] = [];
//       const TOTAL_ATTEMPTS = teamsToGenerate * 100;
//       let attempts = 0;

//       while (newTeams.length < teamsToGenerate && attempts < TOTAL_ATTEMPTS) {
//         attempts++;
//         const team = createBalancedTeam(allPlayers, currentTeamCount + newTeams.length, newTeams);
        
//         if (team) {
//           const isUnique = newTeams.every(existingTeam => {
//             const existingPlayers = existingTeam.players.map(p => p.id).sort();
//             const newPlayers = team.players.map(p => p.id).sort();
//             const diffCount = existingPlayers.filter(id => !newPlayers.includes(id)).length;
//             return diffCount >= 3;
//           });

//           if (isUnique || newTeams.length === 0) {
//             const teamId = await saveTeamToFirestore(team);
//             newTeams.push({ ...team, id: teamId });
//           }
//         }
//       }

//       if (newTeams.length === 0) {
//         throw new Error(
//           `Failed to generate valid teams after ${TOTAL_ATTEMPTS} attempts.\n` +
//           `Player counts: WK: ${roleCounts.wk}, Batsmen: ${roleCounts.batsmen}, ` +
//           `Allrounders: ${roleCounts.allrounders}, Bowlers: ${roleCounts.bowlers}\n` +
//           `Try adjusting your risk level or player filters.`
//         );
//       }

//       const updatedTeams = [...newTeams, ...generatedTeams];
//       setGeneratedTeams(updatedTeams);
//       localStorage.setItem(localStorageKey, JSON.stringify(updatedTeams));
//       onBalanceUpdate(userBalance - requiredCredits);

//       // Show team count message after successful generation
//       const updatedTeamCount = currentTeamCount + newTeams.length;
//       showTeamCountMessage(updatedTeamCount);

//     } catch (err: any) {
//       setError(err.message || "Failed to generate teams");
//     } finally {
//       setIsGenerating(false);
//     }
//   }, [
//     team1, team2, teamCount, riskLevel, user, 
//     userBalance, requiredCredits, needsPayment, 
//     onBalanceUpdate, createBalancedTeam, matchId,
//     fetchSavedTeams, getPlayerPool, generatedTeams,
//     localStorageKey, roleCounts, getTeamCountForMatch,
//     saveTeamToFirestore
//   ]);

//   const checkLineupChanges = useCallback(async () => {
//     if (!user?.id || !matchId) return;
    
//     try {
//       const savedTeams = localStorage.getItem(localStorageKey);
//       if (!savedTeams) return;
      
//       const teams: GeneratedTeam[] = JSON.parse(savedTeams);
//       const updatedTeams = [];
      
//       for (const team of teams) {
//         const playersWithStatus = team.players.map(player => ({
//           ...player,
//         }));
        
//         const nonPlayingPlayers = playersWithStatus.filter(p => p.isNowSubstitute);
//         if (nonPlayingPlayers.length === 0) {
//           updatedTeams.push(team);
//           continue;
//         }
        
//         const playingPlayers = playersWithStatus.filter(p => !p.isNowSubstitute);
//         const availableSubstitutes = team.substitutes?.filter(sub => 
//           !playingPlayers.some(p => p.id === sub.id)
//         ) || [];
        
//         let newPlayers = [...playingPlayers];
        
//         for (const nonPlayer of nonPlayingPlayers) {
//           const replacement = availableSubstitutes.find(sub => 
//             normalizeRole(sub.role) === normalizeRole(nonPlayer.role)
//           );
          
//           if (replacement) {
//             newPlayers.push(replacement);
//             availableSubstitutes.splice(availableSubstitutes.indexOf(replacement), 1);
//           } else {
//             newPlayers.push(nonPlayer);
//           }
//         }
        
//         updatedTeams.push({
//           ...team,
//           players: newPlayers,
//           captain: newPlayers.find(p => p.id === team.captain.id) || team.captain,
//           viceCaptain: newPlayers.find(p => p.id === team.viceCaptain.id) || team.viceCaptain,
//           updatedAt: new Date().toISOString(),
//           hadChanges: nonPlayingPlayers.length > 0
//         });
//       }
      
//       localStorage.setItem(localStorageKey, JSON.stringify(updatedTeams));
//       setGeneratedTeams(updatedTeams);
      
//       if (updatedTeams.some(t => t.hadChanges)) {
//         // Show team count message when lineup changes are detected
//         const currentTeamCount = updatedTeams.length;
//         showTeamCountMessage(currentTeamCount);
//       }
      
//     } catch (err) {
//       console.error("Failed to check lineup changes:", err);
//     }
//   }, [user?.id, matchId, localStorageKey]);

//   const checkIfPlayerIsSubstitute = (playerId: string): boolean => {
//     return Math.random() < 0.1;
//   };

//   const generateButton = (
//     <div className="space-y-2">
//       <button
//         onClick={handleGenerateTeams}
//         disabled={isGenerating || !team1 || !team2}
//         className={`
//           w-full px-4 py-3 rounded-md font-bold
//           ${isGenerating ? 'bg-gray-500' : 
//            needsPayment ? 'bg-yellow-500 hover:bg-yellow-600' : 
//            'bg-blue-500 hover:bg-blue-600'}
//           text-white transition-colors
//         `}
//       >
//         {isGenerating ? (
//           <span className="flex items-center justify-center gap-2">
//             <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//             </svg>
//             Generating...
//           </span>
//         ) : !team1 || !team2 ? (
//           "Select both teams"
//         ) : needsPayment ? (
//           `Add ₹${paymentAmount} to Generate team`
//         ) : (
//           `Generate ${teamCount} Teams (₹${requiredCredits})`
//         )}
//       </button>

//       <div className="flex justify-between text-sm">
//         <span>Your Credits: <span className='text-green-500'>₹{userBalance} </span> </span>
//         {needsPayment ? (
//           <span className="text-red-500">Need ₹{paymentAmount} more</span>
//         ) : (
//           <span className="text-green-500">Sufficient balance</span>
//         )}
//       </div>

//       {error && (
//         <div className="text-red-500 text-sm p-2 bg-red-50 rounded-lg">
//           <p className="font-medium">{error}</p>
//           {error.includes("Player counts") && (
//             <div className="mt-2 text-xs">
//               <p>Current player counts:</p>
//               <ul className="list-disc pl-5">
//                 <li>WK-Batsman: {roleCounts.wk} (min 1)</li>
//                 <li>Batsmen: {roleCounts.batsmen} (min 3 including allrounders)</li>
//                 <li>Bowlers: {roleCounts.bowlers} (min 3 including allrounders)</li>
//               </ul>
//               <p className="mt-1">Try adjusting filters or risk level.</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );

//   const paymentDialog = showPaymentDialog && (
//     <PaymentDialog
//       currentBalance={userBalance}
//       requiredAmount={paymentAmount}
//       onPaymentSuccess={(amount) => {
//         onBalanceUpdate(userBalance + amount);
//         setShowPaymentDialog(false);
//         handleGenerateTeams();
//       }}
//       onOpenChange={setShowPaymentDialog}
//       open={showPaymentDialog}
//       onProcessingStateChange={setIsGenerating}
//     />
//   );

//   return {
//     generatedTeams,
//     isGenerating,
//     generateButton,
//     paymentDialog,
//     error,
//     setError,
//     fetchSavedTeams,
//     setGeneratedTeams,
//     checkLineupChanges
//   };
// };










// "use client";
// import { useState, useCallback, useMemo, useEffect } from "react";
// import { PaymentDialog } from "./PaymentDialog";
// import { Team, PlayerDetail, GeneratedTeam } from "../../types/match";
// import { db } from "@/lib/firebase";
// import { 
//   doc, 
//   runTransaction, 
//   increment, 
//   setDoc, 
//   collection, 
//   query, 
//   orderBy, 
//   getDocs,
//   limit
// } from "firebase/firestore";
// import { useUser } from "@clerk/nextjs";

// interface TeamGeneratorProps {
//   team1?: Team;
//   team2?: Team;
//   teamCount: number;
//   riskLevel: number;
//   userBalance: number;
//   onBalanceUpdate: (newBalance: number) => void;
//   matchId: string;
// }

// interface EnhancedPlayerDetail extends PlayerDetail {
//   roleOrder: number;
//   selectedBy: number;
//   selCapPerc?: number;
//   selVcPerc?: number;
//   normalizedRole: string;
// }

// export const useTeamGenerator = ({ 
//   team1, 
//   team2, 
//   teamCount, 
//   riskLevel,
//   userBalance,
//   onBalanceUpdate,
//   matchId
// }: TeamGeneratorProps) => {
//   const { user } = useUser();
//   const [generatedTeams, setGeneratedTeams] = useState<GeneratedTeam[]>([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [showPaymentDialog, setShowPaymentDialog] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [roleCounts, setRoleCounts] = useState({
//     wk: 0,
//     batsmen: 0,
//     allrounders: 0,
//     bowlers: 0
//   });

//   const MAX_TEAMS_PER_MATCH = 20;
//   const MIN_TEAMS_FOR_GRAND_LEAGUE = 10;
//   const requiredCredits = useMemo(() => teamCount * 100, [teamCount]);
//   const needsPayment = useMemo(() => userBalance < requiredCredits, [userBalance, requiredCredits]);
//   const paymentAmount = useMemo(() => Math.max(requiredCredits - userBalance, 100), [requiredCredits, userBalance]);
//   const localStorageKey = useMemo(() => `matchTeams_${matchId}_${user?.id}`, [matchId, user?.id]);

//   const showTeamCountMessage = (currentTeamCount: number) => {
//     const teamsNeeded = MIN_TEAMS_FOR_GRAND_LEAGUE - currentTeamCount;

//     if (teamsNeeded > 0) {
//       alert(`🔥 You need ${teamsNeeded} more teams to qualify for Grand League prizes! 
//             Create at least ${MIN_TEAMS_FOR_GRAND_LEAGUE} teams to compete for the mega winnings 🏆`);
//     } else if (currentTeamCount >= MIN_TEAMS_FOR_GRAND_LEAGUE) {
//       alert('🎉 Congratulations! You have qualified for Grand League prizes with your teams!');
//     }
//   };

//   const getRoleOrder = (role: string): number => {
//     const normalized = normalizeRole(role);
//     switch(normalized) {
//       case 'WK-Batsman': return 1;
//       case 'Batsman': return 2;
//       case 'Batting Allrounder': return 3;
//       case 'Bowling Allrounder': return 4;
//       case 'Bowler': return 5;
//       default: return 6;
//     }
//   };

//   const normalizeRole = (role: string): string => {
//     if (!role) return 'Bowler';
//     const lowerRole = role.toLowerCase().trim();
//     if (lowerRole.includes('keep') || lowerRole.includes('wk')) return 'WK-Batsman';
//     if (lowerRole.includes('bat') && lowerRole.includes('all')) return 'Batting Allrounder';
//     if (lowerRole.includes('bowl') && lowerRole.includes('all')) return 'Bowling Allrounder';
//     if (lowerRole.includes('bat')) return 'Batsman';
//     if (lowerRole.includes('bowl')) return 'Bowler';
//     if (lowerRole.includes('all')) return 'Bowling Allrounder';
//     return 'Bowler';
//   };

//   const getNeededRoles = (composition: any, riskLevel: number): string[] => {
//     const neededRoles: string[] = [];
    
//     if (composition['WK-Batsman'] < 1) neededRoles.push('WK-Batsman');
    
//     if (riskLevel < 50) {
//       if (composition['Batsman'] + composition['Batting Allrounder'] < 4) {
//         neededRoles.push('Batsman', 'Batting Allrounder');
//       }
//       if (composition['Bowler'] + composition['Bowling Allrounder'] < 4) {
//         neededRoles.push('Bowler', 'Bowling Allrounder');
//       }
//     } else {
//       if (composition['Batsman'] + composition['Batting Allrounder'] < 5) {
//         neededRoles.push('Batsman', 'Batting Allrounder');
//       }
//       if (composition['Bowler'] + composition['Bowling Allrounder'] < 3) {
//         neededRoles.push('Bowler', 'Bowling Allrounder');
//       }
//     }
    
//     return neededRoles.length > 0 ? neededRoles : 
//       ['Batsman', 'Batting Allrounder', 'Bowling Allrounder', 'Bowler'];
//   };

//   const validateTeamWithRatio = (
//     players: EnhancedPlayerDetail[],
//     composition: any,
//     team1Short: string,
//     team2Short: string,
//     teamRatio: { main: number; secondary: number }
//   ) => {
//     if (players.length !== 11) return false;
//     const mainTeam = composition[team1Short] >= composition[team2Short] ? team1Short : team2Short;
//     const secondaryTeam = mainTeam === team1Short ? team2Short : team1Short;
    
//     if (composition[mainTeam] !== teamRatio.main || composition[secondaryTeam] !== teamRatio.secondary) {
//       return false;
//     }
//     if (composition['WK-Batsman'] < 1) return false;
//     const batCount = composition['Batsman'] + composition['Batting Allrounder'];
//     if (batCount < 3) return false;
//     const bowlCount = composition['Bowler'] + composition['Bowling Allrounder'];
//     if (bowlCount < 3) return false;
//     if (composition.overseas > 5) return false;
//     return true;
//   };

//   const getPlayerPool = useCallback((): EnhancedPlayerDetail[] => {
//     if (!team1 || !team2) return [];
    
//     const team1Players = team1.playerDetails?.filter(p => p.substitute === false) || [];
//     const team2Players = team2.playerDetails?.filter(p => p.substitute === false) || [];
    
//     const allPlayers = [...team1Players, ...team2Players].map(p => ({
//       ...p,
//       roleOrder: getRoleOrder(p.role),
//       normalizedRole: normalizeRole(p.role),
//       selectedBy: p.selectedBy || 0.1,
//       selCapPerc: p.selCapPerc || 0.1,
//       selVcPerc: p.selVcPerc || 0.1,
//       isPlaying: true
//     }));

//     // Special case for LSG vs GT match (ID: 115122)
//     if (matchId === "115122") {
//       const requiredPlayers = [
//         "Nicholas Pooran", "Rishabh Pant", "Shubman Gill", 
//         "Sai Sudharsan", "Aiden Markram", "Washington Sundar",
//         "Shardul Thakur", "Avesh Khan", "Prasidh Krishna", 
//         "Rashid Khan", "Ravi Bishnoi"
//       ];
      
//       return allPlayers.filter(p => requiredPlayers.includes(p.name));
//     }

//     // Special case for SRH vs PBKS match (ID: 115129)
//     if (matchId === "115129") {
//       const requiredPlayers = [
//         "Heinrich Klaasen", "Prabhsimran Singh", "Travis Head",
//         "Shreyas Iyer", "Nehal Wadhera", "Prince Arya",
//         "Marcus Stoinis", "Abhishek Sharma", "Harshal Patel",
//         "Arshdeep Singh", "Ehsan Malinga"
//       ];
      
//       return allPlayers.filter(p => requiredPlayers.includes(p.name));
//     }

//     const wkPlayers = allPlayers.filter(p => p.normalizedRole === 'WK-Batsman');
//     const batPlayers = allPlayers.filter(p => 
//       ['Batsman', 'Batting Allrounder'].includes(p.normalizedRole)
//     );
//     const bowlPlayers = allPlayers.filter(p => 
//       ['Bowler', 'Bowling Allrounder'].includes(p.normalizedRole)
//     );
//     const allPlayersCount = allPlayers.filter(p => 
//       ['Bowling Allrounder', 'Batting Allrounder'].includes(p.normalizedRole)
//     );

//     setRoleCounts({
//       wk: wkPlayers.length,
//       batsmen: batPlayers.length,
//       allrounders: allPlayersCount.length,
//       bowlers: bowlPlayers.length
//     });

//     if (wkPlayers.length < 1) {
//       setError(`Need at least 1 WK-Batsman (available: ${wkPlayers.length})`);
//       return [];
//     }
//     if (batPlayers.length < 3) {
//       setError(`Need at least 3 Batsmen (available: ${batPlayers.length})`);
//       return [];
//     }
//     if (bowlPlayers.length < 3) {
//       setError(`Need at least 3 Bowlers (available: ${bowlPlayers.length})`);
//       return [];
//     }

//     return allPlayers;
//   }, [team1, team2, matchId]);

//   const calculatePlayerScore = (player: EnhancedPlayerDetail, forCaptaincy = false) => {
//     const baseScore = forCaptaincy ? 
//       (player.selCapPerc || player.selectedBy) : 
//       (player.selectedBy);
    
//     let riskFactor = 1;
//     if (riskLevel < 20) {
//       riskFactor = 1 + (Math.random() * 0.1);
//     } else if (riskLevel < 40) {
//       riskFactor = 0.9 + (Math.random() * 0.2);
//     } else if (riskLevel < 60) {
//       riskFactor = 0.8 + (Math.random() * 0.4);
//     } else if (riskLevel < 80) {
//       riskFactor = 0.6 + (Math.random() * 0.6);
//     } else {
//       riskFactor = 0.4 + (Math.random() * 0.8);
//     }
    
//     return baseScore * riskFactor;
//   };

//   const getTeamCompositionByRisk = () => {
//     if (riskLevel < 20) return { wk: 1, bat: 4, ar: 2, bowl: 4 };
//     if (riskLevel < 40) return { wk: 1, bat: 3, ar: 3, bowl: 4 };
//     if (riskLevel < 60) return { wk: 1, bat: 3, ar: 4, bowl: 3 };
//     if (riskLevel < 80) return { wk: 1, bat: 5, ar: 3, bowl: 2 };
//     return Math.random() > 0.5 
//       ? { wk: 1, bat: 6, ar: 2, bowl: 2 } 
//       : { wk: 1, bat: 2, ar: 4, bowl: 4 };
//   };

//   const weightedRandomPick = (players: EnhancedPlayerDetail[], field: 'selectedBy' | 'selCapPerc' | 'selVcPerc') => {
//     const totalWeight = players.reduce((sum, p) => sum + (p[field] || 0.1), 0);
//     let random = Math.random() * totalWeight;
    
//     for (const player of players) {
//       random -= player[field] || 0.1;
//       if (random <= 0) return player;
//     }
//     return players[0];
//   };

//   const selectPlayerByRisk = (players: EnhancedPlayerDetail[], risk: number) => {
//     if (players.length === 0) return null;
//     const sorted = [...players].sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0));

//     if (risk < 20) {
//       const topCount = Math.max(1, Math.ceil(sorted.length * 0.2));
//       return sorted[Math.floor(Math.random() * topCount)];
//     } else if (risk < 40) {
//       const topCount = Math.max(1, Math.ceil(sorted.length * 0.4));
//       return weightedRandomPick(sorted.slice(0, topCount), 'selectedBy');
//     } else if (risk < 60) {
//       const topCount = Math.max(1, Math.ceil(sorted.length * 0.6));
//       return Math.random() > 0.7 
//         ? sorted[Math.floor(Math.random() * sorted.length)]
//         : weightedRandomPick(sorted.slice(0, topCount), 'selectedBy');
//     } else if (risk < 80) {
//       return Math.random() > 0.5 
//         ? weightedRandomPick(sorted, 'selectedBy')
//         : sorted[Math.floor(Math.random() * sorted.length)];
//     } else {
//       return sorted[Math.floor(Math.random() * sorted.length)];
//     }
//   };

//   const selectCaptainAndViceCaptain = (
//     players: EnhancedPlayerDetail[],
//     risk: number,
//     existingTeams: GeneratedTeam[] = []
//   ): { captain: EnhancedPlayerDetail; viceCaptain: EnhancedPlayerDetail } => {
//     // Special case for LSG vs GT match (ID: 115122)
//     if (matchId === "115122") {
//       const markram = players.find(p => p.name === "Aiden Markram");
//       const pooran = players.find(p => p.name === "Nicholas Pooran");
//       if (markram && pooran) {
//         return { captain: markram, viceCaptain: pooran };
//       }
//     }

//     // Special case for SRH vs PBKS match (ID: 115129)
//     if (matchId === "115129") {
//       const klaasen = players.find(p => p.name === "Heinrich Klaasen");
//       const head = players.find(p => p.name === "Travis Head");
//       if (klaasen && head) {
//         return { captain: klaasen, viceCaptain: head };
//       }
//     }

//     const topPlayers = players.slice(0, Math.ceil(players.length * 0.3));
//     let attempts = 0;
//     const MAX_ATTEMPTS = 20;
    
//     const recentCombinations = existingTeams.slice(0, 5).map(t => 
//       `${t.captain.id}-${t.viceCaptain.id}`
//     );

//     while (attempts < MAX_ATTEMPTS) {
//       attempts++;
      
//       let captain: EnhancedPlayerDetail;
//       let viceCaptain: EnhancedPlayerDetail;

//       if (risk < 20) {
//         captain = topPlayers[0];
//         viceCaptain = topPlayers[1] || topPlayers[0];
//       } else if (risk < 40) {
//         captain = topPlayers[0];
//         viceCaptain =
//           topPlayers.find(p => p.normalizedRole !== captain.normalizedRole) ||
//           topPlayers[1] ||
//           topPlayers[0];
//       } else if (risk < 60) {
//         captain = topPlayers[Math.floor(Math.random() * Math.min(3, topPlayers.length))];
//         viceCaptain =
//           topPlayers
//             .slice(0, 5)
//             .find(p => p.normalizedRole !== captain.normalizedRole) ||
//           topPlayers[1] ||
//           topPlayers[0];
//       } else if (risk < 80) {
//         captain = topPlayers[Math.floor(Math.random() * Math.min(5, topPlayers.length))];
//         viceCaptain = topPlayers[Math.floor(Math.random() * Math.min(10, topPlayers.length))];
//       } else {
//         captain = topPlayers[Math.floor(Math.random() * topPlayers.length)];
//         viceCaptain = topPlayers.find(p => p.id !== captain.id) || topPlayers[0];
//       }

//       const comboKey = `${captain.id}-${viceCaptain.id}`;
      
//       if (!recentCombinations.includes(comboKey) || attempts >= MAX_ATTEMPTS - 5) {
//         return { captain, viceCaptain };
//       }
//     }

//     return { 
//       captain: topPlayers[0], 
//       viceCaptain: topPlayers[1] || topPlayers[0] 
//     };
//   };

//   const validateTeam = (players: EnhancedPlayerDetail[], composition: any, team1Short: string, team2Short: string) => {
//     if (players.length !== 11) return false;
//     if (composition['WK-Batsman'] < 1) return false;
//     const batCount = composition['Batsman'] + composition['Batting Allrounder'];
//     if (batCount < 3) return false;
//     const bowlCount = composition['Bowler'] + composition['Bowling Allrounder'];
//     if (bowlCount < 3) return false;
//     if (composition[team1Short] < 3 || composition[team2Short] < 3) return false;
//     if (composition[team1Short] > 8 || composition[team2Short] > 8) return false;
//     if (composition.overseas > 5) return false;
//     return true;
//   };

//   const createBalancedTeam = useCallback((
//     players: EnhancedPlayerDetail[], 
//     existingTeamCount: number,
//     existingTeams: GeneratedTeam[] = []
//   ) => {
//     if (!team1 || !team2) return null;
    
//     // Special case for LSG vs GT match (ID: 115122)
//     if (matchId === "115122") {
//       const requiredPlayers = [
//         "Nicholas Pooran", "Rishabh Pant", "Shubman Gill", 
//         "Sai Sudharsan", "Aiden Markram", "Washington Sundar",
//         "Shardul Thakur", "Avesh Khan", "Prasidh Krishna", 
//         "Rashid Khan", "Ravi Bishnoi"
//       ];
      
//       const filteredPlayers = players.filter(p => requiredPlayers.includes(p.name));
//       if (filteredPlayers.length === 11) {
//         const markram = filteredPlayers.find(p => p.name === "Aiden Markram");
//         const pooran = filteredPlayers.find(p => p.name === "Nicholas Pooran");
        
//         if (markram && pooran) {
//           return {
//             players: filteredPlayers.sort((a, b) => a.roleOrder - b.roleOrder),
//             captain: markram,
//             viceCaptain: pooran,
//             substitutes: [],
//             teamName: `LSG vs GT Special Team ${existingTeamCount + 1}`,
//             teamComposition: {
//               'WK-Batsman': 2,
//               'Batsman': 3,
//               'Batting Allrounder': 1,
//               'Bowling Allrounder': 1,
//               'Bowler': 4,
//               [team1.shortName || 'LSG']: 5,
//               [team2.shortName || 'GT']: 6,
//               overseas: 4,
//               totalScore: 0
//             },
//             riskLevel,
//             matchId,
//             createdAt: new Date().toISOString(),
//             changes: 0
//           };
//         }
//       }
//     }
    
//     // Special case for SRH vs PBKS match (ID: 115129)
//     if (matchId === "115129") {
//       const requiredPlayers = [
//         "Heinrich Klaasen", "Prabhsimran Singh", "Travis Head",
//         "Shreyas Iyer", "Nehal Wadhera", "Prince Arya",
//         "Marcus Stoinis", "Abhishek Sharma", "Harshal Patel",
//         "Arshdeep Singh", "Ehsan Malinga"
//       ];
      
//       const filteredPlayers = players.filter(p => requiredPlayers.includes(p.name));
//       if (filteredPlayers.length === 11) {
//         const klaasen = filteredPlayers.find(p => p.name === "Heinrich Klaasen");
//         const head = filteredPlayers.find(p => p.name === "Travis Head");
        
//         if (klaasen && head) {
//           return {
//             players: filteredPlayers.sort((a, b) => a.roleOrder - b.roleOrder),
//             captain: klaasen,
//             viceCaptain: head,
//             substitutes: [],
//             teamName: `SRH vs PBKS Special Team ${existingTeamCount + 1}`,
//             teamComposition: {
//               'WK-Batsman': 1,
//               'Batsman': 4,
//               'Batting Allrounder': 2,
//               'Bowling Allrounder': 1,
//               'Bowler': 3,
//               [team1.shortName || 'SRH']: 6,
//               [team2.shortName || 'PBKS']: 5,
//               overseas: 4,
//               totalScore: 0
//             },
//             riskLevel,
//             matchId,
//             createdAt: new Date().toISOString(),
//             changes: 0
//           };
//         }
//       }
//     }
    
//     const MAX_ATTEMPTS = 500;
//     const team1Short = team1.shortName || 'T1';
//     const team2Short = team2.shortName || 'T2';
//     const teamRatio = riskLevel >= 50 ? { main: 7, secondary: 4 } : { main: 6, secondary: 5 };
//     const availablePlayers = players.filter(p => 
//       p.selectedBy !== undefined && p.selectedBy > 0 && p.substitute === false
//     );
    
//     if (availablePlayers.length < 11) {
//       setError(`Not enough available players (${availablePlayers.length}/11)`);
//       return null;
//     }
  
//     const sortedPlayers = [...availablePlayers].sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0));
  
//     let attempts = 0;
//     while (attempts < MAX_ATTEMPTS) {
//       attempts++;
      
//       const mainTeam = Math.random() > 0.5 ? team1Short : team2Short;
//       const secondaryTeam = mainTeam === team1Short ? team2Short : team1Short;
      
//       const teamComposition = {
//         'WK-Batsman': 0,
//         'Batsman': 0,
//         'Batting Allrounder': 0,
//         'Bowling Allrounder': 0,
//         'Bowler': 0,
//         [team1Short]: 0,
//         [team2Short]: 0,
//         overseas: 0,
//         totalScore: 0
//       };
  
//       const { captain, viceCaptain } = selectCaptainAndViceCaptain(
//         sortedPlayers, 
//         riskLevel,
//         existingTeams
//       );
//       if (!captain || !viceCaptain) continue;
  
//       const teamPlayers: EnhancedPlayerDetail[] = [captain, viceCaptain];
      
//       [captain, viceCaptain].forEach(player => {
//         const role = player.normalizedRole;
//         teamComposition[role]++;
//         teamComposition[player.teamName === team1.name ? team1Short : team2Short]++;
//         if (player.isOverseas) teamComposition.overseas++;
//         teamComposition.totalScore += calculatePlayerScore(player);
//       });
  
//       const remainingPlayers = sortedPlayers.filter(p => 
//         !teamPlayers.some(tp => tp.id === p.id) &&
//         p.id !== captain.id && 
//         p.id !== viceCaptain.id
//       );
  
//       let wkAttempts = 0;
//       while (teamComposition['WK-Batsman'] < 1 && wkAttempts < 10) {
//         wkAttempts++;
//         const wkPlayers = remainingPlayers.filter(p => p.normalizedRole === 'WK-Batsman');
//         if (wkPlayers.length === 0) break;
        
//         const wkPlayer = selectPlayerByRisk(wkPlayers, riskLevel);
//         if (!wkPlayer || teamPlayers.some(p => p.id === wkPlayer.id)) continue;
        
//         teamPlayers.push(wkPlayer);
//         teamComposition['WK-Batsman']++;
//         teamComposition[wkPlayer.teamName === team1.name ? team1Short : team2Short]++;
//         if (wkPlayer.isOverseas) teamComposition.overseas++;
//         teamComposition.totalScore += calculatePlayerScore(wkPlayer);
        
//         remainingPlayers.splice(remainingPlayers.findIndex(p => p.id === wkPlayer.id), 1);
//       }
  
//       while (teamPlayers.length < 11 && remainingPlayers.length > 0) {
//         const mainTeamCount = teamComposition[mainTeam];
//         const secondaryTeamCount = teamComposition[secondaryTeam];
        
//         let allowedTeams = [];
//         if (mainTeamCount < teamRatio.main) {
//           allowedTeams.push(mainTeam);
//         }
//         if (secondaryTeamCount < teamRatio.secondary) {
//           allowedTeams.push(secondaryTeam);
//         }
        
//         if (allowedTeams.length === 0) {
//           allowedTeams = [mainTeam, secondaryTeam];
//         }
  
//         const neededRoles = getNeededRoles(teamComposition, riskLevel);
        
//         let candidates = remainingPlayers.filter(p => {
//           const team = p.teamName === team1.name ? team1Short : team2Short;
//           const teamAllowed = allowedTeams.includes(team);
//           const overseasOK = !p.isOverseas || teamComposition.overseas < 5;
//           const roleNeeded = neededRoles.includes(p.normalizedRole);
//           return teamAllowed && overseasOK && roleNeeded;
//         });
  
//         if (candidates.length === 0) {
//           candidates = remainingPlayers.filter(p => {
//             const team = p.teamName === team1.name ? team1Short : team2Short;
//             return allowedTeams.includes(team) && 
//                    (!p.isOverseas || teamComposition.overseas < 5);
//           });
//         }
  
//         if (candidates.length === 0) {
//           candidates = remainingPlayers.filter(p => {
//             const team = p.teamName === team1.name ? team1Short : team2Short;
//             return allowedTeams.includes(team);
//           });
//         }
  
//         if (candidates.length === 0) break;
  
//         const selectedPlayer = selectPlayerByRisk(candidates, riskLevel);
//         if (!selectedPlayer || teamPlayers.some(p => p.id === selectedPlayer.id)) {
//           break;
//         }
  
//         teamPlayers.push(selectedPlayer);
//         const role = selectedPlayer.normalizedRole;
//         teamComposition[role]++;
//         teamComposition[selectedPlayer.teamName === team1.name ? team1Short : team2Short]++;
//         if (selectedPlayer.isOverseas) teamComposition.overseas++;
//         teamComposition.totalScore += calculatePlayerScore(selectedPlayer);
  
//         remainingPlayers.splice(remainingPlayers.findIndex(p => p.id === selectedPlayer.id), 1);
//       }
  
//       if (teamPlayers.length === 11 && validateTeamWithRatio(teamPlayers, teamComposition, team1Short, team2Short, teamRatio)) {
//         const allAvailablePlayers = players.filter(p => 
//           !teamPlayers.some(tp => tp.id === p.id) && p.substitute === false
//         );
        
//         const substitutes = [...allAvailablePlayers]
//           .sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0))
//           .slice(0, 4);
  
//         return {
//           players: [...teamPlayers].sort((a, b) => (a.roleOrder || 6) - (b.roleOrder || 6)),
//           captain,
//           viceCaptain,
//           substitutes,
//           teamName: `Team ${existingTeamCount + 1}`,
//           teamComposition,
//           riskLevel,
//           matchId,
//           createdAt: new Date().toISOString(),
//           changes: 0
//         };
//       }
//     }
  
//     console.error(`Team generation failed after ${MAX_ATTEMPTS} attempts`);
//     setError(`Failed to generate valid team after ${MAX_ATTEMPTS} attempts. Try adjusting risk level.`);
//     return null;
//   }, [team1, team2, riskLevel, matchId]);

//   const getTeamCountForMatch = async (): Promise<number> => {
//     if (!user || !matchId) return 0;
    
//     try {
//       const q = query(
//         collection(db, "users", user.id, "matches", matchId, "teams"),
//         limit(MAX_TEAMS_PER_MATCH)
//       );
//       const querySnapshot = await getDocs(q);
//       return querySnapshot.size;
//     } catch (err) {
//       console.error("Failed to count teams:", err);
//       return 0;
//     }
//   };

//   const saveTeamToFirestore = async (team: GeneratedTeam) => {
//     if (!user || !matchId) return;
    
//     try {
//       const teamData = {
//         ...team,
//         userId: user.id,
//         userEmail: user.primaryEmailAddress?.emailAddress || '',
//         matchName: `${team1?.name} vs ${team2?.name}`,
//         team1ShortName: team1?.shortName || team1?.name.split(' ').map(n => n[0]).join(''),
//         team2ShortName: team2?.shortName || team2?.name.split(' ').map(n => n[0]).join(''),
//         team1Logo: team1?.logo || '/fallback-team.png',
//         team2Logo: team2?.logo || '/fallback-team.png'
//       };

//       const matchTeamsRef = collection(db, "users", user.id, "matches", matchId, "teams");
//       const teamRef = doc(matchTeamsRef);
      
//       await setDoc(teamRef, teamData);
//       return teamRef.id;
//     } catch (err) {
//       console.error("Failed to save team:", err);
//       throw err;
//     }
//   };

//   const fetchSavedTeams = useCallback(async (): Promise<GeneratedTeam[]> => {
//     if (!user || !matchId) return [];
    
//     try {
//       const q = query(
//         collection(db, "users", user.id, "matches", matchId, "teams"),
//         orderBy("createdAt", "desc"),
//         limit(MAX_TEAMS_PER_MATCH)
//       );
//       const querySnapshot = await getDocs(q);
//       return querySnapshot.docs.map(doc => ({
//         ...doc.data() as GeneratedTeam,
//         id: doc.id
//       }));
//     } catch (err) {
//       console.error("Failed to fetch saved teams:", err);
//       return [];
//     }
//   }, [user, matchId]);

//   useEffect(() => {
//     const loadTeams = async () => {
//       if (!matchId || !user?.id) return;
      
//       try {
//         const savedTeams = localStorage.getItem(localStorageKey);
//         if (savedTeams) {
//           setGeneratedTeams(JSON.parse(savedTeams));
//           return;
//         }

//         const teams = await fetchSavedTeams();
//         if (teams.length > 0) {
//           setGeneratedTeams(teams);
//           localStorage.setItem(localStorageKey, JSON.stringify(teams));
//           showTeamCountMessage(teams.length);
//         }
//       } catch (err) {
//         console.error("Failed to load teams:", err);
//       }
//     };

//     loadTeams();
//   }, [localStorageKey, matchId, user?.id, fetchSavedTeams]);

//   const handleGenerateTeams = useCallback(async () => {
//     if (!team1 || !team2) {
//       setError("Select both teams first");
//       return;
//     }

//     if (!user) {
//       setError("Please sign in to generate teams");
//       return;
//     }

//     const currentTeamCount = await getTeamCountForMatch();
//     if (currentTeamCount >= MAX_TEAMS_PER_MATCH) {
//       setError(`You've reached the maximum of ${MAX_TEAMS_PER_MATCH} teams for this match`);
//       return;
//     }

//     const remainingTeamSlots = MAX_TEAMS_PER_MATCH - currentTeamCount;
//     const teamsToGenerate = Math.min(teamCount, remainingTeamSlots);

//     if (teamsToGenerate <= 0) {
//       setError(`You've reached the maximum of ${MAX_TEAMS_PER_MATCH} teams for this match`);
//       return;
//     }

//     if (needsPayment) {
//       setShowPaymentDialog(true);
//       return;
//     }

//     const allPlayers = getPlayerPool();
//     if (allPlayers.length < 11) {
//       setError(`Not enough players (${allPlayers.length}/11). Please check your filters.`);
//       return;
//     }

//     setIsGenerating(true);
//     setError(null);

//     try {
//       await runTransaction(db, async (transaction) => {
//         const userRef = doc(db, "users", user.id);
//         const userDoc = await transaction.get(userRef);
        
//         if (!userDoc.exists()) throw new Error("User not found");
//         if ((userDoc.data().credits || 0) < requiredCredits) {
//           throw new Error("Insufficient balance");
//         }
        
//         transaction.update(userRef, {
//           credits: increment(-requiredCredits)
//         });
//       });

//       const newTeams: GeneratedTeam[] = [];
//       const TOTAL_ATTEMPTS = teamsToGenerate * 100;
//       let attempts = 0;

//       while (newTeams.length < teamsToGenerate && attempts < TOTAL_ATTEMPTS) {
//         attempts++;
//         const team = createBalancedTeam(allPlayers, currentTeamCount + newTeams.length, newTeams);
        
//         if (team) {
//           const isUnique = newTeams.every(existingTeam => {
//             const existingPlayers = existingTeam.players.map(p => p.id).sort();
//             const newPlayers = team.players.map(p => p.id).sort();
//             const diffCount = existingPlayers.filter(id => !newPlayers.includes(id)).length;
//             return diffCount >= 3;
//           });

//           if (isUnique || newTeams.length === 0) {
//             const teamId = await saveTeamToFirestore(team);
//             newTeams.push({ ...team, id: teamId });
//           }
//         }
//       }

//       if (newTeams.length === 0) {
//         throw new Error(
//           `Failed to generate valid teams after ${TOTAL_ATTEMPTS} attempts.\n` +
//           `Player counts: WK: ${roleCounts.wk}, Batsmen: ${roleCounts.batsmen}, ` +
//           `Allrounders: ${roleCounts.allrounders}, Bowlers: ${roleCounts.bowlers}\n` +
//           `Try adjusting your risk level or player filters.`
//         );
//       }

//       const updatedTeams = [...newTeams, ...generatedTeams];
//       setGeneratedTeams(updatedTeams);
//       localStorage.setItem(localStorageKey, JSON.stringify(updatedTeams));
//       onBalanceUpdate(userBalance - requiredCredits);

//       const updatedTeamCount = currentTeamCount + newTeams.length;
//       showTeamCountMessage(updatedTeamCount);

//     } catch (err: any) {
//       setError(err.message || "Failed to generate teams");
//     } finally {
//       setIsGenerating(false);
//     }
//   }, [
//     team1, team2, teamCount, riskLevel, user, 
//     userBalance, requiredCredits, needsPayment, 
//     onBalanceUpdate, createBalancedTeam, matchId,
//     fetchSavedTeams, getPlayerPool, generatedTeams,
//     localStorageKey, roleCounts, getTeamCountForMatch,
//     saveTeamToFirestore
//   ]);

//   const checkLineupChanges = useCallback(async () => {
//     if (!user?.id || !matchId) return;
    
//     try {
//       const savedTeams = localStorage.getItem(localStorageKey);
//       if (!savedTeams) return;
      
//       const teams: GeneratedTeam[] = JSON.parse(savedTeams);
//       const updatedTeams = [];
      
//       for (const team of teams) {
//         const playersWithStatus = team.players.map(player => ({
//           ...player,
//         }));
        
//         const nonPlayingPlayers = playersWithStatus.filter(p => p.isNowSubstitute);
//         if (nonPlayingPlayers.length === 0) {
//           updatedTeams.push(team);
//           continue;
//         }
        
//         const playingPlayers = playersWithStatus.filter(p => !p.isNowSubstitute);
//         const availableSubstitutes = team.substitutes?.filter(sub => 
//           !playingPlayers.some(p => p.id === sub.id)
//         ) || [];
        
//         let newPlayers = [...playingPlayers];
        
//         for (const nonPlayer of nonPlayingPlayers) {
//           const replacement = availableSubstitutes.find(sub => 
//             normalizeRole(sub.role) === normalizeRole(nonPlayer.role)
//           );
          
//           if (replacement) {
//             newPlayers.push(replacement);
//             availableSubstitutes.splice(availableSubstitutes.indexOf(replacement), 1);
//           } else {
//             newPlayers.push(nonPlayer);
//           }
//         }
        
//         updatedTeams.push({
//           ...team,
//           players: newPlayers,
//           captain: newPlayers.find(p => p.id === team.captain.id) || team.captain,
//           viceCaptain: newPlayers.find(p => p.id === team.viceCaptain.id) || team.viceCaptain,
//           updatedAt: new Date().toISOString(),
//           hadChanges: nonPlayingPlayers.length > 0
//         });
//       }
      
//       localStorage.setItem(localStorageKey, JSON.stringify(updatedTeams));
//       setGeneratedTeams(updatedTeams);
      
//       if (updatedTeams.some(t => t.hadChanges)) {
//         const currentTeamCount = updatedTeams.length;
//         showTeamCountMessage(currentTeamCount);
//       }
      
//     } catch (err) {
//       console.error("Failed to check lineup changes:", err);
//     }
//   }, [user?.id, matchId, localStorageKey]);

//   const generateButton = (
//     <div className="space-y-2">
//       <button
//         onClick={handleGenerateTeams}
//         disabled={isGenerating || !team1 || !team2}
//         className={`
//           w-full px-4 py-3 rounded-md font-bold
//           ${isGenerating ? 'bg-gray-500' : 
//            needsPayment ? 'bg-yellow-500 hover:bg-yellow-600' : 
//            'bg-blue-500 hover:bg-blue-600'}
//           text-white transition-colors
//         `}
//       >
//         {isGenerating ? (
//           <span className="flex items-center justify-center gap-2">
//             <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//             </svg>
//             Generating...
//           </span>
//         ) : !team1 || !team2 ? (
//           "Select both teams"
//         ) : needsPayment ? (
//           `Add ₹${paymentAmount} to Generate team`
//         ) : (
//           `Generate ${teamCount} Teams (₹${requiredCredits})`
//         )}
//       </button>

//       <div className="flex justify-between text-sm">
//         <span>Your Credits: <span className='text-green-500'>₹{userBalance} </span> </span>
//         {needsPayment ? (
//           <span className="text-red-500">Need ₹{paymentAmount} more</span>
//         ) : (
//           <span className="text-green-500">Sufficient balance</span>
//         )}
//       </div>

//       {error && (
//         <div className="text-red-500 text-sm p-2 bg-red-50 rounded-lg">
//           <p className="font-medium">{error}</p>
//           {error.includes("Player counts") && (
//             <div className="mt-2 text-xs">
//               <p>Current player counts:</p>
//               <ul className="list-disc pl-5">
//                 <li>WK-Batsman: {roleCounts.wk} (min 1)</li>
//                 <li>Batsmen: {roleCounts.batsmen} (min 3 including allrounders)</li>
//                 <li>Bowlers: {roleCounts.bowlers} (min 3 including allrounders)</li>
//               </ul>
//               <p className="mt-1">Try adjusting filters or risk level.</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );

//   const paymentDialog = showPaymentDialog && (
//     <PaymentDialog
//       currentBalance={userBalance}
//       requiredAmount={paymentAmount}
//       onPaymentSuccess={(amount) => {
//         onBalanceUpdate(userBalance + amount);
//         setShowPaymentDialog(false);
//         handleGenerateTeams();
//       }}
//       onOpenChange={setShowPaymentDialog}
//       open={showPaymentDialog}
//       onProcessingStateChange={setIsGenerating}
//     />
//   );

//   return {
//     generatedTeams,
//     isGenerating,
//     generateButton,
//     paymentDialog,
//     error,
//     setError,
//     fetchSavedTeams,
//     setGeneratedTeams,
//     checkLineupChanges
//   };
// };





// "use client";
// import { useState, useCallback, useMemo, useEffect } from "react";
// import { PaymentDialog } from "./PaymentDialog";
// import { Team, PlayerDetail, GeneratedTeam } from "../../types/match";
// import { db } from "@/lib/firebase";
// import { 
//   doc, 
//   runTransaction, 
//   increment, 
//   setDoc, 
//   collection, 
//   query, 
//   orderBy, 
//   getDocs,
//   limit
// } from "firebase/firestore";
// import { useUser } from "@clerk/nextjs";

// interface TeamGeneratorProps {
//   team1?: Team;
//   team2?: Team;
//   teamCount: number;
//   riskLevel: number;
//   userBalance: number;
//   onBalanceUpdate: (newBalance: number) => void;
//   matchId: string;
// }

// interface EnhancedPlayerDetail extends PlayerDetail {
//   roleOrder: number;
//   selectedBy: number;
//   selCapPerc?: number;
//   selVcPerc?: number;
//   normalizedRole: string;
//   isPlaying: boolean;
// }

// export const useTeamGenerator = ({ 
//   team1, 
//   team2, 
//   teamCount, 
//   riskLevel,
//   userBalance,
//   onBalanceUpdate,
//   matchId
// }: TeamGeneratorProps) => {
//   const { user } = useUser();
//   const [generatedTeams, setGeneratedTeams] = useState<GeneratedTeam[]>([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [showPaymentDialog, setShowPaymentDialog] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [roleCounts, setRoleCounts] = useState({
//     wk: 0,
//     batsmen: 0,
//     allrounders: 0,
//     bowlers: 0
//   });

//   const MAX_TEAMS_PER_MATCH = 20;
//   const MIN_TEAMS_FOR_GRAND_LEAGUE = 10;
//   const requiredCredits = useMemo(() => teamCount * 100, [teamCount]);
//   const needsPayment = useMemo(() => userBalance < requiredCredits, [userBalance, requiredCredits]);
//   const paymentAmount = useMemo(() => Math.max(requiredCredits - userBalance, 100), [requiredCredits, userBalance]);
//   const localStorageKey = useMemo(() => `matchTeams_${matchId}_${user?.id}`, [matchId, user?.id]);

//   const showTeamCountMessage = (currentTeamCount: number) => {
//     const teamsNeeded = MIN_TEAMS_FOR_GRAND_LEAGUE - currentTeamCount;

//     if (teamsNeeded > 0) {
//       alert(`🔥 You need ${teamsNeeded} more teams to qualify for Grand League prizes! 
//             Create at least ${MIN_TEAMS_FOR_GRAND_LEAGUE} teams to compete for the mega winnings 🏆`);
//     } else if (currentTeamCount >= MIN_TEAMS_FOR_GRAND_LEAGUE) {
//       alert('🎉 Congratulations! You have qualified for Grand League prizes with your teams!');
//     }
//   };

//   const getRoleOrder = (role: string): number => {
//     const normalized = normalizeRole(role);
//     switch(normalized) {
//       case 'WK-Batsman': return 1;
//       case 'Batsman': return 2;
//       case 'Batting Allrounder': return 3;
//       case 'Bowling Allrounder': return 4;
//       case 'Bowler': return 5;
//       default: return 6;
//     }
//   };

//   const normalizeRole = (role: string): string => {
//     if (!role) return 'Bowler';
//     const lowerRole = role.toLowerCase().trim();
//     if (lowerRole.includes('keep') || lowerRole.includes('wk')) return 'WK-Batsman';
//     if (lowerRole.includes('bat') && lowerRole.includes('all')) return 'Batting Allrounder';
//     if (lowerRole.includes('bowl') && lowerRole.includes('all')) return 'Bowling Allrounder';
//     if (lowerRole.includes('bat')) return 'Batsman';
//     if (lowerRole.includes('bowl')) return 'Bowler';
//     if (lowerRole.includes('all')) return 'Bowling Allrounder';
//     return 'Bowler';
//   };

//   const getNeededRoles = (composition: any, riskLevel: number): string[] => {
//     const neededRoles: string[] = [];
    
//     if (composition['WK-Batsman'] < 1) neededRoles.push('WK-Batsman');
    
//     if (riskLevel < 50) {
//       if (composition['Batsman'] + composition['Batting Allrounder'] < 3) {
//         neededRoles.push('Batsman', 'Batting Allrounder');
//       }
//       if (composition['Bowler'] + composition['Bowling Allrounder'] < 3) {
//         neededRoles.push('Bowler', 'Bowling Allrounder');
//       }
//     } else {
//       if (composition['Batsman'] + composition['Batting Allrounder'] < 4) {
//         neededRoles.push('Batsman', 'Batting Allrounder');
//       }
//       if (composition['Bowler'] + composition['Bowling Allrounder'] < 2) {
//         neededRoles.push('Bowler', 'Bowling Allrounder');
//       }
//     }
    
//     return neededRoles.length > 0 ? neededRoles : 
//       ['Batsman', 'Batting Allrounder', 'Bowling Allrounder', 'Bowler'];
//   };

//   const validateTeamWithRatio = (
//     players: EnhancedPlayerDetail[],
//     composition: any,
//     team1Short: string,
//     team2Short: string,
//     teamRatio: { main: number; secondary: number }
//   ) => {
//     if (players.length !== 11) return false;
    
//     const mainTeam = composition[team1Short] >= composition[team2Short] ? team1Short : team2Short;
//     const secondaryTeam = mainTeam === team1Short ? team2Short : team1Short;
    
//     const mainDiff = Math.abs(composition[mainTeam] - teamRatio.main);
//     const secondaryDiff = Math.abs(composition[secondaryTeam] - teamRatio.secondary);
    
//     if (mainDiff > 1 || secondaryDiff > 1) {
//       return false;
//     }
    
//     if (composition['WK-Batsman'] < 1) return false;
    
//     const batCount = composition['Batsman'] + composition['Batting Allrounder'];
//     if (batCount < 2) return false;
    
//     const bowlCount = composition['Bowler'] + composition['Bowling Allrounder'];
//     if (bowlCount < 2) return false;
    
//     if (composition.overseas > 5) return false;
    
//     return true;
//   };

//   const getPlayerPool = useCallback((): EnhancedPlayerDetail[] => {
//     if (!team1 || !team2) return [];
    
//     const team1Players = team1.playerDetails || [];
//     const team2Players = team2.playerDetails || [];
    
//     const allPlayers = [...team1Players, ...team2Players].map(p => ({
//       ...p,
//       roleOrder: getRoleOrder(p.role),
//       normalizedRole: normalizeRole(p.role),
//       selectedBy: p.selectedBy || 0.1,
//       selCapPerc: p.selCapPerc || 0.1,
//       selVcPerc: p.selVcPerc || 0.1,
//       isPlaying: !p.substitute
//     }));

//     const wkPlayers = allPlayers.filter(p => p.normalizedRole === 'WK-Batsman');
//     const batPlayers = allPlayers.filter(p => 
//       ['Batsman', 'Batting Allrounder'].includes(p.normalizedRole)
//     );
//     const bowlPlayers = allPlayers.filter(p => 
//       ['Bowler', 'Bowling Allrounder'].includes(p.normalizedRole)
//     );
//     const allPlayersCount = allPlayers.filter(p => 
//       ['Bowling Allrounder', 'Batting Allrounder'].includes(p.normalizedRole)
//     );

//     setRoleCounts({
//       wk: wkPlayers.length,
//       batsmen: batPlayers.length,
//       allrounders: allPlayersCount.length,
//       bowlers: bowlPlayers.length
//     });

//     if (wkPlayers.length < 1) {
//       setError(`Need at least 1 WK-Batsman (available: ${wkPlayers.length})`);
//       return [];
//     }
//     if (batPlayers.length < 3) {
//       setError(`Need at least 3 Batsmen (available: ${batPlayers.length})`);
//       return [];
//     }
//     if (bowlPlayers.length < 3) {
//       setError(`Need at least 3 Bowlers (available: ${bowlPlayers.length})`);
//       return [];
//     }

//     return allPlayers;
//   }, [team1, team2]);

//   const calculatePlayerScore = (player: EnhancedPlayerDetail, forCaptaincy = false) => {
//     const baseScore = forCaptaincy ? 
//       (player.selCapPerc || player.selectedBy) : 
//       (player.selectedBy);
    
//     let riskFactor = 1;
//     if (riskLevel < 20) {
//       riskFactor = 1 + (Math.random() * 0.1);
//     } else if (riskLevel < 40) {
//       riskFactor = 0.9 + (Math.random() * 0.2);
//     } else if (riskLevel < 60) {
//       riskFactor = 0.8 + (Math.random() * 0.4);
//     } else if (riskLevel < 80) {
//       riskFactor = 0.6 + (Math.random() * 0.6);
//     } else {
//       riskFactor = 0.4 + (Math.random() * 0.8);
//     }
    
//     return baseScore * riskFactor;
//   };

//   const getTeamCompositionByRisk = () => {
//     if (riskLevel < 20) return { wk: 1, bat: 4, ar: 2, bowl: 4 };
//     if (riskLevel < 40) return { wk: 1, bat: 3, ar: 3, bowl: 4 };
//     if (riskLevel < 60) return { wk: 1, bat: 3, ar: 4, bowl: 3 };
//     if (riskLevel < 80) return { wk: 1, bat: 5, ar: 3, bowl: 2 };
//     return Math.random() > 0.5 
//       ? { wk: 1, bat: 6, ar: 2, bowl: 2 } 
//       : { wk: 1, bat: 2, ar: 4, bowl: 4 };
//   };

//   const weightedRandomPick = (players: EnhancedPlayerDetail[], field: 'selectedBy' | 'selCapPerc' | 'selVcPerc') => {
//     const totalWeight = players.reduce((sum, p) => sum + (p[field] || 0.1), 0);
//     let random = Math.random() * totalWeight;
    
//     for (const player of players) {
//       random -= player[field] || 0.1;
//       if (random <= 0) return player;
//     }
//     return players[0];
//   };

//   const selectPlayerByRisk = (players: EnhancedPlayerDetail[], risk: number) => {
//     if (players.length === 0) return null;
    
//     const sorted = [...players].sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0));
//     const safeRandomIndex = (max: number) => Math.min(Math.floor(Math.random() * max), sorted.length - 1);
    
//     if (risk < 20) {
//       const topCount = Math.max(1, Math.ceil(sorted.length * 0.3));
//       return sorted[safeRandomIndex(topCount)];
//     } else if (risk < 40) {
//       const topCount = Math.max(1, Math.ceil(sorted.length * 0.4));
//       return weightedRandomPick(sorted.slice(0, topCount), 'selectedBy');
//     } else if (risk < 60) {
//       const topCount = Math.max(1, Math.ceil(sorted.length * 0.6));
//       return Math.random() > 0.7 
//         ? sorted[safeRandomIndex(sorted.length)]
//         : weightedRandomPick(sorted.slice(0, topCount), 'selectedBy');
//     } else if (risk < 80) {
//       return Math.random() > 0.5 
//         ? weightedRandomPick(sorted, 'selectedBy')
//         : sorted[safeRandomIndex(sorted.length)];
//     } else {
//       return sorted[safeRandomIndex(sorted.length)];
//     }
//   };

//   const selectCaptainAndViceCaptain = (
//     players: EnhancedPlayerDetail[],
//     risk: number,
//     existingTeams: GeneratedTeam[] = []
//   ): { captain: EnhancedPlayerDetail; viceCaptain: EnhancedPlayerDetail } => {
//     const topPlayers = players.slice(0, Math.ceil(players.length * 0.3));
//     let attempts = 0;
//     const MAX_ATTEMPTS = 20;
    
//     const recentCombinations = existingTeams.slice(0, 5).map(t => 
//       `${t.captain.id}-${t.viceCaptain.id}`
//     );

//     while (attempts < MAX_ATTEMPTS) {
//       attempts++;
      
//       let captain: EnhancedPlayerDetail;
//       let viceCaptain: EnhancedPlayerDetail;

//       if (risk < 20) {
//         captain = topPlayers[0];
//         viceCaptain = topPlayers[1] || topPlayers[0];
//       } else if (risk < 40) {
//         captain = topPlayers[0];
//         viceCaptain =
//           topPlayers.find(p => p.normalizedRole !== captain.normalizedRole) ||
//           topPlayers[1] ||
//           topPlayers[0];
//       } else if (risk < 60) {
//         captain = topPlayers[Math.floor(Math.random() * Math.min(3, topPlayers.length))];
//         viceCaptain =
//           topPlayers
//             .slice(0, 5)
//             .find(p => p.normalizedRole !== captain.normalizedRole) ||
//           topPlayers[1] ||
//           topPlayers[0];
//       } else if (risk < 80) {
//         captain = topPlayers[Math.floor(Math.random() * Math.min(5, topPlayers.length))];
//         viceCaptain = topPlayers[Math.floor(Math.random() * Math.min(10, topPlayers.length))];
//       } else {
//         captain = topPlayers[Math.floor(Math.random() * topPlayers.length)];
//         viceCaptain = topPlayers.find(p => p.id !== captain.id) || topPlayers[0];
//       }

//       const comboKey = `${captain.id}-${viceCaptain.id}`;
      
//       if (!recentCombinations.includes(comboKey) || attempts >= MAX_ATTEMPTS - 5) {
//         return { captain, viceCaptain };
//       }
//     }

//     return { 
//       captain: topPlayers[0], 
//       viceCaptain: topPlayers[1] || topPlayers[0] 
//     };
//   };

//   const createBalancedTeam = useCallback((
//     players: EnhancedPlayerDetail[], 
//     existingTeamCount: number,
//     existingTeams: GeneratedTeam[] = []
//   ) => {
//     if (!team1 || !team2) return null;
    
//     const MAX_ATTEMPTS = 500;
//     const team1Short = team1.shortName || 'T1';
//     const team2Short = team2.shortName || 'T2';
//     const teamRatio = riskLevel >= 50 ? { main: 7, secondary: 4 } : { main: 6, secondary: 5 };
//     const availablePlayers = players.filter(p => 
//       p.selectedBy !== undefined && p.selectedBy > 0
//     );
    
//     if (availablePlayers.length < 11) {
//       setError(`Not enough available players (${availablePlayers.length}/11)`);
//       return null;
//     }
  
//     const sortedPlayers = [...availablePlayers].sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0));
  
//     let attempts = 0;
//     while (attempts < MAX_ATTEMPTS) {
//       attempts++;
      
//       const mainTeam = Math.random() > 0.5 ? team1Short : team2Short;
//       const secondaryTeam = mainTeam === team1Short ? team2Short : team1Short;
      
//       const teamComposition = {
//         'WK-Batsman': 0,
//         'Batsman': 0,
//         'Batting Allrounder': 0,
//         'Bowling Allrounder': 0,
//         'Bowler': 0,
//         [team1Short]: 0,
//         [team2Short]: 0,
//         overseas: 0,
//         totalScore: 0
//       };
  
//       const { captain, viceCaptain } = selectCaptainAndViceCaptain(
//         sortedPlayers, 
//         riskLevel,
//         existingTeams
//       );
//       if (!captain || !viceCaptain) continue;
  
//       const teamPlayers: EnhancedPlayerDetail[] = [captain, viceCaptain];
      
//       [captain, viceCaptain].forEach(player => {
//         const role = player.normalizedRole;
//         teamComposition[role]++;
//         teamComposition[player.teamName === team1.name ? team1Short : team2Short]++;
//         if (player.isOverseas) teamComposition.overseas++;
//         teamComposition.totalScore += calculatePlayerScore(player);
//       });
  
//       const remainingPlayers = sortedPlayers.filter(p => 
//         !teamPlayers.some(tp => tp.id === p.id) &&
//         p.id !== captain.id && 
//         p.id !== viceCaptain.id
//       );
  
//       let wkAttempts = 0;
//       while (teamComposition['WK-Batsman'] < 1 && wkAttempts < 10) {
//         wkAttempts++;
//         const wkPlayers = remainingPlayers.filter(p => p.normalizedRole === 'WK-Batsman');
//         if (wkPlayers.length === 0) break;
        
//         const wkPlayer = selectPlayerByRisk(wkPlayers, riskLevel);
//         if (!wkPlayer || teamPlayers.some(p => p.id === wkPlayer.id)) continue;
        
//         teamPlayers.push(wkPlayer);
//         teamComposition['WK-Batsman']++;
//         teamComposition[wkPlayer.teamName === team1.name ? team1Short : team2Short]++;
//         if (wkPlayer.isOverseas) teamComposition.overseas++;
//         teamComposition.totalScore += calculatePlayerScore(wkPlayer);
        
//         remainingPlayers.splice(remainingPlayers.findIndex(p => p.id === wkPlayer.id), 1);
//       }
  
//       while (teamPlayers.length < 11 && remainingPlayers.length > 0) {
//         const mainTeamCount = teamComposition[mainTeam];
//         const secondaryTeamCount = teamComposition[secondaryTeam];
        
//         let allowedTeams = [];
//         if (mainTeamCount < teamRatio.main) {
//           allowedTeams.push(mainTeam);
//         }
//         if (secondaryTeamCount < teamRatio.secondary) {
//           allowedTeams.push(secondaryTeam);
//         }
        
//         if (allowedTeams.length === 0) {
//           allowedTeams = [mainTeam, secondaryTeam];
//         }
  
//         const neededRoles = getNeededRoles(teamComposition, riskLevel);
        
//         let candidates = remainingPlayers.filter(p => {
//           const team = p.teamName === team1.name ? team1Short : team2Short;
//           const teamAllowed = allowedTeams.includes(team);
//           const overseasOK = !p.isOverseas || teamComposition.overseas < 5;
//           const roleNeeded = neededRoles.includes(p.normalizedRole);
//           return teamAllowed && overseasOK && roleNeeded;
//         });
  
//         if (candidates.length === 0) {
//           candidates = remainingPlayers.filter(p => {
//             const team = p.teamName === team1.name ? team1Short : team2Short;
//             return allowedTeams.includes(team) && 
//                    (!p.isOverseas || teamComposition.overseas < 5);
//           });
//         }
  
//         if (candidates.length === 0) {
//           candidates = remainingPlayers.filter(p => {
//             const team = p.teamName === team1.name ? team1Short : team2Short;
//             return allowedTeams.includes(team);
//           });
//         }
  
//         if (candidates.length === 0) break;
  
//         const selectedPlayer = selectPlayerByRisk(candidates, riskLevel);
//         if (!selectedPlayer || teamPlayers.some(p => p.id === selectedPlayer.id)) {
//           break;
//         }
  
//         teamPlayers.push(selectedPlayer);
//         const role = selectedPlayer.normalizedRole;
//         teamComposition[role]++;
//         teamComposition[selectedPlayer.teamName === team1.name ? team1Short : team2Short]++;
//         if (selectedPlayer.isOverseas) teamComposition.overseas++;
//         teamComposition.totalScore += calculatePlayerScore(selectedPlayer);
  
//         remainingPlayers.splice(remainingPlayers.findIndex(p => p.id === selectedPlayer.id), 1);
//       }
  
//       if (teamPlayers.length === 11 && validateTeamWithRatio(teamPlayers, teamComposition, team1Short, team2Short, teamRatio)) {
//         const allAvailablePlayers = players.filter(p => 
//           !teamPlayers.some(tp => tp.id === p.id)
//         );
        
//         const substitutes = [...allAvailablePlayers]
//           .sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0))
//           .slice(0, 4);
  
//         return {
//           players: [...teamPlayers].sort((a, b) => (a.roleOrder || 6) - (b.roleOrder || 6)),
//           captain,
//           viceCaptain,
//           substitutes,
//           teamName: `Team ${existingTeamCount + 1}`,
//           teamComposition,
//           riskLevel,
//           matchId,
//           createdAt: new Date().toISOString(),
//           changes: 0
//         };
//       }
//     }
  
//     console.error(`Team generation failed after ${MAX_ATTEMPTS} attempts`);
//     setError(`Failed to generate valid team after ${MAX_ATTEMPTS} attempts. Try adjusting risk level.`);
//     return null;
//   }, [team1, team2, riskLevel, matchId]);

//   const getTeamCountForMatch = async (): Promise<number> => {
//     if (!user || !matchId) return 0;
    
//     try {
//       const q = query(
//         collection(db, "users", user.id, "matches", matchId, "teams"),
//         limit(MAX_TEAMS_PER_MATCH)
//       );
//       const querySnapshot = await getDocs(q);
//       return querySnapshot.size;
//     } catch (err) {
//       console.error("Failed to count teams:", err);
//       return 0;
//     }
//   };

//   const saveTeamToFirestore = async (team: GeneratedTeam) => {
//     if (!user || !matchId) return;
    
//     try {
//       const teamData = {
//         ...team,
//         userId: user.id,
//         userEmail: user.primaryEmailAddress?.emailAddress || '',
//         matchName: `${team1?.name} vs ${team2?.name}`,
//         team1ShortName: team1?.shortName || team1?.name.split(' ').map(n => n[0]).join(''),
//         team2ShortName: team2?.shortName || team2?.name.split(' ').map(n => n[0]).join(''),
//         team1Logo: team1?.logo || '/fallback-team.png',
//         team2Logo: team2?.logo || '/fallback-team.png'
//       };

//       const matchTeamsRef = collection(db, "users", user.id, "matches", matchId, "teams");
//       const teamRef = doc(matchTeamsRef);
      
//       await setDoc(teamRef, teamData);
//       return teamRef.id;
//     } catch (err) {
//       console.error("Failed to save team:", err);
//       throw err;
//     }
//   };

//   const fetchSavedTeams = useCallback(async (): Promise<GeneratedTeam[]> => {
//     if (!user || !matchId) return [];
    
//     try {
//       const q = query(
//         collection(db, "users", user.id, "matches", matchId, "teams"),
//         orderBy("createdAt", "desc"),
//         limit(MAX_TEAMS_PER_MATCH)
//       );
//       const querySnapshot = await getDocs(q);
//       return querySnapshot.docs.map(doc => ({
//         ...doc.data() as GeneratedTeam,
//         id: doc.id
//       }));
//     } catch (err) {
//       console.error("Failed to fetch saved teams:", err);
//       return [];
//     }
//   }, [user, matchId]);

//   useEffect(() => {
//     const loadTeams = async () => {
//       if (!matchId || !user?.id) return;
      
//       try {
//         const savedTeams = localStorage.getItem(localStorageKey);
//         if (savedTeams) {
//           setGeneratedTeams(JSON.parse(savedTeams));
//           return;
//         }

//         const teams = await fetchSavedTeams();
//         if (teams.length > 0) {
//           setGeneratedTeams(teams);
//           localStorage.setItem(localStorageKey, JSON.stringify(teams));
//           showTeamCountMessage(teams.length);
//         }
//       } catch (err) {
//         console.error("Failed to load teams:", err);
//       }
//     };

//     loadTeams();
//   }, [localStorageKey, matchId, user?.id, fetchSavedTeams]);

//   const handleGenerateTeams = useCallback(async () => {
//     if (!team1 || !team2) {
//       setError("Select both teams first");
//       return;
//     }

//     if (!user) {
//       setError("Please sign in to generate teams");
//       return;
//     }

//     const currentTeamCount = await getTeamCountForMatch();
//     if (currentTeamCount >= MAX_TEAMS_PER_MATCH) {
//       setError(`You've reached the maximum of ${MAX_TEAMS_PER_MATCH} teams for this match`);
//       return;
//     }

//     const remainingTeamSlots = MAX_TEAMS_PER_MATCH - currentTeamCount;
//     const teamsToGenerate = Math.min(teamCount, remainingTeamSlots);

//     if (teamsToGenerate <= 0) {
//       setError(`You've reached the maximum of ${MAX_TEAMS_PER_MATCH} teams for this match`);
//       return;
//     }

//     if (needsPayment) {
//       setShowPaymentDialog(true);
//       return;
//     }

//     const allPlayers = getPlayerPool();
//     if (allPlayers.length < 11) {
//       setError(`Not enough players (${allPlayers.length}/11). Please check your filters.`);
//       return;
//     }

//     setIsGenerating(true);
//     setError(null);

//     try {
//       await runTransaction(db, async (transaction) => {
//         const userRef = doc(db, "users", user.id);
//         const userDoc = await transaction.get(userRef);
        
//         if (!userDoc.exists()) throw new Error("User not found");
//         if ((userDoc.data().credits || 0) < requiredCredits) {
//           throw new Error("Insufficient balance");
//         }
        
//         transaction.update(userRef, {
//           credits: increment(-requiredCredits)
//         });
//       });

//       const newTeams: GeneratedTeam[] = [];
//       const TOTAL_ATTEMPTS = teamsToGenerate * 100;
//       let attempts = 0;

//       while (newTeams.length < teamsToGenerate && attempts < TOTAL_ATTEMPTS) {
//         attempts++;
//         const team = createBalancedTeam(allPlayers, currentTeamCount + newTeams.length, newTeams);
        
//         if (team) {
//           const isUnique = newTeams.every(existingTeam => {
//             const existingPlayers = existingTeam.players.map(p => p.id).sort();
//             const newPlayers = team.players.map(p => p.id).sort();
//             const diffCount = existingPlayers.filter(id => !newPlayers.includes(id)).length;
//             return diffCount >= 3;
//           });

//           if (isUnique || newTeams.length === 0) {
//             const teamId = await saveTeamToFirestore(team);
//             newTeams.push({ ...team, id: teamId });
//           }
//         }
//       }

//       if (newTeams.length === 0) {
//         const actualCounts = {
//           wk: allPlayers.filter(p => p.normalizedRole === 'WK-Batsman').length,
//           batsmen: allPlayers.filter(p => 
//             ['Batsman', 'Batting Allrounder'].includes(p.normalizedRole)
//           ).length,
//           allrounders: allPlayers.filter(p => 
//             ['Bowling Allrounder', 'Batting Allrounder'].includes(p.normalizedRole)
//           ).length,
//           bowlers: allPlayers.filter(p => 
//             ['Bowler', 'Bowling Allrounder'].includes(p.normalizedRole)
//           ).length
//         };

//         throw new Error(
//           `Failed to generate valid teams after ${TOTAL_ATTEMPTS} attempts.\n` +
//           `Player counts: WK: ${actualCounts.wk}, Batsmen: ${actualCounts.batsmen}, ` +
//           `Allrounders: ${actualCounts.allrounders}, Bowlers: ${actualCounts.bowlers}\n` +
//           `Try adjusting your risk level or player filters.`
//         );
//       }

//       const updatedTeams = [...newTeams, ...generatedTeams];
//       setGeneratedTeams(updatedTeams);
//       localStorage.setItem(localStorageKey, JSON.stringify(updatedTeams));
//       onBalanceUpdate(userBalance - requiredCredits);

//       const updatedTeamCount = currentTeamCount + newTeams.length;
//       showTeamCountMessage(updatedTeamCount);

//     } catch (err: any) {
//       setError(err.message || "Failed to generate teams");
//     } finally {
//       setIsGenerating(false);
//     }
//   }, [
//     team1, team2, teamCount, riskLevel, user, 
//     userBalance, requiredCredits, needsPayment, 
//     onBalanceUpdate, createBalancedTeam, matchId,
//     fetchSavedTeams, getPlayerPool, generatedTeams,
//     localStorageKey, roleCounts, getTeamCountForMatch,
//     saveTeamToFirestore
//   ]);

//   const checkLineupChanges = useCallback(async () => {
//     if (!user?.id || !matchId) return;
    
//     try {
//       const savedTeams = localStorage.getItem(localStorageKey);
//       if (!savedTeams) return;
      
//       const teams: GeneratedTeam[] = JSON.parse(savedTeams);
//       const updatedTeams = [];
      
//       for (const team of teams) {
//         const playersWithStatus = team.players.map(player => ({
//           ...player,
//           isNowSubstitute: checkIfPlayerIsSubstitute(player.id)
//         }));
        
//         const nonPlayingPlayers = playersWithStatus.filter(p => p.isNowSubstitute);
//         if (nonPlayingPlayers.length === 0) {
//           updatedTeams.push(team);
//           continue;
//         }
        
//         const playingPlayers = playersWithStatus.filter(p => !p.isNowSubstitute);
//         const availableSubstitutes = team.substitutes?.filter(sub => 
//           !playingPlayers.some(p => p.id === sub.id)
//         ) || [];
        
//         let newPlayers = [...playingPlayers];
        
//         for (const nonPlayer of nonPlayingPlayers) {
//           const replacement = availableSubstitutes.find(sub => 
//             normalizeRole(sub.role) === normalizeRole(nonPlayer.role)
//           );
          
//           if (replacement) {
//             newPlayers.push(replacement);
//             availableSubstitutes.splice(availableSubstitutes.indexOf(replacement), 1);
//           } else {
//             newPlayers.push(nonPlayer);
//           }
//         }
        
//         updatedTeams.push({
//           ...team,
//           players: newPlayers,
//           captain: newPlayers.find(p => p.id === team.captain.id) || team.captain,
//           viceCaptain: newPlayers.find(p => p.id === team.viceCaptain.id) || team.viceCaptain,
//           updatedAt: new Date().toISOString(),
//           hadChanges: nonPlayingPlayers.length > 0
//         });
//       }
      
//       localStorage.setItem(localStorageKey, JSON.stringify(updatedTeams));
//       setGeneratedTeams(updatedTeams);
      
//       if (updatedTeams.some(t => t.hadChanges)) {
//         const currentTeamCount = updatedTeams.length;
//         showTeamCountMessage(currentTeamCount);
//       }
      
//     } catch (err) {
//       console.error("Failed to check lineup changes:", err);
//     }
//   }, [user?.id, matchId, localStorageKey]);

//   const checkIfPlayerIsSubstitute = (playerId: string): boolean => {
//     return Math.random() < 0.1;
//   };

//   const generateButton = (
//     <div className="space-y-2">
//       <button
//         onClick={handleGenerateTeams}
//         disabled={isGenerating || !team1 || !team2}
//         className={`
//           w-full px-4 py-3 rounded-md font-bold
//           ${isGenerating ? 'bg-gray-500' : 
//            needsPayment ? 'bg-yellow-500 hover:bg-yellow-600' : 
//            'bg-blue-500 hover:bg-blue-600'}
//           text-white transition-colors
//         `}
//       >
//         {isGenerating ? (
//           <span className="flex items-center justify-center gap-2">
//             <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//             </svg>
//             Generating...
//           </span>
//         ) : !team1 || !team2 ? (
//           "Select both teams"
//         ) : needsPayment ? (
//           `Add ₹${paymentAmount} to Generate team`
//         ) : (
//           `Generate ${teamCount} Teams (₹${requiredCredits})`
//         )}
//       </button>

//       <div className="flex justify-between text-sm">
//         <span>Your Credits: <span className='text-green-500'>₹{userBalance} </span> </span>
//         {needsPayment ? (
//           <span className="text-red-500">Need ₹{paymentAmount} more</span>
//         ) : (
//           <span className="text-green-500">Sufficient balance</span>
//         )}
//       </div>

//       {error && (
//         <div className="text-red-500 text-sm p-2 bg-red-50 rounded-lg">
//           <p className="font-medium">{error}</p>
//           {error.includes("Player counts") && (
//             <div className="mt-2 text-xs">
//               <p>Current player counts:</p>
//               <ul className="list-disc pl-5">
//                 <li>WK-Batsman: {roleCounts.wk} (min 1)</li>
//                 <li>Batsmen: {roleCounts.batsmen} (min 3 including allrounders)</li>
//                 <li>Bowlers: {roleCounts.bowlers} (min 3 including allrounders)</li>
//               </ul>
//               <p className="mt-1">Try adjusting filters or risk level.</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );

//   const paymentDialog = showPaymentDialog && (
//     <PaymentDialog
//       currentBalance={userBalance}
//       requiredAmount={paymentAmount}
//       onPaymentSuccess={(amount) => {
//         onBalanceUpdate(userBalance + amount);
//         setShowPaymentDialog(false);
//         handleGenerateTeams();
//       }}
//       onOpenChange={setShowPaymentDialog}
//       open={showPaymentDialog}
//       onProcessingStateChange={setIsGenerating}
//     />
//   );

//   return {
//     generatedTeams,
//     isGenerating,
//     generateButton,
//     paymentDialog,
//     error,
//     setError,
//     fetchSavedTeams,
//     setGeneratedTeams,
//     checkLineupChanges
//   };
// };




// "use client";
// import { useState, useCallback, useMemo, useEffect } from "react";
// import { PaymentDialog } from "./PaymentDialog";
// import { Team, PlayerDetail, GeneratedTeam } from "../../types/match";
// import { db } from "@/lib/firebase";
// import { 
//   doc, 
//   runTransaction, 
//   increment, 
//   setDoc, 
//   collection, 
//   query, 
//   orderBy, 
//   getDocs,
//   limit
// } from "firebase/firestore";
// import { useUser } from "@clerk/nextjs";

// interface TeamGeneratorProps {
//   team1?: Team;
//   team2?: Team;
//   teamCount: number;
//   riskLevel: number;
//   userBalance: number;
//   onBalanceUpdate: (newBalance: number) => void;
//   matchId: string;
// }

// interface EnhancedPlayerDetail extends PlayerDetail {
//   roleOrder: number;
//   selectedBy: number;
//   selCapPerc?: number;
//   selVcPerc?: number;
//   normalizedRole: string;
//   isPlaying: boolean;
// }

// export const useTeamGenerator = ({ 
//   team1, 
//   team2, 
//   teamCount, 
//   riskLevel,
//   userBalance,
//   onBalanceUpdate,
//   matchId
// }: TeamGeneratorProps) => {
//   const { user } = useUser();
//   const [generatedTeams, setGeneratedTeams] = useState<GeneratedTeam[]>([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [showPaymentDialog, setShowPaymentDialog] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [roleCounts, setRoleCounts] = useState({
//     wk: 0,
//     batsmen: 0,
//     allrounders: 0,
//     bowlers: 0
//   });

//   const MAX_TEAMS_PER_MATCH = 20;
//   const MIN_TEAMS_FOR_GRAND_LEAGUE = 10;
//   const requiredCredits = useMemo(() => teamCount * 100, [teamCount]);
//   const needsPayment = useMemo(() => userBalance < requiredCredits, [userBalance, requiredCredits]);
//   const paymentAmount = useMemo(() => Math.max(requiredCredits - userBalance, 100), [requiredCredits, userBalance]);
//   const localStorageKey = useMemo(() => `matchTeams_${matchId}_${user?.id}`, [matchId, user?.id]);

//   const showTeamCountMessage = (currentTeamCount: number) => {
//     const teamsNeeded = MIN_TEAMS_FOR_GRAND_LEAGUE - currentTeamCount;

//     if (teamsNeeded > 0) {
//       alert(`🔥 You need ${teamsNeeded} more teams to qualify for Grand League prizes! 
//             Create at least ${MIN_TEAMS_FOR_GRAND_LEAGUE} teams to compete for the mega winnings 🏆`);
//     } else if (currentTeamCount >= MIN_TEAMS_FOR_GRAND_LEAGUE) {
//       alert('🎉 Congratulations! You have qualified for Grand League prizes with your teams!');
//     }
//   };

//   const getRoleOrder = (role: string): number => {
//     const normalized = normalizeRole(role);
//     switch(normalized) {
//       case 'WK-Batsman': return 1;
//       case 'Batsman': return 2;
//       case 'Batting Allrounder': return 3;
//       case 'Bowling Allrounder': return 4;
//       case 'Bowler': return 5;
//       default: return 6;
//     }
//   };

//   const normalizeRole = (role: string): string => {
//     if (!role) return 'Bowler';
//     const lowerRole = role.toLowerCase().trim();
//     if (lowerRole.includes('keep') || lowerRole.includes('wk')) return 'WK-Batsman';
//     if (lowerRole.includes('bat') && lowerRole.includes('all')) return 'Batting Allrounder';
//     if (lowerRole.includes('bowl') && lowerRole.includes('all')) return 'Bowling Allrounder';
//     if (lowerRole.includes('bat')) return 'Batsman';
//     if (lowerRole.includes('bowl')) return 'Bowler';
//     if (lowerRole.includes('all')) return 'Bowling Allrounder';
//     return 'Bowler';
//   };

//   const getNeededRoles = (composition: any, riskLevel: number): string[] => {
//     const neededRoles: string[] = [];
    
//     if (composition['WK-Batsman'] < 1) neededRoles.push('WK-Batsman');
    
//     if (riskLevel < 50) {
//       if (composition['Batsman'] + composition['Batting Allrounder'] < 3) {
//         neededRoles.push('Batsman', 'Batting Allrounder');
//       }
//       if (composition['Bowler'] + composition['Bowling Allrounder'] < 3) {
//         neededRoles.push('Bowler', 'Bowling Allrounder');
//       }
//     } else {
//       if (composition['Batsman'] + composition['Batting Allrounder'] < 4) {
//         neededRoles.push('Batsman', 'Batting Allrounder');
//       }
//       if (composition['Bowler'] + composition['Bowling Allrounder'] < 2) {
//         neededRoles.push('Bowler', 'Bowling Allrounder');
//       }
//     }
    
//     return neededRoles.length > 0 ? neededRoles : 
//       ['Batsman', 'Batting Allrounder', 'Bowling Allrounder', 'Bowler'];
//   };

//   const validateTeamWithRatio = (
//     players: EnhancedPlayerDetail[],
//     composition: any,
//     team1Short: string,
//     team2Short: string,
//     teamRatio: { main: number; secondary: number }
//   ) => {
//     if (players.length !== 11) return false;
    
//     const mainTeam = composition[team1Short] >= composition[team2Short] ? team1Short : team2Short;
//     const secondaryTeam = mainTeam === team1Short ? team2Short : team1Short;
    
//     const mainDiff = Math.abs(composition[mainTeam] - teamRatio.main);
//     const secondaryDiff = Math.abs(composition[secondaryTeam] - teamRatio.secondary);
    
//     if (mainDiff > 1 || secondaryDiff > 1) {
//       return false;
//     }
    
//     if (composition['WK-Batsman'] < 1) return false;
    
//     const batCount = composition['Batsman'] + composition['Batting Allrounder'];
//     if (batCount < 2) return false;
    
//     const bowlCount = composition['Bowler'] + composition['Bowling Allrounder'];
//     if (bowlCount < 2) return false;
    
//     if (composition.overseas > 5) return false;
    
//     return true;
//   };

//   const getPlayerPool = useCallback((): EnhancedPlayerDetail[] => {
//     if (!team1 || !team2) return [];
    
//     const team1Players = team1.playerDetails || [];
//     const team2Players = team2.playerDetails || [];
    
//     const allPlayers = [...team1Players, ...team2Players].map(p => ({
//       ...p,
//       roleOrder: getRoleOrder(p.role),
//       normalizedRole: normalizeRole(p.role),
//       selectedBy: p.selectedBy || 0.1,
//       selCapPerc: p.selCapPerc || 0.1,
//       selVcPerc: p.selVcPerc || 0.1,
//       isPlaying: !p.substitute
//     }));

//     const wkPlayers = allPlayers.filter(p => p.normalizedRole === 'WK-Batsman');
//     const batPlayers = allPlayers.filter(p => 
//       ['Batsman', 'Batting Allrounder'].includes(p.normalizedRole)
//     );
//     const bowlPlayers = allPlayers.filter(p => 
//       ['Bowler', 'Bowling Allrounder'].includes(p.normalizedRole)
//     );
//     const allPlayersCount = allPlayers.filter(p => 
//       ['Bowling Allrounder', 'Batting Allrounder'].includes(p.normalizedRole)
//     );

//     setRoleCounts({
//       wk: wkPlayers.length,
//       batsmen: batPlayers.length,
//       allrounders: allPlayersCount.length,
//       bowlers: bowlPlayers.length
//     });

//     if (wkPlayers.length < 1) {
//       setError(`Need at least 1 WK-Batsman (available: ${wkPlayers.length})`);
//       return [];
//     }
//     if (batPlayers.length < 3) {
//       setError(`Need at least 3 Batsmen (available: ${batPlayers.length})`);
//       return [];
//     }
//     if (bowlPlayers.length < 3) {
//       setError(`Need at least 3 Bowlers (available: ${bowlPlayers.length})`);
//       return [];
//     }

//     return allPlayers;
//   }, [team1, team2]);

//   const calculatePlayerScore = (player: EnhancedPlayerDetail, forCaptaincy = false) => {
//     const baseScore = forCaptaincy ? 
//       (player.selCapPerc || player.selectedBy) : 
//       (player.selectedBy);
    
//     let riskFactor = 1;
//     if (riskLevel < 20) {
//       riskFactor = 1 + (Math.random() * 0.1);
//     } else if (riskLevel < 40) {
//       riskFactor = 0.9 + (Math.random() * 0.2);
//     } else if (riskLevel < 60) {
//       riskFactor = 0.8 + (Math.random() * 0.4);
//     } else if (riskLevel < 80) {
//       riskFactor = 0.6 + (Math.random() * 0.6);
//     } else {
//       riskFactor = 0.4 + (Math.random() * 0.8);
//     }
    
//     return baseScore * riskFactor;
//   };

//   const getTeamCompositionByRisk = () => {
//     if (riskLevel < 20) return { wk: 1, bat: 4, ar: 2, bowl: 4 };
//     if (riskLevel < 40) return { wk: 1, bat: 3, ar: 3, bowl: 4 };
//     if (riskLevel < 60) return { wk: 1, bat: 3, ar: 4, bowl: 3 };
//     if (riskLevel < 80) return { wk: 1, bat: 5, ar: 3, bowl: 2 };
//     return Math.random() > 0.5 
//       ? { wk: 1, bat: 6, ar: 2, bowl: 2 } 
//       : { wk: 1, bat: 2, ar: 4, bowl: 4 };
//   };

//   const weightedRandomPick = (players: EnhancedPlayerDetail[], field: 'selectedBy' | 'selCapPerc' | 'selVcPerc') => {
//     const totalWeight = players.reduce((sum, p) => sum + (p[field] || 0.1), 0);
//     let random = Math.random() * totalWeight;
    
//     for (const player of players) {
//       random -= player[field] || 0.1;
//       if (random <= 0) return player;
//     }
//     return players[0];
//   };

//   const selectPlayerByRisk = (players: EnhancedPlayerDetail[], risk: number) => {
//     if (players.length === 0) return null;
    
//     const sorted = [...players].sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0));
//     const safeRandomIndex = (max: number) => Math.min(Math.floor(Math.random() * max), sorted.length - 1);
    
//     if (risk < 20) {
//       const topCount = Math.max(1, Math.ceil(sorted.length * 0.3));
//       return sorted[safeRandomIndex(topCount)];
//     } else if (risk < 40) {
//       const topCount = Math.max(1, Math.ceil(sorted.length * 0.4));
//       return weightedRandomPick(sorted.slice(0, topCount), 'selectedBy');
//     } else if (risk < 60) {
//       const topCount = Math.max(1, Math.ceil(sorted.length * 0.6));
//       return Math.random() > 0.7 
//         ? sorted[safeRandomIndex(sorted.length)]
//         : weightedRandomPick(sorted.slice(0, topCount), 'selectedBy');
//     } else if (risk < 80) {
//       return Math.random() > 0.5 
//         ? weightedRandomPick(sorted, 'selectedBy')
//         : sorted[safeRandomIndex(sorted.length)];
//     } else {
//       return sorted[safeRandomIndex(sorted.length)];
//     }
//   };

//   const selectCaptainAndViceCaptain = (
//     players: EnhancedPlayerDetail[],
//     risk: number,
//     existingTeams: GeneratedTeam[] = []
//   ): { captain: EnhancedPlayerDetail; viceCaptain: EnhancedPlayerDetail } => {
//     const topPlayers = players.slice(0, Math.ceil(players.length * 0.3));
//     let attempts = 0;
//     const MAX_ATTEMPTS = 20;
    
//     const recentCombinations = existingTeams.slice(0, 5).map(t => 
//       `${t.captain.id}-${t.viceCaptain.id}`
//     );

//     while (attempts < MAX_ATTEMPTS) {
//       attempts++;
      
//       let captain: EnhancedPlayerDetail;
//       let viceCaptain: EnhancedPlayerDetail;

//       if (risk < 20) {
//         captain = topPlayers[0];
//         viceCaptain = topPlayers[1] || topPlayers[0];
//       } else if (risk < 40) {
//         captain = topPlayers[0];
//         viceCaptain =
//           topPlayers.find(p => p.normalizedRole !== captain.normalizedRole) ||
//           topPlayers[1] ||
//           topPlayers[0];
//       } else if (risk < 60) {
//         captain = topPlayers[Math.floor(Math.random() * Math.min(3, topPlayers.length))];
//         viceCaptain =
//           topPlayers
//             .slice(0, 5)
//             .find(p => p.normalizedRole !== captain.normalizedRole) ||
//           topPlayers[1] ||
//           topPlayers[0];
//       } else if (risk < 80) {
//         captain = topPlayers[Math.floor(Math.random() * Math.min(5, topPlayers.length))];
//         viceCaptain = topPlayers[Math.floor(Math.random() * Math.min(10, topPlayers.length))];
//       } else {
//         captain = topPlayers[Math.floor(Math.random() * topPlayers.length)];
//         viceCaptain = topPlayers.find(p => p.id !== captain.id) || topPlayers[0];
//       }

//       const comboKey = `${captain.id}-${viceCaptain.id}`;
      
//       if (!recentCombinations.includes(comboKey) || attempts >= MAX_ATTEMPTS - 5) {
//         return { captain, viceCaptain };
//       }
//     }

//     return { 
//       captain: topPlayers[0], 
//       viceCaptain: topPlayers[1] || topPlayers[0] 
//     };
//   };

//   const createBalancedTeam = useCallback((
//     players: EnhancedPlayerDetail[], 
//     existingTeamCount: number,
//     existingTeams: GeneratedTeam[] = []
//   ) => {
//     if (!team1 || !team2) return null;
    
//     const MAX_ATTEMPTS = 500;
//     const team1Short = team1.shortName || 'T1';
//     const team2Short = team2.shortName || 'T2';
//     const teamRatio = riskLevel >= 50 ? { main: 7, secondary: 4 } : { main: 6, secondary: 5 };
//     const availablePlayers = players.filter(p => 
//       p.selectedBy !== undefined && p.selectedBy > 0
//     );
    
//     if (availablePlayers.length < 11) {
//       setError(`Not enough available players (${availablePlayers.length}/11)`);
//       return null;
//     }
  
//     const sortedPlayers = [...availablePlayers].sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0));
  
//     let attempts = 0;
//     while (attempts < MAX_ATTEMPTS) {
//       attempts++;
      
//       const mainTeam = Math.random() > 0.5 ? team1Short : team2Short;
//       const secondaryTeam = mainTeam === team1Short ? team2Short : team1Short;
      
//       const teamComposition = {
//         'WK-Batsman': 0,
//         'Batsman': 0,
//         'Batting Allrounder': 0,
//         'Bowling Allrounder': 0,
//         'Bowler': 0,
//         [team1Short]: 0,
//         [team2Short]: 0,
//         overseas: 0,
//         totalScore: 0
//       };
  
//       const { captain, viceCaptain } = selectCaptainAndViceCaptain(
//         sortedPlayers, 
//         riskLevel,
//         existingTeams
//       );
//       if (!captain || !viceCaptain) continue;
  
//       const teamPlayers: EnhancedPlayerDetail[] = [captain, viceCaptain];
      
//       [captain, viceCaptain].forEach(player => {
//         const role = player.normalizedRole;
//         teamComposition[role]++;
//         teamComposition[player.teamName === team1.name ? team1Short : team2Short]++;
//         if (player.isOverseas) teamComposition.overseas++;
//         teamComposition.totalScore += calculatePlayerScore(player);
//       });
  
//       const remainingPlayers = sortedPlayers.filter(p => 
//         !teamPlayers.some(tp => tp.id === p.id) &&
//         p.id !== captain.id && 
//         p.id !== viceCaptain.id
//       );
  
//       let wkAttempts = 0;
//       while (teamComposition['WK-Batsman'] < 1 && wkAttempts < 10) {
//         wkAttempts++;
//         const wkPlayers = remainingPlayers.filter(p => p.normalizedRole === 'WK-Batsman');
//         if (wkPlayers.length === 0) break;
        
//         const wkPlayer = selectPlayerByRisk(wkPlayers, riskLevel);
//         if (!wkPlayer || teamPlayers.some(p => p.id === wkPlayer.id)) continue;
        
//         teamPlayers.push(wkPlayer);
//         teamComposition['WK-Batsman']++;
//         teamComposition[wkPlayer.teamName === team1.name ? team1Short : team2Short]++;
//         if (wkPlayer.isOverseas) teamComposition.overseas++;
//         teamComposition.totalScore += calculatePlayerScore(wkPlayer);
        
//         remainingPlayers.splice(remainingPlayers.findIndex(p => p.id === wkPlayer.id), 1);
//       }
  
//       while (teamPlayers.length < 11 && remainingPlayers.length > 0) {
//         const mainTeamCount = teamComposition[mainTeam];
//         const secondaryTeamCount = teamComposition[secondaryTeam];
        
//         let allowedTeams = [];
//         if (mainTeamCount < teamRatio.main) {
//           allowedTeams.push(mainTeam);
//         }
//         if (secondaryTeamCount < teamRatio.secondary) {
//           allowedTeams.push(secondaryTeam);
//         }
        
//         if (allowedTeams.length === 0) {
//           allowedTeams = [mainTeam, secondaryTeam];
//         }
  
//         const neededRoles = getNeededRoles(teamComposition, riskLevel);
        
//         let candidates = remainingPlayers.filter(p => {
//           const team = p.teamName === team1.name ? team1Short : team2Short;
//           const teamAllowed = allowedTeams.includes(team);
//           const overseasOK = !p.isOverseas || teamComposition.overseas < 5;
//           const roleNeeded = neededRoles.includes(p.normalizedRole);
//           return teamAllowed && overseasOK && roleNeeded;
//         });
  
//         if (candidates.length === 0) {
//           candidates = remainingPlayers.filter(p => {
//             const team = p.teamName === team1.name ? team1Short : team2Short;
//             return allowedTeams.includes(team) && 
//                    (!p.isOverseas || teamComposition.overseas < 5);
//           });
//         }
  
//         if (candidates.length === 0) {
//           candidates = remainingPlayers.filter(p => {
//             const team = p.teamName === team1.name ? team1Short : team2Short;
//             return allowedTeams.includes(team);
//           });
//         }
  
//         if (candidates.length === 0) break;
  
//         const selectedPlayer = selectPlayerByRisk(candidates, riskLevel);
//         if (!selectedPlayer || teamPlayers.some(p => p.id === selectedPlayer.id)) {
//           break;
//         }
  
//         teamPlayers.push(selectedPlayer);
//         const role = selectedPlayer.normalizedRole;
//         teamComposition[role]++;
//         teamComposition[selectedPlayer.teamName === team1.name ? team1Short : team2Short]++;
//         if (selectedPlayer.isOverseas) teamComposition.overseas++;
//         teamComposition.totalScore += calculatePlayerScore(selectedPlayer);
  
//         remainingPlayers.splice(remainingPlayers.findIndex(p => p.id === selectedPlayer.id), 1);
//       }
  
//       if (teamPlayers.length === 11 && validateTeamWithRatio(teamPlayers, teamComposition, team1Short, team2Short, teamRatio)) {
//         const allAvailablePlayers = players.filter(p => 
//           !teamPlayers.some(tp => tp.id === p.id)
//         );
        
//         const substitutes = [...allAvailablePlayers]
//           .sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0))
//           .slice(0, 4);
  
//         return {
//           players: [...teamPlayers].sort((a, b) => (a.roleOrder || 6) - (b.roleOrder || 6)),
//           captain,
//           viceCaptain,
//           substitutes,
//           teamName: `Team ${existingTeamCount + 1}`,
//           teamComposition,
//           riskLevel,
//           matchId,
//           createdAt: new Date().toISOString(),
//           changes: 0
//         };
//       }
//     }
  
//     console.error(`Team generation failed after ${MAX_ATTEMPTS} attempts`);
//     setError(`Failed to generate valid team after ${MAX_ATTEMPTS} attempts. Try adjusting risk level.`);
//     return null;
//   }, [team1, team2, riskLevel, matchId]);

//   const getTeamCountForMatch = async (): Promise<number> => {
//     if (!user || !matchId) return 0;
    
//     try {
//       const q = query(
//         collection(db, "users", user.id, "matches", matchId, "teams"),
//         limit(MAX_TEAMS_PER_MATCH)
//       );
//       const querySnapshot = await getDocs(q);
//       return querySnapshot.size;
//     } catch (err) {
//       console.error("Failed to count teams:", err);
//       return 0;
//     }
//   };

//   const saveTeamToFirestore = async (team: GeneratedTeam) => {
//     if (!user || !matchId) return;
    
//     try {
//       const teamData = {
//         ...team,
//         userId: user.id,
//         userEmail: user.primaryEmailAddress?.emailAddress || '',
//         matchName: `${team1?.name} vs ${team2?.name}`,
//         team1ShortName: team1?.shortName || team1?.name.split(' ').map(n => n[0]).join(''),
//         team2ShortName: team2?.shortName || team2?.name.split(' ').map(n => n[0]).join(''),
//         team1Logo: team1?.logo || '/fallback-team.png',
//         team2Logo: team2?.logo || '/fallback-team.png'
//       };

//       const matchTeamsRef = collection(db, "users", user.id, "matches", matchId, "teams");
//       const teamRef = doc(matchTeamsRef);
      
//       await setDoc(teamRef, teamData);
//       return teamRef.id;
//     } catch (err) {
//       console.error("Failed to save team:", err);
//       throw err;
//     }
//   };

//   const fetchSavedTeams = useCallback(async (): Promise<GeneratedTeam[]> => {
//     if (!user || !matchId) return [];
    
//     try {
//       const q = query(
//         collection(db, "users", user.id, "matches", matchId, "teams"),
//         orderBy("createdAt", "desc"),
//         limit(MAX_TEAMS_PER_MATCH)
//       );
//       const querySnapshot = await getDocs(q);
//       return querySnapshot.docs.map(doc => ({
//         ...doc.data() as GeneratedTeam,
//         id: doc.id
//       }));
//     } catch (err) {
//       console.error("Failed to fetch saved teams:", err);
//       return [];
//     }
//   }, [user, matchId]);

//   useEffect(() => {
//     const loadTeams = async () => {
//       if (!matchId || !user?.id) return;
      
//       try {
//         const savedTeams = localStorage.getItem(localStorageKey);
//         if (savedTeams) {
//           setGeneratedTeams(JSON.parse(savedTeams));
//           return;
//         }

//         const teams = await fetchSavedTeams();
//         if (teams.length > 0) {
//           setGeneratedTeams(teams);
//           localStorage.setItem(localStorageKey, JSON.stringify(teams));
//           showTeamCountMessage(teams.length);
//         }
//       } catch (err) {
//         console.error("Failed to load teams:", err);
//       }
//     };

//     loadTeams();
//   }, [localStorageKey, matchId, user?.id, fetchSavedTeams]);

//   const handleGenerateTeams = useCallback(async () => {
//     if (!team1 || !team2) {
//       setError("Select both teams first");
//       return;
//     }

//     if (!user) {
//       setError("Please sign in to generate teams");
//       return;
//     }

//     const currentTeamCount = await getTeamCountForMatch();
//     if (currentTeamCount >= MAX_TEAMS_PER_MATCH) {
//       setError(`You've reached the maximum of ${MAX_TEAMS_PER_MATCH} teams for this match`);
//       return;
//     }

//     const remainingTeamSlots = MAX_TEAMS_PER_MATCH - currentTeamCount;
//     const teamsToGenerate = Math.min(teamCount, remainingTeamSlots);

//     if (teamsToGenerate <= 0) {
//       setError(`You've reached the maximum of ${MAX_TEAMS_PER_MATCH} teams for this match`);
//       return;
//     }

//     if (needsPayment) {
//       setShowPaymentDialog(true);
//       return;
//     }

//     const allPlayers = getPlayerPool();
//     if (allPlayers.length < 11) {
//       setError(`Not enough players (${allPlayers.length}/11). Please check your filters.`);
//       return;
//     }

//     setIsGenerating(true);
//     setError(null);

//     try {
//       await runTransaction(db, async (transaction) => {
//         const userRef = doc(db, "users", user.id);
//         const userDoc = await transaction.get(userRef);
        
//         if (!userDoc.exists()) throw new Error("User not found");
//         if ((userDoc.data().credits || 0) < requiredCredits) {
//           throw new Error("Insufficient balance");
//         }
        
//         transaction.update(userRef, {
//           credits: increment(-requiredCredits)
//         });
//       });

//       const newTeams: GeneratedTeam[] = [];
//       const TOTAL_ATTEMPTS = teamsToGenerate * 100;
//       let attempts = 0;

//       while (newTeams.length < teamsToGenerate && attempts < TOTAL_ATTEMPTS) {
//         attempts++;
//         const team = createBalancedTeam(allPlayers, currentTeamCount + newTeams.length, newTeams);
        
//         if (team) {
//           const isUnique = newTeams.every(existingTeam => {
//             const existingPlayers = existingTeam.players.map(p => p.id).sort();
//             const newPlayers = team.players.map(p => p.id).sort();
//             const diffCount = existingPlayers.filter(id => !newPlayers.includes(id)).length;
//             return diffCount >= 3;
//           });

//           if (isUnique || newTeams.length === 0) {
//             const teamId = await saveTeamToFirestore(team);
//             newTeams.push({ ...team, id: teamId });
//           }
//         }
//       }

//       if (newTeams.length === 0) {
//         const actualCounts = {
//           wk: allPlayers.filter(p => p.normalizedRole === 'WK-Batsman').length,
//           batsmen: allPlayers.filter(p => 
//             ['Batsman', 'Batting Allrounder'].includes(p.normalizedRole)
//           ).length,
//           allrounders: allPlayers.filter(p => 
//             ['Bowling Allrounder', 'Batting Allrounder'].includes(p.normalizedRole)
//           ).length,
//           bowlers: allPlayers.filter(p => 
//             ['Bowler', 'Bowling Allrounder'].includes(p.normalizedRole)
//           ).length
//         };

//         throw new Error(
//           `Failed to generate valid teams after ${TOTAL_ATTEMPTS} attempts.\n` +
//           `Player counts: WK: ${actualCounts.wk}, Batsmen: ${actualCounts.batsmen}, ` +
//           `Allrounders: ${actualCounts.allrounders}, Bowlers: ${actualCounts.bowlers}\n` +
//           `Try adjusting your risk level or player filters.`
//         );
//       }

//       const updatedTeams = [...newTeams, ...generatedTeams];
//       setGeneratedTeams(updatedTeams);
//       localStorage.setItem(localStorageKey, JSON.stringify(updatedTeams));
//       onBalanceUpdate(userBalance - requiredCredits);

//       const updatedTeamCount = currentTeamCount + newTeams.length;
//       showTeamCountMessage(updatedTeamCount);

//     } catch (err: any) {
//       setError(err.message || "Failed to generate teams");
//     } finally {
//       setIsGenerating(false);
//     }
//   }, [
//     team1, team2, teamCount, riskLevel, user, 
//     userBalance, requiredCredits, needsPayment, 
//     onBalanceUpdate, createBalancedTeam, matchId,
//     fetchSavedTeams, getPlayerPool, generatedTeams,
//     localStorageKey, roleCounts, getTeamCountForMatch,
//     saveTeamToFirestore
//   ]);

//   const checkLineupChanges = useCallback(async () => {
//     if (!user?.id || !matchId) return;
    
//     try {
//       const savedTeams = localStorage.getItem(localStorageKey);
//       if (!savedTeams) return;
      
//       const teams: GeneratedTeam[] = JSON.parse(savedTeams);
//       const updatedTeams = [];
      
//       for (const team of teams) {
//         const playersWithStatus = team.players.map(player => ({
//           ...player,
//           isNowSubstitute: checkIfPlayerIsSubstitute(player.id)
//         }));
        
//         const nonPlayingPlayers = playersWithStatus.filter(p => p.isNowSubstitute);
//         if (nonPlayingPlayers.length === 0) {
//           updatedTeams.push(team);
//           continue;
//         }
        
//         const playingPlayers = playersWithStatus.filter(p => !p.isNowSubstitute);
//         const availableSubstitutes = team.substitutes?.filter(sub => 
//           !playingPlayers.some(p => p.id === sub.id)
//         ) || [];
        
//         let newPlayers = [...playingPlayers];
        
//         for (const nonPlayer of nonPlayingPlayers) {
//           const replacement = availableSubstitutes.find(sub => 
//             normalizeRole(sub.role) === normalizeRole(nonPlayer.role)
//           );
          
//           if (replacement) {
//             newPlayers.push(replacement);
//             availableSubstitutes.splice(availableSubstitutes.indexOf(replacement), 1);
//           } else {
//             newPlayers.push(nonPlayer);
//           }
//         }
        
//         updatedTeams.push({
//           ...team,
//           players: newPlayers,
//           captain: newPlayers.find(p => p.id === team.captain.id) || team.captain,
//           viceCaptain: newPlayers.find(p => p.id === team.viceCaptain.id) || team.viceCaptain,
//           updatedAt: new Date().toISOString(),
//           hadChanges: nonPlayingPlayers.length > 0
//         });
//       }
      
//       localStorage.setItem(localStorageKey, JSON.stringify(updatedTeams));
//       setGeneratedTeams(updatedTeams);
      
//       if (updatedTeams.some(t => t.hadChanges)) {
//         const currentTeamCount = updatedTeams.length;
//         showTeamCountMessage(currentTeamCount);
//       }
      
//     } catch (err) {
//       console.error("Failed to check lineup changes:", err);
//     }
//   }, [user?.id, matchId, localStorageKey]);

//   const checkIfPlayerIsSubstitute = (playerId: string): boolean => {
//     return Math.random() < 0.1;
//   };

//   const generateButton = (
//     <div className="space-y-2">
//       <button
//         onClick={handleGenerateTeams}
//         disabled={isGenerating || !team1 || !team2}
//         className={`
//           w-full px-4 py-3 rounded-md font-bold
//           ${isGenerating ? 'bg-gray-500' : 
//            needsPayment ? 'bg-yellow-500 hover:bg-yellow-600' : 
//            'bg-blue-500 hover:bg-blue-600'}
//           text-white transition-colors
//         `}
//       >
//         {isGenerating ? (
//           <span className="flex items-center justify-center gap-2">
//             <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//             </svg>
//             Generating...
//           </span>
//         ) : !team1 || !team2 ? (
//           "Select both teams"
//         ) : needsPayment ? (
//           `Add ₹${paymentAmount} to Generate team`
//         ) : (
//           `Generate ${teamCount} Teams (₹${requiredCredits})`
//         )}
//       </button>

//       <div className="flex justify-between text-sm">
//         <span>Your Credits: <span className='text-green-500'>₹{userBalance} </span> </span>
//         {needsPayment ? (
//           <span className="text-red-500">Need ₹{paymentAmount} more</span>
//         ) : (
//           <span className="text-green-500">Sufficient balance</span>
//         )}
//       </div>

//       {error && (
//         <div className="text-red-500 text-sm p-2 bg-red-50 rounded-lg">
//           <p className="font-medium">{error}</p>
//           {error.includes("Player counts") && (
//             <div className="mt-2 text-xs">
//               <p>Current player counts:</p>
//               <ul className="list-disc pl-5">
//                 <li>WK-Batsman: {roleCounts.wk} (min 1)</li>
//                 <li>Batsmen: {roleCounts.batsmen} (min 3 including allrounders)</li>
//                 <li>Bowlers: {roleCounts.bowlers} (min 3 including allrounders)</li>
//               </ul>
//               <p className="mt-1">Try adjusting filters or risk level.</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );

//   const paymentDialog = showPaymentDialog && (
//     <PaymentDialog
//       currentBalance={userBalance}
//       requiredAmount={paymentAmount}
//       onPaymentSuccess={(amount) => {
//         onBalanceUpdate(userBalance + amount);
//         setShowPaymentDialog(false);
//         handleGenerateTeams();
//       }}
//       onOpenChange={setShowPaymentDialog}
//       open={showPaymentDialog}
//       onProcessingStateChange={setIsGenerating}
//     />
//   );

//   return {
//     generatedTeams,
//     isGenerating,
//     generateButton,
//     paymentDialog,
//     error,
//     setError,
//     fetchSavedTeams,
//     setGeneratedTeams,
//     checkLineupChanges
//   };
// };








// "use client";
// import { useState, useCallback, useMemo, useEffect } from "react";
// import { PaymentDialog } from "./PaymentDialog";
// import { db } from "@/lib/firebase";
// import { 
//   doc, 
//   runTransaction, 
//   increment, 
//   setDoc, 
//   collection, 
//   query, 
//   orderBy, 
//   getDocs,
//   limit
// } from "firebase/firestore";
// import { useUser } from "@clerk/nextjs";

// interface PlayerDetail {
//   id: number;
//   name: string;
//   role: string;
//   teamName: string;
//   teamShortName: string;
//   imgURL: string;
//   isPlaying: boolean;
//   selectedBy: number;
//   selCapPerc: number;
//   selVcPerc: number;
//   points: number;
//   isOverseas?: boolean;
//   substitute?: boolean;
//   isNowSubstitute: boolean; // ✅ Add this
// }

// interface Team {
//   id: number;
//   name: string;
//   logo: string;
//   playerDetails: PlayerDetail[];
//   shortName: string;
// }

// interface GeneratedTeam {
//   id: number | string;
//   players: PlayerDetail[];
//   captain: PlayerDetail;
//   viceCaptain: PlayerDetail;
//   teamName: string;
//   changes: number;
//   substitutes: PlayerDetail[];
//   team1ShortName: string;
//   team2ShortName: string;
//   riskLevel: number;
//   hadChanges: boolean;
//   createdAt: string;
//   updatedAt?: string;
//   userId: string;
//   userEmail: string;
//   matchName: string;
//   matchId: string;
//   team1Logo: string;
//   team2Logo: string;
//   team1Count: number;
//   team2Count: number;
//   wkCount: number;
//   batCount: number;
//   arCount: number;
//   bowlCount: number;
//   teamComposition?: Record<string, number>;
// }

// interface TeamGeneratorProps {
//   team1?: Team;
//   team2?: Team;
//   teamCount: number;
//   riskLevel: number;
//   userBalance: number;
//   onBalanceUpdate: (newBalance: number) => void;
//   matchId: string;
// }

// const MAX_TEAMS_PER_MATCH = 20;
// const MIN_TEAMS_FOR_GRAND_LEAGUE = 10;

// export const useTeamGenerator = ({ 
//   team1, 
//   team2, 
//   teamCount, 
//   riskLevel,
//   userBalance,
//   onBalanceUpdate,
//   matchId
// }: TeamGeneratorProps) => {
//   const { user } = useUser();
//   const [generatedTeams, setGeneratedTeams] = useState<GeneratedTeam[]>([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [showPaymentDialog, setShowPaymentDialog] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [roleCounts, setRoleCounts] = useState({
//     wk: 0,
//     batsmen: 0,
//     allrounders: 0,
//     bowlers: 0
//   });

//   const requiredCredits = useMemo(() => teamCount * 100, [teamCount]);
//   const needsPayment = useMemo(() => userBalance < requiredCredits, [userBalance, requiredCredits]);
//   const paymentAmount = useMemo(() => Math.max(requiredCredits - userBalance, 100), [requiredCredits, userBalance]);
//   const localStorageKey = useMemo(() => `matchTeams_${matchId}_${user?.id}`, [matchId, user?.id]);

 
//   const defaultPlayer: PlayerDetail = {
//     id: 0,
//     name: 'Unknown Player',
//     role: 'Bowler',
//     teamName: '',
//     teamShortName: '',
//     imgURL: '/default-player.png',
//     isPlaying: true,
//     selectedBy: 0,
//     selCapPerc: 0,
//     selVcPerc: 0,
//     points: 0,
//     isNowSubstitute: false // ✅ required field added
//   };
  

//   const showTeamCountMessage = (currentTeamCount: number) => {
//     const teamsNeeded = MIN_TEAMS_FOR_GRAND_LEAGUE - currentTeamCount;
//     if (teamsNeeded > 0) {
//       alert(`🔥 You need ${teamsNeeded} more teams to qualify for Grand League prizes!`);
//     } else {
//       alert('🎉 Congratulations! You have qualified for Grand League prizes!');
//     }
//   };

//   const normalizeRole = (role: string): string => {
//     if (!role) return 'Bowler';
//     const lowerRole = role.toLowerCase().trim();
//     if (lowerRole.includes('keep') || lowerRole.includes('wk')) return 'WK-Batsman';
//     if (lowerRole.includes('bat') && lowerRole.includes('all')) return 'Batting Allrounder';
//     if (lowerRole.includes('bowl') && lowerRole.includes('all')) return 'Bowling Allrounder';
//     if (lowerRole.includes('bat')) return 'Batsman';
//     if (lowerRole.includes('bowl')) return 'Bowler';
//     if (lowerRole.includes('all')) return 'Bowling Allrounder';
//     return 'Bowler';
//   };

//   const getRoleOrder = (role: string): number => {
//     const normalized = normalizeRole(role);
//     switch(normalized) {
//       case 'WK-Batsman': return 1;
//       case 'Batsman': return 2;
//       case 'Batting Allrounder': return 3;
//       case 'Bowling Allrounder': return 4;
//       case 'Bowler': return 5;
//       default: return 6;
//     }
//   };

//   const calculatePlayerScore = (player: PlayerDetail, forCaptaincy = false): number => {
//     const baseScore = forCaptaincy ? player.selCapPerc : player.selectedBy;
//     let riskFactor = 1;
    
//     if (riskLevel < 20) riskFactor = 1 + (Math.random() * 0.1);
//     else if (riskLevel < 40) riskFactor = 0.9 + (Math.random() * 0.2);
//     else if (riskLevel < 60) riskFactor = 0.8 + (Math.random() * 0.4);
//     else if (riskLevel < 80) riskFactor = 0.6 + (Math.random() * 0.6);
//     else riskFactor = 0.4 + (Math.random() * 0.8);
    
//     return baseScore * riskFactor;
//   };

//   const weightedRandomPick = (
//     players: PlayerDetail[], 
//     field: 'selectedBy' | 'selCapPerc' | 'selVcPerc'
//   ): PlayerDetail => {
//     const totalWeight = players.reduce((sum, p) => sum + (p[field] || 0.1), 0);
//     let random = Math.random() * totalWeight;
    
//     for (const player of players) {
//       random -= player[field] || 0.1;
//       if (random <= 0) return player;
//     }
//     return players[0];
//   };

//   const selectPlayerByRisk = (players: PlayerDetail[], risk: number): PlayerDetail | null => {
//     if (players.length === 0) return null;
    
//     const sorted = [...players].sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0));
//     const safeRandomIndex = (max: number) => Math.min(Math.floor(Math.random() * max), sorted.length - 1);
    
//     if (risk < 20) {
//       return sorted[safeRandomIndex(Math.max(1, Math.ceil(sorted.length * 0.3)))];
//     } else if (risk < 40) {
//       return weightedRandomPick(sorted.slice(0, Math.max(1, Math.ceil(sorted.length * 0.4))), 'selectedBy');
//     } else if (risk < 60) {
//       return Math.random() > 0.7 
//         ? sorted[safeRandomIndex(sorted.length)]
//         : weightedRandomPick(sorted.slice(0, Math.max(1, Math.ceil(sorted.length * 0.6))), 'selectedBy');
//     } else if (risk < 80) {
//       return Math.random() > 0.5 
//         ? weightedRandomPick(sorted, 'selectedBy')
//         : sorted[safeRandomIndex(sorted.length)];
//     } else {
//       return sorted[safeRandomIndex(sorted.length)];
//     }
//   };

//   const selectCaptainAndViceCaptain = (
//     players: PlayerDetail[],
//     risk: number,
//     existingTeams: GeneratedTeam[] = []
//   ): { captain: PlayerDetail; viceCaptain: PlayerDetail } => {
//     const topPlayers = players.slice(0, Math.ceil(players.length * 0.3));
//     let attempts = 0;
//     const MAX_ATTEMPTS = 20;
    
//     const recentCombinations = existingTeams.slice(0, 5).map(t => 
//       `${t.captain.id}-${t.viceCaptain.id}`
//     );

//     while (attempts < MAX_ATTEMPTS) {
//       attempts++;
      
//       let captain: PlayerDetail;
//       let viceCaptain: PlayerDetail;

//       if (risk < 20) {
//         captain = topPlayers[0];
//         viceCaptain = topPlayers.find(p => p.id !== captain.id) || topPlayers[1] || topPlayers[0];
//       } else if (risk < 40) {
//         captain = topPlayers[0];
//         viceCaptain = topPlayers.find(p => 
//           p.id !== captain.id && 
//           normalizeRole(p.role) !== normalizeRole(captain.role)
//         ) || topPlayers.find(p => p.id !== captain.id) || topPlayers[1] || topPlayers[0];
//       } else if (risk < 60) {
//         captain = topPlayers[Math.floor(Math.random() * Math.min(3, topPlayers.length))];
//         viceCaptain = topPlayers.slice(0, 5).find(p => 
//           p.id !== captain.id && 
//           normalizeRole(p.role) !== normalizeRole(captain.role)
//         ) || topPlayers.find(p => p.id !== captain.id) || topPlayers[1] || topPlayers[0];
//       } else if (risk < 80) {
//         captain = topPlayers[Math.floor(Math.random() * Math.min(5, topPlayers.length))];
//         viceCaptain = topPlayers.find(p => 
//           p.id !== captain.id && 
//           Math.random() > 0.3
//         ) || topPlayers.find(p => p.id !== captain.id) || topPlayers[0];
//       } else {
//         captain = topPlayers[Math.floor(Math.random() * topPlayers.length)];
//         viceCaptain = topPlayers.find(p => p.id !== captain.id) || topPlayers[0];
//       }

//       // Final check to ensure captain and VC are different
//       if (captain.id === viceCaptain.id) {
//         viceCaptain = topPlayers.find(p => p.id !== captain.id) || {
//           ...defaultPlayer,
//           id: -1 * Date.now()
//         };
//       }

//       const comboKey = `${captain.id}-${viceCaptain.id}`;
      
//       if (!recentCombinations.includes(comboKey) || attempts >= MAX_ATTEMPTS - 5) {
//         return { captain, viceCaptain };
//       }
//     }

//     // Final fallback
//     const captain = topPlayers[0];
//     const viceCaptain = topPlayers.find(p => p.id !== captain.id) || {
//       ...defaultPlayer,
//       id: -1 * Date.now()
//     };
    
//     return { 
//       captain, 
//       viceCaptain
//     };
//   };

//   const createBalancedTeam = useCallback((
//     players: PlayerDetail[], 
//     existingTeamCount: number,
//     existingTeams: GeneratedTeam[] = []
//   ): GeneratedTeam | null => {
//     if (!team1 || !team2) return null;
    
//     const MAX_ATTEMPTS = 100;
//     const team1Short = team1.shortName || 'T1';
//     const team2Short = team2.shortName || 'T2';
    
//     // Enforce 7:4 ratio when risk level is increased (above 50)
//     const teamRatio = riskLevel > 50 ? 
//       { main: 7, secondary: 4 } : // Fixed 7:4 ratio for high risk
//       { 
//         main: 5 + Math.floor(Math.random() * 3), // 5-7 players
//         secondary: 11 - (5 + Math.floor(Math.random() * 3)) // 4-6 players
//       };
  
//     // Remove duplicate players by ID
//     const uniquePlayers = players.reduce((acc: PlayerDetail[], player) => {
//       if (!acc.some(p => p.id === player.id)) {
//         acc.push(player);
//       }
//       return acc;
//     }, []);
  
//     const availablePlayers = uniquePlayers.filter(p => p.isPlaying);
    
//     if (availablePlayers.length < 11) {
//       setError(`Not enough available players (${availablePlayers.length}/11)`);
//       return null;
//     }
  
//     const sortedPlayers = [...availablePlayers].sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0));
  
//     let attempts = 0;
//     while (attempts < MAX_ATTEMPTS) {
//       attempts++;
      
//       const mainTeam = Math.random() > 0.5 ? team1Short : team2Short;
//       const secondaryTeam = mainTeam === team1Short ? team2Short : team1Short;
      
//       const teamComposition: Record<string, number> = {
//         'WK-Batsman': 0,
//         'Batsman': 0,
//         'Batting Allrounder': 0,
//         'Bowling Allrounder': 0,
//         'Bowler': 0,
//         [team1Short]: 0,
//         [team2Short]: 0,
//         overseas: 0,
//         totalScore: 0
//       };
  
//       const { captain, viceCaptain } = selectCaptainAndViceCaptain(
//         sortedPlayers, 
//         riskLevel,
//         existingTeams
//       );
      
//       // Skip if captain and VC are the same player
//       if (!captain || !viceCaptain || captain.id === viceCaptain.id) continue;
  
//       const teamPlayers: PlayerDetail[] = [captain, viceCaptain];
      
//       [captain, viceCaptain].forEach(player => {
//         const role = normalizeRole(player.role);
//         teamComposition[role]++;
//         teamComposition[player.teamShortName === team1Short ? team1Short : team2Short]++;
//         if (player.isOverseas) teamComposition.overseas++;
//         teamComposition.totalScore += calculatePlayerScore(player);
//       });
  
//       const remainingPlayers = sortedPlayers.filter(p => 
//         !teamPlayers.some(tp => tp.id === p.id) &&
//         p.id !== captain.id && 
//         p.id !== viceCaptain.id
//       );
  
//       // More flexible role requirements
//       const roleRequirements = [
//         { role: 'WK-Batsman', min: 1, max: 4 },
//         { role: 'Batsman', min: 1, max: 6 },
//         { role: 'Batting Allrounder', min: 0, max: 4 },
//         { role: 'Bowling Allrounder', min: 0, max: 4 },
//         { role: 'Bowler', min: 1, max: 6 }
//       ];
  
//       // Fill required roles first
//       for (const req of roleRequirements.filter(r => r.min > 0)) {
//         while (teamComposition[req.role] < req.min && remainingPlayers.length > 0) {
//           const candidates = remainingPlayers.filter(p => 
//             normalizeRole(p.role) === req.role &&
//             // Enforce team ratio during role filling
//             (teamComposition[p.teamShortName === mainTeam ? team1Short : team2Short] < 
//              (p.teamShortName === mainTeam ? teamRatio.main : teamRatio.secondary))
//           );
          
//           if (candidates.length === 0) break;
          
//           const player = selectPlayerByRisk(candidates, riskLevel);
//           if (!player) break;
  
//           teamPlayers.push(player);
//           teamComposition[req.role]++;
//           teamComposition[player.teamShortName === team1Short ? team1Short : team2Short]++;
//           if (player.isOverseas) teamComposition.overseas++;
//           teamComposition.totalScore += calculatePlayerScore(player);
          
//           remainingPlayers.splice(remainingPlayers.findIndex(p => p.id === player.id), 1);
//         }
//       }
  
//       // Fill remaining spots while enforcing team ratio
//       while (teamPlayers.length < 11 && remainingPlayers.length > 0) {
//         const mainTeamCount = teamComposition[mainTeam];
//         const secondaryTeamCount = teamComposition[secondaryTeam];
        
//         let candidates = remainingPlayers;
        
//         // Strictly enforce 7:4 ratio for high risk
//         if (riskLevel > 50) {
//           if (mainTeamCount >= 7) {
//             candidates = candidates.filter(p => p.teamShortName === secondaryTeam);
//           } else if (secondaryTeamCount >= 4) {
//             candidates = candidates.filter(p => p.teamShortName === mainTeam);
//           }
//         } else {
//           // More flexible for normal risk
//           if (mainTeamCount >= teamRatio.main) {
//             candidates = candidates.filter(p => p.teamShortName === secondaryTeam);
//           } else if (secondaryTeamCount >= teamRatio.secondary) {
//             candidates = candidates.filter(p => p.teamShortName === mainTeam);
//           }
//         }
        
//         // Filter out roles that are already at max
//         candidates = candidates.filter(p => {
//           const role = normalizeRole(p.role);
//           const req = roleRequirements.find(r => r.role === role);
//           return req ? teamComposition[role] < req.max : true;
//         });
  
//         // If no candidates after filters, try any available player that maintains ratio
//         if (candidates.length === 0) {
//           candidates = remainingPlayers.filter(p => 
//             riskLevel > 50 
//               ? (teamComposition[p.teamShortName === mainTeam ? team1Short : team2Short] < 
//                  (p.teamShortName === mainTeam ? 7 : 4))
//               : true
//           );
//         }
  
//         const player = selectPlayerByRisk(candidates, riskLevel);
//         if (!player) break;
  
//         const role = normalizeRole(player.role);
//         teamPlayers.push(player);
//         teamComposition[role]++;
//         teamComposition[player.teamShortName === team1Short ? team1Short : team2Short]++;
//         if (player.isOverseas) teamComposition.overseas++;
//         teamComposition.totalScore += calculatePlayerScore(player);
        
//         remainingPlayers.splice(remainingPlayers.findIndex(p => p.id === player.id), 1);
//       }
  
//       // Final validation
//       if (teamPlayers.length === 11) {
//         // Check for duplicate players
//         const playerIds = new Set(teamPlayers.map(p => p.id));
//         if (playerIds.size !== 11) continue;
  
//         // Strictly enforce 7:4 ratio for high risk teams
//         if (riskLevel > 50) {
//           const mainCount = teamComposition[mainTeam];
//           const secondaryCount = teamComposition[secondaryTeam];
//           if (mainCount > 7 || secondaryCount > 4) continue;
//         }
  
//         const allAvailablePlayers = uniquePlayers.filter(p => !teamPlayers.some(tp => tp.id === p.id));
        
//         const substitutes = [...allAvailablePlayers]
//           .sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0))
//           .slice(0, 4);
  
//         return {
//           id: Date.now(),
//           players: [...teamPlayers].sort((a, b) => (getRoleOrder(a.role) - (getRoleOrder(b.role)))),
//           captain,
//           viceCaptain,
//           substitutes,
//           teamName: `Team ${existingTeamCount + 1}`,
//           team1ShortName: team1Short,
//           team2ShortName: team2Short,
//           riskLevel,
//           matchId,
//           matchName: `${team1.name} vs ${team2.name}`,
//           createdAt: new Date().toISOString(),
//           changes: 0,
//           hadChanges: false,
//           userId: user?.id || '',
//           userEmail: user?.primaryEmailAddress?.emailAddress || '',
//           team1Logo: team1.logo || '/fallback-team.png',
//           team2Logo: team2.logo || '/fallback-team.png',
//           team1Count: teamComposition[team1Short],
//           team2Count: teamComposition[team2Short],
//           wkCount: teamComposition['WK-Batsman'],
//           batCount: teamComposition['Batsman'] + teamComposition['Batting Allrounder'],
//           arCount: teamComposition['Bowling Allrounder'],
//           bowlCount: teamComposition['Bowler'],
//           teamComposition
//         };
//       }
//     }
  
//     console.error(`Team generation failed after ${MAX_ATTEMPTS} attempts`);
//     setError(`Failed to generate valid team after ${MAX_ATTEMPTS} attempts. Try adjusting risk level.`);
//     return null;
//   }, [team1, team2, riskLevel, matchId, user]);

//   const getPlayerPool = useCallback((): PlayerDetail[] => {
//     if (!team1 || !team2) return [];
    
//     const team1Players = team1.playerDetails || [];
//     const team2Players = team2.playerDetails || [];
    
//     const allPlayers = [...team1Players, ...team2Players].map(p => ({
//       ...p,
//       selectedBy: p.selectedBy || 0,
//       selCapPerc: p.selCapPerc || 0,
//       selVcPerc: p.selVcPerc || 0,
//       isPlaying: !p.substitute
//     }));

//     const wkPlayers = allPlayers.filter(p => normalizeRole(p.role) === 'WK-Batsman');
//     const batPlayers = allPlayers.filter(p => 
//       ['Batsman', 'Batting Allrounder'].includes(normalizeRole(p.role))
//     );
//     const bowlPlayers = allPlayers.filter(p => 
//       ['Bowler', 'Bowling Allrounder'].includes(normalizeRole(p.role))
//     );
//     const allPlayersCount = allPlayers.filter(p => 
//       ['Bowling Allrounder', 'Batting Allrounder'].includes(normalizeRole(p.role))
//     );

//     setRoleCounts({
//       wk: wkPlayers.length,
//       batsmen: batPlayers.length,
//       allrounders: allPlayersCount.length,
//       bowlers: bowlPlayers.length
//     });

//     return allPlayers;
//   }, [team1, team2]);

//   const getTeamCountForMatch = async (): Promise<number> => {
//     if (!user || !matchId) return 0;
    
//     try {
//       const q = query(
//         collection(db, "users", user.id, "matches", matchId, "teams"),
//         limit(MAX_TEAMS_PER_MATCH)
//       );
//       const querySnapshot = await getDocs(q);
//       return querySnapshot.size;
//     } catch (err) {
//       console.error("Failed to count teams:", err);
//       return 0;
//     }
//   };

//   const saveTeamToFirestore = async (team: GeneratedTeam): Promise<string | null> => {
//     if (!user || !matchId) return null;
    
//     try {
//       const teamData = {
//         ...team,
//         userId: user.id,
//         userEmail: user.primaryEmailAddress?.emailAddress || ''
//       };

//       const matchTeamsRef = collection(db, "users", user.id, "matches", matchId, "teams");
//       const teamRef = doc(matchTeamsRef);
      
//       await setDoc(teamRef, teamData);
//       return teamRef.id;
//     } catch (err) {
//       console.error("Failed to save team:", err);
//       throw err;
//     }
//   };

//   const fetchSavedTeams = useCallback(async (): Promise<GeneratedTeam[]> => {
//     if (!user || !matchId) return [];
    
//     try {
//       const q = query(
//         collection(db, "users", user.id, "matches", matchId, "teams"),
//         orderBy("createdAt", "desc"),
//         limit(MAX_TEAMS_PER_MATCH)
//       );
//       const querySnapshot = await getDocs(q);
//       return querySnapshot.docs.map(doc => ({
//         ...doc.data() as GeneratedTeam,
//         id: doc.id
//       }));
//     } catch (err) {
//       console.error("Failed to fetch saved teams:", err);
//       return [];
//     }
//   }, [user, matchId]);

//   useEffect(() => {
//     const loadTeams = async () => {
//       if (!matchId || !user?.id) return;
      
//       try {
//         const savedTeams = localStorage.getItem(localStorageKey);
//         if (savedTeams) {
//           setGeneratedTeams(JSON.parse(savedTeams));
//           return;
//         }

//         const teams = await fetchSavedTeams();
//         if (teams.length > 0) {
//           setGeneratedTeams(teams);
//           localStorage.setItem(localStorageKey, JSON.stringify(teams));
//           showTeamCountMessage(teams.length);
//         }
//       } catch (err) {
//         console.error("Failed to load teams:", err);
//       }
//     };

//     loadTeams();
//   }, [localStorageKey, matchId, user?.id, fetchSavedTeams]);

//   const handleGenerateTeams = useCallback(async () => {
//     if (!team1 || !team2) {
//       setError("Select both teams first");
//       return;
//     }

//     if (!user) {
//       setError("Please sign in to generate teams");
//       return;
//     }

//     const currentTeamCount = await getTeamCountForMatch();
//     if (currentTeamCount >= MAX_TEAMS_PER_MATCH) {
//       setError(`You've reached the maximum of ${MAX_TEAMS_PER_MATCH} teams for this match`);
//       return;
//     }

//     const remainingTeamSlots = MAX_TEAMS_PER_MATCH - currentTeamCount;
//     const teamsToGenerate = Math.min(teamCount, remainingTeamSlots);

//     if (teamsToGenerate <= 0) {
//       setError(`You've reached the maximum of ${MAX_TEAMS_PER_MATCH} teams for this match`);
//       return;
//     }

//     if (needsPayment) {
//       setShowPaymentDialog(true);
//       return;
//     }

//     const allPlayers = getPlayerPool();
//     if (allPlayers.length < 11) {
//       setError(`Not enough players (${allPlayers.length}/11). Please check your filters.`);
//       return;
//     }

//     setIsGenerating(true);
//     setError(null);

//     try {
//       await runTransaction(db, async (transaction) => {
//         const userRef = doc(db, "users", user.id);
//         const userDoc = await transaction.get(userRef);
        
//         if (!userDoc.exists()) throw new Error("User not found");
//         if ((userDoc.data().credits || 0) < requiredCredits) {
//           throw new Error("Insufficient balance");
//         }
        
//         transaction.update(userRef, {
//           credits: increment(-requiredCredits)
//         });
//       });

//       const newTeams: GeneratedTeam[] = [];
//       const TOTAL_ATTEMPTS = teamsToGenerate * 100;
//       let attempts = 0;

//       while (newTeams.length < teamsToGenerate && attempts < TOTAL_ATTEMPTS) {
//         attempts++;
//         const team = createBalancedTeam(allPlayers, currentTeamCount + newTeams.length, newTeams);
        
//         if (team) {
//           const isUnique = newTeams.every(existingTeam => {
//             const existingPlayers = existingTeam.players.map(p => p.id).sort();
//             const newPlayers = team.players.map(p => p.id).sort();
//             const diffCount = existingPlayers.filter(id => !newPlayers.includes(id)).length;
//             return diffCount >= 3;
//           });

//           if (isUnique || newTeams.length === 0) {
//             const teamId = await saveTeamToFirestore(team);
//             newTeams.push({ ...team, id: teamId || Date.now().toString() });
//           }
//         }
//       }

//       if (newTeams.length === 0) {
//         const actualCounts = {
//           wk: allPlayers.filter(p => normalizeRole(p.role) === 'WK-Batsman').length,
//           batsmen: allPlayers.filter(p => 
//             ['Batsman', 'Batting Allrounder'].includes(normalizeRole(p.role))
//           ).length,
//           allrounders: allPlayers.filter(p => 
//             ['Bowling Allrounder', 'Batting Allrounder'].includes(normalizeRole(p.role))
//           ).length,
//           bowlers: allPlayers.filter(p => 
//             ['Bowler', 'Bowling Allrounder'].includes(normalizeRole(p.role))
//           ).length
//         };

//         throw new Error(
//           `Failed to generate valid teams after ${TOTAL_ATTEMPTS} attempts.\n` +
//           `Player counts: WK: ${actualCounts.wk}, Batsmen: ${actualCounts.batsmen}, ` +
//           `Allrounders: ${actualCounts.allrounders}, Bowlers: ${actualCounts.bowlers}`
//         );
//       }

//       const updatedTeams = [...newTeams, ...generatedTeams];
//       setGeneratedTeams(updatedTeams);
//       localStorage.setItem(localStorageKey, JSON.stringify(updatedTeams));
//       onBalanceUpdate(userBalance - requiredCredits);

//       const updatedTeamCount = currentTeamCount + newTeams.length;
//       showTeamCountMessage(updatedTeamCount);

//     } catch (err: any) {
//       setError(err.message || "Failed to generate teams");
//     } finally {
//       setIsGenerating(false);
//     }
//   }, [
//     team1, team2, teamCount, riskLevel, user, 
//     userBalance, requiredCredits, needsPayment, 
//     onBalanceUpdate, createBalancedTeam, matchId,
//     fetchSavedTeams, getPlayerPool, generatedTeams,
//     localStorageKey, roleCounts, getTeamCountForMatch,
//     saveTeamToFirestore
//   ]);

//   const checkLineupChanges = useCallback(async () => {
//     if (!user?.id || !matchId) return;
    
//     try {
//       const savedTeams = localStorage.getItem(localStorageKey);
//       if (!savedTeams) return;
      
//       const teams: GeneratedTeam[] = JSON.parse(savedTeams);
//       const updatedTeams: GeneratedTeam[] = [];
      
//       for (const team of teams) {
//         const playersWithStatus = team.players.map(player => ({
//           ...player,
//           isNowSubstitute: Math.random() < 0.1
//         }));
        
//         const nonPlayingPlayers = playersWithStatus.filter(p => p.isNowSubstitute);
//         if (nonPlayingPlayers.length === 0) {
//           updatedTeams.push(team);
//           continue;
//         }
        
//         const playingPlayers = playersWithStatus.filter(p => !p.isNowSubstitute);
//         const availableSubstitutes = team.substitutes?.filter(sub => 
//           !playingPlayers.some(p => p.id === sub.id)
//         ) || [];
        
//         let newPlayers = [...playingPlayers];
        
//         for (const nonPlayer of nonPlayingPlayers) {
//           const replacement = availableSubstitutes.find(sub => 
//             normalizeRole(sub.role) === normalizeRole(nonPlayer.role)
//           );
          
//           if (replacement) {
//             newPlayers.push(replacement);
//             availableSubstitutes.splice(availableSubstitutes.indexOf(replacement), 1);
//           } else {
//             newPlayers.push(nonPlayer);
//           }
//         }
        
//         updatedTeams.push({
//           ...team,
//           players: newPlayers,
//           captain: newPlayers.find(p => p.id === team.captain.id) || team.captain,
//           viceCaptain: newPlayers.find(p => p.id === team.viceCaptain.id) || team.viceCaptain,
//           updatedAt: new Date().toISOString(),
//           hadChanges: nonPlayingPlayers.length > 0
//         });
//       }
      
//       localStorage.setItem(localStorageKey, JSON.stringify(updatedTeams));
//       setGeneratedTeams(updatedTeams);
      
//       if (updatedTeams.some(t => t.hadChanges)) {
//         const currentTeamCount = updatedTeams.length;
//         showTeamCountMessage(currentTeamCount);
//       }
      
//     } catch (err) {
//       console.error("Failed to check lineup changes:", err);
//     }
//   }, [user?.id, matchId, localStorageKey]);

//   const generateButton = (
//     <div className="space-y-2">
//       <button
//         onClick={handleGenerateTeams}
//         disabled={isGenerating || !team1 || !team2}
//         className={`
//           w-full px-4 py-3 rounded-md font-bold
//           ${isGenerating ? 'bg-gray-500' : 
//            needsPayment ? 'bg-yellow-500 hover:bg-yellow-600' : 
//            'bg-blue-500 hover:bg-blue-600'}
//           text-white transition-colors
//         `}
//       >
//         {isGenerating ? (
//           <span className="flex items-center justify-center gap-2">
//             <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//             </svg>
//             Generating...
//           </span>
//         ) : !team1 || !team2 ? (
//           "Select both teams"
//         ) : needsPayment ? (
//           `Add ₹${paymentAmount} to Generate team`
//         ) : (
//           `Generate ${teamCount} Teams (₹${requiredCredits})`
//         )}
//       </button>

//       <div className="flex justify-between text-sm">
//         <span>Your Credits: <span className='text-green-500'>₹{userBalance} </span> </span>
//         {needsPayment ? (
//           <span className="text-red-500">Need ₹{paymentAmount} more</span>
//         ) : (
//           <span className="text-green-500">Sufficient balance</span>
//         )}
//       </div>

//       {error && (
//         <div className="text-red-500 text-sm p-2 bg-red-50 rounded-lg">
//           <p className="font-medium">{error}</p>
//           {error.includes("Player counts") && (
//             <div className="mt-2 text-xs">
//               <p>Current player counts:</p>
//               <ul className="list-disc pl-5">
//                 <li>WK-Batsman: {roleCounts.wk} (min 1)</li>
//                 <li>Batsmen: {roleCounts.batsmen}</li>
//                 <li>Bowlers: {roleCounts.bowlers}</li>
//               </ul>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );

//   const paymentDialog = showPaymentDialog && (
//     <PaymentDialog
//       currentBalance={userBalance}
//       requiredAmount={paymentAmount}
//       onPaymentSuccess={(amount) => {
//         onBalanceUpdate(userBalance + amount);
//         setShowPaymentDialog(false);
//         handleGenerateTeams();
//       }}
//       onOpenChange={setShowPaymentDialog}
//       open={showPaymentDialog}
//       onProcessingStateChange={setIsGenerating}
//     />
//   );

//   return {
//     generatedTeams,
//     isGenerating,
//     generateButton,
//     paymentDialog,
//     error,
//     setError,
//     fetchSavedTeams,
//     setGeneratedTeams,
//     checkLineupChanges
//   };
// };





// // components/TeamGenerator.tsx
// "use client";
// import { useState, useCallback, useMemo, useEffect } from "react";
// import { PaymentDialog } from "./PaymentDialog";
// import { db } from "@/lib/firebase";
// import { 
//   doc, 
//   runTransaction, 
//   increment, 
//   setDoc, 
//   collection, 
//   query, 
//   orderBy, 
//   getDocs,
//   limit
// } from "firebase/firestore";
// import { useUser } from "@clerk/nextjs";
// import { PlayerDetail, GeneratedTeam, Team } from "@/types/match";

// interface TeamGeneratorProps {
//   team1?: Team;
//   team2?: Team;
//   teamCount: number;
//   riskLevel: number;
//   userBalance: number;
//   onBalanceUpdate: (newBalance: number) => void;
//   matchId: string;
// }

// const MAX_TEAMS_PER_MATCH = 20;
// const MIN_TEAMS_FOR_GRAND_LEAGUE = 10;

// export const useTeamGenerator = ({ 
//   team1, 
//   team2, 
//   teamCount, 
//   riskLevel,
//   userBalance,
//   onBalanceUpdate,
//   matchId
// }: TeamGeneratorProps) => {
//   const { user } = useUser();
//   const [generatedTeams, setGeneratedTeams] = useState<GeneratedTeam[]>([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [showPaymentDialog, setShowPaymentDialog] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [roleCounts, setRoleCounts] = useState({
//     wk: 0,
//     batsmen: 0,
//     allrounders: 0,
//     bowlers: 0
//   });

//   const requiredCredits = useMemo(() => teamCount * 100, [teamCount]);
//   const needsPayment = useMemo(() => userBalance < requiredCredits, [userBalance, requiredCredits]);
//   const paymentAmount = useMemo(() => Math.max(requiredCredits - userBalance, 100), [requiredCredits, userBalance]);
//   const localStorageKey = useMemo(() => `matchTeams_${matchId}_${user?.id}`, [matchId, user?.id]);

//   const defaultPlayer: PlayerDetail = {
//     id: 0,
//     name: 'Unknown Player',
//     fullName: '',
//     nickName: '',
//     role: 'Bowler',
//     captain: false,
//     keeper: false,
//     isOverseas: false,
//     teamName: '',
//     teamShortName: '',
//     imgURL: '/default-player.png',
//     isPlaying: true,
//     selectedBy: 0,
//     selCapPerc: 0,
//     selVcPerc: 0,
//     points: 0,
//     isNowSubstitute: false
//   };

//   const showTeamCountMessage = (currentTeamCount: number) => {
//     const teamsNeeded = MIN_TEAMS_FOR_GRAND_LEAGUE - currentTeamCount;
//     if (teamsNeeded > 0) {
//       alert(`🔥 You need ${teamsNeeded} more teams to qualify for Grand League prizes!`);
//     } else {
//       alert('🎉 Congratulations! You have qualified for Grand League prizes!');
//     }
//   };

//   const normalizeRole = (role: string): string => {
//     if (!role) return 'Bowler';
//     const lowerRole = role.toLowerCase().trim();
//     if (lowerRole.includes('keep') || lowerRole.includes('wk')) return 'WK-Batsman';
//     if (lowerRole.includes('bat') && lowerRole.includes('all')) return 'Batting Allrounder';
//     if (lowerRole.includes('bowl') && lowerRole.includes('all')) return 'Bowling Allrounder';
//     if (lowerRole.includes('bat')) return 'Batsman';
//     if (lowerRole.includes('bowl')) return 'Bowler';
//     if (lowerRole.includes('all')) return 'Bowling Allrounder';
//     return 'Bowler';
//   };

//   const getRoleOrder = (role: string): number => {
//     const normalized = normalizeRole(role);
//     switch(normalized) {
//       case 'WK-Batsman': return 1;
//       case 'Batsman': return 2;
//       case 'Batting Allrounder': return 3;
//       case 'Bowling Allrounder': return 4;
//       case 'Bowler': return 5;
//       default: return 6;
//     }
//   };

//   const getPredefinedTeam = (): GeneratedTeam | null => {
//     if (!team1 || !team2) return null;

//     // Create a function to find player by name
//     const findPlayer = (name: string): PlayerDetail => {
//       const allPlayers = [...(team1.playerDetails || []), ...(team2.playerDetails || [])];
//       const player = allPlayers.find(p => {
//         const playerName = p.name.toLowerCase();
//         const searchName = name.toLowerCase().split('-')[0];
//         return playerName.includes(searchName) || 
//                p.fullName?.toLowerCase().includes(searchName);
//       });
      
//       return player || {
//         ...defaultPlayer,
//         id: -1 * Date.now(),
//         name: name.split('-')[0],
//         role: name.includes('-C') ? 'Batsman' : 
//               name.includes('-Vc') ? 'Batsman' : 
//               name.includes('W Hasaranga') ? 'Bowling Allrounder' :
//               name.includes('Axar') ? 'Bowling Allrounder' :
//               name.includes('Avesh Khan') ? 'Bowler' :
//               name.includes('Thakur') ? 'Bowler' :
//               name.includes('Jofra Archer') ? 'Bowler' :
//               name.includes('Tushar Deshpande') ? 'Bowler' :
//               name.includes('Prasidh') ? 'Bowler' :
//               name.includes('Siraj') ? 'Bowler' :
//               name.includes('Sai Kishore') ? 'Bowler' :
//               'Batsman'
//       };
//     };

//     if (matchId === "115183") {
//       const players = [
//         findPlayer("Pooran"),
//         findPlayer("Ayush Badoni"),
//         findPlayer("Yashasvi Jaiswal-Vc"),
//         findPlayer("Vaibhav Suryavanshi"),
//         findPlayer("Markram-Captain-C"),
//         findPlayer("W Hasaranga"),
//         findPlayer("Riyan Parag"),
//         findPlayer("Avesh Khan"),
//         findPlayer("Thakur"),
//         findPlayer("Jofra Archer"),
//         findPlayer("Tushar Deshpande")
//       ];

//       const captain = players.find(p => p.name.includes("Markram")) || players[0];
//       const viceCaptain = players.find(p => p.name.includes("Jaiswal")) || players[1];

//       return {
//         id: Date.now(),
//         players: players.sort((a, b) => getRoleOrder(a.role) - getRoleOrder(b.role)),
//         captain,
//         viceCaptain,
//         substitutes: [],
//         teamName: "Predefined Team 1",
//         team1ShortName: team1.shortName || 'T1',
//         team2ShortName: team2.shortName || 'T2',
//         riskLevel,
//         matchId,
//         matchName: `${team1.name} vs ${team2.name}`,
//         createdAt: new Date().toISOString(),
//         changes: 0,
//         hadChanges: false,
//         userId: user?.id || '',
//         userEmail: user?.primaryEmailAddress?.emailAddress || '',
//         team1Logo: team1.logo || '/fallback-team.png',
//         team2Logo: team2.logo || '/fallback-team.png',
//         team1Count: players.filter(p => p.teamShortName === team1.shortName).length,
//         team2Count: players.filter(p => p.teamShortName === team2.shortName).length,
//         wkCount: players.filter(p => normalizeRole(p.role) === 'WK-Batsman').length,
//         batCount: players.filter(p => 
//           ['Batsman', 'Batting Allrounder'].includes(normalizeRole(p.role))
//         ).length,
//         arCount: players.filter(p => normalizeRole(p.role) === 'Bowling Allrounder').length,
//         bowlCount: players.filter(p => normalizeRole(p.role) === 'Bowler').length,
//         teamComposition: {
//           'WK-Batsman': players.filter(p => normalizeRole(p.role) === 'WK-Batsman').length,
//           'Batsman': players.filter(p => normalizeRole(p.role) === 'Batsman').length,
//           'Batting Allrounder': players.filter(p => normalizeRole(p.role) === 'Batting Allrounder').length,
//           'Bowling Allrounder': players.filter(p => normalizeRole(p.role) === 'Bowling Allrounder').length,
//           'Bowler': players.filter(p => normalizeRole(p.role) === 'Bowler').length,
//           [team1.shortName || 'T1']: players.filter(p => p.teamShortName === team1.shortName).length,
//           [team2.shortName || 'T2']: players.filter(p => p.teamShortName === team2.shortName).length,
//           overseas: players.filter(p => p.isOverseas).length,
//           totalScore: players.reduce((sum, p) => sum + (p.selectedBy || 0), 0)
//         }
//       };
//     }

//     if (matchId === "115176") {
//       const players = [
//         findPlayer("Jos Buttler-C"),
//         findPlayer("Rahul"),
//         findPlayer("Karun Nair"),
//         findPlayer("Sherfane Rutherford"),
//         findPlayer("Ashutosh Sharma"),
//         findPlayer("Sai Sudharsan"),
//         findPlayer("Stubbs"),
//         findPlayer("Axar"),
//         findPlayer("Prasidh-VC"),
//         findPlayer("Siraj"),
//         findPlayer("Sai Kishore")
//       ];

//       const captain = players.find(p => p.name.includes("Buttler")) || players[0];
//       const viceCaptain = players.find(p => p.name.includes("Prasidh")) || players[1];

//       return {
//         id: Date.now(),
//         players: players.sort((a, b) => getRoleOrder(a.role) - getRoleOrder(b.role)),
//         captain,
//         viceCaptain,
//         substitutes: [],
//         teamName: "Predefined Team 2",
//         team1ShortName: team1.shortName || 'T1',
//         team2ShortName: team2.shortName || 'T2',
//         riskLevel,
//         matchId,
//         matchName: `${team1.name} vs ${team2.name}`,
//         createdAt: new Date().toISOString(),
//         changes: 0,
//         hadChanges: false,
//         userId: user?.id || '',
//         userEmail: user?.primaryEmailAddress?.emailAddress || '',
//         team1Logo: team1.logo || '/fallback-team.png',
//         team2Logo: team2.logo || '/fallback-team.png',
//         team1Count: players.filter(p => p.teamShortName === team1.shortName).length,
//         team2Count: players.filter(p => p.teamShortName === team2.shortName).length,
//         wkCount: players.filter(p => normalizeRole(p.role) === 'WK-Batsman').length,
//         batCount: players.filter(p => 
//           ['Batsman', 'Batting Allrounder'].includes(normalizeRole(p.role))
//         ).length,
//         arCount: players.filter(p => normalizeRole(p.role) === 'Bowling Allrounder').length,
//         bowlCount: players.filter(p => normalizeRole(p.role) === 'Bowler').length,
//         teamComposition: {
//           'WK-Batsman': players.filter(p => normalizeRole(p.role) === 'WK-Batsman').length,
//           'Batsman': players.filter(p => normalizeRole(p.role) === 'Batsman').length,
//           'Batting Allrounder': players.filter(p => normalizeRole(p.role) === 'Batting Allrounder').length,
//           'Bowling Allrounder': players.filter(p => normalizeRole(p.role) === 'Bowling Allrounder').length,
//           'Bowler': players.filter(p => normalizeRole(p.role) === 'Bowler').length,
//           [team1.shortName || 'T1']: players.filter(p => p.teamShortName === team1.shortName).length,
//           [team2.shortName || 'T2']: players.filter(p => p.teamShortName === team2.shortName).length,
//           overseas: players.filter(p => p.isOverseas).length,
//           totalScore: players.reduce((sum, p) => sum + (p.selectedBy || 0), 0)
//         }
//       };
//     }

//     return null;
//   };

//   const calculatePlayerScore = (player: PlayerDetail, forCaptaincy = false): number => {
//     const baseScore = forCaptaincy ? player.selCapPerc : player.selectedBy;
//     let riskFactor = 1;
    
//     if (riskLevel < 20) riskFactor = 1 + (Math.random() * 0.1);
//     else if (riskLevel < 40) riskFactor = 0.9 + (Math.random() * 0.2);
//     else if (riskLevel < 60) riskFactor = 0.8 + (Math.random() * 0.4);
//     else if (riskLevel < 80) riskFactor = 0.6 + (Math.random() * 0.6);
//     else riskFactor = 0.4 + (Math.random() * 0.8);
    
//     return (baseScore ?? 0) * riskFactor;
//   };

//   const weightedRandomPick = (
//     players: PlayerDetail[], 
//     field: 'selectedBy' | 'selCapPerc' | 'selVcPerc'
//   ): PlayerDetail => {
//     const totalWeight = players.reduce((sum, p) => sum + (p[field] || 0.1), 0);
//     let random = Math.random() * totalWeight;
    
//     for (const player of players) {
//       random -= player[field] || 0.1;
//       if (random <= 0) return player;
//     }
//     return players[0];
//   };

//   const selectPlayerByRisk = (players: PlayerDetail[], risk: number): PlayerDetail | null => {
//     if (players.length === 0) return null;
    
//     const sorted = [...players].sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0));
//     const safeRandomIndex = (max: number) => Math.min(Math.floor(Math.random() * max), sorted.length - 1);
    
//     if (risk < 20) {
//       return sorted[safeRandomIndex(Math.max(1, Math.ceil(sorted.length * 0.3)))];
//     } else if (risk < 40) {
//       return weightedRandomPick(sorted.slice(0, Math.max(1, Math.ceil(sorted.length * 0.4))), 'selectedBy');
//     } else if (risk < 60) {
//       return Math.random() > 0.7 
//         ? sorted[safeRandomIndex(sorted.length)]
//         : weightedRandomPick(sorted.slice(0, Math.max(1, Math.ceil(sorted.length * 0.6))), 'selectedBy');
//     } else if (risk < 80) {
//       return Math.random() > 0.5 
//         ? weightedRandomPick(sorted, 'selectedBy')
//         : sorted[safeRandomIndex(sorted.length)];
//     } else {
//       return sorted[safeRandomIndex(sorted.length)];
//     }
//   };

//   const selectCaptainAndViceCaptain = (
//     players: PlayerDetail[],
//     risk: number,
//     existingTeams: GeneratedTeam[] = []
//   ): { captain: PlayerDetail; viceCaptain: PlayerDetail } => {
//     const topPlayers = players.slice(0, Math.ceil(players.length * 0.3));
//     let attempts = 0;
//     const MAX_ATTEMPTS = 20;
    
//     const recentCombinations = existingTeams.slice(0, 5).map(t => 
//       `${t.captain.id}-${t.viceCaptain.id}`
//     );

//     while (attempts < MAX_ATTEMPTS) {
//       attempts++;
      
//       let captain: PlayerDetail;
//       let viceCaptain: PlayerDetail;

//       if (risk < 20) {
//         captain = topPlayers[0];
//         viceCaptain = topPlayers.find(p => p.id !== captain.id) || topPlayers[1] || topPlayers[0];
//       } else if (risk < 40) {
//         captain = topPlayers[0];
//         viceCaptain = topPlayers.find(p => 
//           p.id !== captain.id && 
//           normalizeRole(p.role) !== normalizeRole(captain.role)
//         ) || topPlayers.find(p => p.id !== captain.id) || topPlayers[1] || topPlayers[0];
//       } else if (risk < 60) {
//         captain = topPlayers[Math.floor(Math.random() * Math.min(3, topPlayers.length))];
//         viceCaptain = topPlayers.slice(0, 5).find(p => 
//           p.id !== captain.id && 
//           normalizeRole(p.role) !== normalizeRole(captain.role)
//         ) || topPlayers.find(p => p.id !== captain.id) || topPlayers[1] || topPlayers[0];
//       } else if (risk < 80) {
//         captain = topPlayers[Math.floor(Math.random() * Math.min(5, topPlayers.length))];
//         viceCaptain = topPlayers.find(p => 
//           p.id !== captain.id && 
//           Math.random() > 0.3
//         ) || topPlayers.find(p => p.id !== captain.id) || topPlayers[0];
//       } else {
//         captain = topPlayers[Math.floor(Math.random() * topPlayers.length)];
//         viceCaptain = topPlayers.find(p => p.id !== captain.id) || topPlayers[0];
//       }

//       if (captain.id === viceCaptain.id) {
//         viceCaptain = topPlayers.find(p => p.id !== captain.id) || {
//           ...defaultPlayer,
//           id: -1 * Date.now()
//         };
//       }

//       const comboKey = `${captain.id}-${viceCaptain.id}`;
      
//       if (!recentCombinations.includes(comboKey) || attempts >= MAX_ATTEMPTS - 5) {
//         return { captain, viceCaptain };
//       }
//     }

//     const captain = topPlayers[0];
//     const viceCaptain = topPlayers.find(p => p.id !== captain.id) || {
//       ...defaultPlayer,
//       id: -1 * Date.now()
//     };
    
//     return { 
//       captain, 
//       viceCaptain
//     };
//   };

//   const createBalancedTeam = useCallback((
//     players: PlayerDetail[], 
//     existingTeamCount: number,
//     existingTeams: GeneratedTeam[] = []
//   ): GeneratedTeam | null => {
//     // Check for predefined team first
//     const predefinedTeam = getPredefinedTeam();
//     if (predefinedTeam) return predefinedTeam;

//     if (!team1 || !team2) return null;
    
//     const MAX_ATTEMPTS = 200;
//     const team1Short = team1.shortName || 'T1';
//     const team2Short = team2.shortName || 'T2';
    
//     const teamRatio = riskLevel > 50 ? 
//       { main: 7, secondary: 4 } : 
//       { 
//         main: 5 + Math.floor(Math.random() * 3),
//         secondary: 11 - (5 + Math.floor(Math.random() * 3))
//       };
  
//     const uniquePlayers = players.reduce((acc: PlayerDetail[], player) => {
//       if (!acc.some(p => p.id === player.id)) {
//         acc.push(player);
//       }
//       return acc;
//     }, []);
  
//     const availablePlayers = uniquePlayers.filter(p => p.isPlaying);
    
//     if (availablePlayers.length < 11) {
//       setError(`Not enough available players (${availablePlayers.length}/11)`);
//       return null;
//     }
  
//     const sortedPlayers = [...availablePlayers].sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0));
  
//     let attempts = 0;
//     while (attempts < MAX_ATTEMPTS) {
//       attempts++;
      
//       const mainTeam = Math.random() > 0.5 ? team1Short : team2Short;
//       const secondaryTeam = mainTeam === team1Short ? team2Short : team1Short;
      
//       const teamComposition: Record<string, number> = {
//         'WK-Batsman': 0,
//         'Batsman': 0,
//         'Batting Allrounder': 0,
//         'Bowling Allrounder': 0,
//         'Bowler': 0,
//         [team1Short]: 0,
//         [team2Short]: 0,
//         overseas: 0,
//         totalScore: 0
//       };
  
//       const { captain, viceCaptain } = selectCaptainAndViceCaptain(
//         sortedPlayers, 
//         riskLevel,
//         existingTeams
//       );
      
//       if (!captain || !viceCaptain || captain.id === viceCaptain.id) continue;
  
//       const teamPlayers: PlayerDetail[] = [captain, viceCaptain];
      
//       [captain, viceCaptain].forEach(player => {
//         const role = normalizeRole(player.role);
//         teamComposition[role]++;
//         teamComposition[player.teamShortName === team1Short ? team1Short : team2Short]++;
//         if (player.isOverseas) teamComposition.overseas++;
//         teamComposition.totalScore += calculatePlayerScore(player);
//       });
  
//       const remainingPlayers = sortedPlayers.filter(p => 
//         !teamPlayers.some(tp => tp.id === p.id) &&
//         p.id !== captain.id && 
//         p.id !== viceCaptain.id
//       );
  
//       const roleRequirements = [
//         { role: 'WK-Batsman', min: 1, max: 4 },
//         { role: 'Batsman', min: 2, max: 6 },
//         { role: 'Batting Allrounder', min: 0, max: 4 },
//         { role: 'Bowling Allrounder', min: 0, max: 4 },
//         { role: 'Bowler', min: 3, max: 6 }
//       ];
  
//       const bowlingRoles = ['Bowler', 'Bowling Allrounder'];
      
//       for (const req of roleRequirements.filter(r => r.min > 0)) {
//         while (teamComposition[req.role] < req.min && remainingPlayers.length > 0) {
//           let candidates = remainingPlayers.filter(p => 
//             normalizeRole(p.role) === req.role
//           );
          
//           if (req.role === 'Bowler' && candidates.length === 0) {
//             candidates = remainingPlayers.filter(p => 
//               bowlingRoles.includes(normalizeRole(p.role))
//             );
//           }
          
//           if (candidates.length === 0) {
//             candidates = remainingPlayers.filter(p => 
//               normalizeRole(p.role) === req.role ||
//               (req.role === 'Bowler' && bowlingRoles.includes(normalizeRole(p.role)))
//             );
//           }
          
//           if (candidates.length === 0) break;
          
//           const player = selectPlayerByRisk(candidates, riskLevel);
//           if (!player) break;
  
//           teamPlayers.push(player);
//           const role = normalizeRole(player.role);
//           teamComposition[role]++;
//           teamComposition[player.teamShortName === team1Short ? team1Short : team2Short]++;
//           if (player.isOverseas) teamComposition.overseas++;
//           teamComposition.totalScore += calculatePlayerScore(player);
          
//           remainingPlayers.splice(remainingPlayers.findIndex(p => p.id === player.id), 1);
//         }
//       }
  
//       while (teamPlayers.length < 11 && remainingPlayers.length > 0) {
//         const mainTeamCount = teamComposition[mainTeam];
//         const secondaryTeamCount = teamComposition[secondaryTeam];
        
//         let candidates = remainingPlayers;
        
//         if (riskLevel > 50) {
//           if (mainTeamCount >= 7) {
//             candidates = candidates.filter(p => p.teamShortName === secondaryTeam);
//           } else if (secondaryTeamCount >= 4) {
//             candidates = candidates.filter(p => p.teamShortName === mainTeam);
//           }
//         } else {
//           if (mainTeamCount >= teamRatio.main) {
//             candidates = candidates.filter(p => p.teamShortName === secondaryTeam);
//           } else if (secondaryTeamCount >= teamRatio.secondary) {
//             candidates = candidates.filter(p => p.teamShortName === mainTeam);
//           }
//         }
        
//         if (candidates.length === 0) {
//           candidates = remainingPlayers;
//         }
        
//         candidates = candidates.filter(p => {
//           const role = normalizeRole(p.role);
//           const req = roleRequirements.find(r => r.role === role);
//           return req ? teamComposition[role] < req.max : true;
//         });
        
//         if (candidates.length === 0) {
//           candidates = remainingPlayers;
//         }
        
//         if (candidates.length === 0) break;
        
//         const player = selectPlayerByRisk(candidates, riskLevel);
//         if (!player) break;
  
//         const role = normalizeRole(player.role);
//         teamPlayers.push(player);
//         teamComposition[role]++;
//         teamComposition[player.teamShortName === team1Short ? team1Short : team2Short]++;
//         if (player.isOverseas) teamComposition.overseas++;
//         teamComposition.totalScore += calculatePlayerScore(player);
        
//         remainingPlayers.splice(remainingPlayers.findIndex(p => p.id === player.id), 1);
//       }
  
//       if (teamPlayers.length === 11) {
//         const playerIds = new Set(teamPlayers.map(p => p.id));
//         if (playerIds.size !== 11) continue;
  
//         const wkCount = teamComposition['WK-Batsman'];
//         const bowlerCount = teamComposition['Bowler'] + teamComposition['Bowling Allrounder'];
        
//         if (wkCount < 1 || bowlerCount < 3) {
//           continue;
//         }
  
//         const allAvailablePlayers = uniquePlayers.filter(p => !teamPlayers.some(tp => tp.id === p.id));
        
//         const substitutes = [...allAvailablePlayers]
//           .sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0))
//           .slice(0, 4);
  
//         return {
//           id: Date.now(),
//           players: [...teamPlayers].sort((a, b) => (getRoleOrder(a.role) - (getRoleOrder(b.role)))),
//           captain,
//           viceCaptain,
//           substitutes,
//           teamName: `Team ${existingTeamCount + 1}`,
//           team1ShortName: team1Short,
//           team2ShortName: team2Short,
//           riskLevel,
//           matchId,
//           matchName: `${team1.name} vs ${team2.name}`,
//           createdAt: new Date().toISOString(),
//           changes: 0,
//           hadChanges: false,
//           userId: user?.id || '',
//           userEmail: user?.primaryEmailAddress?.emailAddress || '',
//           team1Logo: team1.logo || '/fallback-team.png',
//           team2Logo: team2.logo || '/fallback-team.png',
//           team1Count: teamComposition[team1Short],
//           team2Count: teamComposition[team2Short],
//           wkCount: teamComposition['WK-Batsman'],
//           batCount: teamComposition['Batsman'] + teamComposition['Batting Allrounder'],
//           arCount: teamComposition['Bowling Allrounder'],
//           bowlCount: teamComposition['Bowler'],
//           teamComposition
//         };
//       }
//     }
  
//     console.error(`Team generation failed after ${MAX_ATTEMPTS} attempts`);
//     setError(`Failed to generate valid team after ${MAX_ATTEMPTS} attempts. Try adjusting risk level.`);
//     return null;
//   }, [team1, team2, riskLevel, matchId, user]);

//   const getPlayerPool = useCallback((): PlayerDetail[] => {
//     if (!team1 || !team2) return [];
    
//     const team1Players = team1.playerDetails || [];
//     const team2Players = team2.playerDetails || [];
    
//     const allPlayers = [...team1Players, ...team2Players].map(p => ({
//       ...p,
//       selectedBy: p.selectedBy || 0,
//       selCapPerc: p.selCapPerc || 0,
//       selVcPerc: p.selVcPerc || 0,
//       isPlaying: !p.substitute
//     }));

//     const wkPlayers = allPlayers.filter(p => normalizeRole(p.role) === 'WK-Batsman');
//     const batPlayers = allPlayers.filter(p => 
//       ['Batsman', 'Batting Allrounder'].includes(normalizeRole(p.role))
//     );
//     const bowlPlayers = allPlayers.filter(p => 
//       ['Bowler', 'Bowling Allrounder'].includes(normalizeRole(p.role))
//     );
//     const allPlayersCount = allPlayers.filter(p => 
//       ['Bowling Allrounder', 'Batting Allrounder'].includes(normalizeRole(p.role))
//     );

//     setRoleCounts({
//       wk: wkPlayers.length,
//       batsmen: batPlayers.length,
//       allrounders: allPlayersCount.length,
//       bowlers: bowlPlayers.length
//     });

//     return allPlayers;
//   }, [team1, team2]);

//   const getTeamCountForMatch = async (): Promise<number> => {
//     if (!user || !matchId) return 0;
    
//     try {
//       const q = query(
//         collection(db, "users", user.id, "matches", matchId, "teams"),
//         limit(MAX_TEAMS_PER_MATCH)
//       );
//       const querySnapshot = await getDocs(q);
//       return querySnapshot.size;
//     } catch (err) {
//       console.error("Failed to count teams:", err);
//       return 0;
//     }
//   };

//   const saveTeamToFirestore = async (team: GeneratedTeam): Promise<string | null> => {
//     if (!user || !matchId) return null;
    
//     try {
//       const teamData = {
//         ...team,
//         userId: user.id,
//         userEmail: user.primaryEmailAddress?.emailAddress || ''
//       };

//       const matchTeamsRef = collection(db, "users", user.id, "matches", matchId, "teams");
//       const teamRef = doc(matchTeamsRef);
      
//       await setDoc(teamRef, teamData);
//       return teamRef.id;
//     } catch (err) {
//       console.error("Failed to save team:", err);
//       throw err;
//     }
//   };

//   const fetchSavedTeams = useCallback(async (): Promise<GeneratedTeam[]> => {
//     if (!user || !matchId) return [];
    
//     try {
//       const q = query(
//         collection(db, "users", user.id, "matches", matchId, "teams"),
//         orderBy("createdAt", "desc"),
//         limit(MAX_TEAMS_PER_MATCH)
//       );
//       const querySnapshot = await getDocs(q);
//       return querySnapshot.docs.map(doc => ({
//         ...doc.data() as GeneratedTeam,
//         id: doc.id
//       }));
//     } catch (err) {
//       console.error("Failed to fetch saved teams:", err);
//       return [];
//     }
//   }, [user, matchId]);

//   useEffect(() => {
//     const loadTeams = async () => {
//       if (!matchId || !user?.id) return;
      
//       try {
//         const savedTeams = localStorage.getItem(localStorageKey);
//         if (savedTeams) {
//           setGeneratedTeams(JSON.parse(savedTeams));
//           return;
//         }

//         const teams = await fetchSavedTeams();
//         if (teams.length > 0) {
//           setGeneratedTeams(teams);
//           localStorage.setItem(localStorageKey, JSON.stringify(teams));
//           showTeamCountMessage(teams.length);
//         }
//       } catch (err) {
//         console.error("Failed to load teams:", err);
//       }
//     };

//     loadTeams();
//   }, [localStorageKey, matchId, user?.id, fetchSavedTeams]);

//   const handleGenerateTeams = useCallback(async () => {
//     if (!team1 || !team2) {
//       setError("Select both teams first");
//       return;
//     }

//     if (!user) {
//       setError("Please sign in to generate teams");
//       return;
//     }

//     // Check for predefined team first
//     const predefinedTeam = getPredefinedTeam();
//     if (predefinedTeam) {
//       setIsGenerating(true);
//       try {
//         const teamId = await saveTeamToFirestore(predefinedTeam);
//         const newTeam = { ...predefinedTeam, id: teamId || Date.now().toString() };
//         const updatedTeams = [newTeam, ...generatedTeams];
//         setGeneratedTeams(updatedTeams);
//         localStorage.setItem(localStorageKey, JSON.stringify(updatedTeams));
//         onBalanceUpdate(userBalance - 100);
//         showTeamCountMessage(updatedTeams.length);
//         return;
//       } catch (err) {
//         setError("Failed to save predefined team");
//       } finally {
//         setIsGenerating(false);
//       }
//     }

//     const currentTeamCount = await getTeamCountForMatch();
//     if (currentTeamCount >= MAX_TEAMS_PER_MATCH) {
//       setError(`You've reached the maximum of ${MAX_TEAMS_PER_MATCH} teams for this match`);
//       return;
//     }

//     const remainingTeamSlots = MAX_TEAMS_PER_MATCH - currentTeamCount;
//     const teamsToGenerate = Math.min(teamCount, remainingTeamSlots);

//     if (teamsToGenerate <= 0) {
//       setError(`You've reached the maximum of ${MAX_TEAMS_PER_MATCH} teams for this match`);
//       return;
//     }

//     if (needsPayment) {
//       setShowPaymentDialog(true);
//       return;
//     }

//     const allPlayers = getPlayerPool();
//     if (allPlayers.length < 11) {
//       setError(`Not enough players (${allPlayers.length}/11). Please check your filters.`);
//       return;
//     }

//     setIsGenerating(true);
//     setError(null);

//     try {
//       await runTransaction(db, async (transaction) => {
//         const userRef = doc(db, "users", user.id);
//         const userDoc = await transaction.get(userRef);
        
//         if (!userDoc.exists()) throw new Error("User not found");
//         if ((userDoc.data().credits || 0) < requiredCredits) {
//           throw new Error("Insufficient balance");
//         }
        
//         transaction.update(userRef, {
//           credits: increment(-requiredCredits)
//         });
//       });

//       const newTeams: GeneratedTeam[] = [];
//       const TOTAL_ATTEMPTS = teamsToGenerate * 100;
//       let attempts = 0;

//       while (newTeams.length < teamsToGenerate && attempts < TOTAL_ATTEMPTS) {
//         attempts++;
//         const team = createBalancedTeam(allPlayers, currentTeamCount + newTeams.length, newTeams);
        
//         if (team) {
//           const isUnique = newTeams.every(existingTeam => {
//             const existingPlayers = existingTeam.players.map(p => p.id).sort();
//             const newPlayers = team.players.map(p => p.id).sort();
//             const diffCount = existingPlayers.filter(id => !newPlayers.includes(id)).length;
//             return diffCount >= 3;
//           });

//           if (isUnique || newTeams.length === 0) {
//             const teamId = await saveTeamToFirestore(team);
//             newTeams.push({ ...team, id: teamId || Date.now().toString() });
//           }
//         }
//       }

//       if (newTeams.length === 0) {
//         const actualCounts = {
//           wk: allPlayers.filter(p => normalizeRole(p.role) === 'WK-Batsman').length,
//           batsmen: allPlayers.filter(p => 
//             ['Batsman', 'Batting Allrounder'].includes(normalizeRole(p.role))
//           ).length,
//           allrounders: allPlayers.filter(p => 
//             ['Bowling Allrounder', 'Batting Allrounder'].includes(normalizeRole(p.role))
//           ).length,
//           bowlers: allPlayers.filter(p => 
//             ['Bowler', 'Bowling Allrounder'].includes(normalizeRole(p.role))
//           ).length
//         };

//         throw new Error(
//           `Failed to generate valid teams after ${TOTAL_ATTEMPTS} attempts.\n` +
//           `Player counts: WK: ${actualCounts.wk}, Batsmen: ${actualCounts.batsmen}, ` +
//           `Allrounders: ${actualCounts.allrounders}, Bowlers: ${actualCounts.bowlers}`
//         );
//       }

//       const updatedTeams = [...newTeams, ...generatedTeams];
//       setGeneratedTeams(updatedTeams);
//       localStorage.setItem(localStorageKey, JSON.stringify(updatedTeams));
//       onBalanceUpdate(userBalance - requiredCredits);

//       const updatedTeamCount = currentTeamCount + newTeams.length;
//       showTeamCountMessage(updatedTeamCount);

//     } catch (err: any) {
//       setError(err.message || "Failed to generate teams");
//     } finally {
//       setIsGenerating(false);
//     }
//   }, [
//     team1, team2, teamCount, riskLevel, user, 
//     userBalance, requiredCredits, needsPayment, 
//     onBalanceUpdate, createBalancedTeam, matchId,
//     fetchSavedTeams, getPlayerPool, generatedTeams,
//     localStorageKey, roleCounts, getTeamCountForMatch,
//     saveTeamToFirestore, getPredefinedTeam
//   ]);

//   const checkLineupChanges = useCallback(async () => {
//     if (!user?.id || !matchId) return;
    
//     try {
//       const savedTeams = localStorage.getItem(localStorageKey);
//       if (!savedTeams) return;
      
//       const teams: GeneratedTeam[] = JSON.parse(savedTeams);
//       const updatedTeams: GeneratedTeam[] = [];
      
//       for (const team of teams) {
//         const playersWithStatus = team.players.map(player => ({
//           ...player,
//           isNowSubstitute: Math.random() < 0.1
//         }));
        
//         const nonPlayingPlayers = playersWithStatus.filter(p => p.isNowSubstitute);
//         if (nonPlayingPlayers.length === 0) {
//           updatedTeams.push(team);
//           continue;
//         }
        
//         const playingPlayers = playersWithStatus.filter(p => !p.isNowSubstitute);
//         const availableSubstitutes = team.substitutes?.filter(sub => 
//           !playingPlayers.some(p => p.id === sub.id)
//         ) || [];
        
//         let newPlayers = [...playingPlayers];
        
//         for (const nonPlayer of nonPlayingPlayers) {
//           const replacement = availableSubstitutes.find(sub => 
//             normalizeRole(sub.role) === normalizeRole(nonPlayer.role)
//           );
          
//           if (replacement) {
//             const fixedReplacement = {
//               ...replacement,
//               isNowSubstitute: replacement.isNowSubstitute === undefined ? false : replacement.isNowSubstitute,
//             };
          
//             newPlayers.push(fixedReplacement);
//             availableSubstitutes.splice(availableSubstitutes.indexOf(replacement), 1);
//           } else {
//             const fixedNonPlayer = {
//               ...nonPlayer,
//               isNowSubstitute: nonPlayer.isNowSubstitute === undefined ? false : nonPlayer.isNowSubstitute,
//             };
          
//             newPlayers.push(fixedNonPlayer);
//           }
//         }
        
//         updatedTeams.push({
//           ...team,
//           players: newPlayers,
//           captain: newPlayers.find(p => p.id === team.captain.id) || team.captain,
//           viceCaptain: newPlayers.find(p => p.id === team.viceCaptain.id) || team.viceCaptain,
//           updatedAt: new Date().toISOString(),
//           hadChanges: nonPlayingPlayers.length > 0
//         });
//       }
      
//       localStorage.setItem(localStorageKey, JSON.stringify(updatedTeams));
//       setGeneratedTeams(updatedTeams);
      
//       if (updatedTeams.some(t => t.hadChanges)) {
//         const currentTeamCount = updatedTeams.length;
//         showTeamCountMessage(currentTeamCount);
//       }
      
//     } catch (err) {
//       console.error("Failed to check lineup changes:", err);
//     }
//   }, [user?.id, matchId, localStorageKey]);

//   const generateButton = (
//     <div className="space-y-2">
//       <button
//         onClick={handleGenerateTeams}
//         disabled={isGenerating || !team1 || !team2}
//         className={`
//           w-full px-4 py-3 rounded-md font-bold
//           ${isGenerating ? 'bg-gray-500' : 
//            needsPayment ? 'bg-yellow-500 hover:bg-yellow-600' : 
//            'bg-blue-500 hover:bg-blue-600'}
//           text-white transition-colors
//         `}
//       >
//         {isGenerating ? (
//           <span className="flex items-center justify-center gap-2">
//             <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//             </svg>
//             Generating...
//           </span>
//         ) : !team1 || !team2 ? (
//           "Select both teams"
//         ) : needsPayment ? (
//           `Add ₹${paymentAmount} to Generate team`
//         ) : (
//           `Generate ${teamCount} Teams (₹${requiredCredits})`
//         )}
//       </button>

//       <div className="flex justify-between text-sm">
//         <span>Your Credits: <span className='text-green-500'>₹{userBalance} </span> </span>
//         {needsPayment ? (
//           <span className="text-red-500">Need ₹${paymentAmount} more</span>
//         ) : (
//           <span className="text-green-500">Sufficient balance</span>
//         )}
//       </div>

//       {error && (
//         <div className="text-red-500 text-sm p-2 bg-red-50 rounded-lg">
//           <p className="font-medium">{error}</p>
//           {error.includes("Player counts") && (
//             <div className="mt-2 text-xs">
//               <p>Current player counts:</p>
//               <ul className="list-disc pl-5">
//                 <li>WK-Batsman: {roleCounts.wk} (min 1)</li>
//                 <li>Batsmen: {roleCounts.batsmen}</li>
//                 <li>Bowlers: {roleCounts.bowlers}</li>
//               </ul>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );

//   const paymentDialog = showPaymentDialog && (
//     <PaymentDialog
//       currentBalance={userBalance}
//       requiredAmount={paymentAmount}
//       onPaymentSuccess={(amount) => {
//         onBalanceUpdate(userBalance + amount);
//         setShowPaymentDialog(false);
//         handleGenerateTeams();
//       }}
//       onOpenChange={setShowPaymentDialog}
//       open={showPaymentDialog}
//       onProcessingStateChange={setIsGenerating}
//     />
//   );

//   return {
//     generatedTeams,
//     isGenerating,
//     generateButton,
//     paymentDialog,
//     error,
//     setError,
//     fetchSavedTeams,
//     setGeneratedTeams,
//     checkLineupChanges
//   };
// };












// //ORIGNAL
// // components/TeamGenerator.tsx
// "use client";
// import { useState, useCallback, useMemo, useEffect } from "react";
// import { PaymentDialog } from "./PaymentDialog";
// import { db } from "@/lib/firebase";
// import { 
//   doc, 
//   runTransaction, 
//   increment, 
//   setDoc, 
//   collection, 
//   query, 
//   orderBy, 
//   getDocs,
//   limit
// } from "firebase/firestore";
// import { useUser } from "@clerk/nextjs";
// import { PlayerDetail, GeneratedTeam, Team } from "@/types/match";

// interface TeamGeneratorProps {
//   team1?: Team;
//   team2?: Team;
//   teamCount: number;
//   riskLevel: number;
//   userBalance: number;
//   onBalanceUpdate: (newBalance: number) => void;
//   matchId: string;
// }

// const MAX_TEAMS_PER_MATCH = 20;
// const MIN_TEAMS_FOR_GRAND_LEAGUE = 10;

// export const useTeamGenerator = ({ 
//   team1, 
//   team2, 
//   teamCount, 
//   riskLevel,
//   userBalance,
//   onBalanceUpdate,
//   matchId
// }: TeamGeneratorProps) => {
//   const { user } = useUser();
//   const [generatedTeams, setGeneratedTeams] = useState<GeneratedTeam[]>([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [showPaymentDialog, setShowPaymentDialog] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [roleCounts, setRoleCounts] = useState({
//     wk: 0,
//     batsmen: 0,
//     allrounders: 0,
//     bowlers: 0
//   });

//   const requiredCredits = useMemo(() => teamCount * 100, [teamCount]);
//   const needsPayment = useMemo(() => userBalance < requiredCredits, [userBalance, requiredCredits]);
//   const paymentAmount = useMemo(() => Math.max(requiredCredits - userBalance, 100), [requiredCredits, userBalance]);
//   const localStorageKey = useMemo(() => `matchTeams_${matchId}_${user?.id}`, [matchId, user?.id]);

//   const defaultPlayer: PlayerDetail = {
//     id: 0,
//     name: 'Unknown Player',
//     fullName: '',
//     nickName: '',
//     role: 'Bowler',
//     captain: false,
//     keeper: false,
//     isOverseas: false,
//     teamName: '',
//     teamShortName: '',
//     imgURL: '/default-player.png',
//     isPlaying: true,
//     selectedBy: 0,
//     selCapPerc: 0,
//     selVcPerc: 0,
//     points: 0,
//     isNowSubstitute: false
//   };

//   const showTeamCountMessage = (currentTeamCount: number) => {
//     const teamsNeeded = MIN_TEAMS_FOR_GRAND_LEAGUE - currentTeamCount;
//     if (teamsNeeded > 0) {
//       alert(`🔥 You need ${teamsNeeded} more teams to qualify for Grand League prizes!`);
//     } else {
//       alert('🎉 Congratulations! You have qualified for Grand League prizes!');
//     }
//   };

//   const normalizeRole = (role: string): string => {
//     if (!role) return 'Bowler';
//     const lowerRole = role.toLowerCase().trim();
//     if (lowerRole.includes('keep') || lowerRole.includes('wk')) return 'WK-Batsman';
//     if (lowerRole.includes('bat') && lowerRole.includes('all')) return 'Batting Allrounder';
//     if (lowerRole.includes('bowl') && lowerRole.includes('all')) return 'Bowling Allrounder';
//     if (lowerRole.includes('bat')) return 'Batsman';
//     if (lowerRole.includes('bowl')) return 'Bowler';
//     if (lowerRole.includes('all')) return 'Bowling Allrounder';
//     return 'Bowler';
//   };

//   const getRoleOrder = (role: string): number => {
//     const normalized = normalizeRole(role);
//     switch(normalized) {
//       case 'WK-Batsman': return 1;
//       case 'Batsman': return 2;
//       case 'Batting Allrounder': return 3;
//       case 'Bowling Allrounder': return 4;
//       case 'Bowler': return 5;
//       default: return 6;
//     }
//   };

//   const calculatePlayerScore = (player: PlayerDetail, forCaptaincy = false): number => {
//     const baseScore = forCaptaincy ? player.selCapPerc : player.selectedBy;
//     let riskFactor = 1;
    
//     if (riskLevel < 20) riskFactor = 1 + (Math.random() * 0.1);
//     else if (riskLevel < 40) riskFactor = 0.9 + (Math.random() * 0.2);
//     else if (riskLevel < 60) riskFactor = 0.8 + (Math.random() * 0.4);
//     else if (riskLevel < 80) riskFactor = 0.6 + (Math.random() * 0.6);
//     else riskFactor = 0.4 + (Math.random() * 0.8);
    
//     return (baseScore ?? 0) * riskFactor;
//   };

//   const weightedRandomPick = (
//     players: PlayerDetail[], 
//     field: 'selectedBy' | 'selCapPerc' | 'selVcPerc'
//   ): PlayerDetail => {
//     const totalWeight = players.reduce((sum, p) => sum + (p[field] || 0.1), 0);
//     let random = Math.random() * totalWeight;
    
//     for (const player of players) {
//       random -= player[field] || 0.1;
//       if (random <= 0) return player;
//     }
//     return players[0];
//   };

//   const selectPlayerByRisk = (players: PlayerDetail[], risk: number): PlayerDetail | null => {
//     if (players.length === 0) return null;
    
//     const sorted = [...players].sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0));
//     const safeRandomIndex = (max: number) => Math.min(Math.floor(Math.random() * max), sorted.length - 1);
    
//     if (risk < 20) {
//       return sorted[safeRandomIndex(Math.max(1, Math.ceil(sorted.length * 0.3)))];
//     } else if (risk < 40) {
//       return weightedRandomPick(sorted.slice(0, Math.max(1, Math.ceil(sorted.length * 0.4))), 'selectedBy');
//     } else if (risk < 60) {
//       return Math.random() > 0.7 
//         ? sorted[safeRandomIndex(sorted.length)]
//         : weightedRandomPick(sorted.slice(0, Math.max(1, Math.ceil(sorted.length * 0.6))), 'selectedBy');
//     } else if (risk < 80) {
//       return Math.random() > 0.5 
//         ? weightedRandomPick(sorted, 'selectedBy')
//         : sorted[safeRandomIndex(sorted.length)];
//     } else {
//       return sorted[safeRandomIndex(sorted.length)];
//     }
//   };

//   const selectCaptainAndViceCaptain = (
//     players: PlayerDetail[],
//     risk: number,
//     existingTeams: GeneratedTeam[] = []
//   ): { captain: PlayerDetail; viceCaptain: PlayerDetail } => {
//     const topPlayers = players.slice(0, Math.ceil(players.length * 0.3));
//     let attempts = 0;
//     const MAX_ATTEMPTS = 20;
    
//     const recentCombinations = existingTeams.slice(0, 5).map(t => 
//       `${t.captain.id}-${t.viceCaptain.id}`
//     );

//     while (attempts < MAX_ATTEMPTS) {
//       attempts++;
      
//       let captain: PlayerDetail;
//       let viceCaptain: PlayerDetail;

//       if (risk < 20) {
//         captain = topPlayers[0];
//         viceCaptain = topPlayers.find(p => p.id !== captain.id) || topPlayers[1] || topPlayers[0];
//       } else if (risk < 40) {
//         captain = topPlayers[0];
//         viceCaptain = topPlayers.find(p => 
//           p.id !== captain.id && 
//           normalizeRole(p.role) !== normalizeRole(captain.role)
//         ) || topPlayers.find(p => p.id !== captain.id) || topPlayers[1] || topPlayers[0];
//       } else if (risk < 60) {
//         captain = topPlayers[Math.floor(Math.random() * Math.min(3, topPlayers.length))];
//         viceCaptain = topPlayers.slice(0, 5).find(p => 
//           p.id !== captain.id && 
//           normalizeRole(p.role) !== normalizeRole(captain.role)
//         ) || topPlayers.find(p => p.id !== captain.id) || topPlayers[1] || topPlayers[0];
//       } else if (risk < 80) {
//         captain = topPlayers[Math.floor(Math.random() * Math.min(5, topPlayers.length))];
//         viceCaptain = topPlayers.find(p => 
//           p.id !== captain.id && 
//           Math.random() > 0.3
//         ) || topPlayers.find(p => p.id !== captain.id) || topPlayers[0];
//       } else {
//         captain = topPlayers[Math.floor(Math.random() * topPlayers.length)];
//         viceCaptain = topPlayers.find(p => p.id !== captain.id) || topPlayers[0];
//       }

//       if (captain.id === viceCaptain.id) {
//         viceCaptain = topPlayers.find(p => p.id !== captain.id) || {
//           ...defaultPlayer,
//           id: -1 * Date.now()
//         };
//       }

//       const comboKey = `${captain.id}-${viceCaptain.id}`;
      
//       if (!recentCombinations.includes(comboKey) || attempts >= MAX_ATTEMPTS - 5) {
//         return { captain, viceCaptain };
//       }
//     }

//     const captain = topPlayers[0];
//     const viceCaptain = topPlayers.find(p => p.id !== captain.id) || {
//       ...defaultPlayer,
//       id: -1 * Date.now()
//     };
    
//     return { 
//       captain, 
//       viceCaptain
//     };
//   };

//   const createBalancedTeam = useCallback((
//     players: PlayerDetail[], 
//     existingTeamCount: number,
//     existingTeams: GeneratedTeam[] = []
//   ): GeneratedTeam | null => {
//     if (!team1 || !team2) return null;
    
//     const MAX_ATTEMPTS = 200; // Increased from 100 to 200
//     const team1Short = team1.shortName || 'T1';
//     const team2Short = team2.shortName || 'T2';
    
//     const teamRatio = riskLevel > 50 ? 
//       { main: 7, secondary: 4 } : 
//       { 
//         main: 5 + Math.floor(Math.random() * 3),
//         secondary: 11 - (5 + Math.floor(Math.random() * 3))
//       };
  
//     const uniquePlayers = players.reduce((acc: PlayerDetail[], player) => {
//       if (!acc.some(p => p.id === player.id)) {
//         acc.push(player);
//       }
//       return acc;
//     }, []);
  
//     const availablePlayers = uniquePlayers.filter(p => p.isPlaying);
    
//     if (availablePlayers.length < 11) {
//       setError(`Not enough available players (${availablePlayers.length}/11)`);
//       return null;
//     }
  
//     const sortedPlayers = [...availablePlayers].sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0));
  
//     let attempts = 0;
//     while (attempts < MAX_ATTEMPTS) {
//       attempts++;
      
//       const mainTeam = Math.random() > 0.5 ? team1Short : team2Short;
//       const secondaryTeam = mainTeam === team1Short ? team2Short : team1Short;
      
//       const teamComposition: Record<string, number> = {
//         'WK-Batsman': 0,
//         'Batsman': 0,
//         'Batting Allrounder': 0,
//         'Bowling Allrounder': 0,
//         'Bowler': 0,
//         [team1Short]: 0,
//         [team2Short]: 0,
//         overseas: 0,
//         totalScore: 0
//       };
  
//       const { captain, viceCaptain } = selectCaptainAndViceCaptain(
//         sortedPlayers, 
//         riskLevel,
//         existingTeams
//       );
      
//       if (!captain || !viceCaptain || captain.id === viceCaptain.id) continue;
  
//       const teamPlayers: PlayerDetail[] = [captain, viceCaptain];
      
//       [captain, viceCaptain].forEach(player => {
//         const role = normalizeRole(player.role);
//         teamComposition[role]++;
//         teamComposition[player.teamShortName === team1Short ? team1Short : team2Short]++;
//         if (player.isOverseas) teamComposition.overseas++;
//         teamComposition.totalScore += calculatePlayerScore(player);
//       });
  
//       const remainingPlayers = sortedPlayers.filter(p => 
//         !teamPlayers.some(tp => tp.id === p.id) &&
//         p.id !== captain.id && 
//         p.id !== viceCaptain.id
//       );
  
//       // Updated role requirements to be more flexible
//       const roleRequirements = [
//         { role: 'WK-Batsman', min: 1, max: 4 },
//         { role: 'Batsman', min: 2, max: 6 },
//         { role: 'Batting Allrounder', min: 0, max: 4 },
//         { role: 'Bowling Allrounder', min: 0, max: 4 },
//         { role: 'Bowler', min: 3, max: 6 }
//       ];
  
//       // First ensure we have at least 1 WK and 3 bowlers (including bowling allrounders)
//       const bowlingRoles = ['Bowler', 'Bowling Allrounder'];
      
//       for (const req of roleRequirements.filter(r => r.min > 0)) {
//         while (teamComposition[req.role] < req.min && remainingPlayers.length > 0) {
//           let candidates = remainingPlayers.filter(p => 
//             normalizeRole(p.role) === req.role
//           );
          
//           // For bowlers, also consider bowling allrounders if needed
//           if (req.role === 'Bowler' && candidates.length === 0) {
//             candidates = remainingPlayers.filter(p => 
//               bowlingRoles.includes(normalizeRole(p.role))
//             );
//           }
          
//           // If still no candidates, relax team ratio constraints
//           if (candidates.length === 0) {
//             candidates = remainingPlayers.filter(p => 
//               normalizeRole(p.role) === req.role ||
//               (req.role === 'Bowler' && bowlingRoles.includes(normalizeRole(p.role)))
//             );
//           }
          
//           if (candidates.length === 0) break;
          
//           const player = selectPlayerByRisk(candidates, riskLevel);
//           if (!player) break;
  
//           teamPlayers.push(player);
//           const role = normalizeRole(player.role);
//           teamComposition[role]++;
//           teamComposition[player.teamShortName === team1Short ? team1Short : team2Short]++;
//           if (player.isOverseas) teamComposition.overseas++;
//           teamComposition.totalScore += calculatePlayerScore(player);
          
//           remainingPlayers.splice(remainingPlayers.findIndex(p => p.id === player.id), 1);
//         }
//       }
  
//       // Then fill remaining spots more flexibly
//       while (teamPlayers.length < 11 && remainingPlayers.length > 0) {
//         const mainTeamCount = teamComposition[mainTeam];
//         const secondaryTeamCount = teamComposition[secondaryTeam];
        
//         let candidates = remainingPlayers;
        
//         // Apply team ratio constraints if possible
//         if (riskLevel > 50) {
//           if (mainTeamCount >= 7) {
//             candidates = candidates.filter(p => p.teamShortName === secondaryTeam);
//           } else if (secondaryTeamCount >= 4) {
//             candidates = candidates.filter(p => p.teamShortName === mainTeam);
//           }
//         } else {
//           if (mainTeamCount >= teamRatio.main) {
//             candidates = candidates.filter(p => p.teamShortName === secondaryTeam);
//           } else if (secondaryTeamCount >= teamRatio.secondary) {
//             candidates = candidates.filter(p => p.teamShortName === mainTeam);
//           }
//         }
        
//         // If no candidates after team ratio filter, relax that constraint
//         if (candidates.length === 0) {
//           candidates = remainingPlayers;
//         }
        
//         // Apply role constraints
//         candidates = candidates.filter(p => {
//           const role = normalizeRole(p.role);
//           const req = roleRequirements.find(r => r.role === role);
//           return req ? teamComposition[role] < req.max : true;
//         });
        
//         // If still no candidates, relax role constraints
//         if (candidates.length === 0) {
//           candidates = remainingPlayers;
//         }
        
//         // If still no candidates, we have to break
//         if (candidates.length === 0) break;
        
//         const player = selectPlayerByRisk(candidates, riskLevel);
//         if (!player) break;
  
//         const role = normalizeRole(player.role);
//         teamPlayers.push(player);
//         teamComposition[role]++;
//         teamComposition[player.teamShortName === team1Short ? team1Short : team2Short]++;
//         if (player.isOverseas) teamComposition.overseas++;
//         teamComposition.totalScore += calculatePlayerScore(player);
        
//         remainingPlayers.splice(remainingPlayers.findIndex(p => p.id === player.id), 1);
//       }
  
//       if (teamPlayers.length === 11) {
//         const playerIds = new Set(teamPlayers.map(p => p.id));
//         if (playerIds.size !== 11) continue;
  
//         // Final validation - ensure we have at least 1 WK and 3 bowlers
//         const wkCount = teamComposition['WK-Batsman'];
//         const bowlerCount = teamComposition['Bowler'] + teamComposition['Bowling Allrounder'];
        
//         if (wkCount < 1 || bowlerCount < 3) {
//           continue;
//         }
  
//         const allAvailablePlayers = uniquePlayers.filter(p => !teamPlayers.some(tp => tp.id === p.id));
        
//         const substitutes = [...allAvailablePlayers]
//           .sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0))
//           .slice(0, 4);
  
//         return {
//           id: Date.now(),
//           players: [...teamPlayers].sort((a, b) => (getRoleOrder(a.role) - (getRoleOrder(b.role)))),
//           captain,
//           viceCaptain,
//           substitutes,
//           teamName: `Team ${existingTeamCount + 1}`,
//           team1ShortName: team1Short,
//           team2ShortName: team2Short,
//           riskLevel,
//           matchId,
//           matchName: `${team1.name} vs ${team2.name}`,
//           createdAt: new Date().toISOString(),
//           changes: 0,
//           hadChanges: false,
//           userId: user?.id || '',
//           userEmail: user?.primaryEmailAddress?.emailAddress || '',
//           team1Logo: team1.logo || '/fallback-team.png',
//           team2Logo: team2.logo || '/fallback-team.png',
//           team1Count: teamComposition[team1Short],
//           team2Count: teamComposition[team2Short],
//           wkCount: teamComposition['WK-Batsman'],
//           batCount: teamComposition['Batsman'] + teamComposition['Batting Allrounder'],
//           arCount: teamComposition['Bowling Allrounder'],
//           bowlCount: teamComposition['Bowler'],
//           teamComposition
//         };
//       }
//     }
  
//     console.error(`Team generation failed after ${MAX_ATTEMPTS} attempts`);
//     setError(`Failed to generate valid team after ${MAX_ATTEMPTS} attempts. Try adjusting risk level.`);
//     return null;
//   }, [team1, team2, riskLevel, matchId, user]);

//   const getPlayerPool = useCallback((): PlayerDetail[] => {
//     if (!team1 || !team2) return [];
    
//     const team1Players = team1.playerDetails || [];
//     const team2Players = team2.playerDetails || [];
    
//     const allPlayers = [...team1Players, ...team2Players].map(p => ({
//       ...p,
//       selectedBy: p.selectedBy || 0,
//       selCapPerc: p.selCapPerc || 0,
//       selVcPerc: p.selVcPerc || 0,
//       isPlaying: !p.substitute
//     }));

//     const wkPlayers = allPlayers.filter(p => normalizeRole(p.role) === 'WK-Batsman');
//     const batPlayers = allPlayers.filter(p => 
//       ['Batsman', 'Batting Allrounder'].includes(normalizeRole(p.role))
//     );
//     const bowlPlayers = allPlayers.filter(p => 
//       ['Bowler', 'Bowling Allrounder'].includes(normalizeRole(p.role))
//     );
//     const allPlayersCount = allPlayers.filter(p => 
//       ['Bowling Allrounder', 'Batting Allrounder'].includes(normalizeRole(p.role))
//     );

//     setRoleCounts({
//       wk: wkPlayers.length,
//       batsmen: batPlayers.length,
//       allrounders: allPlayersCount.length,
//       bowlers: bowlPlayers.length
//     });

//     return allPlayers;
//   }, [team1, team2]);

//   const getTeamCountForMatch = async (): Promise<number> => {
//     if (!user || !matchId) return 0;
    
//     try {
//       const q = query(
//         collection(db, "users", user.id, "matches", matchId, "teams"),
//         limit(MAX_TEAMS_PER_MATCH)
//       );
//       const querySnapshot = await getDocs(q);
//       return querySnapshot.size;
//     } catch (err) {
//       console.error("Failed to count teams:", err);
//       return 0;
//     }
//   };

//   const saveTeamToFirestore = async (team: GeneratedTeam): Promise<string | null> => {
//     if (!user || !matchId) return null;
    
//     try {
//       const teamData = {
//         ...team,
//         userId: user.id,
//         userEmail: user.primaryEmailAddress?.emailAddress || ''
//       };

//       const matchTeamsRef = collection(db, "users", user.id, "matches", matchId, "teams");
//       const teamRef = doc(matchTeamsRef);
      
//       await setDoc(teamRef, teamData);
//       return teamRef.id;
//     } catch (err) {
//       console.error("Failed to save team:", err);
//       throw err;
//     }
//   };

//   const fetchSavedTeams = useCallback(async (): Promise<GeneratedTeam[]> => {
//     if (!user || !matchId) return [];
    
//     try {
//       const q = query(
//         collection(db, "users", user.id, "matches", matchId, "teams"),
//         orderBy("createdAt", "desc"),
//         limit(MAX_TEAMS_PER_MATCH)
//       );
//       const querySnapshot = await getDocs(q);
//       return querySnapshot.docs.map(doc => ({
//         ...doc.data() as GeneratedTeam,
//         id: doc.id
//       }));
//     } catch (err) {
//       console.error("Failed to fetch saved teams:", err);
//       return [];
//     }
//   }, [user, matchId]);

//   useEffect(() => {
//     const loadTeams = async () => {
//       if (!matchId || !user?.id) return;
      
//       try {
//         const savedTeams = localStorage.getItem(localStorageKey);
//         if (savedTeams) {
//           setGeneratedTeams(JSON.parse(savedTeams));
//           return;
//         }

//         const teams = await fetchSavedTeams();
//         if (teams.length > 0) {
//           setGeneratedTeams(teams);
//           localStorage.setItem(localStorageKey, JSON.stringify(teams));
//           showTeamCountMessage(teams.length);
//         }
//       } catch (err) {
//         console.error("Failed to load teams:", err);
//       }
//     };

//     loadTeams();
//   }, [localStorageKey, matchId, user?.id, fetchSavedTeams]);

//   const handleGenerateTeams = useCallback(async () => {
//     if (!team1 || !team2) {
//       setError("Select both teams first");
//       return;
//     }

//     if (!user) {
//       setError("Please sign in to generate teams");
//       return;
//     }

//     const currentTeamCount = await getTeamCountForMatch();
//     if (currentTeamCount >= MAX_TEAMS_PER_MATCH) {
//       setError(`You've reached the maximum of ${MAX_TEAMS_PER_MATCH} teams for this match`);
//       return;
//     }

//     const remainingTeamSlots = MAX_TEAMS_PER_MATCH - currentTeamCount;
//     const teamsToGenerate = Math.min(teamCount, remainingTeamSlots);

//     if (teamsToGenerate <= 0) {
//       setError(`You've reached the maximum of ${MAX_TEAMS_PER_MATCH} teams for this match`);
//       return;
//     }

//     if (needsPayment) {
//       setShowPaymentDialog(true);
//       return;
//     }

//     const allPlayers = getPlayerPool();
//     if (allPlayers.length < 11) {
//       setError(`Not enough players (${allPlayers.length}/11). Please check your filters.`);
//       return;
//     }

//     setIsGenerating(true);
//     setError(null);

//     try {
//       await runTransaction(db, async (transaction) => {
//         const userRef = doc(db, "users", user.id);
//         const userDoc = await transaction.get(userRef);
        
//         if (!userDoc.exists()) throw new Error("User not found");
//         if ((userDoc.data().credits || 0) < requiredCredits) {
//           throw new Error("Insufficient balance");
//         }
        
//         transaction.update(userRef, {
//           credits: increment(-requiredCredits)
//         });
//       });

//       const newTeams: GeneratedTeam[] = [];
//       const TOTAL_ATTEMPTS = teamsToGenerate * 100;
//       let attempts = 0;

//       while (newTeams.length < teamsToGenerate && attempts < TOTAL_ATTEMPTS) {
//         attempts++;
//         const team = createBalancedTeam(allPlayers, currentTeamCount + newTeams.length, newTeams);
        
//         if (team) {
//           const isUnique = newTeams.every(existingTeam => {
//             const existingPlayers = existingTeam.players.map(p => p.id).sort();
//             const newPlayers = team.players.map(p => p.id).sort();
//             const diffCount = existingPlayers.filter(id => !newPlayers.includes(id)).length;
//             return diffCount >= 3;
//           });

//           if (isUnique || newTeams.length === 0) {
//             const teamId = await saveTeamToFirestore(team);
//             newTeams.push({ ...team, id: teamId || Date.now().toString() });
//           }
//         }
//       }

//       if (newTeams.length === 0) {
//         const actualCounts = {
//           wk: allPlayers.filter(p => normalizeRole(p.role) === 'WK-Batsman').length,
//           batsmen: allPlayers.filter(p => 
//             ['Batsman', 'Batting Allrounder'].includes(normalizeRole(p.role))
//           ).length,
//           allrounders: allPlayers.filter(p => 
//             ['Bowling Allrounder', 'Batting Allrounder'].includes(normalizeRole(p.role))
//           ).length,
//           bowlers: allPlayers.filter(p => 
//             ['Bowler', 'Bowling Allrounder'].includes(normalizeRole(p.role))
//           ).length
//         };

//         throw new Error(
//           `Failed to generate valid teams after ${TOTAL_ATTEMPTS} attempts.\n` +
//           `Player counts: WK: ${actualCounts.wk}, Batsmen: ${actualCounts.batsmen}, ` +
//           `Allrounders: ${actualCounts.allrounders}, Bowlers: ${actualCounts.bowlers}`
//         );
//       }

//       const updatedTeams = [...newTeams, ...generatedTeams];
//       setGeneratedTeams(updatedTeams);
//       localStorage.setItem(localStorageKey, JSON.stringify(updatedTeams));
//       onBalanceUpdate(userBalance - requiredCredits);

//       const updatedTeamCount = currentTeamCount + newTeams.length;
//       showTeamCountMessage(updatedTeamCount);

//     } catch (err: any) {
//       setError(err.message || "Failed to generate teams");
//     } finally {
//       setIsGenerating(false);
//     }
//   }, [
//     team1, team2, teamCount, riskLevel, user, 
//     userBalance, requiredCredits, needsPayment, 
//     onBalanceUpdate, createBalancedTeam, matchId,
//     fetchSavedTeams, getPlayerPool, generatedTeams,
//     localStorageKey, roleCounts, getTeamCountForMatch,
//     saveTeamToFirestore
//   ]);

//   const checkLineupChanges = useCallback(async () => {
//     if (!user?.id || !matchId) return;
    
//     try {
//       const savedTeams = localStorage.getItem(localStorageKey);
//       if (!savedTeams) return;
      
//       const teams: GeneratedTeam[] = JSON.parse(savedTeams);
//       const updatedTeams: GeneratedTeam[] = [];
      
//       for (const team of teams) {
//         const playersWithStatus = team.players.map(player => ({
//           ...player,
//           isNowSubstitute: Math.random() < 0.1
//         }));
        
//         const nonPlayingPlayers = playersWithStatus.filter(p => p.isNowSubstitute);
//         if (nonPlayingPlayers.length === 0) {
//           updatedTeams.push(team);
//           continue;
//         }
        
//         const playingPlayers = playersWithStatus.filter(p => !p.isNowSubstitute);
//         const availableSubstitutes = team.substitutes?.filter(sub => 
//           !playingPlayers.some(p => p.id === sub.id)
//         ) || [];
        
//         let newPlayers = [...playingPlayers];
        
//         for (const nonPlayer of nonPlayingPlayers) {
//           const replacement = availableSubstitutes.find(sub => 
//             normalizeRole(sub.role) === normalizeRole(nonPlayer.role)
//           );
          
//           if (replacement) {
//             // Ensure isNowSubstitute is treated as a boolean, not undefined
//             const fixedReplacement = {
//               ...replacement,
//               isNowSubstitute: replacement.isNowSubstitute === undefined ? false : replacement.isNowSubstitute, // explicitly handling undefined
//             };
          
//             newPlayers.push(fixedReplacement);
//             availableSubstitutes.splice(availableSubstitutes.indexOf(replacement), 1);
//           } else {
//             // Same fix for nonPlayer, if applicable
//             const fixedNonPlayer = {
//               ...nonPlayer,
//               isNowSubstitute: nonPlayer.isNowSubstitute === undefined ? false : nonPlayer.isNowSubstitute, // explicitly handling undefined
//             };
          
//             newPlayers.push(fixedNonPlayer);
//           }
//         }
        
//         updatedTeams.push({
//           ...team,
//           players: newPlayers,
//           captain: newPlayers.find(p => p.id === team.captain.id) || team.captain,
//           viceCaptain: newPlayers.find(p => p.id === team.viceCaptain.id) || team.viceCaptain,
//           updatedAt: new Date().toISOString(),
//           hadChanges: nonPlayingPlayers.length > 0
//         });
//       }
      
//       localStorage.setItem(localStorageKey, JSON.stringify(updatedTeams));
//       setGeneratedTeams(updatedTeams);
      
//       if (updatedTeams.some(t => t.hadChanges)) {
//         const currentTeamCount = updatedTeams.length;
//         showTeamCountMessage(currentTeamCount);
//       }
      
//     } catch (err) {
//       console.error("Failed to check lineup changes:", err);
//     }
//   }, [user?.id, matchId, localStorageKey]);

//   const generateButton = (
//     <div className="space-y-2">
//       <button
//         onClick={handleGenerateTeams}
//         disabled={isGenerating || !team1 || !team2}
//         className={`
//           w-full px-4 py-3 rounded-md font-bold
//           ${isGenerating ? 'bg-gray-500' : 
//            needsPayment ? 'bg-yellow-500 hover:bg-yellow-600' : 
//            'bg-blue-500 hover:bg-blue-600'}
//           text-white transition-colors
//         `}
//       >
//         {isGenerating ? (
//           <span className="flex items-center justify-center gap-2">
//             <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//             </svg>
//             Generating...
//           </span>
//         ) : !team1 || !team2 ? (
//           "Select both teams"
//         ) : needsPayment ? (
//           `Add ₹${paymentAmount} to Generate team`
//         ) : (
//           `Generate ${teamCount} Teams (₹${requiredCredits})`
//         )}
//       </button>

//       <div className="flex justify-between text-sm">
//         <span>Your Credits: <span className='text-green-500'>₹{userBalance} </span> </span>
//         {needsPayment ? (
//           <span className="text-red-500">Need ₹{paymentAmount} more</span>
//         ) : (
//           <span className="text-green-500">Sufficient balance</span>
//         )}
//       </div>

//       {error && (
//         <div className="text-red-500 text-sm p-2 bg-red-50 rounded-lg">
//           <p className="font-medium">{error}</p>
//           {error.includes("Player counts") && (
//             <div className="mt-2 text-xs">
//               <p>Current player counts:</p>
//               <ul className="list-disc pl-5">
//                 <li>WK-Batsman: {roleCounts.wk} (min 1)</li>
//                 <li>Batsmen: {roleCounts.batsmen}</li>
//                 <li>Bowlers: {roleCounts.bowlers}</li>
//               </ul>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );

//   const paymentDialog = showPaymentDialog && (
//     <PaymentDialog
//       currentBalance={userBalance}
//       requiredAmount={paymentAmount}
//       onPaymentSuccess={(amount) => {
//         onBalanceUpdate(userBalance + amount);
//         setShowPaymentDialog(false);
//         handleGenerateTeams();
//       }}
//       onOpenChange={setShowPaymentDialog}
//       open={showPaymentDialog}
//       onProcessingStateChange={setIsGenerating}
//     />
//   );

//   return {
//     generatedTeams,
//     isGenerating,
//     generateButton,
//     paymentDialog,
//     error,
//     setError,
//     fetchSavedTeams,
//     setGeneratedTeams,
//     checkLineupChanges
//   };
// };






















// // Fake teams


// // components/TeamGenerator.tsx
// "use client";
// import { useState, useCallback, useMemo, useEffect } from "react";
// import { PaymentDialog } from "./PaymentDialog";
// import { db } from "@/lib/firebase";
// import { 
//   doc, 
//   runTransaction, 
//   increment, 
//   setDoc, 
//   collection, 
//   query, 
//   orderBy, 
//   getDocs,
//   limit
// } from "firebase/firestore";
// import { useUser } from "@clerk/nextjs";
// import { PlayerDetail, GeneratedTeam, Team } from "@/types/match";

// interface TeamGeneratorProps {
//   team1?: Team;
//   team2?: Team;
//   teamCount: number;
//   riskLevel: number;
//   userBalance: number;
//   onBalanceUpdate: (newBalance: number) => void;
//   matchId: string;
// }

// const MAX_TEAMS_PER_MATCH = 20;
// const MIN_TEAMS_FOR_GRAND_LEAGUE = 10;

// export const useTeamGenerator = ({ 
//   team1, 
//   team2, 
//   teamCount, 
//   riskLevel,
//   userBalance,
//   onBalanceUpdate,
//   matchId
// }: TeamGeneratorProps) => {
//   const { user } = useUser();
//   const [generatedTeams, setGeneratedTeams] = useState<GeneratedTeam[]>([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [showPaymentDialog, setShowPaymentDialog] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [roleCounts, setRoleCounts] = useState({
//     wk: 0,
//     batsmen: 0,
//     allrounders: 0,
//     bowlers: 0
//   });

//   const requiredCredits = useMemo(() => teamCount * 100, [teamCount]);
//   const needsPayment = useMemo(() => userBalance < requiredCredits, [userBalance, requiredCredits]);
//   const paymentAmount = useMemo(() => Math.max(requiredCredits - userBalance, 100), [requiredCredits, userBalance]);
//   const localStorageKey = useMemo(() => `matchTeams_${matchId}_${user?.id}`, [matchId, user?.id]);

//   const defaultPlayer: PlayerDetail = {
//     id: 0,
//     name: 'Unknown Player',
//     fullName: '',
//     nickName: '',
//     role: 'Bowler',
//     captain: false,
//     keeper: false,
//     isOverseas: false,
//     teamName: '',
//     teamShortName: '',
//     imgURL: '/default-player.png',
//     isPlaying: true,
//     selectedBy: 0,
//     selCapPerc: 0,
//     selVcPerc: 0,
//     points: 0,
//     isNowSubstitute: false
//   };

//   const showTeamCountMessage = (currentTeamCount: number) => {
//     const teamsNeeded = MIN_TEAMS_FOR_GRAND_LEAGUE - currentTeamCount;
//     if (teamsNeeded > 0) {
//       alert(`🔥 You need ${teamsNeeded} more teams to qualify for Grand League prizes!`);
//     } else {
//       alert('🎉 Congratulations! You have qualified for Grand League prizes!');
//     }
//   };

//   const normalizeRole = (role: string): string => {
//     if (!role) return 'Bowler';
//     const lowerRole = role.toLowerCase().trim();
//     if (lowerRole.includes('keep') || lowerRole.includes('wk')) return 'WK-Batsman';
//     if (lowerRole.includes('bat') && lowerRole.includes('all')) return 'Batting Allrounder';
//     if (lowerRole.includes('bowl') && lowerRole.includes('all')) return 'Bowling Allrounder';
//     if (lowerRole.includes('bat')) return 'Batsman';
//     if (lowerRole.includes('bowl')) return 'Bowler';
//     if (lowerRole.includes('all')) return 'Bowling Allrounder';
//     return 'Bowler';
//   };

//   const getRoleOrder = (role: string): number => {
//     const normalized = normalizeRole(role);
//     switch(normalized) {
//       case 'WK-Batsman': return 1;
//       case 'Batsman': return 2;
//       case 'Batting Allrounder': return 3;
//       case 'Bowling Allrounder': return 4;
//       case 'Bowler': return 5;
//       default: return 6;
//     }
//   };

//   const getPredefinedTeam = (): GeneratedTeam | null => {
//     if (!team1 || !team2) return null;

//     // Create a function to find player by name
//     const findPlayer = (name: string): PlayerDetail => {
//       const allPlayers = [...(team1.playerDetails || []), ...(team2.playerDetails || [])];
//       const player = allPlayers.find(p => {
//         const playerName = p.name.toLowerCase();
//         const searchName = name.toLowerCase().split('-')[0];
//         return playerName.includes(searchName) || 
//                p.fullName?.toLowerCase().includes(searchName);
//       });
      
//       return player || {
//         ...defaultPlayer,
//         id: -1 * Date.now(),
//         name: name.split('-')[0],
//         role: name.includes('-C') ? 'Batsman' : 
//               name.includes('-Vc') ? 'Batsman' : 
//               name.includes('W Hasaranga') ? 'Bowling Allrounder' :
//               name.includes('Axar') ? 'Bowling Allrounder' :
//               name.includes('Avesh Khan') ? 'Bowler' :
//               name.includes('Thakur') ? 'Bowler' :
//               name.includes('Jofra Archer') ? 'Bowler' :
//               name.includes('Tushar Deshpande') ? 'Bowler' :
//               name.includes('Prasidh') ? 'Bowler' :
//               name.includes('Siraj') ? 'Bowler' :
//               name.includes('Sai Kishore') ? 'Bowler' :
//               name.includes('Mitchell Santner') ? 'Bowling Allrounder' :
//               name.includes('Hardik Pandya') ? 'Bowling Allrounder' :
//               name.includes('Deepak Chahar') ? 'Bowler' :
//               name.includes('Jasprit Bumrah') ? 'Bowler' :
//               name.includes('Krunal Pandya') ? 'Bowling Allrounder' :
//               name.includes('Marco Jansen') ? 'Bowling Allrounder' :
//               name.includes('Chahal') ? 'Bowler' :
//               name.includes('Arshdeep Singh') ? 'Bowler' :
//               name.includes('Harpreet Brar') ? 'Bowler' :
//               name.includes('Suyash Sharma') ? 'Bowler' :
//               'Batsman'
//       };
//     };

//     if (matchId === "115183") {
//       const players = [
//         findPlayer("Pooran"),
//         findPlayer("Ayush Badoni"),
//         findPlayer("Yashasvi Jaiswal-Vc"),
//         findPlayer("Vaibhav Suryavanshi"),
//         findPlayer("Markram-Captain-C"),
//         findPlayer("W Hasaranga"),
//         findPlayer("Riyan Parag"),
//         findPlayer("Avesh Khan"),
//         findPlayer("Thakur"),
//         findPlayer("Jofra Archer"),
//         findPlayer("Tushar Deshpande")
//       ];

//       const captain = players.find(p => p.name.includes("Markram")) || players[0];
//       const viceCaptain = players.find(p => p.name.includes("Jaiswal")) || players[1];

//       return {
//         id: Date.now(),
//         players: players.sort((a, b) => getRoleOrder(a.role) - getRoleOrder(b.role)),
//         captain,
//         viceCaptain,
//         substitutes: [],
//         teamName: "Predefined Team 1",
//         team1ShortName: team1.shortName || 'T1',
//         team2ShortName: team2.shortName || 'T2',
//         riskLevel,
//         matchId,
//         matchName: `${team1.name} vs ${team2.name}`,
//         createdAt: new Date().toISOString(),
//         changes: 0,
//         hadChanges: false,
//         userId: user?.id || '',
//         userEmail: user?.primaryEmailAddress?.emailAddress || '',
//         team1Logo: team1.logo || '/fallback-team.png',
//         team2Logo: team2.logo || '/fallback-team.png',
//         team1Count: players.filter(p => p.teamShortName === team1.shortName).length,
//         team2Count: players.filter(p => p.teamShortName === team2.shortName).length,
//         wkCount: players.filter(p => normalizeRole(p.role) === 'WK-Batsman').length,
//         batCount: players.filter(p => 
//           ['Batsman', 'Batting Allrounder'].includes(normalizeRole(p.role))
//         ).length,
//         arCount: players.filter(p => normalizeRole(p.role) === 'Bowling Allrounder').length,
//         bowlCount: players.filter(p => normalizeRole(p.role) === 'Bowler').length,
//         teamComposition: {
//           'WK-Batsman': players.filter(p => normalizeRole(p.role) === 'WK-Batsman').length,
//           'Batsman': players.filter(p => normalizeRole(p.role) === 'Batsman').length,
//           'Batting Allrounder': players.filter(p => normalizeRole(p.role) === 'Batting Allrounder').length,
//           'Bowling Allrounder': players.filter(p => normalizeRole(p.role) === 'Bowling Allrounder').length,
//           'Bowler': players.filter(p => normalizeRole(p.role) === 'Bowler').length,
//           [team1.shortName || 'T1']: players.filter(p => p.teamShortName === team1.shortName).length,
//           [team2.shortName || 'T2']: players.filter(p => p.teamShortName === team2.shortName).length,
//           overseas: players.filter(p => p.isOverseas).length,
//           totalScore: players.reduce((sum, p) => sum + (p.selectedBy || 0), 0)
//         }
//       };
//     }

//     if (matchId === "115176") {
//       const players = [
//         findPlayer("Jos Buttler-C"),
//         findPlayer("Rahul"),
//         findPlayer("Karun Nair"),
//         findPlayer("Sherfane Rutherford"),
//         findPlayer("Ashutosh Sharma"),
//         findPlayer("Sai Sudharsan"),
//         findPlayer("Stubbs"),
//         findPlayer("Axar"),
//         findPlayer("Prasidh-VC"),
//         findPlayer("Siraj"),
//         findPlayer("Sai Kishore")
//       ];

//       const captain = players.find(p => p.name.includes("Buttler")) || players[0];
//       const viceCaptain = players.find(p => p.name.includes("Prasidh")) || players[1];

//       return {
//         id: Date.now(),
//         players: players.sort((a, b) => getRoleOrder(a.role) - getRoleOrder(b.role)),
//         captain,
//         viceCaptain,
//         substitutes: [],
//         teamName: "Predefined Team 2",
//         team1ShortName: team1.shortName || 'T1',
//         team2ShortName: team2.shortName || 'T2',
//         riskLevel,
//         matchId,
//         matchName: `${team1.name} vs ${team2.name}`,
//         createdAt: new Date().toISOString(),
//         changes: 0,
//         hadChanges: false,
//         userId: user?.id || '',
//         userEmail: user?.primaryEmailAddress?.emailAddress || '',
//         team1Logo: team1.logo || '/fallback-team.png',
//         team2Logo: team2.logo || '/fallback-team.png',
//         team1Count: players.filter(p => p.teamShortName === team1.shortName).length,
//         team2Count: players.filter(p => p.teamShortName === team2.shortName).length,
//         wkCount: players.filter(p => normalizeRole(p.role) === 'WK-Batsman').length,
//         batCount: players.filter(p => 
//           ['Batsman', 'Batting Allrounder'].includes(normalizeRole(p.role))
//         ).length,
//         arCount: players.filter(p => normalizeRole(p.role) === 'Bowling Allrounder').length,
//         bowlCount: players.filter(p => normalizeRole(p.role) === 'Bowler').length,
//         teamComposition: {
//           'WK-Batsman': players.filter(p => normalizeRole(p.role) === 'WK-Batsman').length,
//           'Batsman': players.filter(p => normalizeRole(p.role) === 'Batsman').length,
//           'Batting Allrounder': players.filter(p => normalizeRole(p.role) === 'Batting Allrounder').length,
//           'Bowling Allrounder': players.filter(p => normalizeRole(p.role) === 'Bowling Allrounder').length,
//           'Bowler': players.filter(p => normalizeRole(p.role) === 'Bowler').length,
//           [team1.shortName || 'T1']: players.filter(p => p.teamShortName === team1.shortName).length,
//           [team2.shortName || 'T2']: players.filter(p => p.teamShortName === team2.shortName).length,
//           overseas: players.filter(p => p.isOverseas).length,
//           totalScore: players.reduce((sum, p) => sum + (p.selectedBy || 0), 0)
//         }
//       };
//     }

//     if (matchId === "115201") {
//       const players = [
//         findPlayer("Suryakumar Yadav-C"),
//         findPlayer("Rohit Sharma-Vc"),
//         findPlayer("Shivam Dube"),
//         findPlayer("Shaik Rasheed"),
//         findPlayer("Ryan Rickelton"),
//         findPlayer("Ravindra Jadeja"),
//         findPlayer("Mitchell Santner"),
//         findPlayer("Hardik Pandya"),
//         findPlayer("Ayush Mhatre"),
//         findPlayer("Deepak Chahar"),
//         findPlayer("Jasprit Bumrah")
//       ];

//       const captain = players.find(p => p.name.includes("Suryakumar")) || players[0];
//       const viceCaptain = players.find(p => p.name.includes("Rohit")) || players[1];

//       return {
//         id: Date.now(),
//         players: players.sort((a, b) => getRoleOrder(a.role) - getRoleOrder(b.role)),
//         captain,
//         viceCaptain,
//         substitutes: [],
//         teamName: "Predefined Team 3",
//         team1ShortName: team1.shortName || 'T1',
//         team2ShortName: team2.shortName || 'T2',
//         riskLevel,
//         matchId,
//         matchName: `${team1.name} vs ${team2.name}`,
//         createdAt: new Date().toISOString(),
//         changes: 0,
//         hadChanges: false,
//         userId: user?.id || '',
//         userEmail: user?.primaryEmailAddress?.emailAddress || '',
//         team1Logo: team1.logo || '/fallback-team.png',
//         team2Logo: team2.logo || '/fallback-team.png',
//         team1Count: players.filter(p => p.teamShortName === team1.shortName).length,
//         team2Count: players.filter(p => p.teamShortName === team2.shortName).length,
//         wkCount: players.filter(p => normalizeRole(p.role) === 'WK-Batsman').length,
//         batCount: players.filter(p => 
//           ['Batsman', 'Batting Allrounder'].includes(normalizeRole(p.role))
//         ).length,
//         arCount: players.filter(p => normalizeRole(p.role) === 'Bowling Allrounder').length,
//         bowlCount: players.filter(p => normalizeRole(p.role) === 'Bowler').length,
//         teamComposition: {
//           'WK-Batsman': players.filter(p => normalizeRole(p.role) === 'WK-Batsman').length,
//           'Batsman': players.filter(p => normalizeRole(p.role) === 'Batsman').length,
//           'Batting Allrounder': players.filter(p => normalizeRole(p.role) === 'Batting Allrounder').length,
//           'Bowling Allrounder': players.filter(p => normalizeRole(p.role) === 'Bowling Allrounder').length,
//           'Bowler': players.filter(p => normalizeRole(p.role) === 'Bowler').length,
//           [team1.shortName || 'T1']: players.filter(p => p.teamShortName === team1.shortName).length,
//           [team2.shortName || 'T2']: players.filter(p => p.teamShortName === team2.shortName).length,
//           overseas: players.filter(p => p.isOverseas).length,
//           totalScore: players.reduce((sum, p) => sum + (p.selectedBy || 0), 0)
//         }
//       };
//     }

//     if (matchId === "115192") {
//       const players = [
//         findPlayer("Josh Inglis"),
//         findPlayer("Prabhsimran"),
//         findPlayer("Kohli - C"),
//         findPlayer("Padikkal"),
//         findPlayer("Priyansh Arya"),
//         findPlayer("Krunal Pandya-Vc"),
//         findPlayer("Marco Jansen"),
//         findPlayer("Chahal"),
//         findPlayer("Arshdeep Singh"),
//         findPlayer("Harpreet Brar"),
//         findPlayer("Suyash Sharma")
//       ];

//       const captain = players.find(p => p.name.includes("Kohli")) || players[0];
//       const viceCaptain = players.find(p => p.name.includes("Krunal")) || players[1];

//       return {
//         id: Date.now(),
//         players: players.sort((a, b) => getRoleOrder(a.role) - getRoleOrder(b.role)),
//         captain,
//         viceCaptain,
//         substitutes: [],
//         teamName: "Predefined Team 4",
//         team1ShortName: team1.shortName || 'T1',
//         team2ShortName: team2.shortName || 'T2',
//         riskLevel,
//         matchId,
//         matchName: `${team1.name} vs ${team2.name}`,
//         createdAt: new Date().toISOString(),
//         changes: 0,
//         hadChanges: false,
//         userId: user?.id || '',
//         userEmail: user?.primaryEmailAddress?.emailAddress || '',
//         team1Logo: team1.logo || '/fallback-team.png',
//         team2Logo: team2.logo || '/fallback-team.png',
//         team1Count: players.filter(p => p.teamShortName === team1.shortName).length,
//         team2Count: players.filter(p => p.teamShortName === team2.shortName).length,
//         wkCount: players.filter(p => normalizeRole(p.role) === 'WK-Batsman').length,
//         batCount: players.filter(p => 
//           ['Batsman', 'Batting Allrounder'].includes(normalizeRole(p.role))
//         ).length,
//         arCount: players.filter(p => normalizeRole(p.role) === 'Bowling Allrounder').length,
//         bowlCount: players.filter(p => normalizeRole(p.role) === 'Bowler').length,
//         teamComposition: {
//           'WK-Batsman': players.filter(p => normalizeRole(p.role) === 'WK-Batsman').length,
//           'Batsman': players.filter(p => normalizeRole(p.role) === 'Batsman').length,
//           'Batting Allrounder': players.filter(p => normalizeRole(p.role) === 'Batting Allrounder').length,
//           'Bowling Allrounder': players.filter(p => normalizeRole(p.role) === 'Bowling Allrounder').length,
//           'Bowler': players.filter(p => normalizeRole(p.role) === 'Bowler').length,
//           [team1.shortName || 'T1']: players.filter(p => p.teamShortName === team1.shortName).length,
//           [team2.shortName || 'T2']: players.filter(p => p.teamShortName === team2.shortName).length,
//           overseas: players.filter(p => p.isOverseas).length,
//           totalScore: players.reduce((sum, p) => sum + (p.selectedBy || 0), 0)
//         }
//       };
//     }

  
//     return null;
//   };

//   const calculatePlayerScore = (player: PlayerDetail, forCaptaincy = false): number => {
//     const baseScore = forCaptaincy ? player.selCapPerc : player.selectedBy;
//     let riskFactor = 1;
    
//     if (riskLevel < 20) riskFactor = 1 + (Math.random() * 0.1);
//     else if (riskLevel < 40) riskFactor = 0.9 + (Math.random() * 0.2);
//     else if (riskLevel < 60) riskFactor = 0.8 + (Math.random() * 0.4);
//     else if (riskLevel < 80) riskFactor = 0.6 + (Math.random() * 0.6);
//     else riskFactor = 0.4 + (Math.random() * 0.8);
    
//     return (baseScore ?? 0) * riskFactor;
//   };

//   const weightedRandomPick = (
//     players: PlayerDetail[], 
//     field: 'selectedBy' | 'selCapPerc' | 'selVcPerc'
//   ): PlayerDetail => {
//     const totalWeight = players.reduce((sum, p) => sum + (p[field] || 0.1), 0);
//     let random = Math.random() * totalWeight;
    
//     for (const player of players) {
//       random -= player[field] || 0.1;
//       if (random <= 0) return player;
//     }
//     return players[0];
//   };

//   const selectPlayerByRisk = (players: PlayerDetail[], risk: number): PlayerDetail | null => {
//     if (players.length === 0) return null;
    
//     const sorted = [...players].sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0));
//     const safeRandomIndex = (max: number) => Math.min(Math.floor(Math.random() * max), sorted.length - 1);
    
//     if (risk < 20) {
//       return sorted[safeRandomIndex(Math.max(1, Math.ceil(sorted.length * 0.3)))];
//     } else if (risk < 40) {
//       return weightedRandomPick(sorted.slice(0, Math.max(1, Math.ceil(sorted.length * 0.4))), 'selectedBy');
//     } else if (risk < 60) {
//       return Math.random() > 0.7 
//         ? sorted[safeRandomIndex(sorted.length)]
//         : weightedRandomPick(sorted.slice(0, Math.max(1, Math.ceil(sorted.length * 0.6))), 'selectedBy');
//     } else if (risk < 80) {
//       return Math.random() > 0.5 
//         ? weightedRandomPick(sorted, 'selectedBy')
//         : sorted[safeRandomIndex(sorted.length)];
//     } else {
//       return sorted[safeRandomIndex(sorted.length)];
//     }
//   };

//   const selectCaptainAndViceCaptain = (
//     players: PlayerDetail[],
//     risk: number,
//     existingTeams: GeneratedTeam[] = []
//   ): { captain: PlayerDetail; viceCaptain: PlayerDetail } => {
//     const topPlayers = players.slice(0, Math.ceil(players.length * 0.3));
//     let attempts = 0;
//     const MAX_ATTEMPTS = 20;
    
//     const recentCombinations = existingTeams.slice(0, 5).map(t => 
//       `${t.captain.id}-${t.viceCaptain.id}`
//     );

//     while (attempts < MAX_ATTEMPTS) {
//       attempts++;
      
//       let captain: PlayerDetail;
//       let viceCaptain: PlayerDetail;

//       if (risk < 20) {
//         captain = topPlayers[0];
//         viceCaptain = topPlayers.find(p => p.id !== captain.id) || topPlayers[1] || topPlayers[0];
//       } else if (risk < 40) {
//         captain = topPlayers[0];
//         viceCaptain = topPlayers.find(p => 
//           p.id !== captain.id && 
//           normalizeRole(p.role) !== normalizeRole(captain.role)
//         ) || topPlayers.find(p => p.id !== captain.id) || topPlayers[1] || topPlayers[0];
//       } else if (risk < 60) {
//         captain = topPlayers[Math.floor(Math.random() * Math.min(3, topPlayers.length))];
//         viceCaptain = topPlayers.slice(0, 5).find(p => 
//           p.id !== captain.id && 
//           normalizeRole(p.role) !== normalizeRole(captain.role)
//         ) || topPlayers.find(p => p.id !== captain.id) || topPlayers[1] || topPlayers[0];
//       } else if (risk < 80) {
//         captain = topPlayers[Math.floor(Math.random() * Math.min(5, topPlayers.length))];
//         viceCaptain = topPlayers.find(p => 
//           p.id !== captain.id && 
//           Math.random() > 0.3
//         ) || topPlayers.find(p => p.id !== captain.id) || topPlayers[0];
//       } else {
//         captain = topPlayers[Math.floor(Math.random() * topPlayers.length)];
//         viceCaptain = topPlayers.find(p => p.id !== captain.id) || topPlayers[0];
//       }

//       if (captain.id === viceCaptain.id) {
//         viceCaptain = topPlayers.find(p => p.id !== captain.id) || {
//           ...defaultPlayer,
//           id: -1 * Date.now()
//         };
//       }

//       const comboKey = `${captain.id}-${viceCaptain.id}`;
      
//       if (!recentCombinations.includes(comboKey) || attempts >= MAX_ATTEMPTS - 5) {
//         return { captain, viceCaptain };
//       }
//     }

//     const captain = topPlayers[0];
//     const viceCaptain = topPlayers.find(p => p.id !== captain.id) || {
//       ...defaultPlayer,
//       id: -1 * Date.now()
//     };
    
//     return { 
//       captain, 
//       viceCaptain
//     };
//   };

//   const createBalancedTeam = useCallback((
//     players: PlayerDetail[], 
//     existingTeamCount: number,
//     existingTeams: GeneratedTeam[] = []
//   ): GeneratedTeam | null => {
//     // Check for predefined team first
//     const predefinedTeam = getPredefinedTeam();
//     if (predefinedTeam) return predefinedTeam;

//     if (!team1 || !team2) return null;
    
//     const MAX_ATTEMPTS = 200;
//     const team1Short = team1.shortName || 'T1';
//     const team2Short = team2.shortName || 'T2';
    
//     const teamRatio = riskLevel > 50 ? 
//       { main: 7, secondary: 4 } : 
//       { 
//         main: 5 + Math.floor(Math.random() * 3),
//         secondary: 11 - (5 + Math.floor(Math.random() * 3))
//       };
  
//     const uniquePlayers = players.reduce((acc: PlayerDetail[], player) => {
//       if (!acc.some(p => p.id === player.id)) {
//         acc.push(player);
//       }
//       return acc;
//     }, []);
  
//     const availablePlayers = uniquePlayers.filter(p => p.isPlaying);
    
//     if (availablePlayers.length < 11) {
//       setError(`Not enough available players (${availablePlayers.length}/11)`);
//       return null;
//     }
  
//     const sortedPlayers = [...availablePlayers].sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0));
  
//     let attempts = 0;
//     while (attempts < MAX_ATTEMPTS) {
//       attempts++;
      
//       const mainTeam = Math.random() > 0.5 ? team1Short : team2Short;
//       const secondaryTeam = mainTeam === team1Short ? team2Short : team1Short;
      
//       const teamComposition: Record<string, number> = {
//         'WK-Batsman': 0,
//         'Batsman': 0,
//         'Batting Allrounder': 0,
//         'Bowling Allrounder': 0,
//         'Bowler': 0,
//         [team1Short]: 0,
//         [team2Short]: 0,
//         overseas: 0,
//         totalScore: 0
//       };
  
//       const { captain, viceCaptain } = selectCaptainAndViceCaptain(
//         sortedPlayers, 
//         riskLevel,
//         existingTeams
//       );
      
//       if (!captain || !viceCaptain || captain.id === viceCaptain.id) continue;
  
//       const teamPlayers: PlayerDetail[] = [captain, viceCaptain];
      
//       [captain, viceCaptain].forEach(player => {
//         const role = normalizeRole(player.role);
//         teamComposition[role]++;
//         teamComposition[player.teamShortName === team1Short ? team1Short : team2Short]++;
//         if (player.isOverseas) teamComposition.overseas++;
//         teamComposition.totalScore += calculatePlayerScore(player);
//       });
  
//       const remainingPlayers = sortedPlayers.filter(p => 
//         !teamPlayers.some(tp => tp.id === p.id) &&
//         p.id !== captain.id && 
//         p.id !== viceCaptain.id
//       );
  
//       const roleRequirements = [
//         { role: 'WK-Batsman', min: 1, max: 4 },
//         { role: 'Batsman', min: 2, max: 6 },
//         { role: 'Batting Allrounder', min: 0, max: 4 },
//         { role: 'Bowling Allrounder', min: 0, max: 4 },
//         { role: 'Bowler', min: 3, max: 6 }
//       ];
  
//       const bowlingRoles = ['Bowler', 'Bowling Allrounder'];
      
//       for (const req of roleRequirements.filter(r => r.min > 0)) {
//         while (teamComposition[req.role] < req.min && remainingPlayers.length > 0) {
//           let candidates = remainingPlayers.filter(p => 
//             normalizeRole(p.role) === req.role
//           );
          
//           if (req.role === 'Bowler' && candidates.length === 0) {
//             candidates = remainingPlayers.filter(p => 
//               bowlingRoles.includes(normalizeRole(p.role))
//             );
//           }
          
//           if (candidates.length === 0) {
//             candidates = remainingPlayers.filter(p => 
//               normalizeRole(p.role) === req.role ||
//               (req.role === 'Bowler' && bowlingRoles.includes(normalizeRole(p.role)))
//             );
//           }
          
//           if (candidates.length === 0) break;
          
//           const player = selectPlayerByRisk(candidates, riskLevel);
//           if (!player) break;
  
//           teamPlayers.push(player);
//           const role = normalizeRole(player.role);
//           teamComposition[role]++;
//           teamComposition[player.teamShortName === team1Short ? team1Short : team2Short]++;
//           if (player.isOverseas) teamComposition.overseas++;
//           teamComposition.totalScore += calculatePlayerScore(player);
          
//           remainingPlayers.splice(remainingPlayers.findIndex(p => p.id === player.id), 1);
//         }
//       }
  
//       while (teamPlayers.length < 11 && remainingPlayers.length > 0) {
//         const mainTeamCount = teamComposition[mainTeam];
//         const secondaryTeamCount = teamComposition[secondaryTeam];
        
//         let candidates = remainingPlayers;
        
//         if (riskLevel > 50) {
//           if (mainTeamCount >= 7) {
//             candidates = candidates.filter(p => p.teamShortName === secondaryTeam);
//           } else if (secondaryTeamCount >= 4) {
//             candidates = candidates.filter(p => p.teamShortName === mainTeam);
//           }
//         } else {
//           if (mainTeamCount >= teamRatio.main) {
//             candidates = candidates.filter(p => p.teamShortName === secondaryTeam);
//           } else if (secondaryTeamCount >= teamRatio.secondary) {
//             candidates = candidates.filter(p => p.teamShortName === mainTeam);
//           }
//         }
        
//         if (candidates.length === 0) {
//           candidates = remainingPlayers;
//         }
        
//         candidates = candidates.filter(p => {
//           const role = normalizeRole(p.role);
//           const req = roleRequirements.find(r => r.role === role);
//           return req ? teamComposition[role] < req.max : true;
//         });
        
//         if (candidates.length === 0) {
//           candidates = remainingPlayers;
//         }
        
//         if (candidates.length === 0) break;
        
//         const player = selectPlayerByRisk(candidates, riskLevel);
//         if (!player) break;
  
//         const role = normalizeRole(player.role);
//         teamPlayers.push(player);
//         teamComposition[role]++;
//         teamComposition[player.teamShortName === team1Short ? team1Short : team2Short]++;
//         if (player.isOverseas) teamComposition.overseas++;
//         teamComposition.totalScore += calculatePlayerScore(player);
        
//         remainingPlayers.splice(remainingPlayers.findIndex(p => p.id === player.id), 1);
//       }
  
//       if (teamPlayers.length === 11) {
//         const playerIds = new Set(teamPlayers.map(p => p.id));
//         if (playerIds.size !== 11) continue;
  
//         const wkCount = teamComposition['WK-Batsman'];
//         const bowlerCount = teamComposition['Bowler'] + teamComposition['Bowling Allrounder'];
        
//         if (wkCount < 1 || bowlerCount < 3) {
//           continue;
//         }
  
//         const allAvailablePlayers = uniquePlayers.filter(p => !teamPlayers.some(tp => tp.id === p.id));
        
//         const substitutes = [...allAvailablePlayers]
//           .sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0))
//           .slice(0, 4);
  
//         return {
//           id: Date.now(),
//           players: [...teamPlayers].sort((a, b) => (getRoleOrder(a.role) - (getRoleOrder(b.role)))),
//           captain,
//           viceCaptain,
//           substitutes,
//           teamName: `Team ${existingTeamCount + 1}`,
//           team1ShortName: team1Short,
//           team2ShortName: team2Short,
//           riskLevel,
//           matchId,
//           matchName: `${team1.name} vs ${team2.name}`,
//           createdAt: new Date().toISOString(),
//           changes: 0,
//           hadChanges: false,
//           userId: user?.id || '',
//           userEmail: user?.primaryEmailAddress?.emailAddress || '',
//           team1Logo: team1.logo || '/fallback-team.png',
//           team2Logo: team2.logo || '/fallback-team.png',
//           team1Count: teamComposition[team1Short],
//           team2Count: teamComposition[team2Short],
//           wkCount: teamComposition['WK-Batsman'],
//           batCount: teamComposition['Batsman'] + teamComposition['Batting Allrounder'],
//           arCount: teamComposition['Bowling Allrounder'],
//           bowlCount: teamComposition['Bowler'],
//           teamComposition
//         };
//       }
//     }
  
//     console.error(`Team generation failed after ${MAX_ATTEMPTS} attempts`);
//     setError(`Failed to generate valid team after ${MAX_ATTEMPTS} attempts. Try adjusting risk level.`);
//     return null;
//   }, [team1, team2, riskLevel, matchId, user]);

//   const getPlayerPool = useCallback((): PlayerDetail[] => {
//     if (!team1 || !team2) return [];
    
//     const team1Players = team1.playerDetails || [];
//     const team2Players = team2.playerDetails || [];
    
//     const allPlayers = [...team1Players, ...team2Players].map(p => ({
//       ...p,
//       selectedBy: p.selectedBy || 0,
//       selCapPerc: p.selCapPerc || 0,
//       selVcPerc: p.selVcPerc || 0,
//       isPlaying: !p.substitute
//     }));

//     const wkPlayers = allPlayers.filter(p => normalizeRole(p.role) === 'WK-Batsman');
//     const batPlayers = allPlayers.filter(p => 
//       ['Batsman', 'Batting Allrounder'].includes(normalizeRole(p.role))
//     );
//     const bowlPlayers = allPlayers.filter(p => 
//       ['Bowler', 'Bowling Allrounder'].includes(normalizeRole(p.role))
//     );
//     const allPlayersCount = allPlayers.filter(p => 
//       ['Bowling Allrounder', 'Batting Allrounder'].includes(normalizeRole(p.role))
//     );

//     setRoleCounts({
//       wk: wkPlayers.length,
//       batsmen: batPlayers.length,
//       allrounders: allPlayersCount.length,
//       bowlers: bowlPlayers.length
//     });

//     return allPlayers;
//   }, [team1, team2]);

//   const getTeamCountForMatch = async (): Promise<number> => {
//     if (!user || !matchId) return 0;
    
//     try {
//       const q = query(
//         collection(db, "users", user.id, "matches", matchId, "teams"),
//         limit(MAX_TEAMS_PER_MATCH)
//       );
//       const querySnapshot = await getDocs(q);
//       return querySnapshot.size;
//     } catch (err) {
//       console.error("Failed to count teams:", err);
//       return 0;
//     }
//   };

//   const saveTeamToFirestore = async (team: GeneratedTeam): Promise<string | null> => {
//     if (!user || !matchId) return null;
    
//     try {
//       const teamData = {
//         ...team,
//         userId: user.id,
//         userEmail: user.primaryEmailAddress?.emailAddress || ''
//       };

//       const matchTeamsRef = collection(db, "users", user.id, "matches", matchId, "teams");
//       const teamRef = doc(matchTeamsRef);
      
//       await setDoc(teamRef, teamData);
//       return teamRef.id;
//     } catch (err) {
//       console.error("Failed to save team:", err);
//       throw err;
//     }
//   };

//   const fetchSavedTeams = useCallback(async (): Promise<GeneratedTeam[]> => {
//     if (!user || !matchId) return [];
    
//     try {
//       const q = query(
//         collection(db, "users", user.id, "matches", matchId, "teams"),
//         orderBy("createdAt", "desc"),
//         limit(MAX_TEAMS_PER_MATCH)
//       );
//       const querySnapshot = await getDocs(q);
//       return querySnapshot.docs.map(doc => ({
//         ...doc.data() as GeneratedTeam,
//         id: doc.id
//       }));
//     } catch (err) {
//       console.error("Failed to fetch saved teams:", err);
//       return [];
//     }
//   }, [user, matchId]);

//   useEffect(() => {
//     const loadTeams = async () => {
//       if (!matchId || !user?.id) return;
      
//       try {
//         const savedTeams = localStorage.getItem(localStorageKey);
//         if (savedTeams) {
//           setGeneratedTeams(JSON.parse(savedTeams));
//           return;
//         }

//         const teams = await fetchSavedTeams();
//         if (teams.length > 0) {
//           setGeneratedTeams(teams);
//           localStorage.setItem(localStorageKey, JSON.stringify(teams));
//           showTeamCountMessage(teams.length);
//         }
//       } catch (err) {
//         console.error("Failed to load teams:", err);
//       }
//     };

//     loadTeams();
//   }, [localStorageKey, matchId, user?.id, fetchSavedTeams]);

//   const handleGenerateTeams = useCallback(async () => {
//     if (!team1 || !team2) {
//       setError("Select both teams first");
//       return;
//     }

//     if (!user) {
//       setError("Please sign in to generate teams");
//       return;
//     }

//     // Check for predefined team first
//     const predefinedTeam = getPredefinedTeam();
//     if (predefinedTeam) {
//       setIsGenerating(true);
//       try {
//         const teamId = await saveTeamToFirestore(predefinedTeam);
//         const newTeam = { ...predefinedTeam, id: teamId || Date.now().toString() };
//         const updatedTeams = [newTeam, ...generatedTeams];
//         setGeneratedTeams(updatedTeams);
//         localStorage.setItem(localStorageKey, JSON.stringify(updatedTeams));
//         onBalanceUpdate(userBalance - 100);
//         showTeamCountMessage(updatedTeams.length);
//         return;
//       } catch (err) {
//         setError("Failed to save predefined team");
//       } finally {
//         setIsGenerating(false);
//       }
//     }

//     const currentTeamCount = await getTeamCountForMatch();
//     if (currentTeamCount >= MAX_TEAMS_PER_MATCH) {
//       setError(`You've reached the maximum of ${MAX_TEAMS_PER_MATCH} teams for this match`);
//       return;
//     }

//     const remainingTeamSlots = MAX_TEAMS_PER_MATCH - currentTeamCount;
//     const teamsToGenerate = Math.min(teamCount, remainingTeamSlots);

//     if (teamsToGenerate <= 0) {
//       setError(`You've reached the maximum of ${MAX_TEAMS_PER_MATCH} teams for this match`);
//       return;
//     }

//     if (needsPayment) {
//       setShowPaymentDialog(true);
//       return;
//     }

//     const allPlayers = getPlayerPool();
//     if (allPlayers.length < 11) {
//       setError(`Not enough players (${allPlayers.length}/11). Please check your filters.`);
//       return;
//     }

//     setIsGenerating(true);
//     setError(null);

//     try {
//       await runTransaction(db, async (transaction) => {
//         const userRef = doc(db, "users", user.id);
//         const userDoc = await transaction.get(userRef);
        
//         if (!userDoc.exists()) throw new Error("User not found");
//         if ((userDoc.data().credits || 0) < requiredCredits) {
//           throw new Error("Insufficient balance");
//         }
        
//         transaction.update(userRef, {
//           credits: increment(-requiredCredits)
//         });
//       });

//       const newTeams: GeneratedTeam[] = [];
//       const TOTAL_ATTEMPTS = teamsToGenerate * 100;
//       let attempts = 0;

//       while (newTeams.length < teamsToGenerate && attempts < TOTAL_ATTEMPTS) {
//         attempts++;
//         const team = createBalancedTeam(allPlayers, currentTeamCount + newTeams.length, newTeams);
        
//         if (team) {
//           const isUnique = newTeams.every(existingTeam => {
//             const existingPlayers = existingTeam.players.map(p => p.id).sort();
//             const newPlayers = team.players.map(p => p.id).sort();
//             const diffCount = existingPlayers.filter(id => !newPlayers.includes(id)).length;
//             return diffCount >= 3;
//           });

//           if (isUnique || newTeams.length === 0) {
//             const teamId = await saveTeamToFirestore(team);
//             newTeams.push({ ...team, id: teamId || Date.now().toString() });
//           }
//         }
//       }

//       if (newTeams.length === 0) {
//         const actualCounts = {
//           wk: allPlayers.filter(p => normalizeRole(p.role) === 'WK-Batsman').length,
//           batsmen: allPlayers.filter(p => 
//             ['Batsman', 'Batting Allrounder'].includes(normalizeRole(p.role))
//           ).length,
//           allrounders: allPlayers.filter(p => 
//             ['Bowling Allrounder', 'Batting Allrounder'].includes(normalizeRole(p.role))
//           ).length,
//           bowlers: allPlayers.filter(p => 
//             ['Bowler', 'Bowling Allrounder'].includes(normalizeRole(p.role))
//           ).length
//         };

//         throw new Error(
//           `Failed to generate valid teams after ${TOTAL_ATTEMPTS} attempts.\n` +
//           `Player counts: WK: ${actualCounts.wk}, Batsmen: ${actualCounts.batsmen}, ` +
//           `Allrounders: ${actualCounts.allrounders}, Bowlers: ${actualCounts.bowlers}`
//         );
//       }

//       const updatedTeams = [...newTeams, ...generatedTeams];
//       setGeneratedTeams(updatedTeams);
//       localStorage.setItem(localStorageKey, JSON.stringify(updatedTeams));
//       onBalanceUpdate(userBalance - requiredCredits);

//       const updatedTeamCount = currentTeamCount + newTeams.length;
//       showTeamCountMessage(updatedTeamCount);

//     } catch (err: any) {
//       setError(err.message || "Failed to generate teams");
//     } finally {
//       setIsGenerating(false);
//     }
//   }, [
//     team1, team2, teamCount, riskLevel, user, 
//     userBalance, requiredCredits, needsPayment, 
//     onBalanceUpdate, createBalancedTeam, matchId,
//     fetchSavedTeams, getPlayerPool, generatedTeams,
//     localStorageKey, roleCounts, getTeamCountForMatch,
//     saveTeamToFirestore, getPredefinedTeam
//   ]);

//   const checkLineupChanges = useCallback(async () => {
//     if (!user?.id || !matchId) return;
    
//     try {
//       const savedTeams = localStorage.getItem(localStorageKey);
//       if (!savedTeams) return;
      
//       const teams: GeneratedTeam[] = JSON.parse(savedTeams);
//       const updatedTeams: GeneratedTeam[] = [];
      
//       for (const team of teams) {
//         const playersWithStatus = team.players.map(player => ({
//           ...player,
//           isNowSubstitute: Math.random() < 0.1
//         }));
        
//         const nonPlayingPlayers = playersWithStatus.filter(p => p.isNowSubstitute);
//         if (nonPlayingPlayers.length === 0) {
//           updatedTeams.push(team);
//           continue;
//         }
        
//         const playingPlayers = playersWithStatus.filter(p => !p.isNowSubstitute);
//         const availableSubstitutes = team.substitutes?.filter(sub => 
//           !playingPlayers.some(p => p.id === sub.id)
//         ) || [];
        
//         let newPlayers = [...playingPlayers];
        
//         for (const nonPlayer of nonPlayingPlayers) {
//           const replacement = availableSubstitutes.find(sub => 
//             normalizeRole(sub.role) === normalizeRole(nonPlayer.role)
//           );
          
//           if (replacement) {
//             const fixedReplacement = {
//               ...replacement,
//               isNowSubstitute: replacement.isNowSubstitute === undefined ? false : replacement.isNowSubstitute,
//             };
          
//             newPlayers.push(fixedReplacement);
//             availableSubstitutes.splice(availableSubstitutes.indexOf(replacement), 1);
//           } else {
//             const fixedNonPlayer = {
//               ...nonPlayer,
//               isNowSubstitute: nonPlayer.isNowSubstitute === undefined ? false : nonPlayer.isNowSubstitute,
//             };
          
//             newPlayers.push(fixedNonPlayer);
//           }
//         }
        
//         updatedTeams.push({
//           ...team,
//           players: newPlayers,
//           captain: newPlayers.find(p => p.id === team.captain.id) || team.captain,
//           viceCaptain: newPlayers.find(p => p.id === team.viceCaptain.id) || team.viceCaptain,
//           updatedAt: new Date().toISOString(),
//           hadChanges: nonPlayingPlayers.length > 0
//         });
//       }
      
//       localStorage.setItem(localStorageKey, JSON.stringify(updatedTeams));
//       setGeneratedTeams(updatedTeams);
      
//       if (updatedTeams.some(t => t.hadChanges)) {
//         const currentTeamCount = updatedTeams.length;
//         showTeamCountMessage(currentTeamCount);
//       }
      
//     } catch (err) {
//       console.error("Failed to check lineup changes:", err);
//     }
//   }, [user?.id, matchId, localStorageKey]);

//   const generateButton = (
//     <div className="space-y-2">
//       <button
//         onClick={handleGenerateTeams}
//         disabled={isGenerating || !team1 || !team2}
//         className={`
//           w-full px-4 py-3 rounded-md font-bold
//           ${isGenerating ? 'bg-gray-500' : 
//            needsPayment ? 'bg-yellow-500 hover:bg-yellow-600' : 
//            'bg-blue-500 hover:bg-blue-600'}
//           text-white transition-colors
//         `}
//       >
//         {isGenerating ? (
//           <span className="flex items-center justify-center gap-2">
//             <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//             </svg>
//             Generating...
//           </span>
//         ) : !team1 || !team2 ? (
//           "Select both teams"
//         ) : needsPayment ? (
//           `Add ₹${paymentAmount} to Generate team`
//         ) : (
//           `Generate ${teamCount} Teams (₹${requiredCredits})`
//         )}
//       </button>

//       <div className="flex justify-between text-sm">
//         <span>Your Credits: <span className='text-green-500'>₹{userBalance} </span> </span>
//         {needsPayment ? (
//           <span className="text-red-500">Need ₹${paymentAmount} more</span>
//         ) : (
//           <span className="text-green-500">Sufficient balance</span>
//         )}
//       </div>

//       {error && (
//         <div className="text-red-500 text-sm p-2 bg-red-50 rounded-lg">
//           <p className="font-medium">{error}</p>
//           {error.includes("Player counts") && (
//             <div className="mt-2 text-xs">
//               <p>Current player counts:</p>
//               <ul className="list-disc pl-5">
//                 <li>WK-Batsman: {roleCounts.wk} (min 1)</li>
//                 <li>Batsmen: {roleCounts.batsmen}</li>
//                 <li>Bowlers: {roleCounts.bowlers}</li>
//               </ul>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );

//   const paymentDialog = showPaymentDialog && (
//     <PaymentDialog
//       currentBalance={userBalance}
//       requiredAmount={paymentAmount}
//       onPaymentSuccess={(amount) => {
//         onBalanceUpdate(userBalance + amount);
//         setShowPaymentDialog(false);
//         handleGenerateTeams();
//       }}
//       onOpenChange={setShowPaymentDialog}
//       open={showPaymentDialog}
//       onProcessingStateChange={setIsGenerating}
//     />
//   );
//   return {
//     generatedTeams,
//     isGenerating,
//     generateButton,
//     paymentDialog,
//     error,
//     setError,
//     fetchSavedTeams,
//     setGeneratedTeams,
//     checkLineupChanges
//   };
// };































"use client";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { PaymentDialog } from "./PaymentDialog";
import { db } from "@/lib/firebase";
import { 
  doc, 
  runTransaction, 
  increment, 
  setDoc, 
  collection, 
  query, 
  orderBy, 
  getDocs,
  limit
} from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import { 
  PlayerDetail, 
  Team, 
  GeneratedTeam, 
  TeamGeneratorProps,
  TeamGeneratorReturn,
  RoleCounts
} from  "../../types/match";
 
const MAX_TEAMS_PER_MATCH = 20;
const MIN_TEAMS_FOR_GRAND_LEAGUE = 10;

export const useTeamGenerator = ({ 
  team1, 
  team2, 
  teamCount, 
  riskLevel,
  userBalance,
  onBalanceUpdate,
  matchId
}: TeamGeneratorProps): TeamGeneratorReturn => {
  const { user } = useUser();
  const [generatedTeams, setGeneratedTeams] = useState<GeneratedTeam[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roleCounts, setRoleCounts] = useState<RoleCounts>({
    wk: 0,
    batsmen: 0,
    allrounders: 0,
    bowlers: 0
  });

  const requiredCredits = useMemo(() => teamCount * 100, [teamCount]);
  const needsPayment = useMemo(() => userBalance < requiredCredits, [userBalance, requiredCredits]);
  const paymentAmount = useMemo(() => Math.max(requiredCredits - userBalance, 100), [requiredCredits, userBalance]);
  const localStorageKey = useMemo(() => `matchTeams_${matchId}_${user?.id}`, [matchId, user?.id]);

  const defaultPlayer: PlayerDetail = {
    id: 0,
    name: 'Unknown Player',
    fullName: '',
    nickName: '',
    role: 'Bowler',
    captain: false,
    keeper: false,
    isOverseas: false,
    teamName: '',
    teamShortName: '',
    imgURL: '/default-player.png',
    isPlaying: true,
    selectedBy: 0,
    selCapPerc: 0,
    selVcPerc: 0,
    points: 0,
    isNowSubstitute: false
  };

  const showTeamCountMessage = (currentTeamCount: number) => {
    const teamsNeeded = MIN_TEAMS_FOR_GRAND_LEAGUE - currentTeamCount;
    if (teamsNeeded > 0) {
      alert(`🔥 You need ${teamsNeeded} more teams to qualify for Grand League prizes!`);
    } else {
      alert('🎉 Congratulations! You have qualified for Grand League prizes!');
    }
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

  const getRoleOrder = (role: string): number => {
    const normalized = normalizeRole(role);
    switch(normalized) {
      case 'WK-Batsman': return 1;
      case 'Batsman': return 2;
      case 'Batting Allrounder': return 3;
      case 'Bowling Allrounder': return 4;
      case 'Bowler': return 5;
      default: return 6;
    }
  };

  const calculatePlayerScore = (player: PlayerDetail, forCaptaincy = false): number => {
    const baseScore = forCaptaincy ? (player.selCapPerc || player.selVcPerc || 0) : (player.selectedBy || 0);
    let riskFactor = 1;
    
    if (riskLevel < 10) riskFactor = 1 + (Math.random() * 0.05);
    else if (riskLevel < 20) riskFactor = 0.95 + (Math.random() * 0.1);
    else if (riskLevel < 30) riskFactor = 0.9 + (Math.random() * 0.15);
    else if (riskLevel < 50) riskFactor = 0.8 + (Math.random() * 0.3);
    else if (riskLevel < 70) riskFactor = 0.6 + (Math.random() * 0.5);
    else riskFactor = 0.4 + (Math.random() * 0.8);
    
    return (baseScore ?? 0) * riskFactor;
  };

  const weightedRandomPick = (
    players: PlayerDetail[], 
    field: 'selectedBy' | 'selCapPerc' | 'selVcPerc'
  ): PlayerDetail => {
    const totalWeight = players.reduce((sum, p) => sum + (p[field] || 0.1), 0);
    let random = Math.random() * totalWeight;
    
    for (const player of players) {
      random -= player[field] || 0.1;
      if (random <= 0) return player;
    }
    return players[0];
  };

  const selectPlayerByRisk = (players: PlayerDetail[], risk: number): PlayerDetail | null => {
    if (players.length === 0) return null;
    
    const sorted = [...players].sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0));
    const safeRandomIndex = (max: number) => Math.min(Math.floor(Math.random() * max), sorted.length - 1);
    
    if (risk < 10) {
      return sorted[0];
    } else if (risk < 20) {
      return sorted[safeRandomIndex(Math.max(1, Math.ceil(sorted.length * 0.1)))];
    } else if (risk < 30) {
      return sorted[safeRandomIndex(Math.max(1, Math.ceil(sorted.length * 0.2)))];
    } else if (risk < 50) {
      return weightedRandomPick(sorted.slice(0, Math.max(1, Math.ceil(sorted.length * 0.4))), 'selectedBy');
    } else if (risk < 70) {
      return Math.random() > 0.7 
        ? sorted[safeRandomIndex(sorted.length)]
        : weightedRandomPick(sorted.slice(0, Math.max(1, Math.ceil(sorted.length * 0.6))), 'selectedBy');
    } else {
      return sorted[safeRandomIndex(sorted.length)];
    }
  };

  const selectCaptainAndViceCaptain = (
    players: PlayerDetail[],
    risk: number,
    existingTeams: GeneratedTeam[] = []
  ): { captain: PlayerDetail; viceCaptain: PlayerDetail } => {
    const topPlayers = players.slice(0, Math.ceil(players.length * 0.3));
    let attempts = 0;
    const MAX_ATTEMPTS = 20;
    
    const recentCombinations = existingTeams.slice(0, 5).map(t => 
      `${t.captain.id}-${t.viceCaptain.id}`
    );

    while (attempts < MAX_ATTEMPTS) {
      attempts++;
      
      let captain: PlayerDetail;
      let viceCaptain: PlayerDetail;

      if (risk < 10) {
        captain = [...topPlayers].sort((a, b) => (b.selCapPerc || 0) - (a.selCapPerc || 0))[0];
        viceCaptain = [...topPlayers]
          .filter(p => p.id !== captain.id)
          .sort((a, b) => (b.selVcPerc || 0) - (a.selVcPerc || 0))[0] || topPlayers[1] || topPlayers[0];
      } else if (risk < 20) {
        captain = weightedRandomPick(topPlayers.slice(0, 3), 'selCapPerc');
        viceCaptain = weightedRandomPick(
          topPlayers.filter(p => p.id !== captain.id && p.role !== captain.role).slice(0, 3),
          'selVcPerc'
        ) || topPlayers.find(p => p.id !== captain.id) || topPlayers[1] || topPlayers[0];
      } else if (risk < 30) {
        captain = weightedRandomPick(topPlayers.slice(0, 5), 'selCapPerc');
        viceCaptain = weightedRandomPick(
          topPlayers.filter(p => p.id !== captain.id).slice(0, 5),
          'selVcPerc'
        ) || topPlayers.find(p => p.id !== captain.id) || topPlayers[0];
      } else if (risk < 50) {
        captain = topPlayers[Math.floor(Math.random() * Math.min(3, topPlayers.length))];
        viceCaptain = topPlayers.slice(0, 5).find(p => 
          p.id !== captain.id && 
          normalizeRole(p.role) !== normalizeRole(captain.role)
        ) || topPlayers.find(p => p.id !== captain.id) || topPlayers[1] || topPlayers[0];
      } else if (risk < 70) {
        captain = topPlayers[Math.floor(Math.random() * Math.min(5, topPlayers.length))];
        viceCaptain = topPlayers.find(p => 
          p.id !== captain.id && 
          Math.random() > 0.3
        ) || topPlayers.find(p => p.id !== captain.id) || topPlayers[0];
      } else {
        captain = topPlayers[Math.floor(Math.random() * topPlayers.length)];
        viceCaptain = topPlayers.find(p => p.id !== captain.id) || topPlayers[0];
      }

      if (captain.id === viceCaptain.id) {
        viceCaptain = topPlayers.find(p => p.id !== captain.id) || {
          ...defaultPlayer,
          id: -1 * Date.now()
        };
      }

      const comboKey = `${captain.id}-${viceCaptain.id}`;
      
      if (!recentCombinations.includes(comboKey) || attempts >= MAX_ATTEMPTS - 5) {
        return { captain, viceCaptain };
      }
    }

    const captain = topPlayers[0];
    const viceCaptain = topPlayers.find(p => p.id !== captain.id) || {
      ...defaultPlayer,
      id: -1 * Date.now()
    };
    
    return { 
      captain, 
      viceCaptain
    };
  };

  const createBalancedTeam = useCallback((
    players: PlayerDetail[], 
    existingTeamCount: number,
    existingTeams: GeneratedTeam[] = []
  ): GeneratedTeam | null => {
    if (!team1 || !team2) return null;
    
    const MAX_ATTEMPTS = 200;
    const team1Short = team1.shortName || 'T1';
    const team2Short = team2.shortName || 'T2';
    
    const teamRatio = riskLevel > 50 ? 
      { main: 7, secondary: 4 } : 
      { 
        main: 5 + Math.floor(Math.random() * 3),
        secondary: 11 - (5 + Math.floor(Math.random() * 3))
      };
  
    const availablePlayers = players.filter(p => p.isPlaying && !p.substitute);
    
    if (availablePlayers.length < 11) {
      setError(`Not enough available players (${availablePlayers.length}/11)`);
      return null;
    }
  
    const sortedPlayers = [...availablePlayers].sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0));
  
    let attempts = 0;
    while (attempts < MAX_ATTEMPTS) {
      attempts++;
      
      const mainTeam = Math.random() > 0.5 ? team1Short : team2Short;
      const secondaryTeam = mainTeam === team1Short ? team2Short : team1Short;
      
      const teamComposition: Record<string, number> = {
        'WK-Batsman': 0,
        'Batsman': 0,
        'Batting Allrounder': 0,
        'Bowling Allrounder': 0,
        'Bowler': 0,
        [team1Short]: 0,
        [team2Short]: 0,
        overseas: 0,
        totalScore: 0
      };
  
      const { captain, viceCaptain } = selectCaptainAndViceCaptain(
        sortedPlayers, 
        riskLevel,
        existingTeams
      );
      
      if (!captain || !viceCaptain || captain.id === viceCaptain.id) continue;
  
      const teamPlayers: PlayerDetail[] = [captain, viceCaptain];
      
      [captain, viceCaptain].forEach(player => {
        const role = normalizeRole(player.role);
        teamComposition[role]++;
        teamComposition[player.teamShortName === team1Short ? team1Short : team2Short]++;
        if (player.isOverseas) teamComposition.overseas++;
        teamComposition.totalScore += calculatePlayerScore(player);
      });
  
      const remainingPlayers = sortedPlayers.filter(p => 
        !teamPlayers.some(tp => tp.id === p.id) &&
        p.id !== captain.id && 
        p.id !== viceCaptain.id
      );
  
      const roleRequirements = [
        { role: 'WK-Batsman', min: 1, max: 4 },
        { role: 'Batsman', min: 2, max: 6 },
        { role: 'Batting Allrounder', min: 0, max: 4 },
        { role: 'Bowling Allrounder', min: 0, max: 4 },
        { role: 'Bowler', min: 3, max: 6 }
      ];
  
      const bowlingRoles = ['Bowler', 'Bowling Allrounder'];
      
      for (const req of roleRequirements.filter(r => r.min > 0)) {
        while (teamComposition[req.role] < req.min && remainingPlayers.length > 0) {
          let candidates = remainingPlayers.filter(p => 
            normalizeRole(p.role) === req.role
          );
          
          if (req.role === 'Bowler' && candidates.length === 0) {
            candidates = remainingPlayers.filter(p => 
              bowlingRoles.includes(normalizeRole(p.role))
            );
          }
          
          if (candidates.length === 0) {
            candidates = remainingPlayers.filter(p => 
              normalizeRole(p.role) === req.role ||
              (req.role === 'Bowler' && bowlingRoles.includes(normalizeRole(p.role)))
            );
          }
          
          if (candidates.length === 0) break;
          
          const player = selectPlayerByRisk(candidates, riskLevel);
          if (!player) break;
  
          teamPlayers.push(player);
          const role = normalizeRole(player.role);
          teamComposition[role]++;
          teamComposition[player.teamShortName === team1Short ? team1Short : team2Short]++;
          if (player.isOverseas) teamComposition.overseas++;
          teamComposition.totalScore += calculatePlayerScore(player);
          
          remainingPlayers.splice(remainingPlayers.findIndex(p => p.id === player.id), 1);
        }
      }
  
      while (teamPlayers.length < 11 && remainingPlayers.length > 0) {
        const mainTeamCount = teamComposition[mainTeam];
        const secondaryTeamCount = teamComposition[secondaryTeam];
        
        let candidates = remainingPlayers;
        
        if (riskLevel > 50) {
          if (mainTeamCount >= 7) {
            candidates = candidates.filter(p => p.teamShortName === secondaryTeam);
          } else if (secondaryTeamCount >= 4) {
            candidates = candidates.filter(p => p.teamShortName === mainTeam);
          }
        } else {
          if (mainTeamCount >= teamRatio.main) {
            candidates = candidates.filter(p => p.teamShortName === secondaryTeam);
          } else if (secondaryTeamCount >= teamRatio.secondary) {
            candidates = candidates.filter(p => p.teamShortName === mainTeam);
          }
        }
        
        if (candidates.length === 0) {
          candidates = remainingPlayers;
        }
        
        candidates = candidates.filter(p => {
          const role = normalizeRole(p.role);
          const req = roleRequirements.find(r => r.role === role);
          return req ? teamComposition[role] < req.max : true;
        });
        
        if (candidates.length === 0) {
          candidates = remainingPlayers;
        }
        
        if (candidates.length === 0) break;
        
        const player = selectPlayerByRisk(candidates, riskLevel);
        if (!player) break;
  
        const role = normalizeRole(player.role);
        teamPlayers.push(player);
        teamComposition[role]++;
        teamComposition[player.teamShortName === team1Short ? team1Short : team2Short]++;
        if (player.isOverseas) teamComposition.overseas++;
        teamComposition.totalScore += calculatePlayerScore(player);
        
        remainingPlayers.splice(remainingPlayers.findIndex(p => p.id === player.id), 1);
      }
  
      if (teamPlayers.length === 11) {
        const playerIds = new Set(teamPlayers.map(p => p.id));
        if (playerIds.size !== 11) continue;
  
        const wkCount = teamComposition['WK-Batsman'];
        const bowlerCount = teamComposition['Bowler'] + teamComposition['Bowling Allrounder'];
        
        if (wkCount < 1 || bowlerCount < 3) {
          continue;
        }
  
        const allAvailablePlayers = players.filter(p => !teamPlayers.some(tp => tp.id === p.id));
        
        const substitutes = [...allAvailablePlayers]
          .sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0))
          .slice(0, 4);
  
        return {
          id: Date.now(),
          players: [...teamPlayers].sort((a, b) => (getRoleOrder(a.role) - (getRoleOrder(b.role)))),
          captain,
          viceCaptain,
          substitutes,
          teamName: `Team ${existingTeamCount + 1}`,
          team1ShortName: team1Short,
          team2ShortName: team2Short,
          riskLevel,
          matchId,
          matchName: `${team1.name} vs ${team2.name}`,
          createdAt: new Date().toISOString(),
          changes: 0,
          hadChanges: false,
          userId: user?.id || '',
          userEmail: user?.primaryEmailAddress?.emailAddress || '',
          team1Logo: team1.logo || '/fallback-team.png',
          team2Logo: team2.logo || '/fallback-team.png',
          team1Count: teamComposition[team1Short],
          team2Count: teamComposition[team2Short],
          wkCount: teamComposition['WK-Batsman'],
          batCount: teamComposition['Batsman'] + teamComposition['Batting Allrounder'],
          arCount: teamComposition['Bowling Allrounder'],
          bowlCount: teamComposition['Bowler'],
          teamComposition
        };
      }
    }
  
    console.error(`Team generation failed after ${MAX_ATTEMPTS} attempts`);
    setError(`Failed to generate valid team after ${MAX_ATTEMPTS} attempts. Try adjusting risk level.`);
    return null;
  }, [team1, team2, riskLevel, matchId, user]);

  const getPlayerPool = useCallback((): PlayerDetail[] => {
    if (!team1 || !team2) return [];
    
    const team1Players = team1.playerDetails || [];
    const team2Players = team2.playerDetails || [];
    
    const allPlayers = [...team1Players, ...team2Players].map(p => ({
      ...p,
      selectedBy: p.selectedBy || 0,
      selCapPerc: p.selCapPerc || 0,
      selVcPerc: p.selVcPerc || 0,
      isPlaying: !p.substitute
    }));

    const wkPlayers = allPlayers.filter(p => normalizeRole(p.role) === 'WK-Batsman');
    const batPlayers = allPlayers.filter(p => 
      ['Batsman', 'Batting Allrounder'].includes(normalizeRole(p.role))
    );
    const bowlPlayers = allPlayers.filter(p => 
      ['Bowler', 'Bowling Allrounder'].includes(normalizeRole(p.role))
    );
    const allPlayersCount = allPlayers.filter(p => 
      ['Bowling Allrounder', 'Batting Allrounder'].includes(normalizeRole(p.role))
    );

    setRoleCounts({
      wk: wkPlayers.length,
      batsmen: batPlayers.length,
      allrounders: allPlayersCount.length,
      bowlers: bowlPlayers.length
    });

    return allPlayers;
  }, [team1, team2]);

  const getTeamCountForMatch = async (): Promise<number> => {
    if (!user || !matchId) return 0;
    
    try {
      const q = query(
        collection(db, "users", user.id, "matches", matchId, "teams"),
        limit(MAX_TEAMS_PER_MATCH)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.size;
    } catch (err) {
      console.error("Failed to count teams:", err);
      return 0;
    }
  };

  const saveTeamToFirestore = async (team: GeneratedTeam): Promise<string | null> => {
    if (!user || !matchId) return null;
    
    try {
      const teamData = {
        ...team,
        userId: user.id,
        userEmail: user.primaryEmailAddress?.emailAddress || ''
      };

      const matchTeamsRef = collection(db, "users", user.id, "matches", matchId, "teams");
      const teamRef = doc(matchTeamsRef);
      
      await setDoc(teamRef, teamData);
      return teamRef.id;
    } catch (err) {
      console.error("Failed to save team:", err);
      throw err;
    }
  };

  const fetchSavedTeams = useCallback(async (): Promise<GeneratedTeam[]> => {
    if (!user || !matchId) return [];
    
    try {
      const q = query(
        collection(db, "users", user.id, "matches", matchId, "teams"),
        orderBy("createdAt", "desc"),
        limit(MAX_TEAMS_PER_MATCH)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        ...doc.data() as GeneratedTeam,
        id: doc.id
      }));
    } catch (err) {
      console.error("Failed to fetch saved teams:", err);
      return [];
    }
  }, [user, matchId]);

  useEffect(() => {
    const loadTeams = async () => {
      if (!matchId || !user?.id) return;
      
      try {
        const savedTeams = localStorage.getItem(localStorageKey);
        if (savedTeams) {
          setGeneratedTeams(JSON.parse(savedTeams));
          return;
        }

        const teams = await fetchSavedTeams();
        if (teams.length > 0) {
          setGeneratedTeams(teams);
          localStorage.setItem(localStorageKey, JSON.stringify(teams));
          showTeamCountMessage(teams.length);
        }
      } catch (err) {
        console.error("Failed to load teams:", err);
      }
    };

    loadTeams();
  }, [localStorageKey, matchId, user?.id, fetchSavedTeams]);

  const handleGenerateTeams = useCallback(async () => {
    if (!team1 || !team2) {
      setError("Select both teams first");
      return;
    }

    if (!user) {
      setError("Please sign in to generate teams");
      return;
    }

    const currentTeamCount = await getTeamCountForMatch();
    if (currentTeamCount >= MAX_TEAMS_PER_MATCH) {
      setError(`You've reached the maximum of ${MAX_TEAMS_PER_MATCH} teams for this match`);
      return;
    }

    const remainingTeamSlots = MAX_TEAMS_PER_MATCH - currentTeamCount;
    const teamsToGenerate = Math.min(teamCount, remainingTeamSlots);

    if (teamsToGenerate <= 0) {
      setError(`You've reached the maximum of ${MAX_TEAMS_PER_MATCH} teams for this match`);
      return;
    }

    if (needsPayment) {
      setShowPaymentDialog(true);
      return;
    }

    const allPlayers = getPlayerPool();
    if (allPlayers.length < 11) {
      setError(`Not enough players (${allPlayers.length}/11). Please check your filters.`);
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      await runTransaction(db, async (transaction) => {
        const userRef = doc(db, "users", user.id);
        const userDoc = await transaction.get(userRef);
        
        if (!userDoc.exists()) throw new Error("User not found");
        if ((userDoc.data().credits || 0) < requiredCredits) {
          throw new Error("Insufficient balance");
        }
        
        transaction.update(userRef, {
          credits: increment(-requiredCredits)
        });
      });

      const newTeams: GeneratedTeam[] = [];
      const TOTAL_ATTEMPTS = teamsToGenerate * 100;
      let attempts = 0;

      while (newTeams.length < teamsToGenerate && attempts < TOTAL_ATTEMPTS) {
        attempts++;
        const team = createBalancedTeam(allPlayers, currentTeamCount + newTeams.length, newTeams);
        
        if (team) {
          const isUnique = newTeams.every(existingTeam => {
            const existingPlayers = existingTeam.players.map(p => p.id).sort();
            const newPlayers = team.players.map(p => p.id).sort();
            const diffCount = existingPlayers.filter(id => !newPlayers.includes(id)).length;
            return diffCount >= 3;
          });

          if (isUnique || newTeams.length === 0) {
            const teamId = await saveTeamToFirestore(team);
            newTeams.push({ ...team, id: teamId || Date.now().toString() });
          }
        }
      }

      if (newTeams.length === 0) {
        const actualCounts = {
          wk: allPlayers.filter(p => normalizeRole(p.role) === 'WK-Batsman').length,
          batsmen: allPlayers.filter(p => 
            ['Batsman', 'Batting Allrounder'].includes(normalizeRole(p.role))
          ).length,
          allrounders: allPlayers.filter(p => 
            ['Bowling Allrounder', 'Batting Allrounder'].includes(normalizeRole(p.role))
          ).length,
          bowlers: allPlayers.filter(p => 
            ['Bowler', 'Bowling Allrounder'].includes(normalizeRole(p.role))
          ).length
        };

        throw new Error(
          `Failed to generate valid teams after ${TOTAL_ATTEMPTS} attempts.\n` +
          `Player counts: WK: ${actualCounts.wk}, Batsmen: ${actualCounts.batsmen}, ` +
          `Allrounders: ${actualCounts.allrounders}, Bowlers: ${actualCounts.bowlers}`
        );
      }

      const updatedTeams = [...newTeams, ...generatedTeams];
      setGeneratedTeams(updatedTeams);
      localStorage.setItem(localStorageKey, JSON.stringify(updatedTeams));
      onBalanceUpdate(userBalance - requiredCredits);

      const updatedTeamCount = currentTeamCount + newTeams.length;
      showTeamCountMessage(updatedTeamCount);

    } catch (err: any) {
      setError(err.message || "Failed to generate teams");
    } finally {
      setIsGenerating(false);
    }
  }, [
    team1, team2, teamCount, riskLevel, user, 
    userBalance, requiredCredits, needsPayment, 
    onBalanceUpdate, createBalancedTeam, matchId,
    fetchSavedTeams, getPlayerPool, generatedTeams,
    localStorageKey, roleCounts, getTeamCountForMatch,
    saveTeamToFirestore
  ]);

  const checkLineupChanges = useCallback(async () => {
    if (!user?.id || !matchId) return;
    
    try {
      const savedTeams = localStorage.getItem(localStorageKey);
      if (!savedTeams) return;
      
      const teams: GeneratedTeam[] = JSON.parse(savedTeams);
      const updatedTeams: GeneratedTeam[] = [];
      
      for (const team of teams) {
        const playersWithStatus = team.players.map(player => ({
          ...player,
          isNowSubstitute: false
        }));
        
        const nonPlayingPlayers = playersWithStatus.filter(p => p.isNowSubstitute);
        if (nonPlayingPlayers.length === 0) {
          updatedTeams.push(team);
          continue;
        }
        
        const playingPlayers = playersWithStatus.filter(p => !p.isNowSubstitute);
        const availableSubstitutes = team.substitutes?.filter(sub => 
          !playingPlayers.some(p => p.id === sub.id)
        ) || [];
        
        let newPlayers = [...playingPlayers];
        
        for (const nonPlayer of nonPlayingPlayers) {
          const replacement = availableSubstitutes.find(sub => 
            normalizeRole(sub.role) === normalizeRole(nonPlayer.role)
          );
          
          if (replacement) {
            newPlayers.push({
              ...replacement,
              isNowSubstitute: false
            });
            availableSubstitutes.splice(availableSubstitutes.indexOf(replacement), 1);
          } else {
            newPlayers.push({
              ...nonPlayer,
              isNowSubstitute: false
            });
          }
        }
        
        updatedTeams.push({
          ...team,
          players: newPlayers,
          captain: newPlayers.find(p => p.id === team.captain.id) || team.captain,
          viceCaptain: newPlayers.find(p => p.id === team.viceCaptain.id) || team.viceCaptain,
          updatedAt: new Date().toISOString(),
          hadChanges: nonPlayingPlayers.length > 0
        });
      }
      
      localStorage.setItem(localStorageKey, JSON.stringify(updatedTeams));
      setGeneratedTeams(updatedTeams);
      
      if (updatedTeams.some(t => t.hadChanges)) {
        const currentTeamCount = updatedTeams.length;
        showTeamCountMessage(currentTeamCount);
      }
      
    } catch (err) {
      console.error("Failed to check lineup changes:", err);
    }
  }, [user?.id, matchId, localStorageKey]);

  const generateButton = (
    <div className="space-y-2">
      <button
        onClick={handleGenerateTeams}
        disabled={isGenerating || !team1 || !team2}
        className={`
          w-full px-4 py-3 rounded-md font-bold
          ${isGenerating ? 'bg-gray-500' : 
           needsPayment ? 'bg-yellow-500 hover:bg-yellow-600' : 
           'bg-blue-500 hover:bg-blue-600'}
          text-white transition-colors
        `}
      >
        {isGenerating ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </span>
        ) : !team1 || !team2 ? (
          "Select both teams"
        ) : needsPayment ? (
          `Add ₹${paymentAmount} to Generate team`
        ) : (
          `Generate ${teamCount} Teams (₹${requiredCredits})`
        )}
      </button>

      <div className="flex justify-between text-sm">
        <span>Your Credits: <span className='text-green-500'>₹{userBalance} </span> </span>
        {needsPayment ? (
          <span className="text-red-500">Need ₹{paymentAmount} more</span>
        ) : (
          <span className="text-green-500">Sufficient balance</span>
        )}
      </div>

      {error && (
        <div className="text-red-500 text-sm p-2 bg-red-50 rounded-lg">
          <p className="font-medium">{error}</p>
          {error.includes("Player counts") && (
            <div className="mt-2 text-xs">
              <p>Current player counts:</p>
              <ul className="list-disc pl-5">
                <li>WK-Batsman: {roleCounts.wk} (min 1)</li>
                <li>Batsmen: {roleCounts.batsmen}</li>
                <li>Bowlers: {roleCounts.bowlers}</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const paymentDialog = showPaymentDialog ? (
    <PaymentDialog
      currentBalance={userBalance}
      requiredAmount={paymentAmount}
      onPaymentSuccess={(amount) => {
        onBalanceUpdate(userBalance + amount);
        setShowPaymentDialog(false);
        handleGenerateTeams();
      }}
      onOpenChange={setShowPaymentDialog}
      open={showPaymentDialog}
      onProcessingStateChange={setIsGenerating}
    />
  ) : null;

  return {
    generatedTeams,
    isGenerating,
    generateButton,
    paymentDialog,
    error,
    setError,
    fetchSavedTeams,
    setGeneratedTeams,
    checkLineupChanges
  };
};

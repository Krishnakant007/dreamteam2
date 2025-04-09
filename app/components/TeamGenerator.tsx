


"use client";
import { useState, useCallback, useMemo, useEffect } from "react";
import { PaymentDialog } from "./PaymentDialog";
import { Team, PlayerDetail, GeneratedTeam } from "../../types/match";
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

interface TeamGeneratorProps {
  team1?: Team;
  team2?: Team;
  teamCount: number;
  riskLevel: number;
  userBalance: number;
  onBalanceUpdate: (newBalance: number) => void;
  matchId: string;
}

interface EnhancedPlayerDetail extends PlayerDetail {
  roleOrder: number;
  selectedBy: number;
  selCapPerc?: number;
  selVcPerc?: number;
  normalizedRole: string;
}

export const useTeamGenerator = ({ 
  team1, 
  team2, 
  teamCount, 
  riskLevel,
  userBalance,
  onBalanceUpdate,
  matchId
}: TeamGeneratorProps) => {
  const { user } = useUser();
  const [generatedTeams, setGeneratedTeams] = useState<GeneratedTeam[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roleCounts, setRoleCounts] = useState({
    wk: 0,
    batsmen: 0,
    allrounders: 0,
    bowlers: 0
  });

  const MAX_TEAMS_PER_MATCH = 20;
  const requiredCredits = useMemo(() => teamCount * 10, [teamCount]);
  const needsPayment = useMemo(() => userBalance < requiredCredits, [userBalance, requiredCredits]);
  const paymentAmount = useMemo(() => Math.max(requiredCredits - userBalance, 50), [requiredCredits, userBalance]);
  const localStorageKey = useMemo(() => `matchTeams_${matchId}_${user?.id}`, [matchId, user?.id]);

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

  const getNeededRoles = (composition: any, riskLevel: number): string[] => {
    const neededRoles: string[] = [];
    
    if (composition['WK-Batsman'] < 1) {
      neededRoles.push('WK-Batsman');
    }
    
    if (riskLevel < 50) {
      if (composition['Batsman'] + composition['Batting Allrounder'] < 4) {
        neededRoles.push('Batsman', 'Batting Allrounder');
      }
      if (composition['Bowler'] + composition['Bowling Allrounder'] < 4) {
        neededRoles.push('Bowler', 'Bowling Allrounder');
      }
    } else {
      if (composition['Batsman'] + composition['Batting Allrounder'] < 5) {
        neededRoles.push('Batsman', 'Batting Allrounder');
      }
      if (composition['Bowler'] + composition['Bowling Allrounder'] < 3) {
        neededRoles.push('Bowler', 'Bowling Allrounder');
      }
    }
    
    return neededRoles.length > 0 ? neededRoles : 
      ['Batsman', 'Batting Allrounder', 'Bowling Allrounder', 'Bowler'];
  };

  const validateTeamWithRatio = (
    players: EnhancedPlayerDetail[],
    composition: any,
    team1Short: string,
    team2Short: string,
    teamRatio: { main: number; secondary: number }
  ) => {
    if (players.length !== 11) return false;
    
    const mainTeam = composition[team1Short] >= composition[team2Short] ? team1Short : team2Short;
    const secondaryTeam = mainTeam === team1Short ? team2Short : team1Short;
    
    if (composition[mainTeam] !== teamRatio.main || composition[secondaryTeam] !== teamRatio.secondary) {
      return false;
    }
    
    if (composition['WK-Batsman'] < 1) return false;
    
    const batCount = composition['Batsman'] + composition['Batting Allrounder'];
    if (batCount < 3) return false;
    
    const bowlCount = composition['Bowler'] + composition['Bowling Allrounder'];
    if (bowlCount < 3) return false;
    
    if (composition.overseas > 5) return false;
    
    return true;
  };

  const getPlayerPool = useCallback((): EnhancedPlayerDetail[] => {
    if (!team1 || !team2) return [];
    
    const team1Players = team1.playerDetails?.filter(p => p.substitute === false) || [];
    const team2Players = team2.playerDetails?.filter(p => p.substitute === false) || [];
    
    const allPlayers = [...team1Players, ...team2Players].map(p => ({
      ...p,
      roleOrder: getRoleOrder(p.role),
      normalizedRole: normalizeRole(p.role),
      selectedBy: p.selectedBy || 0.1,
      selCapPerc: p.selCapPerc || 0.1,
      selVcPerc: p.selVcPerc || 0.1,
      isPlaying: true
    }));

    const wkPlayers = allPlayers.filter(p => p.normalizedRole === 'WK-Batsman');
    const batPlayers = allPlayers.filter(p => 
      ['Batsman', 'Batting Allrounder'].includes(p.normalizedRole)
    );
    const bowlPlayers = allPlayers.filter(p => 
      ['Bowler', 'Bowling Allrounder'].includes(p.normalizedRole)
    );
    const allPlayersCount = allPlayers.filter(p => 
      ['Bowling Allrounder', 'Batting Allrounder'].includes(p.normalizedRole)
    );

    setRoleCounts({
      wk: wkPlayers.length,
      batsmen: batPlayers.length,
      allrounders: allPlayersCount.length,
      bowlers: bowlPlayers.length
    });

    if (wkPlayers.length < 1) {
      setError(`Need at least 1 WK-Batsman (available: ${wkPlayers.length})`);
      return [];
    }
    if (batPlayers.length < 3) {
      setError(`Need at least 3 Batsmen (available: ${batPlayers.length})`);
      return [];
    }
    if (bowlPlayers.length < 3) {
      setError(`Need at least 3 Bowlers (available: ${bowlPlayers.length})`);
      return [];
    }

    return allPlayers;
  }, [team1, team2]);

  const calculatePlayerScore = (player: EnhancedPlayerDetail, forCaptaincy = false) => {
    const baseScore = forCaptaincy ? 
      (player.selCapPerc || player.selectedBy) : 
      (player.selectedBy);
    
    let riskFactor = 1;
    if (riskLevel < 20) {
      riskFactor = 1 + (Math.random() * 0.1);
    } else if (riskLevel < 40) {
      riskFactor = 0.9 + (Math.random() * 0.2);
    } else if (riskLevel < 60) {
      riskFactor = 0.8 + (Math.random() * 0.4);
    } else if (riskLevel < 80) {
      riskFactor = 0.6 + (Math.random() * 0.6);
    } else {
      riskFactor = 0.4 + (Math.random() * 0.8);
    }
    
    return baseScore * riskFactor;
  };

  const getTeamCompositionByRisk = () => {
    if (riskLevel < 20) return { wk: 1, bat: 4, ar: 2, bowl: 4 };
    if (riskLevel < 40) return { wk: 1, bat: 3, ar: 3, bowl: 4 };
    if (riskLevel < 60) return { wk: 1, bat: 3, ar: 4, bowl: 3 };
    if (riskLevel < 80) return { wk: 1, bat: 5, ar: 3, bowl: 2 };
    
    return Math.random() > 0.5 
      ? { wk: 1, bat: 6, ar: 2, bowl: 2 } 
      : { wk: 1, bat: 2, ar: 4, bowl: 4 };
  };

  const weightedRandomPick = (players: EnhancedPlayerDetail[], field: 'selectedBy' | 'selCapPerc' | 'selVcPerc') => {
    const totalWeight = players.reduce((sum, p) => sum + (p[field] || 0.1), 0);
    let random = Math.random() * totalWeight;
    
    for (const player of players) {
      random -= player[field] || 0.1;
      if (random <= 0) return player;
    }
    
    return players[0];
  };

  const selectPlayerByRisk = (players: EnhancedPlayerDetail[], risk: number) => {
    if (players.length === 0) return null;
    
    const sorted = [...players].sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0));

    if (risk < 20) {
      const topCount = Math.max(1, Math.ceil(sorted.length * 0.2));
      return sorted[Math.floor(Math.random() * topCount)];
    } else if (risk < 40) {
      const topCount = Math.max(1, Math.ceil(sorted.length * 0.4));
      return weightedRandomPick(sorted.slice(0, topCount), 'selectedBy');
    } else if (risk < 60) {
      const topCount = Math.max(1, Math.ceil(sorted.length * 0.6));
      return Math.random() > 0.7 
        ? sorted[Math.floor(Math.random() * sorted.length)]
        : weightedRandomPick(sorted.slice(0, topCount), 'selectedBy');
    } else if (risk < 80) {
      return Math.random() > 0.5 
        ? weightedRandomPick(sorted, 'selectedBy')
        : sorted[Math.floor(Math.random() * sorted.length)];
    } else {
      return sorted[Math.floor(Math.random() * sorted.length)];
    }
  };

  const selectCaptainAndViceCaptain = (
    players: EnhancedPlayerDetail[],
    risk: number
  ): { captain: EnhancedPlayerDetail; viceCaptain: EnhancedPlayerDetail } => {
    const topPlayers = players.slice(0, Math.ceil(players.length * 0.3));
  
    let captain: EnhancedPlayerDetail;
    let viceCaptain: EnhancedPlayerDetail;
  
    if (risk < 20) {
      captain = topPlayers[0];
      viceCaptain = topPlayers[1] || topPlayers[0];
    } else if (risk < 40) {
      captain = topPlayers[0];
      viceCaptain =
        topPlayers.find(p => p.normalizedRole !== captain.normalizedRole) ||
        topPlayers[1] ||
        topPlayers[0];
    } else if (risk < 60) {
      captain = topPlayers[Math.floor(Math.random() * Math.min(3, topPlayers.length))];
      viceCaptain =
        topPlayers
          .slice(0, 5)
          .find(p => p.normalizedRole !== captain.normalizedRole) ||
        topPlayers[1] ||
        topPlayers[0];
    } else if (risk < 80) {
      captain = topPlayers[Math.floor(Math.random() * Math.min(5, topPlayers.length))];
      viceCaptain = topPlayers[Math.floor(Math.random() * Math.min(10, topPlayers.length))];
    } else {
      captain = topPlayers[Math.floor(Math.random() * topPlayers.length)];
      viceCaptain = topPlayers.find(p => p.id !== captain.id) || topPlayers[0];
    }
  
    return { captain, viceCaptain };
  };

  const validateTeam = (players: EnhancedPlayerDetail[], composition: any, team1Short: string, team2Short: string) => {
    if (players.length !== 11) return false;
    
    if (composition['WK-Batsman'] < 1) return false;
    
    const batCount = composition['Batsman'] + composition['Batting Allrounder'];
    if (batCount < 3) return false;
    
    const bowlCount = composition['Bowler'] + composition['Bowling Allrounder'];
    if (bowlCount < 3) return false;
    
    if (composition[team1Short] < 3 || composition[team2Short] < 3) return false;
    if (composition[team1Short] > 8 || composition[team2Short] > 8) return false;
    
    if (composition.overseas > 5) return false;
    
    return true;
  };

  const createBalancedTeam = useCallback((players: EnhancedPlayerDetail[], existingTeamCount: number) => {
    if (!team1 || !team2) return null;
    
    const MAX_ATTEMPTS = 500;
    const team1Short = team1.shortName || 'T1';
    const team2Short = team2.shortName || 'T2';
    
    const teamRatio = riskLevel >= 50 ? { main: 7, secondary: 4 } : { main: 6, secondary: 5 };
    
    const availablePlayers = players.filter(p => 
      p.selectedBy !== undefined && p.selectedBy > 0 && p.substitute === false
    );
    
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
      
      const teamComposition = {
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
  
      const { captain, viceCaptain } = selectCaptainAndViceCaptain(sortedPlayers, riskLevel);
      if (!captain || !viceCaptain) continue;
  
      const teamPlayers: EnhancedPlayerDetail[] = [captain, viceCaptain];
      
      [captain, viceCaptain].forEach(player => {
        const role = player.normalizedRole;
        teamComposition[role]++;
        teamComposition[player.teamName === team1.name ? team1Short : team2Short]++;
        if (player.isOverseas) teamComposition.overseas++;
        teamComposition.totalScore += calculatePlayerScore(player);
      });
  
      const remainingPlayers = sortedPlayers.filter(p => 
        p.id !== captain.id && p.id !== viceCaptain.id
      );
  
      let wkAttempts = 0;
      while (teamComposition['WK-Batsman'] < 1 && wkAttempts < 10) {
        wkAttempts++;
        const wkPlayers = remainingPlayers.filter(p => p.normalizedRole === 'WK-Batsman');
        if (wkPlayers.length === 0) break;
        
        const wkPlayer = selectPlayerByRisk(wkPlayers, riskLevel);
        if (!wkPlayer) continue;
        
        teamPlayers.push(wkPlayer);
        teamComposition['WK-Batsman']++;
        teamComposition[wkPlayer.teamName === team1.name ? team1Short : team2Short]++;
        if (wkPlayer.isOverseas) teamComposition.overseas++;
        teamComposition.totalScore += calculatePlayerScore(wkPlayer);
        
        remainingPlayers.splice(remainingPlayers.findIndex(p => p.id === wkPlayer.id), 1);
      }
  
      while (teamPlayers.length < 11 && remainingPlayers.length > 0) {
        const mainTeamCount = teamComposition[mainTeam];
        const secondaryTeamCount = teamComposition[secondaryTeam];
        
        let allowedTeams = [];
        if (mainTeamCount < teamRatio.main) {
          allowedTeams.push(mainTeam);
        }
        if (secondaryTeamCount < teamRatio.secondary) {
          allowedTeams.push(secondaryTeam);
        }
        
        if (allowedTeams.length === 0) {
          allowedTeams = [mainTeam, secondaryTeam];
        }
  
        const neededRoles = getNeededRoles(teamComposition, riskLevel);
        
        let candidates = remainingPlayers.filter(p => {
          const team = p.teamName === team1.name ? team1Short : team2Short;
          const teamAllowed = allowedTeams.includes(team);
          const overseasOK = !p.isOverseas || teamComposition.overseas < 5;
          const roleNeeded = neededRoles.includes(p.normalizedRole);
          
          return teamAllowed && overseasOK && roleNeeded;
        });
  
        if (candidates.length === 0) {
          candidates = remainingPlayers.filter(p => {
            const team = p.teamName === team1.name ? team1Short : team2Short;
            return allowedTeams.includes(team) && 
                   (!p.isOverseas || teamComposition.overseas < 5);
          });
        }
  
        if (candidates.length === 0) {
          candidates = remainingPlayers.filter(p => {
            const team = p.teamName === team1.name ? team1Short : team2Short;
            return allowedTeams.includes(team);
          });
        }
  
        if (candidates.length === 0) break;
  
        const selectedPlayer = selectPlayerByRisk(candidates, riskLevel);
        if (!selectedPlayer) break;
  
        teamPlayers.push(selectedPlayer);
        const role = selectedPlayer.normalizedRole;
        teamComposition[role]++;
        teamComposition[selectedPlayer.teamName === team1.name ? team1Short : team2Short]++;
        if (selectedPlayer.isOverseas) teamComposition.overseas++;
        teamComposition.totalScore += calculatePlayerScore(selectedPlayer);
  
        remainingPlayers.splice(remainingPlayers.findIndex(p => p.id === selectedPlayer.id), 1);
      }
  
      if (teamPlayers.length === 11 && validateTeamWithRatio(teamPlayers, teamComposition, team1Short, team2Short, teamRatio)) {
        // Get all available players not in the playing 11
        const allAvailablePlayers = players.filter(p => 
          !teamPlayers.some(tp => tp.id === p.id) && p.substitute === false
        );
        
        // Select top 4 substitutes by selectedBy percentage
        const substitutes = [...allAvailablePlayers]
          .sort((a, b) => (b.selectedBy || 0) - (a.selectedBy || 0))
          .slice(0, 4);
  
        return {
          players: [...teamPlayers].sort((a, b) => (a.roleOrder || 6) - (b.roleOrder || 6)),
          captain,
          viceCaptain,
          substitutes,
          teamName: `Team ${existingTeamCount + 1}`,
          teamComposition,
          riskLevel,
          matchId,
          createdAt: new Date().toISOString(),
          changes: 0
        };
      }
    }
  
    console.error(`Team generation failed after ${MAX_ATTEMPTS} attempts`);
    setError(`Failed to generate valid team after ${MAX_ATTEMPTS} attempts. Try adjusting risk level.`);
    return null;
  }, [team1, team2, riskLevel, matchId]);

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

  const saveTeamToFirestore = async (team: GeneratedTeam) => {
    if (!user || !matchId) return;
    
    try {
      const teamData = {
        ...team,
        userId: user.id,
        userEmail: user.primaryEmailAddress?.emailAddress || '',
        matchName: `${team1?.name} vs ${team2?.name}`,
        team1ShortName: team1?.shortName || team1?.name.split(' ').map(n => n[0]).join(''),
        team2ShortName: team2?.shortName || team2?.name.split(' ').map(n => n[0]).join(''),
        team1Logo: team1?.logo || '/fallback-team.png',
        team2Logo: team2?.logo || '/fallback-team.png'
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
        const team = createBalancedTeam(allPlayers, currentTeamCount + newTeams.length);
        if (team) {
          const teamId = await saveTeamToFirestore(team);
          newTeams.push({ ...team, id: teamId });
        }
      }

      if (newTeams.length === 0) {
        throw new Error(
          `Failed to generate valid teams after ${TOTAL_ATTEMPTS} attempts.\n` +
          `Player counts: WK: ${roleCounts.wk}, Batsmen: ${roleCounts.batsmen}, ` +
          `Allrounders: ${roleCounts.allrounders}, Bowlers: ${roleCounts.bowlers}\n` +
          `Try adjusting your risk level or player filters.`
        );
      }

      const updatedTeams = [...newTeams, ...generatedTeams];
      setGeneratedTeams(updatedTeams);
      localStorage.setItem(localStorageKey, JSON.stringify(updatedTeams));
      onBalanceUpdate(userBalance - requiredCredits);
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
      const updatedTeams = [];
      
      for (const team of teams) {
        const playersWithStatus = team.players.map(player => ({
          ...player,
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
            newPlayers.push(replacement);
            availableSubstitutes.splice(availableSubstitutes.indexOf(replacement), 1);
          } else {
            newPlayers.push(nonPlayer);
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
        alert('🔥 Minimum 10 Teams Needed to Win the Dream Team Mega Winnings 🏆');
      }
      
    } catch (err) {
      console.error("Failed to check lineup changes:", err);
    }
  }, [user?.id, matchId, localStorageKey]);

  const checkIfPlayerIsSubstitute = (playerId: string): boolean => {
    return Math.random() < 0.1;
  };

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
          `Add ₹${paymentAmount} to Generate`
        ) : (
          `Generate ${teamCount} Teams (₹${requiredCredits})`
        )}
      </button>

      <div className="flex justify-between text-sm">
        <span>Your Credits: ₹{userBalance}</span>
        {needsPayment ? (
          <span className="text-yellow-500">Need ₹{paymentAmount} more</span>
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
                <li>Batsmen: {roleCounts.batsmen} (min 3 including allrounders)</li>
                <li>Bowlers: {roleCounts.bowlers} (min 3 including allrounders)</li>
              </ul>
              <p className="mt-1">Try adjusting filters or risk level.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const paymentDialog = showPaymentDialog && (
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
    />
  );

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
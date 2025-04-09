// lib/teamUtils.ts
// import { PlayerDetail } from "@/types/match";

import { PlayerDetail } from "../../types/match";

export const calculatePlayerRiskScore = (baseScore: number, riskLevel: number) => {
  const riskFactor = (riskLevel / 100) * 2;
  return baseScore * (1 + (Math.random() - 0.5) * riskFactor);
};

export const isTeamValid = (players: PlayerDetail[]) => {
  const roleCounts = players.reduce((acc, player) => {
    acc[player.role] = (acc[player.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const overseasCount = players.filter(p => p.isOverseas).length;
  
  return (
    (roleCounts['WK'] >= 1 && roleCounts['WK'] <= 5) &&
    (roleCounts['BAT'] >= 2 && roleCounts['BAT'] <= 6) &&
    (roleCounts['AR'] >= 1 && roleCounts['AR'] <= 6) &&
    (roleCounts['BOWL'] >= 1 && roleCounts['BOWL'] <= 6) &&
    overseasCount <= 4
  );
};
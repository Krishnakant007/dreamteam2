// // types/match.ts
// export interface PlayerDetail {
//     id: number;
//     name: string;
//     fullName: string;
//     nickName: string;
//     role: string;
//     captain: boolean;
//     keeper: boolean;
//     // substitute: boolean;
//     isOverseas: boolean;
//     battingStyle?: string;
//     bowlingStyle?: string;
//   teamName?: string;
//   substitute?: boolean;
//   imgURL?: string;
//     //  imgURL?: string;
//     riskScore?: number;
//   }
  
//   export interface Team {
//     id: number;
//     name: string;
//     logo?: string;
//     playerDetails: PlayerDetail[];
//   }
  
//   export interface TossResults {
//     tossWinnerId: number;
//     decision: string;
//     tossWinnerName: string;
//   }
  
//   export interface Venue {
//     name: string;
//     city: string;
//     country: string;
//     ground?: string;
//     avgscore?: string;
//     pitchtype?: string;
//   }
  
//   export interface MatchInfo {
//     matchId: number;
//     matchDescription: string;
//     matchFormat: string;
//     matchType: string;
//     complete: boolean;
//     domestic: boolean;
//     matchStartTimestamp: number;
//     matchCompleteTimestamp: number;
//     dayNight: boolean;
//     year: number;
//     state: string;
//     tossResults?: TossResults;
//     team1?: Team;
//     team2?: Team;
//     venue?: Venue;
//   }
  
//   export interface MatchData {
//     matchInfo: MatchInfo;
//   }
  
//   export interface GeneratedTeam {
//     players: PlayerDetail[];
//     captain: PlayerDetail;
//     viceCaptain: PlayerDetail;
//     teamName: string;
//   }







// export interface PlayerDetail {
//   id: number;
//   name: string;
//   fullName: string;
//   nickName: string;
//   role: string;
//   captain: boolean;
//   keeper: boolean;
//   isOverseas: boolean;
//   battingStyle?: string;
//   bowlingStyle?: string;
//   teamName?: string;
//   substitute?: boolean;
//   imgURL?: string;
//   selectedBy?: number;
//   riskScore?: number;
//   roleOrder?: number;
//   wasSubstituted?: boolean;
//   teamShortName?: string;
//   isNowSubstitute?: boolean;
 
//   replacedPlayer?: string;
//   selCapPerc?: number;  // Add this
//   selVcPerc?: number
// }

// export interface Team {
//   id: number;
//   name: string;
//   logo?: string;
//   playerDetails: PlayerDetail[];
//   shortName: string; // ✅ Add this line
// }

// export interface TossResults {
//   tossWinnerId: number;
//   decision: string;
//   tossWinnerName: string;
// }

// export interface Venue {
//   name: string;
//   city: string;
//   country: string;
//   ground?: string;
//   avgscore?: string;
//   pitchtype?: string;
// }

// export interface MatchInfo {
//   matchId: number;
//   matchDescription: string;
//   matchFormat: string;
//   matchType: string;
//   complete: boolean;
//   domestic: boolean;
//   matchStartTimestamp: number;
//   matchCompleteTimestamp: number;
//   dayNight: boolean;
//   year: number;
//   state: string;
//   tossResults?: TossResults;
//   team1?: Team;
//   team2?: Team;
//   venue?: Venue;
// }

// export interface MatchData {
//   matchInfo: MatchInfo;
// }

// export interface GeneratedTeam {
//   id?: string; // ✅ Add this line
//   name?: string; 
//   players: PlayerDetail[];
//   captain: PlayerDetail;
//   viceCaptain: PlayerDetail;
//   teamName: string;
//   changes?: number;
//   substitutes?: PlayerDetail[];
//   team1ShortName?: string; // ✅
//   team2ShortName?: string; // ✅
//   riskLevel?: number; // ✅
//   hadChanges?: boolean


// }












// types/match.ts
export interface PlayerDetail {
  id: number;
  name: string;
  fullName: string;
  nickName: string;
  role: string;
  captain: boolean;
  viceCaptain?: boolean
  keeper: boolean;
  isOverseas: boolean;
  battingStyle?: string;
  bowlingStyle?: string;
  teamName?: string;
  substitute?: boolean;
  imgURL?: string;
  selectedBy?: number;
  riskScore?: number;
  roleOrder?: number;
  wasSubstituted?: boolean;
  teamShortName?: string;
  isNowSubstitute?: boolean;
  replacedPlayer?: string;
  selCapPerc?: number;
  selVcPerc?: number;
  isPlaying?: boolean;
  points?: number;
  baseScore?: number;
 
}

export interface Team {
  id: number;
  name: string;
  logo?: string;
  playerDetails: PlayerDetail[];
  shortName: string;
}

export interface TossResults {
  tossWinnerId: number;
  decision: string;
  tossWinnerName: string;
  announcedAt?: string;
}

export interface Venue {
  name: string;
  city: string;
  country: string;
  ground?: string;
  avgscore?: string;
  pitchtype?: string;
}

export interface MatchInfo {
  matchId: number;
  matchDescription: string;
  matchFormat: string;
  matchType: string;
  complete: boolean;
  domestic: boolean;
  matchStartTimestamp: number;
  matchCompleteTimestamp: number;
  dayNight: boolean;
  year: number;
  state: string;
  tossResults?: TossResults;
  team1?: Team;
  team2?: Team;
  venue?: Venue;
}

export interface MatchData {
  matchInfo: MatchInfo;
}

export interface GeneratedTeam {
  id: string | number;
  name?: string;
  players: PlayerDetail[];
  captain: PlayerDetail;
  viceCaptain: PlayerDetail;
  teamName: string;
  changes?: number;
  substitutes?: PlayerDetail[];
  team1ShortName?: string;
  team2ShortName?: string;
  riskLevel?: number;
  hadChanges?: boolean;
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
  userEmail?: string;
  matchName?: string;
  matchId?: string;
  team1Logo?: string;
  team2Logo?: string;
  team1Count?: number;
  team2Count?: number;
  wkCount?: number;
  batCount?: number;
  arCount?: number;
  bowlCount?: number;
  teamComposition?: Record<string, number>;
}

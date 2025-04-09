export interface Player {
    name: string;
    role: string;
    image: string;
    team?: string;
  }
  
  export interface TeamData {
    Batters: Player[];
    "All Rounders": Player[];
    Bowlers: Player[];
  }
  
  export interface IPLTeams {
    [key: string]: TeamData;
  }
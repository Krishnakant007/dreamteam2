



import { getTeamImage } from "@/constants/teamImages";
// import { MatchInfo } from "@/types/match";
import { format } from "date-fns";
import { enIN } from "date-fns/locale";
import { MatchInfo } from "../../types/match";

interface MatchHeaderProps {
  matchInfo: MatchInfo;
}

export default function MatchHeader({ matchInfo }: MatchHeaderProps) {
  const { team1, team2, venue, tossResults, matchStartTimestamp } = matchInfo;

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-lg shadow-lg">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">{matchInfo.matchDescription}</h1>
        <p className="text-gray-300">
          {format(new Date(matchStartTimestamp), "EEEE, MMMM d, yyyy", { locale: enIN })}
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="text-center">
            <img 
              src={getTeamImage(team1?.name || "")} 
              alt={team1?.name} 
              className="w-16 h-16 mx-auto object-contain" 
            />
            <p className="font-semibold mt-2">{team1?.name}</p>
          </div>
          
          <div className="text-xl font-bold mx-4">VS</div>
          
          <div className="text-center">
            <img 
              src={getTeamImage(team2?.name || "")} 
              alt={team2?.name} 
              className="w-16 h-16 mx-auto object-contain" 
            />
            <p className="font-semibold mt-2">{team2?.name}</p>
          </div>
        </div>
        
        <div className="bg-gray-700 p-3 rounded-lg">
          {tossResults ? (
            <div className="text-center">
              <p className="text-green-400 font-semibold">
                {tossResults.tossWinnerName} won the toss
              </p>
              <p className="text-sm">
                Chose to {tossResults.decision}
              </p>
            </div>
          ) : (
            <p className="text-yellow-400">Toss update soon</p>
          )}
          
          {venue && (
            <p className="text-sm mt-2 text-center">
              {venue.name}, {venue.city}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
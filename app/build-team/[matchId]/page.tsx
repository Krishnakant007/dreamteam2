














// app/build-team/[matchId]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Header from "@/components/Header";
import { format, isValid } from "date-fns";
import { enIN } from "date-fns/locale";
import MatchHeader from "@/components/MatchHeader";
// import RiskSlider from "@/components/RiskSlider";
import TeamCountSlider from "@/components/TeamCountSlider";
import TeamCard from "@/components/TeamCard";
import { useTeamGenerator } from "@/components/TeamGenerator";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { MatchInfo, GeneratedTeam, MatchData, PlayerDetail } from "@/types/match";

const IPL_TEAM_IMAGES: { [key: string]: string } = {
  "Chennai Super Kings": "/images/CSK.png",
  "Mumbai Indians": "/images/MI.webp",
  "Kolkata Knight Riders": "/images/kkr.png",
  "Sunrisers Hyderabad": "/images/SRH2.png",
  "Delhi Capitals": "/images/DC.webp",
  "Lucknow Super Giants": "/images/LSG2.png",
  "Rajasthan Royals": "/images/RR2.png",
  "Punjab Kings": "/images/PBKS.webp",
  "Gujarat Titans": "/images/GT.webp",
  "Royal Challengers Bengaluru": "/images/rcb.png",
  "New Zealand": "/images/nz.png",
  "Pakistan": "/images/pak.png",
};

const getTeamImage = (teamName: string) => IPL_TEAM_IMAGES[teamName] || "/fallback-team.png";

export default function MatchPage() {
  const params = useParams();
  const matchId = params?.matchId 
    ? (Array.isArray(params.matchId) ? params.matchId[0] : params.matchId)
    : null;

  const { user } = useUser();
  const [matchData, setMatchData] = useState<MatchData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userBalance, setUserBalance] = useState(0);
  const [riskLevel, setRiskLevel] = useState(50);
  const [teamCount, setTeamCount] = useState(5);

  const {
    generatedTeams,
    isGenerating,
    generateButton,
    paymentDialog,
    error: teamError,
    setGeneratedTeams
  } = useTeamGenerator({
    team1: matchData?.matchInfo?.team1,
    team2: matchData?.matchInfo?.team2,
    teamCount,
    riskLevel,
    userBalance,
    onBalanceUpdate: setUserBalance,
    matchId: matchId || ''
  });

  useEffect(() => {
    if (!matchId) return;

    setLoading(true);
    const unsubscribeMatch = onSnapshot(
      doc(db, "matchinfo", matchId),
      (docSnap) => {
        try {
          setLoading(false);
          if (docSnap.exists()) {
            const data = docSnap.data() as MatchData;
            setMatchData(data);
          } else {
            setMatchData(null);
          }
        } catch (err) {
          setError("Failed to process match data");
          console.error("Data processing error:", err);
        }
      },
      (err) => {
        setLoading(false);
        setError("Failed to load match data");
        console.error("Error loading match data:", err);
      }
    );

    let unsubscribeUser = () => {};
    if (user?.id) {
      unsubscribeUser = onSnapshot(
        doc(db, "users", user.id),
        (docSnap) => {
          try {
            setUserBalance(docSnap.exists() ? Number(docSnap.data().credits) || 0 : 0);
          } catch (err) {
            console.error("Failed to parse user balance:", err);
          }
        },
        (err) => {
          console.error("Failed to load user balance:", err);
        }
      );
    }

    return () => {
      unsubscribeMatch();
      unsubscribeUser();
    };
  }, [matchId, user]);

  useEffect(() => {
    const loadSavedTeams = async () => {
      try {
        if (user && matchId) {
          const savedTeams = localStorage.getItem(`matchTeams_${matchId}_${user.id}`);
          if (savedTeams) {
            setGeneratedTeams(JSON.parse(savedTeams));
          }
        }
      } catch (err) {
        console.error("Failed to load saved teams:", err);
      }
    };

    loadSavedTeams();
  }, [user, matchId, setGeneratedTeams]);

  const formatDateSafely = (date: unknown) => {
    try {
      if (!date) return "Not available";
      const dateObj = new Date(date as string);
      return isValid(dateObj) 
        ? format(dateObj, "h:mm a, MMMM d, yyyy", { locale: enIN })
        : "Invalid date";
    } catch {
      return "Not available";
    }
  };

  if (!matchId) {
    return (
      <div className="bg-gray-900 min-h-screen text-white p-6">
        <Header />
        <div className="container mx-auto py-6">
          <div className="bg-red-500 text-white p-4 rounded-lg">
            <h2 className="text-xl font-bold">Invalid Match URL</h2>
            <p className="mt-2">The match ID could not be found in the URL.</p>
            <Link href="/" className="text-blue-300 hover:text-blue-200 mt-4 inline-block">
              ← Return to matches list
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen text-white">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-white">Loading match details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 min-h-screen text-white">
        <Header />
        <div className="p-6 text-red-500">{error}</div>
      </div>
    );
  }

  if (!matchData?.matchInfo) {
    return (
      <div className="bg-gray-900 min-h-screen text-white">
        <Header />
        <div className="p-6 text-white">No match data found.</div>
      </div>
    );
  }

  const { matchInfo } = matchData;
  const { team1, team2 } = matchInfo;

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Header />
      <div className="w-full px-4 mx-auto max-w-7xl">
        <MatchHeader matchInfo={matchInfo} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 w-full">
          <div className="md:col-span-2 space-y-4 w-full">
            <div className="bg-gray-800 p-4 rounded-lg w-full">
              <h2 className="text-xl font-bold mb-4">Team Configuration</h2>
              <div className="space-y-6">
{/*                 <RiskSlider value={riskLevel} onChange={setRiskLevel} /> */}
                <TeamCountSlider value={teamCount} onChange={setTeamCount} />
                {generateButton}
                {paymentDialog}
                {teamError && <div className="text-red-500">{teamError}</div>}
              </div>
            </div>

            {isGenerating ? (
              <div className="bg-gray-800 p-6 rounded-lg flex items-center justify-center h-40 w-full">
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-2"></div>
                  <p className="text-gray-400">Generating teams...</p>
                </div>
              </div>
            ) : generatedTeams.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {generatedTeams.map((team: GeneratedTeam, index) => (
                  <TeamCard
                    key={`${matchId}-${index}`}
                    team={team}
                    index={index}
                    isSelected={false}
                    onToggleSelect={() => {}}
                    onUpdateTeam={(updatedTeam: GeneratedTeam) => {
                      const updatedTeams = [...generatedTeams];
                      updatedTeams[index] = updatedTeam;
                      setGeneratedTeams(updatedTeams);
                      localStorage.setItem(
                        `matchTeams_${matchId}_${user?.id}`,
                        JSON.stringify(updatedTeams)
                      );
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-gray-800 p-6 rounded-lg w-full">
                <h2 className="text-xl font-bold mb-4">No Teams Generated Yet</h2>
                <p className="text-gray-400">Adjust settings and generate teams</p>
              </div>
            )}
          </div>

          <div className="bg-gray-800 p-4 rounded-lg w-full">
            <h2 className="text-xl font-bold mb-4">Match Info</h2>
            {matchInfo.venue && (
              <div className="mb-4">
                <h3 className="font-semibold text-lg">Venue</h3>
                <p>{matchInfo.venue.name}, {matchInfo.venue.city}</p>
                <p className="text-sm text-gray-400">
                  Pitch: {matchInfo.venue.pitchtype || "Unknown"} | 
                  Avg. Score: {matchInfo.venue.avgscore || "N/A"}
                </p>
              </div>
            )}
            
            {matchInfo.tossResults && (
              <div className="mb-4">
                <h3 className="font-semibold text-lg">Toss Result</h3>
                <p>
                  {matchInfo.tossResults.tossWinnerName || "TBD"} won the toss and chose to {matchInfo.tossResults.decision || "TBD"}
                </p>
                {matchInfo.tossResults.announcedAt && (
                  <p className="text-sm text-gray-400">
                    {formatDateSafely(matchInfo.tossResults.announcedAt)}
                  </p>
                )}
              </div>
            )}

            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-2">Team Squads</h3>
              <div className="space-y-4">
                {[team1, team2].filter(Boolean).map((team) => (
                  <div key={team?.id} className="bg-gray-700 p-3 rounded">
                    <h4 className="font-medium flex items-center">
                      <img 
                        src={getTeamImage(team?.name || '')}
                        alt={team?.name} 
                        className="w-6 h-6 mr-2 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/fallback-team.png';
                          target.onerror = null;
                        }}
                      />
                      {team?.name}
                    </h4>
                    <div className="text-sm mt-2 space-y-1">
                      {team?.playerDetails?.map((player: PlayerDetail) => (
                        <div key={player.id} className="flex items-center">
                          <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                            player.substitute ? 'bg-red-500' : 'bg-green-500'
                          }`} />
                          <img 
                            src={player.imgURL || "/fallback-player.png"} 
                            alt={player.name} 
                            className="w-4 h-4 mr-2 rounded-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/fallback-player.png';
                              target.onerror = null;
                            }}
                          />
                          <span className={player.substitute ? 'text-gray-400' : ''}>
                            {player.name} ({player.role})
                            {player.substitute && ' (Sub)'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
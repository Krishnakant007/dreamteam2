

"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "../../components/ui/button";

const categories = [
  { name: "League", key: "League", image: "/ipl.webp" },
  { name: "International", key: "International", image: "/international.png" },
  { name: "Domestic", key: "Domestic", image: "/Domestic.webp" },
  { name: "Women", key: "Women", image: "/Woman.webp" },
];

const IPL_TEAM_IMAGES: { [key: string]: string } = {
  "Chennai Super Kings": "/images/CSK.png",
  "Mumbai Indians": "/images/MI.webp",
  "Kolkata Knight Riders": "/images/kkr.png",
  "Sunrisers Hyderabad": "/images/SRH (2).png",
  "Delhi Capitals": "/images/DC.webp",
  "Lucknow Super Giants": "/images/LSG (2).png",
  "Rajasthan Royals": "/images/RR (2).png",
  "Punjab Kings": "/images/PBKS.webp",
  "Gujarat Titans": "/images/GT.webp",
  "Royal Challengers Bengaluru": "/images/rcb.png",
  "New Zealand": "/images/nz.png",
  "Pakistan": "/images/pak.png",
  // Add other teams as needed
}

const getTeamImage = (teamName: string) => IPL_TEAM_IMAGES[teamName] || "/fallback.png";

export default function MatchList() {
  const [matches, setMatches] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("League");
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  const fetchMatches = async () => {
    setIsLoading(true);
    try {
      const docRef = doc(db, "cricket", "upcomingMatches");
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const data = docSnap.data();
        const matchesArray = data.matches || [];
        setMatches(matchesArray);
      } else {
        console.log("No matches found in Firestore");
      }
    } catch (error) {
      console.error("Failed to fetch matches:", error);
  
      // ✅ Properly check error type
      if (typeof error === 'object' && error !== null && 'code' in error) {
        const err = error as { code: string };
        if (err.code === 'permission-denied') {
          console.error("Firestore permission denied. Check your Firestore rules.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    fetchMatches();
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isToday = (timestamp: string) => {
    const matchDate = new Date(parseInt(timestamp));
    const today = new Date();
    return (
      matchDate.getDate() === today.getDate() &&
      matchDate.getMonth() === today.getMonth() &&
      matchDate.getFullYear() === today.getFullYear()
    );
  };

  const getCountdown = (timestamp: string) => {
    const matchTime = new Date(parseInt(timestamp)).getTime();
    const now = currentTime.getTime();
    const diff = matchTime - now;

    if (diff <= 0) return "LIVE";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const formatFirebaseDate = (timestamp: string) => {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleDateString("en-US", {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatFirebaseTime = (timestamp: string) => {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleTimeString("en-US", {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="p-4">
      {/* Category Selector */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        {categories.map((category) => (
          <Button
            key={category.key}
            onClick={() => setActiveCategory(category.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeCategory === category.key
                ? "bg-green-600 text-white shadow-md"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }`}
          >
            <Image
              src={category.image}
              alt={category.name}
              width={24}
              height={24}
              className="object-contain"
            />
            {category.name}
          </Button>
        ))}
      </div>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      )}

      {/* Matches Grid */}
      {!isLoading && matches.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {matches
            .filter((match: any) => match.matchType === activeCategory)
            .map((match: any) => {
              const todayMatch = isToday(match.date);
              const countdown = todayMatch ? getCountdown(match.date) : null;

              return (
                <Card
                  key={match.id}
                  className={`rounded-xl border-gray-700 bg-gray-800 text-white shadow-lg hover:shadow-xl transition-shadow ${
                    todayMatch ? "border-green-500 border-2" : ""
                  }`}
                >
                  <CardHeader className="flex flex-col items-center pb-2">   
                    <CardTitle className="text-lg font-bold text-center">
                      <span className="text-gray-100">{match.team1}</span>{" "}
                      <span className="text-gray-400 mx-1">vs</span>{" "}
                      <span className="text-gray-100">{match.team2}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center gap-3">
                    {/* Team Images */}
                    <div className="flex items-center justify-center gap-4">
                      <div className="flex flex-col items-center">
                        <div className="relative w-12 h-12">
                          <Image
                            src={getTeamImage(match.team1)}
                            alt={match.team1}
                            fill
                            className="rounded-full object-contain shadow-md border-2 border-gray-600"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/fallback.jpg';
                            }}
                          />
                        </div>
                        <span className="text-xs mt-1 text-gray-300">
                        {match.team1.split(' ').map((word: string) => word[0]).join('').toUpperCase()}

                        </span>
                      </div>
                      <span className="text-lg font-semibold text-gray-400">VS</span>
                      <div className="flex flex-col items-center">
                        <div className="relative w-12 h-12">
                          <Image
                            src={getTeamImage(match.team2)}
                            alt={match.team2}
                            fill
                            className="rounded-full object-contain shadow-md border-2 border-gray-600"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/fallback.jpg';
                            }}
                          />
                        </div>
                        <span className="text-xs mt-1 text-gray-300">
                        {match.team1.split(' ').map((word: string) => word[0]).join('').toUpperCase()}

                        </span>
                      </div>
                    </div>

                    {/* Match Date & Time */}
                    <div className="text-sm text-center bg-gray-700 rounded-lg p-2 w-full">
                      <p className="font-semibold text-gray-200">
                        {formatFirebaseDate(match.date)}
                      </p>
                      <p className={`font-semibold ${
                        countdown === "LIVE" ? "text-green-400 animate-pulse" : "text-gray-200"
                      }`}>
                        {formatFirebaseTime(match.date)} {todayMatch && `(${countdown})`}
                      </p>
                    </div>

                    {/* Button - Show "Build Team" if show is true, otherwise "Update Soon" */}
                    {match.show ? (
                      // <Link href={`/build-team/${match.id}`} passHref className="w-full">
                      //   <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                      //     Build Team
                      //   </Button>
                      // </Link>

                    // In MatchList component
               // This is the correct way to link to your build-team page
<Link href={`/build-team/${match.id}`} passHref className="w-full">
  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
    Build Team
  </Button>
</Link>
                    ) : (
                      <Button 
                        disabled 
                        className="w-full bg-gray-600 text-gray-300 cursor-not-allowed"
                      >
                        Update Soon
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
        </div>
      ) : !isLoading && (
        <p className="text-center text-gray-00">No matches found</p>
      )}
    </div>
  );
}
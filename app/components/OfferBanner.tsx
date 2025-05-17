// src/components/OfferBanner.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export function OfferBanner() {
  const [showOffer, setShowOffer] = useState(false);
  const [showMatchOffer, setShowMatchOffer] = useState(false);
  const { isLoaded, user } = useUser();
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [matchTimeLeft, setMatchTimeLeft] = useState(900); // 15 minutes in seconds

  useEffect(() => {
    if (!isLoaded) return;

    // Daily offer check
    const checkDailyOffer = () => {
      const now = new Date();
      const offerKey = `offerShown_${user?.id}_${now.toDateString()}`;
      const offerExpiry = localStorage.getItem(offerKey);

      if (!offerExpiry || new Date(offerExpiry) < now) {
        setShowOffer(true);
        const expiryTime = new Date(now.getTime() + 3600 * 1000);
        localStorage.setItem(offerKey, expiryTime.toISOString());
      }
    };

    // Match time offer check (example match at 8 PM today)
    const checkMatchOffer = () => {
      const now = new Date();
      const matchTime = new Date();
      matchTime.setHours(20, 0, 0, 0); // 8 PM
      
      // If match time is in the past, set to next day
      if (matchTime < now) {
        matchTime.setDate(matchTime.getDate() + 1);
      }

      const diffMinutes = (matchTime.getTime() - now.getTime()) / (1000 * 60);
      
      if (diffMinutes <= 15 && diffMinutes > 0) {
        const offerKey = `matchOfferShown_${user?.id}_${matchTime.toISOString()}`;
        const offerExpiry = localStorage.getItem(offerKey);
        
        if (!offerExpiry) {
          setShowMatchOffer(true);
          setMatchTimeLeft(Math.floor(diffMinutes * 60));
          const expiryTime = new Date(now.getTime() + diffMinutes * 60 * 1000);
          localStorage.setItem(offerKey, expiryTime.toISOString());
        }
      }
    };

    checkDailyOffer();
    checkMatchOffer();

    // Set up intervals for countdowns
    const dailyInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(dailyInterval);
          setShowOffer(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const matchInterval = setInterval(() => {
      setMatchTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(matchInterval);
          setShowMatchOffer(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(dailyInterval);
      clearInterval(matchInterval);
    };
  }, [isLoaded, user]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!showOffer && !showMatchOffer) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 space-y-3">
      {showOffer && (
        <OfferCard 
          type="daily"
          timeLeft={formatTime(timeLeft)}
          onClose={() => setShowOffer(false)}
        />
      )}
      {showMatchOffer && (
        <OfferCard 
          type="match"
          timeLeft={formatTime(matchTimeLeft)}
          onClose={() => setShowMatchOffer(false)}
        />
      )}
    </div>
  );
}

function OfferCard({ type, timeLeft, onClose }: { type: 'daily' | 'match'; timeLeft: string; onClose: () => void }) {
  const title = type === 'daily' ? "Daily Special Offer!" : "Match Time Special!";
  const description = type === 'daily' 
    ? "Get bonus credits on your first deposit today" 
    : "Limited time offer before match starts!";
  const bgColor = type === 'daily' ? "from-yellow-400 to-yellow-500" : "from-red-500 to-red-600";

  return (
    <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden max-w-4xl mx-auto">
      <div className="relative">
        <button 
          onClick={onClose}
          className="absolute right-2 top-2 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
        >
          <X className="h-5 w-5 text-gray-700" />
        </button>
        
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-2/3 h-48 md:h-auto">
            <Image 
              src="/offer.jpg" 
              alt="Special Offer"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <div className={`w-full md:w-1/3 p-4 bg-gradient-to-br ${bgColor} text-white flex flex-col justify-center items-center`}>
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold mb-1">{title}</h3>
              <p className="text-sm mb-3">{description}</p>
              <div className="bg-black bg-opacity-20 px-3 py-2 rounded-lg inline-block">
                <span className="font-mono font-bold">
                  {timeLeft}
                </span>
              </div>
            </div>
            <Button 
              className="bg-white text-gray-800 font-bold shadow-lg hover:bg-gray-100"
              onClick={onClose}
            >
              Claim Offer Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}



// // "use client";

// // import { useEffect, useState } from "react";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import Image from "next/image";
// // import Link from "next/link";
// // import { doc, getDoc } from "firebase/firestore";
// // import { db } from "@/lib/firebase";
// // import { Button } from "../../components/ui/button";

// // const categories = [
// //   { name: "League", key: "League", image: "/IPL.webp" },
// //   { name: "International", key: "International", image: "/international.png" },
// //   { name: "Domestic", key: "Domestic", image: "/Domestic.webp" },
// //   { name: "Women", key: "Women", image: "/Woman.webp" },
// // ];

// // const IPL_TEAM_IMAGES: { [key: string]: string } = {
// //   "Chennai Super Kings": "/images/CSK.png",
// //   "Mumbai Indians": "/images/MI.webp",
// //   "Kolkata Knight Riders": "/images/kkr.png",
// //   "Sunrisers Hyderabad": "/images/SRH2.png",
// //   "Delhi Capitals": "/images/DC.webp",
// //   "Lucknow Super Giants": "/images/LSG2.png",
// //   "Rajasthan Royals": "/images/RR2.png",
// //   "Punjab Kings": "/images/PBKS.webp",
// //   "Gujarat Titans": "/images/GT.webp",
// //   "Royal Challengers Bengaluru": "/images/rcb.png",
// //   "New Zealand": "/images/nz.png",
// //   "Pakistan": "/images/pak.png",
// //   // Add other teams as needed
// // }

// // const getTeamImage = (teamName: string) => IPL_TEAM_IMAGES[teamName] || "/fallback2.webp";

// // export default function MatchList() {
// //   const [matches, setMatches] = useState<any[]>([]);
// //   const [activeCategory, setActiveCategory] = useState("League");
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [currentTime, setCurrentTime] = useState(new Date());

// //   const fetchMatches = async () => {
// //     setIsLoading(true);
// //     try {
// //       const docRef = doc(db, "cricket", "upcomingMatches");
// //       const docSnap = await getDoc(docRef);
  
// //       if (docSnap.exists()) {
// //         const data = docSnap.data();
// //         const matchesArray = data.matches || [];
// //         setMatches(matchesArray);
// //       } else {
// //         console.log("No matches found in Firestore");
// //       }
// //     } catch (error) {
// //       console.error("Failed to fetch matches:", error);
  
// //       // ✅ Properly check error type
// //       if (typeof error === 'object' && error !== null && 'code' in error) {
// //         const err = error as { code: string };
// //         if (err.code === 'permission-denied') {
// //           console.error("Firestore permission denied. Check your Firestore rules.");
// //         }
// //       }
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };
  

// //   useEffect(() => {
// //     fetchMatches();
// //     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
// //     return () => clearInterval(timer);
// //   }, []);

// //   const isToday = (timestamp: string) => {
// //     const matchDate = new Date(parseInt(timestamp));
// //     const today = new Date();
// //     return (
// //       matchDate.getDate() === today.getDate() &&
// //       matchDate.getMonth() === today.getMonth() &&
// //       matchDate.getFullYear() === today.getFullYear()
// //     );
// //   };

// //   const getCountdown = (timestamp: string) => {
// //     const matchTime = new Date(parseInt(timestamp)).getTime();
// //     const now = currentTime.getTime();
// //     const diff = matchTime - now;

// //     if (diff <= 0) return "LIVE";

// //     const hours = Math.floor(diff / (1000 * 60 * 60));
// //     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
// //     const seconds = Math.floor((diff % (1000 * 60)) / 1000);

// //     return `${hours}h ${minutes}m ${seconds}s`;
// //   };

// //   const formatFirebaseDate = (timestamp: string) => {
// //     const date = new Date(parseInt(timestamp));
// //     return date.toLocaleDateString("en-US", {
// //       weekday: 'short',
// //       month: 'short',
// //       day: 'numeric'
// //     });
// //   };

// //   const formatFirebaseTime = (timestamp: string) => {
// //     const date = new Date(parseInt(timestamp));
// //     return date.toLocaleTimeString("en-US", {
// //       hour: '2-digit',
// //       minute: '2-digit',
// //       hour12: true
// //     });
// //   };

// //   return (
// //     <div className="p-4">
// //       {/* Category Selector */}
// //       <div className="flex flex-wrap gap-4 mb-6 justify-center">
// //         {categories.map((category) => (
// //           <Button
// //             key={category.key}
// //             onClick={() => setActiveCategory(category.key)}
// //             className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
// //               activeCategory === category.key
// //                 ? "bg-green-600 text-white shadow-md"
// //                 : "bg-gray-200 hover:bg-gray-300 text-gray-800"
// //             }`}
// //           >
// //             <Image
// //               src={category.image}
// //               alt={category.name}
// //               width={24}
// //               height={24}
// //               className="object-contain"
// //             />
// //             {category.name}
// //           </Button>
// //         ))}
// //       </div>

// //       {/* Loading Spinner */}
// //       {isLoading && (
// //         <div className="flex justify-center items-center h-64">
// //           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
// //         </div>
// //       )}

// //       {/* Matches Grid */}
// //       {!isLoading && matches.length > 0 ? (
// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
// //           {matches
// //             .filter((match: any) => match.matchType === activeCategory)
// //             .map((match: any) => {
// //               const todayMatch = isToday(match.date);
// //               const countdown = todayMatch ? getCountdown(match.date) : null;

// //               return (
// //                 <Card
// //                   key={match.id}
// //                   className={`rounded-xl border-gray-700 bg-gray-800 text-white shadow-lg hover:shadow-xl transition-shadow ${
// //                     todayMatch ? "border-green-500 border-2" : ""
// //                   }`}
// //                 >
// //                   <CardHeader className="flex flex-col items-center pb-2">   
// //                     <CardTitle className="text-lg font-bold text-center">
// //                       <span className="text-gray-100">{match.team1}</span>{" "}
// //                       <span className="text-gray-400 mx-1">vs</span>{" "}
// //                       <span className="text-gray-100">{match.team2}</span>
// //                     </CardTitle>
// //                   </CardHeader>
// //                   <CardContent className="flex flex-col items-center gap-3">
// //                     {/* Team Images */}
// //                     <div className="flex items-center justify-center gap-4">
// //                       <div className="flex flex-col items-center">
// //                         <div className="relative w-12 h-12">
// //                           <Image
// //                             src={getTeamImage(match.team1)}
// //                             alt={match.team1}
// //                             fill
// //                             className="rounded-full object-contain shadow-md border-2 border-gray-600"
// //                             onError={(e) => {
// //                               (e.target as HTMLImageElement).src = '/fallback.jpg';
// //                             }}
// //                           />
// //                         </div>
// //                         <span className="text-xs mt-1 text-gray-300">
// //                         {match.team1.split(' ').map((word: string) => word[0]).join('').toUpperCase()}

// //                         </span>
// //                       </div>
// //                       <span className="text-lg font-semibold text-gray-400">VS</span>
// //                       <div className="flex flex-col items-center">
// //                         <div className="relative w-12 h-12">
// //                           <Image
// //                             src={getTeamImage(match.team2)}
// //                             alt={match.team2}
// //                             fill
// //                             className="rounded-full object-contain shadow-md border-2 border-gray-600"
// //                             onError={(e) => {
// //                               (e.target as HTMLImageElement).src = '/fallback.jpg';
// //                             }}
// //                           />
// //                         </div>
// //                         <span className="text-xs mt-1 text-gray-300">
// //                         {match.team1.split(' ').map((word: string) => word[0]).join('').toUpperCase()}

// //                         </span>
// //                       </div>
// //                     </div>

// //                     {/* Match Date & Time */}
// //                     <div className="text-sm text-center bg-gray-700 rounded-lg p-2 w-full">
// //                       <p className="font-semibold text-gray-200">
// //                         {formatFirebaseDate(match.date)}
// //                       </p>
// //                       <p className={`font-semibold ${
// //                         countdown === "LIVE" ? "text-green-400 animate-pulse" : "text-gray-200"
// //                       }`}>
// //                         {formatFirebaseTime(match.date)} {todayMatch && `(${countdown})`}
// //                       </p>
// //                     </div>

// //                     {/* Button - Show "Build Team" if show is true, otherwise "Update Soon" */}
// //                     {match.show ? (
// //                       // <Link href={`/build-team/${match.id}`} passHref className="w-full">
// //                       //   <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
// //                       //     Build Team
// //                       //   </Button>
// //                       // </Link>

// //                     // In MatchList component
// //                // This is the correct way to link to your build-team page
// // <Link href={`/build-team/${match.id}`} passHref className="w-full">
// //   <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
// //     Build Team
// //   </Button>
// // </Link>
// //                     ) : (
// //                       <Button 
// //                         disabled 
// //                         className="w-full bg-gray-600 text-gray-300 cursor-not-allowed"
// //                       >
// //                         Update Soon
// //                       </Button>
// //                     )}
// //                   </CardContent>
// //                 </Card>
// //               );
// //             })}
// //         </div>
// //       ) : !isLoading && (
// //         <p className="text-center text-gray-00">No matches found</p>
// //       )}
// //     </div>
// //   );
// // }



// // "use client";

// // import { useEffect, useState } from "react";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import Image from "next/image";
// // import Link from "next/link";
// // import { doc, getDoc } from "firebase/firestore";
// // import { db } from "@/lib/firebase";
// // import { Button } from "../../components/ui/button";

// // const categories = [
// //   { name: "League", key: "League", image: "/IPL.webp" },
// //   { name: "International", key: "International", image: "/international.png" },
// //   { name: "Domestic", key: "Domestic", image: "/Domestic.webp" },
// //   { name: "Women", key: "Women", image: "/Woman.webp" },
// // ];

// // const IPL_TEAM_IMAGES: { [key: string]: string } = {
// //   "Chennai Super Kings": "/images/CSK.png",
// //   "Mumbai Indians": "/images/MI.webp",
// //   "Kolkata Knight Riders": "/images/kkr.png",
// //   "Sunrisers Hyderabad": "/images/SRH2.png",
// //   "Delhi Capitals": "/images/DC.webp",
// //   "Lucknow Super Giants": "/images/LSG2.png",
// //   "Rajasthan Royals": "/images/RR2.png",
// //   "Punjab Kings": "/images/PBKS.webp",
// //   "Gujarat Titans": "/images/GT.webp",
// //   "Royal Challengers Bengaluru": "/images/rcb.png",
// //   "New Zealand": "/images/nz.png",
// //   "Pakistan": "/images/pak.png",
// // };

// // const getTeamImage = (teamName: string) => IPL_TEAM_IMAGES[teamName] || "/fallback2.webp";

// // // Helper function for team abbreviations
// // const getTeamShortName = (teamName: string) => {
// //   const knownAbbreviations: Record<string, string> = {
// //     "Mumbai Indians": "MI",
// //     "Chennai Super Kings": "CSK",
// //     "Kolkata Knight Riders": "KKR",
// //     "Sunrisers Hyderabad": "SRH",
// //     "Delhi Capitals": "DC",
// //     "Lucknow Super Giants": "LSG",
// //     "Rajasthan Royals": "RR",
// //     "Punjab Kings": "PBKS",
// //     "Gujarat Titans": "GT",
// //     "Royal Challengers Bengaluru": "RCB",
// //     "New Zealand": "NZ",
// //     "Pakistan": "PAK",
// //   };

// //   return knownAbbreviations[teamName] || 
// //     teamName.split(' ').map(word => word[0]).join('').toUpperCase();
// // };

// // export default function MatchList() {
// //   const [matches, setMatches] = useState<any[]>([]);
// //   const [activeCategory, setActiveCategory] = useState("League");
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [currentTime, setCurrentTime] = useState(new Date());

// //   const fetchMatches = async () => {
// //     setIsLoading(true);
// //     try {
// //       const docRef = doc(db, "cricket", "upcomingMatches");
// //       const docSnap = await getDoc(docRef);
  
// //       if (docSnap.exists()) {
// //         const data = docSnap.data();
// //         const matchesArray = data.matches || [];
// //         setMatches(matchesArray);
// //       } else {
// //         console.log("No matches found in Firestore");
// //       }
// //     } catch (error) {
// //       console.error("Failed to fetch matches:", error);
  
// //       if (typeof error === 'object' && error !== null && 'code' in error) {
// //         const err = error as { code: string };
// //         if (err.code === 'permission-denied') {
// //           console.error("Firestore permission denied. Check your Firestore rules.");
// //         }
// //       }
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchMatches();
// //     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
// //     return () => clearInterval(timer);
// //   }, []);

// //   const isToday = (timestamp: string) => {
// //     const matchDate = new Date(parseInt(timestamp));
// //     const today = new Date();
// //     return (
// //       matchDate.getDate() === today.getDate() &&
// //       matchDate.getMonth() === today.getMonth() &&
// //       matchDate.getFullYear() === today.getFullYear()
// //     );
// //   };

// //   const getCountdown = (timestamp: string) => {
// //     const matchTime = new Date(parseInt(timestamp)).getTime();
// //     const now = currentTime.getTime();
// //     const diff = matchTime - now;

// //     if (diff <= 0) return "LIVE";

// //     const hours = Math.floor(diff / (1000 * 60 * 60));
// //     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
// //     const seconds = Math.floor((diff % (1000 * 60)) / 1000);

// //     return `${hours}h ${minutes}m ${seconds}s`;
// //   };

// //   const formatFirebaseDate = (timestamp: string) => {
// //     const date = new Date(parseInt(timestamp));
// //     return date.toLocaleDateString("en-US", {
// //       weekday: 'short',
// //       month: 'short',
// //       day: 'numeric'
// //     });
// //   };

// //   const formatFirebaseTime = (timestamp: string) => {
// //     const date = new Date(parseInt(timestamp));
// //     return date.toLocaleTimeString("en-US", {
// //       hour: '2-digit',
// //       minute: '2-digit',
// //       hour12: true
// //     });
// //   };

// //   return (
// //     <div className="p-4">
// //       {/* Category Selector */}
// //       <div className="flex flex-wrap gap-4 mb-6 justify-center">
// //         {categories.map((category) => (
// //           <Button
// //             key={category.key}
// //             onClick={() => setActiveCategory(category.key)}
// //             className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
// //               activeCategory === category.key
// //                 ? "bg-green-600 text-white shadow-md"
// //                 : "bg-gray-200 hover:bg-gray-300 text-gray-800"
// //             }`}
// //           >
// //             <Image
// //               src={category.image}
// //               alt={category.name}
// //               width={24}
// //               height={24}
// //               className="object-contain"
// //             />
// //             {category.name}
// //           </Button>
// //         ))}
// //       </div>

// //       {/* Loading Spinner */}
// //       {isLoading && (
// //         <div className="flex justify-center items-center h-64">
// //           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
// //         </div>
// //       )}

// //       {/* Matches Grid */}
// //       {!isLoading && matches.length > 0 ? (
// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
// //           {matches
// //             .filter((match: any) => match.matchType === activeCategory)
// //             .map((match: any) => {
// //               const todayMatch = isToday(match.date);
// //               const countdown = todayMatch ? getCountdown(match.date) : null;
// //               const isLive = countdown === "LIVE";

// //               return (
// //                 <Card
// //                   key={match.id}
// //                   className={`rounded-xl border-gray-700 bg-gray-800 text-white shadow-lg hover:shadow-xl transition-shadow ${
// //                     todayMatch ? "border-green-500 border-2" : ""
// //                   }`}
// //                 >
// //                   <CardHeader className="flex flex-col items-center pb-2">   
// //                     <CardTitle className="text-lg font-bold text-center">
// //                       <span className="text-gray-100">{match.team1}</span>{" "}
// //                       <span className="text-gray-400 mx-1">vs</span>{" "}
// //                       <span className="text-gray-100">{match.team2}</span>
// //                     </CardTitle>
// //                   </CardHeader>
// //                   <CardContent className="flex flex-col items-center gap-3">
// //                     {/* Team Images */}
// //                     <div className="flex items-center justify-center gap-4">
// //                       <div className="flex flex-col items-center">
// //                         <div className="relative w-12 h-12">
// //                           <Image
// //                             src={getTeamImage(match.team1)}
// //                             alt={match.team1}
// //                             fill
// //                             className="rounded-full object-contain shadow-md border-2 border-gray-600"
// //                             onError={(e) => {
// //                               (e.target as HTMLImageElement).src = '/fallback.jpg';
// //                             }}
// //                           />
// //                         </div>
// //                         <span className="text-xs mt-1 text-gray-300">
// //                           {getTeamShortName(match.team1)}
// //                         </span>
// //                       </div>
// //                       <span className="text-lg font-semibold text-gray-400">VS</span>
// //                       <div className="flex flex-col items-center">
// //                         <div className="relative w-12 h-12">
// //                           <Image
// //                             src={getTeamImage(match.team2)}
// //                             alt={match.team2}
// //                             fill
// //                             className="rounded-full object-contain shadow-md border-2 border-gray-600"
// //                             onError={(e) => {
// //                               (e.target as HTMLImageElement).src = '/fallback.jpg';
// //                             }}
// //                           />
// //                         </div>
// //                         <span className="text-xs mt-1 text-gray-300">
// //                           {getTeamShortName(match.team2)}
// //                         </span>
// //                       </div>
// //                     </div>

// //                     {/* Match Date & Time */}
// //                     <div className="text-sm text-center bg-gray-700 rounded-lg p-2 w-full">
// //                       <p className="font-semibold text-gray-200">
// //                         {formatFirebaseDate(match.date)}
// //                       </p>
// //                       <p className={`font-semibold ${
// //                         isLive ? "text-green-400 animate-pulse" : "text-gray-200"
// //                       }`}>
// //                         {formatFirebaseTime(match.date)} {todayMatch && `(${countdown})`}
// //                       </p>
// //                     </div>

// //                     {/* Button - Show "View Teams" if match is live, otherwise "Build Team" */}
// //                     {match.show ? (
// //                       <Link href={`/build-team/${match.id}`} passHref className="w-full">
// //                         <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
// //                           {isLive ? "View Teams" : "Build Team"}
// //                         </Button>
// //                       </Link>
// //                     ) : (
// //                       <Button 
// //                         disabled 
// //                         className="w-full bg-gray-600 text-gray-300 cursor-not-allowed"
// //                       >
// //                         Update Soon
// //                       </Button>
// //                     )}
// //                   </CardContent>
// //                 </Card>
// //               );
// //             })}
// //         </div>
// //       ) : !isLoading && (
// //         <p className="text-center text-gray-400">No matches found</p>
// //       )}
// //     </div>
// //   );
// // }








// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Image from "next/image";
// import Link from "next/link";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import { Button } from "../../components/ui/button";

// const categories = [
//   { name: "League", key: "League", image: "/IPL.webp" },
//   { name: "International", key: "International", image: "/international.png" },
//   { name: "Domestic", key: "Domestic", image: "/Domestic.webp" },
//   { name: "Women", key: "Women", image: "/Woman.webp" },
// ];

// const IPL_TEAM_IMAGES: { [key: string]: string } = {
//   "Chennai Super Kings": "/images/CSK.png",
//   "Mumbai Indians": "/images/MI.webp",
//   "Kolkata Knight Riders": "/images/kkr.png",
//   "Sunrisers Hyderabad": "/images/SRH2.png",
//   "Delhi Capitals": "/images/DC.webp",
//   "Lucknow Super Giants": "/images/LSG2.png",
//   "Rajasthan Royals": "/images/RR2.png",
//   "Punjab Kings": "/images/PBKS.webp",
//   "Gujarat Titans": "/images/GT.webp",
//   "Royal Challengers Bengaluru": "/images/rcb.png",
//   "New Zealand": "/images/nz.png",
//   "Pakistan": "/images/pak.png",
// };

// const getTeamImage = (teamName: string) => IPL_TEAM_IMAGES[teamName] || "/fallback2.webp";

// // Helper function for team abbreviations
// const getTeamShortName = (teamName: string) => {
//   const knownAbbreviations: Record<string, string> = {
//     "Mumbai Indians": "MI",
//     "Chennai Super Kings": "CSK",
//     "Kolkata Knight Riders": "KKR",
//     "Sunrisers Hyderabad": "SRH",
//     "Delhi Capitals": "DC",
//     "Lucknow Super Giants": "LSG",
//     "Rajasthan Royals": "RR",
//     "Punjab Kings": "PBKS",
//     "Gujarat Titans": "GT",
//     "Royal Challengers Bengaluru": "RCB",
//     "New Zealand": "NZ",
//     "Pakistan": "PAK",
//   };

//   return knownAbbreviations[teamName] || 
//     teamName.split(' ').map(word => word[0]).join('').toUpperCase();
// };

// export default function MatchList() {
//   const [matches, setMatches] = useState<any[]>([]);
//   const [activeCategory, setActiveCategory] = useState("League");
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentTime, setCurrentTime] = useState(new Date());

//   const fetchMatches = async () => {
//     setIsLoading(true);
//     try {
//       const docRef = doc(db, "cricket", "upcomingMatches");
//       const docSnap = await getDoc(docRef);
  
//       if (docSnap.exists()) {
//         const data = docSnap.data();
//         const matchesArray = data.matches || [];
//         setMatches(matchesArray);
//       } else {
//         console.log("No matches found in Firestore");
//       }
//     } catch (error) {
//       console.error("Failed to fetch matches:", error);
  
//       if (typeof error === 'object' && error !== null && 'code' in error) {
//         const err = error as { code: string };
//         if (err.code === 'permission-denied') {
//           console.error("Firestore permission denied. Check your Firestore rules.");
//         }
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMatches();
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const isToday = (timestamp: string) => {
//     const matchDate = new Date(parseInt(timestamp));
//     const today = new Date();
//     return (
//       matchDate.getDate() === today.getDate() &&
//       matchDate.getMonth() === today.getMonth() &&
//       matchDate.getFullYear() === today.getFullYear()
//     );
//   };

//   const getCountdown = (timestamp: string) => {
//     const matchTime = new Date(parseInt(timestamp)).getTime();
//     const now = currentTime.getTime();
//     const diff = matchTime - now;

//     if (diff <= 0) return "LIVE";

//     const hours = Math.floor(diff / (1000 * 60 * 60));
//     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((diff % (1000 * 60)) / 1000);

//     return `${hours}h ${minutes}m ${seconds}s`;
//   };

//   const formatFirebaseDate = (timestamp: string) => {
//     const date = new Date(parseInt(timestamp));
//     return date.toLocaleDateString("en-US", {
//       weekday: 'short',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const formatFirebaseTime = (timestamp: string) => {
//     const date = new Date(parseInt(timestamp));
//     return date.toLocaleTimeString("en-US", {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   return (
//     <div className="p-4">
//       {/* Category Selector */}
//       <div className="flex flex-wrap gap-4 mb-6 justify-center">
//         {categories.map((category) => (
//           <Button
//             key={category.key}
//             onClick={() => setActiveCategory(category.key)}
//             className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
//               activeCategory === category.key
//                 ? "bg-green-600 text-white shadow-md"
//                 : "bg-gray-200 hover:bg-gray-300 text-gray-800"
//             }`}
//           >
//             <Image
//               src={category.image}
//               alt={category.name}
//               width={24}
//               height={24}
//               className="object-contain"
//             />
//             {category.name}
//           </Button>
//         ))}
//       </div>

//       {/* Loading Spinner */}
//       {isLoading && (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
//         </div>
//       )}

//       {/* Matches Grid */}
//       {!isLoading && matches.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {matches
//             .filter((match: any) => match.matchType === activeCategory)
//             .map((match: any) => {
//               const todayMatch = isToday(match.date);
//               const countdown = todayMatch ? getCountdown(match.date) : null;
//               const isLive = countdown === "LIVE";

//               return (
//                 <Card
//                   key={match.id}
//                   className={`rounded-xl border-gray-700 bg-gray-800 text-white shadow-lg hover:shadow-xl transition-shadow ${
//                     todayMatch ? "border-green-500 border-2" : ""
//                   }`}
//                 >
//                   <CardHeader className="flex flex-col items-center pb-2">   
//                     <CardTitle className="text-lg font-bold text-center">
//                       <span className="text-gray-100">{match.team1}</span>{" "}
//                       <span className="text-gray-400 mx-1">vs</span>{" "}
//                       <span className="text-gray-100">{match.team2}</span>
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="flex flex-col items-center gap-3">
//                     {/* Team Images */}
//                     <div className="flex items-center justify-center gap-4">
//                       <div className="flex flex-col items-center">
//                         <div className="relative w-12 h-12">
//                           <Image
//                             src={getTeamImage(match.team1)}
//                             alt={match.team1}
//                             fill
//                             className="rounded-full object-contain shadow-md border-2 border-gray-600"
//                             onError={(e) => {
//                               (e.target as HTMLImageElement).src = '/fallback.jpg';
//                             }}
//                           />
//                         </div>
//                         <span className="text-xs mt-1 text-gray-300">
//                           {getTeamShortName(match.team1)}
//                         </span>
//                       </div>
//                       <span className="text-lg font-semibold text-gray-400">VS</span>
//                       <div className="flex flex-col items-center">
//                         <div className="relative w-12 h-12">
//                           <Image
//                             src={getTeamImage(match.team2)}
//                             alt={match.team2}
//                             fill
//                             className="rounded-full object-contain shadow-md border-2 border-gray-600"
//                             onError={(e) => {
//                               (e.target as HTMLImageElement).src = '/fallback.jpg';
//                             }}
//                           />
//                         </div>
//                         <span className="text-xs mt-1 text-gray-300">
//                           {getTeamShortName(match.team2)}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Match Date & Time */}
//                     <div className="text-sm text-center bg-gray-700 rounded-lg p-2 w-full">
//                       <p className="font-semibold text-gray-200">
//                         {formatFirebaseDate(match.date)}
//                       </p>
//                       <p className={`font-semibold ${
//                         isLive ? "text-green-400 animate-pulse" : "text-gray-200"
//                       }`}>
//                         {formatFirebaseTime(match.date)} {todayMatch && `(${countdown})`}
//                       </p>
//                     </div>

//                     {/* Button - Show "View Teams" if match is live, otherwise "Build Team" */}
//                     {match.show ? (
//                       <Link href={`/build-team/${match.id}`} passHref className="w-full">
//                         <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
//                           {isLive ? "View Teams" : "Build Team"}
//                         </Button>
//                       </Link>
//                     ) : (
//                       <Button 
//                         disabled 
//                         className="w-full bg-gray-600 text-gray-300 cursor-not-allowed"
//                       >
//                         Update Soon
//                       </Button>
//                     )}
//                   </CardContent>
//                 </Card>
//               );
//             })}
//         </div>
//       ) : !isLoading && (
//         <p className="text-center text-gray-400">No matches found</p>
//       )}
//     </div>
//   );
// }









// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Image from "next/image";
// import Link from "next/link";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import { Button } from "../../components/ui/button";

// const categories = [
//   { name: "League", key: "League", image: "/IPL.webp" },
//   { name: "International", key: "International", image: "/international.png" },
//   { name: "Domestic", key: "Domestic", image: "/Domestic.webp" },
//   { name: "Women", key: "Women", image: "/Woman.webp" },
// ];

// const IPL_TEAM_IMAGES: { [key: string]: string } = {
//   "Chennai Super Kings": "/images/CSK.png",
//   "Mumbai Indians": "/images/MI.webp",
//   "Kolkata Knight Riders": "/images/kkr.png",
//   "Sunrisers Hyderabad": "/images/SRH2.png",
//   "Delhi Capitals": "/images/DC.webp",
//   "Lucknow Super Giants": "/images/LSG2.png",
//   "Rajasthan Royals": "/images/RR2.png",
//   "Punjab Kings": "/images/PBKS.webp",
//   "Gujarat Titans": "/images/GT.webp",
//   "Royal Challengers Bengaluru": "/images/rcb.png",
//   "New Zealand": "/images/nz.png",
//   "Pakistan": "/images/pak.png",
// };

// const getTeamImage = (teamName: string) => IPL_TEAM_IMAGES[teamName] || "/fallback2.webp";

// // Helper function for team abbreviations
// const getTeamShortName = (teamName: string) => {
//   const knownAbbreviations: Record<string, string> = {
//     "Mumbai Indians": "MI",
//     "Chennai Super Kings": "CSK",
//     "Kolkata Knight Riders": "KKR",
//     "Sunrisers Hyderabad": "SRH",
//     "Delhi Capitals": "DC",
//     "Lucknow Super Giants": "LSG",
//     "Rajasthan Royals": "RR",
//     "Punjab Kings": "PBKS",
//     "Gujarat Titans": "GT",
//     "Royal Challengers Bengaluru": "RCB",
//     "New Zealand": "NZ",
//     "Pakistan": "PAK",
//   };

//   return knownAbbreviations[teamName] || 
//     teamName.split(' ').map(word => word[0]).join('').toUpperCase();
// };

// export default function MatchList() {
//   const [matches, setMatches] = useState<any[]>([]);
//   const [activeCategory, setActiveCategory] = useState("League");
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentTime, setCurrentTime] = useState(new Date());

//   const fetchMatches = async () => {
//     setIsLoading(true);
//     try {
//       const docRef = doc(db, "cricket", "upcomingMatches");
//       const docSnap = await getDoc(docRef);
  
//       if (docSnap.exists()) {
//         const data = docSnap.data();
//         const matchesArray = data.matches || [];
//         setMatches(matchesArray);
//       } else {
//         console.log("No matches found in Firestore");
//       }
//     } catch (error) {
//       console.error("Failed to fetch matches:", error);
  
//       if (typeof error === 'object' && error !== null && 'code' in error) {
//         const err = error as { code: string };
//         if (err.code === 'permission-denied') {
//           console.error("Firestore permission denied. Check your Firestore rules.");
//         }
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMatches();
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const isToday = (timestamp: string) => {
//     const matchDate = new Date(parseInt(timestamp));
//     const today = new Date();
//     return (
//       matchDate.getDate() === today.getDate() &&
//       matchDate.getMonth() === today.getMonth() &&
//       matchDate.getFullYear() === today.getFullYear()
//     );
//   };

//   const getCountdown = (timestamp: string) => {
//     const matchTime = new Date(parseInt(timestamp)).getTime();
//     const now = currentTime.getTime();
//     const diff = matchTime - now;

//     if (diff <= 0) return "LIVE";

//     const hours = Math.floor(diff / (1000 * 60 * 60));
//     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((diff % (1000 * 60)) / 1000);

//     return `${hours}h ${minutes}m ${seconds}s`;
//   };

//   const formatFirebaseDate = (timestamp: string) => {
//     const date = new Date(parseInt(timestamp));
//     return date.toLocaleDateString("en-US", {
//       weekday: 'short',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const formatFirebaseTime = (timestamp: string) => {
//     const date = new Date(parseInt(timestamp));
//     return date.toLocaleTimeString("en-US", {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   return (
//     <div className="p-4">
//       {/* Category Selector */}
//       <div className="flex flex-wrap gap-4 mb-6 justify-center">
//         {categories.map((category) => (
//           <Button
//             key={category.key}
//             onClick={() => setActiveCategory(category.key)}
//             className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
//               activeCategory === category.key
//                 ? "bg-green-600 text-white shadow-md"
//                 : "bg-gray-200 hover:bg-gray-300 text-gray-800"
//             }`}
//           >
//             <Image
//               src={category.image}
//               alt={category.name}
//               width={24}
//               height={24}
//               className="object-contain"
//             />
//             {category.name}
//           </Button>
//         ))}
//       </div>

//       {/* Loading Spinner */}
//       {isLoading && (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
//         </div>
//       )}

//       {/* Matches Grid */}
//       {!isLoading && matches.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {matches
//             .filter((match: any) => match.matchType === activeCategory)
//             .map((match: any) => {
//               const todayMatch = isToday(match.date);
//               const countdown = todayMatch ? getCountdown(match.date) : null;
//               const isLive = countdown === "LIVE";

//               return (
//                 <Card
//                   key={match.id}
//                   className={`rounded-xl border-gray-700 bg-gray-800 text-white shadow-lg hover:shadow-xl transition-shadow ${
//                     todayMatch ? "border-green-500 border-2" : ""
//                   }`}
//                 >
//                   <CardHeader className="flex flex-col items-center pb-2">   
//                     <CardTitle className="text-lg font-bold text-center">
//                       <span className="text-gray-100">{match.team1}</span>{" "}
//                       <span className="text-gray-400 mx-1">vs</span>{" "}
//                       <span className="text-gray-100">{match.team2}</span>
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="flex flex-col items-center gap-3">
//                     {/* Team Images */}
//                     <div className="flex items-center justify-center gap-4">
//                       <div className="flex flex-col items-center">
//                         <div className="relative w-12 h-12">
//                           <Image
//                             src={getTeamImage(match.team1)}
//                             alt={match.team1}
//                             fill
//                             className="rounded-full object-contain shadow-md border-2 border-gray-600"
//                             onError={(e) => {
//                               (e.target as HTMLImageElement).src = '/fallback.jpg';
//                             }}
//                           />
//                         </div>
//                         <span className="text-xs mt-1 text-gray-300">
//                           {getTeamShortName(match.team1)}
//                         </span>
//                       </div>
//                       <span className="text-lg font-semibold text-gray-400">VS</span>
//                       <div className="flex flex-col items-center">
//                         <div className="relative w-12 h-12">
//                           <Image
//                             src={getTeamImage(match.team2)}
//                             alt={match.team2}
//                             fill
//                             className="rounded-full object-contain shadow-md border-2 border-gray-600"
//                             onError={(e) => {
//                               (e.target as HTMLImageElement).src = '/fallback.jpg';
//                             }}
//                           />
//                         </div>
//                         <span className="text-xs mt-1 text-gray-300">
//                           {getTeamShortName(match.team2)}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Match Date & Time */}
//                     <div className="text-sm text-center bg-gray-700 rounded-lg p-2 w-full">
//                       <p className="font-semibold text-gray-200">
//                         {formatFirebaseDate(match.date)}
//                       </p>
//                       <p className={`font-semibold ${
//                         isLive ? "text-green-400 animate-pulse" : "text-gray-200"
//                       }`}>
//                         {formatFirebaseTime(match.date)} {todayMatch && `(${countdown})`}
//                       </p>
//                     </div>

//                     {/* Button - Show "View Teams" if match is live, otherwise "Build Team" */}
//                     {match.show ? (
//                       <Link href={`/build-team/${match.id}`} passHref className="w-full">
//                         <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
//                           {isLive ? "View Teams" : "Build Team"}
//                         </Button>
//                       </Link>
//                     ) : (
//                       <Button 
//                         disabled 
//                         className="w-full bg-gray-600 text-gray-300 cursor-not-allowed"
//                       >
//                         Update Soon
//                       </Button>
//                     )}
//                   </CardContent>
//                 </Card>
//               );
//             })}
//         </div>
//       ) : !isLoading && (
//         <p className="text-center text-gray-400">No matches found</p>
//       )}
//     </div>
//   );
// }


















"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { doc, onSnapshot, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// Fallback images
const FALLBACK_BANNER = "/fallback-banner.jpg";
const FALLBACK_TEAM = "/fallback2.webp"; 
const FALLBACK_ICON = "/fallback-icon.png";

const categories = [
  { name: "League", key: "League", image: "/IPL.webp" },
  { name: "International", key: "International", image: "/international.png" },
  // { name: "Domestic", key: "Domestic", image: "/Domestic.webp" },
  // { name: "Women", key: "Women", image: "/Woman.webp" },
];

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

const getTeamImage = (teamName: string) => IPL_TEAM_IMAGES[teamName] || FALLBACK_TEAM;

const getTeamShortName = (teamName: string) => {
  const knownAbbreviations: Record<string, string> = {
    "Mumbai Indians": "MI",
    "Chennai Super Kings": "CSK",
    "Kolkata Knight Riders": "KKR",
    "Sunrisers Hyderabad": "SRH",
    "Delhi Capitals": "DC",
    "Lucknow Super Giants": "LSG",
    "Rajasthan Royals": "RR",
    "Punjab Kings": "PBKS",
    "Gujarat Titans": "GT",
    "Royal Challengers Bengaluru": "RCB",
    "New Zealand": "NZ",
    "Pakistan": "PAK",
  };

  return knownAbbreviations[teamName] || 
    teamName.split(' ').map(word => word[0]).join('').toUpperCase();
};

interface Match {
  id: string;
  team1: string;
  team2: string;
  date: string;
  matchType: string;
  show?: boolean;
  hide?: boolean;
  status?: 'upcoming' | 'live' | 'completed';
}

interface SliderImage {
  id: string;
  imageUrl: string;
  active: boolean;
}

export default function MatchList() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [activeCategory, setActiveCategory] = useState("League");
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sliderImages, setSliderImages] = useState<SliderImage[]>([]);
  const [api, setApi] = useState<any>();

  // Auto-scroll carousel
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0); // Reset to first slide
      }
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [api]);

  // Fetch matches with real-time updates
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onSnapshot(doc(db, "cricket", "upcomingMatches"), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        const matchesArray = data.matches || [];
        
        // Filter logic:
        // 1. If hide: true - don't show at all
        // 2. If show: true - show with "Build Team" button
        // 3. All others - show with "Update Soon" button
        const filteredMatches = matchesArray.filter((match: Match) => 
          match.hide !== true
        );
        
        setMatches(filteredMatches);
      } else {
        console.log("No matches found in Firestore");
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Fetch slider images
  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const q = query(collection(db, "sliderImages"), where("active", "==", true));
        const querySnapshot = await getDocs(q);
        const images = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as SliderImage[];
        
        setSliderImages(images);
      } catch (error) {
        console.error("Error fetching slider images:", error);
      }
    };

    fetchSliderImages();
  }, []);

  // Update current time every second for countdown
  useEffect(() => {
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

  const getMatchStatus = (timestamp: string): 'upcoming' | 'live' | 'completed' => {
    const matchTime = new Date(parseInt(timestamp)).getTime();
    const now = currentTime.getTime();
    const diff = matchTime - now;
    
    if (now > matchTime + 8 * 60 * 60 * 1000) return 'completed';
    if (diff <= 0) return 'live';
    return 'upcoming';
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

  // Filter matches based on active category
  const filteredMatches = matches.filter((match) => 
    match.matchType === activeCategory
  );

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Full-width Slider Images with auto-scroll */}
      {sliderImages.length > 0 && (
        <div className="mb-6 w-full">
          {sliderImages.length === 1 ? (
            <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden">
              <Image
                src={sliderImages[0].imageUrl}
                alt="Promotional Banner"
                fill
                className="object-cover w-full"
                priority
                unoptimized={!sliderImages[0].imageUrl.startsWith('/')}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_BANNER;
                }}
              />
            </div>
          ) : (
            <Carousel className="w-full" setApi={setApi}>
              <CarouselContent>
                {sliderImages.map((image) => (
                  <CarouselItem key={image.id}>
                    <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden">
                      <Image
                        src={image.imageUrl}
                        alt="Promotional Banner"
                        fill
                        className="object-cover w-full"
                        priority
                        unoptimized={!image.imageUrl.startsWith('/')}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = FALLBACK_BANNER;
                        }}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          )}
        </div>
      )}

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
              onError={(e) => {
                (e.target as HTMLImageElement).src = FALLBACK_ICON;
              }}
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
      {!isLoading && filteredMatches.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMatches.map((match) => {
            const todayMatch = isToday(match.date);
            const countdown = todayMatch ? getCountdown(match.date) : null;
            const status = getMatchStatus(match.date);
            const isLive = status === 'live';
            const isCompleted = status === 'completed';

            return (
              <Card
                key={match.id}
                className={`rounded-xl border-2 ${
                  todayMatch ? "border-green-500" : "border-gray-700"
                } bg-gray-800 text-white shadow-lg hover:shadow-xl transition-shadow`}
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
                            (e.target as HTMLImageElement).src = FALLBACK_TEAM;
                          }}
                        />
                      </div>
                      <span className="text-xs mt-1 text-gray-300">
                        {getTeamShortName(match.team1)}
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
                            (e.target as HTMLImageElement).src = FALLBACK_TEAM;
                          }}
                        />
                      </div>
                      <span className="text-xs mt-1 text-gray-300">
                        {getTeamShortName(match.team2)}
                      </span>
                    </div>
                  </div>

                  {/* Match Date & Time */}
                  <div className="text-sm text-center bg-gray-700 rounded-lg p-2 w-full">
                    <p className="font-semibold text-gray-200">
                      {formatFirebaseDate(match.date)}
                    </p>
                    <p className={`font-semibold ${
                      isLive ? "text-green-400 animate-pulse" : 
                      isCompleted ? "text-gray-400" : 
                      "text-gray-200"
                    }`}>
                      {formatFirebaseTime(match.date)} 
                      {todayMatch && (
                        <span className="ml-1">
                          {isLive ? "(LIVE)" : isCompleted ? "(Completed)" : `(${countdown})`}
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Button Logic */}
                  {match.show === true ? (
                    <Link 
                      href={isCompleted ? `/view-teams/${match.id}` : `/build-team/${match.id}`} 
                      passHref 
                      className="w-full"
                    >
                      <Button 
                        className={`w-full ${
                          isLive ? "bg-green-600 hover:bg-green-700" : 
                          isCompleted ? "bg-blue-600 hover:bg-blue-700" : 
                          "bg-green-600 hover:bg-green-700"
                        } text-white`}
                      >
                        {isLive ? "View Teams" : isCompleted ? "View Results" : "Build Team"}
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
        <p className="text-center text-gray-400">No matches found in this category</p>
      )}
    </div>
  );
}

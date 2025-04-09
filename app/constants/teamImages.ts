// constants/teamImages.ts
export const IPL_TEAM_IMAGES: { [key: string]: string } = {
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
  
  export const getTeamImage = (teamName: string) => IPL_TEAM_IMAGES[teamName] || "/fallback.png";

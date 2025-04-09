import { db } from "@/lib/firebase"; // Ensure correct Firestore import
import { doc, setDoc } from "firebase/firestore";

const saveMatchData = async (matchInfo: { matchId: number; [key: string]: any }) => {
  try {
    const matchId = matchInfo.matchId; // Ensure matchId exists
    if (!matchId) throw new Error("Match ID is missing");

    await setDoc(doc(db, "matchinfo", matchId.toString()), matchInfo);
    console.log("Match data saved successfully!");
  } catch (error: any) {
    console.error("Error saving match data:", error.message);
  }
};

export default saveMatchData;

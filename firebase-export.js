import admin from "firebase-admin";
import dotenv from "dotenv";
import fs from "fs";

// Load environment variables
dotenv.config();

if (!process.env.FIREBASE_CREDENTIALS) {
  console.error("❌ ERROR: FIREBASE_CREDENTIALS not found in .env file");
  process.exit(1);
}

// Parse Firebase credentials from .env
const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Function to export "matchinfo" collection
async function exportMatchInfo() {
  try {
    const matchInfoRef = db.collection("matchinfo");
    const snapshot = await matchInfoRef.get();
    let data = {};

    if (snapshot.empty) {
      console.log("❌ No matchinfo data found.");
      return;
    }

    snapshot.forEach((doc) => {
      data[doc.id] = doc.data(); // Store matchId as key and data as value
    });

    // Save data to JSON file
    fs.writeFileSync("matchinfo_export.json", JSON.stringify(data, null, 2));
    console.log("✅ Matchinfo data exported successfully! Check matchinfo_export.json");
  } catch (error) {
    console.error("❌ Error exporting data:", error);
  }
}

// Run the export function
exportMatchInfo();

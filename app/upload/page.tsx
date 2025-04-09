// app/upload/page.tsx
"use client";

import { db } from "@/lib/firebase";
// import { teamsData } from "@/data/teamsData";
import { doc, setDoc } from "firebase/firestore";
import { teamsData } from "../../data/teamsData";

export default function UploadPage() {
  const uploadData = async () => {
    try {
      // Save KKR players into a document
      await setDoc(doc(db, "teams", "KKR"), {
        players: teamsData.KKR,
      });

      alert("Data uploaded successfully!");
    } catch (error) {
      console.error("Error uploading data:", error);
      alert("Failed to upload data.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Upload IPL Data</h1>
      <button
        onClick={uploadData}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Upload KKR Data to Firestore
      </button>
    </div>
  );
}

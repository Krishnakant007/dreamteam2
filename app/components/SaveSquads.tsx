// // "use client";

// // import { useState } from "react";
// // import axios from "axios";
// // import { db } from "@/lib/firebase";
// // import { collection, addDoc } from "firebase/firestore";

// // export default function SaveSquads() {
// //   const [loading, setLoading] = useState(false);
// //   const [message, setMessage] = useState("");

// //   const fetchAndSaveSquads = async () => {
// //     setLoading(true);
// //     setMessage("");

// //     try {
// //       const response = await axios.get(
// //         "https://crickbuzz-official-apis.p.rapidapi.com/series/9237/squads",
// //         {
// //           headers: {
// //             "x-rapidapi-key": 'f9c535f364msh414263ea65fd263p118929jsnb82ba1475d3a',
// //             "x-rapidapi-host": "crickbuzz-official-apis.p.rapidapi.com",
// //           },
// //         }
// // //       );

// // //       const squadsData = response.data;
// // //       const squadsCollection = collection(db, "cricket");

// // //       // Save each squad to Firestore
// // //       await addDoc(squadsCollection, {
// // //         squads: squadsData,
// // //         createdAt: new Date(),
// // //       });

// // //       setMessage("Squads saved to Firestore successfully!");
// // //     } catch (error) {
// // //       console.error("Error fetching/saving squads:", error);
// // //       setMessage("Failed to save squads.");
// // //     }

// // //     setLoading(false);
// // //   };

// // //   return (
// // //     <div className="p-4">
// // //       <button
// // //         onClick={fetchAndSaveSquads}
// // //         disabled={loading}
// // //         className="bg-blue-500 text-white p-2 rounded"
// // //       >
// // //         {loading ? "Saving..." : "Fetch & Save Squads"}
// // //       </button>
// // //       {message && <p className="mt-2">{message}</p>}
// // //     </div>
// // //   );
// // // }


// // "use client";

// // import { useState } from "react";

// // export default function UpdateSquads() {
// //   const [loading, setLoading] = useState(false);
// //   const [message, setMessage] = useState("");

// //   const handleUpdateSquads = async () => {
// //     setLoading(true);
// //     setMessage("");

// //     try {
// //       const response = await fetch("/api/squads");
// //       const data = await response.json();

// //       if (response.ok) {
// //         setMessage("Squads updated successfully!");
// //       } else {
// //         setMessage("Error: " + data.error);
// //       }
// //     } catch (error) {
// //       setMessage("Failed to connect to API.");
// //       console.error(error);
// //     }

// //     setLoading(false);
// //   };

// //   return (
// //     <div className="p-4">
// //       <button
// //         onClick={handleUpdateSquads}
// //         disabled={loading}
// //         className="bg-blue-500 text-white p-2 rounded"
// //       >
// //         {loading ? "Updating..." : "Update Squads"}
// //       </button>
// //       {message && <p className="mt-2">{message}</p>}
// //     </div>
// //   );
// // }



// "use client";

// import { useState } from "react";

// export default function FetchSquad() {
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleFetchSquad = async () => {
//     setLoading(true);
//     setMessage("");

//     try {
//       const response = await fetch("/api/squads1");
//       const data = await response.json();

//       if (response.ok) {
//         setMessage("Squad saved successfully!");
//       } else {
//         setMessage("Error: " + data.error);
//       }
//     } catch (error) {
//       setMessage("Failed to connect to API.");
//       console.error(error);
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="p-4">
//       <button
//         onClick={handleFetchSquad}
//         disabled={loading}
//         className="bg-blue-500 text-white p-2 rounded"
//       >
//         {loading ? "Saving..." : "Fetch & Save Squad"}
//       </button>
//       {message && <p className="mt-2">{message}</p>}
//     </div>
//   );
// }

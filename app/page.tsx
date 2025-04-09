// import Image from "next/image";
// import MatchList from "./components/MatchList";
// import Header from "./components/Header";

// export default function Home() {
//   return (
//     <div >
      
//      <MatchList />
//     </div>
//   );
// }




// // app/app.tsx
// "use client";

// import { useUser } from '@clerk/nextjs';
// import { useEffect } from 'react';
// import { doc, setDoc, getDoc } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import MatchList from "./components/MatchList";
// import Header from "./components/Header";
// import Image from "next/image";


// export default function Home() {
//   const { user } = useUser();

//   useEffect(() => {
//     const createUserIfNotExists = async () => {
//       if (user) {
//         const userRef = doc(db, 'users', user.id);
//         const docSnap = await getDoc(userRef);

//         if (!docSnap.exists()) {
//           await setDoc(userRef, {
//             id: user.id,
//             email: user.emailAddresses[0].emailAddress,
//             name: user.fullName,
//             createdAt: new Date(),
//           });
//         }
//       }
//     };

//     createUserIfNotExists();
//   }, [user]);

//   return (
//     <div>
//       <Header />
      
//       <MatchList />
//     </div>
//   );
// }





"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import MatchList from "./components/MatchList";
import Header from "./components/Header";

export default function Home() {
  const { user } = useUser();

  useEffect(() => {
    const createUserIfNotExists = async () => {
      if (user) {
        const userRef = doc(db, "users", user.id);
        const docSnap = await getDoc(userRef);

        const userData = {
          id: user.id,
          email: user.emailAddresses[0].emailAddress,
          name: user.fullName,
          createdAt: new Date(),
        };

        if (!docSnap.exists()) {
          await setDoc(userRef, userData);
        }

        // Save user data to localStorage
        localStorage.setItem("user", JSON.stringify(userData));
      }
    };

    createUserIfNotExists();
  }, [user]);

  return (
    <div>
     
      <MatchList />
    </div>
  );
}










// 'use client';

// import { useState } from 'react';
// import axios from 'axios';

// export default function MatchPage() {
//   const [data, setData] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const fetchMatchData = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.get('/api/cricket'); // local API route
//       setData(response.data);
//     } catch (err: any) {
//       setError('Error fetching data');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       <button
//         onClick={fetchMatchData}
//         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//       >
//         Fetch Match Data
//       </button>

//       {loading && <p className="mt-4 text-yellow-500">Loading...</p>}
//       {error && <p className="mt-4 text-red-500">{error}</p>}

//       {data && (
//         <pre className="mt-4 bg-gray-900 text-white p-4 rounded overflow-auto">
//           {JSON.stringify(data, null, 2)}
//         </pre>
//       )}
//     </div>
//   );
// }



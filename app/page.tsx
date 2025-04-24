




// "use client";

// import { useUser } from "@clerk/nextjs";
// import { useEffect } from "react";
// import { doc, setDoc, getDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import MatchList from "./components/MatchList";
// import Header from "./components/Header";

// export default function Home() {
//   const { user } = useUser();

//   useEffect(() => {
//     const createUserIfNotExists = async () => {
//       if (user) {
//         const userRef = doc(db, "users", user.id);
//         const docSnap = await getDoc(userRef);

//         const userData = {
//           id: user.id,
//           email: user.emailAddresses[0].emailAddress,
//           name: user.fullName,
//           createdAt: new Date(),
//         };

//         if (!docSnap.exists()) {
//           await setDoc(userRef, userData);
//         }

//         // Save user data to localStorage
//         localStorage.setItem("user", JSON.stringify(userData));
//       }
//     };

//     createUserIfNotExists();
//   }, [user]);

//   return (
//     <div>
     
//       <MatchList />
//     </div>
//   );
// }






// "use client";

// import { useUser } from "@clerk/nextjs";
// import { useEffect } from "react";
// import { doc, setDoc, getDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import MatchList from "./components/MatchList";

// import { toast } from "sonner";
// import { increment } from "firebase/firestore";

// export default function Home() {
//   const { user } = useUser();

//   useEffect(() => {
//     const createUserIfNotExists = async () => {
//       if (user) {
//         const userRef = doc(db, "users", user.id);
//         const docSnap = await getDoc(userRef);

//         const userData = {
//           id: user.id,
//           email: user.emailAddresses[0]?.emailAddress || '',
//           name: user.fullName || '',
//           createdAt: new Date().toISOString(),
//           credits: 100, // Default 100 credits for new users
//           firstTimeBonusGiven: true, // Mark that bonus has been given
//         };

//         if (!docSnap.exists()) {
//           // New user - set with bonus credits
//           await setDoc(userRef, userData);
//           toast.success("Welcome! ₹100 bonus credits added to your account");
//         } else if (!docSnap.data().firstTimeBonusGiven) {
//           // Existing user who hasn't received bonus
//           await setDoc(userRef, {
//             ...userData,
//             credits: increment(100),
//             firstTimeBonusGiven: true
//           }, { merge: true });
//           toast.success("₹100 bonus credits added to your account");
//         }

//         // Save user data to localStorage
//         localStorage.setItem("user", JSON.stringify({
//           ...userData,
//           credits: docSnap.exists() ? 
//             (docSnap.data().firstTimeBonusGiven ? 
//               docSnap.data().credits : 
//               (docSnap.data().credits || 0) + 100) : 
//             100
//         }));
//       }
//     };

//     createUserIfNotExists();
//   }, [user]);

//   return (
//     <div>
    
//       <MatchList />
//     </div>
//   );
// }








// "use client";

// import { useUser } from "@clerk/nextjs";
// import { useEffect } from "react";
// import { doc, setDoc, getDoc, increment } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import MatchList from "./components/MatchList";
// import { toast } from "sonner";
// import Script from "next/script"; // ✅ Import Script

// export default function Home() {
//   const { user } = useUser();

//   useEffect(() => {
//     const createUserIfNotExists = async () => {
//       if (user) {
//         const userRef = doc(db, "users", user.id);
//         const docSnap = await getDoc(userRef);

//         const userData = {
//           id: user.id,
//           email: user.emailAddresses[0]?.emailAddress || '',
//           name: user.fullName || '',
//           createdAt: new Date().toISOString(),
//           credits: 100,
//           firstTimeBonusGiven: true,
//         };

//         if (!docSnap.exists()) {
//           await setDoc(userRef, userData);
//           toast.success("Welcome! ₹100 bonus credits added to your account");
//         } else if (!docSnap.data().firstTimeBonusGiven) {
//           await setDoc(userRef, {
//             ...userData,
//             credits: increment(100),
//             firstTimeBonusGiven: true
//           }, { merge: true });
//           toast.success("₹100 bonus credits added to your account");
//         }

//         localStorage.setItem("user", JSON.stringify({
//           ...userData,
//           credits: docSnap.exists() ? 
//             (docSnap.data().firstTimeBonusGiven ? 
//               docSnap.data().credits : 
//               (docSnap.data().credits || 0) + 100) : 
//             100
//         }));
//       }
//     };

//     createUserIfNotExists();
//   }, [user]);

//   return (
//     <>
//       {/* ✅ Google Ads conversion tracking */}
//       <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-16980292455" />
//       <Script id="google-conversion" strategy="afterInteractive">
//         {`
//           window.dataLayer = window.dataLayer || [];
//           function gtag(){dataLayer.push(arguments);}
//           gtag('js', new Date());
//           gtag('config', 'AW-16980292455');

//           gtag('event', 'conversion', {
//               'send_to': 'AW-16980292455/Okt9CILHwLUaEOfm6qA_',
//               'value': 1.0,
//               'currency': 'INR',
//               'transaction_id': ''
//           });
//         `}
//       </Script>

//       <div>
//         <MatchList />
//       </div>
//     </>
//   );
// }








"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { doc, setDoc, getDoc, increment } from "firebase/firestore";
import { db } from "@/lib/firebase";
import MatchList from "./components/MatchList";
import { toast } from "sonner";
import Script from "next/script";

export default function Home() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const createUserIfNotExists = async () => {
      if (!isLoaded || !user) return;

      try {
        // Extract email prefix for document ID (e.g., "krish0007" from "krish0007@gmail.com")
        const email = user.emailAddresses[0]?.emailAddress || '';
        const docId = email.split('@')[0] + '_here'; // Format: krish0007_here
        
        const userRef = doc(db, "users", docId);
        const docSnap = await getDoc(userRef);

        // Prepare user data
        const userData = {
          id: user.id,
          email,
          name: user.fullName || '',
          createdAt: new Date().toISOString(),
          credits: 100,
          firstTimeBonusGiven: true,
          clerkId: user.id, // Store Clerk ID for reference
          docId // Store the custom document ID
        };

        // Only write if document doesn't exist
        if (!docSnap.exists()) {
          await setDoc(userRef, userData);
          toast.success("Welcome! ₹100 bonus credits added to your account");
        } else if (!docSnap.data().firstTimeBonusGiven) {
          await setDoc(userRef, {
            ...userData,
            credits: increment(100),
            firstTimeBonusGiven: true
          }, { merge: true });
          toast.success("₹100 bonus credits added to your account");
        }

        // Cache user data for instant access
        localStorage.setItem("user", JSON.stringify({
          ...userData,
          credits: docSnap.exists() ? 
            (docSnap.data().firstTimeBonusGiven ? 
              docSnap.data().credits : 
              docSnap.data().credits + 100) : 
            100
        }));

      } catch (error) {
        console.error("Error creating user:", error);
        toast.error("Error setting up your account. Please refresh the page.");
      }
    };

    // Use requestIdleCallback for non-critical initialization
    if (typeof window !== 'undefined') {
      window.requestIdleCallback(() => {
        createUserIfNotExists();
      }, { timeout: 1000 });
    }
  }, [user, isLoaded]);

  return (
    <>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-16980292455" />
      <Script id="google-conversion" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-16980292455');
          gtag('event', 'conversion', {
              'send_to': 'AW-16980292455/Okt9CILHwLUaEOfm6qA_',
              'value': 1.0,
              'currency': 'INR',
              'transaction_id': ''
          });
        `}
      </Script>

      <div>
        <MatchList />
      </div>
    </>
  );
}




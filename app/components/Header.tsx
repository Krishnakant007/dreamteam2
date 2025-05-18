
// // components/Header.tsx
// "use client";

// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { SignedIn, SignedOut, SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
// import dynamic from 'next/dynamic';
// import { PlusCircle, Wallet } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { db } from "@/lib/firebase";
// import { doc, onSnapshot } from "firebase/firestore";
// import { toast } from "sonner";
// import { PaymentDialog } from "./PaymentDialog";

// const UserButton = dynamic(
//   () => import("@clerk/nextjs").then((mod) => mod.UserButton),
//   { 
//     ssr: false,
//     loading: () => <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
//   }
// );

// export default function Header() {
//   const { isLoaded, user } = useUser();
//   const [balance, setBalance] = useState<number>(0);
//   const [showPaymentDialog, setShowPaymentDialog] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isProcessingPayment, setIsProcessingPayment] = useState(false);

//   useEffect(() => {
//     if (!isLoaded || !user) {
//       setIsLoading(false);
//       return;
//     }

//     const userRef = doc(db, "users", user.id);
//     const unsubscribe = onSnapshot(userRef, (doc) => {
//       if (doc.exists()) {
//         setBalance(doc.data().credits || 0);
//       }
//       setIsLoading(false);
//     });

//     return () => unsubscribe();
//   }, [isLoaded, user]);

//   const handlePaymentSuccess = (amount: number) => {
//     toast.success(`₹${amount} added to your wallet!`);
//     setShowPaymentDialog(false);
//   };

//   return (
//     <header className="flex justify-between items-center px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-green-900 to-gray-800 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
//       <div className="flex items-center gap-4 md:gap-6">
//         <Link href="/" className="flex items-center gap-2 group">
//           <div className="flex-shrink-0 cursor-pointer ">
//             <img 
//               src="/logo.png" 
//               alt="logo" 
//               className="w-8 h-8 md:w-10 md:h-10 object-contain" 
//             />
//           </div>
//           <span className="text-xl font-bold hidden sm:inline bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
//             Fantasy Team
//           </span>
//         </Link>
//         <nav className="hidden sm:flex items-center gap-6">
//           <Link href="/" className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
//               <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
//             </svg>
//             <span className="font-medium">Home</span>
//           </Link>
//           <Link href="/history" className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
//             </svg>
//             <span className="font-medium">History</span>
//           </Link>
//         </nav>
//       </div>

//       <div className="flex items-center gap-3 sm:gap-4 md:space-x-6 lg:space-x-10 xl:space-x-16">
//         <Button
//           variant="ghost"
//           onClick={() => setShowPaymentDialog(true)}
//           disabled={isLoading || isProcessingPayment}
//           className="flex items-center gap-1 sm:gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 transition-all hover:shadow-lg"
//         >
//           <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
//           {isProcessingPayment ? (
//             <div className="flex items-center gap-2">
//               <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-t-2 border-b-2 border-cyan-400"></div>
//               <span className="text-xs sm:text-sm text-cyan-400">Processing...</span>
//             </div>
//           ) : (
//             <>
//               <span className="font-bold text-sm sm:text-base text-green-500">
//                 ₹{balance.toLocaleString('en-IN')}
//               </span>
//               <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300" />
//             </>
//           )}
//         </Button>

//         <PaymentDialog
//           open={showPaymentDialog}
//           onOpenChange={(open) => {
//             setShowPaymentDialog(open);
//             if (!open) setIsProcessingPayment(false);
//           }}
//           currentBalance={balance}
//           requiredAmount={100}
//           onPaymentSuccess={handlePaymentSuccess}
//           onProcessingStateChange={setIsProcessingPayment}
//         />

//         {isLoaded ? (
//           <>
//             <SignedIn>
//               <div className="border-2 border-gray-700 rounded-full hover:border-cyan-400 transition-colors">
//                 <UserButton 
//                   afterSignOutUrl="/" 
//                   appearance={{
//                     elements: {
//                       userButtonAvatarBox: "w-8 h-8 sm:w-9 sm:h-9",
//                       userButtonPopoverCard: "bg-gray-800 border border-gray-700"
//                     }
//                   }}
//                 />
//               </div>
//             </SignedIn>
//             <SignedOut>
//               <div className="flex gap-2 sm:gap-3">
//                 <SignInButton mode="modal">
//                   <Button className="bg-transparent hover:bg-gray-700 text-white border border-gray-600 rounded-xl px-3 sm:px-4 py-1.5 text-sm sm:text-base">
//                     Sign In
//                   </Button>
//                 </SignInButton>
//                 <SignUpButton mode="modal">
//                   <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl px-3 sm:px-4 py-1.5 text-sm sm:text-base shadow-lg">
//                     Sign Up
//                   </Button>
//                 </SignUpButton>
//               </div>
//             </SignedOut>
//           </>
//         ) : (
//           <div className="flex gap-2">
//             <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-700 animate-pulse" />
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }




// // 2


// "use client";

// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { SignedIn, SignedOut, SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
// import dynamic from 'next/dynamic';
// import { PlusCircle, Wallet } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { db } from "@/lib/firebase";
// import { doc, onSnapshot } from "firebase/firestore";
// import { toast } from "sonner";
// import { PaymentDialog } from "./PaymentDialog";

// const UserButton = dynamic(
//   () => import("@clerk/nextjs").then((mod) => mod.UserButton),
//   { 
//     ssr: false,
//     loading: () => <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
//   }
// );

// export default function Header() {
//   const { isLoaded, user } = useUser();
//   const [balance, setBalance] = useState<number>(0);
//   const [showPaymentDialog, setShowPaymentDialog] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isProcessingPayment, setIsProcessingPayment] = useState(false);

//   useEffect(() => {
//     if (!isLoaded || !user) {
//       setIsLoading(false);
//       return;
//     }

//     const userRef = doc(db, "users", user.id);
//     const unsubscribe = onSnapshot(userRef, (doc) => {
//       if (doc.exists()) {
//         setBalance(doc.data().credits || 0);
//       }
//       setIsLoading(false);
//     });

//     return () => unsubscribe();
//   }, [isLoaded, user]);

//   const handlePaymentSuccess = (amount: number) => {
//     toast.success(`₹${amount} added to your wallet!`);
//     setShowPaymentDialog(false);
//   };

//   return (
//     <header className="flex justify-between items-center px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-green-900 to-gray-800 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
//       <div className="flex items-center gap-4 md:gap-6">
//         <Link href="/" className="flex items-center gap-2 group">
//           <div className="flex-shrink-0 cursor-pointer ">
//             <img 
//               src="/logo.png" 
//               alt="logo" 
//               className="w-8 h-8 md:w-10 md:h-10 object-contain" 
//             />
//           </div>
//           <span className="text-xl font-bold hidden sm:inline bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
//             Fantasy Team
//           </span>
//         </Link>
//         <nav className="hidden sm:flex items-center gap-6">
//           <Link href="/" className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
//               <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
//             </svg>
//             <span className="font-medium">Home</span>
//           </Link>
//           <Link href="/history" className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
//             </svg>
//             <span className="font-medium">History</span>
//           </Link>
//         </nav>
//       </div>

//       <div className="flex items-center gap-3 sm:gap-4 md:space-x-6 lg:space-x-10 xl:space-x-16">
//         <Button
//           variant="ghost"
//           onClick={() => setShowPaymentDialog(true)}
//           disabled={isLoading || isProcessingPayment}
//           className="flex items-center gap-1 sm:gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 transition-all hover:shadow-lg"
//         >
//           <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
//           {isProcessingPayment ? (
//             <div className="flex items-center gap-2">
//               <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-t-2 border-b-2 border-cyan-400"></div>
//               <span className="text-xs sm:text-sm text-cyan-400">Processing...</span>
//             </div>
//           ) : (
//             <>
//               <span className="font-bold text-sm sm:text-base text-green-500">
//                 ₹{balance.toLocaleString('en-IN')}
//               </span>
//               <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300" />
//             </>
//           )}
//         </Button>

//         <PaymentDialog
//           open={showPaymentDialog}
//           onOpenChange={(open) => {
//             setShowPaymentDialog(open);
//             if (!open) setIsProcessingPayment(false);
//           }}
//           currentBalance={balance}
//           requiredAmount={1} // Changed to allow ₹1 minimum
//           onPaymentSuccess={handlePaymentSuccess}
//           onProcessingStateChange={setIsProcessingPayment}
//         />

//         {isLoaded ? (
//           <>
//             <SignedIn>
//               <div className="border-2 border-gray-700 rounded-full hover:border-cyan-400 transition-colors">
//                 <UserButton 
//                   afterSignOutUrl="/" 
//                   appearance={{
//                     elements: {
//                       userButtonAvatarBox: "w-8 h-8 sm:w-9 sm:h-9",
//                       userButtonPopoverCard: "bg-gray-800 border border-gray-700"
//                     }
//                   }}
//                 />
//               </div>
//             </SignedIn>
//             <SignedOut>
//               <div className="flex gap-2 sm:gap-3">
//                 <SignInButton mode="modal">
//                   <Button className="bg-transparent hover:bg-gray-700 text-white border border-gray-600 rounded-xl px-3 sm:px-4 py-1.5 text-sm sm:text-base">
//                     Sign In
//                   </Button>
//                 </SignInButton>
//                 <SignUpButton mode="modal">
//                   <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl px-3 sm:px-4 py-1.5 text-sm sm:text-base shadow-lg">
//                     Sign Up
//                   </Button>
//                 </SignUpButton>
//               </div>
//             </SignedOut>
//           </>
//         ) : (
//           <div className="flex gap-2">
//             <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-700 animate-pulse" />
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }




// // // components/Header.tsx
// // "use client";

// // import Link from "next/link";
// // import { useState, useEffect } from "react";
// // import { SignedIn, SignedOut, SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
// // import dynamic from 'next/dynamic';
// // import { PlusCircle, Wallet } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import { db } from "@/lib/firebase";
// // import { doc, onSnapshot } from "firebase/firestore";
// // import { toast } from "sonner";
// // import { PaymentDialog } from "./PaymentDialog";

// // const UserButton = dynamic(
// //   () => import("@clerk/nextjs").then((mod) => mod.UserButton),
// //   { 
// //     ssr: false,
// //     loading: () => <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
// //   }
// // );

// // export default function Header() {
// //   const { isLoaded, user } = useUser();
// //   const [balance, setBalance] = useState<number>(0);
// //   const [showPaymentDialog, setShowPaymentDialog] = useState(false);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [isProcessingPayment, setIsProcessingPayment] = useState(false);

// //   useEffect(() => {
// //     if (!isLoaded || !user) {
// //       setIsLoading(false);
// //       return;
// //     }

// //     const userRef = doc(db, "users", user.id);
// //     const unsubscribe = onSnapshot(userRef, (doc) => {
// //       if (doc.exists()) {
// //         setBalance(doc.data().credits || 0);
// //       }
// //       setIsLoading(false);
// //     });

// //     return () => unsubscribe();
// //   }, [isLoaded, user]);

// //   const handlePaymentSuccess = (amount: number) => {
// //     // We don't need to manually update balance here because:
// //     // 1. The onSnapshot listener will automatically update it from Firestore
// //     // 2. This prevents double updates (once from handler, once from Firestore)
// //     toast.success(`₹${amount} added to your wallet!`);
// //     setShowPaymentDialog(false);
// //   };

// //   return (
// //     <header className="flex justify-between items-center p-4 bg-gradient-to-r from-green-900 to-gray-800 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
// //       <div className="flex items-center gap-4 md:gap-6">
// //         <Link href="/" className="flex items-center gap-1 group">
// //           <div className="">
// //             <img src="/logo.png" alt="logo" className="w-8 h-8 md:w-10 md:h-10" />
// //           </div>
// //           <span className="text-xl font-bold hidden sm:inline bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
// //             Fantasy Team
// //           </span>
// //         </Link>
// //         <nav className="flex items-center gap-6">
// //           <Link href="/" className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors">
// //             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
// //               <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
// //             </svg>
// //             <span className="font-medium">Home</span>
// //           </Link>
// //           <Link href="/history" className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors">
// //             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
// //               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
// //             </svg>
// //             <span className="font-medium">History</span>
// //           </Link>
// //         </nav>
// //       </div>

// //       <div className="flex items-center gap-4 space-x-10 xl:space-x-24">
// //         <Button
// //           variant="ghost"
// //           onClick={() => setShowPaymentDialog(true)}
// //           disabled={isLoading || isProcessingPayment}
// //           className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl px-4 py-2 transition-all hover:shadow-lg"
// //         >
// //           <Wallet className="w-5 h-5 text-cyan-400" />
// //           {isProcessingPayment ? (
// //             <div className="flex items-center gap-2">
// //               <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-cyan-400"></div>
// //               <span className="text-sm text-cyan-400">Processing...</span>
// //             </div>
// //           ) : (
// //             <>
// //               <span className="font-bold bg-gradient-to-r text-green-500">
// //                 ₹{balance.toLocaleString('en-IN')}
// //               </span>
// //               <PlusCircle className="text-cyan-300" />
// //             </>
// //           )}
// //         </Button>

// //         <PaymentDialog
// //           open={showPaymentDialog}
// //           onOpenChange={(open) => {
// //             setShowPaymentDialog(open);
// //             if (!open) setIsProcessingPayment(false);
// //           }}
// //           currentBalance={balance}
// //           requiredAmount={10}
// //           onPaymentSuccess={handlePaymentSuccess}
// //           onProcessingStateChange={setIsProcessingPayment}
// //         />

// //         {isLoaded ? (
// //           <>
// //             <SignedIn>
// //               <div className="border-2 border-gray-700 rounded-full hover:border-cyan-400 transition-colors">
// //                 <UserButton 
// //                   afterSignOutUrl="/" 
// //                   appearance={{
// //                     elements: {
// //                       userButtonAvatarBox: "w-9 h-9",
// //                       userButtonPopoverCard: "bg-gray-800 border border-gray-700"
// //                     }
// //                   }}
// //                 />
// //               </div>
// //             </SignedIn>
// //             <SignedOut>
// //               <div className="flex gap-3">
// //                 <SignInButton mode="modal">
// //                   <Button className="bg-transparent hover:bg-gray-700 text-white border border-gray-600 rounded-xl px-4">
// //                     Sign In
// //                   </Button>
// //                 </SignInButton>
// //                 <SignUpButton mode="modal">
// //                   <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl px-4 shadow-lg">
// //                     Sign Up
// //                   </Button>
// //                 </SignUpButton>
// //               </div>
// //             </SignedOut>
// //           </>
// //         ) : (
// //           <div className="flex gap-2">
// //             <div className="w-9 h-9 rounded-full bg-gray-700 animate-pulse" />
// //           </div>
// //         )}
// //       </div>
// //     </header>
// //   );
// // }







"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import dynamic from 'next/dynamic';
import { PlusCircle, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { toast } from "sonner";
import { PaymentDialog } from "./PaymentDialog";

const UserButton = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.UserButton),
  { 
    ssr: false,
    loading: () => <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
  }
);

export default function Header() {
  const { isLoaded, user } = useUser();
  const [balance, setBalance] = useState<number>(0);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    if (!isLoaded || !user) {
      setIsLoading(false);
      return;
    }

    const userRef = doc(db, "users", user.id);
    const unsubscribe = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        setBalance(doc.data().credits || 0);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [isLoaded, user]);

  const handlePaymentSuccess = (amount: number) => {
    toast.success(`₹${amount} added to your wallet!`);
    setShowPaymentDialog(false);
  };

  return (
    <header className="flex justify-between items-center px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-green-900 to-gray-800 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-4 md:gap-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex-shrink-0 cursor-pointer">
            <img 
              src="/logo.png" 
              alt="logo" 
              className="w-10 h-10 md:w-10 md:h-10 object-contain" 
            />
          </div>
          <span className="text-xl font-bold hidden sm:inline bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Fantasy Team
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <Button
          variant="ghost"
          onClick={() => setShowPaymentDialog(true)}
          disabled={isLoading || isProcessingPayment}
          className="flex items-center gap-1 sm:gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 transition-all hover:shadow-lg"
        >
          <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
          {isProcessingPayment ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-t-2 border-b-2 border-cyan-400"></div>
              <span className="text-xs sm:text-sm text-cyan-400">Processing...</span>
            </div>
          ) : (
            <>
              <span className="font-bold text-sm sm:text-base text-green-500">
                ₹{balance.toLocaleString('en-IN')}
              </span>
              <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300" />
            </>
          )}
        </Button>

        <PaymentDialog
          open={showPaymentDialog}
          onOpenChange={(open) => {
            setShowPaymentDialog(open);
            if (!open) setIsProcessingPayment(false);
          }}
          currentBalance={balance}
          requiredAmount={100}
          onPaymentSuccess={handlePaymentSuccess}
          onProcessingStateChange={setIsProcessingPayment}
        />

        {isLoaded ? (
          <>
            <SignedIn>
              <div className="border-2 border-gray-700 rounded-full hover:border-cyan-400 transition-colors">
                <UserButton 
                  afterSignOutUrl="/" 
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-8 h-8 sm:w-9 sm:h-9",
                      userButtonPopoverCard: "bg-gray-800 border border-gray-700"
                    }
                  }}
                />
              </div>
            </SignedIn>
            <SignedOut>
              <div className="flex gap-2 sm:gap-3">
                <SignInButton mode="modal">
                  <Button className="bg-transparent hover:bg-gray-700 text-white border border-gray-600 rounded-xl px-3 sm:px-4 py-1.5 text-sm sm:text-base">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl px-3 sm:px-4 py-1.5 text-sm sm:text-base shadow-lg">
                    Sign Up
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>
          </>
        ) : (
          <div className="flex gap-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-700 animate-pulse" />
          </div>
        )}
      </div>
    </header>
  );
}


"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import dynamic from 'next/dynamic';
import { Wallet, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "../../components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Dynamically import UserButton with no SSR
const UserButton = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.UserButton),
  { 
    ssr: false,
    loading: () => <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
  }
);

// Dynamically import Razorpay since it's window-dependent
const loadRazorpay = () => {
  if (typeof window !== 'undefined' && !(window as any).Razorpay) {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onerror = () => {
      toast.error("Failed to load payment processor. Please refresh the page.");
    };
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }
  return () => {};
};

const presetAmounts = [50, 100, 200, 500];

export default function Header() {
  const { isLoaded, user } = useUser();
  const [balance, setBalance] = useState<number | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [amount, setAmount] = useState<number>(100);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Real-time balance listener
  useEffect(() => {
    if (!isLoaded || !user) {
      setBalance(0);
      return;
    }

    const userRef = doc(db, "users", user.id);
    const unsubscribe = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        setBalance(doc.data().credits || 0);
      }
    });

    return () => unsubscribe();
  }, [isLoaded, user]);

  // Load Razorpay script
  useEffect(() => {
    return loadRazorpay();
  }, []);

  const handlePayment = async () => {
    if (!user) {
      setError('Please sign in to make payments');
      return;
    }

    if (amount < 10) {
      setError('Minimum amount is ₹10');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amount * 100 }),
      });

      if (!orderResponse.ok) throw new Error("Failed to create payment order");

      const orderData = await orderResponse.json();
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Fantasy Team Generator",
        description: "Wallet Top-up",
        order_id: orderData.id,
        handler: async (response: any) => {
          try {
            if (!response.razorpay_payment_id) {
              throw new Error('Payment failed: No payment ID received');
            }

            const userRef = doc(db, "users", user.id);
            await updateDoc(userRef, {
              credits: (balance || 0) + amount,
            });

            toast.success(`₹${amount} added to your wallet!`);
            setShowPaymentDialog(false);
          } catch (error: any) {
            console.error('Payment processing error:', error);
            setError(error.message || 'Failed to update wallet');
            toast.error(error.message || 'Payment processing failed');
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: user.fullName || "",
          email: user.primaryEmailAddress?.emailAddress || "",
        },
        theme: {
          color: "#339933",
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            toast.info("Payment cancelled");
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
      
      rzp.on('payment.failed', (response: any) => {
        setError(response.error.description || 'Payment failed');
        toast.error(response.error.description || 'Payment failed');
        setIsProcessing(false);
      });

    } catch (error: any) {
      console.error("Payment error:", error);
      setError(error.message || "Payment failed. Please try again.");
      toast.error(error.message || "Payment failed");
      setIsProcessing(false);
    }
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gradient-to-r from-green-700 to-green-900 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
      {/* Left side - Logo & Navigation */}
      <div className="flex items-center gap-4 md:gap-6">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="logo"
            className="w-10 h-10 md:w-12 md:h-12"
          />
          {/* <span className="text-xl font-bold hidden sm:inline">Fantasy Team Generator</span> */}
        </Link>
        <nav className="flex flex-row md:flex-row md:items-center md:justify-between gap-4 md:gap-10 px-4 py-2">
        <Link href="/" className="hover:underline font-medium flex items-center gap-1">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
  </svg>
  Home
</Link>
<Link href="/history" className="hover:underline font-medium flex items-center gap-1">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
  </svg>
  History
</Link>
</nav>

      </div>

      {/* Right side - Wallet & Auth */}
      <div className="flex items-center gap-3 md:gap-4 pr-10 space-x-5 xl:space-x-24  ">
        <Button
          variant="outline"
          className="text-white border-white bg-green-600 hover:bg-green-700 hover:text-white flex items-center"
          onClick={() => setShowPaymentDialog(true)}
        >
          <Wallet className="w-4 h-4 md:w-5 md:h-5 mr-2" />
          <span className="font-medium">
            {balance !== null ? `₹${balance.toLocaleString('en-IN')}` : '...'}
          </span>
        </Button>

        <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
          <DialogContent className="max-w-md bg-white rounded-lg shadow-xl">
            <div className="absolute right-4 top-4">
              <button
                onClick={() => setShowPaymentDialog(false)}
                className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
              >
                <X className="h-5 w-5 text-gray-500" />
                <span className="sr-only">Close</span>
              </button>
            </div>
            
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-green-700">Add Wallet Credits</DialogTitle>
              <DialogDescription asChild>
                <div className="text-gray-600 mt-2">
                  Current Balance: <span className="font-extrabold">₹{balance?.toLocaleString('en-IN') || 0}</span>
                </div>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-3">
                {presetAmounts.map((amt) => (
                  <Button
                    key={amt}
                    variant={amount === amt ? "default" : "outline"}
                    onClick={() => setAmount(amt)}
                    className={`w-full text-black ${amount === amt ? 'bg-green-600 hover:bg-green-700' : 'hover:bg-gray-100'}`}
                  >
                    ₹{amt}
                  </Button>
                ))}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Custom Amount</label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  min={10}
                  placeholder="Enter custom amount"
                  className="text-center text-gray-800 text-lg font-medium border-gray-300 focus:ring-green-500 focus:border-green-500"
                />
                <p className="text-xs text-gray-500 text-center">
                  Minimum: ₹10
                </p>
              </div>

              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md text-center">
                  {error}
                </div>
              )}

              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  `Pay ₹${amount}`
                )}
              </Button>

              <div className="text-xs text-gray-500 text-center pt-2 border-t border-gray-200">
                <p>Payments processed securely via Razorpay</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {isLoaded ? (
          <>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <div className="flex gap-2">
                <SignInButton mode="modal">
                  <Button variant="outline" className="text-white border-white hover:bg-green-700">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="bg-white text-green-700 hover:bg-gray-100">
                    Sign Up
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>
          </>
        ) : (
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
          </div>
        )}
      </div>
    </header>
  );
}
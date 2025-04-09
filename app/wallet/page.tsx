


"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Header from "@/components/Header";
import { PaymentDialog } from "@/components/PaymentDialog";
import { Button } from "../../components/ui/button";

export default function WalletPage() {
  const { user } = useUser();
  const [balance, setBalance] = useState(0);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!user) return;
      
      try {
        const userRef = doc(db, "users", user.id);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
          setBalance(userDoc.data().credits || 0);
        } else {
          // Initialize user if doesn't exist
          await setDoc(userRef, {
            credits: 0,
            email: user.emailAddresses[0]?.emailAddress,
            name: user.fullName
          });
          setBalance(0);
        }
      } catch (err) {
        console.error("Error fetching balance:", err);
      }
    };

    fetchBalance();
  }, [user]);

  const handlePaymentSuccess = (amount: number) => {
    setBalance(prev => prev + amount);
    setShowPaymentDialog(false);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Header />
      
      <div className="container mx-auto p-6">
        <div className="bg-gray-800 p-6 rounded-lg max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-6">Your Wallet</h1>
          
          <div className="mb-6">
            <h2 className="text-xl mb-2">Current Balance</h2>
            <p className="text-3xl font-bold text-green-500">₹{balance}</p>
          </div>
          
          <div className="flex flex-col gap-4">
            <Button 
              onClick={() => setShowPaymentDialog(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Add Money
            </Button>

            <div className="grid grid-cols-2 gap-4">
              {[50, 100, 200, 500].map((amt) => (
                <Button
                  key={amt}
                  variant="outline"
                  className="text-white border-white hover:bg-gray-700"
                  onClick={() => {
                    setBalance(prev => prev + amt);
                    // In a real app, you would call your payment API here
                    alert(`₹${amt} added to your wallet (demo)`);
                  }}
                >
                  +₹{amt} (Demo)
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Dialog */}
        <PaymentDialog
          currentBalance={balance}
          onPaymentSuccess={handlePaymentSuccess}
          open={showPaymentDialog}
          onOpenChange={setShowPaymentDialog}
          requiredAmount={10} 
        />
      </div>
    </div>
  );
}
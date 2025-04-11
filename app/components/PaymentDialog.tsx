

// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogDescription } from "../../components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { db } from "@/lib/firebase";
// import { doc, updateDoc } from "firebase/firestore";
// import { useUser } from "@clerk/nextjs";
// import { toast } from "sonner";
// import { X } from "lucide-react";

// declare global {
//   interface Window {
//     Razorpay: any;
//   }
// }

// const presetAmounts = [50, 100, 200, 500];

// interface PaymentDialogProps {
//   currentBalance: number;
//   requiredAmount: number;
//   onPaymentSuccess: (amount: number) => void;
//   onOpenChange: (open: boolean) => void;
//   open: boolean;
// }

// export function PaymentDialog({
//   currentBalance,
//   requiredAmount,
//   onPaymentSuccess,
//   onOpenChange,
//   open,
// }: PaymentDialogProps) {
//   const { user } = useUser();
//   const [amount, setAmount] = useState<number>(Math.max(requiredAmount, 50));
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (open && typeof window !== 'undefined' && !window.Razorpay) {
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.async = true;
//       script.onerror = () => {
//         setError('Failed to load payment processor');
//         toast.error('Payment system unavailable. Please refresh the page.');
//       };
//       document.body.appendChild(script);
      
//       return () => {
//         document.body.removeChild(script);
//       };
//     }
//   }, [open]);

//   useEffect(() => {
//     if (open) {
//       setAmount(Math.max(requiredAmount, 50));
//       setError(null);
//     }
//   }, [open, requiredAmount]);

//   const handlePayment = async () => {
//     if (!user) {
//       setError('Please sign in to make payments');
//       return;
//     }

//     if (amount < requiredAmount) {
//       setError(`Minimum ₹${requiredAmount} required`);
//       return;
//     }

//     setIsProcessing(true);
//     setError(null);

//     try {
//       const orderResponse = await fetch('/api/create-order', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           amount: amount * 100,
//           currency: 'INR'
//         }),
//       });

//       if (!orderResponse.ok) {
//         throw new Error('Failed to create payment order');
//       }

//       const orderData = await orderResponse.json();

//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//         amount: orderData.amount,
//         currency: orderData.currency,
//         name: 'Fantasy App',
//         description: 'Wallet Top-up',
//         order_id: orderData.id,
//         handler: async (response: any) => {
//           try {
//             if (!response.razorpay_payment_id) {
//               throw new Error('Payment failed: No payment ID received');
//             }

//             const userRef = doc(db, "users", user.id);
//             await updateDoc(userRef, {
//               credits: currentBalance + amount
//             });

//             toast.success(`₹${amount} added to your wallet!`);
//             onPaymentSuccess(amount);
//             onOpenChange(false); // Close dialog on success
//           } catch (err: any) {
//             console.error('Payment processing error:', err);
//             setError(err.message || 'Failed to update wallet');
//             toast.error(err.message || 'Payment processing failed');
//           } finally {
//             setIsProcessing(false);
//           }
//         },
//         prefill: {
//           name: user.fullName || '',
//           email: user.primaryEmailAddress?.emailAddress || ''
//         },
//         theme: {
//           color: '#339933'
//         },
//         modal: {
//           ondismiss: () => {
//             setIsProcessing(false);
//             toast.info('Payment cancelled');
//           }
//         }
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
      
//       rzp.on('payment.failed', (response: any) => {
//         setError(response.error.description || 'Payment failed');
//         toast.error(response.error.description || 'Payment failed');
//         setIsProcessing(false);
//       });

//     } catch (err: any) {
//       console.error('Payment error:', err);
//       setError(err.message || 'Payment failed. Please try again.');
//       toast.error(err.message || 'Payment failed');
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-md bg-white rounded-lg shadow-xl">
//         <div className="absolute right-4 top-4">
//           <button
//             onClick={() => onOpenChange(false)}
//             className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
//           >
//             <X className="h-5 w-5 text-gray-500" />
//             <span className="sr-only">Close</span>
//           </button>
//         </div>
        
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-bold text-green-700">Add Wallet Credits</DialogTitle>
//           <DialogDescription asChild>
//             <div className="text-gray-600 flex justify-between mt-2">
//               <span>Current: <span className="font-extrabold">₹{currentBalance}</span></span>
//               <span>Required: <span className="font-semibold">₹{requiredAmount}</span></span>
//             </div>
//           </DialogDescription>
//         </DialogHeader>

//         <div className="space-y-4 py-4">
//           <div className="grid grid-cols-2 gap-3">
//             {presetAmounts.map((amt) => (
//               <Button
//                 key={amt}
//                 variant={amount === amt ? "default" : "outline"}
//                 onClick={() => setAmount(Math.max(amt, requiredAmount))}
//                 className={`w-full text-black ${amount === amt ? 'bg-green-600 hover:bg-green-700' : 'hover:bg-gray-100'}`}
//               >
//                 ₹{amt}
//               </Button>
//             ))}
//           </div>

//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700">Custom Amount</label>
//             <Input
//               type="number"
//               value={amount}
//               onChange={(e) => setAmount(Math.max(Number(e.target.value), requiredAmount))}
//               min={requiredAmount}
//               placeholder="Enter custom amount"
//               className="text-center text-gray-800 text-lg font-medium border-gray-300 focus:ring-green-500 focus:border-green-500"
//             />
//             <p className="text-xs text-gray-500 text-center">
//               Minimum: ₹{requiredAmount}
//             </p>
//           </div>

//           {error && (
//             <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md text-center">
//               {error}
//             </div>
//           )}

//           <Button
//             onClick={handlePayment}
//             disabled={isProcessing}
//             className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg"
//           >
//             {isProcessing ? (
//               <span className="flex items-center justify-center gap-2">
//                 <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Processing...
//               </span>
//             ) : (
//               `Pay ₹${amount}`
//             )}
//           </Button>

//           <div className="text-xs text-gray-500 text-center pt-2 border-t border-gray-200">
//             <p>Payments processed securely via Razorpay</p>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }






"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogDescription } from "../../components/ui/dialog";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { X } from "lucide-react";

declare global {
    interface Window {
        Razorpay: any;
    }
}

const presetAmounts = [50, 100, 200, 500];

interface PaymentDialogProps {
    currentBalance: number;
    requiredAmount: number;
    onPaymentSuccess: (amount: number) => void;
    onOpenChange: (open: boolean) => void;
    open: boolean;
    onProcessingStateChange?: (isProcessing: boolean) => void;
}

export function PaymentDialog({
    currentBalance,
    requiredAmount,
    onPaymentSuccess,
    onOpenChange,
    open,
    onProcessingStateChange,
}: PaymentDialogProps) {
    const { user } = useUser();
    const [amount, setAmount] = useState<number>(Math.max(requiredAmount, 50));
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        if (open && typeof window !== 'undefined') {
            if (window.Razorpay) {
                setScriptLoaded(true);
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            script.onload = () => setScriptLoaded(true);
            script.onerror = () => {
                setError('Failed to load payment system');
                toast.error('Payment system unavailable. Please refresh.');
            };
            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        }
    }, [open]);

    const handlePayment = async () => {
        if (!user) {
            setError('Please sign in to make payments');
            return;
        }

        if (amount < requiredAmount) {
            setError(`Minimum ₹${requiredAmount} required`);
            return;
        }

        setIsProcessing(true);
        if (onProcessingStateChange) {
            onProcessingStateChange(true);
        }
        setError(null);
        onOpenChange(false); // Close dialog when payment starts

        try {
            const response = await fetch('/api/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amount * 100, // Convert to paisa
                    currency: 'INR'
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create payment order');
            }

            const orderData = await response.json();

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'Fantasy App',
                description: `Wallet Top-up of ₹${amount}`,
                order_id: orderData.id,
                handler: async (response: any) => {
                    try {
                        const verificationResponse = await fetch('/api/verify-payment', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                                amount: amount
                            }),
                        });

                        if (!verificationResponse.ok) {
                            throw new Error('Payment verification failed');
                        }

                        const userRef = doc(db, "users", user.id);
                        await updateDoc(userRef, {
                            credits: currentBalance + amount
                        });

                        onPaymentSuccess(amount);
                    } catch (err: any) {
                        console.error('Payment processing error:', err);
                        setError(err.message || 'Payment failed');
                        toast.error('Payment verification failed');
                        onOpenChange(true); // Reopen dialog on error
                    } finally {
                        setIsProcessing(false);
                        if (onProcessingStateChange) {
                            onProcessingStateChange(false);
                        }
                    }
                },
                prefill: {
                    name: user.fullName || '',
                    email: user.primaryEmailAddress?.emailAddress || '',
                },
                theme: {
                    color: '#4f46e5'
                },
                modal: {
                    ondismiss: () => {
                        setIsProcessing(false);
                        if (onProcessingStateChange) {
                            onProcessingStateChange(false);
                        }
                        toast.info('Payment cancelled');
                        onOpenChange(true); // Reopen dialog on cancellation
                    },
                    escape: false,
                    backdropclose: false
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

            rzp.on('payment.failed', (response: any) => {
                setError(response.error.description || 'Payment failed');
                toast.error('Payment failed. Please try again.');
                setIsProcessing(false);
                if (onProcessingStateChange) {
                    onProcessingStateChange(false);
                }
                onOpenChange(true); // Reopen dialog on failure
            });

        } catch (err: any) {
            console.error('Payment error:', err);
            setError(err.message || 'Payment failed');
            toast.error('Payment processing failed');
            setIsProcessing(false);
            if (onProcessingStateChange) {
                onProcessingStateChange(false);
            }
            onOpenChange(true); // Reopen dialog on error
        }
    };

    return (
        <Dialog open={open} onOpenChange={(open) => !isProcessing && onOpenChange(open)}>
            <DialogContent className="max-w-md bg-white rounded-lg shadow-xl z-[1000]">
                <div className="absolute right-4 top-4">
                    <button
                        onClick={() => !isProcessing && onOpenChange(false)}
                        disabled={isProcessing}
                        className="rounded-sm opacity-70 hover:opacity-100"
                    >
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                <DialogHeader>
                    <div className="w-full flex justify-center">
                        <DialogTitle className="text-2xl font-bold text-indigo-700 text-center">
                            Add To Wallet
                        </DialogTitle>
                    </div>

                    <DialogDescription className="text-gray-600 flex justify-between mt-2">
                        <span className="font-bold">Current: <span className="font-extrabold text-green-500">₹{currentBalance}</span> </span>
                        <span className="ont-bold">Required: <span className="font-extrabold   text-gray-500">  ₹{requiredAmount}</span> </span>
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-3">
                        {presetAmounts.map((amt) => (
                            <Button
                                key={amt}
                                variant={amount === amt ? "outline" : "secondary"}
                                onClick={() => setAmount(Math.max(amt, requiredAmount))}
                                disabled={isProcessing}
                                className="text-black border-gray-300 hover:bg-gray-100 hover:text-black rounded-lg h-12 text-lg font-medium transition-all" 
                            >
                                ₹{amt}
                            </Button>
                        ))}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Custom Amount
                        </label>
                        <Input
                            type="number"
                            value={amount}
                            onChange={(e) => {
                                const value = Math.max(Number(e.target.value), requiredAmount);
                                setAmount(isNaN(value) ? requiredAmount : value);
                            }}
                            min={requiredAmount}
                            disabled={isProcessing}
                            className="text-black placeholder:text-gray-400" 
                        />
                    </div>

                    {error && (
                        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
                            {error}
                        </div>
                    )}

                    <Button
                        onClick={handlePayment}
                        disabled={isProcessing || !scriptLoaded}
                        className="w-full h-12 text-lg  bg-indigo-700 font-semibold"
                    >
                        {isProcessing ? (
                            <span className="flex items-center justify-center gap-2">
                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                                Processing...
                            </span>
                        ) : (
                            <span className="text-white "> Pay ₹{amount}</span>
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

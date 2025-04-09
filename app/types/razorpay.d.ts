declare module 'razorpay' {
    interface RazorpayOrder {
      id: string;
      amount: number;
      currency: string;
      receipt: string;
      status: string;
      created_at: number;
      attempts: number;
    }
  
    interface Razorpay {
      new (options: { key_id: string; key_secret: string }): Razorpay;
      orders: {
        create(options: {
          amount: number;
          currency: string;
          receipt: string;
          payment_capture?: number;
        }): Promise<RazorpayOrder>;
      };
    }
  
    const Razorpay: Razorpay;
    export = Razorpay;
  }
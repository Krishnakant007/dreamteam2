// app/api/create-order/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { amount } = body;

  if (!amount) {
    return NextResponse.json({ error: 'Amount is required' }, { status: 400 });
  }

  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const options = {
      amount: Number(amount), // Razorpay works in paisa
      currency: 'INR',
      receipt: `receipt_order_${Math.floor(Math.random() * 10000)}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(order);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
  }
}








// // app/api/create-order/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import Razorpay from 'razorpay';

// export async function POST(req: NextRequest) {
//   const body = await req.json();
//   const { amount } = body;

//   if (!amount) {
//     return NextResponse.json({ error: 'Amount is required' }, { status: 400 });
//   }

//   try {
//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID!,
//       key_secret: process.env.RAZORPAY_KEY_SECRET!,
//     });

//     const options = {
//       amount: Number(amount), // Razorpay works in paisa
//       currency: 'INR',
//       receipt: `receipt_order_${Math.floor(Math.random() * 10000)}`,
//     };

//     const order = await razorpay.orders.create(options);

//     return NextResponse.json(order);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
//   }
// }




// app/api/create-order/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import crypto from 'crypto';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    // Verify environment variables
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { error: 'Payment system not configured properly' },
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verify content type
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Invalid content type' },
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await request.json();
    const { amount, currency } = body;

    // Validate input
    if (!amount || isNaN(amount) || amount < 100) {
      return NextResponse.json(
        { error: 'Valid amount is required (minimum ₹1)' },
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (currency !== 'INR') {
      return NextResponse.json(
        { error: 'Only INR currency is supported' },
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create Razorpay order
    const options = {
      amount: Math.round(Number(amount)),
      currency: currency || 'INR',
      payment_capture: 1,
      notes: {
        created_at: new Date().toISOString()
      }
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      status: order.status,
      created_at: order.created_at
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { 
        error: error.error?.description || 'Order creation failed',
        details: error.message 
      },
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Verify environment variables
    if (!process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { error: 'Payment system not configured properly' },
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verify content type
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Invalid content type' },
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await request.json();
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = body;

    // Validate input
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Missing payment verification data' },
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verify signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return NextResponse.json(
      { 
        success: true,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id
      },
      { 
        headers: { 'Content-Type': 'application/json' } 
      }
    );

  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { 
        error: 'Payment verification failed',
        details: error.message 
      },
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}






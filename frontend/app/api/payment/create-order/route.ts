import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  const supabase = await createClient();
  const { amount, eventId, categories, withdrawal_fee, team_name, partner_name, create_team } = await req.json();

  try {
    // Authenticate user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to smallest currency unit (paise)
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        eventId,
        userId: user.id,
        categories: JSON.stringify(categories),
        withdrawal_fee,
        team_name,
        partner_name
      }
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json({ error: 'Failed to create payment' }, { status: 500 });
  }
}
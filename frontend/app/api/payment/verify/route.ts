import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  const supabase = await createClient();
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (!isAuthentic) {
    return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
  }

  try {
    // Get payment details from Razorpay
    const response = await fetch(
      `https://api.razorpay.com/v1/payments/${razorpay_payment_id}`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
          ).toString('base64')}`,
        },
      }
    );

    const payment = await response.json();
    const { eventId, userId, categories } = payment.notes;

    // Insert into Participants table
    const { error: participantError } = await supabase
      .from('participants')
      .insert({
        user_id: userId,
        event_id: eventId,
        payment_status: 'paid',
        total_amount: payment.amount / 100,
        registration_date: new Date().toISOString(),
        status: 'confirmed',
        category_id: categories[0]["id"],
        name: payment.notes.name,
        group_id: payment.notes.group_id,
        team_id: payment.notes.team_id
      });

    if (participantError) {
      throw participantError;
    }

    // Insert into Payments table
    const { error: paymentError } = await supabase
      .from('payments')
      .insert({
        organizer_id: payment.notes.organizer_id,
        event_id: eventId,
        amount: payment.amount / 100,
        currency: payment.currency,
        payment_status: 'completed',
        payment_method: payment.method,
        transaction_id: razorpay_payment_id,
        payment_date: new Date(payment.created_at).toISOString()
      });

    if (paymentError) {
      throw paymentError;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json({ error: 'Payment verification failed' }, { status: 500 });
  }
}
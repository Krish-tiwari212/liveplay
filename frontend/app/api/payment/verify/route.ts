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

    // Create registration after successful payment
    const { error: registrationError } = await supabase
      .from('participants')
      .insert({
        user_id: userId,
        event_id: eventId,
        payment_id: razorpay_payment_id,
        payment_status: 'completed',
        amount_paid: payment.amount / 100,
        registration_date: new Date().toISOString(),
        status: 'confirmed'
      });

    if (registrationError) {
      throw registrationError;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json({ error: 'Payment verification failed' }, { status: 500 });
  }
}
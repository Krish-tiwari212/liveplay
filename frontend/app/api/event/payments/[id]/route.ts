import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request, { params }: { params: { eventId: string } }) {
  const supabase = await createClient();
  const body = await req.json();
  const { eventEntryId, amount, payment_method } = body;

  // Ensure the user is authenticated
  const { data: user, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Create a payment record
  const { data: payment, error: paymentError } = await supabase
    .from('payments')
    .insert({
      event_entry_id: eventEntryId,
      user_id: user.id,
      amount,
      payment_date: new Date().toISOString(),
      payment_method,
      payment_status: 'paid',
    })
    .select()
    .single();

  if (paymentError) {
    return NextResponse.json({ error: paymentError.message }, { status: 400 });
  }

  // Update event entry to confirmed
  const { error: updateError } = await supabase
    .from('event_entries')
    .update({ status: 'confirmed', payment_status: 'paid' })
    .eq('id', eventEntryId);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, paymentId: payment.id }, { status: 200 });
}

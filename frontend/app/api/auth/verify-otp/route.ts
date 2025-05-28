import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { user_id, otp } = await request.json();

  if (!user_id || !otp) {
    return NextResponse.json({ error: 'User ID and OTP are required' }, { status: 400 });
  }

  // Fetch OTP from the database
  const { data, error } = await supabase
    .from('otps')
    .select('*')
    .eq('user_id', user_id)
    .eq('otp', otp)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
  }

  // Check if OTP is expired
  if (new Date(data.expires_at) < new Date()) {
    return NextResponse.json({ error: 'OTP expired' }, { status: 400 });
  }

  // OTP is valid, proceed with verification
  // You can update the user's status in the database or perform other actions

  return NextResponse.json({ message: 'OTP verified successfully' }, { status: 200 });
}
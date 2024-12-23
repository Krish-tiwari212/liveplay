import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

interface ForgetPasswordRequest {
  email: string;
}

export async function POST(request: Request) {
  const supabase = await createClient();
  try {
    const { email }: ForgetPasswordRequest = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Password reset email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
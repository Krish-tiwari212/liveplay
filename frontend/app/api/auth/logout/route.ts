import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST() {
  const supabase = await createClient();
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Clear cookies related to authentication
    const response = NextResponse.json({ message: 'Logout successful' }, { status: 200 });
    response.cookies.set('auth-token', '', { maxAge: -1 });
    response.cookies.set('refresh-token', '', { maxAge: -1 });

    return response;

  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
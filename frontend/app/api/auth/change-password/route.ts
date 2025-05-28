import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

interface ChangePasswordRequest {
  password: string;
  token_hash: string;
}

export async function POST(request: Request) {
  try {
    const { password }: ChangePasswordRequest = await request.json();

    if (!password) {
      return NextResponse.json({ error: 'Password and token hash are required' }, { status: 400 });
    }

    const supabase = await createClient();

    // Update the user's password
    const { data, error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Password changed successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error changing password:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
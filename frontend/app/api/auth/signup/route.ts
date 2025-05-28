// app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

interface SignupRequest {
  full_name?: string;
  email?: string;
  password?: string;
  provider?: string; // add provider for OAuth
}

export async function POST(request: Request) {
  const supabase = await createClient();

  try {
    const { full_name, email, password, provider }: SignupRequest = await request.json();

    // Check if it's an OAuth signup
    if (provider === 'google') {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback` }
      });
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      
      return NextResponse.json({ url: data.url });
    }

    // Regular email signup
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name },
      },
    });

    if (authError || !authData.user) {
      return NextResponse.json({ error: authError?.message || 'Signup failed' }, { status: 400 });
    }

    // Insert user into the 'users' table
    const { error: insertError } = await supabase.from('users').insert({
      id: authData.user.id,
      full_name,
      email,
    });

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'User created successfully' }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

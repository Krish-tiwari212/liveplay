// app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

interface SignupRequest {
  full_name?: string;
  email?: string;
  password?: string;
  role?: 'participant' | 'organizer';
  contact_number?: string;
  city?: string;
  pincode?: string;
  gender?: 'male' | 'female' | 'other';
  date_of_birth?: string;
  blood_group?: string;
  provider?: string; // add provider for OAuth
}

export async function POST(request: Request) {
  const supabase = await createClient();

  try {
    const { full_name, email, password, role, contact_number, city, pincode, gender, date_of_birth, blood_group, provider }: SignupRequest = await request.json();

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
        data: { full_name, role, contact_number, city, pincode, gender, date_of_birth, blood_group },
      },
    });

    if (authError || !authData.user) {
      return NextResponse.json({ error: authError?.message || 'Signup failed' }, { status: 400 });
    }

    // Insert user into the 'users' table
    const { error: insertError } = await supabase.from('users').insert({
      full_name,
      email,
      contact_number,
      role,
      city,
      pincode,
      gender,
      date_of_birth,
      blood_group,
    });

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'User created successfully' }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

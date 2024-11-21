import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

interface LoginRequest {
  email?: string;
  password?: string;
  provider?: 'google';
  'cf-turnstile-response'?: string;
}

export async function POST(request: Request) {
  const supabase = await createClient();
  try {
    const { email, password, provider, 'cf-turnstile-response': turnstileToken }: LoginRequest = await request.json();

    // Verify Turnstile token
    const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY;
    const turnstileVerificationUrl = `https://challenges.cloudflare.com/turnstile/v0/siteverify`;

    const turnstileResponse = await fetch(turnstileVerificationUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${turnstileSecretKey}&response=${turnstileToken}`,
    });

    const turnstileResult = await turnstileResponse.json();

    if (!turnstileResult.success) {
      return NextResponse.json({ error: 'CAPTCHA verification failed' }, { status: 400 });
    }

    if (provider === 'google') {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback` },
      });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      // Return the redirect URL in the response instead of using redirect
      return NextResponse.json({ url: data.url }, { status: 200 });
    } else {
      const { data: session, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ message: 'Login successful', session }, { status: 200 });
    }
  } catch (error) {
    console.error('Error in login', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
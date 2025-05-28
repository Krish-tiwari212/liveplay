import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { SetCookie } from '@supabase/ssr';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';
  const event = searchParams.get('event');

  if (code) {
    const supabase = await createClient();
    const { data: session, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && session) {
      const user = session.user;

      // Check if the user already exists in the 'users' table
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('id')
        .eq('id', user.id)
        .single();
      console.log(existingUser, fetchError);

      if (!existingUser) {
        console.log('Inserting user data');
        // Insert user data into the 'users' table
        const { error: insertError } = await supabase.from('users').insert({
          id: user.id,
          email: user.email,
          full_name: user.user_metadata.full_name,
        });

        if (insertError) {
          return NextResponse.json({ error: insertError.message }, { status: 400 });
        }
      }

      // Set the access and refresh tokens in cookies
      const response = NextResponse.redirect(`${origin}${next}`);
      SetCookie(response, session);

      const forwardedHost = request.headers.get('x-forwarded-host'); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development';

      // Check for PASSWORD_RECOVERY event
      if (event === 'PASSWORD_RECOVERY') {
        return NextResponse.redirect(`${origin}/auth/reset-password?access_token=${session.access_token}`);
      }
      
      if (isLocalEnv) {
        return response;
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return response;
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
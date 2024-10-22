import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  const { data: user, error } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: userProfile, error: userProfileError } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  if (userProfileError) {
    return NextResponse.json({ error: userProfileError.message }, { status: 400 });
  }

  let profile = userProfile;

  if (userProfile.role === 'organizer') {
    const { data: organizerDetails, error: organizerError } = await supabase
      .from('organizer_details')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (organizerError) {
      return NextResponse.json({ error: organizerError.message }, { status: 400 });
    }

    profile = { ...profile, organizer_details: organizerDetails };
  }

  return NextResponse.json({ profile }, { status: 200 });
}

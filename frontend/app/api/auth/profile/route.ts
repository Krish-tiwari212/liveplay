import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server'

export async function GET() {
  const supabase = await createClient();
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

export async function PUT(req) {
  const supabase = await createClient();
  const { data: user, error: userError } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { full_name, contact_number, city, pincode } = await req.json();

  const { data: updatedProfile, error: updateError } = await supabase
    .from('users')
    .update({ full_name, contact_number, city, pincode })
    .eq('id', user.id)
    .select()
    .single();

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 400 });
  }

  return NextResponse.json({ updatedProfile }, { status: 200 });
}


export async function DELETE() {
  const supabase = await createClient();
  const { data: user, error } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { error: deleteOrganizerError } = await supabase
    .from('organizer_details')
    .delete()
    .eq('user_id', user.id);

  if (deleteOrganizerError) {
    return NextResponse.json({ error: deleteOrganizerError.message }, { status: 400 });
  }

  const { error: deleteUserError } = await supabase
    .from('users')
    .delete()
    .eq('id', user.id);

  if (deleteUserError) {
    return NextResponse.json({ error: deleteUserError.message }, { status: 400 });
  }

  return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
}

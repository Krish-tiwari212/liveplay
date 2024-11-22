import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient();
  const body = await req.json();
  const { user_id, team_code } = body;

  // Ensure the user is authenticated
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData || !authData.user) {
    return NextResponse.json({ error: authError?.message || 'Unauthorized' }, { status: 401 });
  }
  const userId = authData.user.id;

  // Fetch user data for gender and age validation
  const { data: userData, error: userFetchError } = await supabase
    .from('users')
    .select('gender, date_of_birth')
    .eq('id', userId)
    .single();

  if (userFetchError || !userData) {
    return NextResponse.json({ error: userFetchError.message }, { status: 404 });
  }

  const userGender = userData.gender;
  const userDob = userData.date_of_birth ? new Date(userData.date_of_birth) : null;
  let age = null;

  if (userDob) {
    const today = new Date();
    age = today.getFullYear() - userDob.getFullYear();
    const monthDiff = today.getMonth() - userDob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < userDob.getDate())) {
      age--;
    }
  }

  // Find team by team_code
  const { data: teamData, error: teamFetchError } = await supabase
    .from('teams')
    .select('id, category_id')
    .eq('team_code', team_code)
    .eq('event_id', params.id)
    .single();

  if (teamFetchError || !teamData) {
    return NextResponse.json({ error: 'Invalid team code or team not found' }, { status: 400 });
  }

  const categoryId = teamData.category_id;

  // Retrieve category to check age and gender restrictions
  const { data: categoryData, error: categoryFetchError } = await supabase
    .from('event_categories')
    .select('gender, min_age, max_age')
    .eq('id', categoryId)
    .single();

  if (categoryFetchError || !categoryData) {
    return NextResponse.json({ error: categoryFetchError.message }, { status: 400 });
  }

  const isGenderMismatch = categoryData.gender && categoryData.gender !== userGender;
  const isAgeMismatch = age !== null && (
    (categoryData.min_age && age < categoryData.min_age) ||
    (categoryData.max_age && age > categoryData.max_age)
  );

  if (isGenderMismatch || isAgeMismatch) {
    return NextResponse.json({ error: 'User does not meet the category requirements' }, { status: 400 });
  }

  // Create a participant entry for the user linked to the team
  const { data: participantEntry, error: participantError } = await supabase
    .from('participants')
    .insert({
      user_id: userId,
      name: authData.user.user_metadata.full_name || authData.user.user_metadata.name || 'Unknown',
      event_id: params.id,
      category_id: categoryId,
      team_id: teamData.id,
      status: 'pending',
      registration_date: new Date().toISOString(),
    })
    .select()
    .single();

  if (participantError) {
    return NextResponse.json({ error: participantError.message }, { status: 400 });
  }

  return NextResponse.json({ message: 'Successfully joined the team', participantId: participantEntry.id }, { status: 201 });
}

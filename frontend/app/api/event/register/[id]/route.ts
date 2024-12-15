import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient();
  const body = await req.json();
  const { user_id, categories, create_team } = body; // categories is an array of category_ids selected

  // Ensure the user is authenticated
  const { data: authData, error: authError } = await supabase.auth.getUser();
  console.log('Auth Data:', authData);
  console.log('Auth Error:', authError);

  if (authError || !authData || !authData.user) {
    return NextResponse.json({ error: authError?.message || 'Unauthorized' }, { status: 401 });
  }
  const userId = authData.user.id;
  console.log('User ID:', userId);

  // Retrieve the user's gender and date of birth from the user table
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

  // Calculate the user's age if date of birth is available
  let age = null;
  if (userDob) {
    const today = new Date();
    age = today.getFullYear() - userDob.getFullYear();
    const monthDiff = today.getMonth() - userDob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < userDob.getDate())) {
      age--;
    }
  }

  // Retrieve the categories from the database
  const { data: categoryData, error: categoryFetchError } = await supabase
    .from('event_categories')
    .select('id, gender, min_age, max_age');

  if (categoryFetchError) {
    return NextResponse.json({ error: categoryFetchError.message }, { status: 400 });
  }

  // Filter out categories that the user is not allowed to register for
  const invalidCategories = categories.filter((categoryId: string) => {
    const category = categoryData.find((cat: any) => cat.id === categoryId);
    const isGenderMismatch = category && category.gender && category.gender !== userGender;
    const isAgeMismatch = category && age !== null && ((category.min_age && age < category.min_age) || (category.max_age && age > category.max_age));
    return isGenderMismatch || isAgeMismatch;
  });

  if (invalidCategories.length > 0) {
    return NextResponse.json({ error: 'You are not allowed to register for one or more selected categories.' }, { status: 400 });
  }

  // Create participant entry for the user
  const { data: participantEntry, error: participantError } = await supabase
    .from('participants')
    .insert({
      user_id: userId,
      name: authData.user.user_metadata.full_name || authData.user.user_metadata.name || 'Unknown',
      event_id: params.id,
      status: 'pending',
      registration_date: new Date().toISOString(),
    })
    .select()
    .single();

  if (participantError) {
    return NextResponse.json({ error: participantError.message }, { status: 400 });
  }
  console.log('Participant Entry:', participantEntry);

  // Link selected categories with the participant entry
  const categoryEntries = categories.map((categoryId: string) => ({
    participant_id: participantEntry.id,
    category_id: categoryId,
    event_id: params.id,
  }));
  console.log('Category Entries:', categoryEntries);
  const { error: categoryError } = await supabase
    .from('event_entries')
    .insert(categoryEntries);

  if (categoryError) {
    return NextResponse.json({ error: categoryError.message }, { status: 400 });
  }

  // Handle team creation if requested
  if (create_team) {
    const maxRetries = 5;
    const teamEntries = [];

    for (const categoryId of categories) {
      let teamCode;
      let teamError;
      let retries = 0;

      do {
        teamCode = Math.random().toString(36).substring(2, 8).toUpperCase(); // Generate a random 6-digit code

        const result = await supabase
          .from('teams')
          .insert({
            event_id: params.id,
            category_id: categoryId,
            team_code: teamCode,
          })
          .select();

        teamError = result.error;
        retries++;
      } while (teamError && teamError.message.includes('duplicate key value') && retries < maxRetries);

      if (teamError) {
        return NextResponse.json({ error: teamError.message }, { status: 400 });
      }

      teamEntries.push({ categoryId, teamCode });
    }

    // Update the participant entry with the team ID for each category
    for (const entry of teamEntries) {
      const { data: teamData, error: teamFetchError } = await supabase
        .from('teams')
        .select('id')
        .eq('team_code', entry.teamCode)
        .single();

      if (teamFetchError || !teamData) {
        return NextResponse.json({ error: teamFetchError.message }, { status: 400 });
      }

      const { error: updateParticipantError } = await supabase
        .from('participants')
        .update({ team_id: teamData.id })
        .eq('id', participantEntry.id)
        .eq('event_id', params.id);

      if (updateParticipantError) {
        return NextResponse.json({ error: updateParticipantError.message }, { status: 400 });
      }
    }

    return NextResponse.json({ participantId: participantEntry.id, teamEntries }, { status: 201 });
  }

  return NextResponse.json({ participantId: participantEntry.id }, { status: 201 });
}
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  const supabase = await createClient();
  const { team_code, user_id } = await req.json();

  try {
    // Fetch team details using the team code
    const { data: teamData, error: teamError } = await supabase
      .from('teams')
      .select('id, category_type, participant_ids, event_id, category_id')
      .eq('team_code', team_code)
      .single();

    if (teamError || !teamData) {
      return NextResponse.json({ error: 'Invalid team code' }, { status: 400 });
    }

    const { id: teamId, category_type, participant_ids, event_id, category_id } = teamData;

    // Check the number of participants in the team
    const participantCount = participant_ids.length;

    if (category_type === 'Singles' && participantCount >= 1) {
      return NextResponse.json({ error: 'Singles team already has 1 participant' }, { status: 400 });
    }

    if (category_type === 'Doubles' && participantCount >= 2) {
      return NextResponse.json({ error: 'Doubles team already has 2 participants' }, { status: 400 });
    }

    if (category_type === 'team' && participantCount >= 4) {
      return NextResponse.json({ error: 'Team already has 4 participants' }, { status: 400 });
    }

    // Check if the participant is already in the team
    if (participant_ids.includes(user_id)) {
      return NextResponse.json({ error: 'Participant already in the team' }, { status: 400 });
    }

    // Fetch existing participant data to update team_ids and category_ids
    const { data: existingParticipant, error: existingParticipantError } = await supabase
      .from('participants')
      .select('id, team_ids, category_ids')
      .eq('user_id', user_id)
      .single();

    if (existingParticipantError && existingParticipantError.code !== 'PGRST116') {
      // PGRST116 means no rows found, which is okay
      throw existingParticipantError;
    }

    let teamIds = existingParticipant ? existingParticipant.team_ids : [];
    let categoryIds = existingParticipant ? existingParticipant.category_ids : [];

    // Add the new team and category to the arrays
    teamIds = [...teamIds, teamId];
    categoryIds = [...categoryIds, category_id];

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('full_name')
      .eq('id', user_id)
      .single();

    if (userError) {
      throw userError;
    }

    // Create or update the participant entry
    const { data: participantEntry, error: participantError } = await supabase
      .from('participants')
      .upsert({
        user_id: user_id,
        name: userData?.full_name,
        team_ids: teamIds,
        category_ids: categoryIds,
        event_id: event_id,
        payment_status: 'paid',
        registration_date: new Date().toISOString(),
        status: 'confirmed',
      }, { onConflict: ['user_id', 'event_id'] })
      .select()
      .single();

    if (participantError) {
      throw participantError;
    }

    // Add the participant to the team
    participant_ids.push(participantEntry.id);

    const { error: updateError } = await supabase
      .from('teams')
      .update({ participant_ids })
      .eq('id', teamId);

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json({ success: true, teamId, participantId: participantEntry.id }, { status: 200 });

  } catch (error) {
    console.error('Error joining team:', error);
    return NextResponse.json({ error: 'Failed to join team' }, { status: 500 });
  }
}
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

    const { id: teamId, category_type, participant_ids, event_id } = teamData;

    // Check the number of participants in the team
    const participantCount = participant_ids.length;

    if (category_type === 'singles' && participantCount >= 1) {
      return NextResponse.json({ error: 'Singles team already has 1 participant' }, { status: 400 });
    }

    if (category_type === 'doubles' && participantCount >= 2) {
      return NextResponse.json({ error: 'Doubles team already has 2 participants' }, { status: 400 });
    }

    if (category_type === 'team' && participantCount >= 4) {
      return NextResponse.json({ error: 'Team already has 4 participants' }, { status: 400 });
    }

    // Check if the participant is already in the team
    if (participant_ids.includes(user_id)) {
      return NextResponse.json({ error: 'Participant already in the team' }, { status: 400 });
    }

    // Check if the participant is already in another team for the same event
    const { data: existingParticipant, error: existingParticipantError } = await supabase
      .from('participants')
      .select('id')
      .eq('user_id', user_id)
      .eq('event_id', event_id)
      .single();

    if (existingParticipantError && existingParticipantError.code !== 'PGRST116') {
      // PGRST116 means no rows found, which is okay
      throw existingParticipantError;
    }

    if (existingParticipant) {
      return NextResponse.json({ error: 'Participant already in another team for this event' }, { status: 400 });
    }

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('full_name')
      .eq('id', user_id)
      .single();

    // Create a new participant entry
    const { data: participantEntry, error: participantError } = await supabase
      .from('participants')
      .insert({
        user_id: user_id,
        name: userData?.full_name,
        team_id: teamId,
        category_id: teamData.category_id,
        event_id: event_id,
        payment_status: 'paid',
        registration_date: new Date().toISOString(),
        status: 'confirmed',
      })
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
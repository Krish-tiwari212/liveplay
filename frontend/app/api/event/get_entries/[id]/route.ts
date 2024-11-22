import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient();
  const eventId = params.id;

  // Fetch all participants for the specified event
  const { data: participants, error: participantsError } = await supabase
    .from('participants')
    .select('*')
    .eq('event_id', eventId);

  if (participantsError) {
    return NextResponse.json({ error: participantsError.message }, { status: 400 });
  }

  // Fetch user data for each participant
  const userIds = participants.map((participant: any) => participant.user_id);
  const { data: users, error: usersError } = await supabase
    .from('users')
    .select('*')
    .in('id', userIds);

  if (usersError) {
    return NextResponse.json({ error: usersError.message }, { status: 400 });
  }

  // Combine participant and user data
  const participantsWithUserData = participants.map((participant: any) => {
    const user = users.find((user: any) => user.id === participant.user_id);
    return {
      ...participant,
      user,
    };
  });

  return NextResponse.json({ participants: participantsWithUserData }, { status: 200 });
}
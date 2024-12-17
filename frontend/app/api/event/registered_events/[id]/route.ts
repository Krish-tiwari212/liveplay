import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient();
  const userId = params.id;

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    // Fetch participant entries for the given user ID
    const { data: participantEntries, error: participantError } = await supabase
      .from('participants')
      .select('event_id')
      .eq('user_id', userId);

    if (participantError) {
      throw participantError;
    }

    if (!participantEntries || participantEntries.length === 0) {
      return NextResponse.json({ events: [] }, { status: 200 });
    }

    const eventIds = participantEntries.map(entry => entry.event_id);

    // Fetch event details using the event IDs
    const { data: events, error: eventsError } = await supabase
      .from('events')
      .select('*')
      .in('id', eventIds);

    if (eventsError) {
      throw eventsError;
    }

    return NextResponse.json({ events }, { status: 200 });

  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Error fetching events' }, { status: 500 });
  }
}
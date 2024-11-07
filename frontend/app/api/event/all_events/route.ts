import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const organizerId = url.searchParams.get('organizer_id');

  try {
    const supabase = await createClient();
    let query = supabase.from('events').select('*');

    if (organizerId) {
      query = query.eq('organizer_id', organizerId);
    }

    const { data: events, error: eventsError } = await query;

    if (eventsError) {
      console.error('Error fetching events:', eventsError);
      return NextResponse.json({ error: 'Error fetching events' }, { status: 500 });
    }

    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
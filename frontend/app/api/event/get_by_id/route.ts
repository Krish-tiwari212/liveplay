import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(request: Request, { params }: { params: { event_id: string } }) {
  try {
    const { data: user, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: event, error: eventError } = await supabase
      .from('events')
      .select('*')
      .eq('organizer_id', user.id)
      .eq('id', params.event_id)
      .single();

    if (eventError) {
      return NextResponse.json({ error: eventError.message }, { status: 404 });
    }

    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

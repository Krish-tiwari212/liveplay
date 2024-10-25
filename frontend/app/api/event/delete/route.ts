import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function DELETE(request: Request, { params }: { params: { event_id: string } }) {
  try {
    const { data: deletedEvent, error: eventError } = await supabase
      .from('events')
      .delete()
      .eq('id', params.event_id)
      .single();

    if (eventError) {
      return NextResponse.json({ error: eventError.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Event deleted successfully', deletedEvent }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

interface CancelEventRequest {
  eventId: string;
}

export async function DELETE(request: Request) {
  const supabase = await createClient();

  try {
    const { eventId }: CancelEventRequest = await request.json();

    const { error: updateError } = await supabase.from('events').update({
      status: 'cancelled',
    }).eq('id', eventId);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Event cancelled successfully' }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
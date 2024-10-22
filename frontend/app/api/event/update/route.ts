import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

interface UpdateEventRequest {
  event_name?: string;
  organizer_contact_number?: string;
  organizer_email?: string;
  start_date?: string;
  end_date?: string;
  last_registration_date?: string;
  last_withdrawal_date?: string;
  venue_name?: string;
  street_address?: string;
  additional_details?: string;
  city?: string;
  pincode?: string;
  venue_not_decided?: boolean;
  map_view?: string;
  event_description?: string;
  event_usp?: string;
  rewards_for_participants?: string;
  playing_rules?: string;
  desktop_cover_image_url?: string;
  mobile_cover_image_url?: string;
}

export async function PATCH(request: Request, { params }: { params: { event_id: string } }) {
  try {
    const { data: user, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updates: UpdateEventRequest = await request.json();

    const { data: event, error: eventError } = await supabase
      .from('events')
      .update(updates)
      .eq('id', params.event_id)
      .eq('organizer_id', user.id)  // Ensure the organizer owns the event
      .single();

    if (eventError) {
      return NextResponse.json({ error: eventError.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Event updated successfully', event }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

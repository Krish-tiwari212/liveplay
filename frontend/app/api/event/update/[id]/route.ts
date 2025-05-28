import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

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
  state?: string;
  pincode?: string;
  venue_not_decided?: boolean;
  map_view?: string;
  event_description?: string;
  event_usp?: string;
  rewards_for_participants?: string;
  playing_rules?: string;
  desktop_cover_image_url?: string;
  mobile_cover_image_url?: string;
  sport?: string;
  organizer_name?: string;
  website_link?: string;
  insta_link?: string;
  venue_link?: string;
  cash_price_pool?: string;
  countdown?: boolean;
  want_tshirts?: boolean;
  enable_fixtures?: boolean;
  show_qna?: boolean;
  selected_plan?: string;
  gst_compliance?: boolean;
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = await createClient();
    const updates: UpdateEventRequest = await request.json();

    const { data: event, error: eventError } = await supabase
      .from('events')
      .update(updates)
      .eq('id', params.id)
      .single();

    if (eventError) {
      return NextResponse.json({ error: eventError.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Event updated successfully', event }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

interface EventRequest {
  event_name: string;
  organizer_contact_number: string;
  organizer_email: string;
  start_date: string;  // ISO string
  end_date: string;    // ISO string
  last_registration_date: string;  // ISO string
  last_withdrawal_date: string;    // ISO string
  venue_name: string;
  street_address: string;
  additional_details?: string;
  city: string;
  pincode: string;
  venue_not_decided: boolean;
  map_view?: string;
  event_description: string;
  event_usp: string;
  rewards_for_participants?: string;
  playing_rules?: string;
  desktop_cover_image_url: string;
  mobile_cover_image_url: string;
}

export async function POST(request: Request) {
  try {
    const { data: user, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const {
      event_name,
      organizer_contact_number,
      organizer_email,
      start_date,
      end_date,
      last_registration_date,
      last_withdrawal_date,
      venue_name,
      street_address,
      additional_details,
      city,
      pincode,
      venue_not_decided,
      map_view,
      event_description,
      event_usp,
      rewards_for_participants,
      playing_rules,
      desktop_cover_image_url,
      mobile_cover_image_url
    }: EventRequest = await request.json();

    const { data: event, error: eventError } = await supabase.from('events').insert({
      organizer_id: user.id,  // Associate the event with the logged-in organizer
      event_name,
      organizer_contact_number,
      organizer_email,
      start_date,
      end_date,
      last_registration_date,
      last_withdrawal_date,
      venue_name,
      street_address,
      additional_details,
      city,
      pincode,
      venue_not_decided,
      map_view,
      event_description,
      event_usp,
      rewards_for_participants,
      playing_rules,
      desktop_cover_image_url,
      mobile_cover_image_url
    }).single();

    if (eventError) {
      return NextResponse.json({ error: eventError.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Event created successfully', event }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request, { params }) {
  try {
    const { id } = params;
    const { userId, feedbackText, ratingOrganizerConduct, ratingEventManagement, ratingVenueLocation } = await request.json();

    if (!userId || !feedbackText || ratingOrganizerConduct == null || ratingOrganizerConduct < 1 || ratingOrganizerConduct > 5 ||
        ratingEventManagement == null || ratingEventManagement < 1 || ratingEventManagement > 5 ||
        ratingVenueLocation == null || ratingVenueLocation < 1 || ratingVenueLocation > 5) {
      return NextResponse.json({ error: 'Missing or invalid required fields' }, { status: 400 });
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('feedback')
      .insert({
        event_id: id,
        user_id: userId,
        feedback_text: feedbackText,
        rating_organizer_conduct: ratingOrganizerConduct,
        rating_event_management: ratingEventManagement,
        rating_venue_location: ratingVenueLocation
      })
      .single();

    if (error) {
      console.error('Feedback insertion error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Feedback submitted successfully', data }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
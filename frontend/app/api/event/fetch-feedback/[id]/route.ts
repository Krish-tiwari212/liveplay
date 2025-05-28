import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request, { params }) {
  try {
    const { id } = params;

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('feedback')
      .select('rating_organizer_conduct, rating_event_management, rating_venue_location')
      .eq('event_id', id);

    if (error) {
      console.error('Feedback fetching error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ message: 'No feedback found for this event' }, { status: 404 });
    }

    const totalRatings = data.length;
    const sumRatings = data.reduce((acc, feedback) => {
      acc.ratingOrganizerConduct += feedback.rating_organizer_conduct;
      acc.ratingEventManagement += feedback.rating_event_management;
      acc.ratingVenueLocation += feedback.rating_venue_location;
      return acc;
    }, {
      ratingOrganizerConduct: 0,
      ratingEventManagement: 0,
      ratingVenueLocation: 0
    });

    const averageRating = (
      (sumRatings.ratingOrganizerConduct + sumRatings.ratingEventManagement + sumRatings.ratingVenueLocation) / 
      (totalRatings * 3)
    ).toFixed(2);

    return NextResponse.json({ averageRating: parseFloat(averageRating) }, { status: 200 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
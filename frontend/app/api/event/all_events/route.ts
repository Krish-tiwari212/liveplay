import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const organizerId = url.searchParams.get('organizer_id');

  try {
    const supabase = await createClient();

    let query = supabase
      .from('events')
      .select(`
        id,
        event_name,
        organizer_name,
        start_date,
        end_date,
        start_time,
        last_registration_date,
        last_withdrawal_date,
        venue_name,
        city,
        state,
        desktop_cover_image_url,
        mobile_cover_image_url,
        event_description,
        event_usp,
        rewards_for_participants,
        playing_rules,
        sport,
        cash_price_pool,
        show_qna,
        status,
        created_at,
        event_categories (
          id,
          category_name,
          price,
          category_type,
          has_discount,
          discount_type,
          discount_value,
          gender,
          min_age,
          max_age,
          ticket_description
        )
      `)
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (organizerId) {
      query = query.eq('organizer_id', organizerId);
    }

    const { data: events, error: eventsError } = await query;

    if (eventsError) {
      console.error('Error fetching events:', eventsError);
      return NextResponse.json(
        { error: 'Error fetching events' }, 
        { status: 500 }
      );
    }

    // Process events to include derived data
    const processedEvents = events?.map(event => ({
      ...event,
      categories: event.event_categories?.map(category => ({
        ...category,
        final_price: category.has_discount 
          ? category.discount_type === 'percentage'
            ? category.price * (1 - category.discount_value / 100)
            : category.price - category.discount_value
          : category.price
      })),
      lowest_price: Math.min(
        ...event.event_categories.map(cat => 
          cat.has_discount 
            ? cat.discount_type === 'percentage'
              ? cat.price * (1 - cat.discount_value / 100)
              : cat.price - cat.discount_value
            : cat.price
        )
      ),
      has_discounts: event.event_categories.some(cat => cat.has_discount)
    }));

    return NextResponse.json({ events: processedEvents }, { 
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
      }
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Server error' }, 
      { status: 500 }
    );
  }
}
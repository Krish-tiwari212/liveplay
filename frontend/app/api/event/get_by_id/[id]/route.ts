import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = await createClient();

    // Fetch event data
    const { data: event, error: eventError } = await supabase
      .from('events')
      .select('*')
      .eq('id', params.id)
      .single();

    if (eventError) {
      return NextResponse.json({ error: eventError.message }, { status: 404 });
    }

    // Fetch categories data
    const { data: categories, error: categoriesError } = await supabase
      .from('event_categories')
      .select('*')
      .eq('event_id', params.id);

    if (categoriesError) {
      return NextResponse.json({ error: categoriesError.message }, { status: 404 });
    }

    // Combine event data with categories
    const responseData = {
      ...event,
      categories: categories || [],
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error('Error in get event by id', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
} 
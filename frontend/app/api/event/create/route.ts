import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server'

interface EventRequest {
  event_name: string;
  organizer_contact_number: string;
  organizer_email: string;
  start_date: string;  // ISO string for start date
  end_date: string;    // ISO string for end date
  last_registration_date: string;  // ISO string
  last_withdrawal_date: string;    // ISO string
  start_time: string;  // ISO string for time only
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
  countdown: boolean;
  enable_fixtures: boolean;
  categories: Array<{
    category_name: string;
    total_quantity: number;
    max_ticket_quantity: number;
    price: number;
    ticket_description?: string;
    discount_code?: string;
    category_type?: string;
    number_of_discounts?: number;
    percentage_input?: number;
    from_date?: string;  // ISO string
    till_date?: string;  // ISO string
  }>;
}

export async function POST(request: Request) {
  try {
    // Create a Supabase client
    const supabase = await createClient();
    // Parse the incoming request and files
    const formData = await request.formData();
    console.log('Form data:', formData);

    // Extract event details from formData
    const eventData: EventRequest = JSON.parse(formData.get('eventData') as string);

    // Extract mobile and desktop banner files
    const mobileBanner = formData.get('mobileBanner') as File;
    const desktopBanner = formData.get('desktopBanner') as File;

    // Required field check
    if (
      !formData.get('event_name') ||
      !formData.get('organizer_contact_number') ||
      !formData.get('organizer_email') ||
      !formData.get('start_date') ||
      !formData.get('end_date') ||
      !formData.get('venue_name') ||
      !formData.get('city') ||
      !formData.get('pincode') ||
      !formData.get('event_description') ||
      !formData.get('event_usp')
    ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Upload mobile banner to Supabase storage
    const { data: mobileBannerData, error: mobileBannerError } = await supabase.storage
      .from('banners')
      .upload(`mobile/${mobileBanner.name}`, mobileBanner);

    if (mobileBannerError) {
      console.error('Mobile banner upload error:', mobileBannerError);
      return NextResponse.json({ error: `Mobile banner upload failed: ${mobileBannerError.message}` }, { status: 400 });
    }

    // Get mobile banner URL
    const mobileBannerUrl = supabase.storage.from('banners').getPublicUrl(mobileBannerData.path);

    // Upload desktop banner to Supabase storage
    const { data: desktopBannerData, error: desktopBannerError } = await supabase.storage
      .from('banners')
      .upload(`desktop/${desktopBanner.name}`, desktopBanner);

    if (desktopBannerError) {
      console.error('Desktop banner upload error:', desktopBannerError);
      return NextResponse.json({ error: `Desktop banner upload failed: ${desktopBannerError.message}` }, { status: 400 });
    }

    // Get desktop banner URL
    const desktopBannerUrl = supabase.storage.from('banners').getPublicUrl(desktopBannerData.path);

    // Insert event data
    const { data: event, error: eventError } = await supabase
      .from('events')
      .insert({
        event_name: formData.get('event_name'),
        organizer_contact_number: formData.get('organizer_contact_number'),
        organizer_email: formData.get('organizer_email'),
        start_date: formData.get('start_date'),
        end_date: formData.get('end_date'),
        last_registration_date: formData.get('last_registration_date'),
        last_withdrawal_date: formData.get('last_withdrawal_date'),
        start_time: formData.get('start_time'),
        venue_name: formData.get('venue_name'),
        street_address: formData.get('street_address'),
        additional_details: formData.get('additional_details'),
        city: formData.get('city'),
        pincode: formData.get('pincode'),
        venue_not_decided: formData.get('venue_not_decided'),
        map_view: formData.get('map_view'),
        event_description: formData.get('event_description'),
        event_usp: formData.get('event_usp'),
        rewards_for_participants: formData.get('rewards_for_participants'),
        playing_rules: formData.get('playing_rules'),
        countdown: formData.get('countdown'),
        enable_fixtures: formData.get('enable_fixtures'),
        desktop_cover_image_url: desktopBannerUrl.data.publicUrl,
        mobile_cover_image_url: mobileBannerUrl.data.publicUrl,
      })
      .select('id')
      .single();

    if (eventError) {
      console.error('Event insertion error:', eventError);
      return NextResponse.json({ error: eventError.message }, { status: 400 });
    }

    // Insert categories into event_categories table
    for (const category of eventData.categories) {
      const { error: categoryError } = await supabase
        .from('event_categories')
        .insert({
          event_id: event.id,
          category_name: category.category_name,
          total_quantity: category.total_quantity,
          max_ticket_quantity: category.max_ticket_quantity,
          price: category.price,
          ticket_description: category.ticket_description,
          discount_code: category.discount_code,
          category_type: category.category_type,
          number_of_discounts: category.number_of_discounts,
          percentage_input: category.percentage_input,
          from_date: category.from_date,
          till_date: category.till_date,
        });

      if (categoryError) {
        console.error('Category insertion error:', categoryError);
        return NextResponse.json({ error: `Category insertion failed: ${categoryError.message}` }, { status: 400 });
      }
    }

    return NextResponse.json({ message: 'Event created successfully', event }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);  // Log unexpected errors
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

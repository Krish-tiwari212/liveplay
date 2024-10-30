import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server'
import crypto from 'crypto';

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
  venue_link?: string;
  sport: string;
  selected_plan: string;
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
    amount_input?: number;
    discount_value?: number;
  }>;
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const formData = await request.formData();
    console.log('Form data:', formData);

    const eventData: EventRequest = JSON.parse(formData.get('eventData') as string);
    const mobileBanner = formData.get('mobileBanner') as File;
    const desktopBanner = formData.get('desktopBanner') as File;

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

    const hashFile = async (file: File): Promise<string> => {
      const arrayBuffer = await file.arrayBuffer();
      const hash = crypto.createHash('sha256');
      hash.update(new Uint8Array(arrayBuffer));
      return hash.digest('hex');
    };

    const uploadImage = async (file: File, folder: string) => {
      const fileHash = await hashFile(file);

      const { data: existingFiles, error: listError } = await supabase.storage
        .from('banners')
        .list(folder, { search: fileHash });

      if (listError) {
        console.error('Error listing files:', listError);
        return { error: listError.message };
      }

      if (existingFiles && existingFiles.length > 0) {
        return { url: supabase.storage.from('banners').getPublicUrl(`${folder}/${fileHash}`).data.publicUrl };
      }

      const { data, error } = await supabase.storage
        .from('banners')
        .upload(`${folder}/${fileHash}`, file);

      if (error) {
        console.error('Upload error:', error);
        return { error: error.message };
      }

      return { url: supabase.storage.from('banners').getPublicUrl(data.path).data.publicUrl };
    };

    const mobileBannerResult = await uploadImage(mobileBanner, 'mobile');
    if (mobileBannerResult.error) {
      return NextResponse.json({ error: `Mobile banner upload failed: ${mobileBannerResult.error}` }, { status: 400 });
    }

    const desktopBannerResult = await uploadImage(desktopBanner, 'desktop');
    if (desktopBannerResult.error) {
      return NextResponse.json({ error: `Desktop banner upload failed: ${desktopBannerResult.error}` }, { status: 400 });
    }

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
        venue_link: formData.get('venue_link'),
        sport: formData.get('sport'),
        selected_plan: formData.get('selected_plan'),
        desktop_cover_image_url: desktopBannerResult.url,
        mobile_cover_image_url: mobileBannerResult.url,
      })
      .select('id')
      .single();

    if (eventError) {
      console.error('Event insertion error:', eventError);
      return NextResponse.json({ error: eventError.message }, { status: 400 });
    }

    for (const category of eventData.categories) {
      const { error: categoryError } = await supabase
        .from('event_categories')
        .insert({
          event_id: event.id,
          category_name: category.category_name,
          total_quantity: category.total_quantity,
          discount_value: category.discount_value,
          amount_input: category.amount_input,
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
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
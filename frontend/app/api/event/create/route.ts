import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    // Create a Supabase client
    const supabase = await createClient();
    const session = await supabase.auth.getSession();
    const organizerId = session.data.session?.user.id;

    // Parse the incoming request and files
    const formData = await request.formData();
    console.log('Form data:', formData);

    // Extract event details and mobile banner
    const eventData = JSON.parse(formData.get('eventData') as string);
    const mobileBannerUrl = formData.get('mobileBannerUrl') as string;

    // Insert event data using formData values
    const { data: event, error: eventError } = await supabase
      .from('events')
      .insert({
        organizer_id: organizerId,
        sport: formData.get('sport'),
        event_name: formData.get('event_name'),
        last_registration_date: formData.get('last_registration_date'),
        last_withdrawal_date: formData.get('last_withdrawal_date'),
        start_date: formData.get('start_date'),
        end_date: formData.get('end_date'),
        start_time: formData.get('start_time'),
        organizer_name: formData.get('organizer_name'),
        organizer_contact_number: formData.get('organizer_contact_number'),
        organizer_email: formData.get('organizer_email'),
        website_link: formData.get('website_link'),
        insta_link: formData.get('insta_link'),
        venue_name: formData.get('venue_name'),
        street_address: formData.get('street_address'),
        city: formData.get('city'),
        state: formData.get('state'),
        pincode: formData.get('pincode'),
        venue_link: formData.get('venue_link'),
        event_description: formData.get('event_description'),
        event_usp: formData.get('event_usp'),
        rewards_for_participants: formData.get('rewards_for_participants'),
        playing_rules: formData.get('playing_rules'),
        cash_price_pool: formData.get('cash_price_pool'),
        mobile_cover_image_url: mobileBannerUrl,
        desktop_cover_image_url: mobileBannerUrl,
        countdown: formData.get('countdown') === 'true',
        want_tshirts: formData.get('want_Tshirts') === 'true',
        enable_fixtures: formData.get('enable_fixtures') === 'true',
        show_qna: formData.get('showqna') === 'true',
        selected_plan: formData.get('selected_plan'),
        gst_compliance: formData.get('Gst_Compliance') === 'true',
        status: 'active',
        created_at: new Date().toISOString()
      })
      .select('id')
      .single();

    if (eventError) {
      console.error('Event insertion error:', eventError);
      return NextResponse.json({ error: eventError.message }, { status: 400 });
    }

    // Insert categories from eventData
    for (const category of eventData.categories) {
      const { error: categoryError } = await supabase
        .from('event_categories')
        .insert({
          event_id: event.id,
          category_name: category.category_name,
          ticket_description: category.ticket_description,
          price: parseFloat(category.price),
          total_quantity: category.total_quantity ? parseInt(category.total_quantity) : null,
          max_ticket_quantity: category.max_ticket_quantity ? parseInt(category.max_ticket_quantity) : null,
          category_type: category.category_type,
          has_discount: category.discount,
          discount_code: category.discount_code,
          discount_type: category.discountType,
          number_of_discounts: category.number_of_discounts ? parseInt(category.number_of_discounts) : null,
          discount_start_date: category.from_date,
          discount_end_date: category.till_date,
          discount_value: category.discountValue ? parseFloat(category.discountValue) : null,
          percentage_input: category.percentage_input ? parseFloat(category.percentage_input) : null,
          amount_input: category.amount_input ? parseFloat(category.amount_input) : null,
          gender: category.gender,
          min_age: category.age_from ? parseInt(category.age_from) : null,
          max_age: category.age_to ? parseInt(category.age_to) : null,
          age_range_option: category.ageRangeOption
        });

      if (categoryError) {
        console.error('Category insertion error:', categoryError);
        return NextResponse.json({ error: `Category insertion failed: ${categoryError.message}` }, { status: 400 });
      }
    }

    // Insert sponsors from eventData
    if (eventData.sponsors && Array.isArray(eventData.sponsors)) {
      for (const sponsor of eventData.sponsors) {
        let sponsorImageUrl = '';
        const sponsorImage = formData.get(`sponsorImage_${sponsor.name}`) as File;

        if (sponsorImage && sponsorImage.size > 0) {
          const { data: sponsorImageData, error: sponsorImageError } = await supabase.storage
            .from('sponsors')
            .upload(`sponsors/${Date.now()}-${sponsorImage.name}`, sponsorImage);

          if (sponsorImageError) {
            console.error('Sponsor image upload error:', sponsorImageError);
            return NextResponse.json({ error: `Sponsor image upload failed: ${sponsorImageError.message}` }, { status: 400 });
          }

          // Get sponsor image URL
          sponsorImageUrl = supabase.storage.from('sponsors').getPublicUrl(sponsorImageData.path).data.publicUrl;
        }

        const { error: sponsorError } = await supabase
          .from('sponsors')
          .insert({
            event_id: event.id,
            name: sponsor.name,
            image_url: sponsorImageUrl
          });

        if (sponsorError) {
          console.error('Sponsor insertion error:', sponsorError);
          return NextResponse.json({ error: `Sponsor insertion failed: ${sponsorError.message}` }, { status: 400 });
        }
      }
    }

    return NextResponse.json({ 
      message: 'Event created successfully', 
      event 
    }, { status: 201 });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
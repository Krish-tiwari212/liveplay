import { createClient } from '@/utils/supabase/server';

async function sendWhatsAppMessage(event_id: string, user_id: string) {
  const supabase = await createClient();

  // Fetch event details
  const { data: eventData, error: eventError } = await supabase
    .from('events')
    .select('event_name, venue_name, street_address, start_date, mobile_cover_image_url')
    .eq('id', event_id)
    .single();

  if (eventError || !eventData) {
    console.error('Error fetching event details:', eventError);
    return;
  }

  const { event_name, venue_name, street_address, start_date, mobile_cover_image_url } = eventData;

  // Fetch user details
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('contact_number, full_name')
    .eq('id', user_id)
    .single();

  if (userError || !userData || !userData.contact_number) {
    console.error('Error fetching user details or user has no contact number:', userError);
    return;
  }

  let date = new Date(start_date).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const contactNumber = userData.contact_number;
  const name = userData.full_name;

  // Prepare the payload for the WhatsApp API
  const payload = {
    integrated_number: "919359059696",
    content_type: "template",
    payload: {
      messaging_product: "whatsapp",
      type: "template",
      template: {
        name: "registration_success",
        language: {
          code: "en",
          policy: "deterministic"
        },
        namespace: "dcf7d342_945c_4a04_aeaa_5273cecf9a98",
        to_and_components: [
          {
            to: [contactNumber],
            components: {
              header_1: {
                type: "image",
                value: mobile_cover_image_url
              },
              body_1: {
                type: "text",
                value: name
              },
              body_2: {
                type: "text",
                value: event_name
              },
              body_3: {
                type: "text",
                value: venue_name
              },
              body_4: {
                type: "text",
                value: street_address
              },
              body_5: {
                type: "text",
                value: date
              },
              button_1: {
                subtype: "url",
                type: "text",
                value: "playerdashboard"
              },
              button_2: {
                subtype: "url",
                type: "text",
                value: `eventspage?event_id=${event_id}`
              }
            }
          }
        ]
      }
    }
  };

  // Send the message using the fetch API
  try {
    const response = await fetch('https://api.msg91.com/api/v5/whatsapp/whatsapp-outbound-message/bulk/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authkey': '435086AzYm8o25376740af6aP1'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error('Error sending WhatsApp message:', response.statusText);
    } else {
      console.log('WhatsApp message sent successfully');
    }
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
  }
}

export default sendWhatsAppMessage;
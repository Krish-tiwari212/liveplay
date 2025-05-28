import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { user_id, contact_number } = await request.json();
  console.log(user_id, contact_number);

  if (!user_id || !contact_number) {
    return NextResponse.json({ error: 'User ID and contact number are required' }, { status: 400 });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
  const otpId = uuidv4(); // Generate a unique ID for the OTP
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

  // Store OTP in the database
  const { error } = await supabase.from('otps').insert({
    id: otpId,
    user_id,
    otp,
    expires_at: expiresAt,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Send OTP via WhatsApp
  const url = "https://api.msg91.com/api/v5/whatsapp/whatsapp-outbound-message/bulk/";
  const payload = {
    "integrated_number": "919359059696",
    "content_type": "template",
    "payload": {
      "messaging_product": "whatsapp",
      "type": "template",
      "template": {
        "name": "liveplay_whatsapp_otp",
        "language": {
          "code": "en",
          "policy": "deterministic"
        },
        "namespace": "dcf7d342_945c_4a04_aeaa_5273cecf9a98",
        "to_and_components": [
          {
            "to": [contact_number],
            "components": {
              "body_1": {
                "type": "text",
                "value": otp
              },
              "button_1": {
                "subtype": "url",
                "type": "text",
                "value": otp
              }
            }
          }
        ]
      }
    }
  };

  const headers = {
    "content-type": "application/json",
    "authkey": "435086AzYm8o25376740af6aP1"
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to send OTP via WhatsApp' }, { status: 500 });
  }

  return NextResponse.json({ message: 'OTP sent successfully' }, { status: 200 });
}
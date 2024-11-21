// app/api/organizer/details/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { v4 as uuidv4 } from 'uuid';

interface OrganizerDetailsRequest {
  user_id: string;
  full_name: string;
  contact_number: string;
  full_address: string;
  city: string;
  pincode: string;
  pan: string;
  aadhar_front: string; // Base64 encoded image
  aadhar_back: string; // Base64 encoded image
  name_as_per_account: string;
  account_number: string;
  ifsc_code: string;
  bank_name: string;
}

export async function POST(request: Request) {
  const supabase = await createClient();

  try {
    const {
      user_id,
      full_name,
      contact_number,
      full_address,
      city,
      pincode,
      pan,
      aadhar_front,
      aadhar_back,
      name_as_per_account,
      account_number,
      ifsc_code,
      bank_name,
    }: OrganizerDetailsRequest = await request.json();

    // Upload Aadhar front image
    const aadharFrontFileName = `${uuidv4()}-aadhar-front.png`;
    const { error: aadharFrontError } = await supabase.storage
      .from('aadhar-images')
      .upload(aadharFrontFileName, Buffer.from(aadhar_front, 'base64'), {
        contentType: 'image/png',
      });

    if (aadharFrontError) {
      return NextResponse.json({ error: aadharFrontError.message }, { status: 400 });
    }

    // Upload Aadhar back image
    const aadharBackFileName = `${uuidv4()}-aadhar-back.png`;
    const { error: aadharBackError } = await supabase.storage
      .from('aadhar-images')
      .upload(aadharBackFileName, Buffer.from(aadhar_back, 'base64'), {
        contentType: 'image/png',
      });

    if (aadharBackError) {
      return NextResponse.json({ error: aadharBackError.message }, { status: 400 });
    }

    // Insert organizer details into the 'organizer_details' table
    const { error: insertError } = await supabase.from('organizer_details').insert({
      user_id,
      full_name,
      contact_number,
      full_address,
      city,
      pincode,
      pan,
      aadhar_front: aadharFrontFileName,
      aadhar_back: aadharBackFileName,
      name_as_per_account,
      account_number,
      ifsc_code,
      bank_name,
    });

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Organizer details added successfully' }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
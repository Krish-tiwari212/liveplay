// app/api/organizer/details/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { v4 as uuidv4 } from 'uuid';

interface OrganizerDetailsRequest {
  user_id: string;
  contactNumber: string;
  fullName: string;
  fullAddress: string;
  city: string;
  pincode: string;
  aadharFront: string; // Base64 encoded image
  aadharBack: string; // Base64 encoded image
  pan: string; // Base64 encoded image
  accountName: string;
  accountNumber: string;
  reAccountNumber: string;
  ifscCode: string;
  bankName: string;
}

const getContentType = (base64String: string): string => {
  if (base64String.startsWith('data:image/jpeg')) {
    return 'image/jpeg';
  } else if (base64String.startsWith('data:image/png')) {
    return 'image/png';
  } else {
    throw new Error('Unsupported image format');
  }
};

const getFileExtension = (contentType: string): string => {
  if (contentType === 'image/jpeg') {
    return 'jpg';
  } else if (contentType === 'image/png') {
    return 'png';
  } else {
    throw new Error('Unsupported image format');
  }
};

export async function POST(request: Request) {
  const supabase = await createClient();

  try {
    const {
      user_id,
      contactNumber,
      fullName,
      fullAddress,
      city,
      pincode,
      aadharFront,
      aadharBack,
      pan,
      accountName,
      accountNumber,
      reAccountNumber,
      ifscCode,
      bankName,
    }: OrganizerDetailsRequest = await request.json();

    // Upload Aadhar front image
    const aadharFrontContentType = getContentType(aadharFront);
    const aadharFrontFileExtension = getFileExtension(aadharFrontContentType);
    const aadharFrontFileName = `${uuidv4()}-aadhar-front.${aadharFrontFileExtension}`;
    const { error: aadharFrontError } = await supabase.storage
      .from('aadhar-images')
      .upload(aadharFrontFileName, Buffer.from(aadharFront.split(',')[1], 'base64'), {
        contentType: aadharFrontContentType,
      });

    if (aadharFrontError) {
      return NextResponse.json({ error: aadharFrontError.message }, { status: 400 });
    }
    console.log(aadharFrontFileName);

    // Upload Aadhar back image
    const aadharBackContentType = getContentType(aadharBack);
    const aadharBackFileExtension = getFileExtension(aadharBackContentType);
    const aadharBackFileName = `${uuidv4()}-aadhar-back.${aadharBackFileExtension}`;
    const { error: aadharBackError } = await supabase.storage
      .from('aadhar-images')
      .upload(aadharBackFileName, Buffer.from(aadharBack.split(',')[1], 'base64'), {
        contentType: aadharBackContentType,
      });

    if (aadharBackError) {
      return NextResponse.json({ error: aadharBackError.message }, { status: 400 });
    }
    console.log(aadharBackFileName);

    // Upload PAN image
    const panContentType = getContentType(pan);
    const panFileExtension = getFileExtension(panContentType);
    const panFileName = `${uuidv4()}-pan.${panFileExtension}`;
    const { error: panError } = await supabase.storage
      .from('pan-images')
      .upload(panFileName, Buffer.from(pan.split(',')[1], 'base64'), {
        contentType: panContentType,
      });

    if (panError) {
      return NextResponse.json({ error: panError.message }, { status: 400 });
    }
    console.log(panFileName);

    // Insert organizer details into the 'organizer_details' table
    const { error: insertError } = await supabase.from('organizer_details').insert({
      user_id,
      contact_number: contactNumber,
      full_name: fullName,
      full_address: fullAddress,
      city,
      pincode,
      aadhar_front: aadharFrontFileName,
      aadhar_back: aadharBackFileName,
      pan: panFileName,
      name_as_per_account: accountName,
      account_number: accountNumber,
      ifsc_code: ifscCode,
      bank_name: bankName,
    });

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Organizer details added successfully' }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
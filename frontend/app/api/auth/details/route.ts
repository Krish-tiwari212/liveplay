// app/api/user/details/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

interface UserDetailsRequest {
  user_id: string;
  contact_number?: string;
  gender?: string;
  dob?: string;
  city?: string;
  pincode?: string;
  blood_group?: string;
}

export async function POST(request: Request) {
  const supabase = await createClient();

  try {
    const { user_id, contact_number, gender, dob, city, pincode, blood_group }: UserDetailsRequest = await request.json();

    // Insert user details into the 'users' table
    const { error: insertError } = await supabase.from('users').update({
      contact_number,
      gender,
      dob,
      city,
      pincode,
      blood_group,
    }).eq('id', user_id);

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'User details updated successfully' }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
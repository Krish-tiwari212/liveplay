import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

interface UpdateProfileRequest {
  userId: string;
  full_name?: string;
  contact_number?: string;
  date_of_birth?: string;
  city?: string;
  pincode?: string;
  gender?: string;
  blood_group?: string;
  phone?: string;
}

export async function POST(request: Request) {
  const supabase = await createClient();
  try {
    const { userId, full_name, contact_number, date_of_birth, city, pincode, gender, blood_group, phone }: UpdateProfileRequest = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('users')
      .update({
        full_name,
        contact_number,
        date_of_birth,
        city,
        pincode,
        gender,
        blood_group,
        phone,
      })
      .eq('id', userId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Profile updated successfully', data }, { status: 200 });
  } catch (error) {
    console.error('Error in updating profile', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
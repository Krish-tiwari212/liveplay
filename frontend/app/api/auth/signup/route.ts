import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

interface SignupRequest {
  full_name: string;
  email: string;
  password: string;
  role: 'participant' | 'organizer';
  contact_number: string;
  city: string;
  pincode: string;
  pan?: string;  // Only required for organizers
  aadhar_front?: string;  // Only for organizers
  aadhar_back?: string;   // Only for organizers
  bank_name?: string;     // Only for organizers
  account_number?: string;  // Only for organizers
  ifsc_code?: string;     // Only for organizers
}

export async function POST(request: Request) {
  try {
    const { full_name, email, password, role, contact_number, city, pincode, pan, aadhar_front, aadhar_back, bank_name, account_number, ifsc_code }: SignupRequest = await request.json();
    
    const { data: user, error: authError } = await supabase.auth.signUp({
      email,
      password
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    const { error: insertError } = await supabase.from('users').insert({
      id: user?.user?.id || '', 
      full_name,
      email,
      contact_number,
      role,
      city,
      pincode
    });

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 400 });
    }

    if (role === 'organizer') {
      const { error: organizerError } = await supabase.from('organizer_details').insert({
        user_id: user?.user?.id || '',
        pan,
        aadhar_front,
        aadhar_back,
        bank_name,
        account_number,
        ifsc_code
      });

      if (organizerError) {
        return NextResponse.json({ error: organizerError.message }, { status: 400 });
      }
    }

    return NextResponse.json({ message: 'User created successfully' }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

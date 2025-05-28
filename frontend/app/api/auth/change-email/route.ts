import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

interface UpdateEmailRequest {
  userId: string;
  currentEmail: string;
  newEmail: string;
}

export async function POST(request: Request) {
  const supabase = await createClient();

  try {
    const { userId, currentEmail, newEmail }: UpdateEmailRequest = await request.json();
    console.log(userId, currentEmail, newEmail);

    // Generate an email change link to be sent to the current email address
    const { data: currentEmailData, error: currentEmailError } = await supabase.auth.admin.generateLink({
      type: 'email_change_current',
      email: currentEmail,
      newEmail: newEmail,
    });

    if (currentEmailError) {
      return NextResponse.json({ error: currentEmailError.message }, { status: 400 });
    }

    // Generate an email change link to be sent to the new email address
    const { data: newEmailData, error: newEmailError } = await supabase.auth.admin.generateLink({
      type: 'email_change_new',
      email: currentEmail,
      newEmail: newEmail,
    });

    if (newEmailError) {
      return NextResponse.json({ error: newEmailError.message }, { status: 400 });
    }

    // Update user email in the 'users' table
    const { error: updateError } = await supabase.from('users').update({
      email: newEmail,
    }).eq('id', userId);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Email update link sent successfully' }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
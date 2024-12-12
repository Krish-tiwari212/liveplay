import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

interface UpdatePasswordRequest {
  userId: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export async function POST(request: Request) {
  const supabase = await createClient();

  try {
    const { userId, currentPassword, newPassword, confirmPassword }: UpdatePasswordRequest = await request.json();

    if (newPassword !== confirmPassword) {
      return NextResponse.json({ error: 'New password and confirm password do not match' }, { status: 400 });
    }

    // Verify the current password
    const { data: user, error: userError } = await supabase.auth.signInWithPassword({
      email: userId, // Assuming userId is the email
      password: currentPassword,
    });

    if (userError) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
    }

    // Update the password
    const { error: updateError } = await supabase.auth.updateUser({
      data: { password: newPassword },
    });

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Password updated successfully' }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
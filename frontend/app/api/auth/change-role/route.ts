import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

interface UpdateRoleRequest {
  userId: string;
  newRole: 'participant' | 'organizer';
}

export async function POST(request: Request) {
  const supabase = await createClient();

  try {
    const { userId, newRole }: UpdateRoleRequest = await request.json();

    // Update user role in the 'users' table
    const { error: updateError } = await supabase.from('users').update({
      role: newRole,
    }).eq('id', userId);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'User role updated successfully' }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
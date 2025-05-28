import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

interface WithdrawEventRequest {
  user_id: string;
  categories: string[];
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient();
  const body = await req.json();
  const { user_id, categories }: WithdrawEventRequest = body;

  // Ensure the user is authenticated
  const { data: user, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Retrieve the event entry for the user
  const { data: eventEntry, error: entryFetchError } = await supabase
    .from('event_entries')
    .select('id')
    .eq('user_id', user_id)
    .eq('event_id', params.id)
    .single();

  if (entryFetchError || !eventEntry) {
    return NextResponse.json({ error: 'Event entry not found' }, { status: 404 });
  }

  // Delete associated categories
  const { error: categoryDeleteError } = await supabase
    .from('event_categories')
    .delete()
    .eq('event_entry_id', eventEntry.id)
    .in('category_id', categories);

  if (categoryDeleteError) {
    return NextResponse.json({ error: categoryDeleteError.message }, { status: 400 });
  }

  // Delete the event entry
  const { error: entryDeleteError } = await supabase
    .from('event_entries')
    .delete()
    .eq('id', eventEntry.id);

  if (entryDeleteError) {
    return NextResponse.json({ error: entryDeleteError.message }, { status: 400 });
  }

  return NextResponse.json({ message: 'Event entry withdrawn successfully' }, { status: 200 });
}
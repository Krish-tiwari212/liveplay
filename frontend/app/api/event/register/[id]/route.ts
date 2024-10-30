import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request, { params }: { params: { eventId: string } }) {
  const supabase = await createClient();
  const body = await req.json();
  const { user_id, categories } = body; // categories is an array of category_ids selected

  // Ensure the user is authenticated
  const { data: user, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Create event entry for the user
  const { data: eventEntry, error: entryError } = await supabase
    .from('event_entries')
    .insert({
      user_id,
      event_id: params.eventId,
      status: 'pending'
    })
    .select()
    .single();

  if (entryError) {
    return NextResponse.json({ error: entryError.message }, { status: 400 });
  }

  // Link selected categories with the event entry
  const categoryEntries = categories.map((categoryId: string) => ({
    event_entry_id: eventEntry.id,
    category_id: categoryId,
  }));

  const { error: categoryError } = await supabase
    .from('event_categories')
    .insert(categoryEntries);

  if (categoryError) {
    return NextResponse.json({ error: categoryError.message }, { status: 400 });
  }

  return NextResponse.json({ eventEntryId: eventEntry.id }, { status: 201 });
}

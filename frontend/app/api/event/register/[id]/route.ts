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

  // Retrieve the user's gender and date of birth
  const userGender = user.gender;
  const userDob = new Date(user.date_of_birth);

  // Calculate the user's age
  const today = new Date();
  let age = today.getFullYear() - userDob.getFullYear();
  const monthDiff = today.getMonth() - userDob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < userDob.getDate())) {
    age--;
  }

  // Retrieve the categories from the database
  const { data: categoryData, error: categoryFetchError } = await supabase
    .from('categories')
    .select('id, gender, min_age, max_age');

  if (categoryFetchError) {
    return NextResponse.json({ error: categoryFetchError.message }, { status: 400 });
  }

  // Filter out categories that the user is not allowed to register for
  const invalidCategories = categories.filter((categoryId: string) => {
    const category = categoryData.find((cat: any) => cat.id === categoryId);
    const isGenderMismatch = category && category.gender && category.gender !== userGender;
    const isAgeMismatch = category && ((category.min_age && age < category.min_age) || (category.max_age && age > category.max_age));
    return isGenderMismatch || isAgeMismatch;
  });

  if (invalidCategories.length > 0) {
    return NextResponse.json({ error: 'You are not allowed to register for one or more selected categories.' }, { status: 400 });
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
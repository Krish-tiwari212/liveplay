import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(req: Request, { params }: { params: { eventId: string } }) {
  const supabase = await createClient();

  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .eq('event_id', params.eventId)
    .eq('is_active', true);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ categories }, { status: 200 });
}

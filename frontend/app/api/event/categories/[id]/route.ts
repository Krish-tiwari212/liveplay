import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient();

  const { data: categories, error } = await supabase
    .from('event_categories')
    .select('*')
    .eq('event_id', params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ categories }, { status: 200 });
}

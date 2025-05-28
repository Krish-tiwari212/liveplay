import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request, { params }) {
  try {
    const { id } = params;

    const supabase = await createClient();

    const { data: questions, error: questionsError } = await supabase
      .from('questions')
      .select('id, question_text, created_at, answers (id, answer_text, created_at)')
      .eq('event_id', id);

    if (questionsError) {
      console.error('Questions fetch error:', questionsError);
      return NextResponse.json({ error: questionsError.message }, { status: 400 });
    }

    return NextResponse.json({ questions }, { status: 200 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
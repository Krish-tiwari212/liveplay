import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request, { params }) {
  try {
    const { id } = params;

    const supabase = await createClient();

    const { data: feedback, error: feedbackError } = await supabase
      .from('feedback')
      .select('id, feedback_text, rating, created_at, user_id')
      .eq('event_id', id);

    if (feedbackError) {
      console.error('Feedback fetch error:', feedbackError);
      return NextResponse.json({ error: feedbackError.message }, { status: 400 });
    }

    return NextResponse.json({ feedback }, { status: 200 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
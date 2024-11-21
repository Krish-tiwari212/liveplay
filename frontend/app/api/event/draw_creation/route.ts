import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { z } from 'zod';

const DrawSchema = z.object({
  category_id: z.string(),
  draw_type: z.enum(['knockout', 'group_playoffs', 'round_robin']),
  match_duration: z.number().min(1, 'Match duration must be at least 1 minute'),
  round_duration: z.number().min(1, 'Round duration must be at least 1 minute'),
  sets: z.enum(['single_set', 'best_of_3', 'best_of_5']).optional(),
  points_per_set: z.number().optional(),
  innings_per_team: z.number().optional(),
  overs_per_innings: z.number().optional(),
  enable_extra_time: z.boolean().optional(),
  enable_penalties: z.boolean().optional(),
  match_days: z.array(z.string()).optional(),
  start_time: z.string().optional(),
  estimated_completion_time: z.string().optional(),
  interval_between_matches: z.string().optional(),
  number_of_groups: z.number().optional(),
  rounds_per_group: z.number().optional(),
  proceeders_to_next_round: z.number().optional(),
});

export async function POST(req: Request) {
  const supabase = await createClient();
  const body = await req.json();
  const parsedBody = DrawSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json({ error: parsedBody.error.errors }, { status: 400 });
  }

  const {
    category_id,
    draw_type,
    match_duration,
    round_duration,
    sets,
    points_per_set,
    innings_per_team,
    overs_per_innings,
    enable_extra_time,
    enable_penalties,
    match_days,
    start_time,
    estimated_completion_time,
    interval_between_matches,
    number_of_groups,
    rounds_per_group,
    proceeders_to_next_round,
  } = parsedBody.data;

  // Ensure the user is authenticated
  const { data: user, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check if the user is an organizer
  const { data: organizer, error: organizerError } = await supabase
    .from('organizers')
    .select('id')
    .eq('user_id', user.id)
    .single();

  if (organizerError || !organizer) {
    return NextResponse.json({ error: 'User is not an organizer' }, { status: 403 });
  }

  // Insert the draw details into the database
  const { data: draw, error: drawError } = await supabase
    .from('draws')
    .insert({
      category_id,
      draw_type,
      match_duration,
      round_duration,
      sets,
      points_per_set,
      innings_per_team,
      overs_per_innings,
      enable_extra_time,
      enable_penalties,
      match_days,
      start_time,
      estimated_completion_time,
      interval_between_matches,
      number_of_groups,
      rounds_per_group,
      proceeders_to_next_round,
      organizer_id: organizer.id,
    })
    .select()
    .single();

  if (drawError) {
    return NextResponse.json({ error: drawError.message }, { status: 400 });
  }

  return NextResponse.json({ drawId: draw.id }, { status: 201 });
}
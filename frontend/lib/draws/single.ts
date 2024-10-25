import { supabase } from '@/lib/supabaseClient';

async function generateSingleElimination(eventId: string) {
  const { data: participants } = await supabase
    .from('participants')
    .select('id')
    .eq('event_id', eventId);

  if (!participants) throw new Error('No participants found');

  const totalParticipants = participants.length;
  const rounds = Math.ceil(Math.log2(totalParticipants));
  let matches = [];
  let roundNumber = 1;
  let currentMatch = 0;

  while (currentMatch < totalParticipants / 2) {
    const participant1 = participants[currentMatch * 2];
    const participant2 = participants[currentMatch * 2 + 1] || null;

    const matchData = {
      event_id: eventId,
      round_number: roundNumber,
      participant1_id: participant1.id,
      participant2_id: participant2?.id || null,
      status: 'upcoming',
    };
    matches.push(matchData);
    currentMatch++;
  }

  await supabase.from('matches').insert(matches);
  return matches;
}

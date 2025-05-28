import { supabase } from '@/lib/supabaseClient';

async function generateDoubleElimination(eventId: string) {
    const { data: participants } = await supabase
      .from('participants')
      .select('id')
      .eq('event_id', eventId);
  
    let winnerBracket = [];
    let loserBracket = [];
    let roundNumber = 1;
  
    for (let i = 0; i < participants.length / 2; i++) {
      const matchData = {
        event_id: eventId,
        round_number: roundNumber,
        participant1_id: participants[i * 2].id,
        participant2_id: participants[i * 2 + 1].id,
        status: 'upcoming',
        match_type: 'winner',
      };
      winnerBracket.push(matchData);
    }
  
    await supabase.from('matches').insert(winnerBracket);
    return { winnerBracket, loserBracket };
}
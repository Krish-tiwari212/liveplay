import { supabase } from '@/lib/supabaseClient';

async function generateRoundRobin(eventId: string) {
    const { data: participants } = await supabase
      .from('participants')
      .select('id')
      .eq('event_id', eventId);
  
    let matches = [];
  
    for (let i = 0; i < participants.length; i++) {
      for (let j = i + 1; j < participants.length; j++) {
        matches.push({
          event_id: eventId,
          round_number: 1,
          participant1_id: participants[i].id,
          participant2_id: participants[j].id,
          status: 'upcoming',
          match_type: 'round_robin',
        });
      }
    }
  
    await supabase.from('matches').insert(matches);
    return matches;
  }
  
import { supabase } from "@/lib/supabaseClient";

async function generateGroupPlayoffs(eventId: string, groupSize: number) {
    const { data: participants } = await supabase
      .from('participants')
      .select('id')
      .eq('event_id', eventId);
  
    const groups = [];
    let groupCount = 1;
  
    for (let i = 0; i < participants.length; i += groupSize) {
      const groupParticipants = participants.slice(i, i + groupSize);
      groups.push(groupParticipants);
      groupCount++;
    }
  
    let matches = [];
  
    groups.forEach((group, index) => {
      group.forEach((p1, i) => {
        group.slice(i + 1).forEach((p2) => {
          matches.push({
            event_id: eventId,
            round_number: 1,
            group_id: index + 1,
            participant1_id: p1.id,
            participant2_id: p2.id,
            status: 'upcoming',
            match_type: 'group',
          });
        });
      });
    });
  
    await supabase.from('matches').insert(matches);
    return matches;
  }
  
async function saveCustomFixture(eventId: string, fixtureData: any) {
    const { error } = await supabase.from('draw_fixtures').insert({
      event_id: eventId,
      draw_type: 'custom',
      fixture_data: fixtureData,
    });
  
    if (error) throw new Error(error.message);
    return { message: 'Custom fixture saved successfully' };
}
  
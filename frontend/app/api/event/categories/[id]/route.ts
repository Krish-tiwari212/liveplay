import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient();

  const eventId = params.id; // Ensure this is a valid UUID string
  console.log('Event ID:', eventId);

  // Fetch categories
  const { data: categories, error: categoriesError } = await supabase
    .from('event_categories')
    .select('*')
    .eq('event_id', eventId);

  if (categoriesError) {
    return NextResponse.json({ error: categoriesError.message }, { status: 400 });
  }

  // Fetch sales data directly from the sales table
  const { data: salesData, error: salesError } = await supabase
    .from('sales')
    .select('category, amount') // Select the fields you need
    .eq('event_id', eventId);

  if (salesError) {
    return NextResponse.json({ error: salesError.message }, { status: 400 });
  }

  // Aggregate sales data by category
  const aggregatedSalesData = salesData.reduce((acc, sale) => {
    const { category, amount } = sale;
    if (!acc[category]) {
      acc[category] = { category, total_sales: 0 };
    }
    acc[category].total_sales += amount;
    return acc;
  }, {});

  // Convert aggregated sales data back to an array
  const salesArray = Object.values(aggregatedSalesData);

  // Calculate total entry fees collected
  const totalEntryFeesCollected = salesData.reduce((total, sale) => total + sale.amount, 0);

  // Fetch registrations data directly from the event_entries table
  const { data: registrationsData, error: registrationsError } = await supabase
    .from('event_entries') // Use the event_entries table
    .select('category_id') // Select the category field
    .eq('event_id', eventId);

  if (registrationsError) {
    return NextResponse.json({ error: registrationsError.message }, { status: 400 });
  }

  // Aggregate registrations data by category
  const aggregatedRegistrationsData = registrationsData.reduce((acc, registration) => {
    const { category_id } = registration; // Use category_id from event_entries
    if (!acc[category_id]) {
      acc[category_id] = { category_id, total_registrations: 0 };
    }
    acc[category_id].total_registrations += 1; // Count each registration
    return acc;
  }, {});

  // Convert aggregated registrations data back to an array
  const registrationsArray = Object.values(aggregatedRegistrationsData);

  // Calculate total number of registrations
  const totalNumberOfRegistrations = registrationsData.length;

  // Fetch total number of event views (assuming you have an event_views table)
  const { data: eventViewsData, error: eventViewsError } = await supabase
    .from('event_views') // Assuming you have a table for event views
    .select('*')
    .eq('event_id', eventId);

  if (eventViewsError) {
    return NextResponse.json({ error: eventViewsError.message }, { status: 400 });
  }

  // Calculate total number of event views
  const totalEventViews = eventViewsData.length;

  // Calculate total number of interested people (assuming you have a field in event_entries)
  const totalInterestedPeople = registrationsData.filter(entry => entry.interested).length; // Assuming 'interested' is a boolean field

  console.log('Categories:', categories);
  console.log('Sales Data:', salesArray);
  console.log('Total Entry Fees Collected:', totalEntryFeesCollected);
  console.log('Registrations Data:', registrationsArray);
  console.log('Total Number of Registrations:', totalNumberOfRegistrations);
  console.log('Total Event Views:', totalEventViews);
  console.log('Total Interested People:', totalInterestedPeople);

  return NextResponse.json({
    categories,
    sales: salesArray,
    totalEntryFeesCollected,
    registrations: registrationsArray,
    totalNumberOfRegistrations,
    totalEventViews,
    totalInterestedPeople,
  });
}

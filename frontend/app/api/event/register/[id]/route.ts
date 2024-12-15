import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import crypto from 'crypto';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, user_id, categories, create_team } = await req.json();

  // Verify payment
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (!isAuthentic) {
    return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
  }

  try {
    // Get payment details from Razorpay
    const response = await fetch(
      `https://api.razorpay.com/v1/payments/${razorpay_payment_id}`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
          ).toString('base64')}`,
        },
      }
    );

    const payment = await response.json();
    const { eventId, userId, categories } = payment.notes;

    // Ensure the user is authenticated
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData || !authData.user) {
      return NextResponse.json({ error: authError?.message || 'Unauthorized' }, { status: 401 });
    }

    const userId = authData.user.id;

    // Retrieve the categories from the database
    const { data: categoryData, error: categoryFetchError } = await supabase
      .from('event_categories')
      .select('id, gender, min_age, max_age, type');

    if (categoryFetchError) {
      return NextResponse.json({ error: categoryFetchError.message }, { status: 400 });
    }

    // Create participant entry for the user
    const { data: participantEntry, error: participantError } = await supabase
      .from('participants')
      .insert({
        user_id: userId,
        name: authData.user.user_metadata.full_name || authData.user.user_metadata.name || 'Unknown',
        event_id: params.id,
        status: 'pending',
        registration_date: new Date().toISOString(),
      })
      .select()
      .single();

    if (participantError) {
      return NextResponse.json({ error: participantError.message }, { status: 400 });
    }

    // Link selected categories with the participant entry
    const categoryEntries = categories.map((categoryId: string) => {
      const category = categoryData.find((cat: any) => cat.id === categoryId);
      let teamName = null;
      let partnerName = null;

      if (category.type === 'Doubles') {
        partnerName = payment.notes.partner_name;
      } else if (category.type !== 'Singles') {
        teamName = payment.notes.team_name;
      }

      return {
        participant_id: participantEntry.id,
        category_id: categoryId,
        event_id: params.id,
        team_name: teamName,
        partner_name: partnerName,
      };
    });

    const { error: categoryError } = await supabase
      .from('event_entries')
      .insert(categoryEntries);

    if (categoryError) {
      return NextResponse.json({ error: categoryError.message }, { status: 400 });
    }

    // Handle team creation if requested
    if (create_team) {
      const maxRetries = 5;
      const teamEntries = [];

      for (const categoryId of categories) {
        let teamCode;
        let teamError;
        let retries = 0;

        do {
          teamCode = Math.random().toString(36).substring(2, 8).toUpperCase(); // Generate a random 6-digit code

          const result = await supabase
            .from('teams')
            .insert({
              event_id: params.id,
              category_id: categoryId,
              team_code: teamCode,
            })
            .select();

          teamError = result.error;
          retries++;
        } while (teamError && teamError.message.includes('duplicate key value') && retries < maxRetries);

        if (teamError) {
          return NextResponse.json({ error: teamError.message }, { status: 400 });
        }

        teamEntries.push({ categoryId, teamCode });
      }

      // Update the participant entry with the team ID for each category
      for (const entry of teamEntries) {
        const { data: teamData, error: teamFetchError } = await supabase
          .from('teams')
          .select('id')
          .eq('team_code', entry.teamCode)
          .single();

        if (teamFetchError || !teamData) {
          return NextResponse.json({ error: teamFetchError.message }, { status: 400 });
        }

        const { error: updateParticipantError } = await supabase
          .from('participants')
          .update({ team_id: teamData.id })
          .eq('id', participantEntry.id)
          .eq('event_id', params.id);

        if (updateParticipantError) {
          return NextResponse.json({ error: updateParticipantError.message }, { status: 400 });
        }
      }

      return NextResponse.json({ participantId: participantEntry.id, teamEntries }, { status: 201 });
    }

    return NextResponse.json({ participantId: participantEntry.id }, { status: 201 });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json({ error: 'Payment verification failed' }, { status: 500 });
  }
}
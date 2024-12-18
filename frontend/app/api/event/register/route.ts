import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import crypto from 'crypto';
import sendWhatsAppMessage from '@/lib/success_message';

export async function POST(req: Request) {
  const supabase = await createClient();
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

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
    const { eventId, userId, categories: categoriesString } = payment.notes;

    // Parse categories if it is a string
    const categories = typeof categoriesString === 'string' ? JSON.parse(categoriesString) : categoriesString;
    // Ensure the user is authenticated
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData || !authData.user) {
      return NextResponse.json({ error: authError?.message || 'Unauthorized' }, { status: 401 });
    }
    // Insert into Participants table
    const { data: participantEntry, error: participantError } = await supabase
      .from('participants')
      .insert({
        user_id: userId,
        event_id: eventId,
        payment_status: 'paid',
        total_amount: payment.amount / 100,
        registration_date: new Date().toISOString(),
        status: 'confirmed',
        category_id: categories[0]["id"],
        name: authData.user.user_metadata.full_name || authData.user.user_metadata.name || 'Unknown',
        partner_name: categories[0]["pairname"],
        leader: true,
      })
      .select()
      .single();

    if (participantError) {
      throw participantError;
    }

    // Insert into Payments table
    const { error: paymentError } = await supabase
      .from('payments')
      .insert({
        organizer_id: payment.notes.organizer_id,
        event_id: eventId,
        amount: payment.amount / 100,
        currency: payment.currency,
        payment_status: 'completed',
        payment_method: payment.method,
        transaction_id: razorpay_payment_id,
        payment_date: new Date(payment.created_at).toISOString()
      });

    if (paymentError) {
      throw paymentError;
    }

    // Proceed with the registration logic
    const { create_team, team_name, partner_name } = payment.notes;

    // Retrieve the user's gender and date of birth from the user table
    const { data: userData, error: userFetchError } = await supabase
      .from('users')
      .select('gender, date_of_birth')
      .eq('id', userId)
      .single();

    if (userFetchError || !userData) {
      return NextResponse.json({ error: userFetchError.message }, { status: 404 });
    }

    const userGender = userData.gender;
    const userDob = userData.date_of_birth ? new Date(userData.date_of_birth) : null;

    // Calculate the user's age if date of birth is available
    let age = null;
    if (userDob) {
      const today = new Date();
      age = today.getFullYear() - userDob.getFullYear();
      const monthDiff = today.getMonth() - userDob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < userDob.getDate())) {
        age--;
      }
    }

    // Retrieve the categories from the database
    const { data: categoryData, error: categoryFetchError } = await supabase
      .from('event_categories')
      .select('id, gender, min_age, max_age');

    if (categoryFetchError) {
      return NextResponse.json({ error: categoryFetchError.message }, { status: 400 });
    }

    const maxRetries = 5;
    const teamEntries = [];
    console.log('Categories:', categories);
    for (let i=0; i<categories.length; i++) {
      const category = categories[i];
      const categoryId = category.id;
      let teamCode;
      let teamError;
      let retries = 0;
      let teamId;

      do {
        teamCode = Math.random().toString(36).substring(2, 8).toUpperCase(); // Generate a random 6-digit code
        console.log(categoryId, participantEntry.id, teamCode);
        const result = await supabase
          .from('teams')
          .insert({
            event_id: eventId,
            category_id: Number(categoryId),
            team_code: teamCode,
            team_name: categories[0]["teamName"] || categories[0]["pairname"] || 'Team',
            participant_ids: [participantEntry.id],
            category_type: category.category_type,
          })
          .select();
        teamId = result.data[0].id;

        teamError = result.error;
        retries++;
      } while (teamError && teamError.message.includes('duplicate key value') && retries < maxRetries);

      console.log('Team entry:', teamCode, teamError);
      if (teamError) {
        return NextResponse.json({ error: "Error in team creation" }, { status: 400 });
      }
      
      // Update participant row with team_id
      const { data: updatedParticipant, error: updateParticipantError } = await supabase
      .from('participants')
      .update({ team_id: teamId })
      .eq('id', participantEntry.id);

      if (updateParticipantError) {
        return NextResponse.json({ error: 'Error updating participant with team ID' }, { status: 400 });
      }
      teamEntries.push({ categoryId, teamCode });
    }

    // Handle partner name for doubles category
    if (partner_name) {
      const { data: partnerData, error: partnerError } = await supabase
        .from('participants')
        .update({ partner_name })
        .eq('id', participantEntry.id)
        .eq('event_id', eventId);

      if (partnerError) {
        return NextResponse.json({ error: "error in partner creation", success: true }, { status: 400 });
      }
    }

    sendWhatsAppMessage(eventId, userId).catch(error => {
      console.error('Error sending WhatsApp message:', error);
    });

    return NextResponse.json({ participantId: participantEntry.id, teamEntries, success: true }, { status: 201 });

  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json({ error: 'Payment verification failed' }, { status: 500 });
  }
}
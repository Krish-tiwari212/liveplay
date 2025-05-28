import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

interface CartItem {
  id: string;
  user_id: string;
  name: string;
  price: number;
  quantity: number;
  categoryType: string;
}

const supabase = createClient();

export async function POST(request: Request) {
  const { action, item, itemId, quantity, discountCode, userId } = await request.json();

  switch (action) {
    case 'add':
      return addItemToCart(item, userId);
    case 'remove':
      return removeItemFromCart(itemId, userId);
    case 'update':
      return updateItemQuantity(itemId, quantity, userId);
    case 'calculate':
      return calculateTotalPrice(discountCode, userId);
    default:
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }
}

async function addItemToCart(item: CartItem, userId: string) {
  const { data: existingItem, error } = await supabase
    .from('cart')
    .select('*')
    .eq('id', item.id)
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (existingItem) {
    const { error: updateError } = await supabase
      .from('cart')
      .update({ quantity: existingItem.quantity + 1 })
      .eq('id', item.id)
      .eq('user_id', userId);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 400 });
    }
  } else {
    const { error: insertError } = await supabase
      .from('cart')
      .insert({ ...item, user_id: userId, quantity: 1 });

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 400 });
    }
  }

  return NextResponse.json({ message: 'Item added to cart' }, { status: 200 });
}

async function removeItemFromCart(itemId: string, userId: string) {
  const { error } = await supabase
    .from('cart')
    .delete()
    .eq('id', itemId)
    .eq('user_id', userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: 'Item removed from cart' }, { status: 200 });
}

async function updateItemQuantity(itemId: string, quantity: number, userId: string) {
  const { error } = await supabase
    .from('cart')
    .update({ quantity })
    .eq('id', itemId)
    .eq('user_id', userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: 'Item quantity updated' }, { status: 200 });
}

async function calculateTotalPrice(discountCode: string, userId: string) {
  const { data: cartItems, error } = await supabase
    .from('cart')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  let total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let discount = 0;

  // Example discount logic
  if (discountCode === 'BIRD') {
    discount = 100;
  }

  total -= discount;

  return NextResponse.json({ total, discount, cart: cartItems }, { status: 200 });
}
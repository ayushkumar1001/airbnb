import getCurrentUser from '@/app/actions/getCurrentUser';
import stripe from '@/libs/stripeConfig';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const currentUser = await getCurrentUser();
  const body = await request.json();

  const { totalPrice, title } = body;
  const headersList = headers();
  const fullUrl = headersList.get('referer') || '';

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${fullUrl}?sucess=true`,
    cancel_url: `${fullUrl}?canceled=true`,
    customer_email: currentUser.email,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Reservation Payment',
            description: 'Reservation Payment for ' + title,
          },
          unit_amount: parseFloat(totalPrice) * 100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
  });

  return NextResponse.json(stripeSession.url);
}

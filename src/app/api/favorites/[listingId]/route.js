import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId) {
    return new Error('Missing listingId');
  }

  let favourites = [...(currentUser?.favoritesIds || [])];

  favourites.push(listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoritesIds: favourites,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(request, { params }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId) {
    return new Error('Missing listingId');
  }

  let favourites = [...(currentUser?.favoritesIds || [])];

  favourites = favourites.filter((id) => id !== listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoritesIds: favourites,
    },
  });

  return NextResponse.json(user);
}

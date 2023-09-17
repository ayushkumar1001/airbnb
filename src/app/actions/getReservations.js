import prisma from '@/libs/prismadb';

export default async function getReservations(params) {
  try {
    const { listingId, userId, autherId } = params;

    const query = {};

    if (listingId) {
      query.listingId = listingId;
    }
    if (userId) {
      query.userId = userId;
    }
    if (autherId) {
      query.listing = {
        userId: autherId,
      };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return reservations;
  } catch (error) {
    throw new Error(error);
  }
}

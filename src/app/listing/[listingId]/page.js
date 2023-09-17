import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById';
import EmptyState from '@/components/empty-state';
import GlobalContainer from '@/components/global-container';
import ListingClient from './listing-client';
import getReservations from '@/app/actions/getReservations';

const listingPage = async ({ params }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);

  if (!listing) {
    return (
      <GlobalContainer>
        <EmptyState />
      </GlobalContainer>
    );
  }
  return (
    <GlobalContainer>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </GlobalContainer>
  );
};

export default listingPage;

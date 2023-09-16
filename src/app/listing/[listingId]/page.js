import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById';
import EmptyState from '@/components/empty-state';
import GlobalContainer from '@/components/global-container';
import ListingClient from './listing-client';

const listingPage = async ({ params }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <GlobalContainer>
        <EmptyState />
      </GlobalContainer>
    );
  }
  return (
    <GlobalContainer>
      <ListingClient listing={listing} currentUser={currentUser} />
    </GlobalContainer>
  );
};

export default listingPage;

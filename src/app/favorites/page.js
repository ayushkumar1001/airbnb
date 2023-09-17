import GlobalContainer from '@/components/global-container';
import getCurrentUser from '../actions/getCurrentUser';
import EmptyState from '@/components/empty-state';
import getFavoriteListing from '../actions/getFavoriteListing';
import Heading from '@/components/heading';
import FavoritesClient from './favorites-client';

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <GlobalContainer>
        <EmptyState
          title="Unauthorized"
          subtitle="You need to be logged in to view this page"
        />
      </GlobalContainer>
    );
  }

  const listings = await getFavoriteListing();
  if (listings.length === 0) {
    return (
      <GlobalContainer>
        <EmptyState
          title="No favorites yet"
          subtitle="You can add properties to your favorites by clicking the heart icon"
        />
      </GlobalContainer>
    );
  }
  return (
    <GlobalContainer>
      <FavoritesClient listings={listings} currentUser={currentUser} />
    </GlobalContainer>
  );
};

export default FavoritesPage;

import EmptyState from '@/components/empty-state';
import GlobalContainer from '@/components/global-container';
import getCurrentUser from '../actions/getCurrentUser';
import getListings from '../actions/getListings';
import PropertiesClient from './properties-client';

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <GlobalContainer>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </GlobalContainer>
    );
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <GlobalContainer>
        <EmptyState
          title="No properties found"
          subtitle="You don't have any properties yet"
        />
      </GlobalContainer>
    );
  }
  return (
    <GlobalContainer>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </GlobalContainer>
  );
};

export default PropertiesPage;

import getListings from '@/app/actions/getListings';
import Container from '@/components/container';
import EmptyState from '@/components/empty-state';
import GlobalContainer from '@/components/global-container';
import ListingCard from '@/components/listings/listing-card';
import getCurrentUser from './actions/getCurrentUser';

export const dynamic = 'auto';
export const dynamicParams = true;
export const revalidate = false;
export const fetchCache = 'auto';
export const runtime = 'nodejs';
export const preferredRegion = 'auto';
export const maxDuration = 5;

const Home = async ({ searchParams }) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <GlobalContainer>
        <EmptyState showReset />
      </GlobalContainer>
    );
  }
  return (
    <GlobalContainer>
      <Container>
        <div
          className="
          pt-24
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
        >
          {listings.map((listing) => {
            return (
              <ListingCard
                currentUser={currentUser}
                key={listing.id}
                data={listing}
              />
            );
          })}
        </div>
      </Container>
    </GlobalContainer>
  );
};

export default Home;

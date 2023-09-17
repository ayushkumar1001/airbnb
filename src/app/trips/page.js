import GlobalContainer from '@/components/global-container';
import getCurrentUser from '../actions/getCurrentUser';
import EmptyState from '@/components/empty-state';
import getReservations from '../actions/getReservations';
import TripsClient from './trips-client';

const TripsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <GlobalContainer>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </GlobalContainer>
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <GlobalContainer>
        <EmptyState title="No trips" subtitle="You don't have any trips yet" />
      </GlobalContainer>
    );
  }
  return (
    <GlobalContainer>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </GlobalContainer>
  );
};

export default TripsPage;

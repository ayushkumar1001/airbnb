import GlobalContainer from '@/components/global-container';
import getCurrentUser from '../actions/getCurrentUser';
import EmptyState from '@/components/empty-state';
import getReservations from '../actions/getReservations';
import ReservationsClient from './reservations-client';

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <GlobalContainer>
        <EmptyState
          title="Unauthorized"
          description="You must be signed in to view this page"
        />
      </GlobalContainer>
    );
  }

  const reservations = await getReservations({
    autherId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <GlobalContainer>
        <EmptyState
          title="No reservations found"
          description="Looks like you have no reservations on your properties"
        />
      </GlobalContainer>
    );
  }

  return (
    <GlobalContainer>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </GlobalContainer>
  );
};

export default ReservationsPage;

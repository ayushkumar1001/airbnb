'use client';
import Container from '@/components/container';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ListingHead from './listing-head';
import ListingInfo from './listing-info';
import useLoginModal from '@/hooks/useLoginModal';
import { useRouter } from 'next/navigation';
import {
  differenceInCalendarDays,
  differenceInDays,
  eachDayOfInterval,
  setDate,
} from 'date-fns';
import axios from 'axios';
import toast from 'react-hot-toast';
import ListingReservation from './listing-reservation';

const { categories } = require('@/components/navbar/categories');

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};

const ListingClient = ({ listing, currentUser, reservations = [] }) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState(initialDateRange);
  const [totalPrice, setTotalPrice] = useState(listing.price);

  const onCreateReservation = useCallback(async () => {
    if (!currentUser) {
      return loginModal.open();
    }

    setIsLoading(true);

    axios
      .post('/api/reservations', {
        totalPrice: totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing.id,
      })
      .then(() => {
        toast.success('Reservation created successfully');
        setDateRange(initialDateRange);

        router.push('/trips');
      })
      .catch((error) => {
        toast.error('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [
    currentUser,
    dateRange,
    listing?.id,
    router,
    currentUser,
    loginModal,
    totalPrice,
  ]);

  useEffect(() => {
    if (!dateRange.startDate || !dateRange.endDate) {
      return;
    }

    const dayCount = differenceInCalendarDays(
      dateRange.endDate,
      dateRange.startDate
    );

    if (dayCount && listing.price) {
      setTotalPrice(dayCount * listing.price);
    } else {
      setTotalPrice(listing.price);
    }
  }, [dateRange, listing.price]);

  const category = useMemo(() => {
    return categories.find((category) => category.label === listing.category);
  }, [listing.category]);
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div
            className="grid
          grid-cols-1
          md:grid-cols-7
          md:gap-10
          mt-6
          "
          >
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div
              className="
            order-first
            mb-10
            md:order-last
            md:col-span-3
           "
            >
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;

'use client';
import useSearchModal from '@/hooks/useSearchModal';
import { formatISO } from 'date-fns';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useCallback, useMemo, useState } from 'react';
import Heading from '../heading';
import Calender from '../inputs/calender';
import Counter from '../inputs/counter';
import CountrySelect from '../inputs/country-select';
import Modal from './modal';

const STEPS = {
  LOCATION: 0,
  DATE: 1,
  INFO: 2,
};
const SearchModal = () => {
  const searchModal = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });
  const [location, setLocation] = useState();

  const onBack = useCallback(() => {
    setStep((prev) => prev - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const onSubmit = useCallback(() => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate && dateRange.endDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [step, location, guestCount, roomCount, bathroomCount, dateRange, params]);

  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/map'), {
        ssr: false,
      }),
    [location]
  );

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Search';
    }

    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }

    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you want to go?"
        subtitle="Find the perfect location for your next trip."
      />

      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you want to go?"
          subtitle="Make sure your dates are available."
        />
        <Calender
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="More infamation"
          subtitle="Find the perfect location for your next trip."
        />
        <Counter
          label="Guests"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
          subtitle="How many guests will be there?"
        />
        <Counter
          label="Rooms"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
          subtitle="How many rooms do you need?"
        />
        <Counter
          label="Bathrooms"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
          subtitle="How many bathrooms do you need?"
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default SearchModal;

'use client';

import Heading from '@/components/heading';
import CategoryInput from '@/components/inputs/category-input';
import Counter from '@/components/inputs/counter';
import CountrySelect from '@/components/inputs/country-select';
import Modal from '@/components/modal/modal';
import { categories } from '@/components/navbar/categories';
import useRentModal from '@/hooks/useRentModal';
import dynamic from 'next/dynamic';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import ImageUpload from '../inputs/image-upload';

const STEPS = {
  CATEGORY: 0,
  LOCATION: 1,
  INFO: 2,
  IMAGES: 3,
  DESCRIPTION: 4,
  PRICE: 5,
};
const RentModal = () => {
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  });

  const category = watch('category');
  const location = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');

  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/map'), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id, value) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  const onBack = useCallback(() => {
    setStep((prev) => prev - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create';
    }
    return 'Next';
  }, [step]);

  const secondaryLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-3
        max-h-[50vh]
        overflow-y-auto
      "
      >
        {categories.map((item) => (
          <div className="col-span-1" key={item.label}>
            <CategoryInput
              onClick={(category) => {
                setCustomValue('category', category);
              }}
              selected={category === item.label}
              label={item.label}
              Icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where's your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          onChange={(value) => {
            setCustomValue('location', value);
          }}
          value={location}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some details about your place"
          subtitle="What amenities do you offer?"
        />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => {
            setCustomValue('guestCount', value);
          }}
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => {
            setCustomValue('roomCount', value);
          }}
        />
        <Counter
          title="Baathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) => {
            setCustomValue('bathroomCount', value);
          }}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add some photos of your place"
          subtitle="Showcase your place to guests"
        />
        <ImageUpload />
      </div>
    );
  }

  return (
    <Modal
      title="Airbnb Your Home"
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryLabel}
      secondaryAction={onBack}
      body={bodyContent}
    />
  );
};
export default RentModal;

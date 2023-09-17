'use client';

import Heading from '@/components/heading';
import HeartButton from '@/components/heart-button';
import useCountries from '@/hooks/useCountries';
import Image from 'next/image';

const ListingHead = ({ title, imageSrc, locationValue, id, currentUser }) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);
  return (
    <>
      <Heading
        title={title}
        subtitle={`
          ${location.region}, ${location.label}
      `}
      />
      <div
        className="
        relative 
        h-[60vh]
        overflow-hidden
        rounded-xl
        relative
        "
      >
        <Image
          src={imageSrc}
          alt="Image of the listing"
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;

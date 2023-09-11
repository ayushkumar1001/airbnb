'use client';

import Image from 'next/image';

const Avatar = ({ src }) => {
  return (
    <Image
      className="rounded-full"
      src={src || '/images/placeholder.jpg'}
      alt="Avatar"
      width={30}
      height={30}
    />
  );
};

export default Avatar;

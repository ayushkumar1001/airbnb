'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { useCallback, useState } from 'react';
import Image from 'next/image';
import { TbPhotoPlus } from 'react-icons/tb';
import { decl } from 'postcss';

const ImageUpload = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (e) => {
      onChange(e.info.secure_url);
    },
    [onChange]
  );
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="nep6iyvp"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="
            relative
            cursor-pointer
            hover:opacity-70
            transition
            border-dashed
            border-2
            p-20
            border-neutral-300
            flex
            flex-col
            items-center
            justify-center
            gap-4
            text-neutral-600
          "
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg"> Click to upload</div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="Upload"
                  fill
                  style={{ objectFit: 'cover' }}
                  src={value}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;

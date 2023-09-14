'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { useCallback, useState } from 'react';
import Image from 'next/image';
import { TbPhotoPlus } from 'react-icons/tb';
import { decl } from 'postcss';

const ImageUpload = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (e) => {
      onChange(e.result.info.secure_url);
    },
    [onChange]
  );
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset=""
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        function handleOnClick(e) {
          e.preventDefault();
          open();
        }
        return (
          <button className="button" onClick={handleOnClick}>
            Upload an Image
          </button>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;

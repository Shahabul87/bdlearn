'use client';

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback, useState } from "react";
import { TbPhotoPlus } from 'react-icons/tb'

declare global {
  var cloudinary: any
}

const uploadPreset = "dk2uffum";

interface ImageUploadProps {
  onChange: (values: string[]) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  // State to track all the uploaded images
  const [imageUrls, setImageUrls] = useState<string[]>(value);

  // Handler for when images are uploaded
  const handleUpload = useCallback((result: any) => {
    if (result.event === "success") {
      setImageUrls((prevUrls) => [...prevUrls, result.info.secure_url]);
      onChange([...imageUrls, result.info.secure_url]);
    }
  }, [onChange, imageUrls]);

  // Handler for removing an image
  const handleRemove = (url: string) => {
    const updatedUrls = imageUrls.filter((imgUrl) => imgUrl !== url);
    setImageUrls(updatedUrls);
    onChange(updatedUrls);
  };

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 20, // Set the desired number of max files
        // cloudName: 'your-cloud-name', // Replace with your cloud name
        // uploadSignature: 'your-upload-signature', // Replace with your signature if necessary
      }}
    >
      {({ open }) => (
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
            justify-center
            items-center
            gap-4
            text-neutral-600
          "
        >
          <TbPhotoPlus size={50} />
          <div className="font-semibold text-lg">Click to upload</div>
          {imageUrls.length > 0 && (
            <div className="absolute inset-0 w-full h-full space-y-4 p-4 flex flex-wrap justify-center items-center">
              {imageUrls.map((url, index) => (
                <div key={index} className="relative w-24 h-24 p-1 border border-neutral-300 m-1">
                  <Image
                    src={url}
                    alt={`Uploaded image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    onClick={() => handleRemove(url)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
}

export default ImageUpload;

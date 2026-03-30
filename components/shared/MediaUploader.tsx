"use client";

import { dataUrl, getImageSize } from "@/lib/utils";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

type MediaUploaderProps = {
  onValueChange: (value: string) => void;
  setImage: React.Dispatch<any>;
  image: any;
  publicId: string;
  type: string;
};

const MediaUploader = ({
  onValueChange,
  setImage,
  image,
  publicId,
  type,
}: MediaUploaderProps) => {
  const onUploadSuccessHandler = (result: any) => {
    setImage((prevState: any) => ({
      ...prevState,
      publicId: result?.info?.public_id,
      width: result?.info?.width,
      height: result?.info?.height,
      secureURL: result?.info?.secure_url,
    }));

    onValueChange(result?.info?.public_id);

    toast.success("Image uploaded successfully", {
      description: "1 credit was deducted from your account",
      duration: 50000000,
      style: {
        backgroundColor: "#d1fae5", /* bg-green-100 */
        color: "#14532d", /* text-green-900 */
      },
    });
  };

  const onUploadErrorHandler = () => {
    toast.error("Something went wrong while uploading", {
      description: "Please try again",
      duration: 5000,
      className: "error-toast",
    });
  };

  return (
    <CldUploadWidget
      uploadPreset="Nebula"
      options={{
        multiple: false,
        resourceType: "image",
      }}
      onSuccess={onUploadSuccessHandler}
      onError={onUploadErrorHandler}
    >
      {({ open }) => (
        <div className="flex flex-col gap-6 p-6 bg-black text-white rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-white">Original Image</h3>

          {publicId ? (
            <div className="cursor-pointer overflow-hidden rounded-lg transition-all duration-300 hover:scale-105">
              <CldImage
                width={getImageSize(type, image, "width")}
                height={getImageSize(type, image, "height")}
                src={publicId}
                alt="image"
                sizes={"(max-width: 767px) 100vw 50vw"}
                placeholder={dataUrl as PlaceholderValue}
                className="media-uploader_cldImage rounded-lg shadow-md"
              />
            </div>
          ) : (
            <div
              className="media-uploader_cta flex flex-col items-center justify-center cursor-pointer bg-gradient-to-r from-gray-800 via-gray-900 to-black p-6 rounded-lg transition duration-300 ease-in-out hover:bg-gradient-to-l"
              onClick={() => open()}
            >
              <div className="media-uploader_cta-image mb-3">
                <Image
                  src="/assets/icons/add.svg"
                  alt="Add Image"
                  width={30}
                  height={30}
                />
              </div>
              <p className="text-white text-sm font-medium">Click here to upload image</p>
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default MediaUploader;

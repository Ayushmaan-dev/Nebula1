"use client";

import { dataUrl, debounce, download, getImageSize } from "@/lib/utils";
import { CldImage, getCldImageUrl } from "next-cloudinary";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";

const TransformedImage = ({
  image,
  type,
  title,
  transformationConfig,
  isTransforming,
  setIsTransforming,
  hasDownload = false,
}: TransformedImageProps) => {
  const downloadHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    download(getCldImageUrl({
      width: image?.width,
      height: image?.height,
      src: image?.publicId,
      ...transformationConfig
    }), title)
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-black text-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold text-white">
          {title || "Transformed"}
        </h3>

        {hasDownload && (
          <button
            className="download-btn p-2 bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-full shadow-md hover:bg-gradient-to-l transition-all duration-300"
            onClick={downloadHandler}
          >
            <Image
              src="/assets/icons/download.svg"
              alt="Download"
              width={24}
              height={24}
              className="pb-[6px] transition-all duration-300 hover:scale-105"
            />
          </button>
        )}
      </div>

      {image?.publicId && transformationConfig ? (
        <div className="relative">
          <CldImage
            width={getImageSize(type, image, "width")}
            height={getImageSize(type, image, "height")}
            src={image?.publicId}
            alt={title || "Transformed Image"}
            sizes={"(max-width: 767px) 100vw 50vw"}
            placeholder={dataUrl as PlaceholderValue}
            className="transformed-image rounded-lg shadow-md transition-all duration-300 hover:scale-105"
            onLoad={() => {
              if (setIsTransforming) {
                setIsTransforming(false);
              }
            }}
            onError={() => {
              debounce(() => {
                if (setIsTransforming) {
                  setIsTransforming(false);
                }
              }, 8000)();
            }}
            {...transformationConfig}
          />

          {isTransforming && (
            <div className="transforming-loader absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center rounded-lg">
              <Image
                src="/assets/icons/spinner.svg"
                width={50}
                height={50}
                alt="Transforming"
                className="spinner"
              />
              <p className="text-white/80">Please wait...</p>
            </div>
          )}
        </div>
      ) : (
        <div className="transformed-placeholder flex items-center justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg p-6 text-white">
          Transformed Image
        </div>
      )}
    </div>
  );
};

export default TransformedImage;

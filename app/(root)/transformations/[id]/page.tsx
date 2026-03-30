import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

import Header from "@/components/shared/Header";
import TransformedImage from "@/components/shared/TransformedImage";
import { Button } from "@/components/ui/button";
import { getImageById } from "@/lib/actions/image.actions";
import { getImageSize } from "@/lib/utils";
import { DeleteConfirmation } from "@/components/shared/DeleteConfirmation";

const ImageDetails = async ({ params: { id } }: SearchParamProps) => {
  const { userId } = await auth();

  const image = await getImageById(id);

  return (
    <>
      {/* Header Section */}
      <Header
        title={image.title}
        subtitle={image.transformationType}
        center
        gradient
      />

      <section className="mt-8 flex flex-wrap gap-4 px-6">
        {/* Transformation Details */}
        <div className="p-4 flex gap-2 items-center">
          <p className="text-gray-300">Transformation:</p>
          <p className="capitalize text-purple-400">{image.transformationType}</p>
        </div>

        {image.prompt && (
          <div className="p-4 flex gap-2 items-center">
            <p className="text-gray-300">Prompt:</p>
            <p className="capitalize text-purple-400">{image.prompt}</p>
          </div>
        )}

        {image.color && (
          <div className="p-4 flex gap-2 items-center">
            <p className="text-gray-300">Color:</p>
            <p className="capitalize text-purple-400">{image.color}</p>
          </div>
        )}

        {image.aspectRatio && (
          <div className="p-4 flex gap-2 items-center">
            <p className="text-gray-300">Aspect Ratio:</p>
            <p className="capitalize text-purple-400">{image.aspectRatio}</p>
          </div>
        )}
      </section>

      {/* Media Display Section */}
      <section className="mt-10 border-t border-gray-700 px-6 pt-8">
        <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
          {/* Original Image */}
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold text-gray-300">Original</h3>
            <Image
              width={getImageSize(image.transformationType, image, "width")}
              height={getImageSize(image.transformationType, image, "height")}
              src={image.secureURL}
              alt="Original Image"
              className="rounded-lg shadow-md"
            />
          </div>

          {/* Transformed Image */}
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold text-gray-300">Transformed</h3>
            <TransformedImage
              image={image}
              type={image.transformationType}
              title={image.title}
              isTransforming={false}
              transformationConfig={image.config}
              hasDownload={true}
            />
          </div>
        </div>

        {/* Action Buttons */}
        {userId === image.author.clerkId && (
          <div className="mt-8 space-y-4">
            <Button
              asChild
              type="button"
              className="w-full bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 text-white py-3 rounded-lg text-lg font-semibold hover:scale-105 transition-all duration-300"
            >
              <Link href={`/transformations/${image._id}/update`}>
                Update Image
              </Link>
            </Button>

            <div className="flex justify-end mt-4">
              <DeleteConfirmation imageId={image._id} />
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default ImageDetails;

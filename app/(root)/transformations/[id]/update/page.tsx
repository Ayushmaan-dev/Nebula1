import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import { getImageById } from "@/lib/actions/image.actions";

const Page = async ({ params: { id } }: SearchParamProps) => {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);
  const image = await getImageById(id);

  const transformation =
    transformationTypes[image.transformationType as TransformationTypeKey];

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 py-12 px-6 text-white">
      <Header 
        title={transformation.title} 
        subtitle={transformation.subTitle} 
        center
        gradient
      />

      <section className="mt-10 mx-auto max-w-4xl bg-black/90 border border-white/5 rounded-xl p-6 md:p-10 shadow-inner">
        <TransformationForm
          action="Update"
          userId={user._id}
          type={image.transformationType as TransformationTypeKey}
          creditBalance={user.creditBalance}
          config={image.config}
          data={image}
        />
      </section>
    </section>
  );
};

export default Page;

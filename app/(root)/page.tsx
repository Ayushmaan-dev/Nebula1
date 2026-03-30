import { Collection } from "@/components/shared/Collection";
import { navLinks } from "@/constants";
import { getAllImages } from "@/lib/actions/image.actions";
import Image from "next/image";
import Link from "next/link";

const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || '';

  const images = await getAllImages({ page, searchQuery });

  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 py-12 px-6 text-white">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
          Unleash Your Creative Vision with Nebula
        </h1>

        <ul className="flex-center w-full gap-10 flex-wrap">
          {navLinks.slice(1, 5).map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="flex-center flex-col gap-2 hover:scale-105 transition-transform duration-300"
            >
              <li className="flex-center w-fit rounded-full bg-white/10 p-4 backdrop-blur-sm border border-gray-700 shadow-md">
                <Image src={link.icon} alt="image" width={24} height={24} />
              </li>
              <p className="p-14-medium text-center text-gray-300">{link.label}</p>
            </Link>
          ))}
        </ul>

        <section className="mt-16 bg-black/90 px-4 py-10 rounded-xl shadow-inner border border-white/5">
          <Collection 
            hasSearch={true}
            images={images?.data}
            totalPages={images?.totalPage}
            page={page}
          />
        </section>
      </section>
    </>
  );
};

export default Home;

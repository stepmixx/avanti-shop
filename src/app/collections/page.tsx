import { FullPageLoader } from "@/components/circular-loader.component";
import { Typography } from "@/components/material-tailwind";
import CollectionService from "@/services/collection.service";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export const metadata = {
  title: "Collections | AVANTI",
  description:
    "Collections of AVANTI's shop. This is a take home assignment for Avanti",
};

async function Collections() {
  const collections = await CollectionService.getCollections();

  return (
    <Suspense fallback={<FullPageLoader />}>
      <div
        id="collections-grid"
        className="mx-auto w-full grid grid-cols-[repeat(auto-fill,300px)] grid-rows-[64px_repeat(auto-fill,1fr)]  justify-center gap-6 p-8 sm:p-12 md:p-14 lg:p-16 mb-4"
      >
        <Typography
          variant="h1"
          className="flex justify-center sm:justify-start text-4xl sm:text-5xl h-12 sm:h-16 uppercase text-center sm:text-left col-[1_/_-1]"
        >
          <span>Collections</span>
        </Typography>
        {collections.map((collection: any, index: number) => (
          <Link
            id={`collection-${index}`}
            href={`/collections/${collection.handle}`}
            key={collection.id}
          >
            <div className="relative w-[300px] aspect-square grid place-items-center shadow">
              <Image
                src={collection.image.url}
                alt={collection.title}
                fill
                className="rounded-lg"
              />
              <div className="absolute w-full h-full bg-white opacity-30 rounded-md" />
              <Typography variant="h3" className="font-bold z-10">
                {collection.title}
              </Typography>
            </div>
          </Link>
        ))}
      </div>
    </Suspense>
  );
}

export default Collections;

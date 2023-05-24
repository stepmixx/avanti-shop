import { Typography } from "@/components/material-tailwind";
import CollectionService from "@/services/collection.service";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Collections | AVANTI",
  description:
    "Collections of AVANTI's shop. This is a take home assignment for Avanti",
};

async function Collections() {
  const collections = await CollectionService.getCollections();

  return (
    <div className="w-full flex flex-wrap justify-center gap-6 py-8 sm:py-12 sm:px-8 md:px-12 lg:px-16 mb-4">
      <Typography
        variant="h1"
        className="text-4xl sm:text-5xl h-12 sm:h-16 uppercase text-center sm:text-left basis-full"
      >
        Collections
      </Typography>
      {collections.map((collection: any) => (
        <Link href={`/collections/${collection.handle}`} key={collection.id}>
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
  );
}

export default Collections;

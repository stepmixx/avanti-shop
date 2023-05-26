import CollectionService, { PAGE_SIZES } from "@/services/collection.service";
import { Button, Typography } from "@/components/material-tailwind";
import ProductCard from "@/components/product-card";
import { Suspense } from "react";
import { FullPageLoader } from "@/components/circular-loader.component";
import Link from "next/link";
import Image from "next/image";
import { IconChevronDown } from "@tabler/icons-react";

export const runtime = "edge";

export const metadata = {
  title: "Take Home | AVANTI",
  description: "Take home assignment for Avanti",
};

export default async function Home() {
  const collection = (await CollectionService.getCollectionByHandle(
    "featured",
    PAGE_SIZES.HOME
  )) as any;

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="relative w-full h-[calc(100vh-64px)] flex justify-center">
        <Typography
          variant="h1"
          className="z-10 w-[min(400px,80%)] text-5xl font-bold uppercase text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          Timeless luxury
        </Typography>
        <div className="w-full h-full absoulte top-0">
          <Image
            src="/banner.webp"
            alt="banner"
            fill
            className="object-cover lg:object-contain"
          />
        </div>
        <a
          href="#featured"
          className="absolute text-3xl text-white bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 text-background flex flex-col items-center can_hover:cursor-pointer no_hover:animate-pulse can_hover:animate-none can_hover:hover:-translate-y-2 transition ease-in-out duration-500"
        >
          <IconChevronDown />
        </a>
      </div>
      <Suspense fallback={<FullPageLoader />}>
        <div
          id="featured"
          className="w-full flex flex-col items-center p-8 md:p-16"
        >
          <Typography variant="h2" className="font-bold uppercase">
            {collection.title}
          </Typography>
          <div className="w-[min(100%,600px)] xl:w-full flex justify-center flex-wrap my-8 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            {collection.products.edges.map((product: any, index: number) => (
              <ProductCard index={index} key={product.id} product={product} />
            ))}
          </div>
          <Link href="/collections/featured">
            <Button
              variant="filled"
              className="bg-black text-white normal-case"
            >
              See more
            </Button>
          </Link>
        </div>
      </Suspense>
    </div>
  );
}

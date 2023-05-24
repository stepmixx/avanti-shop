import Image from "next/image";
import CollectionService from "@/services/collection.service";
import { Button, Typography } from "@/components/material-tailwind";
import ProductCard from "@/components/product-card";
import { Suspense } from "react";
import { FullPageLoader } from "@/components/circular-loader.component";

export const metadata = {
  title: "Take Home | AVANTI",
  description: "Take home assignment for Avanti",
};

export default async function Home() {
  const collection = (await CollectionService.getCollectionByHandle(
    "featured",
    4
  )) as any;

  return (
    <Suspense fallback={<FullPageLoader />}>
      <div className="w-full flex min-h-screen flex-col items-center p-8">
        <Typography variant="h2" className="font-bold uppercase">
          {collection.title}
        </Typography>
        <div className="w-[min(100%,600px)] xl:w-full flex justify-center flex-wrap my-8 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {collection.products.data.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Button variant="filled" className="bg-black text-white normal-case">
          See more
        </Button>
      </div>
    </Suspense>
  );
}

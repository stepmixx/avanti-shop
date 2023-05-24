import Image from "next/image";
import CollectionService from "@/services/collection.service";
import { Button, Typography } from "@/components/material-tailwind";
import ProductCard from "@/components/product-card";

export default async function Home() {
  const collection = (await CollectionService.getCollectionByHandle(
    "featured",
    4
  )) as any;

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Typography variant="h2" className="font-bold uppercase">
        {collection.title}
      </Typography>
      <div className="w-full flex justify-between flex-wrap my-8 px-16">
        {collection.products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Button variant="filled" className="bg-black text-white normal-case">
        See more
      </Button>
    </main>
  );
}

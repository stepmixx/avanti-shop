import CollectionService from "@/services/collection.service";
import { IconButton, Typography } from "@/components/material-tailwind";
import Image from "next/image";
import ProductCard from "@/components/product-card";
import {
  IconArrowBigLeftFilled,
  IconArrowBigRightFilled,
} from "@tabler/icons-react";
import { Suspense } from "react";
import { FullPageLoader } from "@/components/circular-loader.component";
import Link from "next/link";

export async function generateMetadata({
  params: { handle },
}: {
  params: { handle: string };
}) {
  const collection = (await CollectionService.getCollectionByHandle(
    Array.isArray(handle) ? handle[0] : handle,
    1
  )) as any;
  return {
    title: `${collection.title} | AVANTI`,
    description: collection.description,
  };
}

async function Collection({ params }: { params: { handle: string } }) {
  const paramValues = params.handle as any;
  const collection =
    typeof paramValues === "string"
      ? ((await CollectionService.getCollectionByHandle(
          paramValues,
          4,
          null
        )) as any)
      : Array.isArray(paramValues)
      ? ((await CollectionService.getCollectionByHandle(
          paramValues[0],
          4,
          decodeURIComponent(paramValues[1])
        )) as any)
      : ((await CollectionService.getCollectionByHandle(
          paramValues[0],
          null,
          null,
          4,
          decodeURIComponent(paramValues[1])
        )) as any);

  const {
    products: {
      edges,
      pageInfo: { hasNextPage, hasPreviousPage, startCursor, endCursor },
    },
  } = collection;

  return (
    <Suspense fallback={<FullPageLoader />}>
      <div className="mx-auto w-full h-full grid grid-cols-[repeat(auto-fill,300px)] justify-center gap-6 mb-4 p-8 sm:p-12 md:p-14 lg:p-16">
        <Typography
          variant="h1"
          className="flex justify-center sm:justify-start text-4xl sm:text-5xl h-12 sm:h-16 uppercase text-center sm:text-left col-[1_/_-1]"
        >
          <span>{collection.title}</span>
        </Typography>
        {edges.map((product: any) => (
          <ProductCard size={300} key={product.id} product={product} />
        ))}
        <div className="w-full flex justify-between mt-12 col-[1_/_-1]">
          <div className="flex gap-4 items-center">
            <Link href={`/collections/${paramValues}/${startCursor}/p`}>
              <IconButton
                variant="filled"
                className="bg-black"
                disabled={!hasPreviousPage}
              >
                <IconArrowBigLeftFilled className="text-white" />
              </IconButton>
            </Link>
            <Typography variant="paragraph" className="hidden sm:block">
              Previous page
            </Typography>
          </div>
          <div className="flex gap-4 items-center">
            <Typography variant="paragraph" className="hidden sm:block">
              Next page
            </Typography>
            <Link href={`/collections/${paramValues}/${endCursor}`}>
              <IconButton
                variant="filled"
                className="bg-black"
                disabled={!hasNextPage}
              >
                <IconArrowBigRightFilled className="text-white" />
              </IconButton>
            </Link>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default Collection;

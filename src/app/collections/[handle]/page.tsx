import CollectionService, { PAGE_SIZES } from "@/services/collection.service";
import { IconButton, Typography } from "@/components/material-tailwind";
import ProductCard from "@/components/product-card";
import {
  IconArrowBigLeftFilled,
  IconArrowBigRightFilled,
} from "@tabler/icons-react";
import { Suspense } from "react";
import { FullPageLoader } from "@/components/circular-loader.component";
import Link from "next/link";
import { createUrl } from "@/helpers/utils";

export const runtime = "edge";

export async function generateMetadata({
  params: { handle },
}: {
  params: { handle: string };
}) {
  const collection = (await CollectionService.getCollectionByHandle(
    handle,
    1
  )) as any;
  return {
    title: `${collection.title} | AVANTI`,
    description: collection.description,
  };
}

async function Collection({
  params,
  searchParams,
}: {
  params: { handle: string };
  searchParams: { [key: string]: string };
}) {
  const handle = params.handle as any;
  const newParams = new URLSearchParams(searchParams);
  const cursor = decodeURIComponent(newParams.get("cursor") as string);
  const collection = !newParams.has("cursor")
    ? ((await CollectionService.getCollectionByHandle(
        handle,
        PAGE_SIZES.GRID
      )) as any)
    : !newParams.has("direction")
    ? ((await CollectionService.getCollectionByHandle(
        handle,
        PAGE_SIZES.GRID,
        cursor
      )) as any)
    : ((await CollectionService.getCollectionByHandle(
        handle,
        null,
        null,
        PAGE_SIZES.GRID,
        cursor
      )) as any);

  const createRedirectUrl = (cursor: string, direction = false) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("cursor", cursor);
    if (direction) {
      newParams.set("direction", "prev");
    } else {
      newParams.delete("direction");
    }
    return createUrl(`/collections/${handle}`, newParams);
  };

  const {
    products: {
      edges,
      pageInfo: { hasNextPage, hasPreviousPage, startCursor, endCursor },
    },
  } = collection;

  return (
    <Suspense fallback={<FullPageLoader />}>
      <div
        id="products-grid"
        className="mx-auto w-full h-full grid grid-cols-[repeat(auto-fill,300px)] justify-center gap-6 mb-4 p-8 sm:p-12 md:p-14 lg:p-16"
      >
        <Typography
          variant="h1"
          className="flex justify-center sm:justify-start text-4xl sm:text-5xl h-12 sm:h-16 uppercase text-center sm:text-left col-[1_/_-1]"
        >
          <span>{collection.title}</span>
        </Typography>
        {edges.map((product: any, index: number) => (
          <ProductCard
            key={product.id}
            product={product}
            size={300}
            index={index}
          />
        ))}
        {(hasPreviousPage || hasNextPage) && (
          <div className="w-full flex justify-between mt-12 col-[1_/_-1]">
            <div className="flex gap-4 items-center">
              <Link href={createRedirectUrl(startCursor, true)}>
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
              <Link href={createRedirectUrl(endCursor)}>
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
        )}
      </div>
    </Suspense>
  );
}

export default Collection;

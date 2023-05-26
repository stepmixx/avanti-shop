import { PAGE_SIZES } from "@/services/collection.service";
import { IconButton, Typography } from "@/components/material-tailwind";
import ProductCard from "@/components/product-card";
import {
  IconArrowBigLeftFilled,
  IconArrowBigRightFilled,
} from "@tabler/icons-react";
import { Suspense } from "react";
import { FullPageLoader } from "@/components/circular-loader.component";
import Link from "next/link";
import ProductService from "@/services/product.service";
import { capitalize, createUrl } from "@/helpers/utils";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const newParams = new URLSearchParams(searchParams);
  return {
    title: `${
      newParams.has("query")
        ? capitalize(newParams.get("query") as string)
        : "Products"
    } | AVANTI`,
    description: "Mock products",
  };
}

async function Products({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const newParams = new URLSearchParams(searchParams);
  const query = newParams.has("query")
    ? decodeURIComponent(newParams.get("query") as string)
    : "";
  const cursor = decodeURIComponent(newParams.get("cursor") as string);

  const products = !newParams.has("cursor")
    ? ((await ProductService.getProducts(query, PAGE_SIZES.GRID)) as any)
    : !newParams.has("direction")
    ? ((await ProductService.getProducts(
        query,
        PAGE_SIZES.GRID,
        cursor
      )) as any)
    : ((await ProductService.getProducts(
        query,
        null,
        null,
        PAGE_SIZES.GRID,
        cursor
      )) as any);

  const {
    edges,
    pageInfo: { hasNextPage, hasPreviousPage, startCursor, endCursor },
  } = products;

  const createRedirectUrl = (cursor: string, direction = false) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("cursor", cursor);
    if (direction) {
      newParams.set("direction", "prev");
    } else {
      newParams.delete("direction");
    }
    return createUrl("/products", newParams);
  };

  return (
    <div
      id="products-grid"
      className="mx-auto w-full h-full grid grid-cols-[repeat(auto-fill,300px)] justify-center gap-6 mb-4 p-8 sm:p-12 md:p-14 lg:p-16"
    >
      <Typography
        variant="h1"
        className="flex justify-center sm:justify-start text-4xl sm:text-5xl h-12 sm:h-16 uppercase text-center sm:text-left col-[1_/_-1] break-words"
      >
        <span>
          {newParams.has("query")
            ? `Searching "${newParams.get("query")}"`
            : "Products"}
        </span>
      </Typography>
      <Suspense fallback={<FullPageLoader />}>
        {edges.length > 0 ? (
          edges.map((product: any, index: number) => (
            <ProductCard
              product={product}
              size={300}
              key={product.id}
              index={index}
            />
          ))
        ) : (
          <div className="flex justify-center items-center col-[1_/_-1] h-[364px]">
            <Typography variant="h5">No products found</Typography>
          </div>
        )}
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
      </Suspense>
    </div>
  );
}

export default Products;

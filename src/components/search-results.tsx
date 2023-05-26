"use client";
import React, { use } from "react";
import { PAGE_SIZES } from "@/services/collection.service";
import productService from "@/services/product.service";
import Image from "next/image";
import { IconButton, Typography } from "@material-tailwind/react";
import { IconShoppingCart } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

async function fetchFunc(value: string) {
  return await productService.getProducts(value, PAGE_SIZES.SEARCH);
}

function SearchResults({
  searchQuery,
  onCancel,
}: {
  searchQuery: string;
  onCancel: () => void;
}) {
  const products = use(fetchFunc(searchQuery));
  const router = useRouter();

  return (
    <div className="h-full w-full flex flex-col gap-2 mt-2">
      {products.edges.length === 0 ? (
        <div className="w-full h-[100px] grid place-items-center">
          <Typography variant="h6" className="text-center">
            No products found
          </Typography>
        </div>
      ) : (
        <>
          {products.edges.map((product: any, index: number) => (
            <div
              id={`product-tile-${index}`}
              key={product.id}
              onClick={() => {
                onCancel();
                router.push(`/products/${product.handle}`);
              }}
              className="grid grid-cols-[100px_1fr_64px] h-[100px] cursor-pointer shadow"
            >
              <div className="relative w-[100px] h-full">
                <Image
                  src={product.featuredImage.url}
                  alt={product.title}
                  fill
                />
              </div>
              <div className="h-full p-2 flex flex-col justify-between">
                <Typography variant="h6" className="font-bold">
                  {product.title}
                </Typography>
                <Typography variant="h6">{`${product.price.amount} ${product.price.currencyCode}`}</Typography>
              </div>
              <IconButton
                variant="filled"
                onClick={() => alert("Item added to cart")}
                className="w-8 h-8 bg-black rounded-full mt-auto ml-auto mr-2 mb-2"
              >
                <IconShoppingCart className="w-5 text-white" />
              </IconButton>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default SearchResults;

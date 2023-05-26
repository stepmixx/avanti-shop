"use client";
import { IconButton, Typography } from "./material-tailwind";
import Image from "next/image";
import { IconShoppingCart } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: any;
  size?: number;
  index?: number;
}

function ProductCard(props: ProductCardProps) {
  const { product, size = 256, index } = props;
  const router = useRouter();

  return (
    <div
      id={typeof index === "number" ? `product-${index}` : undefined}
      onClick={() => router.push(`/products/${product.handle}`)}
      style={{ width: size, height: size + 64 }}
      className={`relative grid grid-rows-[1fr_64px] shadow rounded-sm hover:cursor-pointer`}
    >
      <div className="relative h-full w-full">
        <IconButton
          variant="filled"
          onClick={() => alert("Item added to cart")}
          className="w-8 h-8 bg-black rounded-full float-right mr-3 mt-3 z-10"
        >
          <IconShoppingCart className="w-5 text-white" />
        </IconButton>
        <Image
          src={product.featuredImage.url}
          alt={product.title}
          width={size}
          height={size}
          className="absolute top-0 left-0"
        />
      </div>
      <div className="w-full h-16  text-center">
        <Typography className="relative m-1 font-bold" variant="h6">
          {product.title}
        </Typography>
        <Typography variant="h6">{`${product.price.amount} ${product.price.currencyCode}`}</Typography>
      </div>
    </div>
  );
}

export default ProductCard;

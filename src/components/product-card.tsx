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
      <div className="relative w-full h-full">
        <Image src={product.featuredImage.url} alt={product.title} fill />
      </div>
      <div className="w-full h-16  text-center">
        <Typography className="relative m-1 font-bold" variant="h6">
          {product.title}
        </Typography>
        <Typography variant="h6">{`${product.price.amount} ${product.price.currencyCode}`}</Typography>
      </div>
      <IconButton
        variant="filled"
        onClick={() => alert("Item added to cart")}
        className="w-8 h-8 bg-black rounded-full absolute right-3 top-3"
      >
        <IconShoppingCart className="w-5 text-white" />
      </IconButton>
    </div>
  );
}

export default ProductCard;

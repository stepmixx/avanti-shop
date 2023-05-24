import Link from "next/link";
import { Typography } from "./material-tailwind";
import Image from "next/image";

interface ProductCardProps {
  product: any;
  size?: number;
}

function ProductCard(props: ProductCardProps) {
  const { product, size = 256 } = props;

  return (
    <Link href={`/products/${product.handle}`}>
      <div
        style={{ width: size, height: size + 64 }}
        className={`grid grid-rows-[1fr_64px] shadow rounded-sm`}
      >
        <div className="relative w-full h-full">
          <Image src={product.featuredImage.url} alt={product.title} fill />
        </div>
        <div className="w-full h-16 px-3 flex items-center justify-between">
          <Typography variant="h6">{product.title}</Typography>
          <Typography
            variant="h6"
            className="font-bold text-right"
          >{`${product.price.amount} ${product.price.currencyCode}`}</Typography>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;

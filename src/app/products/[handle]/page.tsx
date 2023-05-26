import ProductService from "@/services/product.service";
import { FullPageLoader } from "@/components/circular-loader.component";
import { Typography } from "@/components/material-tailwind";
import { Suspense } from "react";
import Image from "next/image";

export const runtime = "edge";

export async function generateMetadata({
  params: { handle },
}: {
  params: { handle: string };
}) {
  const product = await ProductService.getProductByHandle(handle);
  return {
    title: `${product.title} | AVANTI`,
    description: product.description,
  };
}

async function Product({ params }: { params: { handle: string } }) {
  const handle = params.handle;
  const product = await ProductService.getProductByHandle(handle);

  return (
    <Suspense fallback={<FullPageLoader />}>
      <div className="w-full flex justify-center">
        <div className="p-8 w-full sm:w-[600px] lg:w-[750px] flex flex-col gap-6">
          <Typography variant="h1" className="text-center">
            {product.title}
          </Typography>
          {
            <div className="relative w-full aspect-square mx-auto shadow">
              <Image
                src={product.images[0].url}
                alt={product.title}
                fill
                className="rounded"
              />
            </div>
          }
          <Typography variant="paragraph">{product.description}</Typography>
          <Typography
            variant="h4"
            className="text-right"
          >{`${product.price.amount} ${product.price.currencyCode}`}</Typography>
        </div>
      </div>
    </Suspense>
  );
}

export default Product;

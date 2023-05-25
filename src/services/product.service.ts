import graphQLClient from "@/graphql";
import { PRODUCT_BY_HANDLE_QUERY } from "@/graphql/queries/product-by-handle.query";
import { PRODUCTS_QUERY } from "@/graphql/queries/products.query";
import { removeEdgesAndNodes } from "@/helpers/utils";

class ProductService {
  static async getProducts(
    query: string,
    first: number | null,
    after?: string | null,
    last?: number | null,
    before?: string | null
  ) {
    const products = await graphQLClient.request(PRODUCTS_QUERY, {
      first,
      before,
      after,
      query,
    });

    return products;
  }

  static async getProductByHandle(handle: string) {
    const response = (await graphQLClient.request(PRODUCT_BY_HANDLE_QUERY, {
      handle,
    })) as any;

    const product = response.product;
    product.images = removeEdgesAndNodes(product.images);
    product.price = product.variants.edges[0].node.price;
    delete product.variants;

    return product;
  }
}

export default Object.freeze(ProductService);

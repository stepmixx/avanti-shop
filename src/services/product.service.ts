import graphQLClient from "@/graphql";
import { PRODUCTS_QUERY } from "@/graphql/queries/products.query";

class ProductService {
  static async getProducts(first: number, after: string, query: string) {
    const products = await graphQLClient.request(PRODUCTS_QUERY, {
      first,
      after,
      query,
    });

    return products;
  }
}

export default Object.freeze(ProductService);

import graphQLClient from "@/graphql";
import { COLLECTION_BY_HANDLE_QUERY } from "@/graphql/queries/collection-by-handle.query";
import { COLLECTIONS_QUERY } from "@/graphql/queries/collections.query";
import { removeEdgesAndNodes } from "@/helpers/utils";

class CollectionService {
  static async getCollections() {
    const collections = await graphQLClient.request(COLLECTIONS_QUERY, {
      first: 10,
      after: null,
    });

    return collections;
  }

  static async getCollectionByHandle(
    handle: string,
    first: number,
    after?: string
  ) {
    const response = (await graphQLClient.request(COLLECTION_BY_HANDLE_QUERY, {
      handle,
      first,
      after,
    })) as any;

    const collection = response.collection;
    collection.products = removeEdgesAndNodes(collection.products);
    collection.products.forEach((product: any) => {
      product.price = product.variants.edges[0].node.price;
      delete product.variants;
    });

    return collection;
  }
}

export default Object.freeze(CollectionService);

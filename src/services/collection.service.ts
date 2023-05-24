import graphQLClient from "@/graphql";
import { COLLECTION_BY_HANDLE_QUERY } from "@/graphql/queries/collection-by-handle.query";
import { COLLECTIONS_QUERY } from "@/graphql/queries/collections.query";
import {
  removeEdgesAndNodes,
  removeEdgesAndNodesWithPagination,
} from "@/helpers/utils";

class CollectionService {
  static async getCollections() {
    const response = (await graphQLClient.request(COLLECTIONS_QUERY, {
      first: 10,
      after: null,
    })) as any;

    const collections = removeEdgesAndNodes(response.collections);

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
    collection.products = removeEdgesAndNodesWithPagination(
      collection.products
    );
    collection.products.data.forEach((product: any) => {
      product.price = product.variants.edges[0].node.price;
      delete product.variants;
    });

    return collection;
  }
}

export default Object.freeze(CollectionService);

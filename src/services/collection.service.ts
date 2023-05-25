import graphQLClient from "@/graphql";
import { COLLECTION_BY_HANDLE_QUERY } from "@/graphql/queries/collection-by-handle.query";
import { COLLECTIONS_QUERY } from "@/graphql/queries/collections.query";
import { removeEdgesAndNodes, removeNodesForPagination } from "@/helpers/utils";
import { Arapey } from "next/font/google";

class CollectionService {
  static async getCollections() {
    const response = (await graphQLClient.request(COLLECTIONS_QUERY, {
      first: 10,
      after: null,
      last: null,
      before: null,
    })) as any;

    const collections = removeEdgesAndNodes(response.collections);

    return collections;
  }

  static async getCollectionByHandle(
    handle: string,
    first?: number | null,
    after?: string | null,
    last?: number | null,
    before?: string | null
  ) {
    const response = (await graphQLClient.request(COLLECTION_BY_HANDLE_QUERY, {
      handle,
      first,
      after,
      last,
      before,
    })) as any;

    const collection = response.collection;
    collection.products = removeNodesForPagination(collection.products) as any;
    collection.products.edges.forEach((product: any) => {
      product.price = product.variants.edges[0].node.price;
      delete product.variants;
    });

    return collection;
  }
}

export default Object.freeze(CollectionService);

import graphQLClient from "@/graphql";
import { COLLECTION_BY_HANDLE_QUERY } from "@/graphql/queries/collection-by-handle.query";
import { COLLECTIONS_QUERY } from "@/graphql/queries/collections.query";

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
    const collectionByHandle = await graphQLClient.request(
      COLLECTION_BY_HANDLE_QUERY,
      {
        handle,
        first,
        after,
      }
    );

    return collectionByHandle;
  }
}

export default Object.freeze(CollectionService);

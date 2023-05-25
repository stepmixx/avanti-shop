import { gql } from "graphql-request";

export const COLLECTION_BY_HANDLE_QUERY = gql`
  query collectionByHandle(
    $handle: String!
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    collection(handle: $handle) {
      title
      handle
      description
      image {
        id
        url
      }
      products(first: $first, after: $after, last: $last, before: $before) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          cursor
          node {
            title
            handle
            featuredImage {
              id
              url
              altText
            }
            variants(first: 1) {
              edges {
                node {
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

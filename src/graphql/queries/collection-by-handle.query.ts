import { gql } from "graphql-request";

export const COLLECTION_BY_HANDLE_QUERY = gql`
  query collectionByHandle($handle: String!, $first: Int!, $after: String) {
    collection(handle: $handle) {
      title
      handle
      description
      image {
        id
        url
      }
      products(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          hasPreviousPage
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

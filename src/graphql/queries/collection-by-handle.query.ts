import { gql } from "graphql-request";

export const COLLECTION_BY_HANDLE_QUERY = gql`
  query collectionByHandle($handle: String!, $first: Int!, $after: String) {
    collection(handle: $handle) {
      title
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
            images(first: 1) {
              edges {
                node {
                  url
                }
              }
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

import { gql } from "graphql-request";

export const PRODUCTS_QUERY = gql`
  query products(
    $query: String
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    products(
      query: $query
      first: $first
      after: $after
      last: $last
      before: $before
    ) {
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
          description
          featuredImage {
            id
            url
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
`;

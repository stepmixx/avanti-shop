import { gql } from "graphql-request";

export const PRODUCT_BY_HANDLE_QUERY = gql`
  query productByHandle($handle: String!) {
    product(handle: $handle) {
      title
      handle
      description
      images(first: 5) {
        edges {
          node {
            id
            url
            altText
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
`;

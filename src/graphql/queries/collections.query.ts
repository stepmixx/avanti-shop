import { gql } from "graphql-request";

export const COLLECTIONS_QUERY = gql`
  query collections($first: Int!, $after: String) {
    collections(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          id
          handle
          title
          image {
            id
            url
          }
        }
      }
    }
  }
`;

import { gql } from "graphql-request";

export const COLLECTIONS_QUERY = gql`
  query collections($first: Int, $after: String, $last: Int, $before: String) {
    collections(first: $first, after: $after, last: $last, before: $before) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
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

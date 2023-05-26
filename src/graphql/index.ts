import { GraphQLClient } from "graphql-request";

const graphQLClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAPHQL_URL as string,
  {
    fetch,
  }
);

export default graphQLClient;

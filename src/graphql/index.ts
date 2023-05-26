import { GraphQLClient } from "graphql-request";

const graphQLClient = new GraphQLClient(process.env.GRAPHQL_URL as string, {
  fetch,
});

export default graphQLClient;

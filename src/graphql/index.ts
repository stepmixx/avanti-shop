import { GraphQLClient } from "graphql-request";

const graphQLClient = new GraphQLClient(process.env.GRAPHQL_URL as string);

export default graphQLClient;

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.GRAPHQL_ENDPOINT || "https://graphql-pokemon2.vercel.app" }),
  cache: new InMemoryCache(),
});

export default client;

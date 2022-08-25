import { gql, ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
//
import { typeDefs, resolvers } from "./src/graphql-test.js";


async function startApolloServer(typeDefs, resolvers) {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      csrfPrevention: true,
      cache: "bounded",
      plugins: [
        ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      ],
    });
    const { url } = await server.listen();
    console.log(`🚀 Server ready at ${url}`);
  }

  startApolloServer(typeDefs, resolvers)
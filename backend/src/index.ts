import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { dataSourceGoodCorner } from "./config/db";
import { buildSchema } from "type-graphql";
import AdResolver from "./resolvers/AdResolvers";
import CategoryResolvers from "./resolvers/CategoryResolvers";

const start = async () => {
  await dataSourceGoodCorner.initialize();

  const schema = await buildSchema({
    resolvers: [AdResolver, CategoryResolvers],
  });

  const server = new ApolloServer({
    schema,
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server listening at: ${url}`);
};
start();

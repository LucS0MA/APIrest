import { ApolloServer } from "@apollo/server";
import "dotenv/config";
import { startStandaloneServer } from "@apollo/server/standalone";
import { dataSourceGoodCorner } from "./config/db";
import { buildSchema } from "type-graphql";
import AdResolver from "./resolvers/AdResolvers";
import CategoryResolvers from "./resolvers/CategoryResolvers";
import TagResolvers from "./resolvers/TagResolvers";
import UserResolvers from "./resolvers/UserResolvers";

const start = async () => {
  if (process.env.JWT_SECRET_KEY === null && process.env.JWT_SECRET_KEY === undefined) {
    console.log("jwt", process.env.JWT_SECRET_KEY)
    throw Error("no jwt secret");
  }
  await dataSourceGoodCorner.initialize();

  const schema = await buildSchema({
    resolvers: [AdResolver, CategoryResolvers, TagResolvers, UserResolvers],
  });

  const server = new ApolloServer({
    schema,
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server listening at: ${url}`);
  console.log('test hot reload')
};
start();

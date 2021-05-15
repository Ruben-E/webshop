import { ApolloServer, gql } from "apollo-server";
import * as fs from "fs";
import { GQLResolvers } from "../.generated";
import { ServerContext } from "./models/context.model";
import { ItemsService } from "./services/items.service";
import { PricesService } from "./services/prices.service";

const schema = fs.readFileSync("./schema.graphql");

const typeDefs = gql`
  ${schema.toString()}
`;

const resolvers: GQLResolvers<ServerContext> = {
  Query: {
    items: (_, { params }, { itemsService }) => itemsService.get(params),
  },
  Item: {
    price: (item, _, { pricesService }) => pricesService.getById(item.id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (): ServerContext => ({
    itemsService: new ItemsService(),
    pricesService: new PricesService(),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

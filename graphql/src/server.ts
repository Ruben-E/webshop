import { ApolloServer, gql } from "apollo-server";
import * as fs from "fs";
import { GQLResolvers } from "../.generated";
import { ServerContext } from "./models/context.model";
import { ItemsService } from "./services/items.service";

const schema = fs.readFileSync("./schema.graphql");

const typeDefs = gql`
  ${schema.toString()}
`;

const resolvers: GQLResolvers<ServerContext> = {
  Query: {
    /**
     * @param _ Object resolved so far (not relevant for Query resolvers since it's the first layer)
     * @param __ Query input variables (hello has none)
     * @param context ServerContext provides data sources and other deps we define (see server creation)
     * @return string | Promise<string>
     */
    hello: (_, __, context) => "world",
    items: (_, { paging }, { itemsService }) => itemsService.get(paging),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (): ServerContext => ({
    itemsService: new ItemsService(),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

import { ApolloServer, gql } from "apollo-server";
import * as fs from "fs";
import { GQLResolvers } from "../.generated";
import { ServerContext } from "./models/context.model";
import { ItemsService } from "./services/items.service";
import { PricesService } from "./services/prices.service";
import { CartService } from "./services/cart.service";
import { CategoriesService } from "./services/categories.service";

const schema = fs.readFileSync("./schema.graphql");

const typeDefs = gql`
  ${schema.toString()}
`;

const resolvers: GQLResolvers<ServerContext> = {
  Mutation: {
    addToCart: async (_, { params }, { cartService }) => {
      await cartService.add(params);
      return {
        ...params,
        item: undefined,
        total: "",
      };
    },
  },
  Query: {
    items: (_, { params }, { itemsService }) => {
      console.debug("Queried items");
      return itemsService.get(params);
    },
    cart: async (_, {}, { cartService }) => ({
      items: await cartService.getItems(),
      total: "",
    }),
    categories: async (_, __, { categoriesService }) => {
      const categories = await categoriesService.get();
      return categories.map((category) => ({
        ...category,
        items: [],
      }));
    },
    category: (_, { title }) => ({ title, items: [] }),
  },
  Item: {
    price: (item, _, { pricesService }) => pricesService.getById(item.id),
    amountInCart: (item, _, { cartService }) =>
      cartService.getQuantity(item.id),
  },
  CartItem: {
    item: ({ id }, _, { itemsService }) => itemsService.getById(id),
  },
  Cart: {
    total: (_, __, { cartService }) => cartService.getTotalPrice(),
  },
  Category: {
    items: (category, _, { categoriesService }) =>
      categoriesService.getItemsByTitle(category.title),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (): ServerContext => ({
    itemsService: new ItemsService(),
    pricesService: new PricesService(),
    cartService: new CartService(),
    categoriesService: new CategoriesService(),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

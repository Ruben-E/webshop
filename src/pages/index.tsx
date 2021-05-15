import React from "react";
import { HomePage } from "@webshop/pages";
import {
  ItemsDocument,
  useAddToCartMutation,
  useItemsQuery,
} from "@webshop/graphql";
import { initializeApollo } from "./_app";
import gql from "graphql-tag";

export default function Index() {
  const itemsQuery = useItemsQuery();

  const [addToCartMutation] = useAddToCartMutation();

  /**
   * Add item to cart remotely and update local state accordingly.
   */
  const addToCart = (id: number, quantity: number) => {
    (async () => {
      try {
        await addToCartMutation({
          variables: { id, quantity },
          refetchQueries: [
            {
              query: gql`
                query AmountInCart {
                  items {
                    amountInCart
                  }
                }
              `,
            },
          ],
        });
      } catch (error) {
        console.error("Add item to cart failed", error);
      }
    })();
  };

  return (
    <HomePage
      addToCart={addToCart}
      itemsState={{
        loading: itemsQuery.loading,
        data: itemsQuery.data?.items,
        error: itemsQuery.error,
      }}
    />
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: ItemsDocument,
  });
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

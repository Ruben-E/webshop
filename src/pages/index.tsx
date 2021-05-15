import React, { useEffect, useState } from "react";
import { ClientItem } from "@webshop/models";
import { HomePage } from "@webshop/pages";
import { normalize } from "@webshop/utils";
import {
  ItemsDocument,
  useAddToCartMutation,
  useCartItemIdsQuery,
  useItemsQuery,
} from "@webshop/graphql";
import { initializeApollo } from "./_app";

export default function Index() {
  const [items, setItems] = useState<ClientItem[]>([]);

  const itemsQuery = useItemsQuery();
  /**
   * Get items from server
   */
  useEffect(() => {
    setItems(itemsQuery.data?.items || []);
  }, [itemsQuery.data]);

  const cartItemIdsQuery = useCartItemIdsQuery();

  /**
   * Enrich remote item to client item.
   */
  useEffect(() => {
    const items = itemsQuery.data?.items;
    const cart = cartItemIdsQuery.data?.cart?.items;
    if (!items || !cart) {
      return;
    }

    const normalizedCart = normalize(cart);
    const updatedItems = items.map((item) => {
      const inCart = normalizedCart[item.id] !== undefined;
      if (inCart) {
        return {
          ...item,
          inCart: true,
          quantity: normalizedCart[item.id].quantity,
        };
      } else {
        return {
          ...item,
          inCart: false,
        };
      }
    });
    setItems(updatedItems);
  }, [itemsQuery.data, cartItemIdsQuery.data]);

  const [addToCartMutation] = useAddToCartMutation();

  /**
   * Add item to cart remotely and update local state accordingly.
   */
  const addToCart = (id: number, quantity: number) => {
    (async () => {
      try {
        await addToCartMutation({
          variables: { id, quantity },
          refetchQueries: ["CartItemIds"],
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
        data: items,
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

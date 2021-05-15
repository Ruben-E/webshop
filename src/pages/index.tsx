import React, { useEffect, useState } from "react";
import { ClientItem } from "@webshop/models";
import { HomePage } from "@webshop/pages";
import { normalize } from "@webshop/utils";
import { addItemToCartRequest } from "@webshop/requests";
import { useCartItemIdsQuery, useItemsQuery } from "@webshop/graphql";

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

  /**
   * Add item to cart remotely and update local state accordingly.
   */
  const addToCart = (id: number, quantity: number) => {
    (async () => {
      try {
        await addItemToCartRequest(id, quantity);
        setItems(
          items.map((item) =>
            item.id !== id
              ? item
              : {
                  ...item,
                  inCart: true,
                  quantity,
                }
          )
        );
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

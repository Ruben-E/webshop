import React, { useEffect, useState } from "react";
import { ClientItem, RemoteCartItem, RequestState } from "@webshop/models";
import { HomePage } from "@webshop/pages";
import { normalize } from "@webshop/utils";
import { addItemToCartRequest, getCartRequest } from "@webshop/requests";
import { gql, useQuery } from "@apollo/client";
import { GQLItem } from "@webshop/graphql";

const ITEMS = gql`
  query Items {
    items {
      id
      title
      price
      description
      image
      category
    }
  }
`;

export default function Index() {
  const [itemsState, setItemsState] = useState<RequestState<ClientItem[]>>({
    loading: true,
  });

  const items = useQuery<Record<"items", GQLItem[]>>(ITEMS);
  /**
   * Get items from server
   */
  useEffect(() => {
    setItemsState({
      ...items,
      data: items.data?.items,
    });
  }, [items.data]);

  const [cartState, setCartState] = useState<RequestState<RemoteCartItem[]>>({
    loading: true,
  });

  /**
   * Get cart from server
   */
  useEffect(() => {
    (async () => {
      try {
        const cart = await getCartRequest();
        setCartState({ loading: false, data: cart });
      } catch (error) {
        setCartState({ loading: false, error });
      }
    })();
  }, []);

  /**
   * Enrich remote item to client item.
   */
  useEffect(() => {
    const items = itemsState.data;
    const cart = cartState.data;

    if (items && cart) {
      const normalizedCart = normalize(cart);
      setItemsState((state) => ({
        ...state,
        data: state.data!.map((item) => ({
          ...item,
          ...(normalizedCart[item.id] !== undefined
            ? {
                inCart: true,
                quantity: normalizedCart[item.id].quantity,
              }
            : {
                inCart: false,
              }),
        })),
      }));
    }
  }, [itemsState.data !== undefined, cartState.data !== undefined]);

  /**
   * Add item to cart remotely and update local state accordingly.
   */
  const addToCart = (id: number, quantity: number) => {
    (async () => {
      try {
        await addItemToCartRequest(id, quantity);
        setItemsState((state) => ({
          ...state,
          data: state.data!.map((item) =>
            item.id !== id
              ? item
              : {
                  ...item,
                  inCart: true,
                  quantity,
                }
          ),
        }));
      } catch (error) {
        console.error("Add item to cart failed", error);
      }
    })();
  };

  return <HomePage addToCart={addToCart} itemsState={itemsState} />;
}

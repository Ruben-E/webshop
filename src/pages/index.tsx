import React, { useEffect, useState } from "react";
import { ClientItem, RemoteCartItem, RequestState } from "@webshop/models";
import { HomePage } from "@webshop/pages";
import { normalize } from "@webshop/utils";
import {
  addItemToCartRequest,
  getCartRequest,
  getItemsRequest,
} from "@webshop/requests";

const ITEM_LIMIT = 6;

export default function Index() {
  const [itemsState, setItemsState] = useState<RequestState<ClientItem[]>>({
    loading: true,
  });

  /**
   * Get items from server
   */
  useEffect(() => {
    (async () => {
      try {
        const items = await getItemsRequest({
          limit: ITEM_LIMIT,
        });
        setItemsState({ loading: false, data: items });
      } catch (error) {
        setItemsState({ loading: false, error });
      }
    })();
  }, []);

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

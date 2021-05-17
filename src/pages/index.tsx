import React, { useEffect, useState } from "react";
import {
  ClientItem,
  Paging,
  RemoteCartItem,
  RequestState,
} from "@webshop/models";
import { HomePage } from "@webshop/pages";
import { normalize } from "@webshop/utils";
import {
  addItemToCartRequest,
  getCartRequest,
  getItemsRequest,
} from "@webshop/requests";

const PAGING: Paging = {
  size: 6,
  page: 0,
};

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
          paging: PAGING,
        });
        setItemsState({ loading: false, data: items.content });
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
                amountInCart: normalizedCart[item.id].quantity,
              }
            : {
                amountInCart: 0,
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
                  amountInCart: quantity,
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

import React, { useEffect, useState } from "react";
import { CartItemModel, RemoteItem, RequestState } from "@webshop/models";
import { normalize } from "@webshop/utils";
import {
  getCartItemRequest,
  getCartRequest,
  getCartTotalPriceRequest,
  getItemsRequest,
  removeCartItemRequest,
  updateCartItemRequest,
} from "@webshop/requests";
import { CartPage } from "@webshop/pages";

export default function Cart() {
  const [totalPriceRequestCounter, setTotalPriceRequestCounter] = useState(1);
  const [cartState, setCartState] = useState<RequestState<CartItemModel[]>>({
    loading: true,
  });
  const [totalPriceState, setTotalPriceState] = useState<RequestState<string>>({
    loading: true,
  });

  /**
   * Fetch total price
   */
  useEffect(() => {
    setTotalPriceState({ loading: true });
    (async () => {
      try {
        const totalPrice = await getCartTotalPriceRequest();

        setTotalPriceState({
          loading: false,
          data: totalPrice,
        });
      } catch (error) {
        setTotalPriceState({
          loading: false,
          error,
        });
      }
    })();
  }, [totalPriceRequestCounter]);

  /**
   * Fetch Cart
   */
  useEffect(() => {
    (async () => {
      try {
        const cart = await getCartRequest();

        if (cart.length === 0) {
          setCartState({
            loading: false,
            data: [],
          });
          return;
        }

        const items: RemoteItem[] = await getItemsRequest({
          ids: cart.map(({ id }) => id),
        });

        const normalizedCart = normalize(cart);

        const cartItems: CartItemModel[] = items.map((item) => ({
          ...item,
          quantity: normalizedCart[item.id].quantity,
          total: normalizedCart[item.id].total,
        }));

        setCartState({
          loading: false,
          data: cartItems,
        });
      } catch (error) {
        setCartState({
          loading: false,
          error,
        });
      }
    })();
  }, []);

  /**
   * Remove item from cart, update local state and trigger total price request if cart is not empty.
   */
  const removeItem = (id: number) => {
    (async () => {
      try {
        await removeCartItemRequest(id);

        const updatedCart = cartState.data!.filter((item) => item.id !== id);
        setCartState((cart) => ({
          ...cart,
          data: updatedCart,
        }));

        if (updatedCart.length === 0) {
          setTotalPriceState({ data: "0", loading: false });
        } else {
          setTotalPriceRequestCounter((counter) => counter + 1);
        }
      } catch (error) {
        console.error("Failed to save cart item", id);
      }
    })();
  };

  /**
   * Add item to cart, update local state and trigger total price request.
   */
  const saveItem = (id: number, quantity: number) => {
    (async () => {
      try {
        await updateCartItemRequest({ id, quantity });
        setCartState((cart) => ({
          ...cart,
          data: cart.data!.map((item) =>
            item.id !== id
              ? item
              : {
                  ...item,
                  quantity,
                  total: "",
                }
          ),
        }));

        setTotalPriceRequestCounter((counter) => counter + 1);

        const cartItem = await getCartItemRequest(id);

        setCartState((cart) => ({
          ...cart,
          data: cart.data!.map((item) =>
            item.id !== id
              ? item
              : {
                  ...item,
                  ...cartItem,
                }
          ),
        }));
      } catch (error) {
        console.error("Failed to save cart item", id);
      }
    })();
  };

  return (
    <CartPage
      cartState={cartState}
      totalPriceState={totalPriceState}
      removeItem={removeItem}
      saveItem={saveItem}
    />
  );
}

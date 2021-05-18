import React, { useEffect, useState } from "react";
import {
  ClientItem,
  Paging,
  RemoteCartItem,
  RequestState,
} from "@webshop/models";
import { HomePage } from "@webshop/pages";
import { normalize } from "@webshop/utils";
import { addItemToCartRequest, getCartRequest } from "@webshop/requests";
import { useItemsQuery } from "@webshop/graphql";

const PAGING: Paging = {
  size: 6,
  page: 0,
};

export default function Index() {
  const [items, setItems] = useState<ClientItem[]>([]);

  const itemsQuery = useItemsQuery({
    variables: {
      paging: PAGING,
    },
  });

  useEffect(() => {
    if (itemsQuery.data) {
      setItems(itemsQuery.data.items.content);
    }
  }, [itemsQuery.data]);

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
    const items = itemsQuery.data?.items.content;
    const cart = cartState.data;

    if (items && cart) {
      const normalizedCart = normalize(cart);
      setItems((items) =>
        items.map((item) => ({
          ...item,
          ...(normalizedCart[item.id] !== undefined
            ? {
                amountInCart: normalizedCart[item.id].quantity,
              }
            : {
                amountInCart: 0,
              }),
        }))
      );
    }
  }, [itemsQuery.data !== undefined, cartState.data !== undefined]);

  /**
   * Add item to cart remotely and update local state accordingly.
   */
  const addToCart = (id: number, quantity: number) => {
    (async () => {
      try {
        await addItemToCartRequest(id, quantity);
        setItems((items) =>
          items.map((item) =>
            item.id !== id
              ? item
              : {
                  ...item,
                  amountInCart: quantity,
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

// export async function getStaticProps() {
//   const apolloClient = initializeApollo();
//
//   await apolloClient.query({
//     query: ItemsDocument,
//     variables: {
//       paging: {
//         page: 0,
//         size: 6,
//       },
//     },
//   });
//
//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract(),
//     },
//   };
// }

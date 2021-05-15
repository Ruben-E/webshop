import React, { useEffect, useState } from "react";
import { CategoryPage } from "@webshop/pages";
import { ClientItem } from "@webshop/models";
import { NextPageContext } from "next";
import { normalize } from "@webshop/utils";
import {
  useAddToCartMutation,
  useCartItemIdsQuery,
  useItemsByCategoryQuery,
} from "@webshop/graphql";
import gql from "graphql-tag";

const QUERY_PARAM_NAME = "category";

interface CategoryInitialProps {
  category: string;
}

export default function Category({ category }: CategoryInitialProps) {
  const [items, setItems] = useState<ClientItem[]>([]);

  const itemsByCategoryQuery = useItemsByCategoryQuery({
    variables: {
      title: category,
    },
  });
  /**
   * Get items from server
   */
  useEffect(() => {
    setItems(itemsByCategoryQuery.data?.category?.items || []);
  }, [itemsByCategoryQuery.data]);

  const cartItemIdsQuery = useCartItemIdsQuery();

  /**
   * Enrich remote item to client item.
   */
  useEffect(() => {
    const items = itemsByCategoryQuery.data?.category?.items;
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
  }, [itemsByCategoryQuery.data, cartItemIdsQuery.data]);

  const [addToCartMutation] = useAddToCartMutation();
  /**
   * Add item to cart remotely and update local state accordingly.
   */
  const addToCart = (id: number, quantity: number) => {
    (async () => {
      try {
        await addToCartMutation({
          variables: { id, quantity },
          update: (cache) =>
            cache.writeQuery({
              query: gql`
                query CartItemUpdate {
                  cart {
                    items {
                      id
                      quantity
                    }
                  }
                }
              `,
              data: {
                cart: {
                  __typename: "Cart",
                  items: [
                    ...cartItemIdsQuery.data!.cart.items,
                    { id, quantity },
                  ],
                },
              },
            }),
        });
      } catch (error) {
        console.error("Add item to cart failed", error);
      }
    })();
  };
  return (
    <CategoryPage
      category={{ title: category }}
      itemsState={{
        loading: itemsByCategoryQuery.loading,
        data: items,
        error: itemsByCategoryQuery.error,
      }}
      addToCart={addToCart}
    />
  );
}

Category.getInitialProps = ({
  query,
}: NextPageContext): CategoryInitialProps => ({
  category: query[QUERY_PARAM_NAME] as string,
});

import React, { useEffect, useState } from "react";
import { CategoryPage } from "@webshop/pages";
import { ClientItem, RemoteCartItem, RequestState } from "@webshop/models";
import { NextPageContext } from "next";
import { addItemToCartRequest, getCartRequest } from "@webshop/requests";
import { normalize } from "@webshop/utils";
import { gql, useQuery } from "@apollo/client";
import { GQLCategory } from "@webshop/graphql";

const QUERY_PARAM_NAME = "category";

interface CategoryInitialProps {
  category: string;
}
const ITEM_LIMIT = 6;

const ITEMS_BY_CATEGORY = gql`
  query ItemsByCategory($title: String!) {
    category(title: $title) {
      title
      items {
        id
        title
        price
        description
        image
        category
      }
    }
  }
`;

export default function Category({ category }: CategoryInitialProps) {
  const itemsByCategoryState = useQuery<Record<"category", GQLCategory>>(
    ITEMS_BY_CATEGORY,
    {
      variables: {
        title: category,
      },
    }
  );

  const [itemsState, setItemsState] = useState<RequestState<ClientItem[]>>({
    loading: true,
  });

  const [cartState, setCartState] = useState<RequestState<RemoteCartItem[]>>({
    loading: true,
  });

  /**
   * Get items from server
   */
  useEffect(() => {
    if (itemsByCategoryState.data) {
      setItemsState({
        loading: false,
        data: itemsByCategoryState.data.category.items,
      });
    }
  }, [itemsByCategoryState.data]);

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

  return (
    <CategoryPage
      category={{ title: category }}
      itemsState={itemsState}
      addToCart={addToCart}
    />
  );
}

Category.getInitialProps = ({
  query,
}: NextPageContext): CategoryInitialProps => ({
  category: query[QUERY_PARAM_NAME] as string,
});

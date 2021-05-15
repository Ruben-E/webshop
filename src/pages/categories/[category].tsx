import React from "react";
import { CategoryPage } from "@webshop/pages";
import { NextPageContext } from "next";
import {
  useAddToCartMutation,
  useItemsByCategoryQuery,
} from "@webshop/graphql";
import gql from "graphql-tag";

const QUERY_PARAM_NAME = "category";

interface CategoryInitialProps {
  category: string;
}

export default function Category({ category }: CategoryInitialProps) {
  const itemsByCategoryQuery = useItemsByCategoryQuery({
    variables: {
      title: category,
    },
  });

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
            cache.writeFragment({
              id: `Item:${id}`,
              fragment: gql`
                fragment UpdatedItem on Item {
                  amountInCart
                }
              `,
              data: {
                amountInCart: quantity,
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
        data: itemsByCategoryQuery.data?.category?.items,
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

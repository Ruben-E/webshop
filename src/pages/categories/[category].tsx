import React, { useState } from "react";
import { CategoryPage } from "@webshop/pages";
import { useRemoteGetItemsByCategory } from "@webshop/hooks";
import { ItemModel } from "@webshop/models";
import { NextPageContext } from "next";

const QUERY_PARAM_NAME = "category";

type Cart = Record<string, ItemModel>;

interface CategoryInitialProps {
  category: string;
}

export default function Category({ category }: CategoryInitialProps) {
  const itemsState = useRemoteGetItemsByCategory({
    category: category,
  });

  const [cart, setCart] = useState<Cart>({});

  const addToCart = (item: ItemModel) => {
    setCart({
      ...cart,
      [item.id]: item,
    });
  };

  return (
    <CategoryPage
      category={category as string}
      itemsState={itemsState}
      cart={cart}
      addToCart={addToCart}
    />
  );
}

Category.getInitialProps = ({
  query,
}: NextPageContext): CategoryInitialProps => ({
  category: query[QUERY_PARAM_NAME] as string,
});

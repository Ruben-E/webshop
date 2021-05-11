import React, { useState } from "react";
import { ItemModel } from "@webshop/models";
import { HomePage } from "@webshop/pages";
import { useRemoteGetItems } from "@webshop/hooks";

type Cart = Record<string, ItemModel>;

let ITEM_LIMIT = 6;

export default function Index() {
  const itemsState = useRemoteGetItems({
    limit: ITEM_LIMIT,
  });

  const [cart, setCart] = useState<Cart>({});

  const addToCart = (item: ItemModel) => {
    setCart({
      ...cart,
      [item.id]: item,
    });
  };

  return <HomePage addToCart={addToCart} cart={cart} itemsState={itemsState} />;
}

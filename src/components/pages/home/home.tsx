import { ItemModel, RequestState } from "@webshop/models";
import React from "react";
import { ItemResult } from "@webshop/organisms";
import { Spinner } from "@webshop/atoms";
import { List } from "@webshop/molecules";

interface HomeProps {
  itemsState: RequestState<ItemModel[]>;
  addToCart: (item: ItemModel, quantity: number) => void;
  cart: Record<string, ItemModel>;
}

export const HomePage: React.FunctionComponent<HomeProps> = ({
  itemsState: { data, error, loading },
  addToCart,
  cart,
}) => {
  const isInCart = (item: ItemModel) => cart[item.id] !== undefined;

  return loading ? (
    <Spinner style={{ alignSelf: "center" }}>Loading items...</Spinner>
  ) : error ? (
    <p style={{ alignSelf: "center" }}>Error</p>
  ) : data ? (
    <List>
      {data.map((item) => (
        <li key={`item--${item.id}`} style={{ padding: "8px" }}>
          <ItemResult
            item={item}
            inCart={isInCart(item)}
            onAddToCart={addToCart}
          />
        </li>
      ))}
    </List>
  ) : (
    <p>No data</p>
  );
};

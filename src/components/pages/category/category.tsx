import { Category, RequestState } from "@webshop/models";
import React from "react";
import { ItemResult } from "@webshop/organisms";
import { Divider, Spinner, Title } from "@webshop/atoms";
import { List } from "@webshop/molecules";
import { ClientItem } from "@webshop/models";

interface CategoryPageProps {
  category: Category;
  itemsState: RequestState<ClientItem[]>;
  addToCart: (id: number, quantity: number) => void;
}

export const CategoryPage: React.FunctionComponent<CategoryPageProps> = ({
  category,
  itemsState: { data, error, loading },
  addToCart,
}) => {
  return loading ? (
    <Spinner style={{ alignSelf: "center" }}>Loading items...</Spinner>
  ) : error ? (
    <p style={{ alignSelf: "center" }}>Error</p>
  ) : data ? (
    <section>
      <Title style={{ textAlign: "center" }}>{category.title}</Title>
      <Divider />
      <List>
        {data.map((item) => (
          <li key={`item--${item.id}`} style={{ padding: "8px" }}>
            <ItemResult item={item} onAddToCart={addToCart} />
          </li>
        ))}
      </List>
    </section>
  ) : (
    <p>No data</p>
  );
};

import React from "react";
import { Category, RequestState } from "@webshop/models";
import { Link, Spinner } from "@webshop/atoms";
import { List } from "@webshop/molecules";

interface CategoriesProps {
  categoriesState: RequestState<Category[]>;
}

export const Categories: React.FunctionComponent<CategoriesProps> = ({
  categoriesState: { data, error, loading },
}) => {
  return loading ? (
    <Spinner style={{ alignSelf: "center" }}>Loading items...</Spinner>
  ) : error ? (
    <p style={{ alignSelf: "center" }}>Error</p>
  ) : data ? (
    <List>
      {data.map((category) => (
        <li key={`category--${category}`}>
          <Link href={`/categories/${category}`}>{category}</Link>
        </li>
      ))}
    </List>
  ) : (
    <p>No data</p>
  );
};

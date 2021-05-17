import { toQueryParams } from "@webshop/utils";

interface RemoteGetItemsByCategoryParams {
  category: string;
  limit?: number;
}

export const getItemsByCategoryRequest = ({
  category,
  ...params
}: RemoteGetItemsByCategoryParams) =>
  fetch(
    `https://fakestoreapi.com/products/category/${category}${toQueryParams(
      params
    )}`
  ).then((res) => res.json());

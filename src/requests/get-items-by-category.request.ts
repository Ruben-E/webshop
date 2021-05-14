import { toQueryParams } from "@webshop/utils";
import { RemoteGetItemsParams } from "./get-items.request";

interface RemoteGetItemsByCategoryParams extends RemoteGetItemsParams {
  category: string;
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

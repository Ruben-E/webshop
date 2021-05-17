import { toQueryParams } from "@webshop/utils";
import { Paged, Paging, RemoteItem } from "@webshop/models";

interface RemoteGetItemsByCategoryParams {
  category: string;
  paging?: Paging;
}

export const getItemsByCategoryRequest = ({
  category,
  paging,
}: RemoteGetItemsByCategoryParams): Promise<Paged<RemoteItem>> =>
  fetch(
    `/api/items/category/${category}${toQueryParams(
      paging || {}
    )}`
  ).then((res) => res.json());

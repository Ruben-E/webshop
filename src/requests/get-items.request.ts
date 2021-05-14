import { toQueryParams } from "@webshop/utils";

export interface RemoteGetItemsParams {
  limit?: number;
  sort?: "asc" | "desc";
  ids?: string[];
}

export const getItemsRequest = ({
  ids,
  ...params
}: RemoteGetItemsParams = {}) =>
  fetch(
    `/api/items${toQueryParams({
      ...params,
      ids: ids !== undefined ? ids.join(",") : undefined,
    })}`
  ).then((res) => res.json());

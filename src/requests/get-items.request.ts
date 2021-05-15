import { toQueryParams } from "@webshop/utils";
import { ClientItem } from "@webshop/models";

export interface RemoteGetItemsParams {
  limit?: number;
  sort?: "asc" | "desc";
  ids?: string[];
}

export const getItemsRequest = ({
  ids,
  ...params
}: RemoteGetItemsParams = {}): Promise<{ content: ClientItem[] }> =>
  fetch(
    `/api/items${toQueryParams({
      ...params,
      ids: ids !== undefined ? ids.join(",") : undefined,
    })}`
  ).then((res) => res.json());

import { toQueryParams } from "@webshop/utils";
import { ClientItem, Paging } from "@webshop/models";

export interface RemoteGetItemsParams {
  ids?: string[];
  paging?: Paging;
}

export const getItemsRequest = ({
  ids,
  paging,
}: RemoteGetItemsParams): Promise<{ content: ClientItem[] }> =>
  fetch(
    `/api/items${toQueryParams({
      ...(paging || {}),
      ids: ids !== undefined ? ids.join(",") : undefined,
    })}`
  ).then((res) => res.json());

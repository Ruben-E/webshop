import { ItemModel } from "@webshop/models";
import { toQueryParams } from "@webshop/utils";
import { useRemoteGet } from "../remote-get/remote-get.hook";
import { environment } from "@webshop/config";

export interface RemoteGetItemsParams {
  limit?: number;
  sort?: "asc" | "desc";
}

export const useRemoteGetItems = (params: RemoteGetItemsParams = {}) =>
  useRemoteGet<ItemModel[]>(`${environment.itemsApi}${toQueryParams(params)}`);

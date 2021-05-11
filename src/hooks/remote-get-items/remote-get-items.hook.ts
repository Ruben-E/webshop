import { ItemModel } from "@webshop/models";
import { toQueryParams } from "@webshop/utils";
import { useRemoteGet } from "../remote-get/remote-get.hook";
import { environment } from "@webshop/config";

interface RemoteItemsParams {
  limit?: number;
  sort?: "asc" | "desc";
}

export const useRemoteItems = (params: RemoteItemsParams = {}) =>
  useRemoteGet<ItemModel[]>(`${environment.itemsApi}${toQueryParams(params)}`);

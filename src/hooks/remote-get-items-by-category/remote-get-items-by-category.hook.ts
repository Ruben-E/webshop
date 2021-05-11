import { ItemModel } from "@webshop/models";
import { useRemoteGet } from "../remote-get/remote-get.hook";
import { environment } from "@webshop/config";
import { RemoteGetItemsParams } from "..";
import { toQueryParams } from "@webshop/utils";

interface RemoteGetItemsByCategoryParams extends RemoteGetItemsParams {
  category: string;
}

export const useRemoteGetItemsByCategory = ({
  category,
  ...params
}: RemoteGetItemsByCategoryParams) =>
  useRemoteGet<ItemModel[]>(
    `${environment.itemsApi}/category/${category}${toQueryParams(params)}`
  );

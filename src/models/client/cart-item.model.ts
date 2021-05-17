import { RemoteItem } from "@webshop/models";

export interface CartItemModel extends RemoteItem {
  quantity: number;
  total: string;
}

import { RemoteItem } from "..";

export interface ClientItem extends RemoteItem {
  amountInCart?: number;
}

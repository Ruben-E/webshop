import { RemoteItem } from "..";

export interface ClientItem extends RemoteItem {
  inCart?: boolean;
  quantity?: number;
}

import { RemoteCartItem } from "@webshop/models";

export const getCartRequest = (): Promise<RemoteCartItem[]> =>
  fetch("/api/cart").then((res) => res.json());

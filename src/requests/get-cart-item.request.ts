import { RemoteCartItem } from "@webshop/models";

export const getCartItemRequest = (id: number): Promise<RemoteCartItem[]> =>
  fetch(`/api/cart/${id}`).then((res) => res.json());

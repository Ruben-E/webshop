import fetch from "node-fetch";
import DataLoader from "dataloader";
import { normalize } from "../../../src/utils";
import { RemoteCartItem } from "../../../src/models";

const CART_ENDPOINT = `http://localhost:3000/api/cart`;

export class CartService {
  private cartDataLoader = new DataLoader<number, RemoteCartItem | undefined>(
    async (ids) => {
      const cart = await this.getCart();
      const normalizedCart = normalize(cart);
      return ids.map((id) => normalizedCart[id]);
    }
  );

  async getCart(): Promise<RemoteCartItem[]> {
    return fetch(CART_ENDPOINT).then((res) => res.json());
  }

  async getQuantity(id: number): Promise<number> {
    const cartItem = await this.cartDataLoader.load(id);
    return cartItem?.quantity || 0;
  }
}

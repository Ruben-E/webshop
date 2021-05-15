import fetch from "node-fetch";
import { GQLAddToCartParams, GQLCartItem } from "../../.generated";
import DataLoader from "dataloader";
import { normalize } from "../../../src/utils";

const CART_ENDPOINT = `http://localhost:3000/api/cart`;

export class CartService {
  private inCartDataLoader = new DataLoader<number, GQLCartItem | undefined>(
    async (ids) => {
      const cart = await this.getItems();
      const normalizedCart = normalize(cart);
      return ids.map((id) => normalizedCart[id]);
    }
  );

  async getItems(): Promise<GQLCartItem[]> {
    return fetch(CART_ENDPOINT).then((res) => res.json());
  }

  async getTotalPrice(): Promise<string> {
    return fetch(`${CART_ENDPOINT}/total-price`).then((res) => res.json());
  }

  async add(params: GQLAddToCartParams) {
    return fetch(CART_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async isInCart(id: number): Promise<boolean> {
    const cartItem = await this.inCartDataLoader.load(id);
    return cartItem !== undefined;
  }

  async getQuantity(id: number): Promise<number> {
    const cartItem = await this.inCartDataLoader.load(id);
    return cartItem?.quantity || 0;
  }
}

import fetch from "node-fetch";
import { GQLAddToCartParams, GQLCartItem } from "../../.generated";

const CART_ENDPOINT = `http://localhost:3000/api/cart`;

export class CartService {
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
}

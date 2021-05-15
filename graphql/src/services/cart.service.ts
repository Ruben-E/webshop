import fetch from "node-fetch";
import { GQLCartItem } from "../../.generated";

const CART_ENDPOINT = `http://localhost:3000/api/cart`;

export class CartService {
  async getItems(): Promise<GQLCartItem[]> {
    return fetch(CART_ENDPOINT).then((res) => res.json());
  }

  async getTotalPrice(): Promise<string> {
    return fetch(`${CART_ENDPOINT}/total-price`)
      .then((res) => res.json());
  }
}

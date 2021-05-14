import type { NextApiRequest, NextApiResponse } from "next";
import numeral from "numeral";
import { PRICES } from "@webshop/data";
import { delay } from "@webshop/utils";

/**
 * Inmemory cart
 * Key value: id - quantity
 */
interface Cart {
  [id: string]: number;
}

export const CART: Cart = {
  "1": 2,
};

const CART_PERFORMANCE_DELAY = 1000;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      const cartAsArray = Object.keys(CART).map((key) => ({
        id: key,
        quantity: CART[key],
        total: numeral(PRICES[key]).multiply(CART[key]).format("0,0.00"),
      }));

      await delay(CART_PERFORMANCE_DELAY);

      res.status(200).json(cartAsArray);
      break;
    }
    case "POST": {
      const { id, quantity } = req.body;
      CART[id] = quantity;
      res.status(204).end();
      break;
    }
    default: {
      res.status(405).end();
    }
  }
};

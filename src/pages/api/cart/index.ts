import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Inmemory cart
 * Key value: id - quantity
 */
interface Cart {
  [id: string]: number;
}

export const CART: Cart = {};

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const cartAsArray = Object.keys(CART).map((key) => ({
      id: key,
      quantity: CART[key],
    }));
    res.status(200).json(cartAsArray);
  } else if (req.method === "POST") {
    const { id, quantity } = req.body;
    CART[id] = quantity;
    res.status(204).end();
  } else {
    res.status(405).end();
  }
};

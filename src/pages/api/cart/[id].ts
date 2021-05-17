import type { NextApiRequest, NextApiResponse } from "next";
import { CART } from "./index";
import numeral from "numeral";
import { PRICES } from "@webshop/data";

export const PERFORMANCE_DELAY = 1000;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;

  if (CART[id] === undefined) {
    res.status(404).end();
    return;
  }

  switch (req.method) {
    case "GET": {
      // await delay(PERFORMANCE_DELAY);
      res.status(200).json({
        id,
        quantity: CART[id],
        total: numeral(PRICES[id]).multiply(CART[id]).format("0,0.00"),
      });
      break;
    }
    case "DELETE": {
      delete CART[id];
      res.status(204).end();
      break;
    }
    case "PUT": {
      if (CART[id] === undefined) {
        res.status(404).end();
      } else {
        const quantity = req.body.quantity;
        if (quantity) {
          CART[id] = req.body.quantity;
        }
        res.status(204).end();
      }
      break;
    }
    default: {
      res.status(405).end();
    }
  }
};

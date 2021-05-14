import type { NextApiRequest, NextApiResponse } from "next";
import { CART } from "./index";
import numeral from "numeral";
import { PRICES } from "@webshop/data";
import { delay } from "@webshop/utils";

export const CART_PERFORMANCE_DELAY = 1000;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;

  switch (req.method) {
    case "GET": {
      await delay(CART_PERFORMANCE_DELAY);
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
        CART[id] = req.body.quantity;
        res.status(204).end();
      }
      break;
    }
    default: {
      res.status(405).end();
    }
  }
};

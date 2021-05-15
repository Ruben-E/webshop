import type { NextApiRequest, NextApiResponse } from "next";
import { ITEMS, NORMALIZED_ITEMS, PRICES } from "@webshop/data";
import { RemoteItem } from "@webshop/models";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      const ids = req.query.ids as string;
      let prices: { id: number; price: number }[];
      if (ids) {
        prices = ids.split(",").map((id) => ({
          id: parseInt(id),
          price: PRICES[id.toString()],
        }));
      } else {
        prices = Object.keys(PRICES).map((id) => ({
          id: parseInt(id),
          price: PRICES[id.toString()],
        }));
      }
      res.status(200).json(prices);
      break;
    }
    default: {
      res.status(405).end();
    }
  }
};

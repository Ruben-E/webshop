import type { NextApiRequest, NextApiResponse } from "next";
import { ITEMS, NORMALIZED_ITEMS, PRICES } from "@webshop/data";
import { RemoteItem } from "@webshop/models";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      const ids = req.query.ids as string;
      let prices: number[];
      if (ids) {
        prices = ids.split(",").map((id) => PRICES[id.toString()]);
      } else {
        prices = Object.keys(PRICES).map((id) => PRICES[id.toString()]);
      }
      res.status(200).json(prices);
      console.debug("/api/prices returned 200", prices);
      break;
    }
    default: {
      res.status(405).end();
    }
  }
};

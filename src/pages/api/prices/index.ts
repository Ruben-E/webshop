import type { NextApiRequest, NextApiResponse } from "next";
import { PRICES } from "@webshop/data";
import { delay } from "@webshop/utils";

const PERFORMANCE_DELAY = 2000;

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
      // await delay(PERFORMANCE_DELAY);
      res.status(200).json(prices);
      console.debug("/api/prices returned", prices.length, "prices");
      break;
    }
    default: {
      res.status(405).end();
    }
  }
};

import type { NextApiRequest, NextApiResponse } from "next";
import { PRICES } from "@webshop/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      const ids = req.query.ids as string;
      console.log("Get price by ids", ids);
      const prices = ids.split(",").map((id) => PRICES[id]);
      res.status(200).json(prices);
      break;
    }
    default: {
      res.status(405).end();
    }
  }
};

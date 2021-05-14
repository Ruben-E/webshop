import { NextApiRequest, NextApiResponse } from "next";
import { CART } from "./index";
import numeral from "numeral";
import { PRICES } from "@webshop/data";
import { delay } from "@webshop/utils";

const TOTAL_PRICE_PERFORMANCE_DELAY = 2000;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      const total = Object.keys(CART)
        .map((key) => numeral(PRICES[key]).multiply(CART[key]).value())
        .reduce((total, value) => total.add(value), numeral(0));

      await delay(TOTAL_PRICE_PERFORMANCE_DELAY);

      res.status(200).json(JSON.stringify(total.format("0,0.00")));
      break;
    }
    default: {
      res.status(405).end();
    }
  }
};

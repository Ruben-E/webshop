import { NextApiRequest, NextApiResponse } from "next";
import { CART } from "./index";
import numeral from "numeral";

/**
 * Hardcoded prices
 */
const PRICES: Record<string, number> = {
  "1": 109.95,
  "2": 22.3,
  "3": 55.99,
  "4": 15.99,
  "5": 695,
  "6": 168,
  "7": 9.99,
  "8": 10.99,
  "9": 64,
  "10": 109,
  "11": 109,
  "12": 114,
  "13": 599,
  "14": 999.99,
  "15": 56.99,
  "16": 29.95,
  "17": 39.99,
  "18": 9.85,
  "19": 7.95,
  "20": 12.99,
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const total = Object.keys(CART)
      .map((key) => numeral(PRICES[key]).multiply(CART[key]).value())
      .reduce((total, value) => total.add(value), numeral(0));

    return res.status(200).send(total.format("0,0.00"));
  } else {
    res.status(405).end();
  }
};

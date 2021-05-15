import type { NextApiRequest, NextApiResponse } from "next";
import { PRICES } from "@webshop/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;

  switch (req.method) {
    case "GET": {
      console.log("Get price by id", id);
      res.status(200).json(JSON.stringify(PRICES[id]));
      break;
    }
    default: {
      res.status(405).end();
    }
  }
};

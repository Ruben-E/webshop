import type { NextApiRequest, NextApiResponse } from "next";
import { PRICES } from "@webshop/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;

  if (PRICES[id] === undefined) {
    res.status(404).end();
    return;
  }

  switch (req.method) {
    case "GET": {
      res.status(200).json(JSON.stringify(PRICES[id]));
      console.debug(`/api/prices/${id} returned`, PRICES[id]);
      break;
    }
    default: {
      res.status(405).end();
    }
  }
};

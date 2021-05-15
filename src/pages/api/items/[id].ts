import type { NextApiRequest, NextApiResponse } from "next";
import { NORMALIZED_ITEMS, PRICES } from "@webshop/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;

  switch (req.method) {
    case "GET": {
      res.status(200).json(JSON.stringify(NORMALIZED_ITEMS[id]));
      console.debug(`/api/items/${id} returned 200`, NORMALIZED_ITEMS[id]);
      break;
    }
    default: {
      res.status(405).end();
    }
  }
};

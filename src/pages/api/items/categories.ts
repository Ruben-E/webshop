import type { NextApiRequest, NextApiResponse } from "next";
import { CATEGORIES } from "@webshop/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      res.status(200).json(CATEGORIES);
      break;
    }
    default: {
      res.status(405).end();
    }
  }
};

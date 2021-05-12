import type { NextApiRequest, NextApiResponse } from "next";
import { CART } from "./index";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;

  if (req.method === "DELETE") {
    delete CART[id];
    res.status(204).end();
  } else if (req.method === "PUT") {
    if (CART[id] === undefined) {
      res.status(404).end();
    } else {
      CART[id] = 5;
      res.status(204).end();
    }
  } else {
    res.status(405).end();
  }
};

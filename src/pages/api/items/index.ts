import type { NextApiRequest, NextApiResponse } from "next";
import { ITEMS, NORMALIZED_ITEMS } from "@webshop/data";
import { RemoteItem } from "@webshop/models";

export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      const ids = req.query.ids as string;
      console.log(ids);
      let items: RemoteItem[];
      if (ids) {
        items = ids.split(",").map((id) => NORMALIZED_ITEMS[id]);
      } else {
        items = ITEMS;
      }
      res.status(200).json(items);
      break;
    }
    default: {
      res.status(405).end();
    }
  }
};

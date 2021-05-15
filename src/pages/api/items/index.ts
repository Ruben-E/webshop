import type { NextApiRequest, NextApiResponse } from "next";
import { ITEMS, NORMALIZED_ITEMS } from "@webshop/data";
import { RemoteItem } from "@webshop/models";

export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      const ids = req.query.ids as string;
      const page = req.query.page as string;
      const size = req.query.size as string;
      let items: RemoteItem[];
      if (ids) {
        items = ids.split(",").map((id) => NORMALIZED_ITEMS[id]);
      } else {
        items = ITEMS.slice(0);
      }
      if (page && size) {
        const pageInt = parseInt(page);
        const sizeInt = parseInt(size);
        const start = pageInt * sizeInt;
        items = items.splice(start, sizeInt);
      }
      res.status(200).json(items);
      console.debug(`/api/items returned`, items.length, "items");
      break;
    }
    default: {
      res.status(405).end();
    }
  }
};

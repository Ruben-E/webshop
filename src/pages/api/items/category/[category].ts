import type { NextApiRequest, NextApiResponse } from "next";
import { ITEMS, NORMALIZED_CATEGORIES } from "@webshop/data";
import { RemoteItem } from "@webshop/models";
import { paginate } from "@webshop/utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const category = req.query.category as string;

  if (NORMALIZED_CATEGORIES[category] === undefined) {
    res.status(404).end();
    return;
  }

  switch (req.method) {
    case "GET": {
      const items: RemoteItem[] = ITEMS.filter(
        (item) => item.category === category
      );

      const page = parseInt(req.query.page as string);
      const size = parseInt(req.query.size as string);

      const response =
        isNaN(page) || isNaN(size)
          ? {
              content: items,
              page: 0,
              size: items.length,
              totalResults: items.length,
            }
          : paginate(items, page, size);

      res.status(200).json(response);

      console.debug(
        `/api/items/category/${category} returned`,
        response.content.length,
        "items"
      );
      break;
    }
    default: {
      res.status(405).end();
    }
  }
};

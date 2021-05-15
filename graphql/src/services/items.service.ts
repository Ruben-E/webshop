import { GQLItem, GQLItemsParams } from "../../.generated";
import fetch from "node-fetch";
import { toQueryParams } from "../../../src/utils";

export class ItemsService {
  async get(params: GQLItemsParams = {}): Promise<GQLItem[]> {
    return fetch(
      `http://localhost:3000/api/items${toQueryParams({
        ids: params.ids?.join(","),
      })}`
    ).then((res) => res.json());
  }
}

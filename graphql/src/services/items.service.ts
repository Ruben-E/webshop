import { GQLItem, GQLItemsParams } from "../../.generated";
import fetch from "node-fetch";
import { toQueryParams } from "../../../src/utils";
import DataLoader from "dataloader";

export class ItemsService {
  private itemDataLoader = new DataLoader<number, GQLItem>(
    async (ids: number[]) =>
      ids.length === 1
        ? [
            await fetch(
              `http://localhost:3000/api/items/${ids[0]}`
            ).then((res) => res.json()),
          ]
        : this.get({ ids })
  );

  async get(params: GQLItemsParams = {}): Promise<GQLItem[]> {
    return fetch(
      `http://localhost:3000/api/items${toQueryParams({
        ids: params.ids?.join(","),
      })}`
    ).then((res) => res.json());
  }

  async getById(id: number): Promise<GQLItem> {
    return this.itemDataLoader.load(id);
  }
}

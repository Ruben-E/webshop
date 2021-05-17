import { GQLItem, GQLItemsParams, GQLPagedItems } from "../../.generated";
import fetch from "node-fetch";
import { toQueryParams } from "../../../src/utils";
import DataLoader from "dataloader";

interface GetItemsParams extends Partial<GQLItemsParams> {
  ids?: number[];
}
export class ItemsService {
  private itemDataLoader = new DataLoader<number, GQLItem>(
    async (ids: number[]) =>
      ids.length === 1
        ? [
            await fetch(
              `http://localhost:3000/api/items/${ids[0]}`
            ).then((res) => res.json()),
          ]
        : this.get({ ids }).then((data) => data.content)
  );

  async get({ ids, page, size }: GetItemsParams): Promise<GQLPagedItems> {
    return fetch(
      `http://localhost:3000/api/items${toQueryParams({
        ids: ids?.join(","),
        page,
        size,
      })}`
    ).then((res) => res.json());
  }

  async getById(id: number): Promise<GQLItem> {
    return this.itemDataLoader.load(id);
  }
}

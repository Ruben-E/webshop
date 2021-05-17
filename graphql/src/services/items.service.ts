import fetch from "node-fetch";
import { RemoteItem } from "../../../src/models";
import { GQLPagedItems, GQLPagingParams } from "../../.generated";
import { Paged } from "../../../src/utils";

export class ItemsService {
  async get({ page, size }: GQLPagingParams): Promise<GQLPagedItems> {
    return fetch(`http://localhost:3000/api/items?page=${page}&size=${size}`)
      .then((res) => res.json())
      .then((data: Paged<Required<RemoteItem>>) => data);
  }
}

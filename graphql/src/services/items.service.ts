import fetch from "node-fetch";
import { GQLPagedItems, GQLPagingParams } from "../../.generated";

export class ItemsService {
  async get({ page, size }: GQLPagingParams): Promise<GQLPagedItems> {
    return fetch(
      `http://localhost:3000/api/items?page=${page}&size=${size}`
    ).then((res) => res.json());
  }
}

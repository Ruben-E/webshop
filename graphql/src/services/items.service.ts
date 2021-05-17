import fetch from "node-fetch";
import { RemoteItem } from "../../../src/models";
import { GQLItem } from "../../.generated";
import { Paged } from "../../../src/utils";

export class ItemsService {
  async get(): Promise<GQLItem[]> {
    return fetch(`http://localhost:3000/api/items`)
      .then((res) => res.json())
      .then((data: Paged<Required<RemoteItem>>) => data)
      .then((data) => data.content);
  }
}

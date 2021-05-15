import fetch from "node-fetch";
import DataLoader from "dataloader";
import { toQueryParams } from "../../../src/utils";
import { GQLCategory, GQLItem } from "../../.generated";

const CATEGORY_ENDPOINT = `https://fakestoreapi.com/products/category`;
const CATEGORIES_ENDPOINT = `https://fakestoreapi.com/products/categories`;

export class CategoriesService {
  async get(): Promise<Pick<GQLCategory, "title">[]> {
    return fetch(CATEGORIES_ENDPOINT)
      .then((res) => res.json())
      .then((categories) =>
        categories.map((category: string) => ({ title: category }))
      );
  }
  async getItemsByTitle(title: string): Promise<GQLItem[]> {
    return fetch(`${CATEGORY_ENDPOINT}/${title}`).then((res) => res.json());
  }
}

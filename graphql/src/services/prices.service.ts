import fetch from "node-fetch";
import DataLoader from "dataloader";

const PRICES_ENDPOINT = `http://localhost:3000/api/prices`;

export class PricesService {
  private priceDataLoader = new DataLoader<number, number>(
    async (ids: number[]) =>
      ids.length === 1
        ? [
            await fetch(`${PRICES_ENDPOINT}/${ids[0]}`).then((res) =>
              res.json()
            ),
          ]
        : this.getByIds(ids)
  );

  async getById(id: number): Promise<number> {
    return this.priceDataLoader.load(id);
  }

  async getByIds(ids: number[]): Promise<number[]> {
    return fetch(`${PRICES_ENDPOINT}?ids=${ids.join(",")}`).then((res) =>
      res.json()
    );
  }
}

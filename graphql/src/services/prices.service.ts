import fetch from "node-fetch";

export class PricesService {
  async getById(id: number): Promise<number> {
    return fetch(`http://localhost:3000/api/prices/${id}`).then((res) =>
      res.json()
    );
  }
}

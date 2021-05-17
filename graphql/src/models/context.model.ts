import { ItemsService } from "../services/items.service";
import { PricesService } from "../services/prices.service";

export interface ServerContext {
  itemsService: ItemsService;
  pricesService: PricesService;
}

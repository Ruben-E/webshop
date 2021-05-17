import { ItemsService } from "../services/items.service";

export interface ServerContext {
  itemsService: ItemsService;
}

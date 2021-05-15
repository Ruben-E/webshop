import { ItemsService } from "../services/items.service";
import { PricesService } from "../services/prices.service";
import { CartService } from "../services/cart.service";
import { CategoriesService } from "../services/categories.service";

export interface ServerContext {
  itemsService: ItemsService;
  pricesService: PricesService;
  cartService: CartService;
  categoriesService: CategoriesService;
}

import { Category } from "@webshop/models";
import { useRemoteGet } from "../remote-get/remote-get.hook";
import { environment } from "@webshop/config";

export const useRemoteCategories = () =>
  useRemoteGet<Category[]>(environment.categoriesApi);

import { Category } from "@webshop/models";
import { useRemoteGet } from "../remote-get/remote-get.hook";
import { environment } from "@webshop/config";

export const useRemoteGetCategories = () =>
  useRemoteGet<Category[]>(environment.categoriesApi);

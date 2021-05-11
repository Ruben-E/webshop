import { NavigationModel } from "@webshop/models";

export const NAVIGATION: NavigationModel = [
  {
    type: "text",
    text: "Home",
    url: "/",
  },
  {
    type: "text",
    text: "Categories",
    url: "/categories",
  },
  {
    type: "icon",
    icon: "shopping-cart",
    url: "/cart",
  },
  {
    type: "icon",
    icon: "user",
    url: "/user",
  },
];

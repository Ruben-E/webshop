import React from "react";
import { CategoriesPage } from "@webshop/pages";
import { useRemoteGetCategories } from "@webshop/hooks";

export default function Categories() {
  const categoriesState = useRemoteGetCategories();

  return <CategoriesPage categoriesState={categoriesState} />;
}

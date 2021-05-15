import React from "react";
import { CategoriesPage } from "@webshop/pages";
import { useCategoryTitlesQuery } from "@webshop/graphql";

export default function Categories() {
  const categoriesState = useCategoryTitlesQuery();

  return (
    <CategoriesPage
      categoriesState={{
        ...categoriesState,
        data: categoriesState.data?.categories,
      }}
    />
  );
}

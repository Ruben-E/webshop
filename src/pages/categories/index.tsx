import React from "react";
import { Categories } from "@webshop/pages";
import { useRemoteCategories } from "@webshop/hooks";

export default function Index() {
  const categoriesState = useRemoteCategories();

  return <Categories categoriesState={categoriesState} />;
}

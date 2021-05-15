import React, { useEffect, useState } from "react";
import { CategoriesPage } from "@webshop/pages";
import { getCategoriesRequest } from "@webshop/requests";
import { Category, RequestState } from "@webshop/models";

export default function Categories() {
  const [categoriesState, setCategoriesState] = useState<
    RequestState<Category[]>
  >({ loading: true });

  useEffect(() => {
    (async () => {
      try {
        const categories = await getCategoriesRequest();
        setCategoriesState({
          loading: false,
          data: categories.map((title: string) => ({ title })),
        });
      } catch (error) {
        setCategoriesState({
          loading: false,
          error,
        });
      }
    })();
  }, []);

  return <CategoriesPage categoriesState={categoriesState} />;
}

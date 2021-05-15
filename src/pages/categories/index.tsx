import React from "react";
import { CategoriesPage } from "@webshop/pages";
import { gql, useQuery } from "@apollo/client";
import { GQLCategory } from "@webshop/graphql";

const CATEGORIES = gql`
  query Categories {
    categories {
      title
    }
  }
`;

export default function Categories() {
  const categoriesState = useQuery<
    Record<"categories", Pick<GQLCategory, "title">[]>
  >(CATEGORIES);

  return (
    <CategoriesPage
      categoriesState={{
        ...categoriesState,
        data: categoriesState.data?.categories,
      }}
    />
  );
}

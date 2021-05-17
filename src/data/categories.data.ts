// https://fakestoreapi.com/products/categories

export const CATEGORIES = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

export const NORMALIZED_CATEGORIES: Record<string, string> = CATEGORIES.reduce(
  (acc, category) => ({
    ...acc,
    [category]: category,
  }),
  {}
);

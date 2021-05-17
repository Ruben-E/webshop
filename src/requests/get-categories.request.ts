export const getCategoriesRequest = () =>
  fetch(`/api/items/categories`).then((res) => res.json());

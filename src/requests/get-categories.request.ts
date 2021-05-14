export const getCategoriesRequest = () =>
  fetch(`https://fakestoreapi.com/products/categories`).then((res) =>
    res.json()
  );

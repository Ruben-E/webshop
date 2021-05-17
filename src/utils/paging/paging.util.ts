import { Paged } from "@webshop/models";

export const paginate = <T>(
  collection: T[],
  page: number,
  size: number
): Paged<T> => ({
  content: collection.splice(page * size, size),
  page,
  size,
  totalResults: collection.length,
});

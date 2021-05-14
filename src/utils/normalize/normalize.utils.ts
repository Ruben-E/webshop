export interface Normalized<T extends { id: string | number }> {
  [id: string]: T;
}

export const normalize = <T extends { id: string | number }>(
  collection: T[]
): Normalized<T> =>
  collection.reduce(
    (acc, value) => ({
      ...acc,
      [value.id.toString()]: value,
    }),
    {}
  );

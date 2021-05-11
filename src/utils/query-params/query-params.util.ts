export const toQueryParams = (o: Object): string => {
  const keyValuePairs: string[][] = (Object.keys(o) as (keyof Object)[])
    .filter((key) => o[key] !== undefined)
    .reduce((acc, key) => [...acc, [key, o[key].toString()]], [] as string[][]);

  return keyValuePairs.length > 0
    ? `?${new URLSearchParams(keyValuePairs)}`
    : ``;
};

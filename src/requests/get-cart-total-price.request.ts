export const getCartTotalPriceRequest = (): Promise<string> =>
  fetch("/api/cart/total-price").then((res) => res.json());

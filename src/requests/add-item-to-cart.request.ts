export const addItemToCartRequest = (
  id: number,
  quantity: number
): Promise<Response> =>
  fetch("/api/cart", {
    method: "POST",
    body: JSON.stringify({
      id,
      quantity,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

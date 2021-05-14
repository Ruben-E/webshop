export const removeCartItemRequest = (id: number): Promise<Response> =>
  fetch(`/api/cart/${id}`, {
    method: "DELETE",
  });

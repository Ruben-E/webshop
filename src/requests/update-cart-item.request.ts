interface RemoveCartItemRequestParams {
  id: number;
  quantity: number;
}

export const updateCartItemRequest = (
  data: RemoveCartItemRequestParams
): Promise<Response> =>
  fetch(`/api/cart/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

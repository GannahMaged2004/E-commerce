//src app lib => orders-api.ts

import { api } from "./api";
export const createCashOrder = (
  cartId: string,
  shippingAddress: { details: string; phone: string; city: string }
) =>
  api<{ data: any }>(`/orders/${cartId}`, {
    method: "POST",
    auth: true,
    body: JSON.stringify({ shippingAddress }),
  });

export const createCheckoutSession = (cartId: string, origin: string) =>
  api<{ session: { url: string } }>(
    `/orders/checkout-session/${cartId}?url=${encodeURIComponent(origin)}`,
    { method: "GET", auth: true }
  );

export const getUserOrders = (userId: string) =>
  api<{ data: any[] }>(`/orders/user/${userId}`, { auth: true });

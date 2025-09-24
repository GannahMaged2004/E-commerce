import { api } from "./api";
export type ShippingAddress = { details: string; phone: string; city: string };

export type CashOrderResponse = {
  status: string;
  data?: any;
  message?: string;
};

export type CheckoutSessionResponse =
  | { session: { id?: string; url?: string } }
  | { url?: string } 
  | any;

export async function createCashOrder(cartId: string, addr: ShippingAddress) {
  if (!cartId) throw new Error("Missing cartId");
  return api<CashOrderResponse>(`/api/v1/orders/${cartId}`, {
    method: "POST",
    auth: true,
    body: JSON.stringify({ shippingAddress: addr }),
  });
}

export async function createCheckoutSession(cartId: string, origin: string) {
  if (!cartId) throw new Error("Missing cartId");
  if (!origin) throw new Error("Missing origin");
  const res = await api<CheckoutSessionResponse>(
    `/api/v1/orders/checkout-session/${cartId}?url=${encodeURIComponent(origin)}`,
    { method: "POST", auth: true }
  );

  const url =
    (res as any)?.session?.url ??
    (res as any)?.url ??
    (typeof res === "string" ? res : undefined);

  if (!url) {
    throw new Error("Checkout session did not return a URL.");
  }

  return { url };
}
import { api } from "./api";

export type CartItem = {
  _id: string; // cart line id
  product: { _id: string; title: string; imageCover: string; price: number };
  count: number;
  price: number;
};
export type CartResponse = {
  status: string;
  numOfCartItems: number;
  data: { _id: string; cartOwner: string; totalCartPrice: number; products: CartItem[] };
};

// alias used by your page
export type CartRes = CartResponse;

export function addToCart(productId: string) {
  return api<CartResponse>("/api/v1/cart", {
    method: "POST",
    body: JSON.stringify({ productId }),
    auth: true,
  });
}

export function getCart() {
  return api<CartResponse>("/api/v1/cart", { auth: true });
}

export function updateCartItem(itemId: string, count: number) {
  return api<CartResponse>(`/api/v1/cart/${itemId}`, {
    method: "PUT",
    body: JSON.stringify({ count }),
    auth: true,
  });
}

export function removeCartItem(itemId: string) {
  return api<CartResponse>(`/api/v1/cart/${itemId}`, {
    method: "DELETE",
    auth: true,
  });
}

export function clearCart() {
  return api<{ message: string }>("/api/v1/cart", { method: "DELETE", auth: true });
}

// ✅ add this (your Cart page imports it)
export function applyCoupon(coupon: string) {
  return api<CartResponse>("/api/v1/cart/applyCoupon", {
    method: "PUT",
    body: JSON.stringify({ coupon }),
    auth: true,
  });
}

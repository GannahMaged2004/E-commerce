//src app lib => wishlist-api.ts

import { api } from "./api";
export type WishlistRes = { data: Array<{ _id: string }> };

export function addToWishlist(productId: string) {
  return api<WishlistRes>("/api/v1/wishlist", {
    method: "POST",
    body: JSON.stringify({ productId }),
    auth: true,
  });
}
export function removeFromWishlist(productId: string) {
  return api<WishlistRes>(`/api/v1/wishlist/${productId}`, {
    method: "DELETE",
    auth: true,
  });
}
export function getWishlist() {
  return api<WishlistRes>("/api/v1/wishlist", { auth: true });
}

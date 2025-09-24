import { api } from "./api";
export type CartItem = {
  _id: string; 
  product: { _id: string; title: string; imageCover: string; price: number };
  count: number;
  price: number;
};

export type CartResponse = {
  status: string;
  numOfCartItems: number;
  data: { _id: string; cartOwner: string; totalCartPrice: number; products: CartItem[] };
};

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

export async function updateCartItem(lineOrProdId: string, count: number, productId?: string) {
  const tryOnce = (id: string) =>
    api<CartResponse>(`/api/v1/cart/${id}`, {
      method: "PUT",
      body: JSON.stringify({ count }),
      auth: true,
      acceptEmpty: true,
    });

  try {
    const res = await tryOnce(lineOrProdId);
    return res ?? (await getCart());
  } catch {
    if (productId && productId !== lineOrProdId) {
      const res = await tryOnce(productId);
      return res ?? (await getCart());
    }
    return getCart();
  }
}

export async function removeCartItemStrict(productId: string, lineId?: string) {
  const tryDelete = (id: string) =>
    api<CartResponse>(`/api/v1/cart/${id}`, {
      method: "DELETE",
      auth: true,
      acceptEmpty: true,
    });

  const refetch = () => getCart();

  try {
    const res = await tryDelete(productId);
    return res ?? (await refetch());
  } catch {
    if (lineId && lineId !== productId) {
      try {
        const res = await tryDelete(lineId);
        return res ?? (await refetch());
      } catch (e) {
        throw e;
      }
    }
    throw new Error("Delete failed for both productId and lineId.");
  }
}

export async function removeCartItem(lineOrProdId: string, productId?: string) {
  const tryOnce = (id: string) =>
    api<CartResponse>(`/api/v1/cart/${id}`, {
      method: "DELETE",
      auth: true,
      acceptEmpty: true,
    });

  try {
    const res = await tryOnce(lineOrProdId);
    return res ?? (await getCart());
  } catch {
    if (productId && productId !== lineOrProdId) {
      const res = await tryOnce(productId);
      return res ?? (await getCart());
    }
    return getCart();
  }
}

export function clearCart() {
  return api<{ message: string }>("/api/v1/cart", { method: "DELETE", auth: true });
}

export function applyCoupon(coupon: string) {
  return api<CartResponse>("/api/v1/cart/applyCoupon", {
    method: "PUT",
    body: JSON.stringify({ coupon }),
    auth: true,
  });
}
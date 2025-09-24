// src app cart => page.tsx
"use client";

import { useEffect, useState } from "react";
import { getCart, updateCartItem, removeCartItem, applyCoupon, type CartItem, type CartRes } from "@/app/lib/cart-api";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState<CartRes | null>(null);
  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try { setCart(await getCart()); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const changeQty = async (it: CartItem, delta: number) => {
    const next = Math.max(1, it.count + delta);
    setCart(c => c && ({ ...c, data: { ...c.data, products: c.data.products.map(p => p._id === it._id ? { ...p, count: next } : p) } }));
    try { setCart(await updateCartItem(it._id, next)); } catch { load(); }
  };
  const remove = async (it: CartItem) => {
    setCart(c => c && ({ ...c, data: { ...c.data, products: c.data.products.filter(p => p._id !== it._id) } }));
    try { setCart(await removeCartItem(it._id)); } catch { load(); }
  };
  const apply = async () => {
    try { setCart(await applyCoupon(coupon)); setCoupon(""); } catch (e: any) { alert(e?.message || "Coupon failed"); }
  };

  const total = cart?.data?.totalCartPrice ?? 0;

  return (
    <section className="container py-10">
      <nav className="mb-6 text-sm text-neutral-400">
        <Link href="/" className="hover:text-neutral-700">Home</Link> <span>/</span> <span className="text-neutral-700">Cart</span>
      </nav>

      {loading ? <div>Loading…</div> : cart?.data?.products?.length ? (
        <>
          <div className="rounded-md border border-neutral-100 bg-white">
            {cart.data.products.map((it) => (
              <div key={it._id} className="grid grid-cols-[1fr,80px,120px,100px] items-center gap-4 border-b border-neutral-100 px-4 py-4 sm:grid-cols-[1fr,100px,160px,100px]">
                <div className="flex items-center gap-3">
                  <div className="relative h-16 w-16 overflow-hidden rounded bg-neutral-50">
                    <Image src={it.product.imageCover} alt={it.product.title} fill className="object-contain" />
                  </div>
                  <div className="text-sm">{it.product.title}</div>
                </div>
                <div className="text-sm">${it.price}</div>
                <div className="inline-flex items-center rounded border">
                  <button className="px-3 py-1" onClick={() => changeQty(it, -1)}>-</button>
                  <span className="w-10 text-center text-sm">{it.count}</span>
                  <button className="px-3 py-1" onClick={() => changeQty(it, +1)}>+</button>
                </div>
                <div className="text-right">
                  <button className="text-sm text-red-600 hover:underline" onClick={() => remove(it)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[1fr,320px]">
            <div className="flex items-center gap-3">
              <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Coupon code" className="h-11 w-56 rounded border px-3 text-sm" />
              <button onClick={apply} className="h-11 rounded bg-red-600 px-4 text-sm text-white">Apply Coupon</button>
            </div>

            <div className="rounded-md border border-neutral-100 bg-white p-4">
              <div className="mb-2 text-sm">Cart Total</div>
              <div className="flex justify-between text-sm"><span>Subtotal</span><span>${total}</span></div>
              <div className="flex justify-between text-sm"><span>Shipping</span><span>Free</span></div>
              <hr className="my-3" />
              <div className="flex justify-between font-semibold"><span>Total</span><span>${total}</span></div>
              <Link href="/checkout" className="mt-4 block rounded bg-neutral-900 px-5 py-3 text-center text-white hover:bg-neutral-700">Proceed to checkout</Link>
            </div>
          </div>
        </>
      ) : (
        <div className="rounded-md border border-neutral-100 bg-white p-8 text-center">Your cart is empty.</div>
      )}
    </section>
  );
}

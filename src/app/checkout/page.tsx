// src/app/checkout/page.tsx
"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { getCart } from "@/app/lib/cart-api";
import { createCashOrder, createCheckoutSession } from "@/app/lib/orders-api";

export default function CheckoutPage() {
  const [cart, setCart] = useState<Awaited<ReturnType<typeof getCart>> | null>(null);
  const [loading, setLoading] = useState(true);
  const [addr, setAddr] = useState({ details: "", phone: "", city: "" });
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    (async () => {
      try { setCart(await getCart()); } finally { setLoading(false); }
    })();
  }, []);

  if (loading) return <section className="container py-10">Loading…</section>;
  if (!cart?.data?.products?.length) return (
    <section className="container py-10">
      <div className="rounded border bg-white p-6">Your cart is empty. <Link href="/products" className="text-brand-600">Shop products</Link></div>
    </section>
  );

  const total = cart.data.totalCartPrice;

  async function payCash(e: FormEvent) {
    e.preventDefault();
    setPlacing(true);
    try {
      await createCashOrder(cart.data._id, addr);
      alert("Order placed ✅");
      location.href = "/"; // or /orders
    } catch (e: any) {
      alert(e?.message || "Could not place order");
    } finally {
      setPlacing(false);
    }
  }

  async function payCard() {
    try {
      const origin = window.location.origin;
      const { session } = await createCheckoutSession(cart.data._id, origin);
      window.location.href = session.url;
    } catch (e: any) {
      alert(e?.message || "Checkout failed");
    }
  }

  return (
    <section className="container py-10 grid gap-8 lg:grid-cols-[1fr,360px]">
      <form onSubmit={payCash} className="rounded-md border border-neutral-100 bg-white p-6">
        <h1 className="text-lg font-semibold mb-4">Shipping address</h1>
        <div className="grid gap-4">
          <input className="h-11 rounded border px-3 text-sm" placeholder="Address details" required
                 value={addr.details} onChange={(e) => setAddr({ ...addr, details: e.target.value })}/>
          <input className="h-11 rounded border px-3 text-sm" placeholder="Phone" required
                 value={addr.phone} onChange={(e) => setAddr({ ...addr, phone: e.target.value })}/>
          <input className="h-11 rounded border px-3 text-sm" placeholder="City" required
                 value={addr.city} onChange={(e) => setAddr({ ...addr, city: e.target.value })}/>
        </div>
        <div className="mt-6 flex gap-3">
          <button disabled={placing} className="rounded bg-neutral-900 px-5 py-3 text-white hover:bg-neutral-700">
            {placing ? "Placing…" : "Place Cash Order"}
          </button>
          <button type="button" onClick={payCard} className="rounded border px-5 py-3">Pay with Card</button>
        </div>
      </form>

      <div className="rounded-md border border-neutral-100 bg-white p-6">
        <div className="mb-2 text-sm">Order Summary</div>
        <div className="flex justify-between text-sm"><span>Subtotal</span><span>${total}</span></div>
        <div className="flex justify-between text-sm"><span>Shipping</span><span>Free</span></div>
        <hr className="my-3" />
        <div className="flex justify-between font-semibold"><span>Total</span><span>${total}</span></div>
      </div>
    </section>
  );
}

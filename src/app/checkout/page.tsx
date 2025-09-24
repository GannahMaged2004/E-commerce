"use client";

import { useEffect, useMemo, useState, FormEvent } from "react";
import Link from "next/link";
import { getCart } from "@/app/lib/cart-api";
import { createCashOrder, createCheckoutSession } from "@/app/lib/orders-api";

type Addr = { details: string; phone: string; city: string };

const fmt = new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" });

export default function CheckoutPage() {
  const [cart, setCart] = useState<Awaited<ReturnType<typeof getCart>> | null>(null);
  const [loading, setLoading] = useState(true);
  const [addr, setAddr] = useState<Addr>({ details: "", phone: "", city: "" });
  const [placing, setPlacing] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const c = await getCart();
        setCart(c);
      } catch (e: any) {
        setErr(e?.message || "Failed to load cart.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const items = cart?.data?.products ?? [];
  const total = useMemo(() => cart?.data?.totalCartPrice ?? 0, [cart]);

  if (loading) {
    return <section className="container py-10">Loading ⟳</section>;
  }

  if (err) {
    return (
      <section className="container py-10">
        <div className="rounded border border-red-200 bg-red-50 p-6 text-red-700">{err}</div>
        <Link href="/cart" className="mt-4 inline-block text-brand-600 underline">Back to cart</Link>
      </section>
    );
  }

  if (!items.length) {
    return (
      <section className="container py-10">
        <div className="rounded border bg-white p-6">
          Your cart is empty.{" "}
          <Link href="/products" className="text-brand-600 underline">Shop products</Link>
        </div>
      </section>
    );
  }

  async function payCash(e: FormEvent) {
    e.preventDefault();
    if (!cart?.data?._id) return;
    setPlacing(true);
    try {
      await createCashOrder(cart.data._id, addr);
      alert("Order placed ✅");
      location.href = "/orders";
    } catch (e: any) {
      alert(e?.message || "Could not place order");
    } finally {
      setPlacing(false);
    }
  }

  async function payCard() {
    if (!cart?.data?._id) return;
    setRedirecting(true);
    try {
      const origin = window.location.origin;
      const { url } = await createCheckoutSession(cart.data._id, origin);
      if (!url) throw new Error("No checkout URL returned from server.");
      window.location.href = url;
    } catch (e: any) {
      setRedirecting(false);
      alert(e?.message || "Checkout failed");
    }
  }

  return (
    <section className="container py-10 grid gap-8 lg:grid-cols-[1fr,360px]">
      <form onSubmit={payCash} className="rounded-md border border-neutral-100 bg-white p-6">
        <h1 className="mb-4 text-lg font-semibold">Shipping address</h1>
        <div className="grid gap-4">
          <input
            className="h-11 rounded border px-3 text-sm"
            placeholder="Address details"
            required
            value={addr.details}
            onChange={(e) => setAddr((a) => ({ ...a, details: e.target.value }))}
          />
          <input
            className="h-11 rounded border px-3 text-sm"
            placeholder="Phone"
            required
            value={addr.phone}
            onChange={(e) => setAddr((a) => ({ ...a, phone: e.target.value }))}
          />
          <input
            className="h-11 rounded border px-3 text-sm"
            placeholder="City"
            required
            value={addr.city}
            onChange={(e) => setAddr((a) => ({ ...a, city: e.target.value }))}
          />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            disabled={placing}
            className="rounded bg-neutral-900 px-5 py-3 text-white hover:bg-neutral-700 disabled:opacity-60"
          >
            {placing ? "Placing ⟳" : "Place Cash Order"}
          </button>
          <button
            type="button"
            onClick={payCard}
            disabled={redirecting}
            className="rounded border px-5 py-3 disabled:opacity-60"
          >
            {redirecting ? "Redirecting ⟳" : "Pay with Card"}
          </button>
          <Link
            href="/cart"
            className="rounded border px-5 py-3 hover:bg-neutral-50"
          >
            Back to cart
          </Link>
        </div>
      </form>

      <div className="rounded-md border border-neutral-100 bg-white p-6">
        <div className="mb-2 text-sm">Order Summary</div>
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>{fmt.format(total)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <hr className="my-3" />
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>{fmt.format(total)}</span>
        </div>
      </div>
    </section>
  );
}

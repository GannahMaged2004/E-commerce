"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  getCart,
  updateCartItem,
  removeCartItemStrict,
  clearCart as apiClearCart,
  applyCoupon,
  type CartItem,
  type CartRes,
} from "@/app/lib/cart-api";

/* ---------- SAFE NUM HELPERS ---------- */
const num = (v: any, d = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : d;
};

// derive unit price robustly even if backend sends strings/missing fields
const unitPriceOf = (it: CartItem) => {
  const unitFromProduct = num(it?.product?.price);
  if (unitFromProduct) return unitFromProduct;

  const cnt = num(it?.count, 1);
  const fromLine = num((it as any)?.price) / (cnt || 1);
  if (fromLine) return fromLine;

  return 0;
};

// robust line total (prefers explicit line price if valid)
const lineTotalOf = (it: CartItem) => {
  const direct = num((it as any)?.price);
  if (direct) return direct;
  return unitPriceOf(it) * num(it?.count, 1);
};

const totalOf = (list: CartItem[]) => list.reduce((s, it) => s + lineTotalOf(it), 0);
const fmt = new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" });
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

export default function CartPage() {
  const [cart, setCart] = useState<CartRes | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [coupon, setCoupon] = useState("");
  const [busyIds, setBusyIds] = useState<Record<string, boolean>>({});
  const [qtyDraft, setQtyDraft] = useState<Record<string, number>>({});
  const applyingRef = useRef(false);
  const clearingRef = useRef(false);

  const items = cart?.data?.products ?? [];
  const computedTotal = useMemo(() => totalOf(items), [items]);
  const serverTotal = num(cart?.data?.totalCartPrice, computedTotal);

  const syncDraftsFrom = (c: CartRes | null) => {
    const drafts: Record<string, number> = {};
    c?.data?.products?.forEach((p) => (drafts[p._id] = p.count));
    setQtyDraft(drafts);
  };

  const load = async () => {
    setLoading(true);
    setErr(null);
    try {
      const res = await getCart();
      setCart(res);
      syncDraftsFrom(res);
    } catch (e: any) {
      setErr(e?.message || "Failed to load cart.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const changeQty = async (it: CartItem, nextCount: number) => {
    const next = clamp(nextCount, 1, 99);
    const unit = unitPriceOf(it);
    const patchedLine = unit * next;

    // optimistic
    setBusyIds((b) => ({ ...b, [it._id]: true }));
    setQtyDraft((d) => ({ ...d, [it._id]: next }));
    setCart((c) =>
      c && {
        ...c,
        data: {
          ...c.data,
          products: c.data.products.map((p) =>
            p._id === it._id ? { ...p, count: next, price: patchedLine } : p
          ),
          totalCartPrice: totalOf(
            c.data.products.map((p) =>
              p._id === it._id ? { ...p, count: next, price: patchedLine } : p
            )
          ),
        },
      }
    );

    try {
      const fresh = await updateCartItem(it._id, next, it.product?._id);
      setCart(fresh);
      syncDraftsFrom(fresh);
    } catch (e) {
      await load(); // rollback if API failed
      alert((e as any)?.message || "Failed to update item.");
    } finally {
      setBusyIds((b) => ({ ...b, [it._id]: false }));
    }
  };

  const remove = async (it: CartItem) => {
    setBusyIds((b) => ({ ...b, [it._id]: true }));

    // optimistic remove
    setCart((c) =>
      c && {
        ...c,
        data: {
          ...c.data,
          products: c.data.products.filter((p) => p._id !== it._id),
          totalCartPrice: totalOf(c.data.products.filter((p) => p._id !== it._id)),
        },
      }
    );

    try {
      // Product-first strict delete (no silent restore)
      const fresh = await removeCartItemStrict(it.product._id, it._id);

      const stillThere = !!fresh?.data?.products?.some(
        (p) => p._id === it._id || p.product?._id === it.product._id
      );

      if (stillThere) {
        // try the alternate id explicitly once more
        const alt = await removeCartItemStrict(it._id, it.product._id);
        const stillThereAlt = !!alt?.data?.products?.some(
          (p) => p._id === it._id || p.product?._id === it.product._id
        );
        if (stillThereAlt) {
          // keep optimistic removal but warn
          alert(
            "The server responded with a cart that still includes the item. Confirm your DELETE route expects productId vs lineId."
          );
        } else {
          setCart(alt);
        }
      } else {
        setCart(fresh);
      }

      setQtyDraft((d) => {
        const nd = { ...d };
        delete nd[it._id];
        return nd;
      });
    } catch (e: any) {
      await load(); // rollback
      alert(e?.message || "Failed to remove item.");
    } finally {
      setBusyIds((b) => ({ ...b, [it._id]: false }));
    }
  };

  /* ---------- clear cart ---------- */
  const clearCart = async () => {
    if (clearingRef.current || !items.length) return;
    if (!confirm("Clear all items from cart?")) return;
    clearingRef.current = true;

    const prev = cart;
    setCart((c) => (c ? { ...c, data: { ...c.data, products: [], totalCartPrice: 0 } } : c));
    try {
      await apiClearCart();
      setQtyDraft({});
    } catch (e) {
      setCart(prev ?? null); // rollback
      alert((e as any)?.message || "Failed to clear cart.");
    } finally {
      clearingRef.current = false;
    }
  };

  /* ---------- coupons ---------- */
  const apply = async () => {
    if (applyingRef.current) return;
    const code = coupon.trim();
    if (!code) return;

    applyingRef.current = true;
    try {
      const fresh = await applyCoupon(code);
      setCart(fresh);
      setCoupon("");
      syncDraftsFrom(fresh);
    } catch (e: any) {
      alert(e?.message || "Coupon failed.");
    } finally {
      applyingRef.current = false;
    }
  };

  /* ---------- UI ---------- */
  if (loading) {
    return (
      <section className="container py-10">
        <div className="mb-6 h-4 w-28 animate-pulse rounded bg-neutral-200" />
        <div className="rounded-md border border-neutral-100 bg-white p-6">
          <div className="mb-3 h-6 w-1/2 animate-pulse rounded bg-neutral-200" />
          <div className="grid gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="grid grid-cols-[1fr,80px,120px,100px] items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-16 w-16 overflow-hidden rounded bg-neutral-100" />
                  <div className="h-4 w-40 animate-pulse rounded bg-neutral-200" />
                </div>
                <div className="h-4 w-12 animate-pulse rounded bg-neutral-200" />
                <div className="h-8 w-28 animate-pulse rounded bg-neutral-200" />
                <div className="h-4 w-10 animate-pulse rounded bg-neutral-200" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (err) {
    return (
      <section className="container py-10">
        <nav className="mb-6 text-sm text-neutral-400">
          <Link href="/" className="hover:text-neutral-700">Home</Link> <span>/</span>{" "}
          <span className="text-neutral-700">Cart</span>
        </nav>
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700">{err}</div>
        <button onClick={load} className="mt-4 rounded bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-700">
          Retry
        </button>
      </section>
    );
  }

  return (
    <section className="container py-10">
      <nav className="mb-6 text-sm text-neutral-400">
        <Link href="/" className="hover:text-neutral-700">Home</Link> <span>/</span>{" "}
        <span className="text-neutral-700">Cart</span>
      </nav>

      {items.length ? (
        <>
          <div className="rounded-md border border-neutral-100 bg-white">
            {items.map((it) => {
              const busy = !!busyIds[it._id];
              const img = it.product.imageCover || "/placeholder.png";
              const unit = unitPriceOf(it);
              const line = lineTotalOf(it);
              const value = qtyDraft[it._id] ?? it.count;

              return (
                <div
                  key={it._id}
                  className="grid grid-cols-[1fr,100px,160px,100px] items-center gap-4 border-b border-neutral-100 px-4 py-4 sm:grid-cols-[1fr,120px,180px,100px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative h-16 w-16 overflow-hidden rounded bg-neutral-50">
                      <Image src={img} alt={it.product.title} fill className="object-contain" />
                    </div>
                    <div className="text-sm">
                      <div className="line-clamp-2">{it.product.title}</div>
                      <div className="mt-1 text-xs text-neutral-500">Unit: {fmt.format(unit)}</div>
                    </div>
                  </div>

                  <div className="text-sm">{fmt.format(line)}</div>

                  <div className="inline-flex items-center overflow-hidden rounded border">
                    <button
                      className="px-3 py-1 disabled:opacity-50"
                      onClick={() => changeQty(it, value - 1)}
                      disabled={busy || value <= 1}
                      aria-label="Decrease quantity"
                    >
                      –
                    </button>
                    <input
                      className="w-12 border-x px-2 py-1 text-center text-sm outline-none"
                      inputMode="numeric"
                      value={value}
                      onChange={(e) => {
                        const v = Number(e.target.value.replace(/\D/g, ""));
                        setQtyDraft((d) => ({ ...d, [it._id]: v || 0 }));
                      }}
                      onBlur={(e) => {
                        const parsed = Number(String(e.target.value).replace(/\D/g, ""));
                        const v = clamp(parsed || it.count, 1, 99);
                        if (v !== it.count) changeQty(it, v);
                        else setQtyDraft((d) => ({ ...d, [it._id]: it.count }));
                      }}
                    />
                    <button
                      className="px-3 py-1 disabled:opacity-50"
                      onClick={() => changeQty(it, value + 1)}
                      disabled={busy}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <button
                      className="text-sm text-red-600 hover:underline disabled:opacity-50"
                      onClick={() => remove(it)}
                      disabled={busy}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[1fr,360px]">
            <div className="flex flex-wrap items-center gap-3">
              <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Coupon code"
                className="h-11 w-56 rounded border px-3 text-sm"
                aria-label="Coupon code"
              />
              <button
                onClick={apply}
                className="h-11 rounded bg-red-600 px-4 text-sm text-white disabled:opacity-50"
                disabled={!coupon.trim()}
              >
                Apply Coupon
              </button>

              <button
                onClick={clearCart}
                className="h-11 rounded border px-4 text-sm hover:bg-neutral-50 disabled:opacity-50"
                disabled={!items.length}
              >
                Clear Cart
              </button>
            </div>

            <aside className="rounded-md border border-neutral-100 bg-white p-4">
              <div className="mb-2 text-sm">Cart Total</div>
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{fmt.format(computedTotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{fmt.format(serverTotal || computedTotal)}</span>
              </div>
              <Link
                href="/checkout"
                className="mt-4 block rounded bg-neutral-900 px-5 py-3 text-center text-white hover:bg-neutral-700"
              >
                Proceed to checkout
              </Link>
            </aside>
          </div>
        </>
      ) : (
        <div className="rounded-md border border-neutral-100 bg-white p-8 text-center">
          <p className="mb-3 text-lg">Your cart is empty.</p>
          <Link href="/products" className="rounded bg-neutral-900 px-5 py-3 text-white hover:bg-neutral-700">
            Browse products
          </Link>
        </div>
      )}
    </section>
  );
}

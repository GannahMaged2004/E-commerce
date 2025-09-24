//src app wishlist => page.tsx
"use client";

import { useEffect, useState } from "react";
import { getWishlist, removeFromWishlist } from "@/app/lib/wishlist-api";
import { addToCart } from "@/app/lib/cart-api";
import Image from "next/image";
import Link from "next/link";

type Item = { _id: string; title: string; imageCover: string; price: number };

export default function WishlistPage() {
  const [items, setItems] = useState<Item[]>([]);
  const load = async () => {
    const res = await getWishlist();
    setItems((res.data as any[]) as Item[]);
  };
  useEffect(() => { load(); }, []);

  const moveToBag = async (id: string) => {
    await addToCart(id);
    await removeFromWishlist(id);
    setItems(x => x.filter(i => i._id !== id));
  };

  return (
    <section className="container py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Wishlist ({items.length})</h1>
        {items.length > 0 && (
          <button
            className="rounded border px-3 py-2 text-sm"
            onClick={async () => {
              for (const it of items) await addToCart(it._id);
              setItems([]);
            }}
          >
            Move All To Bag
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="rounded-md border border-neutral-100 bg-white p-8 text-center">Your wishlist is empty.</div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <div key={p._id} className="rounded-md border border-neutral-100 bg-white p-3">
              <Link href={`/products/${p._id}`} className="block">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded bg-neutral-50">
                  <Image src={p.imageCover} alt={p.title} fill className="object-contain" />
                </div>
                <div className="mt-2 text-sm">{p.title}</div>
                <div className="text-sm font-semibold">${p.price}</div>
              </Link>
              <div className="mt-3 flex gap-2">
                <button onClick={() => moveToBag(p._id)} className="flex-1 rounded bg-neutral-900 px-3 py-2 text-xs text-white hover:bg-neutral-700">
                  Add To Cart
                </button>
                <button onClick={async () => { await removeFromWishlist(p._id); setItems(x => x.filter(i => i._id !== p._id)); }} className="rounded border px-3 py-2 text-xs">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* “Just for you” (re-use your Explore grid) */}
      <div className="mt-12 flex items-center gap-2">
        <span className="inline-block h-6 w-1 rounded bg-red-600" />
        <h2 className="text-lg font-semibold">Just For You</h2>
      </div>
      {/* Drop your existing Explore section component here */}
    </section>
  );
}

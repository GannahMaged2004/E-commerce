//src app products [id] => WishlistButton.tsx

"use client";

import { useState, useTransition } from "react";
import { addToWishlist, removeFromWishlist } from "@/app/lib/wishlist-api";

export default function WishlistButton({ productId }: { productId: string }) {
  const [wish, setWish] = useState(false);
  const [pending, start] = useTransition();

  const toggle = () =>
    start(async () => {
      try {
        if (wish) { await removeFromWishlist(productId); setWish(false); }
        else { await addToWishlist(productId); setWish(true); }
      } catch (e:any) {
        alert(e?.message || "Wishlist failed");
      }
    });

  return (
    <button
      onClick={toggle}
      disabled={pending}
      className="inline-flex items-center justify-center rounded-md border border-neutral-300 px-4 py-3 text-sm text-neutral-700 hover:bg-neutral-50 disabled:opacity-60"
    >
      {wish ? "♥ In wishlist" : "♡ Add to wishlist"}
    </button>
  );
}

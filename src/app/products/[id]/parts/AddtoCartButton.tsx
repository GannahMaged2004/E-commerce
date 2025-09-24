//src app products [id] => AddtoCartButton.tsx
"use client";

import { useTransition } from "react";
import { addToCart } from "@/app/lib/cart-api";

export default function AddToCartButton({ productId }: { productId: string }) {
  const [pending, start] = useTransition();

  return (
    <button
      onClick={() => start(async () => {
        try { await addToCart(productId); alert("Added to cart ✅"); }
        catch (e:any){ alert(e?.message || "Could not add to cart"); }
      })}
      disabled={pending}
      className="inline-flex items-center justify-center rounded-md bg-brand-600 px-6 py-3 text-white hover:bg-brand-700 disabled:opacity-60"
    >
      {pending ? "Adding..." : "Buy Now"}
    </button>
  );
}

"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Product } from "@/app/lib/products-api";
import { addToCart } from "@/app/lib/cart-api";
import { addToWishlist, removeFromWishlist } from "@/app/lib/wishlist-api";

export default function ProductCard({ p }: { p: Product }) {
  const router = useRouter();
  const price = p.priceAfterDiscount ?? p.price;
  const old = p.priceAfterDiscount ? p.price : undefined;

  const [imgSrc, setImgSrc] = useState<string>(p.imageCover || "/placeholder.png");
  const [adding, setAdding] = useState(false);
  const [wish, setWish] = useState(false);

  const ensureAuthed = () => {
    if (typeof window === "undefined") return false;
    if (!localStorage.getItem("token")) {
      router.push("/login");
      return false;
    }
    return true;
  };

  async function onAddToCart() {
    if (!ensureAuthed()) return;
    try {
      setAdding(true);
      await addToCart(p._id);
    } catch (e: any) {
      alert(e?.message || "Could not add to cart");
    } finally {
      setAdding(false);
    }
  }

  async function toggleWishlist() {
    if (!ensureAuthed()) return;
    try {
      setWish((w) => !w);
      if (!wish) await addToWishlist(p._id);
      else await removeFromWishlist(p._id);
    } catch (e: any) {
      // revert on failure
      setWish((w) => !w);
      alert(e?.message || "Wishlist error");
    }
  }

  return (
    <div className="group rounded-md border border-neutral-100 bg-white p-3">
      <div className="relative">
        <button
          aria-label="Toggle wishlist"
          onClick={toggleWishlist}
          className="absolute right-2 top-2 z-10 rounded-md bg-white/80 p-1 text-neutral-600 hover:bg-white"
        >
          {wish ? "❤" : "♡"}
        </button>

        <Link href={`/products/${p._id}`} className="block">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-neutral-50">
            <Image
              src={imgSrc}
              alt={p.title}
              fill
              sizes="(min-width:1024px) 16vw, (min-width:640px) 30vw, 45vw"
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              onError={() => setImgSrc("/placeholder.png")}
              priority={false}
            />
          </div>
          <div className="mt-3 space-y-1">
            <div className="line-clamp-1 text-sm font-medium text-neutral-700">{p.title}</div>
            <div className="flex items-center gap-2">
              <span className="text-brand-600 font-semibold">${price}</span>
              {old && <span className="text-xs text-neutral-400 line-through">${old}</span>}
            </div>
            {p.ratingsAverage ? (
              <div className="text-xs text-yellow-600">★ {p.ratingsAverage.toFixed(1)}</div>
            ) : null}
          </div>
        </Link>
      </div>

      <button
        className="mt-3 inline-flex h-9 w-full items-center justify-center rounded-md bg-neutral-900 text-xs font-medium text-white transition-colors hover:bg-neutral-700 disabled:opacity-60"
        onClick={onAddToCart}
        disabled={adding}
      >
        {adding ? "Adding ⟳" : "Add To Cart"}
      </button>
    </div>
  );
}

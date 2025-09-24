// src app components => AccountMenu.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { removeAuth } from "@/app/lib/auth";
import { useRouter } from "next/navigation";

export default function AccountMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const read = () => setAuthed(!!localStorage.getItem("token"));
    read();
    const h = (e: StorageEvent) => e.key === "token" && read();
    window.addEventListener("storage", h);
    return () => window.removeEventListener("storage", h);
  }, []);

  const goAccount = () => router.push(authed ? "/account" : "/login");
  const logout = () => {
    removeAuth();
    setAuthed(false);
    router.push("/");
  };

  return (
    <div className="relative">
      <button className="rounded-md p-2 text-neutral-600 hover:bg-neutral-50" onClick={() => setOpen(v => !v)} aria-haspopup="menu" aria-expanded={open}>
        ☺
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-44 rounded-md border border-neutral-100 bg-white p-1 shadow-lg">
          <button onClick={goAccount} className="block w-full rounded px-3 py-2 text-left text-sm hover:bg-neutral-50">
            {authed ? "My Account" : "Login / Register"}
          </button>
          {authed && (
            <>
              <Link href="/orders" className="block rounded px-3 py-2 text-sm hover:bg-neutral-50">My Orders</Link>
              <Link href="/wishlist" className="block rounded px-3 py-2 text-sm hover:bg-neutral-50">Wishlist</Link>
              <Link href="/cart" className="block rounded px-3 py-2 text-sm hover:bg-neutral-50">Cart</Link>
              <hr className="my-1" />
              <button onClick={logout} className="block w-full rounded px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50">Logout</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

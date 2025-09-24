// src/app/components/site/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { removeAuth } from "@/app/lib/auth";

const links = [
  { href: "/", label: "Home", match: "exact" as const },
  { href: "/contact", label: "Contact", match: "startsWith" as const },
  { href: "/about", label: "About", match: "startsWith" as const },
  { href: "/register", label: "Sign Up", match: "startsWith" as const },
];

function isActive(pathname: string, href: string, match: "exact" | "startsWith") {
  if (match === "exact") return pathname === href;
  const p = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
  const h = href.endsWith("/") && href !== "/" ? href.slice(0, -1) : href;
  return p === h || p.startsWith(h + "/");
}

/* ===== Icons ===== */
function IconHeart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.6" d="M20.8 4.6a5 5 0 0 0-7.1 0L12 6.3l-1.7-1.7a5 5 0 1 0-7 7l8.7 8.7c.3.3.7.3 1 0l8.7-8.7a5 5 0 0 0 0-7z" />
    </svg>
  );
}
function IconBag(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.6" d="M6 7h12l-1 12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 7z" />
      <path strokeWidth="1.6" d="M9 7a3 3 0 1 1 6 0" />
    </svg>
  );
}
function IconUser(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="12" cy="8" r="4" strokeWidth="1.6" />
      <path strokeWidth="1.6" d="M4 20a8 8 0 0 1 16 0" />
    </svg>
  );
}
function IconSearch(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="11" cy="11" r="7" strokeWidth="1.6" />
      <path d="M20 20l-2-2" strokeWidth="1.6" />
    </svg>
  );
}
function IconChevronDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.17l3.71-2.94a.75.75 0 1 1 .94 1.16l-4.24 3.36a.75.75 0 0 1-.94 0L5.21 8.39a.75.75 0 0 1 .02-1.18z" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLanguage] = useState("English");
  const [isAuthed, setIsAuthed] = useState(false);

  // read token on mount + sync across tabs
  useEffect(() => {
    if (typeof window === "undefined") return;
    const read = () => setIsAuthed(!!localStorage.getItem("token"));
    read();
    const onStorage = (e: StorageEvent) => {
      if (e.key === "token") read();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLogout = () => {
    removeAuth();
    setIsAuthed(false);
    router.push("/");
  };

  // Decide account destination at click-time (always fresh)
  const handleAccountNav = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    router.push(token ? "/account" : "/login");
  };

  const nav = useMemo(
    () =>
      links.map((l) => {
        const active = isActive(pathname, l.href, l.match);
        const base = "relative px-1 py-1 transition-colors text-sm";
        const idle = "text-neutral-400 hover:text-neutral-600";
        const actv =
          "text-neutral-600 after:absolute after:left-0 after:-bottom-3 after:h-[2px] after:w-full after:bg-neutral-600";
        return {
          ...l,
          className: `${base} ${active ? actv : idle}`,
          ariaCurrent: active ? "page" : undefined,
        };
      }),
    [pathname]
  );

  const onWishlist = isActive(pathname, "/wishlist", "startsWith");
  const onCart = isActive(pathname, "/cart", "startsWith");
  const onAccount =
    isActive(pathname, "/account", "startsWith") ||
    isActive(pathname, "/login", "startsWith") ||
    isActive(pathname, "/register", "startsWith");

  const iconBtnBase = "rounded-md p-2 transition-colors";
  const iconBtnIdle = "text-neutral-600 hover:bg-neutral-50";
  const iconBtnActive = "bg-brand-600 text-white hover:bg-brand-700";

  const languages = ["English", "Arabic", "French", "Spanish", "German"];

  return (
    <header className="w-full">
      <div className="w-full bg-black text-neutral-0">
        <div className="container relative flex h-10 items-center justify-between text-xs">
          <p className="mx-auto md:mx-0">
            Summer Sale For All Swim Suits And Free Express Delivery —{" "}
            <span className="font-semibold">OFF 50%!</span>{"  "}
            <Link href="#" className="underline text-neutral-0">ShopNow</Link>
          </p>


          <div className="relative hidden md:inline-block">
            <button
              className="inline-flex items-center gap-1"
              onClick={() => setLangOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
            >
              {language} <IconChevronDown className="h-4 w-4" />
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 w-32 rounded-md bg-neutral-0 text-black shadow-lg">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    className="block w-full px-3 py-2 text-left text-sm hover:bg-neutral-100"
                    onClick={() => {
                      setLanguage(lang);
                      setLangOpen(false);
                    }}
                    role="option"
                    aria-selected={language === lang}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>


      <div className="border-b border-neutral-100 bg-neutral-0">
        <div className="container flex h-16 items-center gap-6">
         
          <Link href="/" className="text-xl font-semibold text-neutral-600">
            Exclusive
          </Link>

   
          <nav className="mx-6 hidden items-center gap-6 lg:flex">
            {nav.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={l.className}
                aria-current={l.ariaCurrent as "page" | undefined}
              >
                {l.label}
              </Link>
            ))}
          </nav>


          <div className="ml-auto flex items-center gap-2 sm:gap-4">

            <div className="relative hidden md:block">
              <input
                className="h-10 w-[360px] rounded-md border border-neutral-200 bg-white pl-4 pr-10 text-sm text-neutral-600 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-300"
                placeholder="What are you looking for?"
                aria-label="Search"
              />
              <button
                aria-label="Search"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-neutral-400 hover:text-neutral-600"
              >
                <IconSearch className="h-5 w-5" />
              </button>
            </div>

    
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className={`${iconBtnBase} ${onWishlist ? iconBtnActive : iconBtnIdle}`}
            >
              <IconHeart className="h-5 w-5" />
            </Link>
            <Link
              href="/cart"
              aria-label="Cart"
              className={`${iconBtnBase} ${onCart ? iconBtnActive : iconBtnIdle}`}
            >
              <IconBag className="h-5 w-5" />
            </Link>

            <button
              type="button"
              onClick={handleAccountNav}
              aria-label="Account"
              className={`${iconBtnBase} ${onAccount ? iconBtnActive : iconBtnIdle}`}
            >
              <IconUser className="h-5 w-5" />
            </button>

          
            {isAuthed && (
              <button
                onClick={handleLogout}
                className="ml-1 rounded-md border border-neutral-200 px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50"
                aria-label="Logout"
              >
                Logout
              </button>
            )}

    
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-neutral-200 lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              ☰
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-neutral-100 lg:hidden">
            <div className="container flex flex-col gap-3 py-3">
              {nav.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`text-sm ${l.ariaCurrent ? "font-medium text-neutral-600" : "text-neutral-500"}`}
                  aria-current={l.ariaCurrent as "page" | undefined}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-2">
                <input
                  className="h-10 w-full rounded-md border border-neutral-200 bg-white px-3 text-sm text-neutral-600 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-300"
                  placeholder="What are you looking for?"
                  aria-label="Mobile search"
                />
              </div>

              {isAuthed && (
                <button
                  onClick={() => { setOpen(false); handleLogout(); }}
                  className="mt-2 rounded-md border border-neutral-200 px-3 py-2 text-left text-sm text-neutral-600 hover:bg-neutral-50"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

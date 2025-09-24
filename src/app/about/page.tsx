import React from "react";
import Image from "next/image";
import Link from "next/link";

const stroke = "h-5 w-5 stroke-current";

function StorefrontIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={stroke} {...props}>
      <path d="M4 8h16l-1.4-3.2a2 2 0 0 0-1.8-1.2H7.2A2 2 0 0 0 5.4 4.8L4 8Z" strokeWidth="1.8"/>
      <path d="M5 8c0 1.5 1.2 2.7 2.7 2.7S10.4 9.5 10.4 8M10.4 8c0 1.5 1.2 2.7 2.7 2.7S15.8 9.5 15.8 8M15.8 8c0 1.5 1.2 2.7 2.7 2.7S21.2 9.5 21.2 8" strokeWidth="1.8"/>
      <rect x="4" y="10.7" width="16" height="8.8" rx="1.4" strokeWidth="1.8"/>
      <rect x="8" y="12.3" width="4" height="7.2" rx="0.8" strokeWidth="1.6"/>
      <rect x="13.6" y="12.7" width="4.4" height="3.6" rx="0.6" strokeWidth="1.6"/>
    </svg>
  );
}

function DollarCoinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={stroke} {...props}>
      <circle cx="12" cy="12" r="8.5" strokeWidth="1.9"/>
      <path d="M9.1 10.3c.5-.9 1.6-1.5 2.9-1.5 1.6 0 2.9.8 2.9 2 0 1.1-.8 1.7-2.4 2-1.8.3-2.9.8-2.9 2 0 1.2 1.4 2 3 2 1.3 0 2.4-.6 2.9-1.5" strokeWidth="1.6"/>
      <path d="M12 6.8v10.4" strokeWidth="1.6"/>
    </svg>
  );
}

function ShoppingBagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={stroke} {...props}>
      <path d="M6 7h12l-1 12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 7z" strokeWidth="1.8" />
      <path d="M9 7a3 3 0 1 1 6 0" strokeWidth="1.8" />
    </svg>
  );
}

function CoinStackIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={stroke} {...props}>
      <circle cx="16" cy="8" r="3.5" strokeWidth="1.7"/>
      <circle cx="18.5" cy="12" r="3" strokeWidth="1.7"/>
      <circle cx="9.5" cy="13.5" r="5.5" strokeWidth="1.9"/>
      <path d="M7.7 13.1c.4-.7 1.2-1.1 2.1-1.1 1.2 0 2.1.6 2.1 1.5s-.6 1.2-1.8 1.4c-1.3.2-2 .6-2 1.5S8.9 17.8 10 17.8c.9 0 1.6-.4 2.1-.9" strokeWidth="1.4"/>
      <path d="M9.8 10.6v6.1" strokeWidth="1.4"/>
    </svg>
  );
}



function TruckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={stroke} {...props}>

      <path d="M3 7h11v8H3z" strokeWidth="1.6" />
      <path d="M14 10h4l3 3v2h-7" strokeWidth="1.6" />
      <circle cx="7" cy="18" r="2" strokeWidth="1.6" />
      <circle cx="17" cy="18" r="2" strokeWidth="1.6" />
    </svg>
  );
}
function HeadsetIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={stroke} {...props}>
      <path d="M4 12a8 8 0 1 1 16 0v6a2 2 0 0 1-2 2h-3" strokeWidth="1.6" />
      <rect x="2" y="12" width="4" height="6" rx="1" strokeWidth="1.6" />
      <rect x="18" y="12" width="4" height="6" rx="1" strokeWidth="1.6" />
    </svg>
  );
}
function ShieldCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={stroke} {...props}>
      <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" strokeWidth="1.6" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" strokeWidth="1.6" />
    </svg>
  );
}


function TwitterBirdIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" {...props}>
      <path d="M22 5.8c-.7.3-1.5.6-2.3.6.8-.5 1.4-1.2 1.7-2.2-.7.4-1.6.8-2.5 1-1.4-1.5-3.9-1.1-5 1-.5 1-.4 2.1.1 3-3-.2-5.7-1.6-7.5-3.9-.9 1.6-.5 3.7 1 4.7-.6 0-1.2-.2-1.7-.5 0 1.8 1.3 3.4 3.1 3.8-.5.1-1 .2-1.5.1.4 1.5 1.9 2.6 3.6 2.7-1.4 1.1-3.1 1.8-5 1.8H3c1.8 1.1 4 1.7 6.2 1.7 7.5 0 11.8-6.4 11.5-12 0-.1 0-.2.3-.4Z" />
    </svg>
  );
}
function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor"/>
    </svg>
  );
}
function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" {...props}>
      <path d="M6.5 9H4v11h2.5V9ZM5.3 4.5A1.8 1.8 0 1 0 5.3 8 1.8 1.8 0 0 0 5.3 4.5ZM20 20h-2.5v-6.1c0-1.9-.8-2.9-2.2-2.9s-2.3 1-2.3 2.9V20H10V9h2.4v1.5c.5-.9 1.7-1.8 3.3-1.8 2.4 0 4.3 1.5 4.3 4.9V20Z"/>
    </svg>
  );
}

function StatCard({
  icon,
  value,
  label,
  highlight = false,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  highlight?: boolean;
}) {
  const Icon =
    React.isValidElement(icon)
      ? React.cloneElement(icon as React.ReactElement, {
          className: "h-5 w-5 stroke-current text-white",
        })
      : null;

  return (
    <div
      className={[
        "rounded-md border p-6",
        highlight
          ? "bg-brand-600 text-white border-transparent"
          : "bg-white border-neutral-100 text-neutral-600",
      ].join(" ")}
    >
      <div className="flex items-center gap-4">
        <div className="rounded-full bg-neutral-200 p-2">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-neutral-900">
            {Icon}
          </div>
        </div>

        <div>
          <div className={["text-2xl font-semibold", highlight ? "" : "text-neutral-600"].join(" ")}>
            {value}
          </div>
          <div className={highlight ? "text-xs opacity-90" : "text-xs text-neutral-400"}>{label}</div>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>

      <div className="container py-6 text-sm text-neutral-400">
        <nav className="flex items-center gap-2">
          <Link href="/" className="hover:text-neutral-600">Home</Link>
          <span>/</span>
          <span className="text-neutral-600">About</span>
        </nav>
      </div>

      <section className="container pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* left text */}
          <div>
            <h1 className="text-4xl font-semibold text-neutral-900 tracking-wide">Our Story</h1>
            <div className="mt-6 space-y-5 text-neutral-500 leading-7">
              <p>
                Launched in 2015, Exclusive is South Asia’s premier online shopping marketplace with an active presence in
                Bangladesh. Supported by a wide range of tailored marketing, data and service solutions, Exclusive has
                10,500 sellers and 300 brands and serves 3 million customers across the region.
              </p>
              <p>
                Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse
                assortment in categories ranging from consumer.
              </p>
            </div>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-neutral-50">
            <Image
              src="/images/girls.png"
              alt="2 Girls holding shopping bags"
              fill
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={<StorefrontIcon />} value="10.5k" label="Sellers active on our site" />
          <StatCard icon={<DollarCoinIcon />} value="33k" label="Monthly Product Sale" highlight />
          <StatCard icon={<ShoppingBagIcon />} value="45.5k" label="Customer active on our site" />
          <StatCard icon={<CoinStackIcon />} value="25k" label="Annual gross sale in our site" />
          </div>


        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Tom Cruise", role: "Founder & Chairman", img: "/images/Tom.png" },
            { name: "Emma Watson", role: "Managing Director", img: "/images/emma.png" },
            { name: "Will Smith", role: "Product Designer", img: "/images/will.png" },
          ].map((t) => (
            <div key={t.name}>
              <div className="relative h-[360px] w-full overflow-hidden rounded-md bg-neutral-50">
                <Image src={t.img} alt={t.name} fill className="object-contain" />
              </div>
              <div className="mt-3">
                <div className="text-neutral-900 font-medium">{t.name}</div>
                <div className="text-xs text-neutral-400">{t.role}</div>
              </div>
              <div className="mt-2 flex items-center gap-4 text-neutral-400 text-sm">
                <TwitterBirdIcon />
                <InstagramIcon />
                <LinkedinIcon />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-neutral-50 text-neutral-600">
              <TruckIcon />
            </div>
            <div className="mt-4 font-semibold text-neutral-900">FREE AND FAST DELIVERY</div>
            <div className="text-sm text-neutral-400">Free delivery for all orders over $140</div>
          </div>
          <div className="text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-neutral-50 text-neutral-600">
              <HeadsetIcon />
            </div>
            <div className="mt-4 font-semibold text-neutral-900">24/7 CUSTOMER SERVICE</div>
            <div className="text-sm text-neutral-400">Friendly 24/7 customer support</div>
          </div>
          <div className="text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-neutral-50 text-neutral-600">
              <ShieldCheckIcon />
            </div>
            <div className="mt-4 font-semibold text-neutral-900">MONEY BACK GUARANTEE</div>
            <div className="text-sm text-neutral-400">We return money within 30 days</div>
          </div>
        </div>
      </section>
    </>
  );
}

//src app => page.tsx
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/app/components/ProductCard";
import CategoryPill from "@/app/components/CategoryPill";
import {
  getFlashSales,
  getBestSelling,
  getExplore,
  getNewArrival,
} from "@/app/lib/products-api";
import { getCategories } from "@/app/lib/categories-api";

export const revalidate = 120;

export default async function HomePage() {
  const [flash, cats, best, explore, newest] = await Promise.all([
    getFlashSales(6),
    getCategories(8),
    getBestSelling(8),
    getExplore(8, 1),
    getNewArrival(4),
  ]);

  return (
    <>

      <section className="container mx-auto px-3 sm:px-4 lg:px-6 mt-6">
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-[260px,1fr]">
          <aside className="hidden lg:block rounded-md border border-neutral-100 bg-white p-3">
            <ul className="space-y-3 text-sm text-neutral-600">
              <li>Women’s Fashion  </li>
              <li>Men’s Fashion  </li>
              <li>Electronics</li>
              <li>Home & Lifestyle</li>
              <li>Medicine</li>
              <li>Sports & Outdoor</li>
              <li>Baby’s & Toys</li>
              <li>Groceries & Pets</li>
              <li>Health & Beauty</li>
            </ul>
          </aside>

          <div className="relative overflow-hidden rounded-md border border-neutral-100 bg-black p-5 sm:p-6 text-white">
            <div className="text-xs sm:text-sm text-white/70">iPhone 14 Series</div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold">Up to 10% off Voucher</h2>
            <Link
              href="/shop"
              className="mt-3 sm:mt-4 inline-block text-sm underline underline-offset-4"
            >
              Shop Now
            </Link>

            <Image
              src="/homepage/Apple.png"
              alt="Apple Ad"
              width={780}
              height={280}
              sizes="(min-width:1024px) 60vw, 90vw"
              className="pointer-events-none absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 h-[200px] sm:h-[260px] w-auto object-contain"
              priority
            />
          </div>
        </div>
      </section>


      <section className="container mx-auto px-3 sm:px-4 lg:px-6 mt-10 sm:mt-12">
        <div className="mb-4 sm:mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-block h-6 w-1 rounded bg-red-600" />
            <h3 className="text-lg sm:text-xl font-semibold text-neutral-800">Flash Sales</h3>
          </div>
          <Link
            href="/products?view=flash"
            className="rounded bg-red-600 px-3 py-2 text-xs sm:text-sm text-white"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {flash.map((p) => (
            <ProductCard key={p._id} p={p} />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-3 sm:px-4 lg:px-6 mt-14 sm:mt-16">
        <div className="mb-4 sm:mb-5 flex items-center gap-3">
          <span className="inline-block h-6 w-1 rounded bg-red-600" />
          <h3 className="text-lg sm:text-xl font-semibold text-neutral-800">
            Browse By Category
          </h3>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4">
          {cats.map((c) => (
            <CategoryPill key={c._id} c={c} />
          ))}
        </div>
      </section>


      <section className="container mx-auto px-3 sm:px-4 lg:px-6 mt-14 sm:mt-16">
        <div className="mb-4 sm:mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-block h-6 w-1 rounded bg-red-600" />
            <h3 className="text-lg sm:text-xl font-semibold text-neutral-800">
              Best Selling Products
            </h3>
          </div>
          <Link
            href="/products?view=best"
            className="rounded bg-red-600 px-3 py-2 text-xs sm:text-sm text-white"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {best.map((p) => (
            <ProductCard key={p._id} p={p} />
          ))}
        </div>
      </section>

 
      <section className="container mx-auto px-3 sm:px-4 lg:px-6 mt-14 sm:mt-16">
        <div className="relative overflow-hidden rounded-md bg-neutral-900 p-6 sm:p-8 text-white">
          <div className="text-xs sm:text-sm text-white/70">Categories</div>
          <h3 className="mt-2 text-xl sm:text-2xl font-semibold">
            Enhance Your Music Experience
          </h3>
          <Link
            href="/shop"
            className="mt-5 inline-block rounded bg-green-500 px-4 sm:px-5 py-2 text-xs sm:text-sm text-neutral-900"
          >
            Buy Now!
          </Link>

          <Image
            src="/homepage/JBL.png"
            alt="JBL"
            width={680}
            height={260}
            sizes="(min-width:1024px) 50vw, 90vw"
            className="pointer-events-none absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 h-[180px] sm:h-[240px] w-auto object-contain"
          />
        </div>
      </section>

      <section className="container mx-auto px-3 sm:px-4 lg:px-6 mt-14 sm:mt-16">
        <div className="mb-4 sm:mb-5 flex items-center gap-3">
          <span className="inline-block h-6 w-1 rounded bg-red-600" />
          <h3 className="text-lg sm:text-xl font-semibold text-neutral-800">
            Explore Our Products
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {explore.map((p) => (
            <ProductCard key={p._id} p={p} />
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/products?view=explore"
            className="inline-block rounded bg-red-600 px-5 sm:px-6 py-2 text-xs sm:text-sm text-white"
          >
            View All Products
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-3 sm:px-4 lg:px-6 mt-14 sm:mt-16">
        <div className="mb-4 sm:mb-5 flex items-center gap-3">
          <span className="inline-block h-6 w-1 rounded bg-red-600" />
          <h3 className="text-lg sm:text-xl font-semibold text-neutral-800">New Arrival</h3>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {newest.map((p) => (
            <Link
              key={p._id}
              href={`/products/${p._id}`}
              className="relative overflow-hidden rounded-md border border-neutral-100 bg-white p-3 sm:p-4"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded bg-neutral-50">
                <Image
                  src={p.imageCover}
                  alt={p.title}
                  fill
                  sizes="(min-width:768px) 50vw, 100vw"
                  className="object-contain"
                />
              </div>
              <div className="mt-3 text-sm text-neutral-700 line-clamp-2">{p.title}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-3 sm:px-4 lg:px-6 mt-16 sm:mt-20 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-3">
        <div className="rounded-md border border-neutral-100 bg-white p-5 sm:p-6 text-center">
          <div className="text-xl sm:text-2xl">🚚</div>
          <div className="mt-2 font-semibold text-sm sm:text-base">FREE AND FAST DELIVERY</div>
          <div className="text-xs sm:text-sm text-neutral-500">
            Free delivery for all orders over $140
          </div>
        </div>
        <div className="rounded-md border border-neutral-100 bg-white p-5 sm:p-6 text-center">
          <div className="text-xl sm:text-2xl">💬</div>
          <div className="mt-2 font-semibold text-sm sm:text-base">24/7 CUSTOMER SERVICE</div>
          <div className="text-xs sm:text-sm text-neutral-500">Friendly 24/7 customer support</div>
        </div>
        <div className="rounded-md border border-neutral-100 bg-white p-5 sm:p-6 text-center">
          <div className="text-xl sm:text-2xl">🔒</div>
          <div className="mt-2 font-semibold text-sm sm:text-base">MONEY BACK GUARANTEE</div>
          <div className="text-xs sm:text-sm text-neutral-500">
            We return money within 30 days
          </div>
        </div>
      </section>
    </>
  );
}

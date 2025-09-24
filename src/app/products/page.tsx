import Link from "next/link";
import ProductCard from "@/app/components/ProductCard";
import { getProducts } from "@/app/lib/products-api";
import { getCategories } from "@/app/lib/categories-api";

type Props = { searchParams: {
  page?: string;
  keyword?: string;
  category?: string;
  sort?: string;
  view?: "flash" | "best" | "explore";
} };

export const revalidate = 60;

export default async function ProductsPage({ searchParams }: Props) {
  const page = Number(searchParams.page || 1);
  const keyword = (searchParams.keyword || "").trim();
  const category = searchParams.category || "";
  const view = searchParams.view as Props["searchParams"]["view"];
  let sort = searchParams.sort || "-createdAt";

  if (view === "flash") sort = "-createdAt";
  if (view === "best")  sort = "-ratingsAverage,-createdAt";
  if (view === "explore") sort = "-createdAt";

  const limit = 12;

  const [cats, list] = await Promise.all([
    getCategories(50),
    getProducts({ page, limit, keyword, category, sort }),
  ]);

  let products = list.products;
  const results = list.results ?? products.length;
  const pages = list.pagination?.numberOfPages ?? Math.max(1, Math.ceil(results / limit));

  if (view === "flash") {
    products = products.filter((p) => p.priceAfterDiscount != null);
  }

  return (
    <section className="container py-8">
      <div className="grid gap-6 lg:grid-cols-[240px,1fr]">
        <aside className="rounded-md border border-neutral-100 bg-white p-4">
          <div className="mb-2 font-medium">Categories</div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href={`/products?${new URLSearchParams({ ...(keyword && { keyword }), ...(sort && { sort }) }).toString()}`}
                className={!category ? "text-brand-600" : "hover:text-neutral-700"}
              >
                All
              </Link>
            </li>
            {cats.map((c) => (
              <li key={c._id}>
                <Link
                  href={`/products?${new URLSearchParams({
                    category: c._id,
                    ...(keyword && { keyword }),
                    ...(sort && { sort }),
                  }).toString()}`}
                  className={category === c._id ? "text-brand-600" : "hover:text-neutral-700"}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-sm">
            <div className="mb-2 font-medium">Sort</div>
            <div className="grid gap-2">
              <Link href={`/products?${new URLSearchParams({ ...(keyword && { keyword }), ...(category && { category }), sort: "-createdAt" }).toString()}`}>Newest</Link>
              <Link href={`/products?${new URLSearchParams({ ...(keyword && { keyword }), ...(category && { category }), sort: "-ratingsAverage,-createdAt" }).toString()}`}>Top rated</Link>
              <Link href={`/products?${new URLSearchParams({ ...(keyword && { keyword }), ...(category && { category }), sort: "price" }).toString()}`}>Price: Low → High</Link>
              <Link href={`/products?${new URLSearchParams({ ...(keyword && { keyword }), ...(category && { category }), sort: "-price" }).toString()}`}>Price: High → Low</Link>
            </div>
          </div>
        </aside>

        {/* GRID */}
        <div>
          {(keyword || category || view) && (
            <div className="mb-4 text-sm text-neutral-500">
              {view === "flash" && "Flash Sales "}
              {view === "best" && "Best Selling "}
              {view === "explore" && "Explore "}
              {keyword ? `• “${keyword}” ` : ""}
              {category ? "• Selected category " : ""}
            </div>
          )}

          {products.length === 0 ? (
            <div className="rounded-md border border-neutral-100 bg-white p-8 text-center">
              No products found.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {products.map((p) => <ProductCard key={p._id} p={p} />)}
            </div>
          )}

          {/* PAGINATION */}
          {pages > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              {Array.from({ length: pages }).map((_, i) => {
                const n = i + 1;
                const qs = new URLSearchParams({
                  ...(keyword && { keyword }),
                  ...(category && { category }),
                  ...(sort && { sort }),
                  ...(view && { view }),
                  page: String(n),
                }).toString();
                return (
                  <Link
                    key={n}
                    href={`/products?${qs}`}
                    className={`rounded border px-3 py-1 text-sm ${page === n ? "bg-neutral-900 text-white" : "hover:bg-neutral-50"}`}
                  >
                    {n}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

import ProductCard from "@/app/components/ProductCard";
import { getProducts } from "@/app/lib/products-api";

type Props = {
  searchParams: { page?: string; keyword?: string; category?: string; sort?: string };
};

export const revalidate = 60;

export default async function ProductsPage({ searchParams }: Props) {
  const page     = Number(searchParams.page || 1);
  const keyword  = searchParams.keyword || "";
  const category = searchParams.category || "";
  const sort     = searchParams.sort || "-createdAt";

  // Never throw here—show empty states instead so Next doesn't route to not-found
  let data:
    | { products: any[]; results?: number; pagination?: { numberOfPages?: number } }
    | null = null;

  try {
    data = await getProducts({ page, keyword, category, sort, limit: 12 });
  } catch {
    data = { products: [], results: 0, pagination: { numberOfPages: 1 } };
  }

  const products = data?.products ?? [];
  const pages =
    data?.pagination?.numberOfPages ??
    Math.max(1, Math.ceil((data?.results ?? products.length) / 12));

  return (
    <section className="container py-8">
      {(keyword || category) && (
        <div className="mb-4 text-sm text-neutral-500">
          Showing results{keyword ? ` for “${keyword}”` : ""}{category ? " in selected category" : ""}.
        </div>
      )}

      {products.length === 0 ? (
        <div className="rounded-md border border-neutral-100 bg-white p-8 text-center">
          No products found.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p._id} p={p} />
          ))}
        </div>
      )}

      {pages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: pages }, (_, i) => {
            const n = i + 1;
            const qs = new URLSearchParams({ keyword, category, sort, page: String(n) }).toString();
            return (
              <a
                key={n}
                href={`/products?${qs}`}
                className={`rounded border px-3 py-1 text-sm ${page === n ? "bg-neutral-900 text-white" : "hover:bg-neutral-50"}`}
              >
                {n}
              </a>
            );
          })}
        </div>
      )}
    </section>
  );
}

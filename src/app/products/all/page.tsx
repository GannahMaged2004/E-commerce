import ProductCard from "@/app/components/ProductCard";
import { getAllProducts } from "@/app/lib/products-api";

export const revalidate = 60; 

export default async function AllProductsPage() {
  const products = await getAllProducts();

  return (
    <section className="container py-8">
      <h1 className="mb-4 text-xl font-semibold">All Products ({products.length})</h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {products.map((p) => (
          <ProductCard key={p._id} p={p} />
        ))}
      </div>
    </section>
  );
}

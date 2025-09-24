//src app products  => page.tsx

import Image from "next/image";
import Link from "next/link";
import { getProductById, getBestSelling } from "@/app/lib/products-api";
import ProductCard from "@/app/components/ProductCard";

type Props = { params: { id: string } };

export default async function ProductDetailsPage({ params }: Props) {
  const product = await getProductById(params.id);
  const related = await getBestSelling(4);

  return (
    <div className="container py-8">
      <nav className="text-sm text-neutral-400">
        <Link href="/" className="hover:text-neutral-700">Home</Link> /{" "}
        <span className="text-neutral-700">{product.title}</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div className="relative w-full rounded border bg-white p-4">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded bg-neutral-50">
            <Image src={product.imageCover} alt={product.title} fill className="object-contain" />
          </div>
        </div>

        <div className="bg-white p-4 rounded border">
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          {product.ratingsAverage && (
            <div className="mt-1 text-sm text-yellow-600">★ {product.ratingsAverage.toFixed(1)}</div>
          )}
          <div className="mt-3 text-2xl font-semibold">${product.price}</div>
          <button className="mt-4 rounded bg-red-600 px-5 py-3 text-white">Buy Now</button>
        </div>
      </div>

      <h2 className="mt-10 mb-4 text-lg font-semibold">Related Items</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {related.map((p) => <ProductCard key={p._id} p={p} />)}
      </div>
    </div>
  );
}

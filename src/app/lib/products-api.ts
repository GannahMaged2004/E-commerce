import { api } from "./api";
export type Product = {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  priceAfterDiscount?: number;
  ratingsAverage?: number;
  category?: { name: string; _id: string };
  brand?: { name: string; _id: string };
};

type ListRes = {
  results?: number;
  data?: Product[];
  products?: Product[];
  pagination?: { numberOfPages?: number };
  metadata?: { numberOfPages?: number }; 
} & any;

function pickProducts(r: ListRes) {
  const products = (r?.data ?? r?.products ?? []) as Product[];
  const results = r?.results ?? products.length;
  const pagination = r?.pagination ?? r?.metadata ?? undefined;
  return { products, results, pagination };
}


export async function getProducts({
  page = 1,
  limit = 12,
  keyword = "",
  category = "",
  sort = "-createdAt",
}: {
  page?: number;
  limit?: number;
  keyword?: string;  
  category?: string; 
  sort?: string;
}) {
  const qs = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sort,
    ...(keyword && { keyword }),
    ...(category && { category }),
  }).toString();

  const res = await api<ListRes>(`/api/v1/products?${qs}`);
  return pickProducts(res);
}

export async function getAllProducts() {
  const first = await api<ListRes>("/api/v1/products?limit=60&page=1&sort=-createdAt");
  const { products: firstBatch, pagination } = pickProducts(first);
  const totalPages = pagination?.numberOfPages ?? 1;
  if (totalPages <= 1) return firstBatch;

  const rest = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, i) =>
      api<ListRes>(`/api/v1/products?limit=60&page=${i + 2}&sort=-createdAt`)
    )
  );

  return firstBatch.concat(...rest.map(p => pickProducts(p).products));
}

export async function getFlashSales(limit = 6) {
  return (await getProducts({ limit, sort: "-createdAt" })).products;
}
export async function getBestSelling(limit = 8) {
  return (await getProducts({ limit, sort: "-ratingsAverage,-createdAt" })).products;
}
export async function getExplore(limit = 8, page = 1) {
  return (await getProducts({ limit, page, sort: "-createdAt" })).products;
}
export async function getNewArrival(limit = 4) {
  return (await getProducts({ limit, sort: "-createdAt" })).products;
}

export async function getProductById(id: string) {
  const r = await api<{ data?: Product; product?: Product }>(`/api/v1/products/${id}`);
  const product = r.data ?? r.product;
  if (!product) throw new Error("Product not found");
  return product;
}
import { api } from "@/app/lib/api";
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
};

async function fetchProducts(qs: string) {
  const r = await api<ListRes>(`/api/v1/products${qs}`);
  return {
    products: (r.data ?? r.products ?? []) as Product[],
    results: r.results,
    pagination: r.pagination,
  };
}

export async function getProducts(params: { page?: number; limit?: number; keyword?: string; category?: string; sort?: string }) {
  const { page = 1, limit = 12, keyword = "", category = "", sort = "-createdAt" } = params || {};
  const sp = new URLSearchParams({ page: String(page), limit: String(limit), sort });
  if (keyword) sp.set("keyword", keyword);
  if (category) sp.set("category", category); 

  return fetchProducts(`?${sp.toString()}`);
}


export async function getFlashSales(limit = 6) { return (await fetchProducts(`?limit=${limit}&sort=-createdAt`)).products; }
export async function getBestSelling(limit = 8) { return (await fetchProducts(`?limit=${limit}&sort=-ratingsAverage,-createdAt`)).products; }
export async function getExplore(limit = 8, page = 1) { return (await fetchProducts(`?limit=${limit}&page=${page}`)).products; }
export async function getNewArrival(limit = 4) { return (await fetchProducts(`?limit=${limit}&sort=-createdAt`)).products; }
export async function getProductById(id: string) { return api<{ data: Product }>(`/api/v1/products/${id}`).then((r) => r.data); }

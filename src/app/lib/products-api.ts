//src app lib => products-api.ts

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

type ProductsRes = { results?: number; data?: Product[]; products?: Product[] } & any;

async function fetchProducts(qs: string) {
  // RouteMisr products live under /api/v1/products
  const res = await api<ProductsRes>(`/api/v1/products${qs}`);
  // API sometimes returns {data:[]} or {products:[]}
  return (res.data ?? res.products ?? []) as Product[];
}

export async function getFlashSales(limit = 6) {
  // pick “newest” with a limit to mimic flash
  return fetchProducts(`?limit=${limit}&sort=-createdAt`);
}

export async function getBestSelling(limit = 8) {
  // sort by top rating then recent
  return fetchProducts(`?limit=${limit}&sort=-ratingsAverage,-createdAt`);
}

export async function getExplore(limit = 8, page = 1) {
  return fetchProducts(`?limit=${limit}&page=${page}`);
}

export async function getNewArrival(limit = 4) {
  return fetchProducts(`?limit=${limit}&sort=-createdAt`);
}

export async function getProductById(id: string) {
  return api<{ data: Product }>(`/api/v1/products/${id}`).then((r) => r.data);
}

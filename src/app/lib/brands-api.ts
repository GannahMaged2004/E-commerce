//src app lib => brands-api.ts

import { api } from "./api";
export type Brand = { _id: string; name: string; image?: string };
type BRes = { data: Brand[] } | { results?: number; data: Brand[] } | Brand[];

function pick<T>(r: any): T {
  if (Array.isArray(r)) return r as T;
  if (r?.data) return r.data as T;
  return r as T;
}

export async function getBrands(limit = 8) {
  const r = await api<BRes>(`/brands?limit=${limit}`);
  return pick<Brand[]>(r);
}

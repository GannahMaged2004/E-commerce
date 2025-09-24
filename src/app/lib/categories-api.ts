// src/app/lib/categories-api.ts
import { api } from "./api";

export type Category = { _id: string; name: string; image?: string };

export async function getCategories(limit = 8) {
  const res = await api<{ results: number; data: Category[] }>(
    `/api/v1/categories?limit=${limit}`
  );
  return res.data;
}

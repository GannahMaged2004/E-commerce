import { api } from "./api";

export const getProducts = (query = "") =>
  api<{ results: number; data: any[] }>(`/products${query ? `?${query}` : ""}`);

export const getProduct = (id: string) =>
  api<{ data: any }>(`/products/${id}`);

export const getBrands = () => api<{ data: any[] }>(`/brands`);
export const getBrand = (id: string) => api<{ data: any }>(`/brands/${id}`);

export const getCategories = () => api<{ data: any[] }>(`/categories`);
export const getCategory = (id: string) => api<{ data: any }>(`/categories/${id}`);

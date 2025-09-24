export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export function setToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem("token", token);
  else localStorage.removeItem("token");
}

export async function api<T>(
  path: string,
  opts: RequestInit & { auth?: boolean } = {}
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(opts.headers || {}),
  };

  if (opts.auth) {
    const token = getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
      (headers as any).token = token;
    }
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;
  const url = `${API_BASE}${normalized}`;

  const res = await fetch(url, { ...opts, headers });
  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message = json?.message || json?.errors?.msg || "Request failed";
    throw new Error(message);
  }

  return json as T;
}

export async function getProducts() {
  return api(`/api/v1/products?limit=60&page=1&sort=-createdAt`);
}

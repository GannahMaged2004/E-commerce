export function saveAuth(token: string, user?: any) {
  localStorage.setItem("token", token);
  if (user) localStorage.setItem("user", JSON.stringify(user));
}

export function removeAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function getUser() {
  const raw = typeof window !== "undefined" ? localStorage.getItem("user") : null;
  try { return raw ? JSON.parse(raw) : null; } catch { return null; }
}
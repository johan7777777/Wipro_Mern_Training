import { tokenStorage } from "./tokenStorage";

const API_BASE = "/api";

async function request(path, options = {}) {
  const token = tokenStorage.get();
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || data.error || "Request failed");
  }
  return data;
}

export const authApi = {
  register: async (body) => {
    const data = await request("/auth/register", {
      method: "POST",
      body: JSON.stringify(body),
    });
    if (data.token) {
      tokenStorage.set(data.token);
    }
    return data;
  },
  login: async (body) => {
    const data = await request("/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    });
    
    if (data.token) {
      tokenStorage.set(data.token);
    }
    return data;
  },
  logout: async () => {
    await request("/auth/logout", { method: "POST" });
    tokenStorage.remove();
  },
  me: () => request("/auth/me"),
};

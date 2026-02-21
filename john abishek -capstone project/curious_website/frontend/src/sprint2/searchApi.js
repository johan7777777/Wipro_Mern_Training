import { tokenStorage } from "../services/tokenStorage";

const API_BASE = "/api";

async function searchRequest(params) {
  const searchParams = new URLSearchParams();
  if (params.q) searchParams.set("q", params.q);
  if (params.type) searchParams.set("type", params.type);
  if (params.status) searchParams.set("status", params.status);
  if (params.questionType) searchParams.set("questionType", params.questionType);

  const query = searchParams.toString();
  const url = `${API_BASE}/search${query ? `?${query}` : ""}`;

  const token = tokenStorage.get();
  const headers = {};
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    credentials: "include",
    headers,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Search failed");
  return data;
}

export const searchApi = {
  search: (params) => searchRequest(params),
};

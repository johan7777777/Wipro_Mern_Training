import { tokenStorage } from "../services/tokenStorage";

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
    const msg = data.message || data.error || `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data;
}

export const questionsApi = {
  list: () => request("/questions"),
  getOne: (id) => request(`/questions/${id}`),
  create: (body) => request("/questions", { method: "POST", body: JSON.stringify(body) }),
  update: (id, body) => request(`/questions/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  remove: (id) => request(`/questions/${id}`, { method: "DELETE" }),
  deactivate: (id) => request(`/questions/${id}/deactivate`, { method: "PATCH" }),
  markCompleted: (id) => request(`/questions/${id}/complete`, { method: "PATCH" }),
  markApproved: (id) => request(`/questions/${id}/approve`, { method: "PATCH" }),
};

export const answersApi = {
  list: (questionId) =>
    request(questionId ? `/answers?questionId=${questionId}` : "/answers"),
  getOne: (id) => request(`/answers/${id}`),
  create: (body) => request("/answers", { method: "POST", body: JSON.stringify(body) }),
  update: (id, body) => request(`/answers/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  remove: (id) => request(`/answers/${id}`, { method: "DELETE" }),
  deactivate: (id) => request(`/answers/${id}/deactivate`, { method: "PATCH" }),
  markApproved: (id) => request(`/answers/${id}/approve`, { method: "PATCH" }),
  like: (id) => request(`/answers/${id}/like`, { method: "POST" }),
};

export const commentsApi = {
  list: (answerId) => request(answerId ? `/comments?answerId=${answerId}` : "/comments"),
  create: (body) => request("/comments", { method: "POST", body: JSON.stringify(body) }),
};

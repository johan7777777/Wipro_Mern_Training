import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "0 auto",
        padding: "2rem",
        background: "#EED9B7",
        borderRadius: 12,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.15)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
      }}
    >
      <h1 style={{ marginTop: 0, color: "var(--brand-primary)", fontWeight: 600 }}>Login</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {error && (
          <div style={{ padding: "0.75rem", background: "#fef2f2", color: "var(--brand-accent)", borderRadius: 6, fontSize: "0.9rem" }}>
            {error}
          </div>
        )}
        <label style={{ display: "flex", flexDirection: "column", gap: "0.5rem", color: "var(--text-primary)", fontWeight: 500 }}>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            style={{
              display: "block",
              width: "100%",
              padding: "0.625rem",
              marginTop: 4,
              border: "1px solid var(--border-color)",
              borderRadius: 6,
              fontSize: "1rem",
            }}
          />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: "0.5rem", color: "var(--text-primary)", fontWeight: 500 }}>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            style={{
              display: "block",
              width: "100%",
              padding: "0.625rem",
              marginTop: 4,
              border: "1px solid var(--border-color)",
              borderRadius: 6,
              fontSize: "1rem",
            }}
          />
        </label>
        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: "0.75rem 1rem",
            background: "var(--brand-secondary)",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: 500,
            fontSize: "1rem",
          }}
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
      <p style={{ marginTop: "1.5rem", color: "var(--text-secondary)" }}>
        Don&apos;t have an account? <Link to="/register" style={{ color: "var(--brand-secondary)", fontWeight: 500 }}>Register</Link>
      </p>
    </div>
  );
}

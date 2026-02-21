import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await register(email, password, name, role);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Registration failed");
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
      <h1 style={{ marginTop: 0, color: "var(--brand-primary)", fontWeight: 600 }}>Register</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {error && (
          <div style={{ padding: "0.75rem", background: "#fef2f2", color: "var(--brand-accent)", borderRadius: 6, fontSize: "0.9rem" }}>
            {error}
          </div>
        )}
        <label style={{ display: "flex", flexDirection: "column", gap: "0.5rem", color: "var(--text-primary)", fontWeight: 500 }}>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
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
            autoComplete="new-password"
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
          Role
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              display: "block",
              width: "100%",
              padding: "0.625rem",
              marginTop: 4,
              border: "1px solid var(--border-color)",
              borderRadius: 6,
              fontSize: "1rem",
              background: "var(--bg-white)",
            }}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
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
          {submitting ? "Creating account…" : "Create account"}
        </button>
      </form>
      <p style={{ marginTop: "1.5rem", color: "var(--text-secondary)" }}>
        Already have an account? <Link to="/login" style={{ color: "var(--brand-secondary)", fontWeight: 500 }}>Login</Link>
      </p>
    </div>
  );
}

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { answersApi } from "./crudApi";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AnswerForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    answersApi
      .getOne(id)
      .then((a) => setAnswer(a.answer))
      .catch((e) => setError(e.message));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!answer.trim()) return;
    setLoading(true);
    setError("");
    try {
      await answersApi.update(id, { answer: answer.trim() });
      navigate(-1);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const box = {
    maxWidth: 600,
    margin: "0 auto",
    padding: "1.5rem",
    background: "var(--bg-white)",
    borderRadius: 12,
    boxShadow: "var(--shadow-md)",
  };
  const input = {
    width: "100%",
    padding: "0.625rem 0.75rem",
    marginBottom: "1rem",
    border: "1px solid var(--border-color)",
    borderRadius: 6,
    resize: "vertical",
    fontSize: "1rem",
  };
  const btn = {
    padding: "0.625rem 1.25rem",
    background: "var(--brand-secondary)",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 500,
    fontSize: "1rem",
  };

  return (
    <ProtectedRoute>
      <div style={box}>
        <h1 style={{ marginTop: 0, color: "var(--brand-primary)", fontWeight: 600 }}>Edit Answer</h1>
        {error && <p style={{ color: "var(--brand-accent)", padding: "0.75rem", background: "#fef2f2", borderRadius: 6 }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, color: "var(--text-primary)" }}>Answer</label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
            rows={5}
            style={input}
            placeholder="Your answer"
          />
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
            <button type="submit" style={btn} disabled={loading}>
              {loading ? "Saving..." : "Update"}
            </button>
            <button type="button" style={{ ...btn, background: "var(--text-secondary)" }} onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </ProtectedRoute>
  );
}

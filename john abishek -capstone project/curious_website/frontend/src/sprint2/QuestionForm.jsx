import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { questionsApi } from "./crudApi";
import ProtectedRoute from "../components/ProtectedRoute";

export default function QuestionForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [questionType, setQuestionType] = useState("Post");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit && id) {
      questionsApi
        .getOne(id)
        .then((q) => {
          setDescription(q.description);
          setQuestionType(q.questionType || "Post");
        })
        .catch((e) => setError(e.message));
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (isEdit) {
        await questionsApi.update(id, { description, questionType });
      } else {
        await questionsApi.create({ description, questionType });
      }
      navigate("/questions");
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
        <h1 style={{ marginTop: 0, color: "var(--brand-primary)", fontWeight: 600 }}>{isEdit ? "Edit Question" : "New Question"}</h1>
        {error && <p style={{ color: "var(--brand-accent)", padding: "0.75rem", background: "#fef2f2", borderRadius: 6 }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, color: "var(--text-primary)" }}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            style={{ ...input, resize: "vertical" }}
            placeholder="Description"
          />
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, color: "var(--text-primary)" }}>Type</label>
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
            style={{ ...input, width: "auto", background: "var(--bg-white)" }}
          >
            <option value="Post">Post</option>
            <option value="Discussion">Discussion</option>
          </select>
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
            <button type="submit" style={btn} disabled={loading}>
              {loading ? "Saving..." : isEdit ? "Update" : "Create"}
            </button>
            <button type="button" style={{ ...btn, background: "var(--text-secondary)" }} onClick={() => navigate("/questions")}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </ProtectedRoute>
  );
}

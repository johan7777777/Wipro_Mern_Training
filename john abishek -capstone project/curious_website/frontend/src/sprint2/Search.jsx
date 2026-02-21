import { useState } from "react";
import { searchApi } from "./searchApi";

export default function Search() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({
    questions: [],
  });
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e?.preventDefault();
    const trimmedKeyword = keyword.trim();
    if (!trimmedKeyword) {
      setResults({ questions: [] });
      setSearched(true);
      return;
    }
    setLoading(true);
    setSearched(true);
    try {
      const data = await searchApi.search({
        q: trimmedKeyword,
        type: "questions",
      });
      setResults(data);
    } catch (err) {
      setResults({ questions: [] });
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    maxWidth: 800,
    margin: "0 auto",
  };

  const formStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    marginBottom: "2rem",
    padding: "1.5rem",
    background: "var(--bg-white)",
    borderRadius: 12,
    boxShadow: "var(--shadow-md)",
  };

  const inputStyle = {
    flex: "1 1 200px",
    padding: "0.625rem 0.75rem",
    border: "1px solid var(--border-color)",
    borderRadius: 6,
    fontSize: "1rem",
  };

  const selectStyle = {
    padding: "0.625rem 0.75rem",
    border: "1px solid var(--border-color)",
    borderRadius: 6,
    background: "var(--bg-white)",
    fontSize: "1rem",
  };

  const btnStyle = {
    padding: "0.625rem 1.25rem",
    background: "var(--brand-secondary)",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 500,
    fontSize: "1rem",
  };

  const cardStyle = {
    padding: "1rem",
    marginBottom: "0.75rem",
    background: "var(--bg-white)",
    borderRadius: 8,
    boxShadow: "var(--shadow-sm)",
    border: "1px solid var(--border-color)",
  };

  const sectionStyle = {
    marginBottom: "2rem",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "0.25rem",
    fontSize: "0.875rem",
    color: "var(--text-secondary)",
    fontWeight: 500,
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ marginTop: 0, marginBottom: "1rem", color: "var(--brand-primary)", fontWeight: 600 }}>Search</h1>
      <form style={formStyle} onSubmit={handleSearch}>
        <div style={{ flex: "1 1 200px", display: "flex", gap: "0.75rem", alignItems: "flex-end" }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Search Questions</label>
            <input
              type="text"
              placeholder="Search questions by keyword..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              style={{ ...inputStyle, width: "100%" }}
            />
          </div>
          <button type="submit" style={btnStyle} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {loading && <p style={{ color: "var(--text-secondary)" }}>Searching...</p>}
      {searched && !loading && (
        <>
          {results.questions?.length > 0 && (
            <section style={sectionStyle}>
              <h2 style={{ color: "var(--brand-primary)", fontWeight: 600 }}>Questions ({results.questions.length})</h2>
              {results.questions.map((q) => (
                <div key={q.id} style={cardStyle}>
                  <strong style={{ color: "var(--text-primary)" }}>{q.description}</strong>
                  <p style={{ margin: "0.5rem 0 0", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    Type: {q.questionType} | Status: {q.status}
                  </p>
                </div>
              ))}
            </section>
          )}
          {searched && !loading && results.questions?.length === 0 && (
            <p style={{ color: "var(--text-secondary)" }}>No questions found. Try different criteria.</p>
          )}
        </>
      )}
    </div>
  );
}

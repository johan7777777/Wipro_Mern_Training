import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { questionsApi, answersApi, commentsApi } from "./crudApi";
import ProtectedRoute from "../components/ProtectedRoute";

export default function QuestionDetail() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [commentsByAnswer, setCommentsByAnswer] = useState({});
  const [newAnswer, setNewAnswer] = useState("");
  const [newCommentByAnswer, setNewCommentByAnswer] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const loadQuestion = () => {
    questionsApi.getOne(id).then(setQuestion).catch((e) => setError(e.message)).finally(() => setLoading(false));
  };

  const loadAnswers = () => {
    answersApi.list(id).then(setAnswers).catch(() => setAnswers([]));
  };

  const loadComments = (answerIds) => {
    if (!answerIds?.length) return;
    Promise.all(answerIds.map((aid) => commentsApi.list(aid)))
      .then((results) => {
        const map = {};
        answerIds.forEach((aid, i) => {
          map[aid] = results[i] || [];
        });
        setCommentsByAnswer(map);
      })
      .catch(() => {});
  };

  const load = () => {
    loadQuestion();
    answersApi.list(id).then((ans) => {
      setAnswers(ans);
      loadComments(ans.map((a) => a.id));
    }).catch(() => setAnswers([]));
  };

  useEffect(() => load(), [id]);

  const handleAddAnswer = async (e) => {
    e.preventDefault();
    if (!newAnswer.trim()) return;
    setSubmitting(true);
    try {
      await answersApi.create({ answer: newAnswer.trim(), questionId: parseInt(id, 10) });
      setNewAnswer("");
      load();
    } catch (e) {
      alert(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAnswer = async (aid, e) => {
    e.preventDefault();
    if (!window.confirm("Delete this answer?")) return;
    try {
      await answersApi.remove(aid);
      setAnswers((prev) => prev.filter((a) => a.id !== aid));
      setCommentsByAnswer((prev) => {
        const next = { ...prev };
        delete next[aid];
        return next;
      });
    } catch (e) {
      alert(e.message);
    }
  };

  const handleDeactivateAnswer = async (aid, e) => {
    e.preventDefault();
    try {
      const a = await answersApi.deactivate(aid);
      setAnswers((prev) => prev.map((p) => (p.id === aid ? a : p)));
    } catch (e) {
      alert(e.message);
    }
  };

  const handleMarkCompleted = async (e) => {
    e.preventDefault();
    try {
      const q = await questionsApi.markCompleted(id);
      setQuestion(q);
    } catch (e) {
      alert(e.message);
    }
  };

  const handleMarkApprovedQuestion = async (e) => {
    e.preventDefault();
    try {
      const q = await questionsApi.markApproved(id);
      setQuestion(q);
    } catch (e) {
      alert(e.message);
    }
  };

  const handleDeactivateQuestion = async (e) => {
    e.preventDefault();
    if (!window.confirm("Deactivate (soft delete) this question?")) return;
    try {
      const q = await questionsApi.deactivate(id);
      setQuestion(q);
    } catch (e) {
      alert(e.message);
    }
  };

  const handleDeleteQuestion = async (e) => {
    e.preventDefault();
    if (!window.confirm("Permanently delete this question?")) return;
    try {
      await questionsApi.remove(id);
      window.location.href = "/dashboard";
    } catch (e) {
      alert(e.message);
    }
  };

  const handleMarkApprovedAnswer = async (aid, e) => {
    e.preventDefault();
    try {
      const a = await answersApi.markApproved(aid);
      setAnswers((prev) => prev.map((p) => (p.id === aid ? a : p)));
    } catch (e) {
      alert(e.message);
    }
  };

  const handleLike = async (aid, e) => {
    e.preventDefault();
    try {
      const a = await answersApi.like(aid);
      setAnswers((prev) => prev.map((p) => (p.id === aid ? a : p)));
    } catch (e) {
      alert(e.message);
    }
  };

  const handleAddCommentSubmit = async (aid, e) => {
    e.preventDefault();
    const text = newCommentByAnswer[aid]?.trim();
    if (!text) return;
    try {
      await commentsApi.create({ comment: text, answerId: aid });
      setNewCommentByAnswer((prev) => ({ ...prev, [aid]: "" }));
      const list = await commentsApi.list(aid);
      setCommentsByAnswer((prev) => ({ ...prev, [aid]: list }));
    } catch (e) {
      alert(e.message);
    }
  };

  const box = {
    maxWidth: 800,
    margin: "0 auto",
    padding: "1.5rem",
    background: "var(--bg-white)",
    borderRadius: 12,
    boxShadow: "var(--shadow-md)",
  };
  const card = {
    padding: "1rem",
    marginBottom: "0.75rem",
    border: "1px solid var(--border-color)",
    borderRadius: 8,
    background: "var(--bg-white)",
  };
  const btn = (c) => ({
    padding: "0.4rem 0.8rem",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: "0.85rem",
    background: c || "var(--border-color)",
    color: c ? "#fff" : "var(--text-primary)",
    marginRight: "0.5rem",
    marginTop: "0.5rem",
    fontWeight: 500,
    textDecoration: "none",
    display: "inline-block",
  });

  if (loading) return <div style={box}>Loading...</div>;
  if (error || !question) return <div style={box}>{error || "Question not found"}</div>;

  return (
    <ProtectedRoute>
      <div style={box}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
          <div>
            <h1 style={{ margin: 0, color: "var(--brand-primary)", fontWeight: 600 }}>{question.description}</h1>
            <p style={{ margin: "0.25rem 0 0", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
              {question.questionType} | {question.status}
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {question.status !== "Resolved" && (
              <button type="button" style={btn("var(--brand-success)")} onClick={handleMarkCompleted}>
                Mark Completed
              </button>
            )}
            {question.status === "Pending Approval" && (
              <>
                <button type="button" style={btn("var(--brand-success)")} onClick={handleMarkApprovedQuestion}>
                  Mark Approved
                </button>
                <button type="button" style={btn("var(--brand-warning)")} onClick={handleDeactivateQuestion}>
                  Deactivate
                </button>
              </>
            )}
            {question.status !== "Approved" && question.status !== "Deactivated" && question.status !== "Completed" && (
              <Link to={`/questions/${id}/edit`} style={{ ...btn("var(--brand-secondary)"), textDecoration: "none" }}>
                Edit
              </Link>
            )}
            {question.status === "Deactivated" ? (
              <button type="button" style={btn("var(--brand-accent)")} onClick={handleDeleteQuestion}>
                Delete
              </button>
            ) : (
              question.status !== "Deleted" && (
                <button type="button" style={btn("var(--brand-accent)")} onClick={handleDeleteQuestion}>
                  Delete
                </button>
              )
            )}
            <Link to="/dashboard" style={{ ...btn(), textDecoration: "none" }}>
              Back
            </Link>
          </div>
        </div>
        <p style={{ whiteSpace: "pre-wrap", marginBottom: "1.5rem", color: "var(--text-primary)", lineHeight: "1.6" }}>{question.description}</p>

        <h2 style={{ marginTop: "1.5rem", color: "var(--brand-primary)", fontWeight: 600 }}>Answers ({answers.length})</h2>
        <form onSubmit={handleAddAnswer} style={{ marginBottom: "1.5rem" }}>
          <textarea
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Write an answer..."
            rows={3}
            style={{
              width: "100%",
              padding: "0.625rem 0.75rem",
              marginBottom: "0.5rem",
              border: "1px solid var(--border-color)",
              borderRadius: 6,
              resize: "vertical",
              fontSize: "1rem",
            }}
          />
          <button type="submit" style={btn("var(--brand-secondary)")} disabled={submitting}>
            {submitting ? "Posting..." : "Add Answer"}
          </button>
        </form>

        {answers.map((a) => (
          <div key={a.id} style={card}>
            <p style={{ margin: 0, color: "var(--text-primary)", lineHeight: "1.6" }}>{a.answer}</p>
            <p style={{ margin: "0.5rem 0 0", fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Status: {a.status} | Likes: {a.likeCount ?? 0}
            </p>
            <div style={{ marginTop: "0.5rem" }}>
              <button type="button" style={btn("var(--brand-accent)")} onClick={(e) => handleLike(a.id, e)} title="Like">
                Like ({a.likeCount ?? 0})
              </button>
              {a.status === "Pending Approval" && (
                <>
                  <button type="button" style={btn("var(--brand-success)")} onClick={(e) => handleMarkApprovedAnswer(a.id, e)}>
                    Mark Approved
                  </button>
                  <button type="button" style={btn("var(--brand-warning)")} onClick={(e) => handleDeactivateAnswer(a.id, e)}>
                    Deactivate
                  </button>
                </>
              )}
              {a.status !== "Approved" && a.status !== "Deactivated" && a.status !== "Completed" && (
                <Link to={`/answers/${a.id}/edit`} style={btn("var(--brand-secondary)")}>
                  Edit
                </Link>
              )}
              {a.status === "Deactivated" ? (
                <button type="button" style={btn("var(--brand-accent)")} onClick={(e) => handleDeleteAnswer(a.id, e)}>
                  Delete
                </button>
              ) : (
                a.status !== "Deleted" && (
                  <button type="button" style={btn("var(--brand-accent)")} onClick={(e) => handleDeleteAnswer(a.id, e)}>
                    Delete
                  </button>
                )
              )}
            </div>

            <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--border-color)" }}>
              <strong style={{ fontSize: "0.9rem", color: "var(--text-primary)" }}>Comments ({(commentsByAnswer[a.id] || []).length})</strong>
              {(commentsByAnswer[a.id] || []).map((c) => (
                <div key={c.id} style={{ marginTop: "0.5rem", padding: "0.75rem", background: "var(--bg-light)", borderRadius: 6, fontSize: "0.9rem", color: "var(--text-primary)" }}>
                  {c.comment}
                </div>
              ))}
              <form onSubmit={(e) => handleAddCommentSubmit(a.id, e)} style={{ marginTop: "0.5rem" }}>
                <input
                  type="text"
                  value={newCommentByAnswer[a.id] || ""}
                  onChange={(e) => setNewCommentByAnswer((prev) => ({ ...prev, [a.id]: e.target.value }))}
                  placeholder="Add a comment..."
                  style={{
                    width: "100%",
                    maxWidth: 400,
                    padding: "0.5rem 0.75rem",
                    marginRight: "0.5rem",
                    border: "1px solid var(--border-color)",
                    borderRadius: 6,
                    fontSize: "0.9rem",
                  }}
                />
                <button type="submit" style={btn("var(--text-secondary)")}>
                  Comment
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </ProtectedRoute>
  );
}

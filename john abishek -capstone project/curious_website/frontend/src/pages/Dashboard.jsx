import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { questionsApi, answersApi, commentsApi } from "../sprint2/crudApi";

export default function Dashboard() {
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [questionsMap, setQuestionsMap] = useState({});
  const [allAnswers, setAllAnswers] = useState([]);
  const [answersByQuestion, setAnswersByQuestion] = useState({});
  const [commentsByAnswer, setCommentsByAnswer] = useState({});
  const [newAnswers, setNewAnswers] = useState({});
  const [newComments, setNewComments] = useState({});
  const [newQuestion, setNewQuestion] = useState({ description: "", questionType: "Post" });
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [showAnswerModal, setShowAnswerModal] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState({});
  const [successMessages, setSuccessMessages] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const allQuestions = await questionsApi.list();
      const approvedQuestions = user?.role === "admin" 
        ? allQuestions 
        : allQuestions.filter(q => q.status === "Approved");
      
      setQuestions(approvedQuestions);
      allQuestions.forEach(q => {
        qMap[q.id] = q;
      });
      setQuestionsMap(qMap);
      if (user?.role === "admin") {
        const allAnswersList = await answersApi.list().catch(() => []);
        setAllAnswers(allAnswersList);
      }
      const questionIds = approvedQuestions.map(q => q.id);
      const answersByQ = await Promise.all(
        questionIds.map(qId => 
          answersApi.list(qId).catch(() => [])
        )
      );

      const answersMap = {};
      answersByQ.forEach((answerList, index) => {
        const filteredAnswers = user?.role === "admin" 
          ? answerList 
          : answerList.filter(a => a.status === "Approved");
        answersMap[questionIds[index]] = filteredAnswers;
      });
      setAnswersByQuestion(answersMap);

      const allAnswerIds = answersByQ.flat().map(a => a.id);
      if (allAnswerIds.length > 0) {
        const allComments = await Promise.all(
          allAnswerIds.map(aId => 
            commentsApi.list(aId).catch(() => [])
          )
        );
        const commentsMap = {};
        allAnswerIds.forEach((aId, index) => {
          commentsMap[aId] = allComments[index] || [];
        });
        setCommentsByAnswer(commentsMap);
      }
    } catch (err) {
      console.error("Failed to load data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePostQuestion = async (e) => {
    e.preventDefault();
    const { description, questionType } = newQuestion;
    if (!description.trim()) {
      alert("Please fill in the description");
      return;
    }

    setSubmitting(prev => ({ ...prev, newQuestion: true }));
    try {
      await questionsApi.create({ description, questionType });
      setNewQuestion({ description: "", questionType: "Post" });
      setShowQuestionForm(false);
      setSuccessMessages(prev => ({ ...prev, newQuestion: "Your question has been submitted for approval." }));
      setTimeout(() => {
        setSuccessMessages(prev => ({ ...prev, newQuestion: "" }));
      }, 5000);
      await loadData();
    } catch (err) {
      alert(err.message || "Failed to post question");
    } finally {
      setSubmitting(prev => ({ ...prev, newQuestion: false }));
    }
  };

  const handleAddAnswer = async (questionId, e) => {
    e.preventDefault();
    const answerText = newAnswers[questionId]?.trim();
    if (!answerText) return;

    setSubmitting(prev => ({ ...prev, [`answer-${questionId}`]: true }));
    try {
      await answersApi.create({ answer: answerText, questionId });
      setNewAnswers(prev => ({ ...prev, [questionId]: "" }));
      setShowAnswerModal(null); 
      setSuccessMessages(prev => ({ ...prev, [questionId]: "Your answer has been submitted for approval." }));
      setTimeout(() => {
        setSuccessMessages(prev => ({ ...prev, [questionId]: "" }));
      }, 5000);
      await loadData();
    } catch (err) {
      alert(err.message || "Failed to add answer");
    } finally {
      setSubmitting(prev => ({ ...prev, [`answer-${questionId}`]: false }));
    }
  };

  const handleAddComment = async (answerId, e) => {
    e.preventDefault();
    const commentText = newComments[answerId]?.trim();
    if (!commentText) return;

    setSubmitting(prev => ({ ...prev, [`comment-${answerId}`]: true }));
    try {
      await commentsApi.create({ comment: commentText, answerId });
      setNewComments(prev => ({ ...prev, [answerId]: "" }));
      const comments = await commentsApi.list(answerId);
      setCommentsByAnswer(prev => ({ ...prev, [answerId]: comments }));
    } catch (err) {
      alert(err.message || "Failed to add comment");
    } finally {
      setSubmitting(prev => ({ ...prev, [`comment-${answerId}`]: false }));
    }
  };

  const handleLike = async (answerId, e) => {
    e.preventDefault();
    try {
      const updatedAnswer = await answersApi.like(answerId);
      setAnswersByQuestion(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(qId => {
          updated[qId] = updated[qId].map(a => 
            a.id === answerId ? updatedAnswer : a
          );
        });
        return updated;
      });
      if (user?.role === "admin") {
        setAllAnswers(prev => prev.map(a => a.id === answerId ? updatedAnswer : a));
      }
    } catch (err) {
      alert(err.message || "Failed to like answer");
    }
  };

  const handleQuestionAction = async (action, questionId, e) => {
    e.preventDefault();
    try {
      let updatedQuestion;
      switch (action) {
        case "complete":
          updatedQuestion = await questionsApi.markCompleted(questionId);
          break;
        case "approve":
          updatedQuestion = await questionsApi.markApproved(questionId);
          break;
        case "deactivate":
          updatedQuestion = await questionsApi.deactivate(questionId);
          break;
        case "delete":
          if (!window.confirm("Permanently delete this question?")) return;
          await questionsApi.remove(questionId);
          setQuestions(prev => prev.filter(q => q.id !== questionId));
          return;
        default:
          return;
      }
      setQuestions(prev => prev.map(q => q.id === questionId ? updatedQuestion : q));
    } catch (err) {
      alert(err.message || "Failed to perform action");
    }
  };

  const handleAnswerAction = async (action, answerId, e) => {
    e.preventDefault();
    try {
      let updatedAnswer;
      switch (action) {
        case "approve":
          updatedAnswer = await answersApi.markApproved(answerId);
          break;
        case "deactivate":
          updatedAnswer = await answersApi.deactivate(answerId);
          break;
        case "delete":
          if (!window.confirm("Permanently delete this answer?")) return;
          await answersApi.remove(answerId);
          setAllAnswers(prev => prev.filter(a => a.id !== answerId));
          
          setAnswersByQuestion(prev => {
            const updated = { ...prev };
            Object.keys(updated).forEach(qId => {
              updated[qId] = updated[qId].filter(a => a.id !== answerId);
            });
            return updated;
          });
          return;
        default:
          return;
      }
      setAllAnswers(prev => prev.map(a => a.id === answerId ? updatedAnswer : a));
      
      setAnswersByQuestion(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(qId => {
          updated[qId] = updated[qId].map(a => a.id === answerId ? updatedAnswer : a);
        });
        return updated;
      });
      await loadData();
    } catch (err) {
      alert(err.message || "Failed to perform action");
    }
  };

  const s = {
    wrap: { maxWidth: user?.role === "admin" ? 1400 : 900, margin: "0 auto", padding: "2rem" },
    grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "flex-start" },
    card: { padding: "1.5rem", marginBottom: "1.5rem", background: "#F5E6D3", borderRadius: 12, boxShadow: "var(--shadow-md)", border: "2px solid #D4A574" },
    ansCard: { padding: "1rem", marginTop: "1rem", marginLeft: "1rem", border: "3px solid #D4A574", borderRadius: 8, background: "#F0E8D8" },
    input: { width: "100%", padding: "0.625rem 0.75rem", border: "1px solid var(--border-color)", borderRadius: 6, fontSize: "0.9rem", marginTop: "0.5rem" },
    h2: { marginTop: 0, color: "var(--brand-primary)", fontWeight: 600 },
    h3: { marginTop: 0, color: "var(--brand-primary)", fontWeight: 600, fontSize: "1.1rem" },
    meta: { fontSize: "0.85rem", color: "var(--text-muted)" },
    flex: { display: "flex", gap: "0.5rem", flexWrap: "wrap" },
    success: { padding: "0.75rem", background: "#d1fae5", color: "#065f46", borderRadius: 6, fontSize: "0.9rem" },
    qHead: { marginBottom: "1rem", paddingBottom: "0.75rem", borderBottom: "1px solid var(--border-color)" },
    label: { display: "block", marginBottom: "0.5rem", fontWeight: 500 },
    commentItem: { marginTop: "0.5rem", padding: "0.75rem", background: "var(--bg-white)", borderRadius: 6, fontSize: "0.9rem" },
    commentSec: { marginTop: "1rem", paddingTop: "1rem", borderTop: "3px solid var(--border-color)" },
    btn: (c, link) => ({ padding: "0.4rem 0.8rem", border: "none", borderRadius: 6, cursor: "pointer", fontSize: "0.85rem", background: c, color: "#fff", fontWeight: 500, marginTop: "0.5rem", marginRight: "0.5rem", ...(link && { textDecoration: "none", display: "inline-block" }) }),
  };

  if (loading) {
    return (
      <div style={s.wrap}>
        <p style={{ color: "var(--text-secondary)" }}>Loading...</p>
      </div>
    );
  }

  
  if (user?.role === "admin") {
    return (
      <div style={s.wrap}>
        <h2 style={{ ...s.h2, marginBottom: "1.5rem" }}>Questions ({questions.length})</h2>
        {questions.length === 0 ? (
          <div style={s.card}>
            <p style={{ color: "var(--text-secondary)" }}>No questions available.</p>
          </div>
        ) : (
          questions.map((question) => {
            const answers = answersByQuestion[question.id] || [];
            return (
            <div key={question.id} style={s.card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                <h3 style={{ ...s.h3, marginBottom: 0, flex: 1 }}>{question.description}</h3>
                {user?.role !== "admin" && (
                  <button
                    type="button"
                    onClick={() => setShowAnswerModal(question.id)}
                    style={{
                      padding: "0.5rem 1rem",
                      background: "#8B6F47",
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      marginLeft: "1rem",
                    }}
                  >
                    Add Answer
                  </button>
                )}
              </div>
              {successMessages[question.id] && (
                <div style={{
                  padding: "1rem",
                  background: "#d1fae5",
                  color: "#065f46",
                  borderRadius: 8,
                  marginBottom: "1rem",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  border: "2px solid #10b981",
                }}>
                  {successMessages[question.id]}
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "1rem" }}>
                <p style={{ ...s.meta, marginBottom: 0, fontWeight: 600 }}>
                  <span style={{ color: "#8B7355" }}>Type:</span> <span style={{ color: "#6B4423", fontWeight: 600 }}>{question.questionType}</span>
                </p>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "flex-end", alignItems: "center" }}>
                  <p style={{ ...s.meta, marginBottom: 0, fontWeight: 600 }}>
                    <span style={{ color: "#8B7355" }}>Status:</span> <span style={{ 
                      color: question.status === "Approved" ? "#27ae60" : question.status === "Pending Approval" ? "#6B4423" : question.status === "Completed" ? "#3498db" : "#e74c3c",
                      fontWeight: 600 
                    }}>{question.status}</span>
                  </p>
                  {question.status === "Approved" && (
                    <button
                      type="button"
                      onClick={(e) => handleQuestionAction("complete", question.id, e)}
                      style={s.btn("var(--btn-success-alt)")}
                    >
                      Complete
                    </button>
                  )}
                  {question.status === "Pending Approval" && (
                    <>
                      <button
                        type="button"
                        onClick={(e) => handleQuestionAction("approve", question.id, e)}
                        style={s.btn("var(--btn-approve)")}
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleQuestionAction("deactivate", question.id, e)}
                        style={s.btn("var(--btn-warning-alt)")}
                      >
                        Deactivate
                      </button>
                    </>
                  )}
                  {question.status !== "Approved" && question.status !== "Deactivated" && question.status !== "Completed" && (
                    <Link to={`/questions/${question.id}/edit`} style={s.btn("var(--btn-edit)", true)}>
                      Edit
                    </Link>
                  )}
                  {question.status === "Deactivated" ? (
                    <button
                      type="button"
                      onClick={(e) => handleQuestionAction("delete", question.id, e)}
                      style={s.btn("var(--btn-danger-alt)")}
                    >
                      Delete
                    </button>
                  ) : (
                    question.status !== "Deleted" && (
                      <button
                        type="button"
                        onClick={(e) => handleQuestionAction("delete", question.id, e)}
                        style={s.btn("var(--btn-danger-alt)")}
                      >
                        Delete
                      </button>
                    )
                  )}
                </div>
              </div>

                {/* Answers Section */}
                <div style={{ marginTop: "1.5rem" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 600 }}>
                    Answers ({answers.length})
                  </h3>

                  {answers.map((answer) => {
                    const comments = commentsByAnswer[answer.id] || [];
                    return (
                      <div key={answer.id} style={s.ansCard}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                          <div style={{ flex: 1 }}>
                            <p style={{ margin: 0, color: "var(--text-primary)", whiteSpace: "pre-wrap" }}>
                              {answer.answer}
                            </p>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
                            <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)", fontWeight: 500 }}>
                              Likes: {answer.likeCount ?? 0}
                            </span>
                            <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>
                              <span style={{ color: "#8B7355" }}>Status:</span> <span style={{ 
                                color: answer.status === "Approved" ? "#27ae60" : answer.status === "Pending Approval" ? "#6B4423" : answer.status === "Completed" ? "#3498db" : "#e74c3c",
                                fontWeight: 600 
                              }}>{answer.status}</span>
                            </span>
                            {answer.status === "Pending Approval" && (
                              <button
                                type="button"
                                onClick={(e) => handleAnswerAction("approve", answer.id, e)}
                                style={s.btn("var(--btn-approve)")}
                              >
                                Approve
                              </button>
                            )}
                            {answer.status === "Deactivated" ? (
                              <button
                                type="button"
                                onClick={(e) => handleAnswerAction("delete", answer.id, e)}
                                style={s.btn("var(--btn-danger-alt)")}
                              >
                                Delete
                              </button>
                            ) : (
                              answer.status !== "Deleted" && (
                                <button
                                  type="button"
                                  onClick={(e) => handleAnswerAction("delete", answer.id, e)}
                                  style={s.btn("var(--btn-danger-alt)")}
                                >
                                  Delete
                                </button>
                              )
                            )}
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.75rem", justifyContent: "flex-end" }}>
                          {answer.status === "Pending Approval" && (
                            <button
                              type="button"
                              onClick={(e) => handleAnswerAction("deactivate", answer.id, e)}
                              style={s.btn("var(--btn-warning-alt)")}
                            >
                              Deactivate
                            </button>
                          )}
                          {answer.status !== "Approved" && answer.status !== "Deactivated" && answer.status !== "Completed" && (
                            <Link to={`/answers/${answer.id}/edit`} style={s.btn("var(--btn-edit)", true)}>
                              Edit
                            </Link>
                          )}
                        </div>

                        {/* Comments Section */}
                        <div style={s.commentSec}>
                          <strong style={{ fontSize: "0.9rem" }}>
                            Comments ({comments.length})
                          </strong>
                          {comments.map((comment) => (
                            <div
                              key={comment.id}
                              style={s.commentItem}
                            >
                              {comment.comment}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }

  
  return (
    <div style={s.wrap}>
      {/* Post Question Form */}
      {!showQuestionForm ? (
        <div style={{ marginBottom: "2rem", textAlign: "center" }}>
          <button
            type="button"
            onClick={() => setShowQuestionForm(true)}
            style={{ padding: "0.75rem 1.5rem", background: "var(--brand-primary)", color: "#fff", border: "none", borderRadius: 8, fontSize: "1rem", fontWeight: 500, cursor: "pointer" }}
          >
            Post a Question
          </button>
        </div>
      ) : (
        <div style={{ ...s.card, marginBottom: "2rem" }}>
          <h2 style={{ ...s.h2, marginBottom: "1rem" }}>Post a Question</h2>
          {successMessages.newQuestion && (
            <div style={{ ...s.success, marginBottom: "1rem" }}>
              {successMessages.newQuestion}
            </div>
          )}
          <form onSubmit={handlePostQuestion}>
            <label style={s.label}>Description</label>
            <textarea
              value={newQuestion.description}
              onChange={(e) => setNewQuestion(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter question description..."
              required
              rows={4}
              style={s.input}
            />
            <label style={{ ...s.label, marginTop: "1rem" }}>Type</label>
            <select
              value={newQuestion.questionType}
              onChange={(e) => setNewQuestion(prev => ({ ...prev, questionType: e.target.value }))}
              style={{ ...s.input, width: "auto", marginBottom: "1rem" }}
            >
              <option value="Post">Post</option>
              <option value="Discussion">Discussion</option>
            </select>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                type="submit"
                disabled={submitting.newQuestion}
                style={s.btn("var(--btn-primary-alt)")}
              >
                {submitting.newQuestion ? "Submitting..." : "Submit Question"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowQuestionForm(false);
                  setNewQuestion({ description: "", questionType: "Post" });
                }}
                style={s.btn("var(--text-secondary)")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {questions.length === 0 ? (
        <div style={s.card}>
          <p style={{ color: "var(--text-secondary)" }}>No approved questions available.</p>
        </div>
      ) : (
        questions.map((question) => {
          const answers = answersByQuestion[question.id] || [];
          return (
            <div key={question.id} style={s.card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                <h2 style={{ ...s.h2, marginBottom: 0, flex: 1 }}>
                  {question.topic || question.description}
                </h2>
                {user?.role !== "admin" && (
                  <button
                    type="button"
                    onClick={() => setShowAnswerModal(question.id)}
                    style={{
                      padding: "0.5rem 1rem",
                      background: "#8B6F47",
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      marginLeft: "1rem",
                    }}
                  >
                    Add Answer
                  </button>
                )}
              </div>
              {user?.role === "admin" && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "1rem" }}>
                  <p style={{ ...s.meta, marginBottom: 0, fontWeight: 600 }}>
                    <span style={{ color: "#8B7355" }}>Type:</span> <span style={{ color: "#6B4423", fontWeight: 600 }}>{question.questionType}</span>
                  </p>
                  <p style={{ ...s.meta, marginBottom: 0, fontWeight: 600 }}>
                    <span style={{ color: "#8B7355" }}>Status:</span> <span style={{ 
                      color: question.status === "Approved" ? "#27ae60" : question.status === "Pending Approval" ? "#6B4423" : question.status === "Completed" ? "#3498db" : "#e74c3c",
                      fontWeight: 600 
                    }}>{question.status}</span>
                  </p>
                </div>
              )}
              {successMessages[question.id] && (
                <div style={{
                  padding: "1rem",
                  background: "#d1fae5",
                  color: "#065f46",
                  borderRadius: 8,
                  marginBottom: "1rem",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  border: "2px solid #10b981",
                }}>
                  {successMessages[question.id]}
                </div>
              )}

              <div style={{ marginTop: "1.5rem" }}>
                        <h3 style={{ fontSize: "1rem", fontWeight: 600 }}>
                  Answers ({answers.length})
                </h3>

                {answers.map((answer) => {
                  const comments = commentsByAnswer[answer.id] || [];
                  return (
                    <div key={answer.id} style={s.ansCard}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                        <p style={{ margin: 0, color: "var(--text-primary)", whiteSpace: "pre-wrap", flex: 1 }}>
                          {answer.answer}
                        </p>
                        <button
                          type="button"
                          onClick={(e) => handleLike(answer.id, e)}
                          style={s.btn("var(--btn-like)")}
                        >
                          Like ({answer.likeCount ?? 0})
                        </button>
                      </div>
                      {user?.role === "admin" && (
                        <p style={{ fontSize: "0.8rem", marginTop: "0.5rem", fontWeight: 600 }}>
                          <span style={{ color: "#8B7355" }}>Status:</span> <span style={{ 
                            color: answer.status === "Approved" ? "#27ae60" : answer.status === "Pending Approval" ? "#f39c12" : answer.status === "Completed" ? "#3498db" : "#e74c3c",
                            fontWeight: 600 
                          }}>{answer.status}</span>
                        </p>
                      )}

                      <div style={s.commentSec}>
                        <strong style={{ fontSize: "0.9rem" }}>
                          Comments ({comments.length})
                        </strong>
                        {comments.map((comment) => (
                          <div
                            key={comment.id}
                            style={s.commentItem}
                          >
                            {comment.comment}
                          </div>
                        ))}
                        <form onSubmit={(e) => handleAddComment(answer.id, e)} style={{ marginTop: "0.75rem", position: "relative", maxWidth: "400px" }}>
                          <input
                            type="text"
                            value={newComments[answer.id] || ""}
                            onChange={(e) =>
                              setNewComments((prev) => ({ ...prev, [answer.id]: e.target.value }))
                            }
                            placeholder="Add a comment..."
                            style={{
                              width: "100%",
                              padding: "0.5rem 4rem 0.5rem 0.75rem",
                              border: "1px solid var(--border-color)",
                              borderRadius: 6,
                              fontSize: "0.85rem",
                              marginTop: "0.5rem",
                            }}
                          />
                          <button
                            type="submit"
                            disabled={submitting[`comment-${answer.id}`]}
                            style={{
                              position: "absolute",
                              right: "4px",
                              top: "calc(0.5rem + 4px)",
                              padding: "0.4rem 0.75rem",
                              border: "none",
                              borderRadius: 4,
                              cursor: "pointer",
                              fontSize: "0.8rem",
                              background: "var(--btn-info-alt)",
                              color: "#fff",
                              fontWeight: 500,
                            }}
                          >
                            {submitting[`comment-${answer.id}`] ? "Posting..." : "Comment"}
                          </button>
                        </form>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      )}

      {/* Answer Modal */}
      {showAnswerModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowAnswerModal(null)}
        >
          <div
            style={{
              background: "var(--bg-white)",
              borderRadius: 12,
              padding: "2rem",
              maxWidth: "600px",
              width: "90%",
              maxHeight: "80vh",
              overflow: "auto",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginTop: 0, color: "var(--brand-primary)", fontWeight: 600 }}>
              Add Answer
            </h2>
            {successMessages[showAnswerModal] && (
              <div style={{ ...s.success, marginBottom: "1rem" }}>
                {successMessages[showAnswerModal]}
              </div>
            )}
            <form onSubmit={(e) => handleAddAnswer(showAnswerModal, e)}>
              <textarea
                value={newAnswers[showAnswerModal] || ""}
                onChange={(e) =>
                  setNewAnswers((prev) => ({ ...prev, [showAnswerModal]: e.target.value }))
                }
                placeholder="Write your answer..."
                rows={6}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid var(--border-color)",
                  borderRadius: 6,
                  fontSize: "1rem",
                  marginBottom: "1rem",
                  resize: "vertical",
                }}
                required
              />
              <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowAnswerModal(null);
                    setNewAnswers((prev) => ({ ...prev, [showAnswerModal]: "" }));
                  }}
                  style={{
                    padding: "0.75rem 1.5rem",
                    background: "var(--text-secondary)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontWeight: 500,
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting[`answer-${showAnswerModal}`]}
                  style={{
                    padding: "0.75rem 1.5rem",
                    background: "var(--btn-primary-alt)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontWeight: 500,
                  }}
                >
                  {submitting[`answer-${showAnswerModal}`] ? "Posting..." : "Submit Answer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

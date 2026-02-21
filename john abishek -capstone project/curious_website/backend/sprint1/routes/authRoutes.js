const express = require("express");
const router = express.Router();
const auth = require("../controllers/authController");
const welcome = require("../controllers/welcomeController");
const { isAuthenticated } = require("../../middlewares/authMiddleware");

router.get("/", welcome.welcome);
router.get("/register", auth.showRegister);
router.post("/register", auth.register);
router.get("/login", auth.showLogin);
router.post("/login", auth.login);
router.get("/dashboard", isAuthenticated, async (req, res) => {
  const { Question, Answer, User, Comment } = require("../models");
  const { Op } = require("sequelize");
  try {
    let pendingQuestions = [];
    let pendingAnswers = [];
    let allQuestions = [];
    let allAnswers = [];
    const searchQuery = req.query.search ? req.query.search.trim() : null;
    
    
    let questionWhere = {};
    if (req.session.user && req.session.user.role === "admin") {
      
      if (searchQuery) {
        questionWhere.description = {
          [Op.like]: `%${searchQuery}%`
        };
      }
    } else {
      if (searchQuery) {
        questionWhere[Op.and] = [
          { status: "Approved" },
          { description: { [Op.like]: `%${searchQuery}%` } }
        ];
      } else {
        questionWhere.status = "Approved";
      }
    }
    
    allQuestions = await Question.findAll({
      where: questionWhere,
      order: [["createdAt", "ASC"]],
    });
    
    const answers = await Answer.findAll({
      order: [["createdAt", "ASC"]],
    });
    
    const userIds = new Set();
    allQuestions.forEach(q => userIds.add(q.questionedBy));
    answers.forEach(a => userIds.add(a.answeredBy));
    
    const users = await User.findAll({
      where: { id: Array.from(userIds) },
    });
    const userMap = {};
    users.forEach(u => {
      userMap[u.id] = u.toJSON();
    });
    
    allQuestions = allQuestions.map(q => {
      const questionData = q.toJSON();
      questionData.questionCreator = userMap[questionData.questionedBy] || null;
      return questionData;
    });
    
    const questionIds = [...new Set(answers.map(a => a.questionId))];
    const questions = await Question.findAll({
      where: { id: questionIds },
    });
    const questionMap = {};
    questions.forEach(q => {
      questionMap[q.id] = q.toJSON();
    });
    
    allAnswers = answers.map(a => {
      const answerData = a.toJSON ? a.toJSON() : a;
      answerData.question = questionMap[answerData.questionId] || null;
      answerData.answerAuthor = userMap[answerData.answeredBy] || null;
      return answerData;
    });
    
    const answerIds = answers.map(a => a.id);
    const comments = answerIds.length > 0 ? await Comment.findAll({
      where: { answerId: answerIds },
      order: [["createdAt", "ASC"]],
    }) : [];
    
    const commentUserIds = [...new Set(comments.map(c => c.commentedBy).filter(Boolean))];
    if (commentUserIds.length > 0) {
      const commentUsers = await User.findAll({
        where: { id: commentUserIds },
      });
      commentUsers.forEach(u => {
        userMap[u.id] = u.toJSON();
      });
    }
    
    const commentsByAnswer = {};
    comments.forEach(c => {
      const commentData = c.toJSON();
      commentData.commentAuthor = userMap[commentData.commentedBy] || null;
      if (!commentsByAnswer[commentData.answerId]) {
        commentsByAnswer[commentData.answerId] = [];
      }
      commentsByAnswer[commentData.answerId].push(commentData);
    });
    
    allAnswers = allAnswers.map(a => {
      a.comments = commentsByAnswer[a.id] || [];
      return a;
    });
    
    const answersByQuestion = {};
    allAnswers.forEach(a => {
      if (!answersByQuestion[a.questionId]) {
        answersByQuestion[a.questionId] = [];
      }
      answersByQuestion[a.questionId].push(a);
    });
    
    
    allQuestions = allQuestions.map(q => {
      q.answers = answersByQuestion[q.id] || [];
      return q;
    });
    
    if (req.session.user && req.session.user.role === "admin") {
      pendingQuestions = await Question.findAll({
        where: { status: "Pending Approval" },
        order: [["createdAt", "ASC"]],
      });
      
      pendingQuestions = pendingQuestions.map(q => {
        const questionData = q.toJSON();
        questionData.questionCreator = userMap[questionData.questionedBy] || null;
        return questionData;
      });
      
      const pendingAnswersData = await Answer.findAll({
        where: { status: "Pending Approval" },
        order: [["createdAt", "DESC"]],
      });
      
      pendingAnswers = pendingAnswersData.map(a => {
        const answerData = a.toJSON ? a.toJSON() : a;
        answerData.question = questionMap[answerData.questionId] || null;
        answerData.answerAuthor = userMap[answerData.answeredBy] || null;
        return answerData;
      });
    }
    
    res.render("dashboard", {
      user: req.session.user,
      allQuestions: allQuestions,
      allAnswers: allAnswers,
      pendingQuestions: pendingQuestions,
      pendingAnswers: pendingAnswers,
      success: req.query.success || null,
      error: req.query.error || null,
      searchQuery: searchQuery || null,
    });
  } catch (err) {
    res.render("dashboard", {
      user: req.session.user,
      allQuestions: [],
      allAnswers: [],
      pendingQuestions: [],
      pendingAnswers: [],
      error: err.message,
      success: null,
      searchQuery: null,
    });
  }
});
router.get("/logout", auth.logout);
router.post("/logout", auth.logout);
router.get("/me", auth.me);

module.exports = router;

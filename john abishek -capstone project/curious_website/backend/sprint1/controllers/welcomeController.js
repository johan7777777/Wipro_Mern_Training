const { Question } = require("../models");

exports.welcome = async (req, res) => {
  try {
    
    const approvedQuestions = await Question.findAll({
      where: { status: "Approved" },
      order: [["createdAt", "DESC"]],
    });
    
    res.render("welcome", {
      user: req.session.user || null,
      approvedQuestions: approvedQuestions.map(q => q.toJSON()),
    });
  } catch (err) {
    res.render("welcome", {
      user: req.session.user || null,
      approvedQuestions: [],
      error: err.message,
    });
  }
};

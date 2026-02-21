const { Answer, Question, User } = require("../../sprint1/models");

exports.list = async (req, res) => {
  try {
    const { questionId } = req.query;
    const where = questionId ? { questionId: parseInt(questionId, 10) } : {};
    const answers = await Answer.findAll({
      where,
      order: [["createdAt", "DESC"]],
    });
    res.json(answers.map((a) => a.toJSON()));
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to list answers" });
  }
};

exports.getOne = async (req, res) => {
  try {
    const answer = await Answer.findByPk(req.params.id);
    if (!answer) return res.status(404).json({ message: "Answer not found" });
    res.json(answer.toJSON());
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to get answer" });
  }
};

exports.create = async (req, res) => {
  try {
    const { answer, questionId } = req.body;
    if (!answer || !questionId) {
      return res.status(400).json({ message: "answer and questionId are required" });
    }
    const question = await Question.findByPk(questionId);
    if (!question) return res.status(404).json({ message: "Question not found" });
    const newAnswer = await Answer.create({
      answer,
      questionId,
      answeredBy: req.session.userId,
    });
    res.status(201).json(newAnswer.toJSON());
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to create answer" });
  }
};

const update = async (req, res) => {
  try {
    const answer = await Answer.findByPk(req.params.id);
    if (!answer) return res.status(404).json({ message: "Answer not found" });
    
    const user = await User.findByPk(req.session.userId);
    if (!user) return res.status(401).json({ message: "User not found" });
    
    const { answer: answerText, status, approvedBy } = req.body;
    
    if (user.role === "user") {
      if (answer.answeredBy !== req.session.userId) {
        return res.status(403).json({ message: "You can only edit your own answers" });
      }
      if (answer.status !== "Pending Approval") {
        return res.status(403).json({ message: "You can only edit answers before admin approval" });
      }
      
      if (answerText != null) answer.answer = answerText;
    } else {
      
      if (answerText != null) answer.answer = answerText;
      if (status != null) answer.status = status;
      if (approvedBy != null) answer.approvedBy = approvedBy;
    }
    
    await answer.save();
    res.json(answer.toJSON());
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to update answer" });
  }
};

exports.update = update;

exports.remove = async (req, res) => {
  try {
    const answer = await Answer.findByPk(req.params.id);
    if (!answer) return res.status(404).json({ message: "Answer not found" });
    
    
    const user = await User.findByPk(req.session.userId);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can remove answers" });
    }
    
    await answer.destroy();
    res.json({ message: "Answer deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to delete answer" });
  }
};

exports.deactivate = async (req, res) => {
  try {
    const answer = await Answer.findByPk(req.params.id);
    if (!answer) return res.status(404).json({ message: "Answer not found" });
    
    
    const user = await User.findByPk(req.session.userId);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can deactivate answers" });
    }
    
    
    answer.status = "Deactivated";
    await answer.save();
    res.json(answer.toJSON());
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to deactivate answer" });
  }
};

exports.markApproved = async (req, res) => {
  try {
    const answer = await Answer.findByPk(req.params.id);
    if (!answer) return res.status(404).json({ message: "Answer not found" });
    
    const user = await User.findByPk(req.session.userId);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can approve answers" });
    }
    
    answer.status = "Approved";
    answer.approvedBy = req.session.userId;
    await answer.save();
    res.json(answer.toJSON());
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to mark as approved" });
  }
};

exports.like = async (req, res) => {
  try {
    const answer = await Answer.findByPk(req.params.id);
    if (!answer) return res.status(404).json({ message: "Answer not found" });
    answer.likeCount = (answer.likeCount || 0) + 1;
    await answer.save();
    res.json(answer.toJSON());
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to like answer" });
  }
};

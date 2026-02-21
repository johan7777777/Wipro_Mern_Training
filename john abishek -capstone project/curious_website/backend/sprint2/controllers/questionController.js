const { Question, User } = require("../../sprint1/models");

exports.list = async (req, res) => {
  try {
    const questions = await Question.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(questions.map((q) => {
      const json = q.toJSON();
      
      json.topic = json.description;
      return json;
    }));
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to list questions" });
  }
};

exports.getOne = async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });
    const json = question.toJSON();
    
    json.topic = json.description;
    res.json(json);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to get question" });
  }
};

exports.create = async (req, res) => {
  try {
    const { topic, description, questionType } = req.body;
    
    const questionDescription = description || topic || "";
    if (!questionDescription || !questionType) {
      return res.status(400).json({ message: "description (or topic) and questionType are required" });
    }
    const question = await Question.create({
      description: questionDescription,
      questionType: ["Post", "Discussion"].includes(questionType) ? questionType : "Post",
      questionedBy: req.session.userId,
    });
    const json = question.toJSON();
    json.topic = json.description;
    res.status(201).json(json);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to create question" });
  }
};

exports.update = async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });
    const user = await User.findByPk(req.session.userId);
    if (!user) return res.status(401).json({ message: "User not found" });
    
    if (user.role === "user") {
      if (question.questionedBy !== req.session.userId) {
        return res.status(403).json({ message: "You can only edit your own questions" });
      }
      if (question.status !== "Pending Approval") {
        return res.status(403).json({ message: "You can only edit questions before admin approval" });
      }
      
      const { topic, description, questionType } = req.body;
      if (description != null) question.description = description;
      else if (topic != null) question.description = topic;
      if (questionType != null && ["Post", "Discussion"].includes(questionType)) question.questionType = questionType;
    } else {
      
      const { topic, description, questionType, status } = req.body;
      if (description != null) question.description = description;
      else if (topic != null) question.description = topic;
      if (questionType != null && ["Post", "Discussion"].includes(questionType)) question.questionType = questionType;
      if (status != null && ["Pending Approval", "Approved", "Deactivated", "Completed"].includes(status)) question.status = status;
    }
    
    await question.save();
    const json = question.toJSON();
    json.topic = json.description;
    res.json(json);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to update question" });
  }
};

exports.deactivate = async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });
    
    const user = await User.findByPk(req.session.userId);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can deactivate questions" });
    }
    
    question.status = "Deactivated";
    await question.save();
    const json = question.toJSON();
    json.topic = json.description;
    res.json(json);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to deactivate question" });
  }
};

exports.markCompleted = async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });
    const user = await User.findByPk(req.session.userId);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can mark questions as completed" });
    }
    
    question.status = "Completed";
    await question.save();
    const json = question.toJSON();
    json.topic = json.description;
    res.json(json);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to mark as completed" });
  }
};

exports.markApproved = async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });
    
    const user = await User.findByPk(req.session.userId);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can approve questions" });
    }
    
    question.status = "Approved";
    question.approvedBy = req.session.userId;
    await question.save();
    const json = question.toJSON();
    json.topic = json.description;
    res.json(json);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to mark as approved" });
  }
};

exports.remove = async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });
    
    const user = await User.findByPk(req.session.userId);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can delete questions" });
    }
    
    await question.destroy();
    res.json({ message: "Question deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to delete question" });
  }
};
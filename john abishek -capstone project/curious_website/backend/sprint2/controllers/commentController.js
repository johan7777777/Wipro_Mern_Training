const { Comment } = require("../../sprint1/models");

exports.list = async (req, res) => {
  try {
    const { answerId } = req.query;
    const where = answerId ? { answerId: parseInt(answerId, 10) } : {};
    const comments = await Comment.findAll({
      where,
      order: [["createdAt", "ASC"]],
    });
    res.json(comments.map((c) => c.toJSON()));
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to list comments" });
  }
};

exports.create = async (req, res) => {
  try {
    const { comment, answerId } = req.body;
    if (!comment || !answerId) {
      return res.status(400).json({ message: "comment and answerId are required" });
    }
    const newComment = await Comment.create({
      comment: comment.trim(),
      answerId: parseInt(answerId, 10),
      commentedBy: req.session?.userId || null,
    });
    res.status(201).json(newComment.toJSON());
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to create comment" });
  }
};

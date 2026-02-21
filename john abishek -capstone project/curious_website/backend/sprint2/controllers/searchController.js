const { Op } = require("sequelize");
const sequelize = require("../../config/database");
const { User, Question, Answer } = require("../../sprint1/models");
exports.search = async (req, res) => {
  try {
    const { q, type = "all", status, questionType } = req.query;
    const keyword = (q || "").trim();
    const results = { questions: [], answers: [], users: [] };
    if (!keyword) {
      return res.json(results);
    }

    if (type === "all" || type === "questions") {
      const questionWhere = {
        [Op.or]: [
          { description: { [Op.like]: `%${keyword}%` } }
        ]
      };
      
      if (status) questionWhere.status = status;
      if (questionType) questionWhere.questionType = questionType;

      const questions = await Question.findAll({
        where: questionWhere,
        order: [["createdAt", "DESC"]],
        limit: 50,
      });
      results.questions = questions.map((q) => {
        const json = q.toJSON();
        json.topic = json.description;
        return json;
      });
    }

    if (type === "all" || type === "answers") {
      const answerWhere = buildKeywordFilter(["answer"]);
      if (status) answerWhere.status = status;

      const answers = await Answer.findAll({
        where: Object.keys(answerWhere).length ? answerWhere : {},
        order: [["createdAt", "DESC"]],
        limit: 50,
      });
      results.answers = answers.map((a) => a.toJSON());
    }

    if (type === "all" || type === "users") {
      const userWhere = buildKeywordFilter(["name", "email"]);
      if (status === "active" || status === "inactive") {
        userWhere.active = status === "active";
      }

      const users = await User.findAll({
        where: Object.keys(userWhere).length ? userWhere : {},
        attributes: { exclude: ["password"] },
        order: [["createdAt", "DESC"]],
        limit: 50,
      });
      results.users = users.map((u) => u.toJSON());
    }

    res.json(results);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: err.message || "Search failed" });
  }
};

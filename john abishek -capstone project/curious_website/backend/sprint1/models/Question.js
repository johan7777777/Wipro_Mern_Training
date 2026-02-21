const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Question = sequelize.define("Question", {
  description: { type: DataTypes.TEXT, allowNull: false },
  questionType: {
    type: DataTypes.ENUM("Post", "Discussion"),
    allowNull: false,
  },
  questionedBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "Users", key: "id" },
  },
  approvedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: "Users", key: "id" },
  },
  status: {
    type: DataTypes.ENUM(
      "Pending Approval",
      "Approved",
      "Deactivated",
      "Completed"
    ),
    defaultValue: "Pending Approval",
  },
});

module.exports = Question;

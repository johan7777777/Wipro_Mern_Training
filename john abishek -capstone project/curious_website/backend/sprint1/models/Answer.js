const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Answer = sequelize.define("Answer", {
  answer: { type: DataTypes.TEXT, allowNull: false },
  questionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "Questions", key: "id" },
  },
  answeredBy: {
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
    type: DataTypes.ENUM("Pending Approval", "Approved", "Deactivated"),
    defaultValue: "Pending Approval",
  },
  likeCount: { type: DataTypes.INTEGER, defaultValue: 0 },
});

module.exports = Answer;

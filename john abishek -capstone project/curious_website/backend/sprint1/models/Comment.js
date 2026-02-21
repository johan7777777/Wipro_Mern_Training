const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Comment = sequelize.define("Comment", {
  comment: { type: DataTypes.TEXT, allowNull: false },
  answerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "Answers", key: "id" },
  },
  commentedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: "Users", key: "id" },
  },
});

module.exports = Comment;

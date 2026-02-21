const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const User = sequelize.define("User", {
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING, allowNull: true },
  role: {
    type: DataTypes.ENUM("admin", "user"),
    defaultValue: "user",
  },
  active: { type: DataTypes.BOOLEAN, defaultValue: true }
});

module.exports = User;
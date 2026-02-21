const { Sequelize } = require("sequelize");
require("dotenv").config();

const dbName = process.env.DB_NAME;
if (!dbName) {
  throw new Error(
    "DB_NAME is not set. Add DB_NAME=your_database_name to your .env file (create the database in MySQL first)."
  );
}

const sequelize = new Sequelize(
  dbName,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false,
  }
);

module.exports = sequelize;
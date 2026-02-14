const {Sequelize} = require("sequelize");
require("dotenv").config(); // It will load the environment variables from the .env file into process.env


const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    { host: process.env.DB_HOST, dialect: "mysql", logging: false }

)

module.exports = sequelize;
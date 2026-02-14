const pool = require("../db/connection");

// ✅ GET ALL USERS
exports.getAllUsers = async (req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

// ✅ GET USER BY ID
exports.getUserById = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    next(error);
  }
};

// ✅ CREATE USER
exports.createUsers = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email required" });
    }

    await pool.query(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email]
    );

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};
const pool = require("../db/connection");

// Register new employee
const registerEmployee = async (req, res) => {
  try {
    const { name, email, department } = req.body;

    // Insert employee into database
    const [result] = await pool.execute(
      "INSERT INTO employees (name, email, department) VALUES (?, ?, ?)",
      [name, email, department]
    );

    res.status(201).json({
      success: true,
      message: "Employee registered successfully",
      data: {
        id: result.insertId,
        name,
        email,
        department
      }
    });
  } catch (error) {
    // Proper error handling - server should not crash
    console.error("Registration error:", error);
    res.status(500).json({
      error: "Failed to register employee. Please try again later"
    });
  }
};

// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    const [employees] = await pool.execute("SELECT * FROM employees");
    res.status(200).json({
      success: true,
      data: employees
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({
      error: "Failed to fetch employees. Please try again later"
    });
  }
};

module.exports = {
  registerEmployee,
  getAllEmployees
};

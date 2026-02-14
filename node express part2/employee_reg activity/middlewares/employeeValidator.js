const pool = require("../db/connection");

// Email format validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Middleware to validate employee data
const employeeValidator = async (req, res, next) => {
  try {
    const { name, email, department } = req.body;

    // Check if all fields are provided
    if (!name || !email || !department) {
      return res.status(400).json({
        error: "All fields are required: name, email, and department"
      });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({
        error: "Invalid email format. Please provide a valid email address"
      });
    }

    // Check if email already exists (uniqueness check)
    const [existing] = await pool.execute(
      "SELECT * FROM employees WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        error: "Email already exists. Please use a different email address"
      });
    }

    // If all validations pass, continue to next middleware/controller
    next();
  } catch (error) {
    // Proper error handling - server should not crash
    console.error("Validation error:", error);
    res.status(500).json({
      error: "Server error during validation. Please try again later"
    });
  }
};

module.exports = employeeValidator;

require("dotenv").config();
const express = require("express");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api/employees", employeeRoutes);

// Global error handler - prevents server crash
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    error: "Internal Server Error"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

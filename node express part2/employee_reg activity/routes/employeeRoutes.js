const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const employeeValidator = require("../middlewares/employeeValidator");

// Register employee (with validation middleware)
router.post("/register", employeeValidator, employeeController.registerEmployee);

// Get all employees
router.get("/", employeeController.getAllEmployees);

module.exports = router;

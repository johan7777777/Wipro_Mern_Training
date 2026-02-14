const salaryCalculator = require("./src/salaryCalculator");

// Get input from command line
const baseSalary = parseFloat(process.argv[2]);
const bonus = parseFloat(process.argv[3]);
const leaveDays = parseFloat(process.argv[4]);
const taxRate = parseFloat(process.argv[5]);

// Check if all inputs are provided
if (isNaN(baseSalary) || isNaN(bonus) || isNaN(leaveDays) || isNaN(taxRate)) {
  console.log("Usage: node calc-salary.js <baseSalary> <bonus> <leaveDays> <taxRate>");
  console.log("Example: node calc-salary.js 50000 5000 2 10");
  process.exit(1);
}

// Calculate total salary
const totalSalary = salaryCalculator.calculateTotalSalary(baseSalary, bonus, leaveDays, taxRate);
console.log(`Total Salary: ${totalSalary}`);

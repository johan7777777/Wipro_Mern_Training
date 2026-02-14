function calculateTotalSalary(baseSalary, bonus, leaveDays, taxRate) {
  // Calculate salary with bonus
  const salaryWithBonus = baseSalary + bonus;
  
  // Calculate daily salary
  const dailySalary = baseSalary / 30;
  
  //  leave days
  const leaveDeduction = dailySalary * leaveDays;
  const salaryAfterLeave = salaryWithBonus - leaveDeduction;
  
  //  tax
  const taxAmount = (salaryAfterLeave * taxRate) / 100;
  
  // Final salary after tax
  const totalSalary = salaryAfterLeave - taxAmount;
  
  return totalSalary;
}

function calculateWithBonus(baseSalary, bonus) {
  return baseSalary + bonus;
}

function calculateWithLeave(baseSalary, leaveDays) {
  const dailySalary = baseSalary / 30;
  const leaveDeduction = dailySalary * leaveDays;
  return baseSalary - leaveDeduction;
}

function calculateWithTax(baseSalary, taxRate) {
  const taxAmount = (baseSalary * taxRate) / 100;
  return baseSalary - taxAmount;
}

module.exports = {
  calculateTotalSalary,
  calculateWithBonus,
  calculateWithLeave,
  calculateWithTax
};

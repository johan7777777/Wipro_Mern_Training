const { expect } = require("chai");
const salaryCalculator = require("../src/salaryCalculator");

describe("Total Salary Calculation", () => {
  it("should calculate total salary with bonus, leave and tax", () => {
    const result = salaryCalculator.calculateTotalSalary(50000, 5000, 2, 10);
    expect(result).to.equal(48500);
  });
});

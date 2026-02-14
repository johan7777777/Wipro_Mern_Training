const { expect } = require("chai");
const salaryCalculator = require("../src/salaryCalculator");

describe("Tax Calculation", () => {
  it("should deduct tax from salary", () => {
    expect(salaryCalculator.calculateWithTax(50000, 10)).to.equal(45000);
  });
});

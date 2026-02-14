const { expect } = require("chai");
const salaryCalculator = require("../src/salaryCalculator");

describe("Bonus Calculation", () => {
  it("should add bonus to base salary", () => {
    expect(salaryCalculator.calculateWithBonus(50000, 5000)).to.equal(55000);
  });
});

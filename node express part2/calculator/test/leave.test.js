const { expect } = require("chai");
const salaryCalculator = require("../src/salaryCalculator");

describe("Leave Deduction", () => {
  it("should deduct leave days from salary", () => {
    expect(salaryCalculator.calculateWithLeave(30000, 2)).to.equal(28000);
  });
});

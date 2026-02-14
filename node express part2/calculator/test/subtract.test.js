const { expect } = require("chai");
const calculator = require("../src/calculator");

describe("Subtract", () => {
  it("should subtract two numbers", () => {
    expect(calculator.subtract(10, 4)).to.equal(6);
  });
});
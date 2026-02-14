const { expect } = require("chai");
const calculator = require("../src/calculator");

describe("Multiply", () => {
  it("should multiply two numbers", () => {
    expect(calculator.multiply(6, 3)).to.equal(18);
  });
});
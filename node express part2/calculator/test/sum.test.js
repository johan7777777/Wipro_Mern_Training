const { expect } = require("chai");
const calculator = require("../src/calculator");

describe("Sum", () => {
  it("should add two numbers", () => {
    expect(calculator.sum(5, 3)).to.equal(8);
  });
});
import { min } from "../src";

describe("min", () => {
  it("should return the minimum value of an array", () => {
    expect(min([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual(1);
  });
});

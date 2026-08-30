import { count } from "../src";

describe("count", () => {
  const array: number[] = [1, 2, 3, 4];

  it("should count the number of values in an array", () => {
    expect(count(array)).toEqual(4);
  });

  it("should count the number of values in an array that satisfy a condition", () => {
    expect(count(array, (value) => value % 2 === 0)).toEqual(2);
  });

  it("should return 0 for an empty array", () => {
    expect(count([])).toEqual(0);
  });

  it("should return 0 for an empty array with a condition", () => {
    expect(count([], (value) => value % 2 === 0)).toEqual(0);
  });

  it("should return 0 when no values satisfy the condition", () => {
    expect(count(array, () => false)).toEqual(0);
  });
});

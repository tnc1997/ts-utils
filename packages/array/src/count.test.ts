import { count } from "./index";

describe("count", () => {
  const array: number[] = [1, 2, 3, 4];

  // eslint-disable-next-line no-sparse-arrays
  const sparse: number[] = [1, , 3] as number[];

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

  it("should count the number of values in an array of strings", () => {
    expect(count(["a", "bb", "ccc"])).toEqual(3);
  });

  it("should count the number of values in an array of strings that satisfy a condition", () => {
    expect(count(["a", "bb", "ccc"], (value) => value.length > 1)).toEqual(2);
  });

  it("should count undefined values", () => {
    expect(count([1, undefined, 3])).toEqual(3);
  });

  it("should count undefined values that satisfy a condition", () => {
    expect(count([1, undefined, 3], (value) => value === undefined)).toEqual(1);
  });

  it("should skip empty slots in a sparse array", () => {
    expect(count(sparse)).toEqual(2);
  });

  it("should skip empty slots in a sparse array with a condition", () => {
    expect(count(sparse, () => true)).toEqual(2);
  });

  it("should return 0 for an array of only empty slots", () => {
    expect(count(new Array<number>(3))).toEqual(0);
  });

  it("should return 0 for an array of only empty slots with a condition", () => {
    expect(count(new Array<number>(3), () => true)).toEqual(0);
  });

  it("should not call the condition for empty slots", () => {
    const callback = jest.fn(() => true);

    count(sparse, callback);

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).not.toHaveBeenCalledWith(undefined);
  });
});

import { contains } from "./index";

describe("contains", () => {
  it("should check if an array does contain a specified value", () => {
    expect(contains([1, 2, 3, 4, 5], 5)).toBeTruthy();

    expect(contains(["a", "b", "c", "d", "e"], "a")).toBeTruthy();
  });

  it("should check if an array does contain NaN", () => {
    expect(contains([1, NaN, 3], NaN)).toBe(true);
  });

  it("should check if an array does not contain a specified value", () => {
    expect(contains([1, 2, 3, 4, 5], 10)).toBeFalsy();

    expect(contains(["a", "b", "c", "d", "e"], "j")).toBeFalsy();
  });

  it("should consider -0 and 0 to be equal", () => {
    expect(contains([-0], 0)).toBe(true);

    expect(contains([0], -0)).toBe(true);
  });

  it("should read empty slots in sparse arrays as undefined", () => {
    // eslint-disable-next-line no-sparse-arrays
    expect(contains([1, , 3], undefined)).toBe(true);
  });
});

import { InsufficientValuesError, max } from "./index";

describe("max", () => {
  it("should return the entry with the maximum value of a map", () => {
    const array: [string, number][] = [
      ["a", 1],
      ["b", 3],
      ["c", 2],
    ];
    const map: Map<string, number> = new Map<string, number>(array);

    expect(max<string>(map)).toEqual(["b", 3]);
  });

  it("should not mutate the input map", () => {
    const map = new Map([
      ["a", 3],
      ["b", 1],
      ["c", 2],
    ]);

    max(map);

    expect([...map]).toEqual([
      ["a", 3],
      ["b", 1],
      ["c", 2],
    ]);
  });

  it.each([
    [[1, NaN, 3]],
    [[NaN, 1, 3]],
    [[1, 3, NaN]],
    [[3, NaN, 1]],
    [[NaN]],
    [[-0, 0]],
    [[0, -0]],
    [[-0]],
    [[-Infinity, Infinity]],
    [[-Infinity]],
    [[Infinity]],
    [[-3, -1, -2]],
    [[1, 9, 3]],
    [[9, 1, 3]],
    [[3, 1, 9]],
    [[-0, -0]],
    [[0, 0]],
    [[0, -0, -0]],
    [[-0, 0, 0]],
    [[-0, 0, -0]],
    [[0, -0, 0]],
  ])("should return the value that Math.max returns for %j", (values) => {
    const map = new Map(values.map((value, index) => [index, value]));

    expect(max(map)[1]).toBe(Math.max(...values));
  });

  it("should return the first entry whose value is NaN", () => {
    const map = new Map([
      ["a", 1],
      ["b", NaN],
      ["c", NaN],
    ]);

    expect(max(map)).toEqual(["b", NaN]);
  });

  it("should return the first inserted entry when values are tied", () => {
    const map = new Map([
      ["a", 5],
      ["b", 5],
    ]);

    expect(max(map)).toEqual(["a", 5]);
  });

  it("should return the first inserted entry when -0 values are tied", () => {
    const map = new Map([
      ["a", -0],
      ["b", -0],
    ]);

    expect(max(map)).toEqual(["a", -0]);
  });

  it("should return the first inserted entry when 0 values are tied", () => {
    const map = new Map([
      ["a", 0],
      ["b", 0],
    ]);

    expect(max(map)).toEqual(["a", 0]);
  });

  it("should return the entry with the maximum value of a large map", () => {
    const map = new Map(
      Array.from({ length: 200_000 }, (_, index) => [index, index]),
    );

    expect(max(map)).toEqual([199_999, 199_999]);
  });

  it("should throw an error when the map is empty", () => {
    const map: Map<string, number> = new Map<string, number>();

    expect(() => max<string>(map)).toThrow(InsufficientValuesError);
    expect(() => max<string>(map)).toThrow(
      "The map does not contain enough values to calculate the maximum.",
    );
  });
});

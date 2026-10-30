import { values } from "./index";

describe("values", () => {
  it("should not change the map when the array is changed", () => {
    const map: Map<string, number> = new Map<string, number>([["a", 1]]);

    values<string, number>(map).push(2);

    expect(map).toEqual(new Map([["a", 1]]));
    expect(values<string, number>(map)).toEqual([1]);
  });

  it("should return a new array for each call", () => {
    const map: Map<string, number> = new Map<string, number>([["a", 1]]);

    expect(values<string, number>(map)).not.toBe(values<string, number>(map));
  });

  it("should return an empty array for an empty map", () => {
    expect(values(new Map())).toEqual([]);
  });

  it("should return the values in insertion order", () => {
    const map: Map<number, string> = new Map<number, string>([
      [1, "a"],
      [2, "b"],
    ]);

    map.delete(1);
    map.set(1, "c");
    map.set(2, "d");

    expect(values<number, string>(map)).toEqual(["d", "c"]);
  });

  it("should return the values of a map", () => {
    const array: [string, number][] = [
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ];
    const map: Map<string, number> = new Map<string, number>(array);

    expect(values<string, number>(map)).toEqual([1, 2, 3]);
  });

  it("should return the values of a map with non-string values", () => {
    const value = {};
    const result = values<string, unknown>(
      new Map<string, unknown>([
        ["a", 1],
        ["b", value],
        ["c", NaN],
        ["d", undefined],
      ]),
    );

    expect(result).toStrictEqual([1, value, NaN, undefined]);
    expect(result[1]).toBe(value);
  });
});

import { InsufficientValuesError, min } from "../src";

describe("min", () => {
  it("should return the entry with the minimum value of a map", () => {
    const array: [string, number][] = [
      ["a", 3],
      ["b", 1],
      ["c", 2],
    ];
    const map: Map<string, number> = new Map<string, number>(array);

    expect(min<string>(map)).toEqual(["b", 1]);
  });

  it("should throw an error when the map is empty", () => {
    const map: Map<string, number> = new Map<string, number>();

    expect(() => min<string>(map)).toThrow(InsufficientValuesError);
    expect(() => min<string>(map)).toThrow(
      "The map does not contain enough values to calculate the minimum.",
    );
  });
});

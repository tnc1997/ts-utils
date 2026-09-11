import { InsufficientValuesError, max } from "../src";

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

  it("should throw an error when the map is empty", () => {
    const map: Map<string, number> = new Map<string, number>();

    expect(() => max<string>(map)).toThrow(InsufficientValuesError);
    expect(() => max<string>(map)).toThrow(
      "The map does not contain enough values to calculate the maximum.",
    );
  });
});

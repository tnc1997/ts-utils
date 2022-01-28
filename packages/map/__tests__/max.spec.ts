import { max } from "../src";

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
});

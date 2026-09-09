import { filterAsync } from "../src";

describe("filterAsync", () => {
  it("should filter the values in an array asynchronously", async () => {
    function callback(value: number): Promise<boolean> {
      function executor(resolve: (value: boolean) => void): void {
        function handler(): void {
          resolve(value % 2 === 0);
        }

        setTimeout(handler, 5);
      }

      return new Promise<boolean>(executor);
    }

    expect(await filterAsync([1, 2, 3, 4], callback)).toEqual([2, 4]);
  });

  it("should throw a type error if the callback does not resolve to a boolean value", async () => {
    function callback(value: number): Promise<boolean> {
      return Promise.resolve(value as unknown as boolean);
    }

    await expect(filterAsync([1, 2, 3, 4], callback)).rejects.toThrow(
      new TypeError("The callback did not resolve to a boolean value."),
    );
  });
});

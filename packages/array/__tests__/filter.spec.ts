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
});

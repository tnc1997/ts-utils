import { filterAsync } from "./index";

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function filterWithTwoRejections(): {
  callback: jest.Mock<Promise<boolean>, [number]>;
  promise: Promise<number[]>;
} {
  // The callback for value 1 rejects after the callback for value 3.
  const callback = jest.fn(async (value: number) => {
    await delay(value === 1 ? 20 : 5);

    if (value === 1 || value === 3) {
      throw new Error(`boom ${value}`);
    }

    return value % 2 === 0;
  });

  const promise = filterAsync([1, 2, 3, 4, 5, 6], callback, {
    concurrency: 2,
    stopOnError: false,
  });

  return { callback, promise };
}

describe("filterAsync", () => {
  describe("callback arguments", () => {
    it("should call the callback with each value, its index, and the array", async () => {
      for (const concurrency of [1, 2, Infinity]) {
        const array = [5, 6];

        const callback = jest.fn<Promise<boolean>, [number, number, number[]]>(
          async () => true,
        );

        await filterAsync(array, callback, { concurrency });

        expect(callback).toHaveBeenCalledTimes(2);
        expect(callback).toHaveBeenNthCalledWith(1, 5, 0, array);
        expect(callback).toHaveBeenNthCalledWith(2, 6, 1, array);

        for (const [, , received] of callback.mock.calls) {
          expect(received).toBe(array);
        }
      }
    });
  });

  describe("changes to the array", () => {
    it("should keep the values appended to the array", async () => {
      async function callback(
        value: number,
        index: number,
        array: number[],
      ): Promise<boolean> {
        if (array.length < 4) {
          array.push(4);
        }

        return value % 2 === 0;
      }

      for (const concurrency of [1, 2, Infinity]) {
        const array = [1, 2];

        await filterAsync(array, callback, { concurrency });

        expect(array).toEqual([1, 2, 4, 4]);
      }
    });

    it("should keep the values passed to the callback even if the array is changed afterwards", async () => {
      async function callback(
        value: number,
        index: number,
        array: number[],
      ): Promise<boolean> {
        if (index === 1) {
          array[1] = 5;
          array.length = 3;
        }

        return value % 2 === 0;
      }

      for (const concurrency of [1, 2, Infinity]) {
        const array = [1, 2, 3, 4];

        // Like `Array.prototype.filter`, the changed value at index 1 is kept
        // as it was when visited.
        expect(await filterAsync(array, callback, { concurrency })).toEqual([
          2,
        ]);
      }
    });

    it("should not call the callback for values appended to the array", async () => {
      for (const concurrency of [1, 2, Infinity]) {
        const array = [1, 2];

        const callback = jest.fn(
          async (value: number, index: number, array: number[]) => {
            if (array.length < 4) {
              array.push(4);
            }

            return value % 2 === 0;
          },
        );

        await filterAsync(array, callback, { concurrency });

        expect(callback).toHaveBeenCalledTimes(2);
      }
    });

    it("should not call the callback for values removed from the array", async () => {
      for (const concurrency of [1, 2, Infinity]) {
        const array = [1, 2, 3, 4];

        const callback = jest.fn(
          async (value: number, index: number, array: number[]) => {
            if (index === 1) {
              array[1] = 5;
              array.length = 3;
            }

            return value % 2 === 0;
          },
        );

        // Like `Array.prototype.filter`, the removed index 3 is not visited.
        await filterAsync(array, callback, { concurrency });

        expect(callback).toHaveBeenCalledTimes(3);
      }
    });

    it("should not include values appended to the array in the result", async () => {
      async function callback(
        value: number,
        index: number,
        array: number[],
      ): Promise<boolean> {
        if (array.length < 4) {
          array.push(4);
        }

        return value % 2 === 0;
      }

      for (const concurrency of [1, 2, Infinity]) {
        const array = [1, 2];

        expect(await filterAsync(array, callback, { concurrency })).toEqual([
          2,
        ]);
      }
    });
  });

  describe("concurrency", () => {
    it("should never run more callbacks concurrently than the given concurrency limit", async () => {
      let active = 0;
      let maxActive = 0;

      async function callback(value: number): Promise<boolean> {
        active++;
        maxActive = Math.max(maxActive, active);

        await new Promise((resolve) => setTimeout(resolve, 5));

        active--;

        return value % 2 === 0;
      }

      const array = [1, 2, 3, 4, 5, 6, 7, 8];

      await filterAsync(array, callback, { concurrency: 3 });

      expect(maxActive).toBeLessThanOrEqual(3);
      expect(maxActive).toEqual(3);
    });

    it("should resolve with the filtered values with a concurrency limit", async () => {
      async function callback(value: number): Promise<boolean> {
        await delay(5);

        return value % 2 === 0;
      }

      const array = [1, 2, 3, 4, 5, 6, 7, 8];

      expect(await filterAsync(array, callback, { concurrency: 3 })).toEqual([
        2, 4, 6, 8,
      ]);
    });

    it("should resolve with the filtered values without a concurrency limit", async () => {
      async function callback(value: number): Promise<boolean> {
        await delay(5);

        return value % 2 === 0;
      }

      const array = [1, 2, 3, 4, 5, 6];

      expect(await filterAsync(array, callback)).toEqual([2, 4, 6]);
    });

    it("should return the filtered values in their original order", async () => {
      function callback(value: number): Promise<boolean> {
        const delay = (6 - value) * 5;

        function executor(resolve: (value: boolean) => void): void {
          function handler(): void {
            resolve(value % 2 === 0);
          }

          setTimeout(handler, delay);
        }

        return new Promise<boolean>(executor);
      }

      const array = [1, 2, 3, 4, 5, 6];
      const expected = [2, 4, 6];

      expect(await filterAsync(array, callback, { concurrency: 1 })).toEqual(
        expected,
      );
      expect(await filterAsync(array, callback, { concurrency: 2 })).toEqual(
        expected,
      );
      expect(
        await filterAsync(array, callback, { concurrency: Infinity }),
      ).toEqual(expected);
    });

    it("should run all callbacks concurrently by default", async () => {
      let active = 0;
      let maxActive = 0;

      async function callback(value: number): Promise<boolean> {
        active++;
        maxActive = Math.max(maxActive, active);

        await new Promise((resolve) => setTimeout(resolve, 5));

        active--;

        return value % 2 === 0;
      }

      const array = [1, 2, 3, 4, 5, 6];

      await filterAsync(array, callback);

      expect(maxActive).toEqual(array.length);
    });
  });

  describe("empty arrays", () => {
    it("should not call the callback", async () => {
      const callback = jest.fn(async (value: number) => value);

      await filterAsync([], callback);
      await filterAsync([], callback, { concurrency: 2 });

      expect(callback).not.toHaveBeenCalled();
    });

    it("should resolve to an empty array", async () => {
      async function callback(value: number): Promise<number> {
        return value;
      }

      expect(await filterAsync([], callback)).toEqual([]);
      expect(await filterAsync([], callback, { concurrency: 2 })).toEqual([]);
    });
  });

  describe("invalid options", () => {
    it.each([NaN, 0, -1, 1.5, -Infinity])(
      "should not call the callback when the concurrency is %p",
      async (concurrency) => {
        const callback = jest.fn(async (value: number) => value % 2 === 0);

        for (const array of [[1, 2, 3], []]) {
          await filterAsync(array, callback, { concurrency }).catch(
            () => undefined,
          );
        }

        expect(callback).not.toHaveBeenCalled();
      },
    );

    it.each([NaN, 0, -1, 1.5, -Infinity])(
      "should throw a range error when the concurrency is %p",
      async (concurrency) => {
        const callback = jest.fn(async (value: number) => value % 2 === 0);

        for (const array of [[1, 2, 3], []]) {
          const promise = filterAsync(array, callback, { concurrency });

          await expect(promise).rejects.toThrow(RangeError);
          await expect(promise).rejects.toThrow(
            "The concurrency must be a positive integer or Infinity.",
          );
        }
      },
    );
  });

  describe("rejections", () => {
    it("should reject with the first rejection reason and ignore later rejections", async () => {
      const callback = jest.fn(async (value: number) => {
        await delay(value === 1 ? 10 : 5);

        throw new Error(`boom ${value}`);
      });

      await expect(
        filterAsync([1, 2, 3], callback, { concurrency: 2 }),
      ).rejects.toThrow("boom 2");
    });

    it("should reject with the first rejection reason while other callbacks are running with a concurrency limit", async () => {
      async function callback(value: number): Promise<boolean> {
        await delay(value === 1 ? 5 : 10);

        if (value === 1) {
          throw new Error("boom");
        }

        return value % 2 === 0;
      }

      await expect(
        filterAsync([1, 2, 3, 4, 5, 6], callback, { concurrency: 2 }),
      ).rejects.toThrow("boom");
    });

    it("should stop starting callbacks after the first rejection with a concurrency limit", async () => {
      const callback = jest.fn(async (value: number) => {
        await delay(value === 1 ? 5 : 10);

        if (value === 1) {
          throw new Error("boom");
        }

        return value % 2 === 0;
      });

      await filterAsync([1, 2, 3, 4, 5, 6], callback, { concurrency: 2 }).catch(
        () => undefined,
      );

      await delay(30);

      expect(callback).toHaveBeenCalledTimes(2);
    });
  });

  describe("results", () => {
    it("should filter the values by the truthiness of the resolved values", async () => {
      const array: unknown[] = [
        0,
        1,
        "",
        "a",
        null,
        {},
        undefined,
        NaN,
        [],
        false,
        true,
      ];

      async function callback(value: unknown): Promise<unknown> {
        return value;
      }

      const expected: unknown[] = [1, "a", {}, [], true];

      expect(await filterAsync(array, callback)).toEqual(expected);
      expect(await filterAsync(array, callback, { concurrency: 2 })).toEqual(
        expected,
      );
    });

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

    it("should not change the input array", async () => {
      const array = [1, 2, 3];

      await filterAsync(array, async (value) => value !== 2);

      expect(array).toEqual([1, 2, 3]);
    });

    it("should resolve with the values for which the callback resolves to true", async () => {
      const array = [1, 2, 3];

      const result = await filterAsync(array, async (value) => value !== 2);

      expect(result).toEqual([1, 3]);
    });

    it("should return a new array", async () => {
      const array = [1, 2, 3];

      const result = await filterAsync(array, async (value) => value !== 2);

      expect(result).not.toBe(array);
    });
  });

  describe("sparse arrays", () => {
    it("should leave holes out of the result", async () => {
      // eslint-disable-next-line no-sparse-arrays
      const array = [1, , 3, ,];

      for (const concurrency of [1, 2, Infinity]) {
        const result = await filterAsync(array, async () => true, {
          concurrency,
        });

        expect(result).toHaveLength(2);
        expect(result).toEqual([1, 3]);
      }
    });

    it("should not call the callback for an array of only holes", async () => {
      const array = new Array<number>(3);

      for (const concurrency of [1, 2, Infinity]) {
        const callback = jest.fn(async () => true);

        await filterAsync(array, callback, { concurrency });

        expect(callback).not.toHaveBeenCalled();
      }
    });

    it("should not call the callback for holes", async () => {
      // eslint-disable-next-line no-sparse-arrays
      const array = [1, , 3, ,];

      for (const concurrency of [1, 2, Infinity]) {
        const callback = jest.fn(async () => true);

        await filterAsync(array, callback, { concurrency });

        expect(callback).toHaveBeenCalledTimes(2);
        expect(callback).toHaveBeenNthCalledWith(1, 1, 0, array);
        expect(callback).toHaveBeenNthCalledWith(2, 3, 2, array);
      }
    });

    it("should resolve to an empty array for an array of only holes", async () => {
      const array = new Array<number>(3);

      for (const concurrency of [1, 2, Infinity]) {
        const result = await filterAsync(array, async () => true, {
          concurrency,
        });

        expect(result).toHaveLength(0);
      }
    });
  });

  describe("synchronous throws", () => {
    it.each([
      [1, [1]],
      [2, [1, 2]],
      [Infinity, [1, 2, 3]],
    ])(
      "should invoke the same callbacks after a synchronous throw as after a rejection with a concurrency of %p",
      async (concurrency, expected) => {
        const callback = jest.fn((value: number): Promise<boolean> => {
          if (value === 1) {
            throw new Error("boom");
          }

          return Promise.resolve(true);
        });

        await expect(
          filterAsync([1, 2, 3], callback, { concurrency }),
        ).rejects.toThrow("boom");

        // Wait for the callbacks that were already running to settle, in case
        // they would start any more.
        await delay(10);

        expect(callback.mock.calls.map(([value]) => value)).toEqual(expected);
      },
    );

    it("should reject with the first error when several callbacks throw synchronously", async () => {
      const errors = [new Error("boom 1"), new Error("boom 2")];

      function callback(value: number): Promise<boolean> {
        throw errors[value - 1];
      }

      await expect(filterAsync([1, 2], callback)).rejects.toBe(errors[0]);
    });
  });

  describe("when AggregateError is not available", () => {
    const global = globalThis as { AggregateError?: unknown };
    const { AggregateError } = global;

    beforeEach(() => {
      delete global.AggregateError;
    });

    afterEach(() => {
      global.AggregateError = AggregateError;
    });

    function filterWithoutAggregateError(): Promise<number[]> {
      return filterAsync(
        [1, 2, 3],
        async (value: number) => {
          if (value !== 2) {
            throw new Error(`boom ${value}`);
          }

          return true;
        },
        { stopOnError: false },
      );
    }

    it("should reject with an error named AggregateError", async () => {
      const promise = filterWithoutAggregateError();

      await expect(promise).rejects.toBeInstanceOf(Error);
      await expect(promise).rejects.toHaveProperty("name", "AggregateError");
    });

    it("should reject with every rejection reason", async () => {
      await expect(filterWithoutAggregateError()).rejects.toHaveProperty(
        "errors",
        [new Error("boom 1"), new Error("boom 3")],
      );
    });

    it("should reject with the number of rejections in the message", async () => {
      await expect(filterWithoutAggregateError()).rejects.toHaveProperty(
        "message",
        "2 of 3 callbacks rejected.",
      );
    });
  });

  describe("when stopOnError is false", () => {
    it("should call the callback once for each value when no callback rejects", async () => {
      const callback = jest.fn(async (value: number) => value % 2 === 1);

      await filterAsync([1, 2, 3], callback, { stopOnError: false });
      await filterAsync([1, 2, 3], callback, {
        concurrency: 2,
        stopOnError: false,
      });

      expect(callback).toHaveBeenCalledTimes(6);
    });

    it("should invoke every callback after a rejection", async () => {
      const { callback, promise } = filterWithTwoRejections();

      await promise.catch(() => undefined);

      expect(callback).toHaveBeenCalledTimes(6);
    });

    it("should reject with an aggregate error", async () => {
      const { promise } = filterWithTwoRejections();

      await expect(promise).rejects.toBeInstanceOf(
        (globalThis as unknown as { AggregateError: ErrorConstructor })
          .AggregateError,
      );
      await expect(promise).rejects.toHaveProperty("name", "AggregateError");
    });

    it("should reject with every rejection reason in the order they happened", async () => {
      const { promise } = filterWithTwoRejections();

      await expect(promise).rejects.toHaveProperty("errors", [
        new Error("boom 3"),
        new Error("boom 1"),
      ]);
    });

    it("should resolve with the filtered values when no callback rejects", async () => {
      const callback = jest.fn(async (value: number) => value % 2 === 1);

      expect(
        await filterAsync([1, 2, 3], callback, { stopOnError: false }),
      ).toEqual([1, 3]);
    });

    it("should resolve with the filtered values with a concurrency limit when no callback rejects", async () => {
      const callback = jest.fn(async (value: number) => value % 2 === 1);

      expect(
        await filterAsync([1, 2, 3], callback, {
          concurrency: 2,
          stopOnError: false,
        }),
      ).toEqual([1, 3]);
    });
  });
});

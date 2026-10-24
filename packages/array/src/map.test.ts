import { mapAsync } from "./index";

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function trackConcurrency(): {
  callback: (value: number) => Promise<number>;
  maxActive: () => number;
} {
  let active = 0;
  let maxActive = 0;

  async function callback(value: number): Promise<number> {
    active++;
    maxActive = Math.max(maxActive, active);

    await delay(5);

    active--;

    return value * value;
  }

  return { callback, maxActive: () => maxActive };
}

function mapWithFirstRejection(): {
  calls: number[];
  promise: Promise<number[]>;
  settled: number[];
} {
  const calls: number[] = [];
  const settled: number[] = [];

  // The callback for value 1 rejects while the callback for value 2 is
  // still running.
  async function callback(value: number): Promise<number> {
    calls.push(value);

    await delay(value === 1 ? 5 : 10);

    settled.push(value);

    if (value === 1) {
      throw new Error("boom");
    }

    return value;
  }

  const promise = mapAsync([1, 2, 3, 4, 5, 6], callback, { concurrency: 2 });

  return { calls, promise, settled };
}

function mapWithTwoRejections(concurrency: number): {
  callback: jest.Mock<Promise<number>, [number]>;
  promise: Promise<number[]>;
} {
  // The callback for value 1 rejects after the callback for value 3.
  const callback = jest.fn(async (value: number) => {
    await delay(value === 1 ? 20 : 5);

    if (value === 1 || value === 3) {
      throw new Error(`boom ${value}`);
    }

    return value;
  });

  const promise = mapAsync([1, 2, 3, 4, 5, 6], callback, {
    concurrency,
    stopOnError: false,
  });

  return { callback, promise };
}

describe("mapAsync", () => {
  describe("callback arguments", () => {
    it.each([1, 2, Infinity])(
      "should call the callback with each value, its index, and the array with a concurrency of %p",
      async (concurrency) => {
        const array = [5, 6];

        const callback = jest.fn<Promise<number>, [number, number, number[]]>(
          async (value) => value,
        );

        await mapAsync(array, callback, { concurrency });

        expect(callback).toHaveBeenCalledTimes(2);
        expect(callback).toHaveBeenNthCalledWith(1, 5, 0, array);
        expect(callback).toHaveBeenNthCalledWith(2, 6, 1, array);

        for (const [, , received] of callback.mock.calls) {
          expect(received).toBe(array);
        }
      },
    );
  });

  describe("changes to the array", () => {
    it("should keep the values appended to the array", async () => {
      async function callback(
        value: number,
        index: number,
        array: number[],
      ): Promise<number> {
        if (array.length < 4) {
          array.push(9);
        }

        return value * value;
      }

      for (const concurrency of [1, 2, Infinity]) {
        const array = [1, 2];

        await mapAsync(array, callback, { concurrency });

        expect(array).toEqual([1, 2, 9, 9]);
      }
    });

    it.each([1, 2, Infinity])(
      "should leave the slots of values deleted from the array empty with a concurrency of %p",
      async (concurrency) => {
        async function callback(
          value: number,
          index: number,
          array: number[],
        ): Promise<number> {
          if (index === 0) {
            delete array[2];
          }

          return value;
        }

        const result = await mapAsync([1, 2, 3], callback, { concurrency });

        expect(result).toHaveLength(3);
        expect(2 in result).toBe(false);
      },
    );

    it("should leave the slots of values removed from the array empty", async () => {
      async function callback(
        value: number,
        index: number,
        array: number[],
      ): Promise<number> {
        if (index === 0) {
          array.pop();
        }

        return value * value;
      }

      for (const concurrency of [1, 2, Infinity]) {
        const array = [1, 2, 3];

        const result = await mapAsync(array, callback, { concurrency });

        expect(result).toHaveLength(3);
        expect(2 in result).toBe(false);
        expect(result.slice(0, 2)).toEqual([1, 4]);
      }
    });

    it("should not call the callback for values appended to the array", async () => {
      for (const concurrency of [1, 2, Infinity]) {
        const array = [1, 2];

        const callback = jest.fn(
          async (value: number, index: number, array: number[]) => {
            if (array.length < 4) {
              array.push(9);
            }

            return value * value;
          },
        );

        await mapAsync(array, callback, { concurrency });

        expect(callback).toHaveBeenCalledTimes(2);
      }
    });

    it.each([1, 2, Infinity])(
      "should not call the callback for values deleted from the array with a concurrency of %p",
      async (concurrency) => {
        const callback = jest.fn(
          async (value: number, index: number, array: number[]) => {
            if (index === 0) {
              delete array[2];
            }

            return value;
          },
        );

        await mapAsync([1, 2, 3], callback, { concurrency });

        expect(callback.mock.calls.map(([, index]) => index)).toEqual([0, 1]);
      },
    );

    it("should not call the callback for values removed from the array", async () => {
      for (const concurrency of [1, 2, Infinity]) {
        const array = [1, 2, 3];

        const callback = jest.fn(
          async (value: number, index: number, array: number[]) => {
            if (index === 0) {
              array.pop();
            }

            return value * value;
          },
        );

        await mapAsync(array, callback, { concurrency });

        expect(callback).toHaveBeenCalledTimes(2);
      }
    });

    it("should not include values appended to the array in the result", async () => {
      async function callback(
        value: number,
        index: number,
        array: number[],
      ): Promise<number> {
        if (array.length < 4) {
          array.push(9);
        }

        return value * value;
      }

      for (const concurrency of [1, 2, Infinity]) {
        const array = [1, 2];

        const result = await mapAsync(array, callback, { concurrency });

        expect(result).toEqual([1, 4]);
      }
    });

    it.each([1, 2, Infinity])(
      "should read each value when its callback is invoked with a concurrency of %p",
      async (concurrency) => {
        async function callback(
          value: number,
          index: number,
          array: number[],
        ): Promise<number> {
          if (index === 0) {
            array[2] = 30;
          }

          return value;
        }

        expect(await mapAsync([1, 2, 3], callback, { concurrency })).toEqual([
          1, 2, 30,
        ]);
      },
    );
  });

  describe("concurrency", () => {
    it("should invoke every callback synchronously in order by default", () => {
      const calls: number[] = [];

      const promise = mapAsync([1, 2, 3], async (value: number) => {
        calls.push(value);

        return value;
      });

      // Every callback has been invoked before the returned promise is
      // awaited.
      expect(calls).toEqual([1, 2, 3]);

      return promise;
    });

    it("should never run more callbacks concurrently than the given concurrency limit", async () => {
      const { callback, maxActive } = trackConcurrency();

      const array = [1, 2, 3, 4, 5, 6, 7, 8];

      await mapAsync(array, callback, { concurrency: 3 });

      expect(maxActive()).toBeLessThanOrEqual(3);
      expect(maxActive()).toEqual(3);
    });

    it("should not run more callbacks concurrently than there are values when the concurrency is greater than the length", async () => {
      const { callback, maxActive } = trackConcurrency();

      await mapAsync([1, 2], callback, { concurrency: 10 });

      expect(maxActive()).toEqual(2);
    });

    it("should resolve with the mapped values when the concurrency is greater than the length", async () => {
      async function callback(value: number): Promise<number> {
        return value * value;
      }

      expect(await mapAsync([1, 2], callback, { concurrency: 10 })).toEqual([
        1, 4,
      ]);
    });

    it("should resolve with the mapped values with a concurrency limit", async () => {
      const { callback } = trackConcurrency();

      const array = [1, 2, 3, 4, 5, 6, 7, 8];

      expect(await mapAsync(array, callback, { concurrency: 3 })).toEqual([
        1, 4, 9, 16, 25, 36, 49, 64,
      ]);
    });

    it("should resolve with the mapped values without a concurrency limit", async () => {
      const { callback } = trackConcurrency();

      const array = [1, 2, 3, 4, 5];

      expect(await mapAsync(array, callback)).toEqual([1, 4, 9, 16, 25]);
    });

    it("should return the mapped values in their original order", async () => {
      function callback(value: number): Promise<number> {
        const delay = (5 - value) * 5;

        function executor(resolve: (value: number) => void): void {
          function handler(): void {
            resolve(value * value);
          }

          setTimeout(handler, delay);
        }

        return new Promise<number>(executor);
      }

      const array = [1, 2, 3, 4, 5];
      const expected = [1, 4, 9, 16, 25];

      expect(await mapAsync(array, callback, { concurrency: 1 })).toEqual(
        expected,
      );
      expect(await mapAsync(array, callback, { concurrency: 2 })).toEqual(
        expected,
      );
      expect(
        await mapAsync(array, callback, { concurrency: Infinity }),
      ).toEqual(expected);
    });

    it("should run all callbacks concurrently by default", async () => {
      const { callback, maxActive } = trackConcurrency();

      const array = [1, 2, 3, 4, 5];

      await mapAsync(array, callback);

      expect(maxActive()).toEqual(array.length);
    });
  });

  describe("empty arrays", () => {
    it.each([1, 2, Infinity])(
      "should not call the callback with a concurrency of %p",
      async (concurrency) => {
        const callback = jest.fn(async (value: number) => value);

        await mapAsync([], callback, { concurrency });

        expect(callback).not.toHaveBeenCalled();
      },
    );

    it.each([1, 2, Infinity])(
      "should resolve to an empty array with a concurrency of %p",
      async (concurrency) => {
        async function callback(value: number): Promise<number> {
          return value;
        }

        expect(await mapAsync([], callback, { concurrency })).toEqual([]);
      },
    );
  });

  describe("invalid options", () => {
    it.each([NaN, 0, -1, 1.5, -Infinity])(
      "should not call the callback when the concurrency is %p",
      async (concurrency) => {
        const callback = jest.fn(async (value: number) => value * value);

        await mapAsync([1, 2, 3], callback, { concurrency }).catch(
          () => undefined,
        );

        expect(callback).not.toHaveBeenCalled();
      },
    );

    it.each([NaN, 0, -1, 1.5, -Infinity])(
      "should throw a range error when the concurrency is %p",
      async (concurrency) => {
        const callback = jest.fn(async (value: number) => value * value);

        for (const array of [[1, 2, 3], []]) {
          const promise = mapAsync(array, callback, { concurrency });

          await expect(promise).rejects.toThrow(RangeError);
          await expect(promise).rejects.toThrow(
            "The concurrency must be a positive integer or Infinity.",
          );
        }
      },
    );
  });

  describe("rejections", () => {
    it("should invoke every callback before rejecting without a concurrency limit", async () => {
      const callback = jest.fn(async (value: number) => {
        await delay(value === 1 ? 5 : 10);

        if (value === 1) {
          throw new Error("boom");
        }

        return value;
      });

      await mapAsync([1, 2, 3, 4], callback).catch(() => undefined);

      expect(callback).toHaveBeenCalledTimes(4);
    });

    it("should let the callbacks that were already running settle after the first rejection with a concurrency limit", async () => {
      const { promise, settled } = mapWithFirstRejection();

      await promise.catch(() => undefined);

      await delay(30);

      expect(settled).toEqual([1, 2]);
    });

    it("should not start a callback in the slot freed by the first rejection with a concurrency limit", async () => {
      const { calls, promise } = mapWithFirstRejection();

      await promise.catch(() => undefined);

      expect(calls).toEqual([1, 2]);
    });

    it("should not start more callbacks when a later rejection frees a slot", async () => {
      const callback = jest.fn(async (value: number) => {
        await delay(value === 1 ? 10 : 5);

        throw new Error(`boom ${value}`);
      });

      await mapAsync([1, 2, 3], callback, { concurrency: 2 }).catch(
        () => undefined,
      );

      // Wait for the callback for value 1, which was already running, to
      // reject too.
      await delay(20);

      expect(callback).toHaveBeenCalledTimes(2);
    });

    it.each(["boom", undefined])(
      "should reject with a rejection reason of %p unchanged",
      async (reason) => {
        async function callback(value: number): Promise<number> {
          if (value === 1) {
            throw reason;
          }

          return value;
        }

        await expect(mapAsync([1, 2, 3], callback)).rejects.toBe(reason);
      },
    );

    it("should reject with the first rejection reason and ignore later rejections", async () => {
      const callback = jest.fn(async (value: number) => {
        await delay(value === 1 ? 10 : 5);

        throw new Error(`boom ${value}`);
      });

      await expect(
        mapAsync([1, 2, 3], callback, { concurrency: 2 }),
      ).rejects.toThrow("boom 2");
    });

    it("should reject with the first rejection reason while other callbacks are running with a concurrency limit", async () => {
      const { promise } = mapWithFirstRejection();

      await expect(promise).rejects.toThrow("boom");
    });

    it("should reject with the rejection reason without a concurrency limit", async () => {
      async function callback(value: number): Promise<number> {
        await delay(value === 1 ? 5 : 10);

        if (value === 1) {
          throw new Error("boom");
        }

        return value;
      }

      await expect(mapAsync([1, 2, 3, 4], callback)).rejects.toThrow("boom");
    });

    it("should stop starting callbacks after the first rejection with a concurrency limit", async () => {
      const { calls, promise } = mapWithFirstRejection();

      await promise.catch(() => undefined);

      // The callback for value 2 was already running, so it runs to
      // completion, but no further callbacks are started.
      await delay(30);

      expect(calls).toEqual([1, 2]);
    });
  });

  describe("results", () => {
    it("should map the values in an array asynchronously", async () => {
      function callback(value: number): Promise<number> {
        function executor(resolve: (value: number) => void): void {
          function handler(): void {
            resolve(value * value);
          }

          setTimeout(handler, 5);
        }

        return new Promise<number>(executor);
      }

      expect(await mapAsync([1, 2, 3, 4], callback)).toEqual([1, 4, 9, 16]);
    });

    it("should not change the input array", async () => {
      const array = [1, 2, 3];

      await mapAsync(array, async (value) => value * value);

      expect(array).toEqual([1, 2, 3]);
    });

    it("should return a new array", async () => {
      const array = [1, 2, 3];

      const result = await mapAsync(array, async (value) => value);

      expect(result).not.toBe(array);
    });
  });

  describe("sparse arrays", () => {
    it("should leave holes empty in the result", async () => {
      // eslint-disable-next-line no-sparse-arrays
      const array = [1, , 3];

      for (const concurrency of [1, 2, Infinity]) {
        const callback = jest.fn(async (value: number | undefined) => value);

        const result = await mapAsync(array, callback, { concurrency });

        expect(result).toHaveLength(3);
        expect(1 in result).toBe(false);
        expect(result[0]).toEqual(1);
        expect(result[2]).toEqual(3);
      }
    });

    it("should not call the callback for holes", async () => {
      // eslint-disable-next-line no-sparse-arrays
      const array = [1, , 3];

      for (const concurrency of [1, 2, Infinity]) {
        const callback = jest.fn(async (value: number | undefined) => value);

        await mapAsync(array, callback, { concurrency });

        expect(callback).toHaveBeenCalledTimes(2);
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
        const callback = jest.fn((value: number): Promise<number> => {
          if (value === 1) {
            throw new Error("boom");
          }

          return Promise.resolve(value);
        });

        await expect(
          mapAsync([1, 2, 3], callback, { concurrency }),
        ).rejects.toThrow("boom");

        // Wait for the callbacks that were already running to settle, in case
        // they would start any more.
        await delay(10);

        expect(callback.mock.calls.map(([value]) => value)).toEqual(expected);
      },
    );

    it("should reject with an aggregate error of every error thrown synchronously by a callback when stopOnError is false", async () => {
      function callback(value: number): Promise<number> {
        if (value === 1 || value === 3) {
          throw new Error(`boom ${value}`);
        }

        return Promise.resolve(value);
      }

      await expect(
        mapAsync([1, 2, 3], callback, { stopOnError: false }),
      ).rejects.toHaveProperty("errors", [
        new Error("boom 1"),
        new Error("boom 3"),
      ]);
    });

    it("should reject with the error thrown synchronously by a callback", async () => {
      const error = new Error("boom");

      function callback(value: number): Promise<number> {
        if (value === 1) {
          throw error;
        }

        return Promise.resolve(value);
      }

      await expect(mapAsync([1, 2, 3], callback)).rejects.toBe(error);
    });

    it("should reject with the first error when several callbacks throw synchronously", async () => {
      const errors = [new Error("boom 1"), new Error("boom 2")];

      function callback(value: number): Promise<number> {
        throw errors[value - 1];
      }

      await expect(mapAsync([1, 2], callback)).rejects.toBe(errors[0]);
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

    function mapWithoutAggregateError(): Promise<number[]> {
      return mapAsync(
        [1, 2, 3],
        async (value: number) => {
          if (value !== 2) {
            throw new Error(`boom ${value}`);
          }

          return value;
        },
        { stopOnError: false },
      );
    }

    it("should reject with an error named AggregateError", async () => {
      const promise = mapWithoutAggregateError();

      await expect(promise).rejects.toBeInstanceOf(Error);
      await expect(promise).rejects.toHaveProperty("name", "AggregateError");
      await expect(promise).rejects.not.toBeInstanceOf(
        AggregateError as ErrorConstructor,
      );
    });

    it("should reject with every rejection reason", async () => {
      await expect(mapWithoutAggregateError()).rejects.toHaveProperty(
        "errors",
        [new Error("boom 1"), new Error("boom 3")],
      );
    });

    it("should reject with the number of rejections in the message", async () => {
      await expect(mapWithoutAggregateError()).rejects.toHaveProperty(
        "message",
        "2 of 3 callbacks rejected.",
      );
    });
  });

  describe("when stopOnError is false", () => {
    it.each(["boom", undefined])(
      "should include a rejection reason of %p unchanged in the aggregate error",
      async (reason) => {
        async function callback(value: number): Promise<number> {
          if (value !== 2) {
            throw reason;
          }

          return value;
        }

        await expect(
          mapAsync([1, 2, 3], callback, { stopOnError: false }),
        ).rejects.toHaveProperty("errors", [reason, reason]);
      },
    );

    it("should invoke every callback after a rejection", async () => {
      for (const concurrency of [2, Infinity]) {
        const { callback, promise } = mapWithTwoRejections(concurrency);

        await promise.catch(() => undefined);

        expect(callback).toHaveBeenCalledTimes(6);
      }
    });

    it("should leave holes in sparse arrays empty in the result", async () => {
      // eslint-disable-next-line no-sparse-arrays
      const array = [1, , 3];

      for (const concurrency of [1, Infinity]) {
        const callback = jest.fn(async (value: number | undefined) => value);

        const result = await mapAsync(array, callback, {
          concurrency,
          stopOnError: false,
        });

        expect(result).toHaveLength(3);
        expect(1 in result).toBe(false);
      }
    });

    it("should not call the callback for holes in sparse arrays", async () => {
      // eslint-disable-next-line no-sparse-arrays
      const array = [1, , 3];

      for (const concurrency of [1, Infinity]) {
        const callback = jest.fn(async (value: number | undefined) => value);

        await mapAsync(array, callback, {
          concurrency,
          stopOnError: false,
        });

        expect(callback).toHaveBeenCalledTimes(2);
      }
    });

    it("should not count holes in sparse arrays in the aggregate error message", async () => {
      // eslint-disable-next-line no-sparse-arrays
      const array = [1, , 3];

      const callback = jest.fn(async (value: number | undefined) => {
        throw new Error(`boom ${value}`);
      });

      await expect(
        mapAsync(array, callback, { stopOnError: false }),
      ).rejects.toThrow("2 of 2 callbacks rejected.");
    });

    it("should reject with an aggregate error", async () => {
      for (const concurrency of [2, Infinity]) {
        const { promise } = mapWithTwoRejections(concurrency);

        await expect(promise).rejects.toBeInstanceOf(
          (globalThis as unknown as { AggregateError: ErrorConstructor })
            .AggregateError,
        );
        await expect(promise).rejects.toHaveProperty("name", "AggregateError");
      }
    });

    it("should reject with every rejection reason in the order they happened", async () => {
      for (const concurrency of [2, Infinity]) {
        const { promise } = mapWithTwoRejections(concurrency);

        await expect(promise).rejects.toHaveProperty("errors", [
          new Error("boom 3"),
          new Error("boom 1"),
        ]);
      }
    });

    it("should reject with the number of rejections in the aggregate error message", async () => {
      for (const concurrency of [2, Infinity]) {
        const { promise } = mapWithTwoRejections(concurrency);

        await expect(promise).rejects.toThrow("2 of 6 callbacks rejected.");
      }
    });

    it("should resolve with the mapped values when no callback rejects", async () => {
      const callback = jest.fn(async (value: number) => value * value);

      expect(
        await mapAsync([1, 2, 3], callback, { stopOnError: false }),
      ).toEqual([1, 4, 9]);
    });

    it("should resolve with the mapped values with a concurrency limit when no callback rejects", async () => {
      const callback = jest.fn(async (value: number) => value * value);

      expect(
        await mapAsync([1, 2, 3], callback, {
          concurrency: 2,
          stopOnError: false,
        }),
      ).toEqual([1, 4, 9]);
    });
  });
});

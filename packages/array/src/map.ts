/**
 * The global `AggregateError` constructor, which is only available in ES2021
 * and later, so it's declared here rather than included from `lib`.
 *
 * It may be missing at runtime, so it must only be checked with `typeof`:
 * reading an undeclared global any other way throws a `ReferenceError`.
 */
declare const AggregateError:
  | (new (errors: unknown[], message?: string) => Error & { errors: unknown[] })
  | undefined;

/**
 * Options for `mapAsync`.
 */
export interface MapAsyncOptions {
  /**
   * The maximum number of callback invocations to run at once, which must be
   * a positive integer or `Infinity`. Defaults to `Infinity`, i.e. all
   * invocations run concurrently.
   */
  concurrency?: number;

  /**
   * Whether to stop starting new callback invocations once one has
   * rejected. Defaults to `true`.
   *
   * When `true`, the returned promise rejects with the first rejection
   * reason as soon as it happens. Callbacks that are already running are not
   * cancelled, and any later rejections are ignored. With unlimited
   * concurrency, every callback has already been invoked before any can
   * reject, so this only makes a difference when `concurrency` is set.
   *
   * When `false`, every callback is invoked, and once all of them have
   * settled, the returned promise rejects with an `AggregateError` whose
   * `errors` are every rejection reason, in the order that the rejections
   * happened. Where `AggregateError` isn't available, it rejects with an
   * `Error` with the same `name`, `errors`, and message instead, so check
   * `error.name === "AggregateError"` rather than using `instanceof`.
   */
  stopOnError?: boolean;
}

/**
 * Maps the values in an array asynchronously.
 *
 * Like `Array.prototype.map`, only the indexes below the array's initial
 * length are visited, holes in sparse arrays are skipped, and each value is
 * read when its callback is invoked. Unlike `Array.prototype.map`, callbacks
 * run concurrently, so a change made to the array by a callback after it has
 * awaited may not be seen by callbacks for later indexes that have already
 * been invoked.
 * @param array - the array to map
 * @param callback - the asynchronous map function
 * @param options - the maximum number of callback invocations to run at once (`concurrency`, defaulting to `Infinity`), and whether to stop starting new ones once one has rejected (`stopOnError`, defaulting to `true`)
 * @returns the mapped array
 * @throws {RangeError} if `concurrency` is not a positive integer or `Infinity`
 * @throws {AggregateError} if `stopOnError` is `false` and any callback rejects, with every rejection reason in its `errors` (an `Error` with the `name` `"AggregateError"` where `AggregateError` isn't available)
 * @example
 * ```ts
 * await mapAsync([1, 2, 3], async (value) => value * 2); // [2, 4, 6]
 *
 * // Run at most two callbacks at once.
 * await mapAsync([1, 2, 3], async (value) => value * 2, { concurrency: 2 }); // [2, 4, 6]
 * ```
 */
export async function mapAsync<T1, T2>(
  array: T1[],
  callback: (value: T1, index: number, array: T1[]) => Promise<T2>,
  options: MapAsyncOptions = {},
): Promise<T2[]> {
  const { concurrency = Infinity, stopOnError = true } = options;

  if (
    concurrency !== Infinity &&
    !(Number.isInteger(concurrency) && concurrency > 0)
  ) {
    throw new RangeError(
      "The concurrency must be a positive integer or Infinity.",
    );
  }

  // Like `Array.prototype.map`, only visit the indexes below the initial
  // length, so that values appended by the callback are not processed.
  const length = array.length;
  const results: T2[] = new Array(length);
  const errors: unknown[] = [];
  let failed = false;
  let invoked = 0;
  let nextIndex = 0;

  async function worker(): Promise<void> {
    // Once a callback has rejected with `stopOnError`, the workers exit
    // instead of taking the next index, so no further callbacks are started.
    while (!failed && nextIndex < length) {
      const index = nextIndex++;

      // Like `Array.prototype.map`, skip holes in sparse arrays, leaving the
      // corresponding slots in `results` empty.
      if (!(index in array)) {
        continue;
      }

      invoked++;

      try {
        // `index` is an own index of `array` here, so `array[index]` is a
        // value of type `T1`.
        results[index] = await callback(array[index]!, index, array);
      } catch (error) {
        if (stopOnError) {
          failed = true;

          throw error;
        }

        errors.push(error);
      }
    }
  }

  // Unlimited concurrency is achieved by starting a worker per value, so
  // that every callback is invoked synchronously, in order, as with
  // `Array.prototype.map`, and holes are handled the same way either way.
  // `Promise.all` rejects as soon as any worker does, and handles the
  // rejections of the others, so later rejections are ignored.
  await Promise.all(
    Array.from({ length: Math.min(concurrency, length) }, worker),
  );

  if (errors.length > 0) {
    const message = `${errors.length} of ${invoked} callbacks rejected.`;

    // Fall back to an `Error` with the same `name` and `errors` where
    // `AggregateError` isn't available.
    if (typeof AggregateError !== "undefined") {
      throw new AggregateError(errors, message);
    }

    throw Object.assign(new Error(message), { name: "AggregateError", errors });
  }

  return results;
}

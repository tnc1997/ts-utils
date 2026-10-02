/**
 * Options for `mapAsync` and `filterAsync`.
 */
export interface AsyncOptions {
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
   * happened.
   */
  stopOnError?: boolean;
}

/**
 * Thrown when a map does not contain enough values to perform the requested
 * calculation.
 *
 * `instanceof` can fail if more than one copy of the package is loaded, such
 * as when the same program both `import`s and `require`s it, so check
 * `error.name === "InsufficientValuesError"` instead in that case.
 */
export class InsufficientValuesError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InsufficientValuesError";
  }
}

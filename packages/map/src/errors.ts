/**
 * Thrown when a map does not contain enough values to perform the requested
 * calculation.
 */
export class InsufficientValuesError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InsufficientValuesError";
  }
}

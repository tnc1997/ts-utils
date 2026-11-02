import { InsufficientValuesError } from "./index";

describe("InsufficientValuesError", () => {
  it("should be an instance of Error and of InsufficientValuesError", () => {
    const error = new InsufficientValuesError("message");

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(InsufficientValuesError);
  });

  it("should be tagged as an error", () => {
    const error = new InsufficientValuesError("message");

    expect(Object.prototype.toString.call(error)).toBe("[object Error]");
  });

  it("should have the name InsufficientValuesError and the given message", () => {
    const error = new InsufficientValuesError("message");

    expect(error.name).toBe("InsufficientValuesError");
    expect(error.message).toBe("message");
  });

  it("should include the name and message in the stack trace", () => {
    const error = new InsufficientValuesError("message");

    expect(error.stack).toMatch(/^InsufficientValuesError: message(?:\n|$)/);
  });
});

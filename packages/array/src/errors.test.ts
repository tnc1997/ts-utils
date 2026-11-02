import { InsufficientValuesError } from "./index";

describe("InsufficientValuesError", () => {
  it("should have the name, message, and prototype chain of an error", () => {
    const error = new InsufficientValuesError("message");

    expect(error.name).toBe("InsufficientValuesError");
    expect(error.message).toBe("message");
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(InsufficientValuesError);
  });

  it("should be tagged as an error", () => {
    const error = new InsufficientValuesError("message");

    expect(Object.prototype.toString.call(error)).toBe("[object Error]");
  });

  it("should include the name and message in the stack trace", () => {
    const error = new InsufficientValuesError("message");

    expect(error.stack).toMatch(/^InsufficientValuesError: message\n/);
  });
});

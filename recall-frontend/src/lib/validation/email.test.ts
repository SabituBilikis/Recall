import { isValidEmail, validateEmail } from "./email";

describe("isValidEmail", () => {
  it("accepts well-formed addresses (trimming whitespace)", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
    expect(isValidEmail("  user@example.com  ")).toBe(true);
    expect(isValidEmail("a.b+tag@sub.domain.co")).toBe(true);
  });

  it("rejects malformed addresses", () => {
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("user")).toBe(false);
    expect(isValidEmail("user@")).toBe(false);
    expect(isValidEmail("user@example")).toBe(false);
    expect(isValidEmail("user @example.com")).toBe(false);
    expect(isValidEmail("user@@example.com")).toBe(false);
  });
});

describe("validateEmail", () => {
  it("returns a required message for empty/whitespace input", () => {
    expect(validateEmail("")).toBe("Email is required.");
    expect(validateEmail("   ")).toBe("Email is required.");
  });

  it("returns a format message for malformed input", () => {
    expect(validateEmail("nope")).toBe("Please enter a valid email.");
  });

  it("returns null for a valid address", () => {
    expect(validateEmail("user@example.com")).toBeNull();
  });
});

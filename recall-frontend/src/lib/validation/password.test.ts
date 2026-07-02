import { evaluatePassword, isPasswordValid, passwordRuleDefs } from "./password";

describe("evaluatePassword", () => {
  it("returns one result per rule, in order", () => {
    const results = evaluatePassword("");
    expect(results.map((r) => r.id)).toEqual(passwordRuleDefs.map((r) => r.id));
  });

  it("marks every rule unmet for an empty password", () => {
    expect(evaluatePassword("").every((r) => !r.met)).toBe(true);
  });

  it("flags only the failing rules for a partial password", () => {
    // "password" → lowercase + length ok; missing number, special, uppercase.
    const byId = Object.fromEntries(evaluatePassword("password").map((r) => [r.id, r.met]));
    expect(byId.minLength).toBe(true);
    expect(byId.lowercase).toBe(true);
    expect(byId.number).toBe(false);
    expect(byId.special).toBe(false);
    expect(byId.uppercase).toBe(false);
  });

  it("marks all rules met for a strong password", () => {
    expect(evaluatePassword("Str0ng!pass").every((r) => r.met)).toBe(true);
  });
});

describe("isPasswordValid", () => {
  it("is true only when every rule is met", () => {
    expect(isPasswordValid(evaluatePassword("Str0ng!pass"))).toBe(true);
    expect(isPasswordValid(evaluatePassword("weak"))).toBe(false);
  });
});

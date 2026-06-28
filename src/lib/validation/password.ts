// Reusable password-rule validation — drives both the checklist UI and form validity.

export type PasswordRuleId = "minLength" | "number" | "special" | "uppercase" | "lowercase";

export type PasswordRuleDef = {
  id: PasswordRuleId;
  label: string;
  test: (value: string) => boolean;
};

export type PasswordRuleResult = {
  id: PasswordRuleId;
  label: string;
  met: boolean;
};

const MIN_LENGTH = 8;

// Order matches the Figma checklist.
export const passwordRuleDefs: readonly PasswordRuleDef[] = [
  { id: "minLength", label: `At least ${MIN_LENGTH} characters`, test: (v) => v.length >= MIN_LENGTH },
  { id: "number", label: "At least 1 number", test: (v) => /[0-9]/.test(v) },
  { id: "special", label: "At least 1 special character", test: (v) => /[^A-Za-z0-9]/.test(v) },
  { id: "uppercase", label: "At least 1 uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { id: "lowercase", label: "At least 1 lowercase letter", test: (v) => /[a-z]/.test(v) }
];

export function evaluatePassword(value: string): PasswordRuleResult[] {
  return passwordRuleDefs.map((rule) => ({ id: rule.id, label: rule.label, met: rule.test(value) }));
}

export function isPasswordValid(results: PasswordRuleResult[]): boolean {
  return results.every((rule) => rule.met);
}

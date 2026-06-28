// Reusable email validation — kept out of UI components (single source of truth).

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

/**
 * Returns an error message when the email is missing or malformed, otherwise null.
 */
export function validateEmail(value: string): string | null {
  const trimmed = value.trim();

  if (trimmed.length === 0) {
    return "Email is required.";
  }

  if (!isValidEmail(trimmed)) {
    return "Please enter a valid email.";
  }

  return null;
}

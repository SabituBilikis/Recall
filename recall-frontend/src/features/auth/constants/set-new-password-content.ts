// Static copy for the set-new-password screen (mirrors the Figma content).
export const setNewPasswordContent = {
  title: "Set a New Password",
  subtitle: "Please enter a new password twice",
  fields: {
    password: "Password",
    confirmPassword: "Re-enter password"
  },
  confirmMismatch: "Passwords do not match",
  submitLabel: "Send Reset Link",
  backToLoginLabel: "Back to Login"
} as const;

// Forgot Password — request a reset link via email.
export type ForgotPasswordValues = {
  email: string;
};

export type ForgotPasswordErrors = {
  email: string | null;
};

// Set New Password — choose + confirm a new password.
export type SetNewPasswordField = "password" | "confirmPassword";

export type SetNewPasswordValues = Record<SetNewPasswordField, string>;

export type SetNewPasswordErrors = {
  confirmPassword: string | null;
};

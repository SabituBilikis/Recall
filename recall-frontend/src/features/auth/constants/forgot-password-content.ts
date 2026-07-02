// Static copy for the forgot-password screen (mirrors the Figma content).
export const forgotPasswordContent = {
  title: "Reset Password",
  subtitle: "Enter the email linked to your Recall account and we will send reset instructions.",
  fields: {
    email: "Email Address"
  },
  submitLabel: "Send Reset Link",
  backToLoginLabel: "Back to Login",
  // Mock success notice shown inline after submitting.
  successTitle: "Reset link sent",
  successDescription: "Link expires in 30 minutes for your security"
} as const;

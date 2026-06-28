// Shared static copy used across every auth screen (mirrors the Figma content).
export const authContent = {
  brandName: "Recall",
  dividerLabel: "Or",
  googleLoginLabel: "Log in with Google",
  googleSignupLabel: "Sign up with Google",
  // Footer shared by Login / Forgot Password / Set New Password.
  signUpFooter: {
    prompt: "New to Recall? ",
    link: "Sign Up"
  }
} as const;

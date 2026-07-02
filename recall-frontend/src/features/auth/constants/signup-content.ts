// Static copy for the signup screen (mirrors the Figma content).
export const signupContent = {
  brandName: "Recall",
  title: "Create your account",
  subtitle: "Start saving what matters with a private workspace built for fast retrieval.",
  googleLabel: "Sign up with Google",
  dividerLabel: "Or",
  fields: {
    firstName: "First name",
    lastName: "Last name",
    email: "Email Address",
    password: "Password"
  },
  passwordRequirementsTitle: "Password must Contain:",
  termsPrefix: "By signing up you accept our ",
  termsLink: "Terms",
  // Hosted Terms of Service page. Replace with the production URL before release.
  termsUrl: "https://recall.app/terms",
  submitLabel: "Create Account",
  footerPrompt: "Have An Account? ",
  footerLink: "Sign In"
} as const;

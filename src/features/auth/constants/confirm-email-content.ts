// Copy for the email-confirmation flow (pending + confirmed states).
export const confirmEmailContent = {
  pending: {
    title: "Confirm your email",
    body: "We sent an activation link to",
    bodyFallback: "your email address",
    suffix: "Tap it to activate your account.",
    openMail: "Open email app",
    resend: "Resend email",
    resending: "Sending…",
    resent: "Link sent — check your inbox",
    resendError: "Couldn't resend. Try again.",
    spam: "Can't find it? Check your spam folder.",
    backToLogin: "Back to login"
  },
  confirmed: {
    title: "Email confirmed!",
    body: "Your account is active. Let's get you saving and finding everything that matters.",
    continue: "Continue to Recall"
  }
} as const;

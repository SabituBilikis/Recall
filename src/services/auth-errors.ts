import type { AuthError } from "@supabase/supabase-js";

// Maps Supabase auth errors to clear, user-facing messages. Note: sign-in
// returns a generic "invalid_credentials" by design (account-enumeration
// protection), so we can't say which of email/password is wrong.
export function authErrorMessage(error: AuthError): string {
  switch (error.code) {
    case "invalid_credentials":
      return "Email or password is incorrect.";
    case "email_not_confirmed":
      return "Confirm your email before signing in.";
    case "user_already_exists":
    case "email_exists":
      return "That email is already registered. Try signing in.";
    case "user_not_found":
      return "No account found for that email.";
    case "weak_password":
      return "Password is too weak. Use a stronger one.";
    case "same_password":
      return "New password must be different.";
    case "over_email_send_rate_limit":
    case "over_request_rate_limit":
      return "Too many attempts. Please wait a moment and try again.";
    case "validation_failed":
      return "Please check your details and try again.";
    default:
      break;
  }

  const message = error.message ?? "";
  if (/invalid login/i.test(message)) {
    return "Email or password is incorrect.";
  }
  if (/already registered|already exists/i.test(message)) {
    return "That email is already registered. Try signing in.";
  }
  if (/network|fetch|connect/i.test(message)) {
    return "Can't reach the server. Check your connection.";
  }
  return message || "Something went wrong. Please try again.";
}

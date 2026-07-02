export type SignupField = "firstName" | "lastName" | "email" | "password";

export type SignupFormValues = Record<SignupField, string>;

export type SignupFormErrors = {
  email: string | null;
};

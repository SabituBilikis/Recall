export type LoginField = "email" | "password";

export type LoginFormValues = Record<LoginField, string>;

export type LoginFormErrors = {
  email: string | null;
};

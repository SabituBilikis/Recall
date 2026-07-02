import { z } from "zod";

// Single source of truth for backend env validation. The publishable key
// (formerly "anon") is the only client-safe key; either name is accepted.
const supabaseEnvSchema = z
  .object({
    EXPO_PUBLIC_SUPABASE_URL: z.string().url(),
    EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1).optional(),
    EXPO_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional()
  })
  .transform((env, ctx) => {
    const key = env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
    if (!key) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY (or _ANON_KEY) is required"
      });
      return z.NEVER;
    }
    return { supabaseUrl: env.EXPO_PUBLIC_SUPABASE_URL, supabasePublishableKey: key };
  });

export type SupabaseEnv = z.infer<typeof supabaseEnvSchema>;

// Fail-fast: throws when the backend is enabled but env is missing/invalid, so a
// misconfigured production build surfaces immediately (caught by the root
// ErrorBoundary) instead of silently constructing a client with empty creds.
export function getSupabaseEnv(): SupabaseEnv {
  const result = supabaseEnvSchema.safeParse(process.env);
  if (!result.success) {
    throw new Error(`Invalid Supabase environment: ${result.error.issues.map((i) => i.message).join("; ")}`);
  }
  return result.data;
}

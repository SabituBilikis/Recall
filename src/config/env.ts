import { z } from "zod";

const publicEnvSchema = z.object({
  EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1),
  EXPO_PUBLIC_SUPABASE_URL: z.string().url()
});

export type PublicEnv = z.infer<typeof publicEnvSchema>;

export function getPublicEnv(): PublicEnv {
  const result = publicEnvSchema.safeParse(process.env);

  if (!result.success) {
    throw new Error("Missing or invalid public environment configuration.");
  }

  return result.data;
}

export function getSupabaseEnv() {
  const env = getPublicEnv();

  return {
    supabasePublishableKey: env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    supabaseUrl: env.EXPO_PUBLIC_SUPABASE_URL
  };
}

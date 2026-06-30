// Master switch for the backend. Off → the app runs entirely on mock data
// (zero regression). On → stores/forms route through the services/ layer.
//
// Default is environment-aware so a production build that is missing the env var
// can NEVER silently serve mock data: when the flag is unset, backend is ON in
// release builds (and OFF in dev/Storybook). An explicit value always wins. A
// misconfigured release then fails fast via getSupabaseEnv() rather than faking.
const explicit = process.env.EXPO_PUBLIC_USE_BACKEND;
export const USE_BACKEND = explicit ? explicit === "true" : !__DEV__;

// Master switch for the backend. Off → the app runs entirely on mock data
// (zero regression). On → stores/forms route through the services/ layer.
export const USE_BACKEND = process.env.EXPO_PUBLIC_USE_BACKEND === "true";

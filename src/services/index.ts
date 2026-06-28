// API layer — the only place that touches the backend SDK. UI/hooks/stores
// import from here; they never import supabase-js directly.
export { supabase } from "./supabase-client";
export * from "./auth.service";
export * from "./collections.service";
export * from "./items.service";
export * from "./files.service";
export * from "./search.service";
export { toCollection, toSavedItem } from "./mappers";
export type { Database } from "./generated/database.types";

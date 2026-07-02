// Client-side input caps. Mirror the DB CHECK constraints (migration 0011) so a
// user can't type past the limit and hit a save error — purely UX; the server
// remains the source of truth.
export const FIELD_LIMITS = {
  title: 500,
  description: 2000,
  url: 2048,
  noteContent: 100000,
  collectionName: 120,
  collectionDescription: 1000,
  name: 100
} as const;

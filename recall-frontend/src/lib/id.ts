// Client-generated UUID v4. Used so optimistic local rows carry the same id the
// server will store → outbox replay is idempotent. Math.random is fine here:
// these are not security tokens, just collision-resistant client ids.
export function newId(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
    const rand = (Math.random() * 16) | 0;
    const value = char === "x" ? rand : (rand & 0x3) | 0x8;
    return value.toString(16);
  });
}

// Per-test global setup. Add shared mocks here as the suite grows.

// React Native's __DEV__ global isn't defined in the plain node test env.
globalThis.__DEV__ = false;

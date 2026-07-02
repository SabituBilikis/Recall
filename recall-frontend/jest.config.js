// Lean unit-test config for pure logic (validators, crypto, sync, stores). It
// intentionally does NOT use the jest-expo native preset — that preset loads
// expo-modules-core's native setup, which is unnecessary for logic tests and
// brittle under SDK 56. Native modules are mocked per-test where needed.
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.(t|j)sx?$": ["babel-jest", { presets: ["babel-preset-expo"] }]
  },
  transformIgnorePatterns: ["node_modules/(?!(@supabase/.*)/)"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  testMatch: ["<rootDir>/src/**/*.test.{ts,tsx}"]
};

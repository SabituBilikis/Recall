module.exports = function (api) {
  // Cache keyed on NODE_ENV so the production-only console strip is applied
  // (a plain api.cache(true) would freeze the first env's config).
  api.cache.using(() => process.env.NODE_ENV);

  const plugins = ["@tamagui/babel-plugin"];

  // Strip console.* from production bundles (keeps console.error for crash
  // reporting). Dev/test keep all logs.
  if (process.env.NODE_ENV === "production") {
    plugins.push(["transform-remove-console", { exclude: ["error"] }]);
  }

  return {
    presets: ["babel-preset-expo"],
    plugins
  };
};

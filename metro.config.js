const path = require("path");

const { getDefaultConfig } = require("expo/metro-config");
const { withTamagui } = require("@tamagui/metro-plugin");

const config = getDefaultConfig(__dirname);

// Optional deps that ship a dynamic import() Hermes can't parse (supabase-js
// dynamically imports @opentelemetry/api for tracing). Metro can't resolve it,
// so it leaks a raw `import()` into the release bundle → Hermes "Invalid
// expression". Alias it to an empty stub: Metro resolves + transforms it, and
// the caller's feature-detect (`if (!api.propagation) return null`) no-ops.
const EMPTY_MODULE = path.resolve(__dirname, "src/lib/empty-module.js");
const STUBBED = new Set(["@opentelemetry/api"]);
const defaultResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (STUBBED.has(moduleName)) {
    return { type: "sourceFile", filePath: EMPTY_MODULE };
  }
  return (defaultResolveRequest ?? context.resolveRequest)(context, moduleName, platform);
};
// Keep Storybook stories out of the app bundle unless Storybook is explicitly
// enabled. They're authoring-only and otherwise pull dev-only imports into the
// production build.
if (process.env.STORYBOOK_ENABLED !== "true") {
  const storiesPattern = /\.stories\.(t|j)sx?$/;
  const existing = config.resolver.blockList;
  config.resolver.blockList = Array.isArray(existing)
    ? [...existing, storiesPattern]
    : existing
      ? [existing, storiesPattern]
      : [storiesPattern];
}

const tamaguiConfig = withTamagui(config, {
  components: ["tamagui"],
  config: "./tamagui.config.ts"
});

if (process.env.STORYBOOK_ENABLED === "true") {
  const { withStorybook } = require("@storybook/react-native/metro/withStorybook");

  module.exports = withStorybook(tamaguiConfig, {
    configPath: ".rnstorybook",
    enabled: true
  });
} else {
  module.exports = tamaguiConfig;
}

const { getDefaultConfig } = require("expo/metro-config");
const { withTamagui } = require("@tamagui/metro-plugin");

const config = getDefaultConfig(__dirname);
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

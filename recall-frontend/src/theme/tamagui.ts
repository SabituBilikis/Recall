import { defaultConfig } from "@tamagui/config/v5";
import { createTamagui } from "tamagui";

import { fonts } from "./fonts";
import { themes } from "./themes";
import { tokens } from "./tokens";

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  fonts,
  shorthands: {
    ...defaultConfig.shorthands,
    bc: "borderColor",
    bs: "boxShadow",
    bw: "borderWidth",
    h: "height",
    w: "width"
  },
  themes,
  tokens,
  settings: {
    ...defaultConfig.settings,
    defaultFont: "body",
    onlyAllowShorthands: false
  }
});

export type AppTamaguiConfig = typeof tamaguiConfig;

import { defaultConfig } from "@tamagui/config/v5";
import { createTokens } from "tamagui";

import { colorTokens } from "./color";
import { radiusTokens } from "./radius";
import { sizeTokens } from "./size";
import { spaceTokens } from "./space";
import { zIndexTokens } from "./z-index";

export * from "./animation";
export * from "./alert";
export * from "./badge-chip";
export * from "./border";
export * from "./button";
export * from "./color";
export * from "./input";
export * from "./radius";
export * from "./shadow";
export * from "./size";
export * from "./space";
export * from "./typography";
export * from "./z-index";

export const tokens = createTokens({
  ...defaultConfig.tokens,
  color: colorTokens,
  radius: radiusTokens,
  size: sizeTokens,
  space: spaceTokens,
  zIndex: zIndexTokens
});

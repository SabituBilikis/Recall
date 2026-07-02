import { Image } from "react-native";

import type { IconProps } from "./types";

// Exact Recall brand mark exported from Figma (node 6551:954). `size` = height.
// RN Image needs an explicit style for dimensions; Tamagui styling does not size it here.
const recallLogoMark = require("../../../../assets/recall-logo-mark.png");

const ASPECT_RATIO = 1572 / 1352;

export function RecallMark({ size = 28 }: Pick<IconProps, "size">) {
  return (
    <Image
      accessibilityIgnoresInvertColors
      resizeMode="contain"
      source={recallLogoMark}
      style={{ height: size, width: size * ASPECT_RATIO }}
    />
  );
}

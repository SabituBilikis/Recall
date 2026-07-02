import Svg, { Path } from "react-native-svg";

import { colorValues } from "@/theme/tokens/color";

import type { IconProps } from "./types";

// Filled star; color toggles to convey favorited / not.
export function StarIcon({ color = colorValues.grey300, size = 24 }: IconProps) {
  return (
    <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
      <Path
        d="M12 17.3l-6.18 3.73 1.64-7.04L2 9.24l7.19-.62L12 2l2.81 6.62L22 9.24l-5.46 4.75 1.64 7.04z"
        fill={color}
      />
    </Svg>
  );
}

import Svg, { Circle } from "react-native-svg";

import { colorValues } from "@/theme/tokens/color";

import type { IconProps } from "./types";

// more-horiz (3 dots).
export function MoreIcon({ color = colorValues.grey900, size = 16 }: IconProps) {
  return (
    <Svg fill="none" height={size} viewBox="0 0 16 16" width={size}>
      <Circle cx={4} cy={8} fill={color} r={1.5} />
      <Circle cx={8} cy={8} fill={color} r={1.5} />
      <Circle cx={12} cy={8} fill={color} r={1.5} />
    </Svg>
  );
}

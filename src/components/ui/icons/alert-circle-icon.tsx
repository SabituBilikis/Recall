import Svg, { Circle, Path } from "react-native-svg";

import { colorValues } from "@/theme/tokens/color";

import type { IconProps } from "./types";

// Filled status circle (color = fill) with a white exclamation.
export function AlertCircleIcon({ color = colorValues.red500, size = 18 }: IconProps) {
  return (
    <Svg fill="none" height={size} viewBox="0 0 20 20" width={size}>
      <Circle cx={10} cy={10} fill={color} r={10} />
      <Path d="M10 5.5v5" stroke={colorValues.white100} strokeLinecap="round" strokeWidth={2} />
      <Circle cx={10} cy={14} fill={colorValues.white100} r={1} />
    </Svg>
  );
}

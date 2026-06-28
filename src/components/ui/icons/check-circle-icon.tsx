import Svg, { Circle, Path } from "react-native-svg";

import { colorValues } from "@/theme/tokens/color";

import type { IconProps } from "./types";

// Filled status circle (color = fill) with a white check.
export function CheckCircleIcon({ color = colorValues.primary500, size = 18 }: IconProps) {
  return (
    <Svg fill="none" height={size} viewBox="0 0 20 20" width={size}>
      <Circle cx={10} cy={10} fill={color} r={10} />
      <Path
        d="M6 10.4l2.5 2.5L14 7.4"
        stroke={colorValues.white100}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </Svg>
  );
}

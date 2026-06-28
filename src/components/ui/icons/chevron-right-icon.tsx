import Svg, { Path } from "react-native-svg";

import { colorValues } from "@/theme/tokens/color";

import type { IconProps } from "./types";

export function ChevronRightIcon({ color = colorValues.grey900, size = 24 }: IconProps) {
  return (
    <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
      <Path d="M9 5l7 7-7 7" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    </Svg>
  );
}

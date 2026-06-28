import Svg, { Path } from "react-native-svg";

import { colorValues } from "@/theme/tokens/color";

import type { IconProps } from "./types";

export function ChevronDownIcon({ color = colorValues.grey400, size = 24 }: IconProps) {
  return (
    <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
      <Path d="M6 9L12 15L18 9" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </Svg>
  );
}

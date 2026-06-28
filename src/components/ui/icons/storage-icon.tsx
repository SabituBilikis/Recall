import Svg, { Path, Rect } from "react-native-svg";

import { colorValues } from "@/theme/tokens/color";

import type { IconProps } from "./types";

export function StorageIcon({ color = colorValues.white100, size = 24 }: IconProps) {
  return (
    <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
      <Rect height={14} rx={2} stroke={color} strokeWidth={2} width={18} x={3} y={5} />
      <Path d="M3 10h18" stroke={color} strokeLinecap="round" strokeWidth={2} />
      <Path d="M7 15h4" stroke={color} strokeLinecap="round" strokeWidth={2} />
    </Svg>
  );
}

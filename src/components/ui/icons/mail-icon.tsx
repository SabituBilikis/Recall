import Svg, { Path } from "react-native-svg";

import { colorValues } from "@/theme/tokens/color";

import type { IconProps } from "./types";

// Outline envelope — matches the stroke icon style used across the set.
export function MailIcon({ color = colorValues.grey900, size = 24 }: IconProps) {
  return (
    <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
      <Path
        d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
        stroke={color}
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <Path d="m4 7.5 8 5.5 8-5.5" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    </Svg>
  );
}

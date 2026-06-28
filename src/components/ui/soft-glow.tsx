import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";

type SoftGlowProps = {
  color: string;
  opacity?: number;
  size: number;
};

/**
 * Soft radial glow that fades to transparent at its edge — replicates Figma's
 * layer-blurred glow ellipses without a native blur pass. `color` is a literal
 * hex sourced from the color token file (SVG fills can't take Tamagui tokens).
 */
export function SoftGlow({ color, opacity = 0.5, size }: SoftGlowProps) {
  return (
    <Svg height={size} width={size}>
      <Defs>
        <RadialGradient cx="50%" cy="50%" id="softGlow" r="50%">
          <Stop offset="0" stopColor={color} stopOpacity={opacity} />
          <Stop offset="1" stopColor={color} stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <Rect fill="url(#softGlow)" height={size} width={size} />
    </Svg>
  );
}

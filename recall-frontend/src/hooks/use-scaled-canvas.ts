import { PixelRatio, useWindowDimensions } from "react-native";

export function useScaledCanvas(canvasWidth: number, canvasHeight: number) {
  const { height, width } = useWindowDimensions();
  const scale = Math.min(width / canvasWidth, height / canvasHeight);
  const left = Math.max(0, PixelRatio.roundToNearestPixel((width - canvasWidth * scale) / 2));
  const top = Math.max(0, PixelRatio.roundToNearestPixel((height - canvasHeight * scale) / 2));

  return {
    left,
    scale,
    top
  };
}

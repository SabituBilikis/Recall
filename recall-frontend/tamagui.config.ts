import { tamaguiConfig, type AppTamaguiConfig } from "./src/theme/tamagui";

declare module "tamagui" {
  interface TamaguiCustomConfig extends AppTamaguiConfig {}
}

export default tamaguiConfig;
export { tamaguiConfig };
export type { AppTamaguiConfig };

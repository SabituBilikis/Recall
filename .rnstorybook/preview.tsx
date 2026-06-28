import type { Preview } from "@storybook/react-native";

import { AppStack } from "@/components/primitives";
import { AppProviders } from "@/providers/app-providers";

const preview: Preview = {
  decorators: [
    (Story) => (
      <AppProviders>
        <AppStack flex={1} p="$6" tone="primary">
          <Story />
        </AppStack>
      </AppProviders>
    )
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
};

export default preview;

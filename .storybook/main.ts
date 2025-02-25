import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions"
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {
      docgen: 'vue-component-meta',
    }
  },
  core: {
    disableTelemetry: true,
  },
  typescript: {
    check: false, // Disable Storybook's built-in type checking (we're using vue-tsc)
  },
};
export default config;
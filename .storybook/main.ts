import type { StorybookConfig } from "@storybook/angular";
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/angular",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config: any) => {
    //path to your Angular environment files
    const envPath = require('path').join(__dirname, '../src/environments');

    const envFile = 'environment';

    // Updated the Webpack configuration to load the environment file
    config.resolve.alias['environments'] = envPath + `/${envFile}.ts`;

    return config;
  },
};
export default config;

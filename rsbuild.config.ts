import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    alias: {
      src: './src',
      core: './src/core',
    },
  },
  output: {
    assetPrefix: './',
  },
});

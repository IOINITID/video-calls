import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      core: resolve(__dirname, './src/core'),
      modules: resolve(__dirname, './src/modules'),
    },
  },
  plugins: [react()],
});

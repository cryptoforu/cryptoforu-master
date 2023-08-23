import { defineConfig, splitVendorChunkPlugin } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import Unfonts from 'unplugin-fonts/vite';
import svgr from 'vite-plugin-svgr';
import preload from 'vite-plugin-preload';

export default defineConfig({
  server: {
    sourcemapIgnoreList(sourcePath, sourcemapPath) {
      let paths = ['node_modules', 'frontend'];
      paths.forEach((path) => {
        return sourcePath.includes(path);
      });
      return false;
    },
  },
  plugins: [
    laravel({
      input: 'resources/ts/app.tsx',
      refresh: true,
    }),
    react(),
    preload(),
    eslint(),
    Unfonts({
      fontsource: {
        families: [
          {
            name: 'Space Mono',
            weights: [400, 700],
          },
        ],
      },
    }),
    svgr(),
    splitVendorChunkPlugin(),
  ],
  resolve: {
    alias: [{ find: '@', replacement: '/resources/ts' }],
  },
});

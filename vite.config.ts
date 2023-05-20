import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import { isomorphicImport } from 'vite-plugin-isomorphic-import';
import Unfonts from 'unplugin-fonts/vite'
import svgr from 'vite-plugin-svgr'
export default defineConfig({
  plugins: [
    laravel({
      input: 'resources/ts/app.tsx',
      ssr: 'resources/ts/ssr.tsx',
      refresh: true,
    }),
    react(),
    eslint(),
    isomorphicImport({
      client: ['@uiw/react-md-editor'],
      server: [],
    }),
    Unfonts({
        fontsource: {
            families: [
                {
                    name: "Space Mono",
                    weights: [400, 700],
                }
            ]
        }

     }),
     svgr(),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: '/resources/ts' },
    ],
  },
  ssr: {
    noExternal: ['@inertiajs/react/server'],
  },
});

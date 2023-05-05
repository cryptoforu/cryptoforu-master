import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import { isomorphicImport } from 'vite-plugin-isomorphic-import';
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
    })
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

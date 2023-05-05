/* eslint-disable @typescript-eslint/no-explicit-any */
import { createInertiaApp } from '@inertiajs/react';
import { renderToString } from 'react-dom/server';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { RouteProvider } from './Providers';
import route from 'ziggy-js';

const appName = 'Cryptoforu';

createServer((page) => {
  (globalThis as any).Ziggy = page.props.ziggy;
  return createInertiaApp({
    page,
    render: renderToString,
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
      resolvePageComponent(
        `./Pages/${name}.tsx`,
        import.meta.glob('./Pages/**/*.tsx')
      ),
    setup: ({ App, props }) => {
      (global as any).route = (
        name: undefined,
        params: undefined,
        absolute: undefined,
        config = (globalThis as any).Ziggy
      ) => route(name, params, absolute, config);

      return (
        <RouteProvider route={(global as any).route}>
          <App {...props} />
        </RouteProvider>
      );
    },
  });
});

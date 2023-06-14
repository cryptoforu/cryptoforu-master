/* eslint-disable @typescript-eslint/no-explicit-any */
import './bootstrap';
import 'unfonts.css';

import { createInertiaApp } from '@inertiajs/react';
import { AnimatePresence, LazyMotion } from 'framer-motion';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AppProvider, RouteProvider, ThemeProvider } from './Providers';

const loadFeatures = () =>
  import('@/Motion/features.js').then((res) => res.default);

createInertiaApp({
  title: (title) => `${title} - Cryptoforu`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob('./Pages/**/*.tsx')
    ),
  progress: {
    delay: 250,
    color: '#10b981',
    showSpinner: true,
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <StrictMode>
        <LazyMotion features={loadFeatures}>
          <ThemeProvider cookies={props.initialPage.props.cookies as string}>
            <AppProvider>
              <RouteProvider route={(window as any).route}>
                <AnimatePresence mode="wait">
                  <App {...props} />
                </AnimatePresence>
              </RouteProvider>
            </AppProvider>
          </ThemeProvider>
        </LazyMotion>
      </StrictMode>
    );
  },
});

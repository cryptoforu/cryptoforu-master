/* eslint-disable @typescript-eslint/no-explicit-any */
import './bootstrap';
import 'unfonts.css';
import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { CacheProvider } from '@emotion/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { LazyMotion, AnimatePresence } from 'framer-motion';
import { AppProvider, RouteProvider, ThemeProvider } from './Providers';
import createEmotionCache from './createEmotionCache';

const loadFeatures = () =>
  import('@/Motion/features.js').then((res) => res.default);

const clientSideEmotionCache = createEmotionCache();
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
    hydrateRoot(
      el,
      <StrictMode>
        <LazyMotion features={loadFeatures}>
          <ThemeProvider cookies={props.initialPage.props.cookies as string}>
            <CacheProvider value={clientSideEmotionCache}>
              <AppProvider>
                <RouteProvider route={(window as any).route}>
                  <AnimatePresence mode="wait">
                    <App {...props} />
                  </AnimatePresence>
                </RouteProvider>
              </AppProvider>
            </CacheProvider>
          </ThemeProvider>
        </LazyMotion>
      </StrictMode>
    );
  },
});

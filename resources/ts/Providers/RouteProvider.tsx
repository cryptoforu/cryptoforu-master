import type { RequestPayload, VisitOptions } from '@inertiajs/core';
import { router } from '@inertiajs/react';
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useTransition,
} from 'react';
import r from 'ziggy-js';

type RouteContextData = {
  route: typeof r;
  navigate: (
    url: string,
    data?: RequestPayload,
    options?: VisitOptions
  ) => void;
  isPending: boolean;
};

export const RouteContext = createContext<RouteContextData | null>(null);

type RouteProviderProps = {
  route: typeof r;
};

const RouteProvider = ({
  children,
  route,
}: PropsWithChildren<RouteProviderProps>) => {
  const [isPending, startTransition] = useTransition();
  const onNavigate = useCallback(
    (url: string, data?: RequestPayload, options?: VisitOptions) => {
      return router.visit(url, {
        data: data,
        ...options,
      });
    },
    []
  );

  function navigate(
    url: string,
    data?: RequestPayload,
    options?: VisitOptions
  ) {
    startTransition(() => {
      onNavigate(url, data, options);
    });
  }

  return (
    <RouteContext.Provider value={{ route, navigate, isPending }}>
      {children}
    </RouteContext.Provider>
  );
};

export const useRoute = (): RouteContextData => {
  const fn = useContext<RouteContextData>(
    RouteContext as unknown as React.Context<RouteContextData>
  );
  if (!fn) {
    throw new Error('Route function must be provided');
  }
  return fn;
};

export default RouteProvider;

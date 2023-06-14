import type { Method, VisitOptions } from '@inertiajs/core';
import { router } from '@inertiajs/react';
import { useCallback } from 'react';

const useRouter = () => {
  const navigate = useCallback(
    (url: string, method?: Method, options?: VisitOptions) => {
      return router.visit(url, {
        method: method || 'get',
        preserveState: options?.preserveState || true,
        preserveScroll: options?.preserveScroll || true,
        ...options,
      });
    },
    []
  );

  return navigate;
};

export default useRouter;

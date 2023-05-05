import { usePage } from '@inertiajs/react';
import { InertiaSharedProps } from '../types';
import { PageProps } from '@inertiajs/core';

export default function useTypedPage<T = object>() {
  return usePage<InertiaSharedProps<T>>();
}

type S<T = object> = T &
  PageProps & {
    [key: string]: T;
  };

export function usePageProps<T = object>() {
  return usePage<S<T>>().props;
}

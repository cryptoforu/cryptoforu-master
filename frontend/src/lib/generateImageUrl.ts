import { StaticImport } from 'next/dist/shared/lib/get-img-props'

import { getImageUrl } from '@/lib/getApiUrl'

type ImageFilters =
  | 'lg'
  | 'aspect-height'
  | 'upsize'
  | 'icon'
  | 'data-image'
  | 'original'

export function generateImageUrl<T extends string | StaticImport>(
  filter?: ImageFilters,
  src?: T
) {
  if (typeof src === 'string') {
    return `${getImageUrl()}${filter}/${src}`
  }
  return src
}

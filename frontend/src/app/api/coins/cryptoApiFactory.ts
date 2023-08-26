import { cache } from 'react'

import { getBaseUrl } from '@/lib/getApiUrl'

export const getCoins = cache(async (query?: string) => {
  const url =
    query !== undefined
      ? getBaseUrl() + '/api/coins' + query
      : getBaseUrl() + '/api/coins'
  return await fetch(url).then((res) => res.json())
})

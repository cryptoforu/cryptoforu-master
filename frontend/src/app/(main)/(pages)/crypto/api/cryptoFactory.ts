import { notFound } from 'next/navigation'
import { cache } from 'react'

import { fetchData } from '@/lib/fetchClient'
import { getApiUrl, getBaseUrl } from '@/lib/getApiUrl'

export const getCryptoCategories = cache(async (category: string) => {
  const path = `${getBaseUrl()}/crypto/api/${category}`
  return await fetch(path).then((res) => res.json())
})

export const getCoins = cache(async (params?: string) => {
  const path =
    params !== undefined
      ? `${getApiUrl()}crypto` + params
      : `${getApiUrl()}crypto`

  const response = await fetchData(path)
  if (!response.ok) {
    throw new Error('Failed To Fetch Coins')
  }
  const coins = await response.json()
  if (!coins) {
    notFound()
  }
  return coins
})

import { notFound } from 'next/navigation'
import { cache } from 'react'

import {
  FaucetsListData,
  ListStats,
} from '@/app/(main)/(pages)/earn-crypto/faucets-lists/faucets-lists'
import { fetchData } from '@/lib/fetchClient'
import { getColumns } from '@/lib/generateColumns'
import { getApiUrl, getBaseUrl } from '@/lib/getApiUrl'

export const getList = cache(async (category: string, params?: string) => {
  const path = `${getBaseUrl()}/earn-crypto/faucets-lists/api/${category}`
  const url = params !== undefined ? path + '?' + params : path

  return await fetch(url).then((res) => res.json())
})
export const getListColumns = cache(async () => {
  const data = (await getList('TOP')) as FaucetsListData
  return getColumns(data.list.columns)
})

export const getListCategories = cache(async () => {
  const response = await fetchData(`${getApiUrl()}faucetpay/list/categories`)
  if (!response.ok) {
    throw new Error('Failed To Fetch List Categories')
  }
  const categories = await response.json()
  if (!categories) {
    notFound()
  }
  return categories
})

export const getStats = cache(async () => {
  const res = await fetchData('faucetpay/list/stats')
  if (!res.ok) {
    throw new Error('Failed To Fetch Data')
  }
  return (await res.json()) as ListStats
})

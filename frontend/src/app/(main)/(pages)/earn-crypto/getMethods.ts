import 'server-only'

import {
  EarnCategoryProps,
  EarningMethodsProps,
} from '@/app/(main)/(pages)/earn-crypto/earning-methods'
import { fetchData } from '@/lib/fetchClient'

export const getMethods = async (params?: string) => {
  const url =
    params !== undefined
      ? `earn/earn-methods` + '?' + params
      : `earn/earn-methods`
  const res = await fetchData(url)

  if (!res.ok) {
    throw new Error('Something went wrong while fetching data')
  }

  return (await res.json()) as EarningMethodsProps[]
}

export const getCategoryMethods = async (params?: string) => {
  const url =
    params !== undefined
      ? `earn/earn_categories?include=data` + '?' + params
      : `earn/earn_categories?include=data`
  const res = await fetchData(url)
  if (!res.ok) {
    throw new Error('Something went wrong while fetching data')
  }
  return (await res.json()) as EarnCategoryProps[]
}

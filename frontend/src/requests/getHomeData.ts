import { cache } from 'react'

import { PostApiResource } from '@/app/(main)/(pages)/learn-crypto/[category]/[post]/posts'
import { CategoryApiResource } from '@/app/(main)/(pages)/learn-crypto/categories'
import { fetchData } from '@/lib/fetchClient'
import { CryptoData } from '@/types/crypto'
import { EarningMethods } from '@/types/shared-types'

export interface HomeData {
  categories: CategoryApiResource[]
  crypto: {
    [x: string]: CryptoData
  }
  earning_methods: EarningMethods['data']
  latest_posts: Array<PostApiResource>
}

export const preloadHome = () => {
  void getHomeData()
}
export const getHomeData = cache(async (key?: keyof HomeData) => {
  const res = await fetchData('site/shared/home-resource')
  if (!res.ok) {
    throw new Error('Failed to fetch Home Resource')
  }
  const data = (await res.json()) as HomeData
  if (key) {
    return data[key]
  }
  return data
})

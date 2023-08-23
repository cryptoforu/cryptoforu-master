import { cache } from 'react'

import {
  CategoryWithPosts,
  PostWithCategory,
} from '@/app/(main)/(pages)/learn-crypto/blog'
import { fetchData } from '@/lib/fetchClient'
import { CryptoData } from '@/types/crypto'
import { EarningMethods } from '@/types/shared-types'

export interface HomeData {
  categories: CategoryWithPosts[]
  crypto: {
    [x: string]: CryptoData
  }
  earning_methods: EarningMethods['data']
  latest_posts: Array<PostWithCategory>
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

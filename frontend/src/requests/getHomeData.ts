import { cache } from 'react'
import { CategoryApiResource } from '@/app/(main)/(pages)/learn-crypto/categories'
import { CryptoData } from '@/types/crypto'
import { EarningMethods } from '@/types/shared-types'
import { PostApiResource } from '@/app/(main)/(pages)/learn-crypto/[category]/[post]/posts'
import { fetchData } from '@/lib/fetchClient'

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
export const getHomeData = cache(async () => {
  const res = await fetchData('home_resource')
  if (!res.ok) {
    throw new Error('Failed to fetch Home Resource')
  }

  return (await res.json()) as HomeData
})

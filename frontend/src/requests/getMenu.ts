import 'server-only'

import { cache } from 'react'

import { fetchData } from '@/lib/fetchClient'
import type { MainMenu } from '@/types/shared-types'

export const preloadMenu = () => {
  void getMenu()
}
export const getMenu = cache(async () => {
  const res = await fetchData('site/shared/front-menu')
  if (!res.ok) {
    throw new Error('Failed To Fetch Menu Data')
  }
  return (await res.json()) as MainMenu[]
})

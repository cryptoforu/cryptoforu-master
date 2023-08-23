import { cache } from 'react'

import { TagsProps } from '@/app/(main)/(pages)/learn-crypto/blog'
import { fetchData } from '@/lib/fetchClient'

export const getTags = cache(async () => {
  const res = await fetchData('blog/tags')
  if (!res.ok) {
    throw new Error('Failed to Fetch Tags')
  }
  return (await res.json()) as TagsProps[]
})

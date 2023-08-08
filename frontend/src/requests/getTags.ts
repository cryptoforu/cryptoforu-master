import { cache } from 'react'
import { fetchData } from '@/lib/fetchClient'
import { TagsApiResource } from '@/app/(main)/(pages)/learn-crypto/[category]/[post]/posts'

export const getTags = cache(async () => {
  const res = await fetchData('blog/tags')
  if (!res.ok) {
    throw new Error('Failed to Fetch Tags')
  }
  return (await res.json()) as TagsApiResource[]
})

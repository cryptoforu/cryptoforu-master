import { cache } from 'react'
import { notFound } from 'next/navigation'
import { CategoryApiResource } from '@/app/(main)/(pages)/learn-crypto/categories'
import { fetchData } from '@/lib/fetchClient'
import 'server-only'

export const getCategory = async (
  {
    slug,
  }: {
    slug: string
  },
  params?: string
) => {
  let url =
    params !== undefined
      ? `blog/categories/${slug}?include=posts.tags` + '&' + params
      : `blog/categories/${slug}?include=posts.tags`
  const res = await fetchData(url, {
    next: {
      tags: [`${slug}`],
    },
  })
  if (!res.ok) {
    throw new Error('Failed to Fetch Category')
  }

  const category = (await res.json()) as CategoryApiResource
  if (!category) {
    notFound()
  }

  return category
}
export const getCategories = cache(async (params?: string) => {
  let url =
    params !== undefined ? `blog/categories` + '?' + params : `blog/categories`
  const res = await fetchData(url, {
    next: {
      tags: ['categories'],
    },
  })
  if (!res.ok) {
    throw new Error('Failed to Fetch Category')
  }

  const categories = (await res.json()) as CategoryApiResource[]
  if (!categories) {
    notFound()
  }

  return categories
})

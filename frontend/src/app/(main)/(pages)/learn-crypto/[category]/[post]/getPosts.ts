import 'server-only'

import { notFound } from 'next/navigation'
import { cache } from 'react'

import type {
  CursorPaginatedPost,
  PostApiResource,
} from '@/app/(main)/(pages)/learn-crypto/[category]/[post]/posts'
import { fetchData } from '@/lib/fetchClient'

export const getArticle = cache(async ({ slug }: { slug: string }) => {
  const response = await fetchData(`blog/posts/${slug}?include=category`, {
    next: {
      revalidate: 3600,
      tags: [`${slug}`],
    },
  })
  if (!response.ok) {
    throw new Error('Failed to fetch Article')
  }
  const article = (await response.json()) as PostApiResource
  if (!article) {
    notFound()
  }
  return article
})

export const getArticles = cache(
  async (params?: string, init?: RequestInit | undefined) => {
    const url =
      params !== undefined ? `blog/posts` + '?' + params : `blog/posts`
    const response = await fetchData(url, init)
    if (!response.ok) {
      throw new Error('Failed to fetch Article List')
    }
    const articles = (await response.json()) as CursorPaginatedPost
    if (!articles) {
      notFound()
    }
    return articles
  }
)

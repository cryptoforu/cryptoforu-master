import 'server-only'

import { notFound } from 'next/navigation'
import { cache } from 'react'

import {
  CategoryProps,
  PostParams,
  PostWithCategory,
} from '@/app/(main)/(pages)/learn-crypto/blog'
import { fetchData } from '@/lib/fetchClient'
import { getImageUrl } from '@/lib/getApiUrl'
import seo from '@/lib/seo'

export const getCategories = cache(
  async (query?: string): Promise<unknown[]> => {
    const path = query !== undefined ? 'blog' + query : 'blog'
    const res = await fetchData(path, {
      next: {
        tags: ['categories'],
      },
    })
    if (!res.ok) {
      throw new Error('Failed To Fetch Categories')
    }
    const categories = (await res.json()) as unknown[]
    if (categories.length === 0) {
      notFound()
    }
    return categories
  }
)

export async function getCategory(category: string, query?: string) {
  const path =
    query !== undefined ? `/${category}/posts` + query : `/${category}/posts`
  return await getCategories(path)
}

export async function getArticle(
  category: string,
  post: string,
  query?: string
) {
  const path =
    query !== undefined
      ? `/${category}/posts/${post}` + query
      : `/${category}/posts/${post}`
  return await getCategories(path)
}

export const getCategoryMeta = cache(async (category: string) => {
  const categories = (await getCategories()) as CategoryProps[]
  const meta = categories.find((el) => el.slug === category)
  if (!meta) {
    return seo
  }
  return {
    title: meta.name,
    description: meta.description,
    alternates: {
      canonical: `learn-crypto/${meta.slug}`,
    },
    openGraph: {
      type: 'website',
      url: `${process.env.HOST}/learn-crypto/${meta.slug}`,
      title: meta.name,
      description: meta.description,
      siteName: 'Cryptoforu',
      images: [`${getImageUrl()}lg/${meta.category_image}`],
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@CryptoforuEarn',
      title: meta.name,
      description: meta.description,
      images: [`${getImageUrl()}lg/${meta.category_image}`],
    },
  }
})

export const getArticleMeta = cache(async ({ params }: PostParams) => {
  const meta = (await getArticle(
    params.category,
    params.post
  )) as unknown as PostWithCategory
  if (!meta) {
    return seo
  }
  return {
    title: meta.title,
    description: meta.introduction,
    alternates: {
      canonical: meta.post_links.post_link,
    },
    openGraph: {
      type: 'website',
      url: `${process.env.HOST}/${meta.post_links.post_link}`,
      title: meta.title,
      description: meta.introduction,
      siteName: 'Cryptoforu',
      images: [`${getImageUrl()}lg/${meta.image_name}`],
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@CryptoforuEarn',
      title: meta.title,
      description: meta.introduction,
      images: [`${getImageUrl()}lg/${meta.image_name}`],
    },
  }
})

export const filterCategory = cache(async (slug: string) => {
  const categories = (await getCategories()) as CategoryProps[]
  return categories.find((category) => category.slug === slug)
})

import 'server-only'

import { Metadata } from 'next'

import { fetchData } from '@/lib/fetchClient'
import { getImageUrl } from '@/lib/getApiUrl'
import seo from '@/lib/seo'

interface SiteData {
  id: number
  category_id: number
  slug: string
  title: string
  introduction: string
  image_name: string
  post_links: {
    post_link: string
  }
  category: {
    id: number
    slug: string
    name: string
    description: string
    category_image: string
  }
  tags?: {
    id: number
    name: string
  }[]
}

export async function getSiteData(query: string, retries: number) {
  const res = await fetchData('blog/generate' + '?' + query)
  if (!res.ok) {
    throw new Error('Failed to Generate Params')
  }
  if (res.status === 429 && retries > 0) {
    setTimeout(() => {
      return getSiteData(query, retries - 1)
    }, 60000)
  }
  return (await res.json()) as SiteData[]
}

export async function filterPostMetaData(filter: string): Promise<Metadata> {
  const metaData = await getSiteData(
    'filter[metadata]=id,title,introduction,slug,image_name,post_links',
    5
  )
  const meta = metaData.find((element) => element.slug === filter)
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
}

export async function filterCategoryMetaData(
  filter: string
): Promise<Metadata> {
  const metaData = await getSiteData('filter[metadata]=id,category_id', 5)
  const meta = metaData.find((element) => element.category.slug === filter)
  if (!meta) {
    return seo
  }
  return {
    title: meta.category.name,
    description: meta.category.description,
    alternates: {
      canonical: `learn-crypto/${meta.category.slug}`,
    },
    openGraph: {
      type: 'website',
      url: `${process.env.HOST}/learn-crypto/${meta.category.slug}`,
      title: meta.category.name,
      description: meta.category.description,
      siteName: 'Cryptoforu',
      images: [`${getImageUrl()}lg/${meta.category.category_image}`],
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@CryptoforuEarn',
      title: meta.category.name,
      description: meta.category.description,
      images: [`${getImageUrl()}lg/${meta.category.category_image}`],
    },
  }
}

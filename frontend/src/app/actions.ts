'use server'
import { fetchData } from '@/lib/fetchClient'

export async function revalidate(tag: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/revalidate?tag=${tag}`,
    {
      method: 'POST',
    }
  )
  return res.json()
}

export async function loadMore({
  slug,
  pageSize,
}: {
  slug: string
  pageSize: number
}) {
  const res = await fetchData(
    `blog/categories/${slug}?include=posts.tags&page[size]=${pageSize}`
  )
  if (!res.ok) {
    throw new Error('Something Went Wrong')
  }
  return await res.json()
}

export type CountProps = {
  timestamp: number
  views: number
  ips: {
    ip: string
  }
}

export async function count(slug: string) {
  const res = await fetchData(`count-views/${slug}`, {
    cache: 'no-cache',
  })
  if (!res.ok) {
    throw new Error('Something Went Wrong')
  }
  return (await res.json()) as CountProps
}

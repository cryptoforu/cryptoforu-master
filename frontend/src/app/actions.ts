'use server'
import { fetchData } from '@/lib/fetchClient'
import { NextRequest } from 'next/server'

export async function login(request: NextRequest) {
  const user = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}user`, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_ADMIN_TOKEN}`,
    },
  })
  return user.ok
}

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

export async function count(slug: string) {
  const res = await fetchData(`count/${slug}`, { cache: 'no-cache' })
  if (!res.ok) {
    throw new Error('Something Went Wrong')
  }
  return await res.json()
}

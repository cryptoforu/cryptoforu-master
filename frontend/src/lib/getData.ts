import { cache } from 'react'
import 'server-only'
import { fetchData } from '@/lib/fetchClient'

export const preload = (url: string) => {
  void getData(url)
}

export const getData = cache(async (url: string, init?: RequestInit) => {
  const res = await fetchData(`${url}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
})

export const getMetadata = cache(async (page: string) => {
  const meta = await getData(`site/shared/meta-data?filter[page_name]=${page}`)
  return {
    title: meta.label,
    description: meta.meta_desc,
    alternates: {
      canonical: meta.route,
    },
  }
})

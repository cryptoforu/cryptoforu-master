import { cache } from 'react'
import 'server-only'

export const preload = (url: string) => {
  void getData(url)
}

export const getData = cache(async (url: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
})

export const getMetadata = cache(async (page: string) => {
  const meta = await getData(`meta-data?filter[page_name]=${page}`)
  return {
    title: meta.label,
    description: meta.meta_desc,
  }
})

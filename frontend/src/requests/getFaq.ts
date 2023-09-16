import { cache } from 'react'

import { fetchData } from '@/lib/fetchClient'

export type GetFaqProps = {
  data_name: string
  data_values: {
    key: string
    value: string
  }[]
}

export const getFaq = cache(async () => {
  const res = await fetchData('site/faq_questions')
  if (!res.ok) {
    throw new Error('Failed to fetch Faq')
  }
  return (await res.json()) as GetFaqProps
})

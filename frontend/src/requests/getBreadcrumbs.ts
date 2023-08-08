import 'server-only'
import { cache } from 'react'
import { fetchData } from '@/lib/fetchClient'
import { BreadcrumbsProps } from '@/types/shared-types'

export const getBreadcrumbs = cache(async () => {
  const response = await fetchData('breadcrumbs')
  if (!response.ok) {
    throw new Error('Failed to fetch Breadcrumbs Data')
  }
  return (await response.json()) as BreadcrumbsProps[]
})

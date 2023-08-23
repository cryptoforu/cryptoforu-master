import type { BreadcrumbsProps } from '@/types/shared-types'

export interface ReturnedCrumbs extends BreadcrumbsProps {
  description: string | null
  filtered: boolean
}

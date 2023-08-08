import type { BreadcrumbsProps } from '@/types/shared-types'

export type CrumbsContextData = {
  crumbsData: BreadcrumbsProps[]
}

export interface ReturnedCrumbs extends BreadcrumbsProps {
  description: string | null
  filtered: boolean
}

export type CrumbsGetters = {
  getCrumbs: (route: string, segments: string[]) => ReturnedCrumbs | null
}

export interface ICrumbs extends CrumbsContextData, CrumbsGetters {}

// noinspection JSUnusedGlobalSymbols

import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { BreadcrumbsProps } from '@/types/shared-types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRandItem<T = unknown>(arr: Array<T>) {
  const randomIndex = Math.floor(Math.random() * arr.length)

  return arr[randomIndex]
}

export const parseFloatNumber = (value: string) => {
  const floatValue = parseFloat(value)
  return !isNaN(floatValue) ? floatValue : ''
}

export const isObjectEmpty = (objectName: object) => {
  for (const prop in objectName) {
    if (prop) {
      return false
    }
  }
  return true
}

export function filterObjectKey<T extends object>(obj: T, filterKey: string) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => key.includes(filterKey))
  )
}

export function filterCrumbs(
  crumbsData: BreadcrumbsProps[],
  route: string,
  segments: string[]
) {
  const found = crumbsData.find((el) => el.route === route)
  if (found) {
    const filtered =
      found.label.includes('FaucetPay') || found.label.length > 20
    const filteredDesc =
      segments.length > 1 && !filtered ? null : found.meta_desc
    return {
      label: found.label,
      description: filteredDesc,
      filtered: filtered,
      route: found.route,
      meta_desc: found.meta_desc,
      parents: found.parents,
    }
  }
  return null
}

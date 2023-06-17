import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const createQuery = (name: string, value: string) => {
  const params = new URLSearchParams()
  params.set(name, value)

  return params.toString()
}

export const parseFloatNumber = (value: string) => {
  const floatValue = parseFloat(value)
  return !isNaN(floatValue) ? floatValue : ''
}

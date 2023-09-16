'use client'
import type { ErrorProps } from '@/components/ErrorBoundary'
import ErrorBoundary from '@/components/ErrorBoundary'

export default function Error({ error, reset }: ErrorProps) {
  return <ErrorBoundary error={error} reset={reset} />
}

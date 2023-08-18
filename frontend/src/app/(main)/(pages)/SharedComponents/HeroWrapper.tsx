'use client'
import { useParams } from 'next/navigation'
import type { ReactNode } from 'react'

const HeroWrapper = ({ children }: { children: ReactNode }) => {
  const params = useParams()
  if (params.post) {
    return
  }
  return <>{children}</>
}
export default HeroWrapper

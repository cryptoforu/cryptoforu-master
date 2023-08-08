'use client'
import type { ReactNode } from 'react'
import { useParams } from 'next/navigation'

const HeroWrapper = ({ children }: { children: ReactNode }) => {
  const params = useParams()
  if (params.post) {
    return
  }
  return <>{children}</>
}
export default HeroWrapper
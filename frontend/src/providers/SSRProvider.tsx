'use client'

import { SSRProvider } from '@react-aria/ssr'
import { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  return <SSRProvider>{children}</SSRProvider>
}

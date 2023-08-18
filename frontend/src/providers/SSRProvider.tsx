'use client'

import { ReactNode } from 'react'
import { I18nProvider } from 'react-aria'

export default function Providers({ children }: { children: ReactNode }) {
  return <I18nProvider locale={'en-US'}>{children}</I18nProvider>
}

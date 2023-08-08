'use client'

import { I18nProvider } from 'react-aria'
import { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  return <I18nProvider locale={'en-US'}>{children}</I18nProvider>
}

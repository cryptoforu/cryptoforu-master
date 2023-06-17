'use client'

import { SSRProvider } from '@react-aria/ssr'
import { I18nProvider } from '@react-aria/i18n'
import { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SSRProvider>
      <I18nProvider locale={'en-US'}>{children}</I18nProvider>{' '}
    </SSRProvider>
  )
}

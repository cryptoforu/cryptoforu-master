import './globals.css'
import { space } from '@/fonts/fonts'
import seo from '@/lib/seo'
import themeScript from '@/lib/theme-script'
import Script from 'next/script'
import { ReactNode } from 'react'
import type { Metadata } from 'next'
import SSRProvider from '@/providers/SSRProvider'

export const metadata: Metadata = seo

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={'dark'}>
      <body
        className={`${space.className} flex h-full flex-col overflow-x-hidden bg-primary-white antialiased dark:bg-primary-dark`}
      >
        <Script
          id={'theme-script'}
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        <SSRProvider>{children}</SSRProvider>
      </body>
    </html>
  )
}

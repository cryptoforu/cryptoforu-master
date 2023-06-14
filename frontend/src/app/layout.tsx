import './globals.css'
import { space_grotesk } from '@/data/fonts'
import seo from '@/data/seo'
import themeScript from '@/lib/theme-script'
import Script from 'next/script'
import { ReactNode } from 'react'
import type { Metadata } from 'next'
import SSRProvider from '@/providers/SSRProvider'

export const metadata: Metadata = seo

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={'dark'}>
      <head>
        <Script
          id={'theme-script'}
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        <title></title>
      </head>
      <body
        className={`${space_grotesk.className} flex h-full flex-col overflow-x-hidden bg-primary-white antialiased dark:bg-primary-dark`}
      >
        <SSRProvider>{children}</SSRProvider>
      </body>
    </html>
  )
}

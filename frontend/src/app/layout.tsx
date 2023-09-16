// noinspection JSUnusedGlobalSymbols

import './globals.css'

import type { Metadata } from 'next'
import Script from 'next/script'
import { ReactNode } from 'react'
import { Config } from 'ziggy-js'

import { getRoutes } from '@/app/api/apiFactory'
import { space } from '@/fonts/fonts'
import seo from '@/lib/seo'
import themeScript from '@/lib/theme-script'
import SSRProvider from '@/providers/SSRProvider'
// noinspection JSUnusedGlobalSymbols
export const metadata: Metadata = seo

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  globalThis.Ziggy = (await getRoutes()) as Config

  return (
    <html lang="en" className={'dark'} suppressHydrationWarning={true}>
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

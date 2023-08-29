// noinspection JSUnusedGlobalSymbols

import { Suspense } from 'react'

import BlogPosts from '@/app/(main)/components/BlogPosts'
import Crypto from '@/app/(main)/components/Crypto'
import CryptoAcademy from '@/app/(main)/components/CryptoAcademy'
import Features from '@/app/(main)/components/Features'
import Hero from '@/app/(main)/components/Hero'
import CryptoData from '@/app/(main)/components/partials/CryptoData'
import SubscribeHeader from '@/app/(main)/components/partials/SubscribeHeader'
import EarningMethods from '@/app/(main)/ui/EarningMethods'
import { CryptoCoin } from '@/app/api/coins/crypto'
import { getCoins } from '@/app/api/coins/cryptoApiFactory'
import {
  CardSkeleton,
  ContentSkeleton,
  SectionSkeleton,
} from '@/components/skeletons'
import { getMetadata, preload } from '@/lib/getData'
import type { DataItems } from '@/store/types/data-table-store'
import { CryptoProvider } from '@/store/useCrypto'
import TableProvider from '@/store/useDataTableStore'

preload('site/shared/meta-data?filter[page_name]=home')

export async function generateMetadata() {
  return await getMetadata('home')
}

export default async function Home() {
  const data = (await getCoins(
    '?filter[unique]=Bitcoin,Ethereum,Cardano,BNB,XRP,Solana'
  )) as DataItems<CryptoCoin>

  return (
    <>
      <Hero />
      <Features />
      <Suspense fallback={<SectionSkeleton />}>
        <CryptoProvider crypto={data}>
          <TableProvider data={data}>
            <Crypto>
              <CryptoData />
            </Crypto>
          </TableProvider>
        </CryptoProvider>
      </Suspense>
      <Suspense fallback={<CardSkeleton cards={3} />}>
        <CryptoAcademy />
      </Suspense>
      <BlogPosts>
        <SubscribeHeader />
      </BlogPosts>
      <Suspense fallback={<ContentSkeleton cards={3} />}>
        <EarningMethods page={'home'} />
      </Suspense>
    </>
  )
}

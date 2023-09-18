// noinspection JSUnusedGlobalSymbols

import { Suspense } from 'react'

import BlogPosts from '@/app/(main)/components/BlogPosts'
import Crypto from '@/app/(main)/components/Crypto'
import CryptoAcademy from '@/app/(main)/components/CryptoAcademy'
import Features from '@/app/(main)/components/Features'
import Hero from '@/app/(main)/components/Hero'
import CryptoData from '@/app/(main)/components/partials/CryptoData'
import EarningMethods from '@/app/(main)/ui/EarningMethods'
import { getCoins } from '@/app/api/crypto/cryptoRoutes'
import { getMetaData } from '@/app/api/site_data/siteRoutes'
import {
  CardSkeleton,
  ContentSkeleton,
  SectionSkeleton,
} from '@/components/skeletons'
import { CryptoProvider } from '@/store/useCrypto'

export async function generateMetadata() {
  return await getMetaData('home')
}

export default async function Home() {
  const data = await getCoins({
    filter: {
      unique: 'Bitcoin,Ethereum,Cardano,BNB,XRP,Solana',
    },
    sort: 'market_cap_rank',
  })

  return (
    <>
      <Hero />
      <Features />
      <Suspense fallback={<SectionSkeleton />}>
        <CryptoProvider crypto={data}>
          <Crypto>
            <CryptoData />
          </Crypto>
        </CryptoProvider>
      </Suspense>
      <Suspense fallback={<CardSkeleton cards={3} />}>
        <CryptoAcademy />
      </Suspense>
      <BlogPosts />
      <Suspense fallback={<ContentSkeleton cards={3} />}>
        <EarningMethods page={'home'} />
      </Suspense>
    </>
  )
}

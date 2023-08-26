// noinspection JSUnusedGlobalSymbols

import { Suspense } from 'react'

import BlogPosts from '@/app/(main)/components/BlogPosts'
import Crypto from '@/app/(main)/components/Crypto'
import CryptoAcademy from '@/app/(main)/components/CryptoAcademy'
import Features from '@/app/(main)/components/Features'
import Hero from '@/app/(main)/components/Hero'
import SubscribeHeader from '@/app/(main)/components/partials/SubscribeHeader'
import EarningMethods from '@/app/(main)/ui/EarningMethods'
import { CryptoData } from '@/app/api/coins/crypto'
import { getCoins } from '@/app/api/coins/cryptoApiFactory'
import {
  CardSkeleton,
  ContentSkeleton,
  SectionSkeleton,
} from '@/components/skeletons'
import { getMetadata, preload } from '@/lib/getData'
import { CryptoProvider } from '@/store/useCrypto'

preload('site/shared/meta-data?filter[page_name]=home')

export async function generateMetadata() {
  return await getMetadata('home')
}

export default async function Home() {
  const { data: crypto } = (await getCoins(
    '?filter[unique]=Bitcoin,Ethereum,Cardano,BNB,XRP,Solana'
  )) as { data: CryptoData[] }
  return (
    <>
      <Hero />
      <Features />
      <Suspense fallback={<SectionSkeleton />}>
        <CryptoProvider crypto={crypto}>
          <Crypto />
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

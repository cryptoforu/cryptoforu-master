// noinspection JSUnusedGlobalSymbols

import { Suspense } from 'react'

import BlogPosts from '@/app/(main)/components/BlogPosts'
import Crypto from '@/app/(main)/components/Crypto'
import CryptoAcademy from '@/app/(main)/components/CryptoAcademy'
import EarningMethods from '@/app/(main)/components/EarningMethods'
import Features from '@/app/(main)/components/Features'
import Hero from '@/app/(main)/components/Hero'
import SubscribeHeader from '@/app/(main)/components/partials/SubscribeHeader'
import { CardSkeleton, SectionSkeleton } from '@/components/skeletons'
import { getMetadata, preload } from '@/lib/getData'
import { getHomeData, HomeData, preloadHome } from '@/requests/getHomeData'
import { CryptoProvider } from '@/store/useCrypto'

preload('site/shared/meta-data?filter[page_name]=home')
preloadHome()

export async function generateMetadata() {
  return await getMetadata('home')
}

export default async function Home() {
  const crypto = (await getHomeData('crypto')) as HomeData['crypto']
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
      <Suspense fallback={<SectionSkeleton />}>
        <EarningMethods />
      </Suspense>
    </>
  )
}

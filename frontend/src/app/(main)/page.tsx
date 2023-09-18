// noinspection JSUnusedGlobalSymbols

import { Suspense } from 'react'

import BlogPosts from '@/app/(main)/components/BlogPosts'
import Crypto from '@/app/(main)/components/Crypto'
import CryptoAcademy from '@/app/(main)/components/CryptoAcademy'
import Features from '@/app/(main)/components/Features'
import Hero from '@/app/(main)/components/Hero'
import EarningMethods from '@/app/(main)/ui/EarningMethods'
import { getMetaData } from '@/app/api/site_data/siteRoutes'
import {
  CardSkeleton,
  ContentSkeleton,
  SectionSkeleton,
} from '@/components/skeletons'

export async function generateMetadata() {
  return await getMetaData('home')
}

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Suspense fallback={<SectionSkeleton />}>
        <Crypto />
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

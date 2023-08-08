import { Suspense } from 'react'
import Features from '@/app/(main)/components/Features'
import Hero from '@/app/(main)/components/Hero'
import Crypto from '@/app/(main)/components/Crypto'
import CryptoAcademy from '@/app/(main)/components/CryptoAcademy'
import { getMetadata, preload } from '@/lib/getData'
import EarningMethods from '@/app/(main)/components/EarningMethods'
import { getHomeData, preloadHome } from '@/requests/getHomeData'
import { SectionSkeleton } from '@/components/skeletons'
import { CryptoProvider } from '@/store/useCrypto'
import BlogPosts from '@/app/(main)/components/BlogPosts'

preload('meta-data?filter[page_name]=home')
preloadHome()

export async function generateMetadata() {
  return await getMetadata('home')
}

export default async function Home() {
  const homeData = await getHomeData()
  return (
    <>
      <Hero />
      <Features />
      <Suspense fallback={<SectionSkeleton />}>
        <CryptoProvider crypto={homeData.crypto}>
          <Crypto />
        </CryptoProvider>
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <CryptoAcademy categories={homeData.categories} />
        <BlogPosts latest_posts={homeData.latest_posts} />
        <EarningMethods earnData={homeData.earning_methods} />
      </Suspense>
    </>
  )
}

import { Suspense } from 'react'
import Features from '@/app/(main)/components/Features'
import LoadingSection from '@/motion/LoadingSection'
import Hero from '@/app/(main)/components/Hero'
import Crypto from '@/app/(main)/components/Crypto'
import CryptoAcademy from '@/app/(main)/components/CryptoAcademy'
import { getMetadata, preload } from '@/lib/getData'

preload('meta-data?filter[page_name]=home')

export async function generateMetadata() {
  return await getMetadata('home')
}

export default async function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<LoadingSection />}>
        <Features />
      </Suspense>
      <Suspense fallback={<LoadingSection />}>
        <Crypto />
      </Suspense>
      <Suspense fallback={<LoadingSection />}>
        <CryptoAcademy />
      </Suspense>
    </>
  )
}

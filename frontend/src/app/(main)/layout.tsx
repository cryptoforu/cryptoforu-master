// noinspection JSUnusedGlobalSymbols

import dynamic from 'next/dynamic'
import { ReactNode, Suspense } from 'react'

import Footer from '@/components/footer/Footer'
import BackToTop from '@/components/misc/BackToTop'
import MainMenu from '@/components/navbar/MainMenu'
import Navbar from '@/components/navbar/Navbar'
import { BigSpinner } from '@/components/skeletons'
import NavSkeleton from '@/components/skeletons/NavSkeleton'

const NewsLetter = dynamic(() => import('@/components/footer/NewsLetter'))

export default async function MainLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <Suspense fallback={<NavSkeleton />}>
        <Navbar>
          <MainMenu />
        </Navbar>
      </Suspense>
      <Suspense fallback={<BigSpinner />}>
        <main className={'relative flex-1 focus:outline-none'}>{children}</main>
        <NewsLetter />
        <Footer />
        <BackToTop />
      </Suspense>
    </>
  )
}

// noinspection JSUnusedGlobalSymbols

import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

import Footer from '@/components/footer/Footer'
import BackToTop from '@/components/misc/BackToTop'
import Navbar from '@/components/navbar/Navbar'

const NewsLetter = dynamic(() => import('@/components/footer/NewsLetter'))

export default async function MainLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className={'relative flex-1 focus:outline-none'}>{children}</main>
      <NewsLetter />
      <Footer />
      <BackToTop />
    </>
  )
}

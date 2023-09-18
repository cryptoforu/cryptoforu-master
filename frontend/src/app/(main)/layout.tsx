// noinspection JSUnusedGlobalSymbols

import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

import Footer from '@/components/footer/Footer'
import BackToTop from '@/components/misc/BackToTop'
import Navbar from '@/components/navbar/Navbar'

const NewsLetter = dynamic(() => import('@/components/footer/NewsLetter'))

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className={'flex min-h-full flex-col'}>
      <Navbar />
      <main>{children}</main>
      <NewsLetter />
      <Footer />
      <BackToTop />
    </div>
  )
}

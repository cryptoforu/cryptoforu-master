import dynamic from 'next/dynamic'
import { ReactNode, Suspense } from 'react'

import Footer from '@/components/footer/Footer'
import BackToTop from '@/components/misc/BackToTop'
import MainMenu from '@/components/navbar/MainMenu'
import Navbar from '@/components/navbar/Navbar'

const NewsLetter = dynamic(() => import('@/components/footer/NewsLetter'))

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar>
        <Suspense fallback={<></>}>
          <MainMenu />
        </Suspense>
      </Navbar>
      <main className={'relative flex-1 focus:outline-none'}>{children}</main>
      <NewsLetter />
      <Footer />
      <BackToTop />
    </>
  )
}

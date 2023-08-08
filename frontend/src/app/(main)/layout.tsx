import { ReactNode } from 'react'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import NewsLetter from '@/components/footer/NewsLetter'
import BackToTop from '@/components/misc/BackToTop'

export default function MainLayout({ children }: { children: ReactNode }) {
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

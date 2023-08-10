import { ReactNode } from 'react'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import NewsLetter from '@/components/footer/NewsLetter'
import BackToTop from '@/components/misc/BackToTop'
import MainMenu from '@/components/navbar/MainMenu'
import { getMenu, preloadMenu } from '@/requests/getMenu'

preloadMenu()

export default async function MainLayout({
  children,
}: {
  children: ReactNode
}) {
  const menu = await getMenu()
  return (
    <>
      <Navbar>
        <MainMenu menu={menu} />
      </Navbar>
      <main className={'relative flex-1 focus:outline-none'}>{children}</main>
      <NewsLetter />
      <Footer />
      <BackToTop />
    </>
  )
}

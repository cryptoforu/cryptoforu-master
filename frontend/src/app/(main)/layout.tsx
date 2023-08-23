// noinspection JSUnusedGlobalSymbols

import dynamic from 'next/dynamic'
import { ReactNode, Suspense } from 'react'

import Footer from '@/components/footer/Footer'
import BackToTop from '@/components/misc/BackToTop'
import MainMenu from '@/components/navbar/MainMenu'
import Navbar from '@/components/navbar/Navbar'
import NavSkeleton from '@/components/skeletons/NavSkeleton'
import { getMenu, preloadMenu } from '@/requests/getMenu'
import { MenuProvider } from '@/store/useNavStore'

preloadMenu()

const NewsLetter = dynamic(() => import('@/components/footer/NewsLetter'))

export default async function MainLayout({
  children,
}: {
  children: ReactNode
}) {
  const menu = await getMenu()
  return (
    <>
      <Suspense fallback={<NavSkeleton />}>
        <MenuProvider menu={menu}>
          <Navbar>
            <MainMenu />
          </Navbar>
        </MenuProvider>
      </Suspense>
      <main className={'relative flex-1 focus:outline-none'}>{children}</main>
      <NewsLetter />
      <Footer />
      <BackToTop />
    </>
  )
}

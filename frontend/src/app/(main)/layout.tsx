import { ReactNode } from 'react'
import Navbar from '@/components/navbar/Navbar'

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />

      <main className={'relative flex-1 focus:outline-none'}>{children}</main>
    </>
  )
}

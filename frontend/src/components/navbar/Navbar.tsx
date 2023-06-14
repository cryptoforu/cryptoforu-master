'use client'

import Link from 'next/link'
import AppLogo from '@/components/AppLogo'
import { useNavbarAnimation, useScrolled } from '@/store/useNavStore'
import ThemeToggle from '@/components/navbar/ThemeToggle'

const Navbar = () => {
  const scrolledState = useScrolled()
  const scope = useNavbarAnimation(scrolledState)
  return (
    <header
      ref={scope}
      className={`sticky top-0 !z-50 w-full border-b border-slate-900/10 shadow-md shadow-slate-900/5 transition-colors duration-500 dark:border-slate-50/[0.06] dark:shadow-none`}
    >
      <nav
        className="flex items-center justify-between p-4 lg:px-8"
        aria-label="Navbar"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5">
            <span className="sr-only">Home page</span>
            <AppLogo variant="nav_logo" className="h-auto w-20" />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end gap-4">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
export default Navbar

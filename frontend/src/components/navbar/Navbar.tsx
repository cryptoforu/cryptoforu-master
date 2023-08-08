'use client'

import Link from 'next/link'
import AppLogo from '@/components/AppLogo'
import { useNavController } from '@/store/controllers/useNavController'
import ThemeToggle from '@/components/navbar/ThemeToggle'
import { clsx } from 'clsx'

const baseStyle =
  'sticky top-0 !z-50 w-full border-b border-slate-900/10 shadow-md shadow-slate-900/5 transition-colors duration-500 dark:border-slate-50/[0.06] dark:shadow-none'
const variants = {
  scrolled:
    'bg-white/90 backdrop-blur [@supports(backdrop-filter:blur(0))]:bg-white-900/75 dark:bg-primary-dark/95 dark:backdrop-blur dark:[@supports(backdrop-filter:blur(0))]:bg-slate-950/75',
  notScrolled: 'bg-transparent',
}

const Navbar = () => {
  const isScrolled = useNavController()
  return (
    <header
      className={clsx(
        baseStyle,
        isScrolled ? variants.scrolled : variants.notScrolled
      )}
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

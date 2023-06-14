import { useCallback, useEffect } from 'react'
import { create } from 'zustand'
import { shallow } from 'zustand/shallow'
import { useAnimate, useMotionValueEvent, useScroll } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useCurrentTheme } from '@/store/useThemeStore'

type NavState = {
  navState: boolean
  navVariants: {
    [x: string]: string
  }
}

type NavActions = {
  setScrolled: (action: boolean) => void
  getActive: (pathname: string, href: string) => boolean
}

interface NavbarStore extends NavState, NavActions {}

const useNavbarStore = create<NavbarStore>()((set, get) => ({
  navState: false,
  navVariants: {
    scrolled:
      'bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-slate-900 dark:backdrop-blur dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75',
    notScrolled: 'bg-transparent',
  },
  setScrolled: (action) =>
    set((state) => ({
      navState: action,
    })),
  getActive: (pathname, href) => {
    return pathname.startsWith(href)
  },
}))

export const useScrolled = () => {
  const [navState, setScrolled] = useNavbarStore(
    (state) => [state.navState, state.setScrolled],
    shallow
  )
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 0)
  })
  return navState
}

export function useNavbarAnimation(navState: boolean) {
  const [scope, animate] = useAnimate()
  const theme = useCurrentTheme()
  let isDarkMode = theme === 'dark'
  useEffect(() => {
    scope.current &&
      animate(
        scope.current,
        navState
          ? {
              backgroundColor: isDarkMode
                ? 'rgba(2, 6, 23, 0.9)'
                : 'rgba(236, 253, 245, 0.9)',
              backdropFilter: isDarkMode
                ? `blur(8px)`
                : '@supports(backdrop-filter:blur(rgba(236, 253, 245, 0.6)))',
            }
          : {
              backgroundColor: isDarkMode
                ? 'rgba(2, 6, 23, 0.1)'
                : 'rgba(236, 253, 245, 0.1)',
            }
      )
  }, [animate, isDarkMode, navState, scope])
  return scope
}

export const useActive = () => {
  const pathname = usePathname()
  const getActive = useNavbarStore((state) => state.getActive)
  return useCallback(
    (href: string) => {
      return getActive(pathname, href)
    },
    [getActive, pathname]
  )
}

import { create } from 'zustand'
import createSelectors from '@/store/createSelectors'

type NavState = {
  navState: boolean
  navVariants: {
    [x: string]: string
  }
}

type NavActions = {
  setScrolled: (action: boolean) => void
}

type NavGetters = {
  getActive: (pathname: string, href: string) => boolean
}

interface NavbarStore extends NavState, NavActions, NavGetters {}

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
const useNavStore = createSelectors(useNavbarStore)
export default useNavStore

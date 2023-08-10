import { create } from 'zustand'
import createSelectors from '@/store/createSelectors'
import { Nullable } from '@/types/shared-types'

type NavState = {
  navState: boolean
  navVariants: {
    [x: string]: string
  }
  hoveredIndex: Nullable<string | number>
  activeLink: string
}

type NavActions = {
  setScrolled: (action: boolean) => void
  setHovered: (index: Nullable<string | number>) => void
  setActive: (link: string) => void
}

interface NavbarStore extends NavState, NavActions {}

const useNavbarStore = create<NavbarStore>()((set, get) => ({
  navState: false,
  hoveredIndex: null,
  activeLink: '/',
  navVariants: {
    scrolled:
      'bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-slate-900 dark:backdrop-blur dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75',
    notScrolled: 'bg-transparent',
  },
  setScrolled: (action) =>
    set((state) => ({
      navState: action,
    })),
  setHovered: (index) => set(() => ({ hoveredIndex: index })),
  setActive: (link) => set(() => ({ activeLink: link })),
}))
const useNavStore = createSelectors(useNavbarStore)
export default useNavStore

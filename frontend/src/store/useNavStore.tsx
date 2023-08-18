'use client'
import { usePathname } from 'next/navigation'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'
import { create, createStore } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { useStoreWithEqualityFn } from 'zustand/traditional'

import createSelectors from '@/store/createSelectors'
import { MainMenu, Nullable } from '@/types/shared-types'

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

const useNavbarStore = create<NavbarStore>()((set) => ({
  navState: false,
  hoveredIndex: null,
  activeLink: '/',
  navVariants: {
    scrolled:
      'bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-slate-900 dark:backdrop-blur dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75',
    notScrolled: 'bg-transparent',
  },
  setScrolled: (action) =>
    set(() => ({
      navState: action,
    })),
  setHovered: (index) => set(() => ({ hoveredIndex: index })),
  setActive: (link) => set(() => ({ activeLink: link })),
}))
const useNavStore = createSelectors(useNavbarStore)
export default useNavStore

type MenuContextData = {
  menu: MainMenu[]
}

type MenuState = {
  activeItem: string | number
  setActive: (href: string) => void
}

interface MenuData extends MenuContextData, MenuState {}

type UseMenuStore = ReturnType<typeof createMenuStore>
const createMenuStore = (initProps?: Partial<MenuContextData>) => {
  const DEFAULT_PROPS: MenuContextData = {
    menu: [],
  }
  return createStore(
    immer<MenuData>((set) => ({
      ...DEFAULT_PROPS,
      ...initProps,
      activeItem: 0,
      setActive: (href) =>
        set((state) => {
          state.menu.map((el, index) => {
            if (el.route === href) {
              state.activeItem = index
            } else {
              const child = el.childs.find((child) => child.route === href)
              if (child) {
                state.activeItem = index
              }
            }
          })
        }),
    }))
  )
}

const MenuContext = createContext<UseMenuStore | null>(null)

export function MenuProvider({
  children,
  ...props
}: PropsWithChildren<MenuContextData>) {
  const [menuStore] = useState(() => createMenuStore(props))
  const setActive = menuStore.getState().setActive
  const path = usePathname()
  useEffect(() => {
    setActive(path)
  }, [path, setActive])
  return (
    <MenuContext.Provider value={menuStore}>{children}</MenuContext.Provider>
  )
}

export function useMenuContext<T>(
  selector: (state: MenuData) => T,
  equalityFn?: (left: T, right: T) => boolean
): T {
  const menuStore = useContext(MenuContext)
  if (!menuStore) throw new Error('Must be under Menu Provider')
  return useStoreWithEqualityFn(menuStore, selector, equalityFn)
}

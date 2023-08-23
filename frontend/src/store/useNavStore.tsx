'use client'
import { usePathname } from 'next/navigation'
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { create, createStore } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { useStoreWithEqualityFn } from 'zustand/traditional'

import createSelectors from '@/store/createSelectors'
import { MainMenu, Nullable } from '@/types/shared-types'

type NavState = {
  navState: boolean
  hoveredIndex: Nullable<string | number>
}

type NavActions = {
  setScrolled: (action: boolean) => void
  setHovered: (index: Nullable<string | number>) => void
}

interface NavbarStore extends NavState, NavActions {}

const useNavbarStore = create<NavbarStore>()((set) => ({
  navState: false,
  hoveredIndex: null,
  setScrolled: (action) =>
    set(() => ({
      navState: action,
    })),
  setHovered: (index) => set(() => ({ hoveredIndex: index })),
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

interface MenuData extends MenuContextData, MenuState {
  _hasHydrated: boolean
  setHasHydrated: (state: boolean) => void
}

type UseMenuStore = ReturnType<typeof createMenuStore>
const createMenuStore = (initProps?: Partial<MenuContextData>) => {
  const DEFAULT_PROPS: MenuContextData = {
    menu: [],
  }
  return createStore(
    persist(
      immer<MenuData>((set) => ({
        ...DEFAULT_PROPS,
        ...initProps,
        activeItem: 0,
        _hasHydrated: false,
        setActive: (href) =>
          set((state) => {
            state.menu.map((el, index) => {
              if (state.activeItem === index) return
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
        setHasHydrated: (state) => set({ _hasHydrated: state }),
      })),
      {
        name: 'menu-storage',
        partialize: (state) => state.menu,
        onRehydrateStorage: () => (state) => {
          state.setHasHydrated(true)
        },
      }
    )
  )
}

const MenuContext = createContext<UseMenuStore | null>(null)

export function MenuProvider({
  children,
  ...props
}: PropsWithChildren<MenuContextData>) {
  const [menuStore] = useState(() => createMenuStore(props))
  const hasHydrated = menuStore.getState()._hasHydrated
  const setActive = menuStore.getState().setActive
  const path = usePathname()
  const updateActive = useCallback(() => {
    if (hasHydrated) {
      setActive(path)
    }
  }, [hasHydrated, path, setActive])
  useEffect(() => {
    updateActive()
  }, [updateActive])
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

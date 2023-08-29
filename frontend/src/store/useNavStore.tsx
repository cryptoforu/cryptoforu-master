'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { getBaseUrl } from '@/lib/getApiUrl'
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
  initMenu: () => void
}

interface MenuData extends MenuContextData, MenuState {
  _hasHydrated: boolean
  setHasHydrated: (state: boolean) => void
}

export const useMenuStore = create(
  persist(
    immer<MenuData>((set) => ({
      menu: [],
      activeItem: 0,
      _hasHydrated: false,
      setActive: (href) =>
        set((state) => {
          const menuItem = state.menu.findIndex((el) => {
            if (el.childs.length > 0) {
              return el.childs.find((el) => el.route === href)
            }
            return el.route === href
          })
          if (menuItem !== -1) {
            state.activeItem = menuItem
          }
        }),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      initMenu: async () => {
        const res = await fetch(`${getBaseUrl()}/api/menu`)
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        const { data: menu } = (await res.json()) as unknown as {
          data: MainMenu[]
        }
        set((state) => {
          state.menu = menu
        })
      },
    })),
    {
      name: 'menu',
      partialize: (state) => state.menu,
      onRehydrateStorage: () => (state) => {
        state.setHasHydrated(true)
      },
    }
  )
)

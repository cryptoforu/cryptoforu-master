'use client'
import { create } from 'zustand'

import createSelectors from '@/store/createSelectors'
import { Nullable } from '@/types/shared-types'

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

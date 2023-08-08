'use client'

import { create } from 'zustand'
import type { Nullable } from '@/types/shared-types'
import createSelectors from '@/store/createSelectors'

type UseHoveredState = {
  hoveredIndex: Nullable<string | number>
}

type UseHoveredActions = {
  setHovered: (index: Nullable<string | number>) => void
  isHovered: (index: Nullable<string | number>) => boolean
}

interface UseHoveredStore extends UseHoveredState, UseHoveredActions {}

const useHoveredStore = create<UseHoveredStore>()((set, get) => ({
  hoveredIndex: null,
  setHovered: (index) => set(() => ({ hoveredIndex: index })),
  isHovered: (index) => {
    return get().hoveredIndex === index
  },
}))

export const useHovered = createSelectors(useHoveredStore)

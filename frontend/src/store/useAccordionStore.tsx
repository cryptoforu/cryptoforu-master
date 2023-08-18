import { create } from 'zustand'

import createSelectors from '@/store/createSelectors'

type UseAccordionState = {
  activeIndex: number | null
  iconPaths: {
    [x: string]: string
  }
}

type UseAccordionAction = {
  setActiveIndex: (index: number | null) => void
  getActive: (index: number) => boolean
  getIconPath: (isActive: boolean) => string
}

export interface UseAccordionStore
  extends UseAccordionState,
    UseAccordionAction {}

const useAccordionStore = create<UseAccordionStore>()((set, get) => ({
  activeIndex: 0,
  iconPaths: {
    minus: 'M18 12H6',
    plus: 'M12 6v6m0 0v6m0-6h6m-6 0H6',
  },
  setActiveIndex: (index) => set(() => ({ activeIndex: index })),
  getActive: (index) => {
    return get().activeIndex === index
  },
  getIconPath: (isActive) => {
    if (isActive) {
      return get().iconPaths.minus
    }
    return get().iconPaths.plus
  },
}))

export const useAccordion = createSelectors(useAccordionStore)

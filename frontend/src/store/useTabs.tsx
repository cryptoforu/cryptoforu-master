import { Key } from 'react'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

import createSelectors from '@/store/createSelectors'

type DataTabsState = {
  selectedKey: Key
  direction: number
  focused: string | null
}
type TabsActions = {
  setDataTab: (key: Key) => void
  setFocused: (focused: string | null) => void
}

interface TabsStore extends DataTabsState, TabsActions {}

const useTabsStore = createWithEqualityFn<TabsStore>(
  (set) => ({
    selectedKey: '1',
    direction: 1,
    focused: null,
    setDataTab: (key) =>
      set((state) => ({
        selectedKey: key,
        direction: key > state.selectedKey ? 0 : 1,
      })),
    setFocused: (focused) => set({ focused: focused }),
  }),
  shallow
)
export const useTabs = createSelectors(useTabsStore)

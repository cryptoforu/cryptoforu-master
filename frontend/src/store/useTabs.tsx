import { Key, useTransition } from 'react'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

import createSelectors from '@/store/createSelectors'

type DataTabsState = {
  isSelected: string
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
    isSelected: '1',
    direction: 1,
    focused: null,
    setDataTab: (key) =>
      set((state) => ({
        isSelected: key as string,
        direction: key > state.isSelected ? 0 : 1,
      })),
    setFocused: (focused) => set({ focused: focused }),
  }),
  shallow
)
export const useTabs = createSelectors(useTabsStore)
export const useDataTabs = () => {
  const [[isSelected, direction], setDataTab] = useTabsStore((state) => [
    [state.isSelected, state.direction],
    state.setDataTab,
  ])
  const [isPending, startTransition] = useTransition()

  function onSelectionChange(key: Key) {
    startTransition(() => {
      setDataTab(key)
    })
  }

  return {
    isPending,
    onSelectionChange,
    isSelected,
    direction,
  }
}

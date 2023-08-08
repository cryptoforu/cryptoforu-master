import { create } from 'zustand'
import { ReactNode, useTransition } from 'react'

import { shallow } from 'zustand/shallow'

export type TabsProps = {
  id: string
  label: string | ReactNode
  content: ReactNode
  image: string
}
type TabsState = {
  id: string
  selected: number
}

type TabsActions = {
  setSelected: (key: string) => void
  setIndex: (index: number) => void
  getContent: (data: Array<TabsProps>) => TabsProps | undefined
}

interface TabsStore extends TabsState, TabsActions {}

const useTabsStore = create<TabsStore>((set, get) => ({
  id: '1',
  selected: 0,
  setSelected: (key) => set({ id: key }),
  setIndex: (index) => set({ selected: index }),
  getContent: (data) => {
    return data.find((el) => el.id === get().id)
  },
}))

export const useTabs = () => {
  const [isPending, startTransition] = useTransition()
  const [id, setSelected] = useTabsStore(
    (state) => [state.id, state.setSelected],
    shallow
  )
  const getContent = useTabsStore((state) => state.getContent)
  const setIndex = useTabsStore((state) => state.setIndex)
  const selected = useTabsStore((state) => state.selected)

  function onSelectedChange(key: string, index: number) {
    startTransition(() => {
      setSelected(key)
      setIndex(index)
    })
  }

  return {
    id,
    onSelectedChange,
    getContent,
    isPending,
    selected,
  }
}

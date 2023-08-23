import { Key, useCallback, useTransition } from 'react'
import { useHover } from 'react-aria'

import { useTabs } from '@/store/useTabs'

const useTabsController = () => {
  const [focused, setFocused] = [
    useTabs.use.focused(),
    useTabs.use.setFocused(),
  ]
  const { hoverProps } = useHover({
    onHoverStart: (e) => setFocused(e.target.id),
  })

  const isFocused = useCallback(
    (id: string) => {
      return focused === id
    },
    [focused]
  )

  return {
    hoverProps,
    isFocused,
    focused,
    setFocused,
  }
}
export default useTabsController

export const useTabsAction = () => {
  const [[selectedKey, direction], setDataTab] = [
    [useTabs.use.selectedKey(), useTabs.use.direction()],
    useTabs.use.setDataTab(),
  ]
  const [isPending, startTransition] = useTransition()

  function onSelectionChange(key: Key) {
    startTransition(() => {
      setDataTab(key)
    })
  }

  return [selectedKey, direction, isPending, onSelectionChange] as const
}

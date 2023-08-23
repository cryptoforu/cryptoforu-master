import { useCallback } from 'react'
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

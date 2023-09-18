import { useCallback } from 'react'
import { useIsSSR } from 'react-aria'

const useScrollPosition = () => {
  const isSSR = useIsSSR()

  return useCallback(
    (action: boolean, id: string) => {
      if (action && !isSSR) {
        const element = document.getElementById(id)
        return element.scrollIntoView({
          block: 'start',
        })
      }
    },
    [isSSR]
  )
}
export default useScrollPosition

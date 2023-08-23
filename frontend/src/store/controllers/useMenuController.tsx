import { usePathname } from 'next/navigation'
import { useCallback, useEffect } from 'react'

import createSelectors from '@/store/createSelectors'
import { useMenuStore } from '@/store/useNavStore'

const useMenu = createSelectors(useMenuStore)

export default function useMenuController() {
  const menu = useMenu.use.menu()

  const initMenu = useMenu.use.initMenu()
  useEffect(() => {
    if (!menu.length) {
      initMenu()
    }
  }, [initMenu, menu.length])
  return menu
}

export const useActiveLink = () => {
  const pathname = usePathname()
  const activeItem = useMenu.use.activeItem()
  const setActive = useMenu.use.setActive()
  useEffect(() => {
    setActive(pathname)
  }, [pathname, setActive])

  return useCallback(
    (index: number) => {
      return activeItem === index
    },
    [activeItem]
  )
}

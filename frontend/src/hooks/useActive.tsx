import { usePathname } from 'next/navigation'
import { useCallback } from 'react'

export default function useActive() {
  const pathname = usePathname()
  const path = pathname.substring(1)
  return useCallback(
    (route: string) => {
      if (route.length > 1) {
        return path.startsWith(route.substring(1))
      } else {
        return pathname === route
      }
    },
    [path, pathname]
  )
}

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import usePrev from '@/hooks/usePrev'

export default function useNavigated() {
  const [navigated, setNavigated] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const prev = usePrev(`${pathname}?${searchParams}`)

  useEffect(() => {
    const currentPath = `${pathname}?${searchParams}`
    if (prev !== currentPath) {
      setNavigated(true)
    }
  }, [pathname, prev, searchParams])
  return navigated
}

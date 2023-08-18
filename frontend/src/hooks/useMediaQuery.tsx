import { useEffect, useState } from 'react'
import { useIsSSR } from 'react-aria'

export default function useMediaQuery(query: string): boolean {
  const isSSR = useIsSSR()
  const getMatches = (query: string): boolean => {
    if (!isSSR) {
      return window.matchMedia(query).matches
    }
    return false
  }

  const [matches, setMatches] = useState<boolean>(getMatches(query))

  function handleChange() {
    setMatches(getMatches(query))
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(query)
    handleChange()
    matchMedia.addEventListener('change', handleChange)
    return () => {
      matchMedia.removeEventListener('change', handleChange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return matches
}

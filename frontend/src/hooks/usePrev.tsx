import { useEffect, useRef } from 'react'

function usePrev<T>(value: T): T | undefined {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

export default usePrev
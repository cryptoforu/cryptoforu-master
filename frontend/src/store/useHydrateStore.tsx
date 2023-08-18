import { useEffect, useState } from 'react'

const useHydrateStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F
  const [data, setData] = useState<F>()
  useEffect(() => {
    setData(result)
  }, [result])

  return data
}

export default useHydrateStore

import { useDeferredValue, useEffect } from 'react'

import useSocket from '@/hooks/useSocket'
import { useCryptoContext } from '@/store/useCrypto'

export default function useCryptoController() {
  const updatePrice = useCryptoContext((state) => state.updatePrice)
  const cryptoData = useCryptoContext((state) => state.crypto)
  const cols = useCryptoContext((state) => state.columns)
  const socketData = useSocket()
  const data = useDeferredValue(Object.values(cryptoData))
  useEffect(() => {
    if (socketData) {
      for (const [key, value] of Object.entries(socketData)) {
        updatePrice(key, value as number)
      }
    }
  }, [socketData, updatePrice])
  return {
    cols,
    data,
  }
}

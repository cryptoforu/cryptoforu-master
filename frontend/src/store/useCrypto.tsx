'use client'
import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { createStore } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { useStoreWithEqualityFn } from 'zustand/traditional'

import { PaginatedCoins } from '@/app/api/crypto/crypto'

type CryptoState = {
  crypto?: PaginatedCoins
}
type CryptoActions = {
  updatePrice: (id: string, price: number) => void
  getPrice: (id: string, price: number) => 'danger' | 'success'
}

interface ICrypto extends CryptoState, CryptoActions {}

type CryptoStore = ReturnType<typeof createCryptoStore>
const createCryptoStore = (initProps?: Partial<CryptoState>) => {
  const DEFAULT_PROPS: CryptoState = {
    crypto: undefined,
  }
  return createStore(
    immer<ICrypto>((set, get) => ({
      ...DEFAULT_PROPS,
      ...initProps,
      updatePrice: (id, price) =>
        set((state) => {
          const coin = state.crypto.coinsData.find((el) => el.id === id)
          if (coin) {
            ;(coin.current_price as number) = Number(price)
          }
        }),
      getPrice: (id, price) => {
        const coin = get().crypto.coinsData.find((el) => el.id === id)
        return (coin.current_price as number) > price ? 'danger' : 'success'
      },
    }))
  )
}
export const CryptoContext = createContext<CryptoStore | null>(null)

export function CryptoProvider({
  children,
  ...props
}: PropsWithChildren<CryptoState>) {
  const [cryptoStore] = useState(() => createCryptoStore(props))
  return (
    <CryptoContext.Provider value={cryptoStore}>
      {children}
    </CryptoContext.Provider>
  )
}

export function useCryptoContext<T>(
  selector: (state: ICrypto) => T,
  equalityFn?: (left: T, right: T) => boolean
): T {
  const store = useContext(CryptoContext)
  if (!store) throw new Error('Missing CryptoProvider in the tree')
  return useStoreWithEqualityFn(store, selector, equalityFn)
}

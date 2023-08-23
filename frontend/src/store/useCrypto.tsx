'use client'
import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { createStore } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { useStoreWithEqualityFn } from 'zustand/traditional'

import { CryptoData } from '@/types/crypto'

type CryptoState = {
  crypto: Record<string, CryptoData>
}
type CryptoActions = {
  updatePrice: (id: string, price: number) => void
  getPrice: (id: string, price: number) => 'danger' | 'success'
}

interface ICrypto extends CryptoState, CryptoActions {}

type CryptoStore = ReturnType<typeof createCryptoStore>
const createCryptoStore = (initProps?: Partial<CryptoState>) => {
  const DEFAULT_PROPS: CryptoState = {
    crypto: {},
  }
  return createStore(
    immer<ICrypto>((set, get) => ({
      ...DEFAULT_PROPS,
      ...initProps,
      updatePrice: (id, price) =>
        set((state) => {
          const currentPrice = state.crypto[id].attributes.current_price
          state.crypto[id].attributes.current_price = price
          state.crypto[id].attributes.current_color =
            currentPrice > price ? 'danger' : 'success'
        }),
      getPrice: (id, price) => {
        return get().crypto[id].attributes.current_price > price
          ? 'danger'
          : 'success'
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

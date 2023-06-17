'use client'

import { createStore, useStore } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import type { CryptoDataProps } from '@/types/shared-types'
import type { SWRSubscription } from 'swr/subscription'
import useSWRSubscription from 'swr/subscription'

type CoinStateContext = {
  data: Array<CryptoDataProps>
}

interface CoinActions extends CoinStateContext {
  updatePrice: (id: string, price: string) => void
}

type CoinStore = ReturnType<typeof createCoinStore>
const createCoinStore = (initProps?: Partial<CoinStateContext>) => {
  const DEFAULT_PROPS: CoinStateContext = {
    data: [],
  }
  return createStore<CoinActions>()(
    immer((set, get) => ({
      ...DEFAULT_PROPS,
      ...initProps,
      updatePrice: (id, price) =>
        set((state) => {
          let item = state.data.find((el) => el.id.startsWith(id))
          if (item) {
            item.attributes.current_price = price
          }
        }),
    }))
  )
}

export const CoinContext = createContext<CoinStore | null>(null)

type CoinProviderProps = {
  data: Array<CryptoDataProps>
}

export function CoinProvider({
  data,
  children,
}: PropsWithChildren<CoinProviderProps>) {
  let [coinStore] = useState(() => createCoinStore({ data }))
  const updatePrice = coinStore.getState().updatePrice

  const sub: SWRSubscription<string, string, Error> = (key, { next }) => {
    const pricesWs = new WebSocket(key)
    pricesWs.addEventListener('message', (event) => next(null, event.data))

    return () => pricesWs.close()
  }

  const { data: price, error } = useSWRSubscription(
    `${process.env.NEXT_PUBLIC_API_URL_SOCKET}/prices?assets=bitcoin,ethereum,binance-coin,solana,cardano`,
    sub
  )
  const onUpdate = useCallback(
    (id: string, price: string) => {
      updatePrice(id, price)
    },
    [updatePrice]
  )
  useEffect(() => {
    if (!price) {
      return
    } else {
      for (const [key, value] of Object.entries(JSON.parse(price) as Object)) {
        onUpdate(key, value)
      }
    }
  }, [onUpdate, price, updatePrice])
  return (
    <CoinContext.Provider value={coinStore}>{children}</CoinContext.Provider>
  )
}

export function useCoinContext<T>(
  selector: (state: CoinActions) => T,
  equalityFn?: (left: T, right: T) => boolean
): T {
  const store = useContext(CoinContext)
  if (!store) throw new Error('Missing CoinContext  Provider in the tree')
  return useStore(store, selector, equalityFn)
}

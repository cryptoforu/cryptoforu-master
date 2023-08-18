'use client'
import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { createStore } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { useStoreWithEqualityFn } from 'zustand/traditional'

import {
  Currency,
  FaucetListData,
} from '@/app/(main)/(pages)/earn-crypto/faucets-lists/faucets-lists'

export type CurrencyState = Currency | 'top_hundred' | 'new_faucets'

export type FaucetListContext = {
  data?: FaucetListData
}

export type FaucetListState = {
  currency: CurrencyState
  page_size: string
  page: string
  globalFilter: string
  menuOpen: boolean
}

export type FaucetListActions = {
  setCurrency: (currency: CurrencyState) => void
  setPageSize: (size: string) => void
  setPage: (page: string) => void
  setGlobalFilter: (filter: string) => void
  setMenuOpen: () => void
  updateList: (list: FaucetListData) => void
}

export interface UseFaucetList
  extends FaucetListState,
    FaucetListActions,
    FaucetListContext {}

export type FaucetListStore = ReturnType<typeof createListStore>

const createListStore = (initProps?: Partial<FaucetListContext>) => {
  const DEFAULT_PROPS: FaucetListContext = {
    data: undefined,
  }

  return createStore(
    immer<UseFaucetList>((set, get) => ({
      ...DEFAULT_PROPS,
      ...initProps,
      currency: 'top_hundred',
      page_size: '50',
      page: '1',
      globalFilter: '',
      menuOpen: false,
      updateList: (list) =>
        set((state) => {
          state.data = list
        }),
      setCurrency: (currency) =>
        set((state) => {
          state.currency = currency
        }),
      setPage: (page) =>
        set((state) => {
          state.page = page
        }),
      setPageSize: (size) =>
        set((state) => {
          state.page_size = size
        }),
      setGlobalFilter: (filter) =>
        set((state) => {
          state.globalFilter = filter
        }),
      setMenuOpen: () =>
        set((state) => {
          state.menuOpen = !state.menuOpen
        }),
    }))
  )
}

export const FaucetListContext = createContext<FaucetListStore | null>(null)

export default function FaucetListProvider({
  children,
  ...props
}: PropsWithChildren<FaucetListContext>) {
  const [listStore] = useState(() => createListStore(props))
  return (
    <FaucetListContext.Provider value={listStore}>
      {children}
    </FaucetListContext.Provider>
  )
}

export function useListContext<T>(
  selector: (state: UseFaucetList) => T,
  equalityFn?: (left: T, right: T) => boolean
): T {
  const listStore = useContext(FaucetListContext)
  if (!listStore) {
    throw new Error('Must be under ListProvider')
  }
  return useStoreWithEqualityFn(listStore, selector, equalityFn)
}

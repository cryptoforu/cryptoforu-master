'use client'
import { SortingState } from '@tanstack/react-table'
import { produce } from 'immer'
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  use,
  useMemo,
  useReducer,
} from 'react'

import { FaucetsListData } from '@/app/(main)/(pages)/earn-crypto/faucets-lists/faucets-lists'
import { getColumns } from '@/lib/generateColumns'
import { ColumnProps } from '@/store/types/data-table-store'
import type {
  FaucetActionTypes,
  FaucetListState,
  ListDispatch,
} from '@/store/types/faucet-list-store'

export interface FaucetListContext extends FaucetsListData, FaucetListState {}

export interface FaucetListProvider {
  dataPromise: Promise<FaucetsListData>
}

type ListState = {
  data: FaucetsListData
  columns: ColumnProps[]
  globalFilter: string
  sorting: SortingState
}
const FaucetListContext = createContext<ListState | null>(null)
const FaucetListDispatch = createContext<Dispatch<FaucetActionTypes> | null>(
  null
)

const listReducer = produce<ListState, [ListDispatch]>((draft, action) => {
  switch (action.type) {
    case 'SET_DATA':
      draft.data = action.payload.data
      break
    case 'SET_FILTER':
      draft.globalFilter = action.payload.globalFilter
      break
    case 'SET_SORTING':
      draft.sorting = action.payload.sorting
      break
    default:
      break
  }
})

export function FaucetListProvider({
  children,
  dataPromise,
}: PropsWithChildren<FaucetListProvider>) {
  const listData = use(dataPromise)
  const columns = useMemo(
    () => getColumns(listData.list.columns),
    [listData.list.columns]
  )
  const initialState = {
    data: listData,
    columns: columns,
    globalFilter: '',
    sorting: [],
  }
  const [listState, dispatch] = useReducer(listReducer, initialState)

  return (
    <FaucetListContext.Provider value={listState}>
      <FaucetListDispatch.Provider value={dispatch}>
        {children}
      </FaucetListDispatch.Provider>
    </FaucetListContext.Provider>
  )
}

export function useList() {
  return use<ListState>(FaucetListContext)
}

export function useListDispatch() {
  return use(FaucetListDispatch)
}

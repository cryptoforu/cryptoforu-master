import { ColumnSort } from '@tanstack/table-core'

import {
  Currency,
  FaucetsListData,
} from '@/app/(main)/(pages)/earn-crypto/faucets-lists/faucets-lists'

export type CurrencyState = Currency | 'TOP' | 'NEW'

export type FaucetListState = {
  globalFilter: string
  sorting: Array<ColumnSort>
  data: FaucetsListData
}

export type FaucetActionTypes = {
  type: 'SET_FILTER' | 'SET_SORTING' | 'SET_DATA'
  payload: Partial<FaucetListState>
}

export type FaucetListStateData = {
  type: 'SET_DATA'
  payload: FaucetsListData
}

export interface ListDispatch extends FaucetActionTypes, FaucetListStateData {}

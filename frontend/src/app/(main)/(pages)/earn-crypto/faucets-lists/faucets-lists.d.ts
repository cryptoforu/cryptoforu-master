import { CellProps } from '@/store/types/data-table-store'
import type { IPaginationLinks, IPaginationMeta } from '@/types/shared-types'

export type Currency =
  | 'BTC'
  | 'ETH'
  | 'DOGE'
  | 'LTC'
  | 'BCH'
  | 'DASH'
  | 'DGB'
  | 'TRX'
  | 'USDT'
  | 'FEY'
  | 'ZEC'
  | 'BNB'
  | 'SOL'
  | 'XRP'
  | 'MATIC'
  | 'TOP'
  | 'NEW'

export type FaucetData = {
  name: string
  url: string
  health: string
  reward: string
  balance: string
  currency: Currency
  paid_today: string
  reward_coin: string
  active_users: string
  creation_date: string
  paid_today_coin: string
  timer_in_minutes: string
  total_users_paid: string
}
export type PaginatedList = {
  columns: CellProps[]
  listData: Array<FaucetData>
  meta: IPaginationMeta
  links: IPaginationLinks[]
}
export type FaucetListCategory = {
  symbol: string
  name: string
  image: string
  color: string
}

export interface FaucetsListData extends FaucetListCategory {
  list: PaginatedList
  updated_at: string
}

export type CoinStats = {
  coin: string
  sum: number
  percentage: string
  color: string
}

export type FaucetStats = {
  coin: string
  faucets: number
  percentage: string
  color: string
}

export interface ListStats {
  coinStats: CoinStats[]
  faucetsStats: FaucetStats[]
  totalCoin: string
  totalFaucets: number
}

import type { CryptoCoin } from '@/app/api/coins/crypto'
import type { PaginationProps } from '@/types/shared-types'

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
  | 'top_hundred'
  | 'new_faucets'

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

type ListData = { data: FaucetData[] } & PaginationProps

export type FaucetListData = {
  list_name: string
  currency: Currency
  coin_data?: CryptoCoin
  list_data: ListData
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

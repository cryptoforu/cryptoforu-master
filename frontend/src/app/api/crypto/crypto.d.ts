import { CellProps } from '@/store/types/data-table-store'
import type { IPaginationLinks, IPaginationMeta } from '@/types/shared-types'
import { Nullable } from '@/types/shared-types'

export type CryptoCoin = {
  id: string
  name: string
  image: string
  current_price: number
  market_cap: string
  market_cap_rank: Nullable<number>
  total_volume: Nullable<number>
  high_24h: Nullable<string>
  low_24h: Nullable<string>
  price_change_24h: Nullable<string>
  price_change_percentage_24h: string
  price_change_percentage_1h_in_currency: string
  price_change_percentage_24h_in_currency: string
  price_change_percentage_7d_in_currency: string
  symbol: string
  color: string
  current_color: string
}

export type CryptoCategories = {
  id: string
  name: string
  market_cap: number
  market_cap_change_24h: string
  top_3_coins: string
  volume_24h: string
}

export type PaginatedCoins = {
  columns: CellProps[]
  coinsData: Array<CryptoCoin>
  meta: IPaginationMeta
  links: IPaginationLinks[]
}

export interface CryptoDataProps extends CryptoCategories {
  coins: PaginatedCoins
}

export interface ICryptoQueryParams {}

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

export interface CryptoData {
  id: string
  type: string
  attributes: CryptoCoin
}

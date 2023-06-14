import { ReactNode } from 'react'

export interface PageProps {
  [key: string]: unknown
}

export type S<T = object> = T &
  PageProps & {
    [key: string]: T
  }

export type Nullable<T> = T | null
export type CryptoCoin = {
  id: string
  name: string
  image: string
  current_price: string
  market_cap: Nullable<number>
  market_cap_rank: Nullable<number>
  total_volume: Nullable<number>
  high_24h: Nullable<number>
  low_24h: Nullable<number>
  price_change_24h: Nullable<number>
  price_change_percentage_24h: string
  price_change_percentage_1h_in_currency: Nullable<number>
  price_change_percentage_24h_in_currency: Nullable<number>
  price_change_percentage_7d_in_currency: Nullable<number>
  symbol: string
  color: string
  current_color: string
}
export type DecryptNews = {
  title: string
  link: string
  description: string
  enclosure: {
    '@attributes': {
      url: string
    }
  }
}

export type Exchanges = {
  id: string
  name: string
  year_established: string
  url: string
  image: string
  trust_score: number
  trust_rank: number
  trade_volume_24h_btc: string
}

export type Features = {
  name: string
  link: string
  image: string
  description: ReactNode
}

export type SocialLinks = {
  name: string
  href: string
  image: string
}

export type PostData = {
  id: number
  title: string
  slug?: string
  introduction?: string
  content?: string
  featured_image?: string
  thumb?: string
  status?: PostStatus
  category_id?: number
  created_at?: string
  updated_at?: string
  image_name?: string
  excerpt?: string
  category?: CategoryData
  tags?: Array<TagsData>
}
export type PostStatus = 'DRAFT' | 'PREVIEW' | 'PUBLISHED' | 'ARCHIVED'
export type TagsData = {
  id: number
  name: string
  posts?: Array<PostData>
}

export type CategoryData = {
  id: number
  name: string
  slug: string
  description: string
  category_image: string
  category_thumb?: string
  color: ColorScheme
  posts?: Array<PostData>
}
export type ColorScheme = 'emerald' | 'teal' | 'cyan' | 'blue' | 'red'

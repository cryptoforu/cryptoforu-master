export interface PageProps {
  [key: string]: unknown
}

export type S<T = object> = T &
  PageProps & {
    [key: string]: T
  }

export type Nullable<T> = T | null

export type Crumbs = {
  label: string
  route: string
  meta_desc: string
}

export interface BreadcrumbsProps extends Crumbs {
  parents: Nullable<Crumbs>
}

export type PaginationProps = {
  current_page: number
  first_page_url?: string
  from: number
  last_page?: number
  last_page_url?: string
  links: {
    url: string | null
    label: string
    active: boolean
  }[]
  next_page_url: string | null
  path?: string
  per_page?: number
  prev_page_url: string | null
  to: number
  total: number
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
  trust_score_rank: number
  trade_volume_24h_btc: string
}

export type ColorScheme = 'emerald' | 'teal' | 'cyan' | 'blue' | 'red'

export type EarnData = {
  id: number
  title: string
  link: string
  image_name: string
  main_features: string
}
export type EarnCategory = {
  id: number
  name: string
  description: string
  category_image: string
  earn: Array<EarnData>
}

export interface EarningMethods {
  data: {
    id: string
    attributes: EarnCategory
  }[]
}

export type MenuItem = {
  id: number
  label: string
  route: string
}

export interface MainMenu extends MenuItem {
  childs: Array<MenuItem>
}

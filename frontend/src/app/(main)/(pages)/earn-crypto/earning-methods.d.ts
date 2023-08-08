export type EarnCategoryProps = {
  id: number
  name: string
  description: string
  category_image: string
  earn: Array<EarningMethodsProps>
}
export type EarningMethodsProps = {
  id: number
  title: string
  content?: string
  image: string
  thumb?: string
  link: string
  featured?: FeaturedEarn
  status?: EarnStatus
  image_name?: string
  earn_category_id: number
  main_features: string
  badge: {
    label: string
    color: string
  }
  earnCategory?: EarnCategoryProps
}
export type EarnStatus = 'DRAFT' | 'FEATURED' | 'PUBLISHED'
export type FeaturedEarn = '1' | '2'

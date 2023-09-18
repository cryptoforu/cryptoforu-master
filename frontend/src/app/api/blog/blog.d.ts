import { Route } from 'next'
import { QueryParams } from 'ziggy-js'

import { IPaginationLinks, IPaginationMeta } from '@/types/shared-types'

export type CategoryParams = {
  params: { category: string }
}

export type PostParams = {
  params: {
    category: string
    post: string
  }
}

export type ICategory = {
  id: number
  name: string
  slug: string
  description: string
  category_image: string
  category_thumb?: string
  headline: string
  category_links: {
    next: {
      name: string
      slug: Route
    } | null
    prev: {
      name: string
      slug: Route
    } | null
    category_link: Route
  }
}

export type ITags = {
  id: number
  name: string
}
export type IPost = {
  id: number
  title: string
  slug: string
  introduction: string
  content: string
  status: PostStatus
  category_id: number
  created_at: string
  updated_at: string
  image_name: string
  headline: string
  reading_time: string
  post_links: {
    next: {
      name: string
      slug: Route
    } | null
    prev: {
      name: string
      slug: Route
    } | null
    post_link: Route
  }
  tags: ITags[]
  count: CountProps
}
export type PostStatus =
  | 'DRAFT'
  | 'PREVIEW'
  | 'PUBLISHED'
  | 'ARCHIVED'
  | 'FEATURED'

export type CountProps = {
  timestamp: number
  views: number
  ips: string[]
}
export type IPaginatedPost = {
  data: Array<IPost>
  links: IPaginationLinks
  meta: IPaginationMeta
}

export interface CategoryWithPosts extends ICategory {
  posts: IPaginatedPost
}

export interface CategoryWithLatest extends ICategory {
  posts: IPaginatedPost
  latest: Array<IPost>
}

export interface PostWithCategory extends IPost {
  category: ICategory
}

export interface CategoriesQuery extends QueryParams {
  include?: 'posts' | 'tags'
  filter?: Record<string, string>
  sort?: string
  page?: {
    size?: string
    number?: string
  }
}

export interface CategoryQuery extends CategoriesQuery, CategoryParams {}

export interface PostQuery extends QueryParams, PostParams {}

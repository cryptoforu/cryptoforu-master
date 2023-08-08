import type { CategoryApiResource } from '@/app/(main)/(pages)/learn-crypto/categories'

export type PostStatus =
  | 'DRAFT'
  | 'PREVIEW'
  | 'PUBLISHED'
  | 'ARCHIVED'
  | 'FEATURED'
export type TagsApiResource = {
  id: number
  name: string
  posts?: Array<PostApiResource>
}

export type PostApiResource = {
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
  views_count?: number
  post_links: {
    next: {
      name: string
      slug: string
    } | null
    prev: {
      name: string
      slug: string
    } | null
    post_link: string
  }
  category?: CategoryApiResource
  tags?: Array<TagsApiResource>
  related: Array<PostApiResource>
}

export type CursorPagination = {
  path: string
  per_page: number
  next_page_url: string | null
  prev_page_url: string | null
  total: number
}

export interface CursorPaginatedPost {
  data: Array<PostApiResource>
  meta: CursorPagination
}

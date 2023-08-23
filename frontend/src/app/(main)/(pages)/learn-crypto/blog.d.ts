export type CategoryParams = {
  params: { category: string }
}

export type PostParams = {
  params: {
    category: string
    post: string
  }
}

export type CategoryProps = {
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
      slug: string
    } | null
    prev: {
      name: string
      slug: string
    } | null
    category_link: string
  }
}

export type TagsProps = {
  id: number
  name: string
}
export type PostProps = {
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
      slug: string
    } | null
    prev: {
      name: string
      slug: string
    } | null
    post_link: string
  }
  tags: TagsProps[]
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

export type CursorPagination = {
  path: string
  per_page: number
  next_page_url: string | null
  prev_page_url: string | null
  total: number
}

export interface CategoryWithPosts extends CategoryProps {
  posts: PaginatedPosts
}

export interface PostWithCategory extends PostProps {
  category: CategoryProps
}

export type PaginatedPosts = {
  data: Array<PostWithCategory>
  meta: CursorPagination
}

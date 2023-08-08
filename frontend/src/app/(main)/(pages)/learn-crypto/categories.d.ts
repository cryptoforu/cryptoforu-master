import {
  CursorPaginatedPost,
  PostApiResource,
} from '@/app/(main)/(pages)/learn-crypto/[category]/[post]/posts'

export type CategoryApiResource = {
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
  posts: CursorPaginatedPost
  related: Array<PostApiResource>
}

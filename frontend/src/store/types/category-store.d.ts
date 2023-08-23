import { PaginatedPosts } from '@/app/(main)/(pages)/learn-crypto/blog'

export type CategoryContextData = {
  posts: PaginatedPosts
}

export type CategoryDispatch = {
  updateCategory: (posts: PaginatedPosts) => void
  setPageUp: (size: number) => void
  setPageDown: (size: number) => void
}

export interface ICategory extends CategoryContextData, CategoryDispatch {
  pageSize: number
  per_page: number
}

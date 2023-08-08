import { CursorPaginatedPost } from '@/app/(main)/(pages)/learn-crypto/[category]/[post]/posts'

export type CategoryContextData = {
  posts: CursorPaginatedPost
}

export type CategoryDispatch = {
  updateCategory: (posts: CursorPaginatedPost) => void
  setPageUp: (size: number) => void
  setPageDown: (size: number) => void
}

export interface ICategory extends CategoryContextData, CategoryDispatch {
  pageSize: number
  per_page: number
}

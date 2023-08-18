'use client'
import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { createStore } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { useStoreWithEqualityFn } from 'zustand/traditional'

import type {
  CategoryContextData,
  ICategory,
} from '@/store/types/category-store'

export type UseCategoryStore = ReturnType<typeof createCategoryStore>
const createCategoryStore = (initProps?: Partial<CategoryContextData>) => {
  const DEFAULT_CATEGORY: CategoryContextData = {
    posts: {
      data: [],
      meta: {
        path: '',
        prev_page_url: null,
        per_page: 6,
        next_page_url: null,
        total: 0,
      },
    },
  }

  return createStore(
    immer<ICategory>((set) => ({
      ...DEFAULT_CATEGORY,
      ...initProps,
      pageSize: 6,
      per_page: 6,
      setPageUp: (size) =>
        set((state) => ({ pageSize: state.pageSize + size })),
      setPageDown: (size) =>
        set((state) => ({ pageSize: state.pageSize - size })),
      updateCategory: (posts) =>
        set((state) => {
          state.posts = posts
        }),
    }))
  )
}
export const CategoryContext = createContext<UseCategoryStore | null>(null)

export default function CategoryProvider({
  children,
  ...props
}: PropsWithChildren<CategoryContextData>) {
  const [categoryStore] = useState(() => createCategoryStore(props))
  return (
    <CategoryContext.Provider value={categoryStore}>
      {children}
    </CategoryContext.Provider>
  )
}

export function useCategoryContext<T>(
  selector: (state: ICategory) => T,
  equalityFn?: (left: T, right: T) => boolean
): T {
  const categoryStore = useContext(CategoryContext)
  if (!categoryStore) throw new Error('Must be under CategoryProvider')
  return useStoreWithEqualityFn(categoryStore, selector, equalityFn)
}

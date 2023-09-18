'use client'
import { createContext, PropsWithChildren, useContext, useRef } from 'react'
import { createStore } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { useStoreWithEqualityFn } from 'zustand/traditional'

import { updateSize } from '@/app/api/blog/_blogActions'
import { CategoryWithPosts } from '@/app/api/blog/blog'

type CategoryState = {
  category?: CategoryWithPosts
}

type CategoryActions = {
  updatePosts: (show: 'more' | 'less') => void
}

interface UseCategoryStore extends CategoryState, CategoryActions {
  isFetching: boolean
}

type CategoryStore = ReturnType<typeof categoryStore>

const categoryStore = (posts?: Partial<CategoryState>) => {
  return createStore<UseCategoryStore>()(
    immer((set, get) => ({
      ...posts,
      isFetching: false,
      updatePosts: async (show) => {
        set((state) => {
          state.isFetching = true
        })
        try {
          const pageSize = get().category.posts.meta.per_page
          const total = get().category.posts.meta.total
          let showMoreOrLess = show === 'more' ? pageSize + 6 : pageSize - 6
          if (showMoreOrLess > total && show === 'more') {
            showMoreOrLess = total
          } else if (showMoreOrLess < 6 && show === 'less') {
            showMoreOrLess = 6
          }
          const { posts } = await updateSize(
            {
              params: {
                category: get().category.slug,
              },
            },
            showMoreOrLess.toString()
          )
          set((state) => {
            state.category.posts = posts
          })
        } catch (err) {
          console.log(err)
          throw new Error('Something Went Wrong on State Update')
        } finally {
          set((state) => {
            state.isFetching = false
          })
        }
      },
    }))
  )
}

const CategoryContext = createContext<CategoryStore | null>(null)

export function CategoryProvider({
  children,
  ...props
}: PropsWithChildren<CategoryState>) {
  const storeRef = useRef<CategoryStore>()
  if (!storeRef.current) {
    storeRef.current = categoryStore(props)
  }
  return (
    <CategoryContext.Provider value={storeRef.current}>
      {children}
    </CategoryContext.Provider>
  )
}

export function useCategoryContext<T>(
  selector: (state: UseCategoryStore) => T,
  equalityFn?: (left: T, right: T) => boolean
): T {
  const categoryContext = useContext(CategoryContext)
  if (!categoryContext)
    throw new Error('Category Context must be under Category Provider')
  return useStoreWithEqualityFn(categoryContext, selector, equalityFn)
}

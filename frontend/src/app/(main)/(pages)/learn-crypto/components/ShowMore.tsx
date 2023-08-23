'use client'
import { useTransition } from 'react'

import { PaginatedPosts } from '@/app/(main)/(pages)/learn-crypto/blog'
import { Button } from '@/components/elements'
import { useUpdateCategory } from '@/store/controllers/useCategoryController'
import { useCategoryContext } from '@/store/useCategoryStore'

type ShowMoreProps = {
  handleDown: () => void
  posts: PaginatedPosts
}

const ShowMore = (props: ShowMoreProps) => {
  const [pageSize, per_page] = useCategoryContext((state) => [
    state.pageSize,
    state.per_page,
  ])
  const updateCategory = useUpdateCategory()
  const [isPending, startTransition] = useTransition()
  const { handleDown, posts } = props

  function onChangeUp() {
    startTransition(() => {
      void updateCategory('up')
    })
  }

  function onChangeDown() {
    startTransition(() => {
      void updateCategory('down')
      handleDown()
    })
  }

  return (
    <div
      id={'scroll-region'}
      className={'flex items-center justify-center gap-4 py-6'}
    >
      {posts.meta.next_page_url !== null && (
        <Button onPress={() => onChangeUp()} disabled={isPending}>
          Show More
        </Button>
      )}
      {pageSize !== per_page && (
        <Button onPress={() => onChangeDown()} disabled={isPending}>
          Show Less
        </Button>
      )}
    </div>
  )
}

export default ShowMore

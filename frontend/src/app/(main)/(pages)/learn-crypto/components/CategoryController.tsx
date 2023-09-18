'use client'
import { Suspense, useTransition } from 'react'

import CategoryArticles from '@/app/(main)/(pages)/learn-crypto/components/CategoryArticles'
import { Button, LoadingState } from '@/components/elements'
import CategoryArticlesSkeleton from '@/components/skeletons/CategoryArticlesSkeleton'
import { Text } from '@/components/typography'
import useScrollPosition from '@/hooks/useScrollPosition'
import { useCategoryContext } from '@/store/useCategoryProvider'

const CategoryController = () => {
  const [isPending, startTransition] = useTransition()
  const category = useCategoryContext((state) => state.category)
  const updatePosts = useCategoryContext((state) => state.updatePosts)
  const isFetching = useCategoryContext((state) => state.isFetching)
  const scrollPosition = useScrollPosition()
  const lastElement = category.posts.data[category.posts.data.length - 7]

  function showMore() {
    startTransition(() => {
      updatePosts('more')
    })
  }

  function showLess() {
    startTransition(() => {
      !isFetching && scrollPosition(true, lastElement.id.toString())
      updatePosts('less')
    })
  }

  return (
    <Suspense
      fallback={
        <CategoryArticlesSkeleton cards={category.posts.meta.per_page} />
      }
    >
      {category.posts.data.map((post) => (
        <CategoryArticles key={post.id} post={post} />
      ))}
      <div id={'scroll-region'} className={'flex h-full flex-col'}>
        <div className={'flex items-center justify-center py-8'}>
          <Text size={'lg'}>
            Showing {category.posts.meta.from} to {category.posts.meta.per_page}{' '}
            of {category.posts.meta.total}
          </Text>
        </div>
        <div className={'flex items-center justify-center gap-4 py-6'}>
          {category.posts.meta.next_page_url !== null && (
            <Button onPress={showMore} disabled={isPending || isFetching}>
              {isPending && isFetching ? <LoadingState /> : 'Show More'}
            </Button>
          )}
          {category.posts.meta.per_page > 6 && (
            <Button onPress={showLess} disabled={isPending || isFetching}>
              {isPending && isFetching ? <LoadingState /> : 'Show Less'}
            </Button>
          )}
        </div>
      </div>
    </Suspense>
  )
}
export default CategoryController

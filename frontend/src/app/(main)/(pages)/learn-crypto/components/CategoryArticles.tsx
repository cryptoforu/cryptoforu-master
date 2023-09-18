'use client'
import { EyeIcon } from '@heroicons/react/20/solid'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { Route } from 'next'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

import ShowMore from '@/app/(main)/(pages)/learn-crypto/components/ShowMore'
import {
  ArticleCard,
  ArticleCta,
  ArticleDescription,
  ArticleEye,
  ArticleTitle,
} from '@/components/content'
import { DateFormatter } from '@/components/misc/DateFormatter'
import { Text } from '@/components/typography'
import useCategory from '@/hooks/useCategory'
import useScrollTo from '@/hooks/useScrollTo'

const CategoryArticles = () => {
  const {
    data: categoryData,
    size,
    setSize,
    isLoading,
    isValidating,
  } = useCategory()
  const { scrollY } = useScroll()
  const [scrollPosition, setScroll] = useState(0)
  useMotionValueEvent(scrollY, 'change', (latest) => setScroll(latest))
  const scrollTo = useScrollTo()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const isLoadingMore = isLoading || isValidating || isPending
  const meta = !isLoadingMore && categoryData[size - 1].posts.meta

  function handleUp() {
    startTransition(() => {
      void setSize(size + 1)
    })
  }

  function handleDown() {
    startTransition(() => {
      void setSize(size - 1)
      scrollTo({ y: scrollPosition, offsetY: 1000 })
    })
  }

  return (
    <>
      {categoryData?.map((data) =>
        data.posts.data.map((post) => (
          <div
            className={'md:grid md:grid-cols-4 md:items-baseline'}
            id={post.id.toString()}
            key={post.id}
          >
            <ArticleCard as={'div'} className={'md:col-span-3'}>
              <div
                className={
                  'absolute right-0 top-0 z-20 flex items-center justify-between gap-2'
                }
              >
                <EyeIcon
                  className={'h-5 w-5 text-slate-600 dark:text-slate-500'}
                />{' '}
                <Text variant={'secondary'}>
                  {post.count !== null ? post.count.views : 0}
                </Text>
              </div>
              <ArticleTitle
                onClick={() => router.push(post.post_links.post_link as Route)}
              >
                {post.title}
              </ArticleTitle>
              <ArticleEye decorate={true}>{post.reading_time}</ArticleEye>
              <ArticleDescription>{post.introduction}</ArticleDescription>
              <ArticleCta>Read Article</ArticleCta>
            </ArticleCard>
            <ArticleEye
              as={'time'}
              decorate={false}
              className="mt-1 hidden md:block"
            >
              <DateFormatter date={post.created_at} />
            </ArticleEye>
          </div>
        ))
      )}
      <ShowMore
        handleDown={handleDown}
        handleUp={handleUp}
        meta={meta}
        size={size}
        isPending={isLoadingMore}
      />
    </>
  )
}
export default CategoryArticles

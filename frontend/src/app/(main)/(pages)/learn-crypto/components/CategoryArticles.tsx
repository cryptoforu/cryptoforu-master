'use client'
import { EyeIcon } from '@heroicons/react/20/solid'
import { Route } from 'next'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

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
import useObserver from '@/hooks/useObserver'
import { useCategoryContext } from '@/store/useCategoryStore'

const CategoryArticles = () => {
  const articleRef = useRef(null)
  const articleRefs = useRef<HTMLDivElement[] | null[]>([])
  const [activeIndex] = useObserver({
    containerRef: articleRef,
    childRefs: articleRefs,
  })
  const posts = useCategoryContext((state) => state.posts)
  const router = useRouter()

  function handleDown() {
    const currentElement = articleRefs.current[activeIndex]
    if (currentElement) {
      currentElement.scrollIntoView({
        block: 'start',
      })
    }
  }

  return (
    <>
      {posts.data.map((post, index) => (
        <div
          ref={articleRef}
          id={post.title}
          key={post.title}
          className="md:grid md:grid-cols-4 md:items-baseline"
        >
          <ArticleCard as={'div'} className={'md:col-span-3'}>
            <div
              ref={(ref) => (articleRefs.current[index] = ref)}
              id={`post-${index}`}
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
      ))}
      <ShowMore handleDown={handleDown} posts={posts} />
    </>
  )
}
export default CategoryArticles

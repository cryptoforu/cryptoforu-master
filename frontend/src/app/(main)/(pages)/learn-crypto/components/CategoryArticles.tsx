'use client'
import {
  ArticleCard,
  ArticleCta,
  ArticleDescription,
  ArticleEye,
  ArticleTitle,
} from '@/components/content'
import { DateFormatter } from '@/components/misc/DateFormatter'
import { Button } from '@/components/elements'
import { Route } from 'next'
import useCategoryController from '@/store/controllers/useCategoryController'
import { useCategoryContext } from '@/store/useCategoryStore'
import { Text } from '@/components/typography'
import { EyeIcon } from '@heroicons/react/20/solid'
import usePostCount from '@/store/controllers/usePostCount'
import { useRouter } from 'next/navigation'
import useObserver from '@/hooks/useObserver'
import { useRef } from 'react'

const CategoryArticles = () => {
  let articleRef = useRef(null)
  let articleRefs = useRef<HTMLDivElement[] | null[]>([])
  const [activeIndex] = useObserver({
    containerRef: articleRef,
    childRefs: articleRefs,
  })

  const { isPending, onChangeDown, onChangeUp } = useCategoryController()
  const posts = useCategoryContext((state) => state.posts)
  const [pageSize, per_page] = useCategoryContext((state) => [
    state.pageSize,
    state.per_page,
  ])

  const { updateCount, filterPost } = usePostCount()
  const router = useRouter()
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
              <Text variant={'secondary'}>{filterPost(post.id)?.count}</Text>
            </div>
            <ArticleTitle
              onClick={() => {
                void updateCount(post.slug, post.id)
                router.push(post.post_links.post_link as Route)
              }}
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

      <div
        id={'scroll-region'}
        className={'flex items-center justify-center gap-4 py-6'}
      >
        {posts.meta.next_page_url !== null && (
          <Button onClick={() => onChangeUp()} disabled={isPending}>
            Show More
          </Button>
        )}
        {pageSize !== per_page && (
          <Button
            onClick={() => {
              onChangeDown()
              articleRefs.current[activeIndex as number]?.scrollIntoView({
                block: 'start',
              })
            }}
            disabled={isPending}
          >
            Show Less
          </Button>
        )}
      </div>
    </>
  )
}
export default CategoryArticles
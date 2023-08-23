// noinspection JSUnusedGlobalSymbols

import { ArrowSmallLeftIcon } from '@heroicons/react/20/solid'
import { Route } from 'next'
import { Suspense } from 'react'

import {
  PostMainContent,
  PostSidebar,
} from '@/app/(main)/(pages)/learn-crypto/[category]/[post]/components'
import { markdownComponents } from '@/app/(main)/(pages)/learn-crypto/[category]/[post]/components/markdown-components'
import PostHeader from '@/app/(main)/(pages)/learn-crypto/[category]/[post]/components/PostHeader'
import PostLeftSidebar from '@/app/(main)/(pages)/learn-crypto/[category]/[post]/components/PostLeftSidebar'
import ResetToc from '@/app/(main)/(pages)/learn-crypto/[category]/[post]/components/ResetToc'
import {
  CategoryParams,
  PostParams,
  PostWithCategory,
} from '@/app/(main)/(pages)/learn-crypto/blog'
import {
  getArticle,
  getArticleMeta,
  getCategory,
} from '@/app/(main)/(pages)/learn-crypto/blogApiFactory'
import RelatedPosts from '@/app/(main)/(pages)/learn-crypto/components/RelatedPosts'
import { AdPlaceholder } from '@/components/content'
import { BtnLink } from '@/components/elements'
import { ContentSkeleton } from '@/components/skeletons'
import ArticleSkeleton from '@/components/skeletons/ArticleSkeleton'
import WidgetSkeleton from '@/components/skeletons/WidgetSkeleton'
import { Prose } from '@/components/typography'
import useMarkdown from '@/hooks/useMarkdown'
import AnimatedImage from '@/motion/AnimatedImage'

export const revalidate = 3600
export const dynamicParams = true
export const generateMetadata = async ({ params }: PostParams) =>
  getArticleMeta({ params })

export async function generateStaticParams({ params }: CategoryParams) {
  const posts = (await getCategory(
    params.category,
    '?filter[postId]=6'
  )) as PostWithCategory[]
  return posts.map((post) => ({
    post: post.slug,
  }))
}

export default async function Post({ params }: PostParams) {
  const article = (await getArticle(
    params.category,
    params.post
  )) as unknown as PostWithCategory

  const markdown = useMarkdown(article.content, {
    components: markdownComponents,
  })
  const related = getCategory(
    params.category,
    `?filter[related]=${params.post}`
  ) as unknown as Promise<PostWithCategory[]>
  return (
    <>
      <ResetToc />
      <div
        className={
          'relative mx-auto flex max-w-9xl justify-center border-b border-gray-100 pb-24 dark:border-gray-900 sm:px-2 lg:max-w-none'
        }
      >
        <Suspense fallback={<WidgetSkeleton numberOfLines={20} />}>
          <PostLeftSidebar />
        </Suspense>
        <Suspense fallback={<ArticleSkeleton />}>
          <div
            className={
              'min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-3xl lg:flex-1 lg:basis-1/2 lg:pl-8 lg:pr-0 xl:px-16'
            }
          >
            <Prose className={'max-w-none'}>
              <div className={'not-prose relative'}>
                <BtnLink
                  href={`/learn-crypto/${article.category?.slug}` as Route}
                  className={'absolute -top-12 left-0'}
                  variant={'solid'}
                  colorScheme={'secondary'}
                >
                  <ArrowSmallLeftIcon className={'mr-1 h-5 w-5'} />
                  <span>Back</span>
                </BtnLink>
              </div>
              <PostHeader
                headline={article.headline.split('|')}
                updated={article.updated_at}
                reading_time={article.reading_time}
              >
                {article.introduction}
              </PostHeader>
              <AnimatedImage
                src={article.image_name}
                alt={article.title}
                width={1000}
                height={600}
              />
              <PostMainContent post_links={article.post_links}>
                {markdown}
              </PostMainContent>
            </Prose>
          </div>
        </Suspense>

        <PostSidebar post={article} />
      </div>
      <div className={'mx-auto max-w-5xl py-12'}>
        <AdPlaceholder ad={'leaderboard'} />
      </div>
      <Suspense fallback={<ContentSkeleton cards={4} />}>
        <RelatedPosts data={related} title={'Related'} description={'Posts'} />
      </Suspense>
    </>
  )
}

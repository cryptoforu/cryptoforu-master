// noinspection JSUnusedGlobalSymbols

import { ArrowSmallLeftIcon } from '@heroicons/react/20/solid'
import { Route } from 'next'
import { Suspense } from 'react'

import {
  PostMainContent,
  PostSidebar,
  Toc,
} from '@/app/(main)/(pages)/learn-crypto/[category]/[post]/components'
import CategoryNav from '@/app/(main)/(pages)/learn-crypto/[category]/[post]/components/CategoryNav'
import PostHeader from '@/app/(main)/(pages)/learn-crypto/[category]/[post]/components/PostHeader'
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
import { BtnLink, ResponsiveImage } from '@/components/elements'
import { AnchorLink } from '@/components/elements/Link'
import { ContentSkeleton } from '@/components/skeletons'
import WidgetSkeleton from '@/components/skeletons/WidgetSkeleton'
import { Heading, Prose } from '@/components/typography'
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
    components: {
      a: (props: any) => <AnchorLink {...props} />,
      img: (props: any) => <ResponsiveImage src={props.src} alt={props.alt} />,
      h1: (props: any) => <Heading as={'h1'} size={'xl'} {...props} />,
      h2: (props: any) => (
        <Heading as={'h2'} size={'lg'} className={'group flex'} {...props} />
      ),
      h3: (props: any) => (
        <Heading as={'h3'} size={'md'} className={'group flex'} {...props} />
      ),
    },
  })
  const related = getCategory(
    params.category,
    `?filter[related]=${params.post}`
  ) as unknown as Promise<PostWithCategory[]>
  return (
    <>
      <div
        className={
          'relative mx-auto flex max-w-9xl justify-center border-b border-gray-100 pb-24 dark:border-gray-900 sm:px-2 lg:max-w-none'
        }
      >
        <div className="hidden lg:relative lg:block lg:w-full lg:max-w-fit lg:flex-initial lg:basis-1/4">
          <div className="sticky top-[4.9rem] -ml-0.5 h-[calc(100vh-4.9rem)] overflow-y-auto overflow-x-hidden py-8 pl-4">
            <div className="absolute bottom-0 right-0 top-8 hidden w-px bg-slate-800 dark:block" />
            <Toc markdown={markdown} />
            <Suspense fallback={<WidgetSkeleton numberOfLines={10} />}>
              <CategoryNav />
            </Suspense>
          </div>
        </div>
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

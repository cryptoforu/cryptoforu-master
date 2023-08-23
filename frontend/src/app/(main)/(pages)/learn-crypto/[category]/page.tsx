// noinspection JSUnusedGlobalSymbols

import { Suspense } from 'react'

import type { CategoryParams } from '@/app/(main)/(pages)/learn-crypto/blog'
import {
  PaginatedPosts,
  PostWithCategory,
} from '@/app/(main)/(pages)/learn-crypto/blog'
import {
  filterCategory,
  getCategory,
  getCategoryMeta,
} from '@/app/(main)/(pages)/learn-crypto/blogApiFactory'
import CategoryArticles from '@/app/(main)/(pages)/learn-crypto/components/CategoryArticles'
import RelatedPosts from '@/app/(main)/(pages)/learn-crypto/components/RelatedPosts'
import ScrollContainer from '@/app/(main)/(pages)/learn-crypto/components/ScrollContainer'
import { AdPlaceholder, PrevNext } from '@/components/content'
import Sidebar from '@/components/sidebar/Sidebar'
import { ContentSkeleton } from '@/components/skeletons'
import CategoryArticlesSkeleton from '@/components/skeletons/CategoryArticlesSkeleton'
import { Container } from '@/components/wrappers'
import { getTags } from '@/requests/getTags'
import SidebarProvider from '@/store/controllers/SidebarProvider'
import CategoryProvider from '@/store/useCategoryStore'

export const revalidate = 3600

export const generateMetadata = async ({ params }: CategoryParams) =>
  getCategoryMeta(params.category)

export default async function CategoryPage({ params }: CategoryParams) {
  const data = (await getCategory(
    params.category,
    '?page[size]=6'
  )) as unknown as PaginatedPosts
  const category = await filterCategory(params.category)
  const tags = await getTags()
  const promise = getCategory(
    params.category,
    `?filter[related]=category`
  ) as unknown as Promise<PostWithCategory[]>
  return (
    <>
      <Container variant={'flex'}>
        <div
          className={
            'relative mx-auto flex max-w-8xl justify-center border-b border-gray-100 pb-24 dark:border-gray-900 sm:px-2'
          }
        >
          <Suspense fallback={<CategoryArticlesSkeleton cards={6} />}>
            <CategoryProvider posts={data}>
              <ScrollContainer header={category.description}>
                <CategoryArticles />
                <PrevNext
                  prev={category.category_links.prev}
                  next={category.category_links.next}
                />
              </ScrollContainer>
            </CategoryProvider>
          </Suspense>
          <SidebarProvider
            selectedType={'category_page'}
            data={{ id: category.name, tagsProps: tags }}
          >
            <Sidebar />
          </SidebarProvider>
        </div>
      </Container>
      <div className={'mx-auto max-w-5xl py-12'}>
        <AdPlaceholder ad={'leaderboard'} />
      </div>
      <Suspense fallback={<ContentSkeleton cards={4} />}>
        <RelatedPosts data={promise} title={'Related'} description={'Posts'} />
      </Suspense>
    </>
  )
}

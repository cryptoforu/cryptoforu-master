// noinspection JSUnusedGlobalSymbols

import { Metadata } from 'next'
import { Suspense } from 'react'

import CategoryController from '@/app/(main)/(pages)/learn-crypto/components/CategoryController'
import RelatedPosts from '@/app/(main)/(pages)/learn-crypto/components/RelatedPosts'
import ScrollContainer from '@/app/(main)/(pages)/learn-crypto/components/ScrollContainer'
import type { CategoryParams, CategoryWithPosts } from '@/app/api/blog/blog'
import {
  fetchCategory,
  getCategoryMeta,
  getTags,
} from '@/app/api/blog/blogRoutes'
import { AdPlaceholder, PrevNext } from '@/components/content'
import Sidebar from '@/components/sidebar/Sidebar'
import { ContentSkeleton, SectionSkeleton } from '@/components/skeletons'
import SidebarSkeleton from '@/components/skeletons/SidebarSkeleton'
import { Container } from '@/components/wrappers'
import SidebarProvider from '@/store/controllers/SidebarProvider'
import { CategoryProvider } from '@/store/useCategoryProvider'

export async function generateMetadata({
  params,
}: CategoryParams): Promise<Metadata> {
  return await getCategoryMeta({ params })
}

export default async function CategoryPage({ params }: CategoryParams) {
  const category = await fetchCategory<CategoryWithPosts>({
    params,
    include: 'posts',
    page: {
      size: '6',
    },
  })
  const tags = await getTags()
  return (
    <>
      <Container variant={'flex'}>
        <div
          className={
            'relative mx-auto flex max-w-8xl justify-center border-b border-gray-100 pb-24 dark:border-gray-900 sm:px-2'
          }
        >
          <Suspense fallback={<SectionSkeleton />}>
            <CategoryProvider category={category}>
              <ScrollContainer header={category.description}>
                <CategoryController />
                <PrevNext
                  prev={category.category_links.prev}
                  next={category.category_links.next}
                />
              </ScrollContainer>
            </CategoryProvider>
          </Suspense>
          <Suspense fallback={<SidebarSkeleton />}>
            <SidebarProvider
              selectedType={'category_page'}
              data={{ id: category.name, tagsProps: tags }}
            >
              <Sidebar />
            </SidebarProvider>
          </Suspense>
        </div>
      </Container>
      <div className={'mx-auto max-w-5xl py-12'}>
        <AdPlaceholder ad={'leaderboard'} />
      </div>
      <Suspense fallback={<ContentSkeleton cards={4} />}>
        <RelatedPosts params={params} title={'Related'} description={'Posts'} />
      </Suspense>
    </>
  )
}

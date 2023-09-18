// noinspection JSUnusedGlobalSymbols

import { Metadata } from 'next'
import { Suspense } from 'react'

import CategoryArticles from '@/app/(main)/(pages)/learn-crypto/components/CategoryArticles'
import RelatedPosts from '@/app/(main)/(pages)/learn-crypto/components/RelatedPosts'
import ScrollContainer from '@/app/(main)/(pages)/learn-crypto/components/ScrollContainer'
import type { CategoryParams } from '@/app/api/blog/blog'
import {
  baseCategory,
  getCategoryMeta,
  getRelatedPosts,
  getTags,
} from '@/app/api/blog/blogRoutes'
import { AdPlaceholder, PrevNext } from '@/components/content'
import Sidebar from '@/components/sidebar/Sidebar'
import { ContentSkeleton, SectionSkeleton } from '@/components/skeletons'
import { Container } from '@/components/wrappers'
import SidebarProvider from '@/store/controllers/SidebarProvider'

export const revalidate = 3600

export async function generateMetadata({
  params,
}: CategoryParams): Promise<Metadata> {
  return await getCategoryMeta({ params })
}

export default async function CategoryPage({ params }: CategoryParams) {
  const category = await baseCategory({
    params,
  })
  const tags = await getTags()
  const promise = getRelatedPosts(params.category, 'category')
  return (
    <>
      <Container variant={'flex'}>
        <div
          className={
            'relative mx-auto flex max-w-8xl justify-center border-b border-gray-100 pb-24 dark:border-gray-900 sm:px-2'
          }
        >
          <Suspense fallback={<SectionSkeleton />}>
            <ScrollContainer header={category.description}>
              <CategoryArticles />
              <PrevNext
                prev={category.category_links.prev}
                next={category.category_links.next}
              />
            </ScrollContainer>
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

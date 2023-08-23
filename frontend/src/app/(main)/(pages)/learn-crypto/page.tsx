// noinspection JSUnusedGlobalSymbols

import { Suspense } from 'react'

import {
  CategoryWithPosts,
  PostWithCategory,
} from '@/app/(main)/(pages)/learn-crypto/blog'
import { getCategories } from '@/app/(main)/(pages)/learn-crypto/blogApiFactory'
import PageWrapper from '@/app/(main)/(pages)/SharedComponents/PageWrapper'
import { AdPlaceholder } from '@/components/content'
import { ContentSkeleton } from '@/components/skeletons'
import { getMetadata, preload } from '@/lib/getData'

import CategoryPosts from './components/CategoryPosts'
import LatestPosts from './components/LatestPosts'

preload('site/shared/meta-data?filter[page_name]=learn_crypto')

export async function generateMetadata() {
  return await getMetadata('learn_crypto')
}

export default async function LearnCrypto() {
  const latest = (await getCategories('/latest')) as PostWithCategory[]
  const categoriesData = getCategories(
    '?include=posts&page[size]=6'
  ) as Promise<CategoryWithPosts[]>
  return (
    <PageWrapper>
      <Suspense fallback={<ContentSkeleton cards={3} />}>
        <LatestPosts latest={latest} />
      </Suspense>
      <Suspense fallback={<ContentSkeleton cards={6} />}>
        <CategoryPosts categories={categoriesData} />
      </Suspense>
      <div className={'mx-auto max-w-5xl'}>
        <AdPlaceholder ad={'leaderboard'} />
      </div>
    </PageWrapper>
  )
}

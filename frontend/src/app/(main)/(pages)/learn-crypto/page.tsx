// noinspection JSUnusedGlobalSymbols

import { Suspense } from 'react'

import PageWrapper from '@/app/(main)/(pages)/SharedComponents/PageWrapper'
import { getMetaData } from '@/app/api/site_data/siteRoutes'
import { AdPlaceholder } from '@/components/content'
import { ContentSkeleton } from '@/components/skeletons'

import CategoryPosts from './components/CategoryPosts'
import LatestPosts from './components/LatestPosts'

export async function generateMetadata() {
  return await getMetaData('learn_crypto')
}

export default async function LearnCrypto() {
  return (
    <PageWrapper>
      <Suspense fallback={<ContentSkeleton cards={3} />}>
        <LatestPosts />
      </Suspense>
      <Suspense fallback={<ContentSkeleton cards={6} />}>
        <CategoryPosts />
      </Suspense>
      <div className={'mx-auto max-w-5xl'}>
        <AdPlaceholder ad={'leaderboard'} />
      </div>
    </PageWrapper>
  )
}

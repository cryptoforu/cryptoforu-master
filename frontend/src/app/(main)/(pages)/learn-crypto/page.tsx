import { getMetadata, preload } from '@/lib/getData'
import { Suspense } from 'react'
import { SectionSkeleton } from '@/components/skeletons'
import CategoryPosts from './components/CategoryPosts'
import { getCategories } from './getCategories'
import LatestPosts from './components/LatestPosts'
import { AdPlaceholder } from '@/components/content'
import { getArticles } from './[category]/[post]/getPosts'
import PageWrapper from '@/app/(main)/(pages)/SharedComponents/PageWrapper'

preload('meta-data?filter[page_name]=learn_crypto')

export async function generateMetadata() {
  return await getMetadata('learn_crypto')
}

export default async function LearnCrypto() {
  const latest = await getArticles('include=category&page[size]=3')
  const categoriesData = getCategories('include=posts')
  return (
    <PageWrapper>
      <LatestPosts latest={latest} />
      <Suspense fallback={<SectionSkeleton />}>
        <CategoryPosts categories={categoriesData} />
      </Suspense>
      <div className={'mx-auto max-w-5xl'}>
        <AdPlaceholder ad={'leaderboard'} />
      </div>
    </PageWrapper>
  )
}

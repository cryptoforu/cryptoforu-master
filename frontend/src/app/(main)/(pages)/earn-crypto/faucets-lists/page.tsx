import { listDescription } from 'contentlayer/generated'
import lazy from 'next/dynamic'
import { Suspense } from 'react'

import ListData from '@/app/(main)/(pages)/earn-crypto/faucets-lists/components/ListData'
import ListFilters from '@/app/(main)/(pages)/earn-crypto/faucets-lists/components/ListFilters'
import ListPagination from '@/app/(main)/(pages)/earn-crypto/faucets-lists/components/ListPagination'
import { fetchList } from '@/app/(main)/(pages)/earn-crypto/faucets-lists/getLists'
import PageWrapper from '@/app/(main)/(pages)/SharedComponents/PageWrapper'
import { AdPlaceholder } from '@/components/content'
import MdxContent from '@/components/mdx-components'
import {
  CardSkeleton,
  SectionSkeleton,
  TableSkeleton,
} from '@/components/skeletons'
import { Container, Section } from '@/components/wrappers'
import { getMetadata } from '@/lib/getData'
import FaucetListProvider from '@/store/useListStore'

export const dynamic = 'force-dynamic'

const ListStats = lazy(() => import('./components/ListStats'), {
  loading: () => <CardSkeleton cards={2} />,
})

export async function generateMetadata() {
  return await getMetadata('faucets_list')
}

export default async function ListPage() {
  const initialList = await fetchList('top_hundred', '50', '1')
  return (
    <PageWrapper>
      <AdPlaceholder ad={'leaderboard'} />
      <Suspense fallback={<SectionSkeleton />}>
        <FaucetListProvider data={initialList}>
          <Section id={'list'} ariaLabel={'Faucet List'}>
            <Container variant={'flex'} className={'flex-col'}>
              <ListFilters />
              <Suspense fallback={<TableSkeleton rows={10} />}>
                <ListData />
              </Suspense>
              <ListPagination />
            </Container>
          </Section>
        </FaucetListProvider>
      </Suspense>
      <ListStats />
      <MdxContent code={listDescription.body.code} />
    </PageWrapper>
  )
}

// noinspection JSUnusedGlobalSymbols

import { listDescription } from 'contentlayer/generated'
import { Suspense } from 'react'

import { getList } from '@/app/(main)/(pages)/earn-crypto/faucets-lists/api/listFactory'
import ListData from '@/app/(main)/(pages)/earn-crypto/faucets-lists/components/ListData'
import ListFilters from '@/app/(main)/(pages)/earn-crypto/faucets-lists/components/ListFilters'
import ListPagination from '@/app/(main)/(pages)/earn-crypto/faucets-lists/components/ListPagination'
import ListStats from '@/app/(main)/(pages)/earn-crypto/faucets-lists/components/ListStats'
import { FaucetsListData } from '@/app/(main)/(pages)/earn-crypto/faucets-lists/faucets-lists'
import PageWrapper from '@/app/(main)/(pages)/SharedComponents/PageWrapper'
import { getMetaData } from '@/app/api/site_data/siteRoutes'
import { AdPlaceholder } from '@/components/content'
import MdxContent from '@/components/mdx-components'
import {
  CardSkeleton,
  SectionSkeleton,
  TableSkeleton,
} from '@/components/skeletons'
import { Container, Section } from '@/components/wrappers'
import { FaucetListProvider } from '@/store/useFaucetListProvider'
// noinspection JSUnusedGlobalSymbols
export const dynamic = 'auto'
export const revalidate = 3600

export async function generateMetadata() {
  return await getMetaData('faucets_list')
}

export default function ListPage() {
  const dataPromise = getList('TOP') as Promise<FaucetsListData>

  return (
    <PageWrapper>
      <AdPlaceholder ad={'leaderboard'} />
      <Suspense fallback={<SectionSkeleton />}>
        <Section id={'list'} ariaLabel={'Faucet List'}>
          <Container variant={'flex'} className={'flex-col'}>
            <Suspense fallback={<TableSkeleton rows={10} />}>
              <FaucetListProvider dataPromise={dataPromise}>
                <ListFilters />
                <ListData />
                <ListPagination />
              </FaucetListProvider>
            </Suspense>
          </Container>
        </Section>
      </Suspense>
      <Suspense fallback={<CardSkeleton cards={2} />}>
        <ListStats />
        <MdxContent code={listDescription.body.code} />
      </Suspense>
    </PageWrapper>
  )
}

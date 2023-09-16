// noinspection JSUnusedGlobalSymbols

import { Suspense } from 'react'

import Description from '@/app/(main)/(pages)/earn-crypto/components/Description'
import Faq from '@/app/(main)/(pages)/earn-crypto/components/Faq'
import PageWrapper from '@/app/(main)/(pages)/SharedComponents/PageWrapper'
import EarningMethods from '@/app/(main)/ui/EarningMethods'
import { getMetaData } from '@/app/api/site_data/siteRoutes'
import { ContentSkeleton, SectionSkeleton } from '@/components/skeletons'

export async function generateMetadata() {
  return await getMetaData('earn_crypto')
}

export default async function EarnCrypto() {
  return (
    <PageWrapper>
      <Suspense fallback={<ContentSkeleton cards={6} />}>
        <EarningMethods page={'earn'} />
      </Suspense>
      <Description />
      <Suspense fallback={<SectionSkeleton />}>
        <Faq />
      </Suspense>
    </PageWrapper>
  )
}

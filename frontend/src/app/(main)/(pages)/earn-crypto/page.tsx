// noinspection JSUnusedGlobalSymbols

import { Suspense } from 'react'

import Description from '@/app/(main)/(pages)/earn-crypto/components/Description'
import Faq from '@/app/(main)/(pages)/earn-crypto/components/Faq'
import PageWrapper from '@/app/(main)/(pages)/SharedComponents/PageWrapper'
import EarningMethods from '@/app/(main)/ui/EarningMethods'
import { ContentSkeleton, SectionSkeleton } from '@/components/skeletons'
import { getMetadata, preload } from '@/lib/getData'

preload('site/shared/meta-data?filter[page_name]=earn_crypto')

export async function generateMetadata() {
  return await getMetadata('earn_crypto')
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

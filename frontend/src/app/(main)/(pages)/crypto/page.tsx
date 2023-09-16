import { Suspense } from 'react'

import GainersLosers from '@/app/(main)/(pages)/crypto/components/GainersLosers'
import PageWrapper from '@/app/(main)/(pages)/SharedComponents/PageWrapper'
import { getMetaData } from '@/app/api/site_data/siteRoutes'
import { CardSkeleton } from '@/components/skeletons'

export async function generateMetadata() {
  return await getMetaData('crypto')
}

export default async function CryptoPage() {
  return (
    <PageWrapper>
      <Suspense fallback={<CardSkeleton cards={2} />}>
        <GainersLosers />
      </Suspense>
    </PageWrapper>
  )
}

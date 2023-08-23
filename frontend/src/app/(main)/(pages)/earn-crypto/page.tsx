// noinspection JSUnusedGlobalSymbols

import { Suspense } from 'react'

import Description from '@/app/(main)/(pages)/earn-crypto/components/Description'
import Faq from '@/app/(main)/(pages)/earn-crypto/components/Faq'
import TabsSection from '@/app/(main)/(pages)/earn-crypto/components/TabsSection'
import { getCategoryMethods } from '@/app/(main)/(pages)/earn-crypto/getMethods'
import PageWrapper from '@/app/(main)/(pages)/SharedComponents/PageWrapper'
import { SectionSkeleton } from '@/components/skeletons'
import { getMetadata, preload } from '@/lib/getData'
import { getFaq } from '@/requests/getFaq'

preload('site/shared/meta-data?filter[page_name]=earn_crypto')

export async function generateMetadata() {
  return await getMetadata('earn_crypto')
}

export default async function EarnCrypto() {
  const earnCategories = await getCategoryMethods()
  const faq = await getFaq()
  return (
    <PageWrapper>
      <Suspense fallback={<SectionSkeleton />}>
        <TabsSection categoryMethods={earnCategories} />
      </Suspense>
      <Description />
      <Suspense fallback={<SectionSkeleton />}>
        <Faq items={faq} />
      </Suspense>
    </PageWrapper>
  )
}

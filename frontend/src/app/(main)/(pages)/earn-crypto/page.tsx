import { getMetadata, preload } from '@/lib/getData'
import { getCategoryMethods } from '@/app/(main)/(pages)/earn-crypto/getMethods'
import { Suspense } from 'react'
import { SectionSkeleton } from '@/components/skeletons'
import TabsSection from '@/app/(main)/(pages)/earn-crypto/components/TabsSection'
import Description from '@/app/(main)/(pages)/earn-crypto/components/Description'
import { getFaq } from '@/requests/getFaq'
import Faq from '@/app/(main)/(pages)/earn-crypto/components/Faq'
import PageWrapper from '@/app/(main)/(pages)/SharedComponents/PageWrapper'

preload('site/shared/meta-data?filter[page_name]=earn_crypto')

export async function generateMetadata() {
  return await getMetadata('earn_crypto')
}

export default async function EarnCrypto() {
  const earnCategories = await getCategoryMethods()
  const faq = getFaq()
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

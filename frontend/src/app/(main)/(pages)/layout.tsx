// noinspection JSUnusedGlobalSymbols

import { ReactNode, Suspense } from 'react'

import HeroWrapper from '@/app/(main)/(pages)/SharedComponents/HeroWrapper'
import PageHero from '@/app/(main)/(pages)/SharedComponents/PageHero'
import { TextSkeleton } from '@/components/skeletons'

export default async function PageLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <HeroWrapper>
        <Suspense fallback={<TextSkeleton />}>
          <PageHero />
        </Suspense>
      </HeroWrapper>
      <div className="flex w-full grow flex-col flex-wrap py-4 sm:flex-row sm:flex-nowrap">
        {children}
      </div>
    </>
  )
}

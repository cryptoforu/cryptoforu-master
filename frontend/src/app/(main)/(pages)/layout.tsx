// noinspection JSUnusedGlobalSymbols

import { ReactNode } from 'react'

import HeroWrapper from '@/app/(main)/(pages)/SharedComponents/HeroWrapper'
import PageHero from '@/app/(main)/(pages)/SharedComponents/PageHero'

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <HeroWrapper>
        <PageHero />
      </HeroWrapper>
      <div className="flex w-full grow flex-col py-4 sm:flex-row sm:flex-nowrap">
        {children}
      </div>
    </>
  )
}

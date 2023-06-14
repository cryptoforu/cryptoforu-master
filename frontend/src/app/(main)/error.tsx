'use client'

import { SolidButton } from '@/components/elements/Button'
import { Heading } from '@/components/typography'
import AppLogo from '@/components/AppLogo'

export interface ErrorProps {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <div className="mb-4 h-auto max-w-md">
            <AppLogo variant={'base_logo'} />
          </div>
          <Heading as={'h1'} size={'xl'} className="mb-4">
            Something went wrong! Try Refreshing Page
          </Heading>
          <SolidButton solid={'primary'} onClick={() => reset()}>
            Refresh
          </SolidButton>
        </div>
      </div>
    </section>
  )
}

'use client'

import { Button } from '@/components/elements'
import { Heading } from '@/components/typography'
import AppLogo from '@/components/AppLogo'

export interface ErrorProps {
  error: Error
  reset: () => void
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  return (
    <section className={'flex w-full items-center justify-center'}>
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto flex max-w-screen-sm flex-col justify-center text-center">
          <div className="mb-4 h-96 max-w-md">
            <AppLogo variant={'base_logo'} />
          </div>
          <Heading as={'h1'} size={'xl'} className="mb-4">
            Something went wrong! Try Refreshing Page
          </Heading>
          <Button colorScheme={'primary'} onClick={() => reset()}>
            Refresh
          </Button>
        </div>
      </div>
    </section>
  )
}

'use client'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid'
import { Route } from 'next'

import { BtnLink, InternalLink } from '@/components/elements'

type LinkMeta = {
  name: string
  slug: string
}

export type IPrevNextLink = {
  meta: LinkMeta
  previous: boolean
  label: string
}

export interface IPrevNext {
  prev: LinkMeta | null
  next: LinkMeta | null
}

function LinkLabel({
  arrow,
  label,
}: {
  arrow: 'left' | 'right'
  label: string
}) {
  return (
    <>
      {arrow === 'left' && <ArrowLeftIcon className={'-ml-1 h-5 w-5'} />}
      {label}
      {arrow === 'right' && <ArrowRightIcon className={'-mr-1  h-5 w-5'} />}
    </>
  )
}

function PrevNextLink({ meta, previous = false, label }: IPrevNextLink) {
  return (
    <>
      <BtnLink
        href={`${meta.slug}` as Route}
        colorScheme={'secondary'}
        size={'sm'}
        className={'gap-0.5 rounded-full'}
      >
        <LinkLabel label={label} arrow={previous ? 'left' : 'right'} />
      </BtnLink>
      <InternalLink
        href={`${meta.slug}` as Route}
        className={
          'text-base font-semibold transition hover:text-emerald-600 dark:hover:text-emerald-300'
        }
      >
        {meta.name}
      </InternalLink>
    </>
  )
}

export default function PrevNext(props: IPrevNext) {
  const { next, prev } = props

  if (!prev && !next) {
    return null
  }
  return (
    <div className={'not-prose flex'}>
      {prev?.name && (
        <div className="flex flex-col items-start gap-3">
          <PrevNextLink label={'Previous'} meta={prev} previous={true} />
        </div>
      )}
      {next?.name && (
        <div className="ml-auto flex flex-col items-end gap-3">
          <PrevNextLink label={'Next'} meta={next} previous={false} />
        </div>
      )}
    </div>
  )
}

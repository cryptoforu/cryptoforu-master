import { clsx } from 'clsx'
import { HTMLAttributes } from 'react'

import { Badge } from '@/components/elements'
import { Heading, Text } from '@/components/typography'
import { detacher } from '@/fonts/fonts'

export interface ISectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  headingSize?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  textSize?: 'md' | 'lg'
  badgeLabel?: string
  badgePosition?: string
  title: string
  gradTitle: string
  desc?: string
  decorate?: boolean
}

const SectionHeader = (props: ISectionHeaderProps) => {
  const {
    headingSize = 'xl',
    textSize = 'lg',
    badgeLabel,
    badgePosition = 'center',
    title,
    gradTitle,
    desc,
    decorate = false,
    ...rest
  } = props
  const badgePositionClass = 'justify-' + badgePosition
  return (
    <div className={`mx-auto ${rest.className}`}>
      {badgeLabel && (
        <div className={clsx('flex', badgePositionClass)}>
          <Badge variant={'secondary'} size={'md'} className={'relative'}>
            {badgeLabel}
          </Badge>
        </div>
      )}
      <Heading
        as={'h2'}
        size={headingSize}
        className={clsx(
          `mt-8 ${detacher.className} `,
          decorate && 'relative flex items-center pl-3.5'
        )}
      >
        {decorate && (
          <span
            className="absolute inset-y-0 left-0 flex items-center"
            aria-hidden="true"
          >
            <span className="h-[75%] w-1 rounded-full bg-slate-200 py-2 dark:bg-emerald-400" />
          </span>
        )}
        {title}
        {''}
        <span className={'ml-2 text-emerald-400'}>{gradTitle}</span>
      </Heading>
      {desc && (
        <Text size={textSize} variant={'prose'} className={'mt-4'}>
          {desc}
        </Text>
      )}
    </div>
  )
}
export default SectionHeader

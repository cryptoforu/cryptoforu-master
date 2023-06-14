import { HTMLAttributes } from 'react'
import { Heading, Text } from '@/components/typography'
import { Badge } from '@/components/elements'
import { detacher } from '@/data/fonts'

export interface ISectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  headingSize?: 'lg' | 'xl' | 'xxl'
  textSize?: 'md' | 'lg'
  badgeLabel?: string
  title: string
  gradTitle: string
  desc?: string
}

const SectionHeader = (props: ISectionHeaderProps) => {
  const {
    headingSize = 'xl',
    textSize = 'lg',
    badgeLabel,
    title,
    gradTitle,
    desc,
    ...rest
  } = props
  return (
    <div className={`mx-auto ${rest.className}`}>
      {badgeLabel && (
        <div className={'flex justify-center'}>
          <Badge variant={'secondary'} size={'lg'} className={'relative'}>
            {badgeLabel}
          </Badge>
        </div>
      )}
      <Heading
        as={'h2'}
        size={headingSize}
        className={`mt-8 ${detacher.className}`}
      >
        {title}
        {''}
        <span className={'ml-2 text-emerald-400'}>{gradTitle}</span>
      </Heading>
      {desc && (
        <Text size={textSize} className={'mx-auto mt-4 max-w-2xl'}>
          {desc}
        </Text>
      )}
    </div>
  )
}
export default SectionHeader

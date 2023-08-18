import { Route } from 'next'

import { Card, CardOverlayLink } from '@/components/content/index'
import { DateFormatter } from '@/components/misc/DateFormatter'
import { Text } from '@/components/typography'
import AnimatedImage from '@/motion/AnimatedImage'

type HorizontalCardProps = {
  image: string
  title: string
  description: string
  link: string
  time: string
  date: string
  status?: string
  tags?: {
    name: string
  }[]
}

const HorizontalCard = (props: HorizontalCardProps) => {
  return (
    <Card
      variant={'transparent'}
      size={'xl'}
      animation={'article'}
      className="group relative -mx-4 rounded-2xl p-3 sm:-mx-8 sm:flex sm:gap-8 sm:p-4"
    >
      <AnimatedImage
        src={props.image}
        alt={props.title}
        width="1000"
        height="667"
        imgClass={'h-40 w-full object-center rounded-2xl sm:h-full'}
        className="rounded-2xl sm:w-2/6"
      />

      <div className="sm:w-4/6 sm:space-y-2 sm:p-2 sm:pl-0">
        <div className={'flex items-center justify-between'}>
          <Text
            as={'span'}
            variant={'secondary'}
            size={'sm'}
            className="inline-block sm:mt-0"
          >
            <DateFormatter date={props.date} />
          </Text>
          <Text
            as={'span'}
            variant={'secondary'}
            size={'sm'}
            className="inline-block sm:mt-0"
          >
            {props.time}
          </Text>
        </div>
        <CardOverlayLink
          level={'h2'}
          href={props.link as Route}
          variant={'slate'}
          size={'sm'}
          className={'line-clamp-1'}
        >
          {props.title}
        </CardOverlayLink>

        <div className="mt-2 flex gap-4">
          {props.tags &&
            props.tags.map((tag) => (
              <span
                key={tag.name}
                className={
                  'rounded-full border border-slate-100 px-2 py-1 text-xs font-medium text-slate-100 transition duration-300 hover:border-transparent hover:bg-slate-900 hover:text-white dark:border-slate-700 dark:text-slate-300'
                }
              >
                {tag.name}
              </span>
            ))}
        </div>
      </div>
    </Card>
  )
}
export default HorizontalCard

import { DateFormatter } from '@/components/misc/DateFormatter'
import { Heading, ProseMarkdown, Text } from '@/components/typography'

interface PostHeaderProps {
  children: string
  headline: string[]
  updated: string
  reading_time: string
}

const PostHeader = ({
  children,
  headline,
  updated,
  reading_time,
}: PostHeaderProps) => {
  return (
    <>
      <Text as={'span'} variant={'gradient'} size={'md'} className={'mt-8'}>
        <DateFormatter date={updated} />
      </Text>
      <Heading as={'h1'} size={'lg'} className={'relative mt-4 pl-3.5'}>
        <span
          className="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <span className="h-[75%] w-1 rounded-full bg-slate-200 py-2 dark:bg-emerald-400" />
        </span>
        {headline[0]}
        {''}
        <span className={'ml-2 text-emerald-400'}>{headline[1]}</span>
      </Heading>
      <Text as={'span'} size={'md'}>
        {reading_time}
      </Text>
      <ProseMarkdown>{children}</ProseMarkdown>
    </>
  )
}
export default PostHeader

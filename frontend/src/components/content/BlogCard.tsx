import { Route } from 'next'

import { Card, CardOverlayLink } from '@/components/content/index'
import { ProseMarkdown, Text } from '@/components/typography'
import AnimatedImage from '@/motion/AnimatedImage'

export type BlogCardProps = {
  image: string
  heading: string
  description: string
  link: string
  date: string
  reading_time: string
}

const BlogCard = (props: BlogCardProps) => {
  return (
    <Card
      className="group relative space-y-6 p-4"
      variant={'transparent'}
      animation={'article'}
      size={'none'}
    >
      <AnimatedImage
        src={props.image}
        alt={props.heading}
        width="1000"
        height="667"
        className="h-80 w-full rounded-3xl object-cover object-top transition-all duration-500 group-hover:rounded-xl"
      />
      <CardOverlayLink level={'h2'} href={props.link as Route}>
        {props.heading}
      </CardOverlayLink>
      <ProseMarkdown>{props.description}</ProseMarkdown>
      <div className="flex items-center gap-6">
        <Text variant={'secondary'}>{props.date}</Text>
        <div className="flex items-center gap-2 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-5 w-5 text-gray-400 dark:text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{props.reading_time}</span>
        </div>
      </div>
    </Card>
  )
}
export default BlogCard

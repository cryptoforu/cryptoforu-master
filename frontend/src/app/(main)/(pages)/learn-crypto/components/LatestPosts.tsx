import { Route } from 'next'

import { PostWithCategory } from '@/app/api/blog/blog'
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  SectionHeader,
} from '@/components/content'
import { BtnLink, InternalLink } from '@/components/elements'
import { DateFormatter } from '@/components/misc/DateFormatter'
import { Heading, Text } from '@/components/typography'
import { Container, Section } from '@/components/wrappers'

const LatestPosts = async ({ latest }: { latest: PostWithCategory[] }) => {
  return (
    <Section id={'latest-posts'} ariaLabel={'Latest Posts'}>
      <Container>
        <SectionHeader
          headingSize={'lg'}
          title={'The latest articles'}
          gradTitle={'and Tutorials'}
          desc={
            'Stay up-to-date with the latest industry news or start learning from our tutorials'
          }
          className={'ml-2.5 max-w-5xl lg:mx-0'}
        />
        <div
          className={
            'mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 dark:border-gray-900 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3'
          }
        >
          {latest.map((post) => (
            <Card
              key={post.id}
              variant={'article'}
              size={'xl'}
              animation={'article'}
            >
              <CardHeader
                variant={'article'}
                size={'article'}
                className={'text-xs'}
              >
                <time
                  dateTime={post.updated_at}
                  className="text-gray-500 dark:text-gray-600"
                >
                  <DateFormatter date={post.updated_at} />
                </time>
                <InternalLink
                  className={
                    'relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 dark:bg-slate-900 dark:text-gray-400 dark:hover:bg-slate-800'
                  }
                  href={`/learn-crypto/${post.category?.slug}` as Route}
                >
                  {post.category?.name}
                </InternalLink>
              </CardHeader>
              <CardBody variant={'article'} size={'none'}>
                <Heading as={'h3'} className="mt-3 leading-6">
                  <InternalLink href={post.post_links.post_link as Route}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </InternalLink>
                </Heading>
                <Text className="mt-5 line-clamp-3" variant={'secondary'}>
                  {post.introduction}
                </Text>
              </CardBody>
              <CardFooter variant={'secondary'} size={'article'}>
                <BtnLink
                  href={post.post_links.post_link as Route}
                  colorScheme={'secondary'}
                  size={'sm'}
                  className={'rounded-full'}
                >
                  Read More
                </BtnLink>

                <Text variant={'secondary'} size={'md'}>
                  {post.reading_time}
                </Text>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}
export default LatestPosts

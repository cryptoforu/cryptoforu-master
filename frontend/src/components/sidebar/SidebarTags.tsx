import { Route } from 'next'

import { TagsApiResource } from '@/app/(main)/(pages)/learn-crypto/[category]/[post]/posts'
import { Card, CardBody, CardHeader } from '@/components/content'
import { InternalLink, Tag } from '@/components/elements'
import { Heading } from '@/components/typography'

export type SidebarTagsProps = {
  heading: string
  href: string
  tags: TagsApiResource[]
}

const SideBarTags = (props: SidebarTagsProps) => {
  return (
    <Card>
      <CardHeader className={'flex justify-between'}>
        <Heading as={'h4'} size={'sm'} variant={'secondary'} className={'grow'}>
          {props.heading}
        </Heading>
        <InternalLink
          href={props.href as Route}
          variant={'emerald'}
          hover={'emerald'}
        >
          View More
        </InternalLink>
      </CardHeader>
      <CardBody className={'mt-4 flex flex-wrap justify-center gap-2'}>
        {props.tags.map((tag) => (
          <Tag key={tag.id} variant={'slate'}>
            # {tag.name}
          </Tag>
        ))}
      </CardBody>
    </Card>
  )
}
export default SideBarTags

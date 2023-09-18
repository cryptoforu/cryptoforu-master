import { Route } from 'next'

import type { CategoryWithPosts } from '@/app/api/blog/blog'
import { getCategories } from '@/app/api/blog/blogRoutes'
import {
  Card,
  CardBody,
  CardFooter,
  CardImage,
  CardOverlayLink,
  DataTabsV2,
  SectionHeader,
} from '@/components/content'
import { Badge, BtnLink } from '@/components/elements'
import { DateFormatter } from '@/components/misc/DateFormatter'
import SectionGrid from '@/components/patterns/SectionGrid'
import { Text } from '@/components/typography'
import { Container, Section } from '@/components/wrappers'

const CategoryPosts = async () => {
  const categoriesData = await getCategories<CategoryWithPosts[]>({
    include: 'posts',
    page: {
      size: '6',
    },
  })
  const tabsData = categoriesData.map((category) => {
    return {
      id: category.id.toString(),
      key: category.id,
      label: category.name,
      content: (
        <div className={'flex flex-col'}>
          <div className={'grid gap-8 md:grid-cols-2 lg:grid-cols-3'}>
            {category.posts?.data.map((post) => (
              <Card variant={'filledGray'} key={post.id}>
                <CardImage
                  image={post.image_name}
                  alt={post.title}
                  width={1200}
                  height={600}
                  size={'auto'}
                  imageClass={'object cover rounded-lg'}
                />
                <CardBody variant={'secondary'}>
                  <div
                    className={
                      'relative flex flex-col items-start justify-start gap-4 pt-4'
                    }
                  >
                    <Badge variant={'primary'} size={'xs'}>
                      {category.name}
                    </Badge>
                    <CardOverlayLink
                      level={'h3'}
                      href={post.post_links.post_link as Route}
                      className={'line-clamp-2'}
                    >
                      {post.title}
                    </CardOverlayLink>
                  </div>
                </CardBody>
                <CardFooter>
                  <Text size={'md'} variant={'gradient'}>
                    {post.reading_time}
                  </Text>

                  <Text size={'md'} variant={'gradient'} className="text-right">
                    <DateFormatter date={post.updated_at} />
                  </Text>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className={'mt-12 flex w-full justify-center'}>
            <BtnLink
              size={'xl'}
              colorScheme={'secondary'}
              href={category.category_links.category_link as Route}
            >
              Browse All
            </BtnLink>
          </div>
        </div>
      ),
    }
  })
  return (
    <Section
      id={'category-posts'}
      ariaLabel={'Category Posts'}
      className={'relative isolate overflow-hidden'}
    >
      <SectionGrid />
      <Container>
        <SectionHeader
          title={'Latest Posts'}
          gradTitle={'by Category'}
          headingSize={'xl'}
          textSize={'md'}
          className={'-mb-12 max-w-2xl text-center'}
        />
        <DataTabsV2 data={tabsData} listPosition={'full'} />
      </Container>
    </Section>
  )
}
export default CategoryPosts

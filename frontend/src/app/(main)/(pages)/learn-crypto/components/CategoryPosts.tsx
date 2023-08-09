import { Container, Section } from '@/components/wrappers'
import {
  Card,
  CardBody,
  CardFooter,
  CardImage,
  CardOverlayLink,
  DataTabs,
  SectionHeader,
} from '@/components/content'
import type { CategoryApiResource } from '@/app/(main)/(pages)/learn-crypto/categories'
import { Badge, BtnLink } from '@/components/elements'
import { Route } from 'next'
import SectionGrid from '@/components/patterns/SectionGrid'
import { Text } from '@/components/typography'
import { DateFormatter } from '@/components/misc/DateFormatter'

const CategoryPosts = async ({
  categories,
}: {
  categories: Promise<CategoryApiResource[]>
}) => {
  const data = await categories
  const tabsData = data.map((category) => {
    return {
      id: category.id,
      label: category.name,
      content: (
        <>
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
        </>
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
        <DataTabs
          tabs={tabsData}
          variant={'underline'}
          withLink={false}
          listVariant={'full'}
          panelVariant={'transparent'}
        />
      </Container>
    </Section>
  )
}
export default CategoryPosts
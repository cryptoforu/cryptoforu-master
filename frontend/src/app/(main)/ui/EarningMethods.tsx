import { ArrowRightIcon } from '@heroicons/react/24/solid'

import type { EarnCategoryProps } from '@/app/api/earning-methods/earning-methods'
import { getEarnCategories } from '@/app/api/earning-methods/earnRoutes'
import {
  AdPlaceholder,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardImage,
  DataTabsV2,
  List,
  SectionHeader,
} from '@/components/content'
import { Badge, BtnLink, ExternalLink } from '@/components/elements'
import { Heading, ProseMarkdown, Text } from '@/components/typography'
import { Container, Section } from '@/components/wrappers'
import { filterArrayByIndices } from '@/lib/filterArray'

const EarningMethods = async ({ page }: { page: 'home' | 'earn' }) => {
  const methods = await getEarnCategories()
  const filteredMethods = filterArrayByIndices<EarnCategoryProps>(methods, {
    id: [1, 2, 7, 8],
  })
  const data = page === 'home' ? filteredMethods : methods
  const tabsData = data.map((category) => ({
    id: category.id,
    key: category.id,
    label: category.name,
    content: (
      <div className={'flex flex-col'}>
        <div className={'mx-auto flex w-full px-8 py-6 text-center'}>
          <ProseMarkdown className={'mx-auto max-w-none'}>
            {category.description}
          </ProseMarkdown>
        </div>
        <List
          as={'div'}
          className={'grid gap-8 md:grid-cols-2 lg:grid-cols-3'}
          items={page === 'home' ? category.earn.slice(0, 3) : category.earn}
          renderItem={(e) => (
            <Card
              key={e.id}
              variant={'outlineSlate'}
              size={'none'}
              className={'mx-0 my-5 shadow-[6px_6px_0px_#10b981] md:mx-5'}
            >
              <ExternalLink href={e.link} classes={'absolute inset-0 z-50'} />
              <CardHeader variant={'paper'}>
                <CardImage
                  image={e.image_name as string}
                  alt={e.title}
                  width={1366}
                  height={786}
                  imageClass={'min-h-[180px] rounded-t-xl'}
                  className={'relative max-h-[230px] w-full items-center'}
                />
              </CardHeader>
              <CardBody variant={'article'} className={'p-4'}>
                <div className={'flex justify-start'}>
                  <Badge
                    variant={'primary'}
                    size={'md'}
                    /* eslint-disable-next-line tailwindcss/no-custom-classname */
                    className={`text-${e.badge.color}`}
                  >
                    {e.badge.label}
                  </Badge>
                </div>
                <Heading
                  as={'h3'}
                  size={'md'}
                  className={'mt-4 line-clamp-1'}
                  variant={'gradient'}
                >
                  {e.title}
                </Heading>
                <ProseMarkdown className={'line-clamp-3'}>
                  {e.main_features}
                </ProseMarkdown>
              </CardBody>
              <CardFooter border={'slate'} size={'sm'}>
                <Text className={'p-4'}>View More</Text>
                <ArrowRightIcon
                  className={'h-5 w-5 text-slate-900 dark:text-primary-white'}
                />
              </CardFooter>
            </Card>
          )}
        />
      </div>
    ),
  }))
  return (
    <Section id={`earn-tabs-${page}`} ariaLabel={'Earning Methods'}>
      <Container>
        {page === 'home' ? (
          <SectionHeader
            className={'max-w-2xl lg:text-center'}
            title={'Earn Crypto with'}
            gradTitle={'Cryptoforu'}
            desc={
              'Join us in a Brand New Crypto World. Start exploring our awesome\n' +
              '            services and Earn your Online Passive Income right way'
            }
            badgeLabel={'Earning Methods'}
            badgePosition={'start lg:justify-center'}
          />
        ) : (
          <div className={'mx-auto w-full'}>
            <AdPlaceholder ad={'leaderboard'} />
          </div>
        )}

        <DataTabsV2 data={tabsData} listPosition={'full'} />
        {page === 'home' && (
          <div className={'mt-16 flex justify-center'}>
            <BtnLink
              href={'/earn-crypto'}
              colorScheme={'secondary'}
              size={'xl'}
            >
              Browse All
            </BtnLink>
          </div>
        )}
      </Container>
    </Section>
  )
}
export default EarningMethods

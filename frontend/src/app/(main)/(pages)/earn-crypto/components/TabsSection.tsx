import { Container, Section } from '@/components/wrappers'
import {
  AdPlaceholder,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardImage,
  List,
} from '@/components/content'
import DataTabs from '@/components/content/DataTabs'
import { EarnCategoryProps } from '@/app/(main)/(pages)/earn-crypto/earning-methods'
import { Heading, ProseMarkdown, Text } from '@/components/typography'
import { Badge, ExternalLink } from '@/components/elements'
import { ArrowRightIcon } from '@heroicons/react/24/solid'

const TabsSection = ({
  categoryMethods,
}: {
  categoryMethods: EarnCategoryProps[]
}) => {
  const tabsData = categoryMethods.map((category) => ({
    id: category.id,
    label: category.name,
    content: (
      <>
        <div className={'mx-auto flex w-full px-8 py-6 text-center'}>
          <ProseMarkdown className={'mx-auto max-w-none'}>
            {category.description}
          </ProseMarkdown>
        </div>
        <List
          as={'div'}
          className={'grid gap-8 md:grid-cols-2 lg:grid-cols-3'}
          items={category.earn}
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
      </>
    ),
  }))
  return (
    <>
      <Section id={'earn-tabs'} ariaLabel={'Earning Methods'}>
        <div className={'mx-auto w-full'}>
          <AdPlaceholder ad={'leaderboard'} />
        </div>
        <Container>
          <DataTabs
            tabs={tabsData}
            variant={'underline'}
            withLink={false}
            listVariant={'full'}
            panelVariant={'transparent'}
          />
        </Container>
      </Section>
    </>
  )
}
export default TabsSection

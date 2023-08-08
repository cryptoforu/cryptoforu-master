import { Container, Section } from '@/components/wrappers'
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardImage,
  CardOverlayLink,
  SectionHeader,
} from '@/components/content'
import DataTabs from '@/components/content/DataTabs'
import { getRandItem } from '@/lib/utils'
import { EarningMethods } from '@/types/shared-types'
import { Badge, ExternalLink } from '@/components/elements'
import { ProseMarkdown } from '@/components/typography'
import { ArrowRightIcon } from '@heroicons/react/24/solid'

const EarningMethods = async ({
  earnData,
}: {
  earnData: EarningMethods['data']
}) => {
  const badges = getRandItem(['Popular', 'Featured', 'Hot'])

  const tabsData = earnData.map((tab) => {
    return {
      id: tab.id,
      label: tab.attributes.name,
      content: (
        <div className={'grid gap-8 md:grid-cols-2 lg:grid-cols-3'}>
          {tab.attributes.earn.map((value) => (
            <Card
              key={value.id}
              variant={'outlineSlate'}
              size={'none'}
              className={'mx-0 my-5 shadow-[6px_6px_0px_#10b981] md:mx-5'}
            >
              <CardHeader variant={'paper'}>
                <CardImage
                  image={value.image_name}
                  alt={value.title}
                  width={1366}
                  height={786}
                  imageClass={'min-w-full rounded-t-xl'}
                  className={'relative max-h-[230px] w-full items-center'}
                />
              </CardHeader>
              <CardBody variant={'article'} className={'p-4'}>
                <div className={'flex justify-start'}>
                  <Badge variant={'primary'} size={'md'}>
                    {badges}
                  </Badge>
                </div>
                <CardOverlayLink
                  as={ExternalLink}
                  href={value.link as string}
                  level={'h3'}
                  size={'md'}
                  variant={'gradient'}
                  className={'z-10 mt-4 line-clamp-1'}
                >
                  {value.title}
                </CardOverlayLink>

                <ProseMarkdown className={'line-clamp-3'}>
                  {value.main_features}
                </ProseMarkdown>
              </CardBody>
              <CardFooter border={'slate'} size={'sm'}>
                <ExternalLink
                  href={value.link}
                  hover={'no_underline'}
                  classes={'p-4'}
                >
                  <span>View More</span>
                </ExternalLink>
                <ArrowRightIcon
                  className={'h-5 w-5 text-slate-900 dark:text-primary-white'}
                />
              </CardFooter>
            </Card>
          ))}
        </div>
      ),
    }
  })
  return (
    <>
      <Section id={'earning-methods'} ariaLabel={'earning Methods'}>
        <Container>
          <SectionHeader
            className={'max-w-2xl text-center'}
            title={'Earn Crypto with'}
            gradTitle={'Cryptoforu'}
            desc={
              'Join us in a Brand New Crypto World. Start exploring our awesome\n' +
              '            services and Earn your Online Passive Income right way'
            }
            badgeLabel={'Earning Methods'}
          />
          <DataTabs
            tabs={tabsData}
            variant={'underline'}
            withLink={true}
            listVariant={'left'}
            linkHref={'/earn-crypto'}
          />
        </Container>
      </Section>
    </>
  )
}
export default EarningMethods

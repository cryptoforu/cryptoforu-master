import { ArrowSmallRightIcon } from '@heroicons/react/20/solid'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { Route } from 'next'

import { CategoryApiResource } from '@/app/(main)/(pages)/learn-crypto/categories'
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardImage,
  SectionHeader,
} from '@/components/content'
import { Badge, Button, InternalLink } from '@/components/elements'
import SectionGrid from '@/components/patterns/SectionGrid'
import { Heading, ProseMarkdown } from '@/components/typography'
import { Container, Section } from '@/components/wrappers'
import { getHomeData } from '@/requests/getHomeData'

const CryptoAcademy = async () => {
  const categories = (await getHomeData('categories')) as CategoryApiResource[]
  return (
    <Section
      id={'crypto-academy'}
      ariaLabel={'Crypto Academy'}
      className={'relative border-t border-t-cyan-50 dark:border-t-slate-950'}
    >
      <SectionGrid />
      <Container className={'relative'}>
        <div
          className={
            'flex min-w-max flex-col items-center justify-between gap-8 px-8 md:flex-row'
          }
        >
          <div className={'py-2'}>
            <SectionHeader
              headingSize={'lg'}
              title={'Explore Our'}
              gradTitle={'Crypto Academy'}
              desc={
                '' +
                'To take advantage of the chance to increase both your knowledge and your financial opportunities,' +
                ' start learning with us right away'
              }
              className={'ml-2.5'}
            />
          </div>
          <div className={'py-2'}>
            <Button
              colorScheme={'secondary'}
              className={'mr-8'}
              href={'/learn-crypto'}
            >
              Browse All{''}
              <ArrowSmallRightIcon className={'h-5 w-5'} />
            </Button>
          </div>
        </div>
        <div
          className={
            'relative mt-8 grid grid-cols-1 gap-8 px-8 md:grid-cols-2 lg:grid-cols-3'
          }
        >
          {categories.map((category) => (
            <Card
              key={category.id}
              variant={'outlineSlate'}
              size={'none'}
              className={'mx-0 my-5 shadow-[6px_6px_0px_#10b981] md:mx-5'}
            >
              <CardHeader variant={'paper'}>
                <CardImage
                  image={category.category_image}
                  alt={category.name}
                  width={1366}
                  height={786}
                  imageClass={'min-w-full rounded-t-xl'}
                  className={'relative max-h-[230px] w-full items-center'}
                />
              </CardHeader>
              <CardBody variant={'article'} className={'p-4'}>
                <div className={'flex justify-start'}>
                  <Badge variant={'primary'} size={'md'}>
                    {category.name === 'NFT' ? 'Popular' : 'Beginners'}
                  </Badge>
                </div>
                <Heading
                  as={'h3'}
                  size={'md'}
                  className={'mt-4 line-clamp-1'}
                  variant={'gradient'}
                >
                  {category.name}
                </Heading>
                <ProseMarkdown className={'line-clamp-3'}>
                  {category.description}
                </ProseMarkdown>
              </CardBody>
              <CardFooter border={'slate'} size={'sm'}>
                <InternalLink
                  href={category.category_links.category_link as Route}
                  hover={'no_underline'}
                  className={'p-4'}
                >
                  <span>View More</span>
                </InternalLink>
                <ArrowRightIcon
                  className={'h-5 w-5 text-slate-900 dark:text-primary-white'}
                />
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}
export default CryptoAcademy

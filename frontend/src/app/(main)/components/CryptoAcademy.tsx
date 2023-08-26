import { ArrowSmallRightIcon } from '@heroicons/react/20/solid'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { Route } from 'next'

import { CategoryWithPosts } from '@/app/(main)/(pages)/learn-crypto/blog'
import { getCategories } from '@/app/(main)/(pages)/learn-crypto/blogApiFactory'
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
import { Container, Grid, Section } from '@/components/wrappers'

const CryptoAcademy = async () => {
  const categories = (await getCategories(
    '?filter[id]=1,7,8'
  )) as CategoryWithPosts[]
  return (
    <Section
      id={'crypto-academy'}
      ariaLabel={'Crypto Academy'}
      className={
        'overflow-hidden border-t border-t-cyan-50 dark:border-t-slate-950'
      }
    >
      <SectionGrid />
      <Container>
        <div
          className={'lg:flex lg:flex-row lg:items-center lg:justify-between'}
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
              className={'lg:ml-2.5 lg:max-w-2xl'}
            />
          </div>
          <div className={'hidden lg:block lg:py-2'}>
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
        <Grid cols={'three'}>
          {categories.map((category) => (
            <Card
              key={category.id}
              variant={'outlineSlate'}
              size={'article'}
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
              <CardBody variant={'secondary'} className={'p-4'}>
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
        </Grid>
      </Container>
    </Section>
  )
}
export default CryptoAcademy

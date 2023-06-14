import { Container, Section } from '@/components/wrappers'
import { Card, SectionHeader } from '@/components/content'
import { Badge, Link, SolidButton } from '@/components/elements'
import { getData, preload } from '@/lib/getData'
import { CategoryData } from '@/types/shared-types'
import Image from 'next/image'
import { Heading } from '@/components/typography'
import Prose from '@/components/typography/Prose'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import Lines from '@/components/patterns/Lines'
import PolygonBlur from '@/components/patterns/PolygonBlur'

preload(
  'blog/categories?filter[id]=1,7,9&fields[categories]=id,name,description,category_image'
)

const CryptoAcademy = async () => {
  const categories: {
    id: string
    attributes: CategoryData
  }[] = await getData(
    'blog/categories?filter[id]=1,7,9&fields[categories]=id,name,description,category_image'
  )
  return (
    <Section
      id={'crypto-academy'}
      ariaLabel={'Crypto Academy'}
      className={
        'relative border-t border-t-cyan-50 bg-emerald-50 dark:border-slate-900 dark:bg-gradient-to-b dark:from-primary-dark dark:to-black'
      }
    >
      <Container className={'relative'}>
        <PolygonBlur />
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
            <SolidButton solid={'secondary'} className={'mr-8'}>
              Browse All
            </SolidButton>
          </div>
        </div>
        <div
          className={
            'relative mt-8 grid grid-cols-1 gap-8 px-8 md:grid-cols-2 lg:grid-cols-3'
          }
        >
          <Lines />
          {categories.map((category) => (
            <Card
              key={category.id}
              className={'mx-0 my-5 shadow-[6px_6px_0px_#10b981] md:mx-5'}
            >
              <div
                className={'border-b border-b-cyan-100 dark:border-b-slate-900'}
              >
                <div className={'relative max-h-[230px] w-full items-center'}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}${category.attributes.category_image}`}
                    alt={category.attributes.name}
                    width={1366}
                    height={786}
                    className={'min-w-full'}
                  />
                </div>
              </div>
              <div className={'p-4'}>
                <div className={'flex justify-center p-2'}>
                  <Badge variant={'primary'} size={'md'}>
                    {category.attributes.name}
                  </Badge>
                </div>
                <Heading
                  as={'h3'}
                  size={'md'}
                  className={'line-clamp-1'}
                  variant={'gradient'}
                >
                  {category.attributes.name}
                </Heading>
                <Prose
                  content={category.attributes.description}
                  className={'line-clamp-3'}
                />
              </div>
              <div
                className={'border-t border-t-cyan-50 dark:border-t-slate-900'}
              >
                <div
                  className={
                    'flex w-full cursor-pointer items-center justify-between rounded-b-sm p-4'
                  }
                >
                  <Link
                    isInternal={true}
                    href={''}
                    label={'View More'}
                    solid={'transparent'}
                  />
                  <ArrowRightIcon
                    className={'h-5 w-5 text-slate-900 dark:text-primary-white'}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}
export default CryptoAcademy

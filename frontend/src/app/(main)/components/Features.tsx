import { Container, Section } from '@/components/wrappers'
import { HoverCard, SectionHeader } from '@/components/content'
import { getData, preload } from '@/lib/getData'
import type { Features } from '@/types/shared-types'
import Prose from '@/components/typography/Prose'
import PolygonBlur from '@/components/patterns/PolygonBlur'

preload('site/home_page?fields[sites]=features')

const Features = async () => {
  const data = await getData('site/home_page?fields[sites]=features')
  const { features }: { features: Features[] } = data.attributes
  return (
    <Section
      id={'features'}
      ariaLabel={'Main Features'}
      className={'relative isolate'}
    >
      <Container>
        <SectionHeader
          className={'text-center'}
          title={'Our Main'}
          gradTitle={'Features'}
          badgeLabel={'Features'}
        />
        <div
          className={
            'mt-4 grid grid-cols-1 gap-8 pt-10 sm:grid-cols-2 xl:grid-cols-3'
          }
        >
          {features.map((feature) => (
            <HoverCard
              key={feature.name}
              name={feature.name}
              link={feature.link}
              image={`${process.env.NEXT_PUBLIC_IMG_URL}${feature.image}`}
              description={<Prose content={feature.description as string} />}
            />
          ))}
        </div>
      </Container>
      <PolygonBlur />
    </Section>
  )
}
export default Features

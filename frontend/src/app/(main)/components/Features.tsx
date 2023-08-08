import { Container, Section } from '@/components/wrappers'
import { HoverCard, SectionHeader } from '@/components/content'
import PolygonBlur from '@/components/patterns/PolygonBlur'
import { allFeatures } from 'contentlayer/generated'
import MdxContent from '@/components/mdx-components'

const Features = () => {
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
          {allFeatures.map((feature) => (
            <HoverCard
              key={feature.name}
              name={feature.name}
              link={feature.link}
              image={feature.image}
              description={<MdxContent code={feature.body.code} />}
            />
          ))}
        </div>
      </Container>
      <PolygonBlur />
    </Section>
  )
}
export default Features

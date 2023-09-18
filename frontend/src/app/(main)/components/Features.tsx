import { allFeatures } from 'contentlayer/generated'

import { HoverCard, SectionHeader } from '@/components/content'
import MdxContent from '@/components/mdx-components'
import PolygonBlur from '@/components/patterns/PolygonBlur'
import { Container, Grid, Section } from '@/components/wrappers'

const Features = () => {
  return (
    <Section id={'features'} ariaLabel={'Main Features'}>
      <Container className={'relative'}>
        <SectionHeader
          className={'mb-4 max-w-2xl text-center'}
          title={'Our Main'}
          gradTitle={'Features'}
          badgeLabel={'Features'}
        />
        <Grid cols={'three'} className={'mt-8'}>
          {allFeatures.map((feature) => (
            <HoverCard
              key={feature.name}
              name={feature.name}
              link={feature.link}
              image={feature.image}
              description={<MdxContent code={feature.body.code} />}
            />
          ))}
        </Grid>
        <PolygonBlur />
      </Container>
    </Section>
  )
}
export default Features

import { Container, SimpleGrid, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { SectionProvider } from '@/Providers';
import { SectionWrapper } from '@/Components/Wrappers';
import { SpanText, Prose } from '@/Components/Elements/Typography';
import {
  GlowCard,
  LazyImage,
  SectionHeader,
} from '@/Components/Elements/Content';
import { NavLink } from '@/Components/Elements/Navigation';
import { usePageProps } from '@/Hooks/useTypedPage';
import type { IHomeData } from '../home-types';

const Features = () => {
  const { features } = usePageProps<IHomeData>().data;

  return (
    <SectionProvider isLazy={false} label="features" sectionId="features">
      <SectionWrapper pt="16" pb="24">
        <Container id="features" maxWidth="8xl" centerContent>
          <SectionHeader
            variant="large"
            textAlign="center"
            py="16"
            badgeLabel="Features"
            title="Our Main"
            gradTitle="Features"
          />
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} mx="auto">
            <AnimatePresence>
              {features.map((feature) => (
                <GlowCard key={feature.name}>
                  <LinkBox>
                    <LazyImage
                      boxProps={{
                        width: '64px',
                        height: '64px',
                      }}
                      imgProps={{
                        img_name: feature.image,
                        htmlHeight: '64px',
                        htmlWidth: '64px',
                        alt: `${feature.name}`,
                      }}
                    />
                    <LinkOverlay as={NavLink} to={feature.link} mt="4">
                      <SpanText size="lg">{feature.name}</SpanText>
                    </LinkOverlay>
                    <Prose noOfLines={4}>{feature.description}</Prose>
                  </LinkBox>
                </GlowCard>
              ))}
            </AnimatePresence>
          </SimpleGrid>
        </Container>
      </SectionWrapper>
    </SectionProvider>
  );
};
export default Features;
